import Image from "next/image";
import { SiteFooter, SiteHeader } from "../site-ui";
import { getDestinations, getJourneys, getJourneysPageData } from "../site-data";
import { JourneyFilter } from "../../components/JourneyFilter";

export default async function JourneysPage() {
  const [page, journeys, destinations] = await Promise.all([
    getJourneysPageData(),
    getJourneys(),
    getDestinations(),
  ]);

  const destNames: Record<string, string> = {};
  destinations.forEach((d) => { destNames[d.slug] = d.name; });

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      <SiteHeader overlay={false} active="Journeys" />

      {/* ── Hero / Intro ─────────────────────────────────────────────────── */}
      <section className="w-full py-[60px]">
        <div className="flex flex-col items-center gap-[72px]">

          <div className="flex flex-col items-center gap-5 text-center">
            <h1
              className="w-full max-w-[766px] px-4 text-[32px] leading-tight text-[#151515] sm:text-[40px] lg:text-[48px]"
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

          <JourneyFilter
            journeys={journeys}
            destNames={destNames}
            filterPlaceholder={page.filterPlaceholder}
            seeMoreLabel={page.seeMoreLabel}
          />
        </div>
      </section>

      {/* ── Can't Find section ────────────────────────────────────────────── */}
      <section className="w-full flex justify-center py-[80px]">
        <div className="flex w-full max-w-[1520px] flex-col items-start gap-[60px] px-5 xl:flex-row xl:items-center xl:gap-[72px] xl:px-[80px]">

          <div className="flex w-full flex-col gap-[60px] xl:w-auto xl:max-w-[460px] xl:shrink-0">
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
