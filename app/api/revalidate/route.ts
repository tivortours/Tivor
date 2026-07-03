import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Map Sanity document types to the cache tags used in site-data.ts
const TAG_MAP: Record<string, string[]> = {
  siteSettings:      ["siteSettings"],
  homePage:          ["homePage"],
  destination:       ["destination"],
  journey:           ["journey"],
  inspirationArticle:["inspirationArticle"],
  author:            ["author"],
  destinationsPage:  ["destinationsPage"],
  journeysPage:      ["journeysPage"],
  inspirationPage:   ["inspirationPage"],
  aboutPage:         ["aboutPage"],
  contentPage:       ["contentPage"],
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  const docType = body._type;
  if (!docType) {
    return NextResponse.json({ message: "Missing _type" }, { status: 400 });
  }

  const tags = TAG_MAP[docType];
  if (!tags) {
    return NextResponse.json({ message: `Unknown type: ${docType}` }, { status: 400 });
  }

  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags });
}
