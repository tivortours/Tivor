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
          <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between ">

            {/* LEFT: decorative Coastal Free block */}
            <div className="flex flex-col xl:gap-10  xl:w-1/2 xl:min-h-95">
              <div>
                {page.introTitle.includes("&") ? (
                  <>
                    <p
                      className="text-[22px] leading-tight text-dark-500 xl:text-[30px]"
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
              <div className="mt-8 flex flex-col gap-1">
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
<path d="M39.9991 19.9997C39.9991 31.0449 31.0454 39.9981 19.9994 39.9981C8.95367 39.9981 0 31.0449 0 19.9991C0 8.95305 8.95367 0 19.9994 0C31.0454 0 39.9991 8.95305 39.9991 19.9997Z" fill="#D09414"/>
<path opacity="0.19" d="M21.9036 16.5358L21.3579 17.0814L14.7669 10.4902L11.1945 14.062L14.7358 17.6027L10.7825 30.3691L20.4002 39.9876C28.9401 39.8191 36.1654 34.3027 38.8636 26.6461L29.7373 17.5202L23.7615 18.3943L21.9036 16.5358Z" fill="black"/>
<path d="M15.4347 12.1787C15.4347 13.5887 14.3007 14.7306 12.9018 14.7306C11.5041 14.7306 10.3701 13.5887 10.3701 12.1794C10.3701 10.7713 11.5042 9.62891 12.9018 9.62891C14.3008 9.62891 15.4347 10.7713 15.4347 12.1787ZM15.0643 16.5416H10.7815L10.7828 30.3694L15.0643 30.3688V16.5416H15.0643ZM21.9087 16.5416H17.8022V30.3688L21.9087 30.3694C21.9087 30.3694 21.9087 25.2402 21.9087 23.1113C21.9093 21.1666 22.8041 20.0095 24.5179 20.0095C26.0925 20.0095 26.85 21.1203 26.85 23.1113C26.85 25.1022 26.85 30.3688 26.85 30.3688H31.1108C31.1108 30.3688 31.1108 25.317 31.1108 21.6146C31.1108 17.9087 29.0112 16.1198 26.0773 16.1198C23.1434 16.1198 21.9087 18.4049 21.9087 18.4049V16.5416Z" fill="#F4F6F9"/>
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
