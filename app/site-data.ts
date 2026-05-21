import { cache } from "react";

import * as fallback from "./site-fallback-data";
import { isSanityConfigured } from "../sanity/env";
import { readClient } from "../sanity/lib/client";
import { urlForImage } from "../sanity/lib/image";
import {
  ABOUT_PAGE_QUERY,
  DESTINATIONS_PAGE_QUERY,
  DESTINATIONS_QUERY,
  DESTINATION_QUERY,
  DESTINATION_SLUGS_QUERY,
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
  detail: {
    heroImg: string;
    heroTitle: string;
    heroSubtitle: string;
    scriptImg: string | null;
    desc1: string;
    desc2: string;
    gallery: [string, string];
    ctaImg: string;
  };
};

export type Journey = {
  slug: string;
  img: string;
  alt: string;
  title: string;
  desc: string;
  fullDesc: string[];
  accent: string;
  lightText: boolean;
  hasDivider: boolean;
  destination: string;
  featured: boolean;
  details: [string, string][];
  inclusions: string[];
  highlightsImg: string;
  priceFrom: string;
  priceBasis: string;
  priceCtaTitle: string;
  itinerary: {
    day: string;
    title: string;
    img: string;
    activities: string[];
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
export type Testimonial = { quote: string; body: string; author: string };
export type FooterColumn = { head: string; links: string[] };
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
  aboutBody: string;
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

type InspirationPageData = {
  heroQuote: string;
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
  pillars: { label: string; icon: string }[];
  visionImage: string;
  visionTitle: string;
  visionBody: string;
  missionTitle: string;
  missionBody: string;
  valuesTitle: string;
  values: { title: string; desc: string }[];
  foundersTitle: string;
  founders: { img: string; name: string; bio: string }[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

function imageUrl(source: unknown, width: number, height?: number, fallbackUrl = "") {
  const builder = urlForImage(source as { asset?: unknown } | null);
  if (!builder) return fallbackUrl;
  const sized = height ? builder.width(width).height(height).fit("crop") : builder.width(width).fit("max");
  return sized.url();
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

const fallbackSiteSettings: SiteSettings = {
  navItems: [
    { label: "Destinations", href: "/destinations" },
    { label: "Journeys", href: "/journeys" },
    { label: "Inspiration", href: "/inspiration" },
    { label: "About", href: "/about" },
  ],
  headerActions: [
    { label: "Plan Your Journey", href: "/plan", variant: "outline" },
    { label: "Contact Us", href: "/contact", variant: "solid" },
  ],
  logos: {
    light: fallback.IMG.logoLight,
    dark: fallback.IMG.logoDark,
    onLight: fallback.IMG.logoOnLight,
    footerIcon: fallback.IMG.footerIcon,
    copyright: fallback.IMG.copyright,
  },
  newsletter: {
    title: "Subscribe For Insider Travel Access",
    body: "Subscribe to our newsletter and receive expert travel inspiration, insider tips.",
    backgroundImage: fallback.IMG.newsletterBg,
    inputPlaceholder: "Enter your email",
    buttonLabel: "Subscribe",
  },
  footer: {
    ctaLabel: "Plan Your Journey",
    ctaHref: "/plan",
    year: 2026,
    copyrightText: "TIVOR . All Rights Reserved",
    followLabel: "Follow Us On",
    columns: fallback.footerColumns,
    socialLinks: [
      { platform: "Instagram", href: "#", icon: fallback.IMG.instagram },
      { platform: "LinkedIn", href: "#", icon: fallback.IMG.linkedin },
    ],
  },
  destinationFeatures: fallback.destinationFeatures,
  recommendedExperiences: fallback.recommendedExperiences,
  contactImage: "https://www.figma.com/api/mcp/asset/21418212-c63a-4ac4-8049-9f6ff0f9fa4c",
};

const fallbackHomePage: HomePageData = {
  heroVideo: "",
  heroPosterImage: "",
  heroImage: fallback.IMG.hero,
  heroTitle: "Discover Extraordinary Journeys Crafted Exclusively For You",
  heroSubtitle:
    "From hidden cultural treasures to breathtaking natural wonders, every experience is tailored to you.",
  introTitle: "Discover . Experience . Remember",
  introParagraphs: [
    "Travel is the art of exploring the extraordinary. From breathtaking landscapes to vibrant cultures, every journey offers a story waiting to be discovered.",
    "Let every destination inspire you, every experience transform you, and every journey become unforgettable.",
  ],
  featuredDestinationsLabel: "FEATURED DESTINATIONS",
  featuredDestinationsTitle: "Discover The Most Impressive Destinations",
  featuredDestinations: fallback.destinations,
  curatedJourneysLabel: "CURATED JOURNEYS",
  curatedJourneysTitle: "Tailored Journeys Specially For You",
  curatedJourneysLinkLabel: "Explore All Journeys",
  curatedJourneysLinkHref: "/journeys",
  featuredJourneys: fallback.journeys.filter((journey) => journey.featured),
  experiencesLabel: "UNIQUE EXPERIENCES",
  experiencesTitle: "Discover Wide Range Of Unique Experiences",
  experiencesButtonLabel: "Discover More Experiences",
  experiencesButtonHref: "#",
  experiences: fallback.experiences,
  aboutLabel: "WHO WE ARE",
  aboutTitleLineOne: "We Are A",
  aboutTitleLineTwo: "Luxury Tour Company",
  aboutImage: fallback.IMG.aboutHero,
  aboutBody:
    "We plan to provide our customers with customized, high-end travel plans by listening to our customers' needs and design a travel plan especially for them. By mixing the local identity with our touches of luxury we provide one-of-a-kind experiences.",
  aboutLinkLabel: "Read More",
  aboutLinkHref: "/about",
  whyTravelLabel: "WHY TRAVEL WITH US",
  whyTravelTitleLineOne: "More Than A Trip -",
  whyTravelTitleLineTwo: "A Meaningful Journey",
  whyTravelLinkLabel: "Travel With Us",
  whyTravelLinkHref: "#",
  whyTravelImage: "https://www.figma.com/api/mcp/asset/a1c97108-6955-42ca-be1a-881db5e71b07",
  reasons: fallback.reasons,
  testimonialsLabel: "TESTIMONIALS",
  testimonialsTitleLineOne: "Stories From Guests",
  testimonialsTitleLineTwo: "Who Travelled With Us",
  testimonials: fallback.testimonials,
  finalCtaEyebrow: "Experience Tivor",
  finalCtaTitle: "Travel Without Limits",
  finalCtaButtonLabel: "Begin Your Journey",
  finalCtaButtonHref: "/plan",
};

const fallbackDestinationsPage: DestinationsPageData = {
  heroImage: "https://www.figma.com/api/mcp/asset/a54bfb63-1682-4717-a58a-69efe129e7a1",
  title: "Destinations",
  ctaEyebrow: "Experience Tivor",
  ctaTitle: "Travel Without Limits",
  ctaSubtitle: "",
  ctaButtonLabel: "Begin Your Journey",
  ctaButtonHref: "/plan",
};

const fallbackDestinationListings = [
  {
    slug: "slovenia",
    name: "Slovenia",
    img: "https://www.figma.com/api/mcp/asset/8a9e4dc7-06c1-4851-9f2e-6266ed8074b4",
    imageFirst: true,
    p1: "From the iconic beauty of Lake Bled to the vibrant streets of Ljubljana, it offers a perfect blend of nature, culture, and tranquility.",
    p2: "Explore medieval castles, serene alpine lakes, and lush meadows in one of Europe's most captivating hidden gems.",
  },
  {
    slug: "iceland",
    name: "Iceland",
    img: "https://www.figma.com/api/mcp/asset/ef73bc48-e2ea-42d2-9bd5-bbc50802d8b3",
    imageFirst: false,
    p1: "From the magical Northern Lights to its rugged natural beauty, every corner feels like a once-in-a-lifetime experience.",
    p2: "Discover geothermal hot springs, dramatic waterfalls, and vast volcanic landscapes that stretch endlessly to the horizon.",
  },
  {
    slug: "norway",
    name: "Norway",
    img: "https://www.figma.com/api/mcp/asset/d2a7b9fe-5534-42ba-9e3f-1d9f742ab879",
    imageFirst: true,
    p1: "From the Northern Lights in the Arctic to scenic train journeys through dramatic valleys, it offers unforgettable natural beauty at every turn.",
    p2: "Sail through majestic fjords, trek across ancient glaciers, and witness the midnight sun over some of the world's most breathtaking coastlines.",
  },
];

const fallbackJourneysPage: JourneysPageData = {
  title: "Be Inspired by Our Journeys Designed Exclusively for You",
  body:
    "We craft bespoke travel experiences that reflect your passions, preferences, and pace. From handpicked destinations to personalized itineraries and exclusive moments, every detail is thoughtfully curated to create a journey that feels uniquely yours—seamless, meaningful, and truly unforgettable.",
  filterPlaceholder: "Choose Your Destination",
  seeMoreLabel: "See More Journeys",
  supportTitle: "Can't Find What You Are Looking For?",
  supportHeading: "Allow Us To Guide You",
  supportBody: "Tell us how you envision your journey, and we'll design a bespoke experience tailored just for you.",
  supportButtonLabel: "Plan Your Journey",
  supportButtonHref: "/plan",
  supportImage: "https://www.figma.com/api/mcp/asset/56059e4b-715b-4c60-9ccf-9fdac96742ef",
};

const fallbackInspirationPage: InspirationPageData = {
  heroQuote:
    "Every Journey Leaves More Than Memories—It Leaves Moments That Stay With You Long After You've Returned.",
  gridTitle: "Inspired by Those Who've Wandered Before You",
  supportTitle: "Can't Find What You Are Looking For?",
  supportHeading: "Allow Us To Guide You",
  supportBody: "Tell us how you envision your journey, and we'll design a bespoke experience tailored just for you.",
  supportButtonLabel: "Plan Your Journey",
  supportButtonHref: "/plan",
  supportImage: "https://www.figma.com/api/mcp/asset/668f04eb-0691-4842-a060-5c68efa0d16e",
};

const fallbackAboutPage: AboutPageData = {
  heroImage: "/about-hero.jpg",
  heroVideo: "",
  heroTagline: "Imagine crafting your unique travel",
  introTitle: "A World of New Horizons",
  introParagraphs: [
    "At the heart of everything we do lies a simple belief—travel should be as unique as the individual experiencing it. We go beyond conventional itineraries to design journeys that reflect your passions, pace, and sense of discovery. Every detail is thoughtfully considered, from handpicked stays and seamless transfers to immersive experiences that connect you deeply with each destination.",
    "Our approach is rooted in understanding what truly matters to you. Whether it's the quiet luxury of a secluded retreat, the thrill of exploring untouched landscapes, or meaningful cultural encounters, we curate each journey with care and intention. With a commitment to elegance, authenticity, and effortless service, we transform travel into something far more than a trip—it becomes a story that is entirely your own.",
  ],
  pillars: [
    { label: "Sustainable", icon: "" },
    { label: "Immersive", icon: "" },
    { label: "Luxurious", icon: "" },
  ],
  visionImage: "https://www.figma.com/api/mcp/asset/592f3717-6353-441d-bf2a-faecc206e492",
  visionTitle: "The Vision",
  visionBody:
    "To instill a culture of true luxury and excellence in the travel sector and to actively contribute to the prosperity of all the countries from where it operates and to where it caters.",
  missionTitle: "The Mission",
  missionBody:
    "To embrace global and consumer changes in the travel sector by providing our customers with the opportunity to experience the world's most untamed locations in a luxurious, immersive, and sustainable way.",
  valuesTitle: "Our Values",
  values: [
    {
      title: "High Quality Services",
      desc: "To instill a culture of true luxury and excellence in the travel sector and to actively contribute to the prosperity of all the countries from where it operates and to where it caters.",
    },
    {
      title: "Immersed in Local Culture",
      desc: "To instill a culture of true luxury and excellence in the travel sector and to actively contribute to the prosperity of all the countries from where it operates and to where it caters.",
    },
    {
      title: "Sustainable Tourism",
      desc: "To instill a culture of true luxury and excellence in the travel sector and to actively contribute to the prosperity of all the countries from where it operates and to where it caters.",
    },
  ],
  foundersTitle: "Meet The Founders",
  founders: [
    {
      img: "https://www.figma.com/api/mcp/asset/f46cb05c-18e3-442a-adce-e3741a1d9b81",
      name: "John Thomas",
      bio: "A passionate traveler turned entrepreneur, the founder brings a deep love for exploration and cultural discovery into every journey curated by the company.",
    },
    {
      img: "https://www.figma.com/api/mcp/asset/aebbc67f-ea77-41ba-81eb-11fa124aebc9",
      name: "Aleena David",
      bio: "A passionate traveler turned entrepreneur, the founder brings a deep love for exploration and cultural discovery into every journey curated by the company.",
    },
  ],
  ctaEyebrow: "Experience Tivor",
  ctaTitle: "Travel Differently",
  ctaSubtitle: "",
  ctaButtonLabel: "Begin Your Journey",
  ctaButtonHref: "/plan",
};

function mapDestination(item: any, fallbackItem?: Destination): Destination {
  return {
    slug: item.slug,
    img: imageUrl(item.cardImage, 900, 1060, fallbackItem?.img || ""),
    name: item.name,
    blurb: item.blurb,
    region: item.region,
    bestSeason: item.bestSeason,
    tone: item.tone,
    detail: {
      heroImg: imageUrl(item.detailHeroImage, 2000, 1200, fallbackItem?.detail.heroImg || ""),
      heroTitle: item.detailHeroTitle,
      heroSubtitle: item.detailHeroSubtitle,
      scriptImg: item.detailScriptImage ? imageUrl(item.detailScriptImage, 500) : null,
      desc1: item.detailDescription1,
      desc2: item.detailDescription2,
      gallery: [
        imageUrl(item.detailGallery?.[0], 1600, 1100, fallbackItem?.detail.gallery[0] || ""),
        imageUrl(item.detailGallery?.[1], 1600, 1100, fallbackItem?.detail.gallery[1] || ""),
      ] as [string, string],
      ctaImg: imageUrl(item.ctaImage, 1200, 1000, fallbackItem?.detail.ctaImg || imageUrl(item.detailHeroImage, 1600, 900)),
    },
  };
}

function mapJourney(item: any, fallbackItem?: Journey): Journey {
  return {
    slug: item.slug,
    img: imageUrl(item.cardImage || item.heroImage, 1200, 900, fallbackItem?.img || ""),
    alt: item.alt || item.title,
    title: item.title,
    desc: item.shortDescription,
    fullDesc: item.fullDescription || [],
    accent: fallbackItem?.accent || `bg-[${item.accentColor || "#ece2d6"}]`,
    lightText: Boolean(item.lightText),
    hasDivider: Boolean(item.hasDivider),
    destination: item.destination,
    featured: Boolean(item.featuredOnHome),
    details: (item.facts || []).map((fact: { label: string; value: string }) => [fact.label, fact.value]) as [
      string,
      string,
    ][],
    inclusions: item.inclusions?.length ? item.inclusions : (fallbackItem?.inclusions ?? []),
    highlightsImg: fallbackItem?.highlightsImg || imageUrl(item.heroImage || item.cardImage, 1600, 1000),
    priceFrom: item.priceFrom || "",
    priceBasis: item.priceBasis || "",
    priceCtaTitle: item.priceCtaTitle || "",
    itinerary: (item.itinerary || []).map((stop: any, index: number) => ({
      day: stop.day,
      title: stop.title,
      img: imageUrl(stop.image, 1400, 900, fallbackItem?.itinerary[index]?.img || ""),
      activities: stop.activities || [],
    })),
  };
}

function mapInspiration(item: any, fallbackItem?: Inspiration): Inspiration {
  const destinationLabel = item.destination?.toUpperCase?.() || fallbackItem?.destination || "";

  return {
    slug: item.slug,
    img: imageUrl(item.cardImage, 1000, 806, fallbackItem?.img || ""),
    date: item.publishDate
      ? new Date(item.publishDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : fallbackItem?.date || "",
    destination: destinationLabel,
    title: item.title,
    avatar: imageUrl(item.author?.avatar, 240, 240, fallbackItem?.avatar || ""),
    author: item.author?.name || fallbackItem?.author || "",
    role: item.author?.role || fallbackItem?.role || "",
    intro: item.intro,
    heroImg: imageUrl(item.heroImage, 2000, 1200, fallbackItem?.heroImg || ""),
    section1: {
      title: item.section1Title,
      body: item.section1Body || [],
      img: imageUrl(item.section1Image, 1200, 1400, fallbackItem?.section1.img || ""),
    },
    gallerySection: {
      title: item.galleryTitle,
      body: item.galleryBody,
      images: [
        imageUrl(item.galleryImages?.[0], 1200, 900, fallbackItem?.gallerySection.images[0] || ""),
        imageUrl(item.galleryImages?.[1], 1200, 900, fallbackItem?.gallerySection.images[1] || ""),
        imageUrl(item.galleryImages?.[2], 1200, 900, fallbackItem?.gallerySection.images[2] || ""),
      ] as [string, string, string],
    },
    section2: {
      title: item.section2Title,
      body: item.section2Body || [],
      img: imageUrl(item.section2Image, 1200, 1400, fallbackItem?.section2.img || ""),
    },
    closingText: item.closingText,
    ctaTitle: item.ctaTitle,
    ctaBody: item.ctaBody,
    ctaButtonLabel: item.ctaButtonLabel || fallbackItem?.ctaButtonLabel || "Plan Your Journey",
    ctaButtonHref: item.ctaButtonHref || fallbackItem?.ctaButtonHref || "/plan",
    ctaImg: imageUrl(item.ctaImage, 1200, 1000, fallbackItem?.ctaImg || ""),
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await fetchSanity<any>(SITE_SETTINGS_QUERY, undefined, ["siteSettings"]);
  if (!data) return fallbackSiteSettings;

  return {
    navItems: data.navItems?.length
      ? data.navItems.map((item: any) => ({ label: item.label, href: toAbsoluteHref(item.href) }))
      : fallbackSiteSettings.navItems,
    headerActions: data.headerActions?.length
      ? data.headerActions.map((action: any) => ({ label: action.label, href: toAbsoluteHref(action.href), variant: action.variant }))
      : fallbackSiteSettings.headerActions,
    logos: {
      light: imageUrl(data.logos?.light, 500, undefined, fallbackSiteSettings.logos.light),
      dark: imageUrl(data.logos?.dark, 500, undefined, fallbackSiteSettings.logos.dark),
      onLight: imageUrl(data.logos?.onLight, 500, undefined, fallbackSiteSettings.logos.onLight),
      footerIcon: imageUrl(data.logos?.footerIcon, 200, undefined, fallbackSiteSettings.logos.footerIcon),
      copyright: imageUrl(data.logos?.copyright, 80, undefined, fallbackSiteSettings.logos.copyright),
    },
    newsletter: {
      title: data.newsletter?.title || fallbackSiteSettings.newsletter.title,
      body: data.newsletter?.body || fallbackSiteSettings.newsletter.body,
      backgroundImage: imageUrl(
        data.newsletter?.backgroundImage,
        2200,
        900,
        fallbackSiteSettings.newsletter.backgroundImage,
      ),
      inputPlaceholder: data.newsletter?.inputPlaceholder || fallbackSiteSettings.newsletter.inputPlaceholder,
      buttonLabel: data.newsletter?.buttonLabel || fallbackSiteSettings.newsletter.buttonLabel,
    },
    footer: {
      ctaLabel: data.footer?.ctaLabel || fallbackSiteSettings.footer.ctaLabel,
      ctaHref: data.footer?.ctaHref || fallbackSiteSettings.footer.ctaHref,
      year: data.footer?.year || fallbackSiteSettings.footer.year,
      copyrightText: data.footer?.copyrightText || fallbackSiteSettings.footer.copyrightText,
      followLabel: data.footer?.followLabel || fallbackSiteSettings.footer.followLabel,
      columns: data.footer?.columns?.length ? data.footer.columns : fallbackSiteSettings.footer.columns,
      socialLinks: data.footer?.socialLinks?.length
        ? data.footer.socialLinks.map((item: any, index: number) => ({
            platform: item.platform,
            href: item.href || "#",
            icon: imageUrl(item.icon, 64, undefined, fallbackSiteSettings.footer.socialLinks[index]?.icon || ""),
          }))
        : fallbackSiteSettings.footer.socialLinks,
    },
    destinationFeatures: data.destinationFeatures?.length
      ? data.destinationFeatures.map((item: any, index: number) => ({
          title: item.title,
          desc: item.desc,
          img: imageUrl(item.image, 110, undefined, fallbackSiteSettings.destinationFeatures[index]?.img || ""),
        }))
      : fallbackSiteSettings.destinationFeatures,
    recommendedExperiences: data.recommendedExperiences?.length
      ? data.recommendedExperiences.map((item: any, index: number) => ({
          title: item.title,
          country: item.country,
          img: imageUrl(item.image, 900, 1100, fallbackSiteSettings.recommendedExperiences[index]?.img || ""),
        }))
      : fallbackSiteSettings.recommendedExperiences,
    contactImage: imageUrl(data.contactImage, 1400, 1200, fallbackSiteSettings.contactImage),
  };
});

export const getHomePageData = cache(async (): Promise<HomePageData> => {
  const data = await fetchSanity<any>(HOME_PAGE_QUERY, undefined, ["homePage", "destination", "journey"]);
  if (!data) return fallbackHomePage;

  return {
    heroVideo: data.heroVideo?.asset?.url || "",
    heroPosterImage: imageUrl(data.heroPosterImage, 2200, 1300, ""),
    heroImage: imageUrl(data.heroImage, 2200, 1300, fallbackHomePage.heroImage),
    heroTitle: data.heroTitle || fallbackHomePage.heroTitle,
    heroSubtitle: data.heroSubtitle || fallbackHomePage.heroSubtitle,
    introTitle: data.introTitle || fallbackHomePage.introTitle,
    introParagraphs: data.introParagraphs?.length ? data.introParagraphs : fallbackHomePage.introParagraphs,
    featuredDestinationsLabel: data.featuredDestinationsLabel || fallbackHomePage.featuredDestinationsLabel,
    featuredDestinationsTitle: data.featuredDestinationsTitle || fallbackHomePage.featuredDestinationsTitle,
    featuredDestinations: data.featuredDestinations?.length
      ? data.featuredDestinations.map((item: any, index: number) => mapDestination(item, fallback.destinations[index]))
      : fallbackHomePage.featuredDestinations,
    curatedJourneysLabel: data.curatedJourneysLabel || fallbackHomePage.curatedJourneysLabel,
    curatedJourneysTitle: data.curatedJourneysTitle || fallbackHomePage.curatedJourneysTitle,
    curatedJourneysLinkLabel: data.curatedJourneysLinkLabel || fallbackHomePage.curatedJourneysLinkLabel,
    curatedJourneysLinkHref: data.curatedJourneysLinkHref || fallbackHomePage.curatedJourneysLinkHref,
    featuredJourneys: data.featuredJourneys?.length
      ? data.featuredJourneys.map((item: any, index: number) => mapJourney(item, fallbackHomePage.featuredJourneys[index]))
      : fallbackHomePage.featuredJourneys,
    experiencesLabel: data.experiencesLabel || fallbackHomePage.experiencesLabel,
    experiencesTitle: data.experiencesTitle || fallbackHomePage.experiencesTitle,
    experiencesButtonLabel: data.experiencesButtonLabel || fallbackHomePage.experiencesButtonLabel,
    experiencesButtonHref: data.experiencesButtonHref || fallbackHomePage.experiencesButtonHref,
    experiences: data.experiences?.length
      ? data.experiences.map((item: any, index: number) => ({
          label: item.label,
          img: imageUrl(item.image, 2000, 480, fallbackHomePage.experiences[index]?.img || ""),
        }))
      : fallbackHomePage.experiences,
    aboutLabel: data.aboutLabel || fallbackHomePage.aboutLabel,
    aboutTitleLineOne: data.aboutTitleLineOne || fallbackHomePage.aboutTitleLineOne,
    aboutTitleLineTwo: data.aboutTitleLineTwo || fallbackHomePage.aboutTitleLineTwo,
    aboutImage: imageUrl(data.aboutImage, 1800, 780, fallbackHomePage.aboutImage),
    aboutBody: data.aboutBody || fallbackHomePage.aboutBody,
    aboutLinkLabel: data.aboutLinkLabel || fallbackHomePage.aboutLinkLabel,
    aboutLinkHref: data.aboutLinkHref || fallbackHomePage.aboutLinkHref,
    whyTravelLabel: data.whyTravelLabel || fallbackHomePage.whyTravelLabel,
    whyTravelTitleLineOne: data.whyTravelTitleLineOne || fallbackHomePage.whyTravelTitleLineOne,
    whyTravelTitleLineTwo: data.whyTravelTitleLineTwo || fallbackHomePage.whyTravelTitleLineTwo,
    whyTravelLinkLabel: data.whyTravelLinkLabel || fallbackHomePage.whyTravelLinkLabel,
    whyTravelLinkHref: data.whyTravelLinkHref || fallbackHomePage.whyTravelLinkHref,
    whyTravelImage: imageUrl(data.whyTravelImage, 1200, 1500, fallbackHomePage.whyTravelImage),
    reasons: data.reasons?.length ? data.reasons : fallbackHomePage.reasons,
    testimonialsLabel: data.testimonialsLabel || fallbackHomePage.testimonialsLabel,
    testimonialsTitleLineOne: data.testimonialsTitleLineOne || fallbackHomePage.testimonialsTitleLineOne,
    testimonialsTitleLineTwo: data.testimonialsTitleLineTwo || fallbackHomePage.testimonialsTitleLineTwo,
    testimonials: data.testimonials?.length ? data.testimonials : fallbackHomePage.testimonials,
    finalCtaEyebrow: data.finalCtaEyebrow || fallbackHomePage.finalCtaEyebrow,
    finalCtaTitle: data.finalCtaTitle || fallbackHomePage.finalCtaTitle,
    finalCtaButtonLabel: data.finalCtaButtonLabel || fallbackHomePage.finalCtaButtonLabel,
    finalCtaButtonHref: data.finalCtaButtonHref || fallbackHomePage.finalCtaButtonHref,
  };
});

export const getDestinations = cache(async (): Promise<Destination[]> => {
  const data = await fetchSanity<any[]>(DESTINATIONS_QUERY, undefined, ["destination"]);
  if (!data?.length) return fallback.destinations;

  return data.map((item, index) => mapDestination(item, fallback.destinations[index]));
});

export const getDestinationSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(DESTINATION_SLUGS_QUERY, undefined, ["destination"]);
  return data?.length ? data.map((item) => item.slug) : fallback.destinations.map((item) => item.slug);
});

export const getDestinationBySlug = cache(async (slug: string): Promise<Destination | null> => {
  const data = await fetchSanity<any>(DESTINATION_QUERY, { slug }, ["destination"]);
  if (!data) return fallback.destinations.find((item) => item.slug === slug) || null;

  return mapDestination(data, fallback.destinations.find((item) => item.slug === slug));
});

export const getDestinationsPageData = cache(async (): Promise<DestinationsPageData> => {
  const data = await fetchSanity<any>(DESTINATIONS_PAGE_QUERY, undefined, ["destinationsPage"]);
  if (!data) return fallbackDestinationsPage;

  return {
    heroImage: imageUrl(data.heroImage, 2200, 1200, fallbackDestinationsPage.heroImage),
    title: data.title || fallbackDestinationsPage.title,
    ctaEyebrow: data.ctaEyebrow || fallbackDestinationsPage.ctaEyebrow,
    ctaTitle: data.ctaTitle || fallbackDestinationsPage.ctaTitle,
    ctaSubtitle: data.ctaSubtitle || fallbackDestinationsPage.ctaSubtitle,
    ctaButtonLabel: data.ctaButtonLabel || fallbackDestinationsPage.ctaButtonLabel,
    ctaButtonHref: data.ctaButtonHref || fallbackDestinationsPage.ctaButtonHref,
  };
});

export const getDestinationListings = cache(async () => {
  const data = await fetchSanity<any[]>(DESTINATIONS_QUERY, undefined, ["destination"]);
  if (!data?.length) return fallbackDestinationListings;

  return data.map((item, index) => ({
    slug: item.slug,
    name: item.name,
    img: imageUrl(item.listingImage, 1200, 900, fallbackDestinationListings[index]?.img || ""),
    imageFirst: item.listingImageFirst ?? fallbackDestinationListings[index]?.imageFirst ?? true,
    p1: item.listingBody1 || fallbackDestinationListings[index]?.p1 || item.blurb,
    p2: item.listingBody2 || fallbackDestinationListings[index]?.p2 || item.tone,
  }));
});

export const getJourneys = cache(async (): Promise<Journey[]> => {
  const data = await fetchSanity<any[]>(JOURNEYS_QUERY, undefined, ["journey"]);
  if (!data?.length) return fallback.journeys;

  return data.map((item, index) => mapJourney(item, fallback.journeys[index]));
});

export const getJourneySlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(JOURNEY_SLUGS_QUERY, undefined, ["journey"]);
  return data?.length ? data.map((item) => item.slug) : fallback.journeys.map((item) => item.slug);
});

export const getJourneyBySlug = cache(async (slug: string): Promise<Journey | null> => {
  const data = await fetchSanity<any>(JOURNEY_QUERY, { slug }, ["journey"]);
  if (!data) return fallback.journeys.find((item) => item.slug === slug) || null;

  return mapJourney(data, fallback.journeys.find((item) => item.slug === slug));
});

export const getJourneysPageData = cache(async (): Promise<JourneysPageData> => {
  const data = await fetchSanity<any>(JOURNEYS_PAGE_QUERY, undefined, ["journeysPage"]);
  if (!data) return fallbackJourneysPage;

  return {
    title: data.title || fallbackJourneysPage.title,
    body: data.body || fallbackJourneysPage.body,
    filterPlaceholder: data.filterPlaceholder || fallbackJourneysPage.filterPlaceholder,
    seeMoreLabel: data.seeMoreLabel || fallbackJourneysPage.seeMoreLabel,
    supportTitle: data.supportTitle || fallbackJourneysPage.supportTitle,
    supportHeading: data.supportHeading || fallbackJourneysPage.supportHeading,
    supportBody: data.supportBody || fallbackJourneysPage.supportBody,
    supportButtonLabel: data.supportButtonLabel || fallbackJourneysPage.supportButtonLabel,
    supportButtonHref: data.supportButtonHref || fallbackJourneysPage.supportButtonHref,
    supportImage: imageUrl(data.supportImage, 1400, 940, fallbackJourneysPage.supportImage),
  };
});

export const getInspirations = cache(async (): Promise<Inspiration[]> => {
  const data = await fetchSanity<any[]>(INSPIRATION_ARTICLES_QUERY, undefined, ["inspirationArticle", "author", "destination"]);
  if (!data?.length) return fallback.inspirations;

  return data.map((item, index) => mapInspiration(item, fallback.inspirations[index]));
});

export const getInspirationSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchSanity<{ slug: string }[]>(INSPIRATION_SLUGS_QUERY, undefined, ["inspirationArticle"]);
  return data?.length ? data.map((item) => item.slug) : fallback.inspirations.map((item) => item.slug);
});

export const getInspirationBySlug = cache(async (slug: string): Promise<Inspiration | null> => {
  const data = await fetchSanity<any>(INSPIRATION_ARTICLE_QUERY, { slug }, ["inspirationArticle", "author", "destination"]);
  if (!data) return fallback.inspirations.find((item) => item.slug === slug) || null;

  return mapInspiration(data, fallback.inspirations.find((item) => item.slug === slug));
});

export const getInspirationPageData = cache(async (): Promise<InspirationPageData> => {
  const data = await fetchSanity<any>(INSPIRATION_PAGE_QUERY, undefined, ["inspirationPage"]);
  if (!data) return fallbackInspirationPage;

  return {
    heroQuote: data.heroQuote || fallbackInspirationPage.heroQuote,
    gridTitle: data.gridTitle || fallbackInspirationPage.gridTitle,
    supportTitle: data.supportTitle || fallbackInspirationPage.supportTitle,
    supportHeading: data.supportHeading || fallbackInspirationPage.supportHeading,
    supportBody: data.supportBody || fallbackInspirationPage.supportBody,
    supportButtonLabel: data.supportButtonLabel || fallbackInspirationPage.supportButtonLabel,
    supportButtonHref: data.supportButtonHref || fallbackInspirationPage.supportButtonHref,
    supportImage: imageUrl(data.supportImage, 1400, 940, fallbackInspirationPage.supportImage),
  };
});

export const getAboutPageData = cache(async (): Promise<AboutPageData> => {
  const data = await fetchSanity<any>(ABOUT_PAGE_QUERY, undefined, ["aboutPage"]);
  if (!data) return fallbackAboutPage;

  return {
    heroImage: imageUrl(data.heroImage, 2200, 1600, fallbackAboutPage.heroImage),
    heroVideo: data.heroVideo || "",
    heroTagline: data.heroTagline || fallbackAboutPage.heroTagline,
    introTitle: data.introTitle || fallbackAboutPage.introTitle,
    introParagraphs: data.introParagraphs?.length ? data.introParagraphs : fallbackAboutPage.introParagraphs,
    pillars: data.pillars?.length
      ? data.pillars.map((p: any) =>
          p != null && typeof p === "object"
            ? { label: p.label || "", icon: imageUrl(p.icon, 100, undefined, "") }
            : { label: String(p || ""), icon: "" }
        )
      : fallbackAboutPage.pillars,
    visionImage: imageUrl(data.visionImage, 1600, 980, fallbackAboutPage.visionImage),
    visionTitle: data.visionTitle || fallbackAboutPage.visionTitle,
    visionBody: data.visionBody || fallbackAboutPage.visionBody,
    missionTitle: data.missionTitle || fallbackAboutPage.missionTitle,
    missionBody: data.missionBody || fallbackAboutPage.missionBody,
    valuesTitle: data.valuesTitle || fallbackAboutPage.valuesTitle,
    values: data.values?.length ? data.values : fallbackAboutPage.values,
    foundersTitle: data.foundersTitle || fallbackAboutPage.foundersTitle,
    founders: data.founders?.length
      ? data.founders.map((item: any, index: number) => ({
          name: item.name,
          bio: item.bio,
          img: imageUrl(item.image, 1000, 820, fallbackAboutPage.founders[index]?.img || ""),
        }))
      : fallbackAboutPage.founders,
    ctaEyebrow: data.ctaEyebrow || fallbackAboutPage.ctaEyebrow,
    ctaTitle: data.ctaTitle || fallbackAboutPage.ctaTitle,
    ctaSubtitle: data.ctaSubtitle || fallbackAboutPage.ctaSubtitle,
    ctaButtonLabel: data.ctaButtonLabel || fallbackAboutPage.ctaButtonLabel,
    ctaButtonHref: data.ctaButtonHref || fallbackAboutPage.ctaButtonHref,
  };
});
