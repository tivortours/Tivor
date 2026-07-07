import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { getDestinationBySlug, getJourneyBySlug, getJourneySlugs, getJourneys, shell } from "../../site-data";
import { SiteHeader, SiteFooter } from "../../site-ui";
import { JourneyHighlights } from "./JourneyHighlights";
import { DestinationJourneyCarousel } from "../../destinations/[slug]/DestinationJourneyCarousel";
import { EnquireButton } from "../../../components/BookingModal";
import { InclusionsButton } from "../../../components/InclusionsModal";
import { PricingInfoNote } from "../../../components/PricingInfoNote";
import { getTextAlign } from "../../../lib/portableText";

// Each block renders as its own line inside the <h1> (span+block display, not
// a <p>, since <p> can't nest inside <h1>) — lets editors do a title + smaller
// tagline as two separate lines using the Small/Large styles, aligned via the
// Align Left/Center/Right marks (see lib/portableText). Title itself still
// powers cards/breadcrumb/alt/slug/emails elsewhere — this is
// detail-page-only.
type RichValue = { children?: any[] };
function detailTitleLine(fontSize: string) {
  return ({ children, value }: { children?: React.ReactNode; value: RichValue }) => (
    <span className="block" style={{ fontSize, textAlign: getTextAlign(value) }}>{children}</span>
  );
}
const detailTitleComponents = {
  block: {
    normal: detailTitleLine("1em"),
    small: detailTitleLine("0.66em"),
    large: detailTitleLine("1.25em"),
  },
  marks: {
    alignLeft: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    alignCenter: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    alignRight: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
};

export async function generateStaticParams() {
  return (await getJourneySlugs()).map((slug) => ({ slug }));
}

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [journey, allJourneys] = await Promise.all([getJourneyBySlug(slug), getJourneys()]);
  if (!journey) notFound();

  // Reuse the destination's curated, drag-orderable journey list so "Other
  // Journeys" here matches the order shown on that destination's own page;
  // fall back to auto-matching by destination until an editor curates it.
  const dest = journey.destination ? await getDestinationBySlug(journey.destination) : null;
  const otherDestinationJourneys = dest?.journeys.length
    ? dest.journeys.filter((j) => j.slug !== journey.slug)
    : allJourneys.filter((j) => j.destination === journey.destination && j.slug !== journey.slug);


  return (
    <main className="flex w-full flex-col overflow-x-clip bg-[#f2ebe2]">

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
            className="max-w-[766px] text-center text-[22px] font-semibold lg:font-medium lg:text-[26px] leading-tight text-[#151515] sm:text-[32px] xl:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {journey.detailTitle.length > 0
              ? <PortableText value={journey.detailTitle} components={detailTitleComponents} />
              : journey.title}
          </h1>
          <div className="relative h-[200px] lg:h-[300px] w-full overflow-hidden rounded-[2px] sm:h-[420px] xl:h-[567px]">
            <Image
              src={journey.highlightsImg}
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
        <div className={`${shell} `}>

          <div className="flex flex-col gap-12 xl:flex-row xl:gap-[88px] lg:px-16 xl:px-28">

            {/* Left — quick facts */}
            <div className="order-2 lg:order-1 flex flex-col gap-8 xl:w-90 xl:shrink-0 xl:justify-between xl:gap-0 xl:self-stretch">
              {journey.details.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 lg:pb-6">
                  <p className="text-[13px] lg:text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {label}:
                  </p>
                  <p className="text-[13px] lg:text-base leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {value}
                  </p>
                </div>
              ))}
              <div className="flex flex-col gap-1 lg:py-3">
                <p className="text-[13px] lg:text-base font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                  Inclusions:
                </p>
                <InclusionsButton
                  journeyTitle={journey.title}
                  inclusions={journey.inclusions}
                  className="w-fit border-b cursor-pointer border-[#714128] pb-[2px] text-base text-[#714128] text-left"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  View List of Inclusions
                </InclusionsButton>
              </div>
            </div>

            {/* Right — full description + CTA */}
            <div className="order-1 xl:order-2 flex flex-1 flex-col gap-12">
              <div
                className="flex flex-col gap-5 text-[13px] lg:text-base leading-relaxed text-[#3d3d3d]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {journey.fullDesc.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <EnquireButton
                journeyTitle={journey.title}
                label="Customize This Journey"
                className="h-[45px] cursor-pointer  w-fit rounded-[2px] bg-[#824b2e] px-8 text-[16px] lg:text-[18px] text-white"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Journey Highlights ───────────────────────────────────────────── */}
      <div className="lg:mx-44 xl:mx-0">
    <section className="bg-[#ece2d6] lg:px-16 xl:px-0 py-10 lg:py-20 xl:py-0">
        {/* Heading: mobile & lg only; xl heading lives inside the sticky panel */}
        <div className={`${shell} xl:hidden flex flex-col gap-15 text-center pb-5`}>
          <h2
            className="text-[28px] font-medium leading-tight text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
           Journey Highlights
          </h2>
        </div>

        <JourneyHighlights itinerary={journey.itinerary} journeyTitle={journey.title} />

        <div className="hidden h-px w-full bg-[#dfcdb9] my-11 xl:block" />

        {/* ── Pricing CTA bar ─────────────────────────────────────────────── */}
        <div className={`${shell} xl:pb-10`}>
          <div className="bg-[#dfcdb9] flex flex-col items-center gap-8 p-8 text-center xl:flex-row xl:items-center xl:justify-between xl:px-16 xl:py-14 xl:text-left">

            {/* Title */}
            <h2
              className="text-[26px] font-semibold leading-tight text-dark-500 xl:text-[36px] xl:whitespace-nowrap"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {journey.priceCtaTitle}
            </h2>

            {/* Price */}
            <div className="flex flex-col items-center">
              <div className="text-center text-[15px] text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                <span className="text-[20px] font-semibold text-dark-500">
                  {journey.priceFrom}
                </span>
                {journey.showIndicativePricingNote && <PricingInfoNote />}
              </div>
              <p className="text-[13px] text-dark-400 mt-1" style={{ fontFamily: "var(--font-secondary)" }}>
                ({journey.priceBasis})
              </p>
            </div>

            {/* Enquire button */}
            <EnquireButton
              journeyTitle={journey.title}
              label="Enquire Now"
              className="h-11.25 cursor-pointer w-full rounded-xs bg-[#824b2e] px-8 text-[14px] lg:text-[18px] text-white xl:w-fit"
              style={{ fontFamily: "var(--font-secondary)" }}
            />
          </div>
        </div>
      </section>
      </div>


      {/* ── Other journeys in this destination ───────────────────────────── */}
      {/* Same carousel component as the destination page (DestinationJourneyCarousel) —
          replaces the old sitewide "Highly Recommended Experiences" list (settings.recommendedExperiences)
          with journeys that actually share this journey's destination, excluding itself.
          Hidden entirely if this is the only journey for the destination. */}
      {otherDestinationJourneys.length > 0 && (
        <section className="bg-[#f2ebe2] py-[80px] xl:py-[100px]">
          <div className={shell}>
            <div className="flex flex-col gap-[60px] lg:px-10 xl:px-16">
            <div className="inline-block self-start">
              <h2
                className="whitespace-nowrap text-[22px] pb-1 leading-tight 
                 text-[#151515] sm:text-[28px] xl:text-[32px] font-semibold"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Discover more Journeys
              </h2>
            
            </div>

            <DestinationJourneyCarousel journeys={otherDestinationJourneys} />
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
