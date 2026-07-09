import { cache } from "react";

import { isSanityConfigured } from "../sanity/env";
import { readClient } from "../sanity/lib/client";
import { urlForImage } from "../sanity/lib/image";
import {
  ABOUT_PAGE_QUERY,
  CONTENT_PAGE_QUERY,
  CONTENT_PAGE_SLUGS_QUERY,
  DESTINATIONS_PAGE_QUERY,
  DESTINATIONS_QUERY,
  DESTINATION_QUERY,
  DESTINATION_SLUGS_QUERY,
  EXPERIENCES_PAGE_QUERY,
  HOME_PAGE_QUERY,
  INSPIRATION_ARTICLES_QUERY,
  INSPIRATION_ARTICLE_QUERY,
  INSPIRATION_PAGE_QUERY,
  INSPIRATION_SLUGS_QUERY,
  JOURNEYS_PAGE_QUERY,
  JOURNEYS_QUERY,
  JOURNEY_QUERY,
  JOURNEY_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
} from "../sanity/lib/queries";

export const shell = "mx-auto w-full max-w-[1520px] px-5 sm:px-8 lg:px-[40px] xl:px-[40px]";
export const section = "py-20 lg:py-28 xl:py-[130px]";

export type Destination = {
  slug: string;
  img: string;
  name: string;
  blurb: string;
  region: string;
  bestSeason: string;
  tone: string;
  journeys: Journey[];
  detail: {
    heroImg: string;
    heroTitle: string;
    heroSubtitle: string;
    desc1: any[];
    desc2: any[];
    gallery: string[];
    ctaImg: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButtonLabel: string;
    ctaButtonHref: string;
  };
};

export type Journey = {
  slug: string;
  img: string;
  alt: string;
  title: string;
  detailTitle: any[];
  desc: string;
  fullDesc: string[];
  accent: string;
  lightText: boolean;
  hasDivider: boolean;
  destination: string;
  details: [string, string][];
  inclusions: any[];
  highlightsImg: string;
  priceCurrency: string;
  priceFrom: string;
  priceBasis: string;
  priceCtaTitle: string;
  showIndicativePricingNote: boolean;
  itinerary: {
    day: string;
    title: string;
    img: string;
    activities: any[];
  }[];
};

export type Inspiration = {
  slug: string;
  img: string;
  date: string;
  destination: string;
  title: string;
  avatar: string;
  author: string;
  role: string;
  intro: string;
  heroImg: string;
  section1: {
    title: string;
    body: string[];
    img: string;
  };
  gallerySection: {
    title: string;
    body: string;
    images: [string, string, string];
  };
  section2: {
    title: string;
    body: string[];
    img: string;
  };
  closingText: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
  ctaImg: string;
};

export type Experience = { img: string; label: string };
export type Testimonial = { quote: string; body: string; author: string; location?: string };
export type FooterColumn = { head: string; links: { label: string; href: string }[] };
export type DestinationFeature = { img: string; title: string; desc: string };
export type RecommendedExperience = { img: string; country: string; title: string };

type NavItem = { label: string; href: string };
type HeaderAction = { label: string; href: string; variant: "outline" | "solid" };
type SocialLink = { platform: string; href: string; icon: string };

type SiteSettings = {
  navItems: NavItem[];
  headerActions: HeaderAction[];
  logos: {
    light: string;
    dark: string;
    onLight: string;
    footerIcon: string;
    copyright: string;
  };
  newsletter: {
    title: string;
    body: string;
    backgroundImage: string;
    inputPlaceholder: string;
    buttonLabel: string;
  };
  footer: {
    ctaLabel: string;
    ctaHref: string;
    year: number;
    copyrightText: string;
    followLabel: string;
    columns: FooterColumn[];
    socialLinks: SocialLink[];
  };
  destinationFeatures: DestinationFeature[];
  recommendedExperiences: RecommendedExperience[];
  contactImage: string;
};

type HomePageData = {
  heroVideo: string;
  heroPosterImage: string;
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  introTitle: string;
  introParagraphs: string[];
  featuredDestinationsLabel: string;
  featuredDestinationsTitle: string;
  featuredDestinations: Destination[];
  curatedJourneysLabel: string;
  curatedJourneysTitle: string;
  curatedJourneysLinkLabel: string;
  curatedJourneysLinkHref: string;
  featuredJourneys: Journey[];
  experiencesLabel: string;
  experiencesTitle: string;
  experiencesButtonLabel: string;
  experiencesButtonHref: string;
  experiences: Experience[];
  aboutLabel: string;
  aboutTitleLineOne: string;
  aboutTitleLineTwo: string;
  aboutImage: string;
  aboutBody: string[];
  aboutTagline?: string[];
  aboutLinkLabel: string;
  aboutLinkHref: string;
  whyTravelLabel: string;
  whyTravelTitleLineOne: string;
  whyTravelTitleLineTwo: string;
  whyTravelLinkLabel: string;
  whyTravelLinkHref: string;
  whyTravelImage: string;
  reasons: { title: string; desc: string }[];
  testimonialsLabel: string;
  testimonialsTitleLineOne: string;
  testimonialsTitleLineTwo: string;
  testimonials: Testimonial[];
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaButtonLabel: string;
  finalCtaButtonHref: string;
};

type DestinationsPageData = {
  heroImage: string;
  title: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

type JourneysPageData = {
  title: string;
  body: string;
  filterPlaceholder: string;
  seeMoreLabel: string;
  supportTitle: string;
  supportHeading: string;
  supportBody: string;
  supportButtonLabel: string;
  supportButtonHref: string;
  supportImage: string;
};

type ExperiencesPageData = {
  title: any[];
  description: any[];
  heroImage: string;
  heroVideo: string;
};

type InspirationPageData = {
  heroQuote: string;
  heroSubheading: string;
  gridTitle: string;
  supportTitle: string;
  supportHeading: string;
  supportBody: string;
  supportButtonLabel: string;
  supportButtonHref: string;
  supportImage: string;
};

type AboutPageData = {
  heroImage: string;
  heroVideo: string;
  heroTagline: string;
  introTitle: string;
  introParagraphs: string[];
  creatorsImage?: string;
  pillars: { label: string }[];
  visionImage: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
  valuesTitle: string;
  values: { title: string; desc: string }[];
  foundersTitle: string;
  founders: { img: string; name: string; role?: string; bio: string; linkedin?: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

// `inclusions` and `itinerary[].activities` were plain string arrays before
// they became Portable Text fields. Older documents still hold that shape —
// PortableText silently renders nothing for array items without a `_type`,
// so without this, existing published content just goes blank. Upgrades each
// legacy string into a minimal Portable Text block; already-rich items pass
// through untouched.
function normalizeRichText(value: unknown): any[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) =>
    typeof item === "string"
      ? { _type: "block", style: "normal", children: [{ _type: "span", text: item }] }
      : item
  );
}

// Sanity's editor lets an author hit Enter mid-line while composing (e.g. to
// keep lines short in the Studio's narrow textarea), which stores a literal
// "\n" inside a span's text. A lone "\n" is just that — a wrap artifact at
// whatever column the editor happened to be at — so collapse it to a space
// and let the browser wrap the sentence naturally. A run of 2+ newlines is a
// deliberate paragraph/line break (e.g. an editor separating "Terrain: ...",
// "Duration: ...", "Elevation Gain: ..." within one bullet), so that's
// preserved — the itinerary renderer applies white-space: pre-line to turn
// it into an actual break.
function stripSoftBreaks(blocks: any[]): any[] {
  return blocks.map((block) =>
    block?._type === "block" && Array.isArray(block.children)
      ? {
          ...block,
          children: block.children.map((child: any) =>
            typeof child?.text === "string"
              ? { ...child, text: child.text.replace(/\n+/g, (m: string) => (m.length === 1 ? " " : m)) }
              : child
          ),
        }
      : block
  );
}

function imageUrl(source: unknown, width: number, height?: number, fallbackUrl = "") {
  const src = source as { asset?: unknown } | null;
  if (!src?.asset) return fallbackUrl;
  const builder = urlForImage(src);
  if (!builder) return fallbackUrl;
  const sized = height ? builder.width(width).height(height).fit("crop") : builder.width(width).fit("max");
  try {
    return sized.url();
  } catch {
    return fallbackUrl;
  }
}

async function fetchSanity<T>(query: string, params?: Record<string, unknown>, tags?: string[]) {
  if (!isSanityConfigured) return null;

  // In development, skip the data cache so Sanity edits are visible immediately on refresh.
  // In production, use tag-based caching invalidated by the /api/revalidate webhook.
  const fetchOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : tags?.length
      ? { next: { tags } }
      : undefined;

  return readClient.fetch<T>(query, params ?? {}, fetchOptions);
}

function toAbsoluteHref(href: string | undefined | null): string {
  if (!href) return "#";
  if (href.startsWith("/") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href === "#") return href;
  return `/${href}`;
}

function mapDestination(item: any): Destination {
  return {
    slug: item.slug,
    img: imageUrl(item.cardImage, 900, 1060, ""),
    name: item.name,
    blurb: item.blurb,
    region: item.region,
    bestSeason: item.bestSeason,
    tone: item.tone,
    journeys: (item.journeys || []).filter(Boolean).map((j: any) => mapJourney(j)),
    detail: {
      heroImg: imageUrl(item.detailHeroImage, 2000, 1200, ""),
      heroTitle: item.detailHeroTitle,
      heroSubtitle: item.detailHeroSubtitle,
      desc1: item.detailDescription1 || [],
      desc2: item.detailDescription2 || [],
      gallery: (item.detailGallery || []).map((img: unknown) => imageUrl(img, 1600, 1100, "")).filter(Boolean),
      ctaImg: imageUrl(item.ctaImage, 1200, 1000, imageUrl(item.detailHeroImage, 1600, 900)),
      ctaTitle: item.ctaTitle || "",
      ctaBody: item.ctaBody || "",
      ctaButtonLabel: item.ctaButtonLabel || "",
      ctaButtonHref: item.ctaButtonHref ? toAbsoluteHref(item.ctaButtonHref) : "",
    },
  };
}

function mapJourney(item: any): Journey {
  return {
    slug: item.slug,
    img: imageUrl(item.cardImage || item.heroImage, 1200, 900, ""),
    alt: item.alt || item.title,
    title: item.title,
    detailTitle: item.detailTitle || [],
    desc: item.shortDescription,
    fullDesc: item.fullDescription || [],
    accent: `bg-[${item.accentColor || "#ece2d6"}]`,
    lightText: Boolean(item.lightText),
    hasDivider: Boolean(item.hasDivider),
    destination: item.destination,
    details: (item.facts || []).map((fact: { label: string; value: string }) => [fact.label, fact.value]) as [
      string,
      string,
    ][],
    inclusions: normalizeRichText(item.inclusions),
    highlightsImg: imageUrl(item.heroImage || item.cardImage, 1600, 1000),
    priceCurrency: item.priceCurrency || "EUR",
    priceFrom: item.priceFrom || "",
    priceBasis: item.priceBasis || "",
    priceCtaTitle: item.priceCtaTitle || "",
    showIndicativePricingNote: Boolean(item.showIndicativePricingNote),
    itinerary: (item.itinerary || []).map((stop: any) => ({
      day: stop.day,
      title: stop.title,
      img: imageUrl(stop.image, 1400, 900, ""),
      activities: stripSoftBreaks(normalizeRichText(stop.activities)),
    })),
  };
}

function mapInspiration(item: any): Inspiration {
  const destinationLabel = item.destination?.toUpperCase?.() || "";

  return {
    slug: item.slug,
    img: imageUrl(item.cardImage, 1000, 806, ""),
    date: item.publishDate
      ? new Date(item.publishDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
    destination: destinationLabel,
    title: item.title,
    avatar: imageUrl(item.author?.avatar, 240, 240, ""),
    author: item.author?.name || "",
    role: item.author?.role || "",
    intro: item.intro,
    heroImg: imageUrl(item.heroImage, 2000, 1200, ""),
    section1: {
      title: item.section1Title,
      body: item.section1Body || [],
      img: imageUrl(item.section1Image, 1200, 1400, ""),
    },
    gallerySection: {
      title: item.galleryTitle,
      body: item.galleryBody,
      images: [
        imageUrl(item.galleryImages?.[0], 1200, 900, ""),
        imageUrl(item.galleryImages?.[1], 1200, 900, ""),
        imageUrl(item.galleryImages?.[2], 1200, 900, ""),
      ] as [string, string, string],
    },
    section2: {
      title: item.section2Title,
      body: item.section2Body || [],
      img: imageUrl(item.section2Image, 1200, 1400, ""),
    },
    closingText: item.closingText,
    ctaTitle: item.ctaTitle,
    ctaBody: item.ctaBody,
    ctaButtonLabel: item.ctaButtonLabel || "Plan Your Journey",
    ctaButtonHref: item.ctaButtonHref ? toAbsoluteHref(item.ctaButtonHref) : "/plan",
    ctaImg: imageUrl(item.ctaImage, 1200, 1000, ""),
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await fetchSanity<any>(SITE_SETTINGS_QUERY, undefined, ["siteSettings"]);
  if (!data) {
    return {
      navItems: [],
      headerActions: [],
      logos: {
        light: "",
        dark: "",
        onLight: "",
        footerIcon: "",
        copyright: "",
      },
      newsletter: {
        title: "",
        body: "",
        backgroundImage: "",
        inputPlaceholder: "",
        buttonLabel: "",
      },
      footer: {
        ctaLabel: "",
        ctaHref: "",
        year: new Date().getFullYear(),
        copyrightText: "",
        followLabel: "",
        columns: [],
        socialLinks: [],
      },
      destinationFeatures: [],
      recommendedExperiences: [],
      contactImage: "",
    };
  }

  return {
    navItems: data.navItems?.length
      ? data.navItems.map((item: any) => ({ label: item.label, href: toAbsoluteHref(item.href) }))
      : [],
    headerActions: data.headerActions?.length
      ? data.headerActions.map((action: any) => ({ label: action.label, href: toAbsoluteHref(action.href), variant: action.variant }))
      : [],
    logos: {
      light: imageUrl(data.logos?.light, 500, undefined, ""),
      dark: imageUrl(data.logos?.dark, 500, undefined, ""),
      onLight: imageUrl(data.logos?.onLight, 500, undefined, ""),
      footerIcon: imageUrl(data.logos?.footerIcon, 200, undefined, ""),
      copyright: imageUrl(data.logos?.copyright, 80, undefined, ""),
    },
    newsletter: {
      title: data.newsletter?.title || "",
      body: data.newsletter?.body || "",
      backgroundImage: imageUrl(
        data.newsletter?.backgroundImage,
        2200,
        900,
        "",
      ),
      inputPlaceholder: data.newsletter?.inputPlaceholder || "",
      buttonLabel: data.newsletter?.buttonLabel || "",
    },
    footer: {
      ctaLabel: data.footer?.ctaLabel || "",
      ctaHref: data.footer?.ctaHref ? toAbsoluteHref(data.footer.ctaHref) : "",
      year: data.footer?.year || new Date().getFullYear(),
      copyrightText: data.footer?.copyrightText || "",
      followLabel: data.footer?.followLabel || "",
      columns: (data.footer?.columns || []).map((col: any) => ({
        head: col.head || "",
        links: (col.links || [])
          .filter(Boolean)
          .map((l: any) => ({
            label: typeof l === "string" ? l : (l?.label || ""),
            href: toAbsoluteHref(typeof l === "string" ? undefined : l?.href),
          }))
          .filter((l: { label: string; href: string }) => l.label),
      })),
      socialLinks: data.footer?.socialLinks?.length
        ? data.footer.socialLinks.map((item: any) => ({
            platform: item.platform,
            href: item.href || "#",
            icon: imageUrl(item.icon, 64, undefined, ""),
          }))
        : [],
    },
    destinationFeatures: data.destinationFeatures?.length
      ? data.destinationFeatures.map((item: any) => ({
          title: item.title,
          desc: item.desc,
          img: imageUrl(item.image, 110, undefined, ""),
        }))
      : [],
    recommendedExperiences: data.recommendedExperiences?.length
      ? data.recommendedExperiences.map((item: any) => ({
          title: item.title,
          country: item.country,
          img: imageUrl(item.image, 900, 1100, ""),
        }))
      : [],
    contactImage: imageUrl(data.contactImage, 1400, 1200, ""),
  };
});

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  const data = await fetchSanity<any>(HOME_PAGE_QUERY, undefined, ["homePage", "destination", "journey"]);
  if (!data) {
    return {
      heroVideo: "",
      heroPosterImage: "",
      heroImage: "",
      heroTitle: "",
      heroSubtitle: "",
      introTitle: "",
      introParagraphs: [],
      featuredDestinationsLabel: "",
      featuredDestinationsTitle: "",
      featuredDestinations: [],
      curatedJourneysLabel: "",
      curatedJourneysTitle: "",
      curatedJourneysLinkLabel: "",
      curatedJourneysLinkHref: "",
      featuredJourneys: [],
      experiencesLabel: "",
      experiencesTitle: "",
      experiencesButtonLabel: "",
      experiencesButtonHref: "",
      experiences: [],
      aboutLabel: "",
      aboutTitleLineOne: "",
      aboutTitleLineTwo: "",
      aboutImage: "",
      aboutBody: [],
      aboutLinkLabel: "",
      aboutLinkHref: "",
      whyTravelLabel: "",
      whyTravelTitleLineOne: "",
      whyTravelTitleLineTwo: "",
      whyTravelLinkLabel: "",
      whyTravelLinkHref: "",
      whyTravelImage: "",
      reasons: [],
      testimonialsLabel: "",
      testimonialsTitleLineOne: "",
      testimonialsTitleLineTwo: "",
      testimonials: [],
      finalCtaEyebrow: "",
      finalCtaTitle: "",
      finalCtaButtonLabel: "",
      finalCtaButtonHref: "",
    };
  }

  return {
    heroVideo: data.heroVideo?.url || "",
    heroPosterImage: imageUrl(data.heroPosterImage, 2200, 1300, ""),
    heroImage: imageUrl(data.heroImage, 2200, 1300, ""),
    heroTitle: data.heroTitle || "",
    heroSubtitle: data.heroSubtitle || "",
    introTitle: data.introTitle || "",
    introParagraphs: data.introParagraphs?.length ? data.introParagraphs : [],
    featuredDestinationsLabel: data.featuredDestinationsLabel || "",
    featuredDestinationsTitle: data.featuredDestinationsTitle || "",
    featuredDestinations: data.featuredDestinations?.length
      ? data.featuredDestinations.map((item: any) => mapDestination(item))
      : [],
    curatedJourneysLabel: data.curatedJourneysLabel || "",
    curatedJourneysTitle: data.curatedJourneysTitle || "",
    curatedJourneysLinkLabel: data.curatedJourneysLinkLabel || "",
    curatedJourneysLinkHref: data.curatedJourneysLinkHref ? toAbsoluteHref(data.curatedJourneysLinkHref) : "",
    // Curated `featuredJourneys` (drag-orderable in Studio) takes priority;
    // falls back to the `featuredOnHome` checkbox until an editor curates it.
    featuredJourneys: (data.featuredJourneys?.length ? data.featuredJourneys : data.legacyFeaturedJourneys)
      ?.filter(Boolean)
      .map((item: any) => mapJourney(item)) ?? [],
    experiencesLabel: data.experiencesLabel || "",
    experiencesTitle: data.experiencesTitle || "",
    experiencesButtonLabel: data.experiencesButtonLabel || "",
    experiencesButtonHref: data.experiencesButtonHref ? toAbsoluteHref(data.experiencesButtonHref) : "",
    experiences: data.experiences?.length
      ? data.experiences.map((item: any) => ({
          label: item.label,
          img: imageUrl(item.image, 2000, 480, ""),
        }))
      : [],
    aboutLabel: data.aboutLabel || "",
    aboutTitleLineOne: data.aboutTitleLineOne || "",
    aboutTitleLineTwo: data.aboutTitleLineTwo || "",
    aboutImage: imageUrl(data.aboutImage, 1800, 780, ""),
    aboutBody: Array.isArray(data.aboutBody) && data.aboutBody.length ? data.aboutBody : [],
    aboutTagline: Array.isArray(data.aboutTagline) && data.aboutTagline.length ? data.aboutTagline : undefined,
    aboutLinkLabel: data.aboutLinkLabel || "",
    aboutLinkHref: data.aboutLinkHref ? toAbsoluteHref(data.aboutLinkHref) : "",
    whyTravelLabel: data.whyTravelLabel || "",
    whyTravelTitleLineOne: data.whyTravelTitleLineOne || "",
    whyTravelTitleLineTwo: data.whyTravelTitleLineTwo || "",
    whyTravelLinkLabel: data.whyTravelLinkLabel || "",
    whyTravelLinkHref: data.whyTravelLinkHref ? toAbsoluteHref(data.whyTravelLinkHref) : "",
    whyTravelImage: imageUrl(data.whyTravelImage, 1200, 1500, ""),
    reasons: data.reasons?.length ? data.reasons : [],
    testimonialsLabel: data.testimonialsLabel || "",
    testimonialsTitleLineOne: data.testimonialsTitleLineOne || "",
    testimonialsTitleLineTwo: data.testimonialsTitleLineTwo || "",
    testimonials: data.testimonials?.length ? data.testimonials : [],
    finalCtaEyebrow: data.finalCtaEyebrow || "",
    finalCtaTitle: data.finalCtaTitle || "",
    finalCtaButtonLabel: data.finalCtaButtonLabel || "",
    finalCtaButtonHref: data.finalCtaButtonHref ? toAbsoluteHref(data.finalCtaButtonHref) : "",
  };
});

export const getDestinations = cache(async (): Promise<Destination[]> => {
  const data = await fetchSanity<any[]>(DESTINATIONS_QUERY, undefined, ["destination"]);
  if (!data?.length) return [];

  return data.map((item) => mapDestination(item));
});

export const getDestinationSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(DESTINATION_SLUGS_QUERY, undefined, ["destination"]);
  return data?.length ? data.map((item) => item.slug) : [];
});

export const getDestinationBySlug = cache(async (slug: string): Promise<Destination | null> => {
  const data = await fetchSanity<any>(DESTINATION_QUERY, { slug }, ["destination", "journey"]);
  if (!data) return null;

  return mapDestination(data);
});

export const getDestinationsPageData = cache(async (): Promise<DestinationsPageData> => {
  const data = await fetchSanity<any>(DESTINATIONS_PAGE_QUERY, undefined, ["destinationsPage"]);
  if (!data) {
    return {
      heroImage: "",
      title: "",
      ctaEyebrow: "",
      ctaTitle: "",
      ctaSubtitle: "",
      ctaButtonLabel: "",
      ctaButtonHref: "",
    };
  }

  return {
    heroImage: imageUrl(data.heroImage, 2200, 1200, ""),
    title: data.title || "",
    ctaEyebrow: data.ctaEyebrow || "",
    ctaTitle: data.ctaTitle || "",
    ctaSubtitle: data.ctaSubtitle || "",
    ctaButtonLabel: data.ctaButtonLabel || "",
    ctaButtonHref: data.ctaButtonHref ? toAbsoluteHref(data.ctaButtonHref) : "",
  };
});

export const getDestinationListings = cache(async () => {
  const data = await fetchSanity<any[]>(DESTINATIONS_QUERY, undefined, ["destination"]);
  if (!data?.length) return [];

  return data.map((item) => ({
    slug: item.slug,
    name: item.name,
    img: imageUrl(item.listingImage, 1200, 900, ""),
    imageFirst: item.listingImageFirst ?? true,
    p1: item.listingBody1 || item.blurb,
    p2: item.listingBody2 || "",
  }));
});

export const getJourneys = cache(async (): Promise<Journey[]> => {
  const data = await fetchSanity<any[]>(JOURNEYS_QUERY, undefined, ["journey"]);
  if (!data?.length) return [];

  return data.map((item) => mapJourney(item));
});

export const getJourneySlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(JOURNEY_SLUGS_QUERY, undefined, ["journey"]);
  return data?.length ? data.map((item) => item.slug) : [];
});

export const getJourneyBySlug = cache(async (slug: string): Promise<Journey | null> => {
  const data = await fetchSanity<any>(JOURNEY_QUERY, { slug }, ["journey"]);
  if (!data) return null;

  return mapJourney(data);
});

export const getJourneysPageData = cache(async (): Promise<JourneysPageData> => {
  const data = await fetchSanity<any>(JOURNEYS_PAGE_QUERY, undefined, ["journeysPage"]);
  if (!data) {
    return {
      title: "",
      body: "",
      filterPlaceholder: "",
      seeMoreLabel: "",
      supportTitle: "",
      supportHeading: "",
      supportBody: "",
      supportButtonLabel: "",
      supportButtonHref: "",
      supportImage: "",
    };
  }

  return {
    title: data.title || "",
    body: data.body || "",
    filterPlaceholder: data.filterPlaceholder || "",
    seeMoreLabel: data.seeMoreLabel || "",
    supportTitle: data.supportTitle || "",
    supportHeading: data.supportHeading || "",
    supportBody: data.supportBody || "",
    supportButtonLabel: data.supportButtonLabel || "",
    supportButtonHref: data.supportButtonHref ? toAbsoluteHref(data.supportButtonHref) : "",
    supportImage: imageUrl(data.supportImage, 1400, 940, ""),
  };
});

export const getExperiencesPageData = cache(async (): Promise<ExperiencesPageData> => {
  const data = await fetchSanity<any>(EXPERIENCES_PAGE_QUERY, undefined, ["experiencesPage"]);
  if (!data) {
    return { title: [], description: [], heroImage: "", heroVideo: "" };
  }

  return {
    title: data.title || [],
    description: data.description || [],
    heroImage: imageUrl(data.heroImage, 1800, 900, ""),
    heroVideo: data.heroVideo?.url || "",
  };
});

export const getInspirations = cache(async (): Promise<Inspiration[]> => {
  const data = await fetchSanity<any[]>(INSPIRATION_ARTICLES_QUERY, undefined, ["inspirationArticle", "author", "destination"]);
  if (!data?.length) return [];

  return data.map((item) => mapInspiration(item));
});

export const getInspirationSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(INSPIRATION_SLUGS_QUERY, undefined, ["inspirationArticle"]);
  return data?.length ? data.map((item) => item.slug) : [];
});

export const getInspirationBySlug = cache(async (slug: string): Promise<Inspiration | null> => {
  const data = await fetchSanity<any>(INSPIRATION_ARTICLE_QUERY, { slug }, ["inspirationArticle", "author", "destination"]);
  if (!data) return null;

  return mapInspiration(data);
});

export const getInspirationPageData = cache(async (): Promise<InspirationPageData> => {
  const data = await fetchSanity<any>(INSPIRATION_PAGE_QUERY, undefined, ["inspirationPage"]);
  if (!data) {
    return {
      heroQuote: "",
      heroSubheading: "",
      gridTitle: "",
      supportTitle: "",
      supportHeading: "",
      supportBody: "",
      supportButtonLabel: "",
      supportButtonHref: "",
      supportImage: "",
    };
  }

  return {
    heroQuote: data.heroQuote || "",
    heroSubheading: data.heroSubheading || "",
    gridTitle: data.gridTitle || "",
    supportTitle: data.supportTitle || "",
    supportHeading: data.supportHeading || "",
    supportBody: data.supportBody || "",
    supportButtonLabel: data.supportButtonLabel || "",
    supportButtonHref: data.supportButtonHref ? toAbsoluteHref(data.supportButtonHref) : "",
    supportImage: imageUrl(data.supportImage, 1400, 940, ""),
  };
});

export const getAboutPageData = cache(async (): Promise<AboutPageData> => {
  const data = await fetchSanity<any>(ABOUT_PAGE_QUERY, undefined, ["aboutPage"]);
  if (!data) {
    return {
      heroImage: "",
      heroVideo: "",
      heroTagline: "",
      introTitle: "",
      introParagraphs: [],
      pillars: [],
      visionImage: "",
      visionTitle: "",
      visionBody: "",
      missionTitle: "",
      missionBody: "",
      valuesTitle: "",
      values: [],
      foundersTitle: "",
      founders: [],
      ctaEyebrow: "",
      ctaTitle: "",
      ctaSubtitle: "",
      ctaButtonLabel: "",
      ctaButtonHref: "",
    };
  }

  return {
    heroImage: imageUrl(data.heroImage, 2200, 1600, ""),
    heroVideo: data.heroVideo || "",
    heroTagline: data.heroTagline || "",
    introTitle: data.introTitle || "",
    introParagraphs: data.introParagraphs?.length ? data.introParagraphs : [],
    creatorsImage: data.creatorsImage || undefined,
    pillars: data.pillars?.length
      ? data.pillars.map((p: any) =>
          p != null && typeof p === "object"
            ? { label: p.label || "" }
            : { label: String(p || "") }
        )
      : [],
    visionImage: imageUrl(data.visionImage, 1600, 980, ""),
    visionTitle: data.visionTitle || "",
    visionBody: data.visionBody || "",
    missionTitle: data.missionTitle || "",
    missionBody: data.missionBody || "",
    valuesTitle: data.valuesTitle || "",
    values: data.values?.length ? data.values : [],
    foundersTitle: data.foundersTitle || "",
    founders: data.founders?.length
      ? data.founders.map((item: any) => ({
          name: item.name,
          role: item.role || undefined,
          bio: item.bio,
          linkedin: item.linkedin || undefined,
          img: imageUrl(item.image, 1000, 820, ""),
        }))
      : [],
    ctaEyebrow: data.ctaEyebrow || "",
    ctaTitle: data.ctaTitle || "",
    ctaSubtitle: data.ctaSubtitle || "",
    ctaButtonLabel: data.ctaButtonLabel || "",
    ctaButtonHref: data.ctaButtonHref ? toAbsoluteHref(data.ctaButtonHref) : "",
  };
});

export type ContentPage = {
  title: string;
  heroImage: string;
  body: any[];
};

export const getContentPageSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(CONTENT_PAGE_SLUGS_QUERY, undefined, ["contentPage"]);
  return data?.length ? data.map((item) => item.slug) : [];
});

export const getContentPageBySlug = cache(async (slug: string): Promise<ContentPage | null> => {
  const data = await fetchSanity<any>(CONTENT_PAGE_QUERY, { slug }, ["contentPage"]);
  if (!data) return null;
  return {
    title: data.title || "",
    heroImage: imageUrl(data.heroImage, 1520, 760, ""),
    body: data.body || [],
  };
});
