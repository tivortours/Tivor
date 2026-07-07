import { defineQuery } from "next-sanity";

// Shared journey card projection — reused wherever a full journey list/card
// is fetched (the journeys list, a single journey, a destination's curated
// carousel, and the home page's featured list) so all four stay in sync.
const JOURNEY_CARD_FIELDS = `
    title,
    alt,
    shortDescription,
    fullDescription,
    accentColor,
    lightText,
    hasDivider,
    "slug": slug.current,
    "destination": destination->slug.current,
    facts[]{
      label,
      value
    },
    inclusions,
    cardImage,
    heroImage,
    priceFrom,
    priceBasis,
    priceCtaTitle,
    itinerary[]{
      day,
      title,
      image,
      activities[]
    }
`;

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    navItems[]{
      label,
      href
    },
    headerActions[]{
      label,
      href,
      variant
    },
    logos{
      light,
      dark,
      onLight,
      footerIcon,
      copyright
    },
    newsletter{
      title,
      body,
      backgroundImage,
      inputPlaceholder,
      buttonLabel
    },
    footer{
      ctaLabel,
      ctaHref,
      year,
      copyrightText,
      followLabel,
      columns[]{
        head,
        links[]
      },
      socialLinks[]{
        platform,
        href,
        icon
      }
    },
    destinationFeatures[]{
      title,
      desc,
      image
    },
    recommendedExperiences[]{
      title,
      country,
      image
    },
    contactImage
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    heroTitle,
    heroSubtitle,
    "heroVideo": heroVideo.asset->{ url },
    heroPosterImage,
    heroImage,
    introTitle,
    introParagraphs,
    featuredDestinationsLabel,
    featuredDestinationsTitle,
    featuredDestinations[]->{
      name,
      blurb,
      "slug": slug.current,
      cardImage
    },
    curatedJourneysLabel,
    curatedJourneysTitle,
    curatedJourneysLinkLabel,
    curatedJourneysLinkHref,
    featuredJourneys[]->{
      ${JOURNEY_CARD_FIELDS}
    },
    "legacyFeaturedJourneys": *[_type == "journey" && featuredOnHome == true] | order(orderRank asc){
      ${JOURNEY_CARD_FIELDS}
    },
    experiencesLabel,
    experiencesTitle,
    experiencesButtonLabel,
    experiencesButtonHref,
    experiences[]{
      label,
      image
    },
    aboutLabel,
    aboutTitleLineOne,
    aboutTitleLineTwo,
    aboutImage,
    aboutBody,
    aboutTagline,
    aboutLinkLabel,
    aboutLinkHref,
    whyTravelLabel,
    whyTravelTitleLineOne,
    whyTravelTitleLineTwo,
    whyTravelLinkLabel,
    whyTravelLinkHref,
    whyTravelImage,
    reasons[]{
      title,
      desc
    },
    testimonialsLabel,
    testimonialsTitleLineOne,
    testimonialsTitleLineTwo,
    testimonials[]{
      quote,
      body,
      author,
      location
    },
    finalCtaEyebrow,
    finalCtaTitle,
    finalCtaButtonLabel,
    finalCtaButtonHref
  }
`);

export const DESTINATIONS_PAGE_QUERY = defineQuery(`
  *[_type == "destinationsPage"][0]{
    heroImage,
    title,
    ctaEyebrow,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonHref
  }
`);

export const DESTINATIONS_QUERY = defineQuery(`
  *[_type == "destination" && defined(slug.current)] | order(sortOrder asc, name asc){
    name,
    blurb,
    region,
    bestSeason,
    tone,
    "slug": slug.current,
    cardImage,
    listingImage,
    listingImageFirst,
    listingBody1,
    listingBody2,
    detailHeroImage,
    detailHeroTitle,
    detailHeroSubtitle,
    detailDescription1,
    detailDescription2,
    detailGallery,
    ctaImage
  }
`);

export const DESTINATION_SLUGS_QUERY = defineQuery(`
  *[_type == "destination" && defined(slug.current)][]{
    "slug": slug.current
  }
`);

export const DESTINATION_QUERY = defineQuery(`
  *[_type == "destination" && slug.current == $slug][0]{
    name,
    blurb,
    region,
    bestSeason,
    tone,
    "slug": slug.current,
    cardImage,
    listingImage,
    listingImageFirst,
    listingBody1,
    listingBody2,
    detailHeroImage,
    detailHeroTitle,
    detailHeroSubtitle,
    detailDescription1,
    detailDescription2,
    detailGallery,
    journeys[]->{
      ${JOURNEY_CARD_FIELDS}
    },
    ctaImage,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`);

export const JOURNEYS_PAGE_QUERY = defineQuery(`
  *[_type == "journeysPage"][0]{
    title,
    body,
    filterPlaceholder,
    seeMoreLabel,
    supportTitle,
    supportHeading,
    supportBody,
    supportButtonLabel,
    supportButtonHref,
    supportImage
  }
`);

export const EXPERIENCES_PAGE_QUERY = defineQuery(`
  *[_type == "experiencesPage"][0]{
    title,
    description,
    heroImage,
    "heroVideo": heroVideo.asset->{ url }
  }
`);

export const JOURNEYS_QUERY = defineQuery(`
  *[_type == "journey" && defined(slug.current)] | order(orderRank asc){
    ${JOURNEY_CARD_FIELDS}
  }
`);

export const JOURNEY_SLUGS_QUERY = defineQuery(`
  *[_type == "journey" && defined(slug.current)][]{
    "slug": slug.current
  }
`);

export const JOURNEY_QUERY = defineQuery(`
  *[_type == "journey" && slug.current == $slug][0]{
    detailTitle,
    priceCurrency,
    showIndicativePricingNote,
    ${JOURNEY_CARD_FIELDS}
  }
`);

export const INSPIRATION_PAGE_QUERY = defineQuery(`
  *[_type == "inspirationPage"][0]{
    heroQuote,
    heroSubheading,
    gridTitle,
    supportTitle,
    supportHeading,
    supportBody,
    supportButtonLabel,
    supportButtonHref,
    supportImage
  }
`);

export const INSPIRATION_ARTICLES_QUERY = defineQuery(`
  *[_type == "inspirationArticle" && defined(slug.current)] | order(sortOrder asc, publishDate desc){
    title,
    intro,
    publishDate,
    "slug": slug.current,
    cardImage,
    heroImage,
    closingText,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref,
    ctaImage,
    section1Title,
    section1Body,
    section1Image,
    galleryTitle,
    galleryBody,
    galleryImages,
    section2Title,
    section2Body,
    section2Image,
    "destination": coalesce(destination->name, destinationLabel),
    author->{
      name,
      role,
      avatar
    }
  }
`);

export const INSPIRATION_SLUGS_QUERY = defineQuery(`
  *[_type == "inspirationArticle" && defined(slug.current)][]{
    "slug": slug.current
  }
`);

export const INSPIRATION_ARTICLE_QUERY = defineQuery(`
  *[_type == "inspirationArticle" && slug.current == $slug][0]{
    title,
    intro,
    publishDate,
    "slug": slug.current,
    cardImage,
    heroImage,
    closingText,
    ctaTitle,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref,
    ctaImage,
    section1Title,
    section1Body,
    section1Image,
    galleryTitle,
    galleryBody,
    galleryImages,
    section2Title,
    section2Body,
    section2Image,
    "destination": coalesce(destination->name, destinationLabel),
    author->{
      name,
      role,
      avatar
    }
  }
`);

export const CONTENT_PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "contentPage" && defined(slug.current)][]{
    "slug": slug.current
  }
`);

export const CONTENT_PAGE_QUERY = defineQuery(`
  *[_type == "contentPage" && slug.current == $slug][0]{
    title,
    heroImage,
    body[]{
      ...,
      _type == "image" => {
        alt,
        caption,
        "url": asset->url
      }
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroImage,
    "heroVideo": heroVideo.asset->url,
    heroTagline,
    introTitle,
    introParagraphs,
    "creatorsImage": creatorsImage.asset->url,
    pillars[]{
      label
    },
    visionImage,
    visionTitle,
    visionBody,
    missionTitle,
    missionBody,
    valuesTitle,
    values[]{
      title,
      desc
    },
    foundersTitle,
    founders[]{
      name,
      role,
      bio,
      linkedin,
      image
    },
    ctaEyebrow,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonHref
  }
`);
