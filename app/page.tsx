import Image from "next/image";
import {
  getHomePageData,
  section,
  shell,
} from "./site-data";
import { Diamond, LinkBtn, SectionHeading, SiteFooter, SiteHeader } from "./site-ui";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { DestinationsCarousel } from "../components/DestinationsCarousel";
import { JourneysCarousel } from "../components/JourneysCarousel";
import Link from "next/link";

export default async function HomePage() {
  const home = await getHomePageData();

  return (
    <main className="flex w-full flex-col overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[384px] h-[384px] lg:min-h-screen overflow-hidden bg-[#c0bebe]">
        {home.heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={home.heroPosterImage || home.heroImage}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={home.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image src={home.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/70"
          style={{ height: "41.3%" }}
        />

        <SiteHeader light />

        <div className="relative z-10 flex min-h-[384px] lg:min-h-screen items-end justify-end">
          <div className={`${shell} flex w-full justify-center pb-8 pt-40 sm:pb-20 lg:pb-24`}>
            <div className="max-w-[766px] text-center text-white">
              <h1
                className=" leading-[1.02] text-[24px] xl:text-[48px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {home.heroTitle}
              </h1>
              <p
                className="mx-auto mt-4 max-w-full text-[12px] xl:text-[16  px]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {home.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className={`${shell} flex flex-col items-center gap-10 py-20 text-center sm:gap-14 lg:py-[160px]`}>
          <h2
            data-reveal="up"
            className="text-[24px] font-semibold leading-none text-[#151515] sm:text-[34px] lg:text-[52px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {home.introTitle}
          </h2>
          <div
            data-reveal="up"
            data-delay="150"
            className="max-w-[984px] space-y-5 text-[14px] leading-relaxed text-[#3d3d3d] sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {home.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div data-reveal="fade" data-delay="300">
            <Diamond />
          </div>
        </div>
      </section>

      {/* ── Featured Destinations ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f2ebe2]">
        {/* Mobile heart */}
        <div className="pointer-events-none absolute left-0 top-0 block sm:hidden">
          <Image src="/heartvector.png" alt="" width={400} height={100} className="select-none" />
        </div>
        {/* Desktop heart */}
        <div className="pointer-events-none absolute left-0 top-0 hidden sm:block">
          <Image src="/heart.png" alt="" width={1050} height={400} className="select-none" />
        </div>
        <div className={`${shell} ${section} flex flex-col gap-12 pt-28 lg:pt-0 lg:gap-[72px]`}>
          <div data-reveal="up">
            <SectionHeading
              label={home.featuredDestinationsLabel}
              title={home.featuredDestinationsTitle}
              centered
            />
          </div>

          <DestinationsCarousel destinations={home.featuredDestinations} />
        </div>
      </section>

      {/* ── Curated Journeys ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <div
            data-reveal="up"
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <SectionHeading label={home.curatedJourneysLabel} title={home.curatedJourneysTitle} />
            <LinkBtn label={home.curatedJourneysLinkLabel} href={home.curatedJourneysLinkHref} />
          </div>

          <JourneysCarousel journeys={home.featuredJourneys} />
        </div>
      </section>

      {/* ── Experiences ───────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className={`${shell} ${section} flex flex-col items-center gap-12 lg:gap-[72px]`}>
          <div data-reveal="up">
            <SectionHeading
              label={home.experiencesLabel}
              title={home.experiencesTitle}
              centered
            />
          </div>

          <div className="grid w-full max-w-[1038px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 xl:grid-cols-1">
            {home.experiences.map((experience, index) => (
              <div
                key={experience.label}
                className="group relative h-[150px] overflow-hidden rounded-[2px] sm:h-[260px] xl:h-auto xl:aspect-[1038/249]"
                data-reveal="scale"
                data-delay={String(index * 120)}
              >
                <Image
                  src={experience.img}
                  alt={experience.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1038px"
                />
                {/* <div className="absolute inset-0 bg-black/25" /> */}
                <span
                  className="absolute inset-0 flex items-end justify-center px-4 text-center text-[16px] text-white sm:text-[20px] pb-8"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {experience.label}
                </span>
              </div>
            ))}
          </div>

          <div data-reveal="up" data-delay="150">
            <LinkBtn label={home.experiencesButtonLabel} href={home.experiencesButtonHref} />
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#5e6c51]">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <div data-reveal="up">
            <SectionHeading label={home.aboutLabel} title={<>{home.aboutTitleLineOne}<br />{home.aboutTitleLineTwo}</>} light />
          </div>

          <div
            className="relative aspect-[1280/500] overflow-hidden rounded-[2px]"
            data-reveal="scale"
            data-delay="150"
          >
            <Image
              src={home.aboutImage}
              alt="Luxury travel"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div
            data-reveal="up"
            data-delay="200"
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <p
              className="max-w-[744px] font-light text-[12px] lg:text-base text-white"
            // style={{ fontFamily: "var(--font-secondary)" }}
            >
              {home.aboutBody}
            </p>
            <LinkBtn label={home.aboutLinkLabel} href={home.aboutLinkHref} light />
          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-[1520px] bg-[#cfbcad]" />

      {/* ── Why TIVOR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className={`${shell} ${section}`}>
          <div className="flex flex-col gap-12 lg:gap-18 lg:px-20 xl:px-28">
            <div
              data-reveal="up"
              className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
            >
              <SectionHeading
                label={home.whyTravelLabel}
                title={
                  <>
                    {home.whyTravelTitleLineOne}
                    <br />
                    {home.whyTravelTitleLineTwo}
                  </>
                }
              />
              <div className="hidden lg:block">

            <LinkBtn label={home.whyTravelLinkLabel} href={home.whyTravelLinkHref}   />
              </div>
              {/* <LinkBtn label={home.whyTravelLinkLabel} href={home.whyTravelLinkHref} /> */}
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,477px)_minmax(0,1fr)] lg:gap-18">
              <div data-reveal="up" data-delay="150" className="flex flex-col">
                {home.reasons.map((reason, index) => (
                  <div
                    key={reason.title}
                    className={`flex flex-1 flex-col justify-center gap-6 py-8 ${index < home.reasons.length - 1 ? "border-b border-brown-300" : ""
                      }`}
                  >
                    <h3
                      className="text-[21px] lg:text-[28px] font-semibold leading-tight text-dark-500"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {reason.title}
                    </h3>
                    <p
                      className="text-[13px] lg:text-base leading-relaxed text-dark-400"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {reason.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="relative min-h-48 overflow-hidden rounded-xs lg:min-h-full"
                data-reveal="scale"
                data-delay="250"
              >
                <Image
                  src={home.whyTravelImage}
                  alt="Why travel with TIVOR"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="lg:hidden">

             <LinkBtn label={home.whyTravelLinkLabel} href={home.whyTravelLinkHref}  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className={`${shell} py-20 lg:py-[80px]`}>
          <div className="flex flex-col gap-12 lg:gap-[72px] lg:px-20 xl:px-28">
            <div data-reveal="up">
              <SectionHeading
                label={home.testimonialsLabel}
                title={
                  <>
                    {home.testimonialsTitleLineOne}
                    <br />
                    {home.testimonialsTitleLineTwo}
                  </>
                }
              />
            </div>

            <div data-reveal="up" data-delay="200">
              <TestimonialCarousel testimonials={home.testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className={`${shell} pb-20`}>

          <div
            data-reveal="scale"
            className="flex min-h-[289px] flex-col items-center justify-center gap-6 rounded-[2px] bg-[#fbfaf7] px-6 py-10 text-center"
          >
            <div>
              <p
                className="text-[26px] font-medium leading-none text-[#ad8c72] sm:text-[34px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {home.finalCtaEyebrow}
              </p>
              <p
                className="text-[22px] leading-none text-[#151515] sm:text-[30px] lg:text-[48px] pt-2"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {home.finalCtaTitle}
              </p>
            </div>
            <a
              href={home.finalCtaButtonHref}
              className="inline-flex h-[45px] items-center rounded-[2px] bg-[#151515] px-6 text-base text-white sm:text-lg"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {home.finalCtaButtonLabel}
            </a>
          </div>

        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
