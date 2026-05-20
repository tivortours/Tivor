import Image from "next/image";
import { SiteFooter, SiteHeader } from "../site-ui";
import { getDestinationListings, getDestinationsPageData } from "../site-data";

export default async function DestinationsPage() {
  const [page, destinations] = await Promise.all([getDestinationsPageData(), getDestinationListings()]);

  return (
    <main className="flex w-full flex-col overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[320px] overflow-hidden bg-[#c0bebe] sm:h-[450px] lg:h-[658px]">
        <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/20" />
        <SiteHeader light active="Destinations" />
      </section>

      {/* ── All Destinations ─────────────────────────────────────────────── */}
      <section className="w-full bg-[#f2ebe2] py-[100px]">
        <div className="flex flex-col items-center gap-[72px]">

          <h1
            className="text-[22px] font-medium leading-none text-[#151515] sm:text-[28px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {page.title}
          </h1>

          <div className="mx-auto flex w-full max-w-[1275px] flex-col gap-5 px-5 xl:px-7">
            {destinations.map((dest) => (
              <a
                key={dest.name}
                href={`/destinations/${dest.slug}`}
                className={`flex overflow-hidden rounded-[2px] bg-[#fefefd] xl:h-[378px] ${
                  dest.imageFirst
                    ? "flex-col xl:flex-row"
                    : "flex-col-reverse xl:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-video flex-1 xl:aspect-auto">
                  <Image
                    src={dest.img}
                    alt={dest.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 50vw"
                  />
                </div>

                {/* Text panel */}
                <div className="flex h-full flex-col justify-between p-6 xl:w-[493px] xl:shrink-0 xl:p-[40px]">
                  <div className="flex flex-col gap-5">
                    <h2
                      className="text-[28px] font-semibold leading-none text-black"
                      style={{ fontFamily: "var(--font-primary)" }}
                    >
                      {dest.name}
                    </h2>
                    <p
                      className="text-[14px] leading-normal text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {dest.p1}
                    </p>
                    <p
                      className="text-[14px] leading-normal text-[#3d3d3d]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {dest.p2}
                    </p>
                  </div>
                  <div className="mt-6 xl:mt-0">
                    <span
                      className="inline-flex items-center border-b border-[#714128] pb-[3px] text-[18px] text-[#714128]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      Discover More
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#f2ebe2]">
        <div className="mx-auto w-full max-w-[1520px] px-5 pb-20 sm:px-8 lg:px-12 xl:px-[56px]">
          <div className="flex min-h-[289px] flex-col items-center justify-center gap-6 rounded-[2px] bg-[#fbfaf7] px-6 py-10 text-center">
            <div>
              <p
                className="text-[26px] font-medium leading-none text-[#ad8c72] sm:text-[34px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {page.ctaEyebrow}
              </p>
              <p
                className="text-[22px] leading-none text-[#151515] sm:text-[30px] lg:text-[48px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {page.ctaTitle}
              </p>
            </div>
            <a
              href={page.ctaButtonHref}
              className="inline-flex h-[45px] items-center rounded-[2px] bg-[#151515] px-6 text-base text-white sm:text-lg"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {page.ctaButtonLabel}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
