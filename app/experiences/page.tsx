import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getExperiencesPageData, getSiteSettings, shell } from "../site-data";
import { SiteHeader, SiteFooter } from "../site-ui";
import ContactForm from "../contact/ContactForm";
import { GalleryMarquee } from "../../components/GalleryMarquee";
import { getTextAlign } from "../../lib/portableText";
import { ExperiencesHeroVideo } from "./ExperiencesHeroVideo";

export const metadata = {
  title: "Experiences | Tivor",
  description: "Signature experiences specially curated for you — share your preferences and we'll craft a bespoke journey.",
};

// Each block renders as its own line inside the <h1> (span+block display, not
// a <p>, since <p> can't nest inside <h1>) — lets editors do a title +
// smaller tagline as two separate lines using the Small/Large styles,
// aligned via the Align Left/Center/Right marks. Same pattern as
// journey.detailTitle (app/journeys/[slug]/page.tsx).
type RichValue = { style?: string; children?: any[] };
function titleLine(fontSize: string) {
  return ({ children, value }: { children?: React.ReactNode; value: RichValue }) => (
    <span className="block" style={{ fontSize, textAlign: getTextAlign(value) }}>{children}</span>
  );
}
const alignMarks = {
  alignLeft: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignCenter: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  alignRight: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
};
const titleComponents: PortableTextComponents = {
  block: {
    normal: titleLine("1em"),
    small: titleLine("0.5em"),
    large: titleLine("1.25em"),
  },
  marks: alignMarks,
};

// Description sizes/bullets mirror the itinerary "activities" renderer
// (app/journeys/[slug]/JourneyHighlights.tsx) — same schema shape
// (richListBlock: Normal/Small/Large + Bullet + Align marks).
const descSizes = { small: "text-sm", normal: "text-[16px]", large: "text-2xl" };
const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => (
      <p className={`${descSizes.normal} leading-relaxed text-[#3d3d3d]`} style={{ fontFamily: "var(--font-secondary)", textAlign: getTextAlign(value as RichValue) }}>
        {children}
      </p>
    ),
    small: ({ children, value }) => (
      <p className={`${descSizes.small} leading-relaxed text-[#3d3d3d]`} style={{ fontFamily: "var(--font-secondary)", textAlign: getTextAlign(value as RichValue) }}>
        {children}
      </p>
    ),
    large: ({ children, value }) => (
      <p className={`${descSizes.large} leading-relaxed text-[#3d3d3d]`} style={{ fontFamily: "var(--font-secondary)", textAlign: getTextAlign(value as RichValue) }}>
        {children}
      </p>
    ),
  },
  list: {
    // No items-center: it would center each <li> as a shrink-wrapped block
    // regardless of its own alignment (see JourneyHighlights.tsx for why).
    bullet: ({ children }) => <ul className="flex w-full flex-col gap-1">{children}</ul>,
  },
  listItem: {
    bullet: ({ children, value }) => {
      const v = value as RichValue;
      const sizeClass = descSizes[(v.style as keyof typeof descSizes) ?? "normal"] ?? descSizes.normal;
      const align = getTextAlign(v) ?? "center";
      const justify = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";
      return (
        <li className={`${sizeClass} flex ${justify} items-baseline gap-2 leading-relaxed text-[#3d3d3d]`} style={{ fontFamily: "var(--font-secondary)" }}>
          <span aria-hidden className="shrink-0">•</span>
          <span style={{ textAlign: align }}>{children}</span>
        </li>
      );
    },
  },
  marks: alignMarks,
};

export default async function ExperiencesPage() {
  const [page, settings] = await Promise.all([getExperiencesPageData(), getSiteSettings()]);

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* Header */}
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
            Experiences
          </span>
        </div>
      </div>

      {/* Title + Hero image/video */}
      <section className="bg-[#f2ebe2] pt-[60px]">
        <div className={`${shell} flex flex-col items-center gap-10`}>
          <h1
            className="max-w-[766px] text-center text-[26px] leading-tight text-[#151515] sm:text-[32px] xl:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            <PortableText value={page.title} components={titleComponents} />
          </h1>

          {/* aspect-video (not a fixed height) so the box takes the video's own
              16:9 shape instead of force-cropping it via object-cover into an
              arbitrary breakpoint height — same pattern as the About page's
              desktop hero (app/about/page.tsx). */}
          {(page.heroVideo || page.heroImage) && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xs">
              {page.heroVideo ? (
                <ExperiencesHeroVideo
                  src={page.heroVideo}
                  poster={page.heroImage}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image src={page.heroImage} alt="" fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1520px" />
              )}
            </div>
          )}

          {page.description.length > 0 && (
            <div className="flex max-w-full flex-col gap-3 text-center px-12">
              <PortableText value={page.description} components={descriptionComponents} />
            </div>
          )}
        </div>
      </section>

      {/* Form section */}
      <section className="bg-[#f2ebe2] py-[60px] xl:py-[80px]">
        <div className={shell}>
          <ContactForm contactImage={settings.contactImage} />
        </div>
      </section>

      {/* Gallery marquee */}
      {page.gallery.length > 0 && (
        <section className="bg-[#f2ebe2] pb-[60px] xl:pb-[80px]">
          <h2
            className="mb-8 text-center text-[22px] lg:text-[28px] leading-tight text-[#151515] sm:text-[28px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
           A Glimpse of What Awaits
          </h2>
          <GalleryMarquee images={page.gallery} />
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
