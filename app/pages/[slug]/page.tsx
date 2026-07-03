import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getContentPageBySlug, getContentPageSlugs } from "../../site-data";
import { SiteHeader, SiteFooter } from "../../site-ui";
import { shell } from "../../site-data";

export async function generateStaticParams() {
  return (await getContentPageSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getContentPageBySlug(slug);
  return { title: page?.title ?? "Page" };
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[14px] lg:text-[15px] leading-[1.9] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-[20px] sm:text-[24px] font-medium leading-snug text-[#151515] mt-2" style={{ fontFamily: "var(--font-primary)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[17px] sm:text-[19px] font-medium leading-snug text-[#151515] mt-1" style={{ fontFamily: "var(--font-primary)" }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[15px] sm:text-[17px] font-semibold leading-snug text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
        {children}
      </h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 flex flex-col gap-1" style={{ fontFamily: "var(--font-secondary)" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 flex flex-col gap-1" style={{ fontFamily: "var(--font-secondary)" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[14px] lg:text-[15px] leading-[1.9] text-[#3d3d3d]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-[14px] lg:text-[15px] leading-[1.9] text-[#3d3d3d]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#151515]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-[#714128] underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="flex flex-col gap-3">
          <div className="relative w-full overflow-hidden rounded-xs" style={{ aspectRatio: "16/9" }}>
            <Image src={value.url} alt={value.alt || ""} fill className="object-cover" sizes="(max-width: 1520px) 100vw, 1520px" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-[13px] text-[#777]" style={{ fontFamily: "var(--font-secondary)" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    table: ({ value }) => {
      const rows: { cells?: string[]; isHeader?: boolean }[] = value?.rows || [];
      const headerRows = rows.filter(r => r.isHeader);
      const bodyRows = rows.filter(r => !r.isHeader);
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px] lg:text-[15px]" style={{ fontFamily: "var(--font-secondary)" }}>
            {headerRows.length > 0 && (
              <thead>
                {headerRows.map((row, i) => (
                  <tr key={i}>
                    {(row.cells || []).map((cell, j) => (
                      <th key={j} className="border border-[#cfbcad] bg-[#ece2d6] px-4 py-3 text-left font-semibold text-[#151515]">
                        {cell}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i}>
                  {(row.cells || []).map((cell, j) => (
                    <td key={j} className="border border-[#cfbcad] px-4 py-3 text-[#3d3d3d]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export default async function ContentPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getContentPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="flex w-full flex-col bg-[#f2ebe2]">

      <div className="bg-[#f2ebe2]">
        <SiteHeader active="" overlay={false} />
      </div>

      {/* Breadcrumb */}
      <div className="bg-white">
        <div className={`${shell} flex items-center py-3`}>
          <Link href="/" className="px-1 py-1 text-sm text-[#777]" style={{ fontFamily: "var(--font-secondary)" }}>
            Home
          </Link>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>/</span>
          <span className="px-1 py-1 text-sm text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
            {page.title}
          </span>
        </div>
      </div>

      {/* Title */}
      <section className="bg-[#f2ebe2] pt-[60px] pb-10">
        <div className={`${shell} flex flex-col items-center gap-10`}>
          <h1
            className="max-w-[760px] text-center text-[26px] sm:text-[36px] xl:text-[48px] font-medium leading-tight text-[#151515]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {page.title}
          </h1>

          {page.heroImage && (
            <div className="relative h-[200px] sm:h-[340px] xl:h-[480px] w-full overflow-hidden rounded-xs">
              <Image
                src={page.heroImage}
                alt={page.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1520px) 100vw, 1520px"
              />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#f2ebe2] py-[60px] xl:py-[60px]">
        <div className={shell}>
          <div className="mx-auto max-w-full flex flex-col gap-6">
            <PortableText value={page.body} components={bodyComponents} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
