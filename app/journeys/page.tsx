import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-ui";
import { type Journey, getJourneys, getJourneysPageData, shell } from "../site-data";

function JourneyCard({ journey }: { journey: Journey }) {
  const labelColor = journey.lightText ? "text-white/80" : "text-[#3d3d3d]";
  const valueColor = journey.lightText ? "text-white" : "text-[#151515]";

  return (
    <Link href={`/journeys/${journey.slug}`} className="flex flex-1 min-w-0 flex-col justify-between group">
      <div className="flex flex-col gap-8">
        <div className="relative h-[422px] w-full overflow-hidden rounded-[2px]">
          <Image
            src={journey.img}
            alt={journey.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3
            className="text-[28px] font-semibold leading-tight text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {journey.title}
          </h3>
          <p className="text-[16px] leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
            {journey.desc}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {journey.hasDivider && <div className="h-px w-full bg-[#cfbcad]" />}
        <div className="rounded-[2px] px-6 py-4" style={{ backgroundColor: journey.accent.replace("bg-[", "").replace("]", "") }}>
          <div className="flex flex-col gap-2">
            {journey.details.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className={`text-[16px] ${labelColor}`} style={{ fontFamily: "var(--font-secondary)" }}>
                  {label}
                </span>
                <span className={`text-[16px] ${valueColor}`} style={{ fontFamily: "var(--font-secondary)" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <span
          className="inline-flex w-fit items-center border-b border-[#714128] pb-[3px] text-[16px] text-[#714128]"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Explore Journey
        </span>
      </div>
    </Link>
  );
}

export default async function JourneysPage() {
  const [page, journeys] = await Promise.all([getJourneysPageData(), getJourneys()]);
  const firstThree = journeys.slice(0, 3);
  const lastThree = journeys.slice(3, 6);

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      <SiteHeader overlay={false} active="Journeys" />

      {/* ── Hero / Intro ─────────────────────────────────────────────────── */}
      <section className="w-full py-[60px]">
        <div className="flex flex-col items-center gap-[72px]">

          <div className="flex flex-col items-center gap-5 text-center">
            <h1
              className="w-full max-w-[766px] px-4 text-[48px] leading-tight text-[#151515]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {page.title}
            </h1>
            <p
              className="w-full max-w-[918px] px-4 text-[16px] leading-normal text-[#3d3d3d]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {page.body}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-[40px]">

            <div className="w-full max-w-[488px] px-4 xl:px-0">
              <div className="flex w-full items-center justify-between rounded-[2px] bg-white px-6 py-5">
                <div className="flex items-center gap-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#151515]">
                    <path d="M3 17v-2h6v2H3Zm0-5V10h12v2H3Zm0-5V5h18v2H3Zm14 10v-3h-2v-2h2v-3h2v3h2v2h-2v3h-2Z" fill="currentColor" />
                  </svg>
                  <span className="text-[16px] text-[#777]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {page.filterPlaceholder}
                  </span>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 rotate-180 text-[#151515]">
                  <path d="M6 3.5 1.5 8h9L6 3.5Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="h-px w-full bg-[#cfbcad]" />

            <div className={`${shell} flex flex-col gap-[88px]`}>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {firstThree.map((card) => (
                  <JourneyCard key={card.slug} journey={card} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
                {lastThree.map((card) => (
                  <JourneyCard key={card.slug} journey={card} />
                ))}
              </div>
            </div>

            <button
              className="h-[45px] rounded-[2px] bg-[#151515] px-6 text-[18px] text-white"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {page.seeMoreLabel}
            </button>
          </div>
        </div>
      </section>

      {/* ── Can't Find section ────────────────────────────────────────────── */}
      <section className="w-full flex justify-center py-[80px]">
        <div className="flex w-full max-w-[1520px] items-center gap-[72px] px-5 xl:px-[80px]" style={{ minHeight: 470 }}>

          <div className="flex shrink-0 flex-col gap-[60px] xl:max-w-[460px]">
            <h2
              className="text-[42px] font-medium leading-tight text-[#151515] lg:text-[52px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {page.supportTitle}
            </h2>
            <div className="flex flex-col gap-5">
              <h3
                className="text-[28px] font-medium leading-tight text-[#151515]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {page.supportHeading}
              </h3>
              <p
                className="text-[16px] leading-normal text-[#3d3d3d]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {page.supportBody}
              </p>
              <a
                href={page.supportButtonHref}
                className="mt-1 inline-flex h-[45px] w-fit items-center rounded-[2px] bg-[#824b2e] px-6 text-[18px] text-white"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {page.supportButtonLabel}
              </a>
            </div>
          </div>

          <div className="relative hidden flex-1 overflow-hidden rounded-r-[2px] xl:block" style={{ minHeight: 470 }}>
            <Image
              src={page.supportImage}
              alt="Bespoke journey"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 0vw, 50vw"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
