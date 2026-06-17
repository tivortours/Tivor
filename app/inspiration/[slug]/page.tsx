import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInspirationBySlug, getInspirationSlugs, shell } from "../../site-data";
import { SiteHeader, SiteFooter } from "../../site-ui";

export async function generateStaticParams() {
  return (await getInspirationSlugs()).map((slug) => ({ slug }));
}

export default async function InspirationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = await getInspirationBySlug(slug);
  if (!art) notFound();

  const destinationLabel =
    art.destination.charAt(0) + art.destination.slice(1).toLowerCase();

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="bg-[#f2ebe2]">
        <SiteHeader active="Inspiration" overlay={false} />
      </div>

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <div className="bg-white">
        <div className={`${shell} flex items-center py-3`}>
          <Link
            href="/inspiration"
            className="px-1 py-1 text-sm text-[#777]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Inspiration
          </Link>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
            /
          </span>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
            {destinationLabel}
          </span>
        </div>
      </div>

      {/* ── Title + Intro + Hero image ───────────────────────────────────── */}
      <section className="pt-[60px]">
        <div className={`${shell} flex flex-col items-center gap-[48px] xl:gap-[72px]`}>
          <h1
            className="max-w-[766px] text-center text-[22px] font-semibold lg:font-medium leading-tight text-[#151515] sm:text-[26px] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {art.title}
          </h1>
          <p
            className="max-w-[918px] text-center text-[14px] lg:text-base leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {art.intro}
          </p>
        </div>

        {/* Full-bleed hero image */}
        <div className="relative mt-[48px] h-[250px] mx-5 lg:mx-0 overflow-hidden sm:h-125 xl:mt-18 xl:h-200">
          <Image
            src={art.heroImg}
            alt={art.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Section 1: text left, image right ───────────────────────────── */}
      <section className="py-[80px] xl:py-[100px] bg-[#f7f4f1] xl:bg-none ">
        <div className={shell}>
          <div className="flex flex-col gap-8 xl:rounded-xs xl:bg-[#f7f4f1] xl:flex-row xl:items-center xl:gap-18 xl:p-25">

            {/* Left — text (mobile image injected between paragraphs) */}
            <div className="flex flex-1 flex-col gap-6 xl:gap-10">
              <h2
                className="text-[20px] max-w-[300px] font-medium leading-tight text-[#151515] xl:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.section1.title}
              </h2>
              {art.section1.body[0] && (
                <p className="text-[13px] lg:text-base leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                  {art.section1.body[0]}
                </p>
              )}
              {/* Mobile-only image — between first and remaining paragraphs */}
              <div className="relative h-65 w-full overflow-hidden rounded-xs xl:hidden">
                <Image src={art.section1.img} alt={art.section1.title} fill className="object-cover" sizes="100vw" />
              </div>
              {art.section1.body.slice(1).map((para, i) => (
                <p key={i} className="text-[13px] lg:text-base leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Right — image (desktop only) */}
            <div className="hidden xl:block relative xl:h-128.25 xl:w-[45%] xl:shrink-0 overflow-hidden rounded-xs">
              <Image
                src={art.section1.img}
                alt={art.section1.title}
                fill
                className="object-cover"
                sizes="45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery section ──────────────────────────────────────────────── */}
      <section className="py-[80px]">
        <div className={`${shell} flex flex-col items-center gap-[48px] xl:gap-[72px]`}>
          <div className="flex flex-col items-center gap-[24px] xl:gap-[48px]">
            <h2
              className="text-center text-[22px] font-semibold lg:text-[28px] leading-tight text-[#151515] xl:text-[36px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {art.gallerySection.title}
            </h2>
            <p
              className="max-w-[1067px] text-center text-[13px] lg:text-base leading-relaxed text-[#3d3d3d]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {art.gallerySection.body}
            </p>
          </div>

          {/* 3-image row — scrollable on mobile, grid on desktop */}
          <div className="flex w-full gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {art.gallerySection.images.map((img, i) => (
              <div
                key={i}
                className="relative h-[250px] min-w-[80vw] shrink-0 overflow-hidden rounded-[2px] sm:min-w-[55vw] xl:h-[400px] xl:min-w-0 xl:flex-1"
              >
                <Image
                  src={img}
                  alt={`${art.gallerySection.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 80vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: image left, text right ───────────────────────────── */}
      <section className="py-[80px] xl:pb-[60px] xl:pt-[100px]">
        <div className={shell}>
          <div className="flex flex-col gap-8 xl:rounded-xs xl:bg-[#f7f4f1] xl:flex-row xl:items-center xl:gap-18 xl:p-25">

            {/* Left — image (desktop only) */}
            <div className="hidden xl:block relative xl:h-128.25 xl:w-[45%] xl:shrink-0 overflow-hidden rounded-xs">
              <Image
                src={art.section2.img}
                alt={art.section2.title}
                fill
                className="object-cover"
                sizes="45vw"
              />
            </div>

            {/* Right — text (mobile image injected between paragraphs) */}
            <div className="flex flex-1 flex-col gap-6 xl:gap-10">
              <h2
                className="text-[20px] font-medium max-w-[300px] leading-tight text-[#151515] xl:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.section2.title}
              </h2>
              {art.section2.body[0] && (
                <p className="text-[13px] lg:text-base leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                  {art.section2.body[0]}
                </p>
              )}
              {/* Mobile-only image — between first and remaining paragraphs */}
              <div className="relative h-65 w-full overflow-hidden rounded-xs xl:hidden">
                <Image src={art.section2.img} alt={art.section2.title} fill className="object-cover" sizes="100vw" />
              </div>
              {art.section2.body.slice(1).map((para, i) => (
                <p key={i} className="text-[13px] lg:text-base leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing paragraph ────────────────────────────────────────────── */}
      <section className="py-[60px]">
        <div className={`${shell} flex justify-center`}>
          <p
            className="max-w-[1067px] text-center text-[13px] lg:text-base leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {art.closingText}
          </p>
        </div>
      </section>

      {/* ── CTA — green band ─────────────────────────────────────────────── */}
      <section className="pb-[80px] xl:pb-[100px]">
        <div className={shell}>
          <div className="-mx-5 sm:-mx-8 xl:mx-0 relative overflow-hidden rounded-none xl:rounded-xs bg-fern-600 xl:min-h-93.75">
            {/* Text + mobile image content */}
            <div className="relative z-10 flex flex-col gap-8 p-8 xl:w-[55%] xl:gap-15 xl:px-25 xl:py-7.5">
              <h2
                className="text-[28px] leading-tight text-white sm:text-[32px] xl:text-[52px] xl:w-[362px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.ctaTitle}
              </h2>

              {/* Mobile-only image — between title and body */}
              <div className="relative h-45 w-full overflow-hidden rounded-xs xl:hidden">
                <Image src={art.ctaImg} alt="" fill className="object-cover" sizes="100vw" />
              </div>

              <div className="flex flex-col gap-7 xl:gap-10">
                <p
                  className="text-[14px] lg:text-base leading-normal text-white xl:max-w-115"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {art.ctaBody}
                </p>
                <a
                  href={art.ctaButtonHref}
                  className="inline-flex h-11.25 w-fit items-center rounded-xs bg-white px-6 text-[14px] text-dark-500 xl:text-[18px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {art.ctaButtonLabel}
                </a>
              </div>
            </div>

            {/* Right image — desktop only */}
            <div className="hidden xl:absolute xl:bottom-0 xl:right-0 xl:top-0 xl:block xl:w-[45%]">
              <Image
                src={art.ctaImg}
                alt=""
                fill
                className="object-cover"
                sizes="45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
