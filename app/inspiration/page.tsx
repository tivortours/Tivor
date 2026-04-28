import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-ui";
import { type Inspiration, getInspirationPageData, getInspirations, shell } from "../site-data";

function ArticleCard({ art }: { art: Inspiration }) {
  return (
    <Link href={`/inspiration/${art.slug}`} className="flex flex-col rounded-[2px] bg-[#f7f4f1] overflow-hidden group">
      <div className="relative aspect-[488/394] w-full overflow-hidden">
        <Image
          src={art.img}
          alt={art.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col justify-between gap-5 p-8 xl:p-10" style={{ minHeight: 220 }}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-[14px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
            <span>{art.date}</span>
            <span>|</span>
            <span>{art.destination}</span>
          </div>
          <h3
            className="text-[22px] font-medium leading-snug text-[#151515] xl:text-[24px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {art.title}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Image src={art.avatar} alt={art.author} width={60} height={60} className="shrink-0 rounded-full object-cover" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-medium text-[#151515] xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
              {art.author}
            </span>
            <span className="text-[12px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
              {art.role}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function InspirationPage() {
  const [page, inspirations] = await Promise.all([getInspirationPageData(), getInspirations()]);
  const [featured, ...grid] = inspirations;

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      <SiteHeader overlay={false} active="Inspiration" />

      {/* ── Hero Quote ───────────────────────────────────────────────────── */}
      <section className="w-full py-[60px] pb-[100px]">
        <div className={`${shell} flex justify-center`}>
          <h1
            className="max-w-[1270px] text-center text-[36px] leading-tight text-[#151515] sm:text-[42px] xl:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {page.heroQuote}
          </h1>
        </div>
      </section>

      {/* ── Featured Article ─────────────────────────────────────────────── */}
      <section className="w-full py-[40px]">
        <div className={shell}>
          <Link
            href={`/inspiration/${featured.slug}`}
            className="flex flex-col overflow-hidden rounded-[2px] bg-[#f7f4f1] xl:h-[380px] xl:flex-row group"
          >
            <div className="relative aspect-video flex-1 xl:aspect-auto overflow-hidden">
              <Image
                src={featured.img}
                alt={featured.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1280px) 100vw, 55vw"
              />
            </div>
            <div className="flex flex-col justify-between p-8 xl:w-[835px] xl:shrink-0 xl:p-[40px]">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 text-[15px] text-[#3d3d3d] xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
                  <span>{featured.date}</span>
                  <span>|</span>
                  <span>{featured.destination}</span>
                </div>
                <h2
                  className="text-[28px] font-medium leading-snug text-[#151515] xl:text-[36px]"
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {featured.title}
                </h2>
              </div>
              <div className="mt-6 flex items-center gap-5 xl:mt-0">
                <Image src={featured.avatar} alt={featured.author} width={60} height={60} className="shrink-0 rounded-full object-cover" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-medium text-[#151515] xl:text-[18px]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {featured.author}
                  </span>
                  <span className="text-[13px] text-[#3d3d3d] xl:text-[14px]" style={{ fontFamily: "var(--font-secondary)" }}>
                    {featured.role}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Article Grid ─────────────────────────────────────────────────── */}
      <section className="w-full py-[80px]">
        <div className={`${shell} flex flex-col gap-[72px]`}>
          <h2
            className="text-[28px] font-medium leading-tight text-[#151515] xl:text-[36px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {page.gridTitle}
          </h2>
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {grid.slice(0, 3).map((a) => <ArticleCard key={a.slug} art={a} />)}
            </div>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {grid.slice(3, 6).map((a) => <ArticleCard key={a.slug} art={a} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Can't Find section ───────────────────────────────────────────── */}
      <section className="w-full flex justify-center py-[80px]">
        <div className="flex w-full max-w-[1520px] items-center gap-[72px] px-5 xl:px-[80px]" style={{ minHeight: 470 }}>
          <div className="flex shrink-0 flex-col gap-[60px] xl:max-w-[460px]">
            <h2
              className="text-[42px] font-medium leading-tight text-[#151515] lg:text-[52px]"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              {page.supportTitle}
            </h2>
            <div className="flex flex-col gap-5">
              <h3 className="text-[28px] font-medium leading-tight text-[#151515]" style={{ fontFamily: "var(--font-primary)" }}>
                {page.supportHeading}
              </h3>
              <p className="text-[16px] leading-normal text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
                {page.supportBody}
              </p>
              <a href={page.supportButtonHref} className="mt-1 inline-flex h-[45px] w-fit items-center rounded-[2px] bg-[#824b2e] px-6 text-[18px] text-white" style={{ fontFamily: "var(--font-secondary)" }}>
                {page.supportButtonLabel}
              </a>
            </div>
          </div>
          <div className="relative hidden flex-1 overflow-hidden rounded-r-[2px] xl:block" style={{ minHeight: 470 }}>
            <Image src={page.supportImage} alt="Bespoke journey" fill className="object-cover" sizes="(max-width: 1280px) 0vw, 50vw" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
