import { defineQuery } from "next-sanity";

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
    "featuredJourneys": *[_type == "journey" && featuredOnHome == true]{
      "slug": slug.current,
      title,
      alt,
      shortDescription,
      accentColor,
      facts[]{
        label,
        value
      },
      cardImage
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
      author
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
    detailScriptImage,
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
    detailScriptImage,
    detailDescription1,
    detailDescription2,
    detailGallery,
    ctaImage
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

export const JOURNEYS_QUERY = defineQuery(`
  *[_type == "journey" && defined(slug.current)] | order(sortOrder asc, title asc){
    title,
    alt,
    shortDescription,
    fullDescription,
    accentColor,
    lightText,
    hasDivider,
    featuredOnHome,
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
  }
`);

export const JOURNEY_SLUGS_QUERY = defineQuery(`
  *[_type == "journey" && defined(slug.current)][]{
    "slug": slug.current
  }
`);

export const JOURNEY_QUERY = defineQuery(`
  *[_type == "journey" && slug.current == $slug][0]{
    title,
    alt,
    shortDescription,
    fullDescription,
    accentColor,
    lightText,
    hasDivider,
    featuredOnHome,
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
  }
`);

export const INSPIRATION_PAGE_QUERY = defineQuery(`
  *[_type == "inspirationPage"][0]{
    heroQuote,
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

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    heroImage,
    "heroVideo": heroVideo.asset->url,
    heroTagline,
    introTitle,
    introParagraphs,
    pillars[]{
      label,
      icon
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
      bio,
      image
    },
    ctaEyebrow,
    ctaTitle,
    ctaSubtitle,
    ctaButtonLabel,
    ctaButtonHref
  }
`);
