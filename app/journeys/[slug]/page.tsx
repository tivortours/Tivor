import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJourneyBySlug, getJourneySlugs, getSiteSettings, shell } from "../../site-data";
import { SiteHeader, SiteFooter } from "../../site-ui";
import { JourneyHighlights } from "./JourneyHighlights";
import { EnquireButton } from "../../../components/BookingModal";
import { InclusionsButton } from "../../../components/InclusionsModal";

export async function generateStaticParams() {
  return (await getJourneySlugs()).map((slug) => ({ slug }));
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [journey, settings] = await Promise.all([getJourneyBySlug(slug), getSiteSettings()]);
  if (!journey) notFound();

  const [duration] = journey.details.filter(([k]) => k === "Duration").map(([, v]) => v);
  const [bestSeason] = journey.details.filter(([k]) => k === "Best season").map(([, v]) => v);
  const [suitedFor] = journey.details.filter(([k]) => k === "Suited for").map(([, v]) => v);

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* ── Header on beige ──────────────────────────────────────────────── */}
      <div className="bg-[#f2ebe2]">
        <SiteHeader active="Journeys" overlay={false} />
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className={`${shell} flex items-center py-3`}>
          <Link
            href="/journeys"
            className="px-1 py-1 text-sm text-[#777]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Journeys
          </Link>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>/</span>
          <span
            className="px-1 py-1 text-sm text-[#151515] line-clamp-1"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {journey.title}
          </span>
        </div>
      </div>

      {/* ── Title + Hero image ───────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2] pt-[60px]">
        <div className={`${shell} flex flex-col items-center gap-10`}>
          <h1
            className="max-w-[766px] text-center text-[26px] leading-tight text-[#151515] sm:text-[32px] xl:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {journey.title}
          </h1>
          <div className="relative h-[300px] w-full overflow-hidden rounded-[2px] sm:h-[420px] xl:h-[567px]">
            <Image
              src={journey.img}
              alt={journey.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1520px"
            />
          </div>
        </div>
      </section>

      {/* ── Details section ──────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2] py-[80px] xl:py-[150px]">
        <div className={shell}>
          <div className="flex flex-col gap-12 xl:flex-row xl:gap-[88px]">

            {/* Left — quick facts */}
            <div className="flex flex-col gap-8 xl:w-[360px] xl:shrink-0 xl:justify-between xl:gap-0 xl:self-stretch">
              {duration && (
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                    Duration:
                  </p>
                  <p className="text-base leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {duration}
                  </p>
                </div>
              )}
              {bestSeason && (
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                    Best Season:
                  </p>
                  <p className="text-base leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {bestSeason}
                  </p>
                </div>
              )}
              {suitedFor && (
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                    Suited For:
                  </p>
                  <p className="text-base leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {suitedFor}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                  Inclusions:
                </p>
                <InclusionsButton
                  journeyTitle={journey.title}
                  inclusions={journey.inclusions}
                  className="w-fit border-b border-[#714128] pb-[2px] text-base text-[#714128] text-left"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  View List of Inclusions
                </InclusionsButton>
              </div>
            </div>

            {/* Right — full description + CTA */}
            <div className="flex flex-1 flex-col gap-12">
              <div
                className="flex flex-col gap-5 text-base leading-relaxed text-[#3d3d3d]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {journey.fullDesc.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <EnquireButton
                journeyTitle={journey.title}
                label="Enquire Now"
                className="h-[45px] w-fit rounded-[2px] bg-[#824b2e] px-8 text-[18px] text-white"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey Highlights ───────────────────────────────────────────── */}
      <section className="bg-[#ece2d6]">
        <div className={`${shell} flex flex-col gap-[60px] py-[80px]`}>
          <h2
            className="text-[20px] leading-tight text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Complete Journey Details Made For You
          </h2>

          <JourneyHighlights itinerary={journey.itinerary} journeyTitle={journey.title} />
        </div>

        {/* ── Pricing CTA bar ─────────────────────────────────────────────── */}
        <div className="bg-[#dfcdb9]">
          <div
            className={`${shell} flex flex-col gap-6 py-[60px] xl:flex-row xl:items-center xl:justify-between xl:gap-[88px] xl:py-[80px]`}
          >
            <h2
              className="text-[26px] leading-tight text-[#151515] xl:text-[36px] xl:whitespace-nowrap"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {journey.priceCtaTitle}
            </h2>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-[40px]">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[18px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                    From
                  </span>
                  <span className="text-[18px] text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                  USD {journey.priceFrom}
                  </span>
                  <span className="text-[18px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                     per Guest
                  </span>
                </div>
                <p className="text-xs text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                  ({journey.priceBasis})
                </p>
              </div>
              <EnquireButton
                journeyTitle={journey.title}
                label="Send an Enquiry"
                className="h-[45px] w-fit rounded-[2px] bg-[#824b2e] px-6 text-[18px] text-white"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Highly Recommended Experiences ───────────────────────────────── */}
      <section className="bg-[#f2ebe2] py-[80px] xl:py-[100px]">
        <div className={`${shell} flex flex-col gap-[60px]`}>
          <h2
            className="text-[22px] leading-tight text-[#151515] sm:text-[28px] xl:text-[52px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Highly Recommended Experiences
          </h2>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {settings.recommendedExperiences.map((exp) => (
              <div key={exp.title} className="flex flex-col overflow-hidden rounded-[2px]">
                <div className="relative h-[320px] w-full overflow-hidden sm:h-[360px] xl:h-[400px]">
                  <Image
                    src={exp.img}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start justify-between gap-4 bg-white p-6">
                  <div className="flex flex-col gap-4">
                    <p
                      className="text-sm text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {exp.country}
                    </p>
                    <p
                      className="text-[22px] leading-snug text-[#151515] xl:text-[24px]"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {exp.title}
                    </p>
                  </div>
                  {/* <span
                    className="border-b border-[#714128] pb-[2px] text-[18px] text-[#714128]"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    Experience This Journey
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
