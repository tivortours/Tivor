import Image from "next/image";
import { SiteFooter, SiteHeader } from "../site-ui";
import { getAboutPageData, shell } from "../site-data";

export default async function AboutPage() {
  const page = await getAboutPageData();

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[600px] items-end overflow-hidden bg-[#7a5c48] lg:min-h-[800px] xl:min-h-[900px]">
        {page.heroVideo ? (
          <video
            src={page.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <SiteHeader light active="About" />
        <div className={`${shell} relative z-10 pb-14 pt-48`}>
          <p
            className="text-[28px] italic text-white/90 sm:text-[34px] xl:text-[40px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {page.heroTagline}
          </p>
        </div>
      </section>

      {/* ── Intro: A World of New Horizons ───────────────────────────────── */}
      <section className="w-full py-[120px]">
        <div className={`${shell}`}>
          <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-[72px]">

            <h1
              className="shrink-0 text-[40px] leading-tight text-[#151515] xl:w-[326px] xl:text-[48px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {page.introTitle}
            </h1>

            <div
              className="flex flex-col gap-10 text-[16px] leading-relaxed text-[#3d3d3d] xl:max-w-[527px]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {page.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars banner ───────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2ebe2] py-10">
        <div className="flex flex-wrap items-center justify-center gap-0">
          {page.pillars.map((pillar, index) => (
            <div key={index} className="flex items-center">
              {index > 0 ? <div className="mx-8 h-[80px] w-px bg-[#cfbcad] sm:mx-12 xl:mx-16" /> : null}
              <div className="flex flex-col items-center gap-3">
                {pillar.icon ? (
                  <div className="relative h-12 w-12">
                    <Image src={pillar.icon} alt="" fill className="object-contain" sizes="48px" />
                  </div>
                ) : null}
                <span
                  className="text-[24px] font-semibold text-[#151515] xl:text-[30px]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {pillar.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────────────── */}
      <section className="w-full pt-[80px]">
        <div className={shell}>
          <div className="overflow-hidden rounded-[2px] bg-[#f7f4f1] p-8 xl:p-16">
            <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-16">

            <div className="relative aspect-[795/485] overflow-hidden rounded-[2px]">
              <Image
                src={page.visionImage}
                alt="Vision"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 55vw"
              />
            </div>

            <div className="flex flex-col divide-y divide-[#cfbcad]">
              <div className="flex flex-col gap-8 pb-8 xl:py-8">
                <h2 className="text-[28px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {page.visionTitle}
                </h2>
                <p className="text-[16px] leading-relaxed text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                  {page.visionBody}
                </p>
              </div>
              <div className="flex flex-col gap-8 pt-8">
                <h2 className="text-[28px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {page.missionTitle}
                </h2>
                <p className="text-[16px] leading-relaxed text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                  {page.missionBody}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ───────────────────────────────────────────────────── */}
      <section className="w-full py-[80px] pb-[60px]">
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-[28px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
            {page.valuesTitle}
          </h2>
          <div className={`${shell} grid grid-cols-1 divide-y divide-[#cfbcad] sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
            {page.values.map((value) => (
              <div key={value.title} className="flex flex-col items-center gap-10 px-8 py-12 text-center xl:px-[72px] xl:py-[48px]">
                <h3 className="text-[26px] font-bold leading-tight text-[#151515] xl:text-[28px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {value.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-[#3d3d3d] xl:text-[18px]" style={{ fontFamily: "var(--font-secondary)" }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet The Founders ────────────────────────────────────────────── */}
      <section className="w-full py-[80px]">
        <div className="flex flex-col items-center gap-[72px]">
          <h2 className="text-[28px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
            {page.foundersTitle}
          </h2>
          <div className={`${shell} grid grid-cols-1 gap-12 sm:grid-cols-2 xl:max-w-[1048px] xl:gap-[48px]`}>
            {page.founders.map((founder) => (
              <div key={founder.name} className="flex flex-col items-center gap-7">
                <div className="relative aspect-[451/370] w-full overflow-hidden rounded-[2px]">
                  <Image
                    src={founder.img}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-[22px] font-semibold text-[#151515] xl:text-[24px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {founder.name}
                </h3>
                <p className="text-center text-[15px] leading-relaxed text-[#3d3d3d] xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
                  {founder.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className={`${shell} pb-[80px]`}>
          <div className="flex min-h-[289px] flex-col items-center justify-center gap-6 rounded-[2px] bg-[#fbfaf7] px-6 py-10 text-center">
            <div>
              <p className="text-[40px] font-medium leading-none text-[#ad8c72] sm:text-[48px] lg:text-[52px]" style={{ fontFamily: "var(--font-primary)" }}>
                {page.ctaEyebrow}
              </p>
              <p className="text-[36px] leading-none text-[#151515] sm:text-[42px] lg:text-[48px]" style={{ fontFamily: "var(--font-primary)" }}>
                {page.ctaTitle}
              </p>
            </div>
            <a href={page.ctaButtonHref} className="inline-flex h-[45px] items-center rounded-[2px] bg-[#151515] px-6 text-base text-white sm:text-lg" style={{ fontFamily: "var(--font-secondary)" }}>
              {page.ctaButtonLabel}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
