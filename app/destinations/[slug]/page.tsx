import Image from "next/image";
import Link from "next/link";
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
      <section className="bg-[#f2ebe2] py-[100px]">
        <div className="flex flex-col items-center gap-[88px]">

          {/* Title block */}
          <div
            className="flex flex-col items-center gap-3 text-center text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <h1 className="text-[26px] leading-none sm:text-[34px] xl:text-[52px]">
              {dest.detail.heroTitle}
            </h1>
            <p className="text-[16px] leading-none sm:text-[20px] xl:text-[28px]">
              {dest.detail.heroSubtitle}
            </p>
          </div>

          {/* Script name + description */}
          <div className="flex flex-col items-start px-5 py-5 gap-y-2.5 xl:px-0">
            {dest.detail.scriptImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={dest.detail.scriptImg}
                alt={dest.name}
                className="-mb-3 block max-w-40 xl:max-w-55"
              />
            ) : (
              <p
                className="mb-2 text-[48px] italic leading-none text-[#3d3d3d] xl:text-[64px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {dest.name}
              </p>
            )}
            <div
              className="w-full max-w-[957px] text-center text-base leading-normal text-[#3d3d3d]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              <p>{dest.detail.desc1}</p>
              <br />
              <p>{dest.detail.desc2}</p>
            </div>
          </div>

          {/* Gallery — horizontally scrollable with arrow navigation */}
          <GalleryCarousel images={dest.detail.gallery} />

        </div>
      </section>

      {/* ── Crafted Journeys ─────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2] pb-[80px] pt-[100px]">
        <div className={`${shell} flex flex-col gap-[88px]`}>
          <h2
            className="text-[20px] leading-none text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Crafted Journeys, Felt for a Lifetime
          </h2>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {shownJourneys.map((j) => (
              <div
                key={j.title}
                className="flex flex-col justify-between rounded-[2px] border border-[#9f9f9f]/50"
              >
                <div className="flex flex-col gap-8">
                  <div className="relative h-[260px] w-full overflow-hidden rounded-t-[2px] xl:h-[300px]">
                    <Image
                      src={j.img}
                      alt={j.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col gap-5 px-6">
                    <h3
                      className="text-[22px] font-semibold leading-snug text-[#151515] xl:text-[28px]"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {j.title}
                    </h3>
                    <p
                      className="text-base leading-normal text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {j.desc}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-2 px-6 py-5">
                    {j.details.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between">
                        <span
                          className="text-base text-[#3d3d3d]"
                          style={{ fontFamily: "var(--font-secondary)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-base text-[#151515]"
                          style={{ fontFamily: "var(--font-secondary)" }}
                        >
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#9f9f9f]/50 p-5">
                    <Link
                      href={`/journeys/${j.slug}`}
                      className="flex h-[45px] w-full items-center justify-center rounded-[2px] bg-[#824b2e] text-base text-white xl:text-[18px]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      Explore Journey
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Curated Journeys Includes ────────────────────────────────── */}
      <section className="bg-[#f7f4f1] py-10">
        <div className={`${shell} flex flex-col items-center gap-[60px]`}>
          <h2
            className="text-center text-[28px] leading-none text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Our Curated Journeys Includes
          </h2>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {settings.destinationFeatures.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center gap-6 p-6 text-center"
              >
                <div className="relative h-[55px] w-[55px] shrink-0">
                  <Image src={f.img} alt="" fill className="object-contain" />
                </div>
                <h3
                  className="text-[20px] leading-snug text-[#151515] xl:text-[28px]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-base leading-normal text-[#3d3d3d]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craft Your Perfect Escape CTA ────────────────────────────────── */}
      <section className="py-[80px]">
        <div className={shell}>
          <div className="relative min-h-[289px] overflow-hidden rounded-[2px] bg-[#796250] xl:min-h-[375px]">
            {/* Text content */}
            <div className="relative z-10 flex flex-col gap-10 p-8 xl:w-[55%] xl:gap-[60px] xl:px-[100px] xl:py-[30px]">
              <h2
                className="text-[22px] leading-tight text-white sm:text-[28px] xl:text-[52px] xl:w-[362px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Craft Your Perfect Escape
              </h2>
              <div className="flex flex-col gap-10">
                <p
                  className="max-w-[460px] text-base leading-normal text-white"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Tell us how you envision your journey, and we&apos;ll shape it into something truly exceptional.
                </p>
                <button
                  className="h-[45px] w-fit rounded-[2px] bg-white px-6 text-base text-[#151515] xl:text-[18px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Begin Your Journey
                </button>
              </div>
            </div>

            {/* Right image */}
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
        <div className={`${shell} flex flex-col gap-[72px]`}>
          <div className="flex flex-col gap-4">
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

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {home.testimonials.map((t, i) => (
              <div
                key={t.author}
                className={`flex flex-col justify-between gap-6 p-7 ${
                  i < home.testimonials.length - 1
                    ? "lg:border-r lg:border-[#e0e0e0]"
                    : ""
                }`}
              >
                <div className="h-[16px] w-[91px] shrink-0">
                  <Image
                    src="/Vector.svg"
                    alt="5 stars"
                    width={91}
                    height={16}
                    className="object-contain"
                  />
                </div>
                <p
                  className="text-[18px] font-semibold leading-snug text-[#151515] xl:text-[22px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {t.quote}
                </p>
                <p
                  className="text-base leading-normal text-[#3d3d3d]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {t.body}
                </p>
                <p
                  className="text-sm font-medium text-[#151515]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
