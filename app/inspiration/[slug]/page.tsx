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
            className="max-w-[766px] text-center text-[22px] leading-tight text-[#151515] sm:text-[26px] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {art.title}
          </h1>
          <p
            className="max-w-[918px] text-center text-base leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {art.intro}
          </p>
        </div>

        {/* Full-bleed hero image */}
        <div className="relative mt-[48px] h-[320px] w-full overflow-hidden sm:h-[500px] xl:mt-[72px] xl:h-[800px]">
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
      <section className="py-[80px] xl:py-[100px]">
        <div className={shell}>
          <div className="flex flex-col gap-[48px] rounded-[2px] bg-[#f7f4f1] p-8 xl:flex-row xl:items-center xl:gap-[72px] xl:p-[100px]">

            {/* Left — text */}
            <div className="flex flex-1 flex-col gap-[32px] xl:gap-[40px]">
              <h2
                className="text-[20px] max-w-[300px] font-medium leading-tight text-[#151515] xl:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.section1.title}
              </h2>
              {art.section1.body.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-[#3d3d3d]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Right — image */}
            <div className="relative h-[280px] w-full overflow-hidden rounded-[2px] sm:h-[380px] xl:h-[513px] xl:w-[45%] xl:shrink-0">
              <Image
                src={art.section1.img}
                alt={art.section1.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 45vw"
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
              className="text-center text-[28px] leading-tight text-[#151515] xl:text-[36px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {art.gallerySection.title}
            </h2>
            <p
              className="max-w-[1067px] text-center text-base leading-relaxed text-[#3d3d3d]"
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
                className="relative h-[280px] min-w-[80vw] shrink-0 overflow-hidden rounded-[2px] sm:min-w-[55vw] xl:h-[400px] xl:min-w-0 xl:flex-1"
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
          <div className="flex flex-col gap-[48px] rounded-[2px] bg-[#f7f4f1] p-8 xl:flex-row xl:items-center xl:gap-[72px] xl:p-[100px]">

            {/* Left — image */}
            <div className="relative h-[280px] w-full overflow-hidden rounded-[2px] sm:h-[380px] xl:h-[513px] xl:w-[45%] xl:shrink-0">
              <Image
                src={art.section2.img}
                alt={art.section2.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 45vw"
              />
            </div>

            {/* Right — text */}
            <div className="flex flex-1 flex-col gap-[32px] xl:gap-[40px]">
              <h2
                className="text-[20px] font-medium max-w-[300px] leading-tight text-[#151515] xl:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.section2.title}
              </h2>
              {art.section2.body.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-[#3d3d3d]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
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
            className="max-w-[1067px] text-center text-base leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {art.closingText}
          </p>
        </div>
      </section>

      {/* ── CTA — green band ─────────────────────────────────────────────── */}
      <section className="pb-[80px] xl:pb-[100px]">
        <div className={shell}>
          <div className="relative min-h-[320px] overflow-hidden rounded-[2px] bg-[#5e6c51] xl:min-h-[375px]">
            {/* Text content */}
            <div className="relative z-10 flex flex-col gap-[40px] p-8 xl:w-[55%] xl:gap-[60px] xl:px-[100px] xl:py-[30px]">
              <h2
                className="text-[22px] leading-tight text-white sm:text-[28px] xl:text-[52px] xl:w-[362px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {art.ctaTitle}
              </h2>
              <div className="flex flex-col gap-[28px] xl:gap-[40px]">
                <p
                  className="max-w-[460px] text-base leading-normal text-white"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {art.ctaBody}
                </p>
                <a
                  href={art.ctaButtonHref}
                  className="inline-flex h-[45px] w-fit items-center rounded-[2px] bg-white px-6 text-base text-[#151515] xl:text-[18px]"
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
