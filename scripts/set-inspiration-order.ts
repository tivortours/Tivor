/**
 * One-time backfill: assigns an `orderRank` (used by the Studio's new
 * drag-and-drop Inspiration Article list) to every existing article,
 * preserving the exact order they already display in today via the old
 * `sortOrder` field — so switching the frontend query to `order(orderRank asc)`
 * doesn't reshuffle anything already live. New articles created after this
 * get a rank automatically when first added via the Studio's orderable list.
 *
 * Prerequisites:
 *   SANITY_API_TOKEN must be set in .env.local (same token as scripts/seed-sanity.ts).
 *
 * Safe to re-run — always recomputes ranks from the current `sortOrder`/title order.
 * Run:  npx tsx scripts/set-inspiration-order.ts
 */

import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("❌ SANITY_API_TOKEN is missing in .env.local");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

async function main() {
  const articles = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "inspirationArticle"] | order(sortOrder asc, publishDate desc){ _id, title }`
  );

  if (articles.length === 0) {
    console.log("No inspirationArticle documents found — nothing to do.");
    return;
  }

  let rank = LexoRank.min();
  const trx = client.transaction();
  for (const doc of articles) {
    rank = rank.genNext().genNext();
    trx.patch(doc._id, { set: { orderRank: rank.toString() } });
  }

  await trx.commit();
  console.log(`✅ Set orderRank on ${articles.length} inspiration articles, preserving their current order:`);
  articles.forEach((doc, i) => console.log(`   ${i + 1}. ${doc.title}`));
}

main().catch((err) => {
  console.error("❌ Failed:", err);
  process.exit(1);
});
