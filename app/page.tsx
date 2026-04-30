import Image from "next/image";
import {
  getHomePageData,
  section,
  shell,
} from "./site-data";
import { Diamond, LinkBtn, SectionHeading, SiteFooter, SiteHeader } from "./site-ui";
import { TestimonialCarousel } from "../components/TestimonialCarousel";

export default async function HomePage() {
  const home = await getHomePageData();

  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <section className="relative min-h-screen overflow-hidden bg-[#c0bebe]">
        <Image src={home.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        {/* <div className="absolute inset-0 bg-black/20" /> */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/70"
          style={{ height: "41.3%" }}
        />

        <SiteHeader light />

        <div className="relative z-10 flex min-h-screen items-end">
          <div className={`${shell} flex w-full justify-center pb-16 pt-40 sm:pb-20 lg:pb-24`}>
            <div className="max-w-[766px] text-center text-white">
              <h1
                className="text-[42px] leading-[1.02] sm:text-[52px] xl:text-[56px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {home.heroTitle}
              </h1>
              <p
                className="mx-auto mt-4 max-w-[620px] text-base sm:text-lg"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {home.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${shell} flex flex-col items-center gap-10 py-20 text-center sm:gap-14 lg:py-[120px]`}>
          <h2
            className="text-[38px] leading-none text-[#151515] sm:text-[46px] lg:text-[52px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {home.introTitle}
          </h2>
          <div
            className="max-w-[984px] space-y-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {home.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Diamond />
        </div>
      </section>

      <section className="bg-[#f2ebe2]">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <SectionHeading
            label={home.featuredDestinationsLabel}
            title={home.featuredDestinationsTitle}
            centered
          />

          <div className="grid gap-10 lg:grid-cols-3 lg:gap-7">
            {home.featuredDestinations.map((destination) => (
              <article key={destination.name} className="flex h-full flex-col">
                <div className="relative aspect-[0.85] overflow-hidden rounded-[2px]">
                  <Image
                    src={destination.img}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-5 pt-5">
                  <div className="space-y-3">
                    <h3
                      className="text-[28px] leading-none text-black"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {destination.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {destination.blurb}
                    </p>
                  </div>
                  <LinkBtn label="Inspire Me" href={`/destinations/${destination.slug}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading label={home.curatedJourneysLabel} title={home.curatedJourneysTitle} />
            <LinkBtn label={home.curatedJourneysLinkLabel} href={home.curatedJourneysLinkHref} />
          </div>

          <div className="grid gap-8 xl:grid-cols-2 xl:gap-7">
            {home.featuredJourneys.map((journey, index) => (
              <article key={journey.title} className="flex h-full flex-col gap-6">
                <div className="space-y-8">
                  <div className="relative aspect-[1.22] overflow-hidden rounded-[2px]">
                    <Image
                      src={journey.img}
                      alt={journey.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 50vw"
                    />
                  </div>
                  <div className="space-y-4">
                    <h3
                      className="text-[28px] leading-tight text-[#151515]"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {journey.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {journey.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-auto space-y-6">
                  {index === 0 ? <div className="h-px w-full bg-[#cfbcad]" /> : null}
                  <div className="rounded-[2px] px-5 py-4 sm:px-6" style={{ backgroundColor: journey.accent.replace("bg-[", "").replace("]", "") }}>
                    <div className="space-y-3">
                      {journey.details.map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-base text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                            {label}
                          </span>
                          <span className="text-base text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <LinkBtn label="Explore Journey" href={`/journeys/${journey.slug}`} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2ebe2]">
        <div className={`${shell} ${section} flex flex-col items-center gap-12 lg:gap-[72px]`}>
          <SectionHeading
            label={home.experiencesLabel}
            title={home.experiencesTitle}
            centered
          />

          <div className="grid w-full max-w-[1038px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 xl:grid-cols-1">
            {home.experiences.map((experience) => (
              <div
                key={experience.label}
                className="group relative h-[200px] overflow-hidden rounded-[2px] sm:h-[260px] xl:h-auto xl:aspect-[1038/249]"
              >
                <Image
                  src={experience.img}
                  alt={experience.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1038px"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span
                  className="absolute inset-0 flex items-center justify-center px-4 text-center text-[22px] text-white sm:text-[24px]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {experience.label}
                </span>
              </div>
            ))}
          </div>

          <LinkBtn label={home.experiencesButtonLabel} href={home.experiencesButtonHref} />
        </div>
      </section>

      <section className="bg-[#5e6c51]">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <SectionHeading label={home.aboutLabel} title={<>{home.aboutTitleLineOne}<br />{home.aboutTitleLineTwo}</>} light />

          <div className="relative aspect-[1280/554] overflow-hidden rounded-[2px]">
            <Image
              src={home.aboutImage}
              alt="Luxury travel"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p
              className="max-w-[744px] text-base leading-relaxed text-white"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {home.aboutBody}
            </p>
            <LinkBtn label={home.aboutLinkLabel} href={home.aboutLinkHref} light />
          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-full max-w-[1520px] bg-[#cfbcad]" />

      <section className="bg-[#f2ebe2]">
        <div className={`${shell} ${section} flex flex-col gap-12 lg:gap-[72px]`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
            <LinkBtn label={home.whyTravelLinkLabel} href={home.whyTravelLinkHref} />
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,477px)_minmax(0,1fr)] lg:gap-[72px]">
            <div className="flex flex-col">
              {home.reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className={`flex flex-1 flex-col justify-center gap-6 py-8 ${
                    index < home.reasons.length - 1 ? "border-b border-[#cfbcad]" : ""
                  }`}
                >
                  <h3
                    className="text-[28px] leading-tight text-[#151515]"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed text-[#3d3d3d]"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[2px] lg:min-h-full">
              <Image
                src={home.whyTravelImage}
                alt="Why travel with TIVOR"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2ebe2]">
        <div className={`${shell} flex flex-col gap-12 py-20 lg:gap-[72px] lg:py-[80px]`}>
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

          <TestimonialCarousel testimonials={home.testimonials} />
        </div>
      </section>

      <section className="bg-[#f2ebe2]">
        <div className={`${shell} pb-20`}>
          <div className="flex min-h-[289px] flex-col items-center justify-center gap-6 rounded-[2px] bg-[#fbfaf7] px-6 py-10 text-center">
            <div>
              <p
                className="text-[40px] font-medium leading-none text-[#ad8c72] sm:text-[48px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {home.finalCtaEyebrow}
              </p>
              <p
                className="text-[36px] leading-none text-[#151515] sm:text-[42px] lg:text-[48px]"
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
