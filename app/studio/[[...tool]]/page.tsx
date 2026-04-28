import { isSanityConfigured } from "../../../sanity/env";
import StudioClient from "./studio-client";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f2ebe2] px-6 py-16 text-[#151515]">
        <div className="max-w-2xl space-y-4 rounded-[2px] bg-white p-8 shadow-sm">
          <h1 className="text-3xl" style={{ fontFamily: "var(--font-primary)" }}>
            Sanity Studio needs environment variables
          </h1>
          <p className="text-base leading-relaxed" style={{ fontFamily: "var(--font-secondary)" }}>
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, <code>NEXT_PUBLIC_SANITY_DATASET</code>, and optionally
            <code> NEXT_PUBLIC_SANITY_API_VERSION</code> in <code>.env.local</code>, then restart the app.
          </p>
        </div>
      </main>
    );
  }

  return <StudioClient />;
}
