import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getDestinationSlugs,
  getHomePageData,
  getJourneys,
  getSiteSettings,
  shell,
} from "../../site-data";
import { SiteHeader, SiteFooter } from "../../site-ui";
import { GalleryCarousel } from "./GalleryCarousel";
import { DestinationJourneyCarousel } from "./DestinationJourneyCarousel";
import { TestimonialCarousel } from "../../../components/TestimonialCarousel";

export async function generateStaticParams() {
  return (await getDestinationSlugs()).map((slug) => ({ slug }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [dest, journeys, settings, home] = await Promise.all([
    getDestinationBySlug(slug),
    getJourneys(),
    getSiteSettings(),
    getHomePageData(),
  ]);
  if (!dest) notFound();

  const destJourneys = journeys.filter((j) => j.destination === slug);
  const shownJourneys = destJourneys.length > 0 ? destJourneys : journeys;

  return (
    <main className="flex w-full flex-col overflow-x-hidden">

      {/* ── Header on beige background ──────────────────────────────────── */}
      <div className="bg-[#f2ebe2]">
        <SiteHeader active="Destinations" overlay={false} />
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className={`${shell} flex items-center py-3`}>
          <Link
            href="/destinations"
            className="px-1 py-1 text-sm text-[#777]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Destinations
          </Link>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
            /
          </span>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
            {dest.name}
          </span>
        </div>
      </div>

      {/* ── Hero image ───────────────────────────────────────────────────── */}
      <div className="relative h-[400px] w-full overflow-hidden bg-[#c0bebe] lg:h-[600px] xl:h-[871px]">
        <Image
          src={dest.detail.heroImg}
          alt={dest.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── About / Intro ────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2] py-[50px] lg:py-[100px] px-5  lg:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-[50px] lg:gap-[88px]">

          {/* Title block */}
          <div
            className="flex flex-col items-center gap-3 text-center text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <h1 className="text-[26px] font-medium leading-none sm:text-[34px] xl:text-[52px]">
              {dest.detail.heroTitle}
            </h1>
            <p className="text-[16px] leading-none sm:text-[20px] xl:text-[28px]">
              {dest.detail.heroSubtitle}
            </p>
          </div>

          {/* Script name + description */}
          <div className="flex flex-col items-start ">
            <p
              className="text-[72px] leading-none text-[#824B2E] xl:text-[137px]"
              style={{ fontFamily: "CoastalFree, var(--font-primary)" }}
            >
              {dest.name}
            </p>
            <div
              className="w-full max-w-[957px] text-center text-[13px] lg:text-base leading-normal text-dark-400 [&_p]:mb-4 [&_p:last-child]:mb-0"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {dest.detail.desc1.length > 0 && <PortableText value={dest.detail.desc1} />}
              {dest.detail.desc2.length > 0 && <PortableText value={dest.detail.desc2} />}
            </div>
          </div>

          {/* Gallery — break out of section px-5 on mobile so slides fill the viewport */}
         
            <GalleryCarousel images={dest.detail.gallery} />


        </div>
      </section>

      {/* ── Crafted Journeys ─────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2] pb-[80px]  lg:pt-[100px]">
        <div className={shell}>
          <div className="flex flex-col gap-[88px]">
          <h2
            className="text-[24px] font-medium leading-none text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Crafted Journeys, <br className="lg:hidden" />  Creating Lasting Memories
        
          </h2>

          <div className="relative -mx-5 sm:-mx-8 lg:-mx-10 xl:-mx-16 px-5 sm:px-8 lg:px-10 xl:px-16">
            <DestinationJourneyCarousel journeys={shownJourneys} />
          </div>
          </div>
        </div>
      </section>

      {/* ── Our Curated Journeys Includes ────────────────────────────────── */}
      <section className="bg-[#f7f4f1] py-10">
        <div className={shell}>
          <div className="flex flex-col items-center gap-[60px] lg:px-10 xl:px-16">
          <h2
            className="text-center text-[24px] lg:text-[28px] leading-none text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Our Curated Journeys Includes
          </h2>

          <div className="flex w-full flex-col divide-y divide-[#d0d0d0]/60 lg:grid lg:grid-cols-4 lg:divide-y-0 lg:gap-6">
            {settings.destinationFeatures.map((f) => (
              <div
                key={f.title}
                className="flex flex-row items-start gap-5 py-7 lg:flex-col lg:items-center lg:gap-6 lg:py-6 lg:px-6 lg:text-center"
              >
                <div className="relative h-10 w-10 shrink-0 lg:h-13.75 lg:w-13.75">
                  <Image src={f.img} alt="" fill className="object-contain" />
                </div>
                <div className="flex flex-col gap-1 lg:gap-4 lg:items-center">
                  <h3
                    className="text-[18px] font-semibold leading-snug text-dark-500 lg:font-medium lg:text-[20px] xl:text-[27px] "
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[13px] leading-normal text-dark-400 lg:text-base"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ── Craft Your Perfect Escape CTA ────────────────────────────────── */}
      <section className="py-[80px]">
        <div className={shell}>
          <div className="relative -mx-5 sm:-mx-8 lg:mx-0 min-h-[289px] overflow-hidden lg:rounded-[2px] bg-[#796250] xl:min-h-[375px]">
            {/* Text content */}
            <div className="relative z-10 flex flex-col gap-6 p-8 xl:w-[55%] xl:gap-15 xl:px-25 xl:py-7.5">
              <h2
                className="text-[22px] leading-tight text-white sm:text-[28px] xl:text-[52px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {dest.detail.ctaTitle || "Craft Your Perfect Escape"}
              </h2>

              {/* Mobile-only image — shown between title and body text */}
              <div className="relative h-55 w-full overflow-hidden rounded-xs xl:hidden">
                <Image
                  src={dest.detail.ctaImg}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              <div className="flex flex-col gap-8 xl:gap-10 pb-4">
                <p
                  className="max-w-[460px] text-base leading-normal text-white"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {dest.detail.ctaBody || "Tell us how you envision your journey, and we'll shape it into something truly exceptional."}
                </p>
                <button
                  className="h-[45px] cursor-pointer w-fit rounded-[2px] bg-white px-6 text-base text-[#151515] text-[14px]  lg:text-[18px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {dest.detail.ctaButtonLabel || "Begin Your Journey"}
                </button>
              </div>
            </div>

            {/* Desktop-only right image */}
            <div className="hidden xl:block xl:absolute xl:bottom-0 xl:right-0 xl:top-0 xl:w-[45%]">
              <Image
                src={dest.detail.ctaImg}
                alt=""
                fill
                className="rounded-r-[2px] object-cover"
                sizes="45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Guest Stories / Testimonials ─────────────────────────────────── */}
      <section className="py-[80px] xl:py-[100px]">
        <div className={shell}>
          <div className="flex flex-col gap-[72px] lg:px-16 xl:px-28">
          <div className="flex flex-col gap-4 ">
            <div className="inline-flex w-fit items-center border border-[#576168] px-1 py-1">
              <span
                className="text-[10px] tracking-[0.28em] text-[#576168]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                GUEST STORIES
              </span>
            </div>
            <h2
              className="max-w-[514px] text-[24px] leading-tight text-[#151515] sm:text-[30px] xl:text-[52px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Shared Moments From Our Guests
            </h2>
          </div>

          <TestimonialCarousel testimonials={home.testimonials} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
