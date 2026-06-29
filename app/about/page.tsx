import Image from "next/image";
import { SiteFooter, SiteHeader } from "../site-ui";
import { getAboutPageData, shell } from "../site-data";
import { AboutHeroVideo } from "./AboutHeroVideo";

export default async function AboutPage() {
  const page = await getAboutPageData();

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* ── Hero — mobile: full-bleed with overlaid header ───────────────── */}
      <section className="relative flex h-87.5 items-end overflow-hidden bg-[#7a5c48] xl:hidden">
        {page.heroVideo ? (
          <AboutHeroVideo src={page.heroVideo} className="absolute inset-0 h-full w-full object-cover" />
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
              <AboutHeroVideo src={page.heroVideo} className="h-full w-full object-cover" />
            ) : (
              <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="1520px" />
            )}
          </div>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 xl:py-30">
        <div className={shell}>
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between lg:px-24">

            {/* LEFT: decorative Coastal Free block */}
            <div className="flex flex-col xl:gap-10  xl:w-1/2 xl:min-h-95">
              <div>
                {page.introTitle.includes("&") ? (
                  <>
                    <p
                      className="text-[22px] leading-tight text-dark-500 xl:text-[34px] font-semibold"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {page.introTitle.split("&")[0].trim()}
                    </p>
                    <p
                      className="text-[52px] pt-3 leading-[1.05] text-[#B96B42] xl:text-[88px] px-4 font-medium"
                      style={{ fontFamily: "CoastalFree, var(--font-primary)" }}
                    >
                      {page.introTitle.split("&").slice(1).join("&").trim()}
                    </p>
                  </>
                ) : (
                  <p
                    className="text-[52px] leading-[1.05] text-dark-500 xl:text-[68px]"
                    style={{ fontFamily: "CoastalFree, var(--font-primary)" }}
                  >
                    {page.introTitle}
                  </p>
                )}
              </div>
              <div className="mt-8 flex flex-col gap-1 lg:pt-6">
                <p
                  className="text-[11px] lg:text-[18px] uppercase  text-dark-400"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Creators Of
                </p>
                <p
                  className="text-[14px] lg:text-[18px] font-bold uppercase leading-snug tracking-wide text-dark-500 xl:text-[18px]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  Remarkable<br />Travel Experiences
                </p>
              </div>
            </div>

            {/* RIGHT: paragraphs */}
            <div
              className="flex flex-col gap-4 text-[13px] leading-relaxed text-dark-400 lg:text-[16px] xl:w-1/2"
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
      <section className="w-full bg-[#f2ebe2] py-5 sm:py-7 xl:py-10">
        <div className="flex items-center justify-center">
          {page.pillars.map((pillar, index) => (
            <div key={index} className="flex items-center">
              {index > 0 ? (
                <div className="mx-3 h-7 w-px bg-[#cfbcad] sm:mx-6 sm:h-10 lg:mx-10 lg:h-12 xl:mx-14 xl:h-14" />
              ) : null}
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2.5 lg:gap-3 xl:gap-4">
                <span
                  className="text-[20px] text-dark-500 sm:text-[15px] lg:text-[28px] xl:text-[36px] font-medium"
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
              <div key={founder.name} className="group flex flex-col gap-7">
                <div className="relative aspect-451/370 w-full overflow-hidden rounded-xs">
                  <Image
                    src={founder.img}
                    alt={founder.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[22px] font-semibold text-dark-500 xl:text-[24px]" style={{ fontFamily: "var(--font-primary)" }}>
                        {founder.name}
                      </h3>
                      {founder.role && (
                        <p className="text-[14px] text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
                          {founder.role}
                        </p>
                      )}
                    </div>
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 shrink-0 items-center justify-center transition-opacity duration-300 xl:opacity-0 xl:group-hover:opacity-100"
                        aria-label={`${founder.name} on LinkedIn`}
                      >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_2653_9229)">
                            <path d="M39.9995 20.0007C39.9995 31.0459 31.0459 39.9991 19.9999 39.9991C8.95416 39.9991 0.000488281 31.0459 0.000488281 20C0.000488281 8.95402 8.95416 0.000976562 19.9999 0.000976562C31.0459 0.000976562 39.9995 8.95402 39.9995 20.0007Z" fill="#AD8C72" />
                            <path opacity="0.05" d="M21.9041 16.537L21.3584 17.0826L14.7674 10.4915L11.195 14.0633L14.7362 17.6039L10.783 30.3703L20.4007 39.9888C28.9406 39.8204 36.1659 34.304 38.8641 26.6473L29.7378 17.5215L23.762 18.3955L21.9041 16.537Z" fill="black" />
                            <path d="M15.4352 12.1795C15.4352 13.5894 14.3012 14.7314 12.9023 14.7314C11.5046 14.7314 10.3706 13.5894 10.3706 12.1801C10.3706 10.7721 11.5047 9.62964 12.9023 9.62964C14.3013 9.62964 15.4352 10.7721 15.4352 12.1795ZM15.0647 16.5423H10.782L10.7833 30.3701L15.0648 30.3695V16.5423H15.0647ZM21.9092 16.5423H17.8027V30.3695L21.9092 30.3701C21.9092 30.3701 21.9092 25.2409 21.9092 23.112C21.9098 21.1674 22.8046 20.0102 24.5184 20.0102C26.093 20.0102 26.8505 21.121 26.8505 23.112C26.8505 25.1029 26.8505 30.3695 26.8505 30.3695H31.1113C31.1113 30.3695 31.1113 25.3178 31.1113 21.6153C31.1113 17.9094 29.0117 16.1205 26.0778 16.1205C23.1439 16.1205 21.9092 18.4057 21.9092 18.4057V16.5423Z" fill="#F4F6F9" />
                          </g>
                          <defs>
                            <clipPath id="clip0_2653_9229">
                              <rect width="40" height="40" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                      </a>
                    )}
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-dark-400 xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
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
              <p
                className="text-[22px] leading-none text-[#151515] sm:text-[30px] lg:text-[48px] pt-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
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
