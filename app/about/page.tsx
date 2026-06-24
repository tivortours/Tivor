import Image from "next/image";
import { SiteFooter, SiteHeader } from "../site-ui";
import { getAboutPageData, shell } from "../site-data";

export default async function AboutPage() {
  const page = await getAboutPageData();

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* ── Hero — mobile: full-bleed with overlaid header ───────────────── */}
      <section className="relative flex h-87.5 items-end overflow-hidden bg-[#7a5c48] xl:hidden">
        {page.heroVideo ? (
          <video src={page.heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <SiteHeader light active="About" />
      </section>

      {/* ── Hero — desktop: header above, image in shell ─────────────────── */}
      <div className="hidden bg-beige-200 xl:block">
        <SiteHeader active="About" overlay={false} />
      </div>
      <section className="hidden bg-beige-200 pb-10 xl:block">
        <div className={shell}>
          <div className="relative aspect-video overflow-hidden">
            {page.heroVideo ? (
              <video src={page.heroVideo} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            ) : (
              <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="1520px" />
            )}
          </div>
        </div>
      </section>

      {/* ── Intro: A World of New Horizons ───────────────────────────────── */}
      <section className="w-full py-[120px]">
        <div className={`${shell}`}>
          <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-[72px] px-0 xl:px-28">
                   {/* LEFT: title + paragraphs */}
   {page.creatorsImage && (
              <div className="flex shrink-0 items-center justify-center xl:w-95">
                <Image
                  src={page.creatorsImage}
                  alt="Creators of Remarkable Travel Experiences"
                  width={380}
                  height={420}
                  className="w-full object-contain"
                />
              </div>
            )}

     
                {/* RIGHT: Creators Of image */}

            <div className="flex flex-col gap-10 xl:max-w-140">
              <h1
                className="text-[26px] leading-tight text-dark-500 sm:text-[32px] xl:text-[48px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {page.introTitle.includes("&") ? (
                  <>
                    {page.introTitle.split("&")[0].trim()} &<br />
                    {page.introTitle.split("&").slice(1).join("&").trim()}
                  </>
                ) : page.introTitle}
              </h1>
              <div
                className="flex flex-col gap-4 text-[13px] lg:text-[16px] leading-relaxed text-dark-400"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {page.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
        
         
          </div>
        </div>
      </section>

      {/* ── Pillars banner ───────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2ebe2] py-5 sm:py-7 xl:py-10">
        <div className="flex items-center justify-center">
          {page.pillars.map((pillar, index) => (
            <div key={index} className="flex items-center">
              {index > 0 ? (
                <div className="mx-3 h-7 w-px bg-[#cfbcad] sm:mx-6 sm:h-10 lg:mx-10 lg:h-12 xl:mx-14 xl:h-14" />
              ) : null}
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2.5 lg:gap-3 xl:gap-4">
                <span
                  className="text-[20px] text-dark-500 sm:text-[15px] lg:text-[26px] xl:text-[32px] font-medium"
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
      <section className="w-full pt-[80px] bg-[#F7F4F1] xl:bg-transparent">
        <div className={shell}>
          <div className=" sm:-mx-8 xl:mx-0 overflow-hidden rounded-none xl:rounded-xs bg-[#f7f4f1]  xl:p-20">
            <div className="grid grid-cols-1 items-center xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:gap-24">

            <div className="relative aspect-[895/585] w-full  overflow-hidden xl:rounded-xs">
              <Image
                src={page.visionImage}
                alt="Vision"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 55vw"
              />
            </div>

            <div className="flex flex-col divide-y divide-[#cfbcad] px-5 py-10 sm:px-8 xl:px-0 xl:py-0">
              <div className="flex flex-col gap-6 pb-8 xl:py-8">
                <h2 className="text-[20px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {page.visionTitle}
                </h2>
                <p className="text-[13px] lg:text-[16px] leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                  {page.visionBody}
                </p>
              </div>
              <div className="flex flex-col gap-6 pt-8">
                <h2 className="text-[20px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {page.missionTitle}
                </h2>
                <p className="text-[13px] lg:text-[16px] leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
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
          <h2 className="text-[25px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
            {page.valuesTitle}
          </h2>
          <div className={`${shell} grid grid-cols-1 divide-y divide-[#cfbcad] sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
            {page.values.map((value) => (
              <div key={value.title} className="flex flex-col items-center gap-10 px-8 py-12 text-center xl:px-[72px] xl:py-[48px]">
                <h3 className="text-[24px] font-bold leading-tight text-[#151515] xl:text-[28px]" style={{ fontFamily: "var(--font-primary)" }}>
                  {value.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-dark-400 xl:text-[18px]" style={{ fontFamily: "var(--font-secondary)" }}>
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
          <h2 className="text-[25px] font-semibold text-[#151515] xl:text-[36px]" style={{ fontFamily: "var(--font-primary)" }}>
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
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-[22px] font-semibold text-dark-500 xl:text-[24px]" style={{ fontFamily: "var(--font-primary)" }}>
                    {founder.name}
                  </h3>
                  {founder.role && (
                    <p className="text-center text-[14px] text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                      {founder.role}
                    </p>
                  )}
                </div>
                <p className="text-center text-[15px] leading-relaxed text-dark-400 xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
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
              <p className="text-[26px] font-medium leading-none text-[#ad8c72] sm:text-[34px] lg:text-[52px]" style={{ fontFamily: "var(--font-primary)" }}>
                {page.ctaEyebrow}
              </p>
              <p className="text-[36px] leading-none text-[#151515] sm:text-[42px] lg:text-[48px] pt-2" style={{ fontFamily: "var(--font-primary)" }}>
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
