import { defineArrayMember, defineField, defineType } from "sanity";

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description,
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
      }),
    ],
  });

const linkField = defineField({
  name: "href",
  title: "Link",
  type: "string",
});

// Size styles shared by every rich-text field below — lets editors pick a
// text size per line from a dropdown, independent of bullet/list membership.
const sizeStyles = [
  { title: "Normal", value: "normal" },
  { title: "Small", value: "small" },
  { title: "Large", value: "large" },
];

// Preset palette for the Text Color annotation on contentPage's body field —
// keep this in sync with COLOR_PRESETS in app/pages/[slug]/page.tsx, which
// renders these by value. A fixed list (not a free color picker) keeps
// editor-applied color on-brand instead of drifting arbitrary hex per edit.
const colorPresets = [
  { title: "Accent Brown", value: "#714128" },
  { title: "Muted Gray", value: "#777777" },
  { title: "Warning Red", value: "#b3261e" },
];

// Alignment isn't a real field option on Sanity's block type (no per-block
// custom `fields` support here) — the standard workaround is a decorator
// mark, same mechanism as Bold/Italic. Editors select the *whole line* and
// apply one; the renderer scans the block's spans for these marks and turns
// the first match into a block-level `text-align`, rather than rendering the
// mark as an inline wrapper the way Bold/Italic are.
const alignDecorators = [
  { title: "Align Left", value: "alignLeft" },
  { title: "Align Center", value: "alignCenter" },
  { title: "Align Right", value: "alignRight" },
];

const richMarks = {
  decorators: [
    { title: "Bold", value: "strong" },
    { title: "Italic", value: "em" },
    ...alignDecorators,
  ],
  annotations: [],
};

// Rich text: sized paragraphs + bullet lists + bold/italic + alignment, for
// fields that need editor-controlled formatting (e.g. a bullet with a
// smaller note under it).
const richListBlock = () =>
  defineArrayMember({
    type: "block",
    styles: sizeStyles,
    lists: [{ title: "Bullet", value: "bullet" }],
    marks: richMarks,
  });

const ctaFields = [
  defineField({ name: "ctaEyebrow", title: "CTA Eyebrow", type: "string" }),
  defineField({ name: "ctaTitle", title: "CTA Title", type: "text", rows: 2 }),
  defineField({ name: "ctaSubtitle", title: "CTA Subtitle", type: "text", rows: 2 }),
  defineField({ name: "ctaButtonLabel", title: "CTA Button Label", type: "string" }),
  defineField({ ...linkField, name: "ctaButtonHref", title: "CTA Button Link" }),
];

const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ ...linkField, validation: (Rule) => Rule.required() }),
  ],
});

const actionButton = defineType({
  name: "actionButton",
  title: "Action Button",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ ...linkField, validation: (Rule) => Rule.required() }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Outline", value: "outline" },
          { title: "Solid", value: "solid" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});

const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer Column",
  type: "object",
  fields: [
    defineField({ name: "head", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
});

const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "platform", title: "Platform", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ ...linkField, validation: (Rule) => Rule.required() }),
    imageField("icon", "Icon", "Use the same icon treatment as the current footer artwork."),
  ],
});

const featureItem = defineType({
  name: "featureItem",
  title: "Feature Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    imageField("image", "Icon Image", "Best as a transparent icon image with generous whitespace."),
  ],
});

const experienceCard = defineType({
  name: "experienceCard",
  title: "Experience Card",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    imageField("image", "Image", "Best ratio: 1038:249. Use a wide cinematic crop."),
  ],
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location (City, Country)", type: "string" }),
  ],
});

const factItem = defineType({
  name: "factItem",
  title: "Fact Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
  ],
});

const itineraryItem = defineType({
  name: "itineraryItem",
  title: "Itinerary Item",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    imageField("image", "Image", "Best ratio: 16:9 or 4:3. Keep the main subject near the center for hotspot crops."),
    defineField({
      name: "activities",
      title: "Activities",
      type: "array",
      of: [richListBlock()],
      description: "Use the Small/Large styles to resize a line, and the Align Left/Center/Right marks (select the whole line, then apply) to change its alignment.",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    imageField("avatar", "Avatar", "Best ratio: 1:1. Use a clean portrait crop."),
  ],
});

const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  fields: [
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "name", title: "Name", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "blurb", title: "Home Card Summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "region", title: "Region", type: "string" }),
    defineField({ name: "bestSeason", title: "Best Season", type: "string" }),
    defineField({ name: "tone", title: "Tone", type: "string" }),
    imageField("cardImage", "Home Card Image", "Best ratio: 0.85:1. Portrait crop for the homepage destination cards."),
    imageField("listingImage", "Listing Image", "Best ratio: roughly 4:3. This is used on the destinations overview page."),
    defineField({ name: "listingImageFirst", title: "Show Image First", type: "boolean", initialValue: true }),
    defineField({ name: "listingBody1", title: "Listing Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "listingBody2", title: "Listing Paragraph 2", type: "text", rows: 3 }),
    imageField("detailHeroImage", "Detail Hero Image", "Best ratio: 16:9 or wider. Minimum 2000px wide recommended."),
    defineField({ name: "detailHeroTitle", title: "Detail Hero Title", type: "text", rows: 2 }),
    defineField({ name: "detailHeroSubtitle", title: "Detail Hero Subtitle", type: "text", rows: 2 }),
    defineField({
      name: "detailDescription1",
      title: "Detail Paragraph 1",
      type: "array",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })],
    }),
    defineField({
      name: "detailDescription2",
      title: "Detail Paragraph 2",
      type: "array",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })],
    }),
    defineField({
      name: "detailGallery",
      title: "Detail Gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      description: "Best with two landscape images. Minimum 1600px wide recommended.",
    }),
    imageField("ctaImage", "CTA Image", "Right-hand image in the 'Craft Your Perfect Escape' banner. Best ratio: tall portrait or landscape crop."),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "text", rows: 2 }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text", rows: 3 }),
    defineField({ name: "ctaButtonLabel", title: "CTA Button Label", type: "string" }),
    defineField({ name: "ctaButtonHref", title: "CTA Button Link", type: "string" }),
  ],
});

const journey = defineType({
  name: "journey",
  title: "Journey",
  type: "document",
  fields: [
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "detailTitle",
      title: "Detail Page Title",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: sizeStyles,
          lists: [],
          marks: richMarks,
        }),
      ],
      description: "Optional. Rich-text heading shown on the journey detail page — use Small/Large styles per line for a title + tagline effect, and the Align Left/Center/Right marks (select the whole line, then apply) to change alignment. Falls back to the plain Title above if left empty; Title still powers cards, the breadcrumb, image alt text, emails, and the URL slug, so keep it filled in regardless.",
    }),
    defineField({ name: "alt", title: "Image Alt Text", type: "string" }),
    defineField({ name: "shortDescription", title: "Short Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "accentColor", title: "Accent Color", type: "string", description: "Use a hex value like #b5bfab." }),
    defineField({ name: "lightText", title: "Use Light Detail Text", type: "boolean", initialValue: false }),
    defineField({ name: "hasDivider", title: "Show Divider Before Facts", type: "boolean", initialValue: false }),
    defineField({ name: "featuredOnHome", title: "Feature on Home Page", type: "boolean", initialValue: false }),
    defineField({ name: "destination", title: "Destination", type: "reference", to: [{ type: "destination" }] }),
    imageField("cardImage", "Card Image", "Best ratio: 4:3 or 1.22:1. Use for journey cards and hero fallback."),
    imageField("heroImage", "Detail Hero Image", "Best ratio: 16:9 or wider. Minimum 1800px wide recommended."),
    defineField({
      name: "facts",
      title: "Facts",
      type: "array",
      of: [defineArrayMember({ type: "factItem" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "priceCurrency", title: "Price Currency (e.g. EUR, USD)", type: "string" }),
    defineField({ name: "priceFrom", title: "Price From", type: "string" }),
    defineField({ name: "priceBasis", title: "Price Basis", type: "string" }),
    defineField({ name: "priceCtaTitle", title: "Pricing CTA Title", type: "string" }),
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [richListBlock()],
      description: "List of what is included in this journey package. Use a bullet for each main item; add a plain (Normal-style) line right after a bullet for a smaller note underneath it. Align Left/Center/Right marks (select the whole line, then apply) control alignment.",
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [defineArrayMember({ type: "itineraryItem" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

const inspirationArticle = defineType({
  name: "inspirationArticle",
  title: "Inspiration Article",
  type: "document",
  fields: [
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "publishDate", title: "Publish Date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "destination", title: "Destination", type: "reference", to: [{ type: "destination" }] }),
    defineField({ name: "destinationLabel", title: "Fallback Destination Label", type: "string" }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    imageField("cardImage", "Card Image", "Best ratio: 488:394. Use for inspiration cards."),
    imageField("heroImage", "Hero Image", "Best ratio: 16:9 or wider. Minimum 2000px wide recommended."),
    defineField({ name: "section1Title", title: "Section 1 Title", type: "text", rows: 2 }),
    defineField({
      name: "section1Body",
      title: "Section 1 Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    imageField("section1Image", "Section 1 Image", "Best ratio: portrait-friendly landscape crop for the split section."),
    defineField({ name: "galleryTitle", title: "Gallery Section Title", type: "text", rows: 2 }),
    defineField({ name: "galleryBody", title: "Gallery Section Body", type: "text", rows: 4 }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      description: "Best with three landscape images. Keep subjects centered for mobile crops.",
    }),
    defineField({ name: "section2Title", title: "Section 2 Title", type: "text", rows: 2 }),
    defineField({
      name: "section2Body",
      title: "Section 2 Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    imageField("section2Image", "Section 2 Image", "Best ratio: portrait-friendly landscape crop for the split section."),
    defineField({ name: "closingText", title: "Closing Text", type: "text", rows: 4 }),
    defineField({ name: "ctaTitle", title: "CTA Title", type: "text", rows: 2 }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text", rows: 3 }),
    defineField({ name: "ctaButtonLabel", title: "CTA Button Label", type: "string" }),
    defineField({ ...linkField, name: "ctaButtonHref", title: "CTA Button Link" }),
    imageField("ctaImage", "CTA Image", "Best ratio: tall landscape crop for the right-hand CTA image."),
  ],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
    }),
    defineField({
      name: "headerActions",
      title: "Header Actions",
      type: "array",
      of: [defineArrayMember({ type: "actionButton" })],
    }),
    defineField({
      name: "logos",
      title: "Brand Assets",
      type: "object",
      fields: [
        imageField("light", "Light Logo", "Transparent logo for dark image backgrounds."),
        imageField("dark", "Dark Footer Logo", "Transparent logo for the dark footer."),
        imageField("onLight", "Dark Header Logo", "Transparent logo for light backgrounds."),
        imageField("footerIcon", "Footer Icon", "Small icon used before the footer logo."),
        imageField("copyright", "Copyright Icon", "Small icon used in the footer copyright row."),
      ],
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
        imageField("backgroundImage", "Background Image", "Best ratio: very wide landscape. Minimum 1920px wide recommended."),
        defineField({ name: "inputPlaceholder", title: "Input Placeholder", type: "string" }),
        defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
        defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
        defineField({ name: "year", title: "Year", type: "number" }),
        defineField({ name: "copyrightText", title: "Copyright Text", type: "string" }),
        defineField({ name: "followLabel", title: "Follow Label", type: "string" }),
        defineField({
          name: "columns",
          title: "Columns",
          type: "array",
          of: [defineArrayMember({ type: "footerColumn" })],
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [defineArrayMember({ type: "socialLink" })],
        }),
      ],
    }),
    defineField({
      name: "destinationFeatures",
      title: "Destination Features",
      type: "array",
      of: [defineArrayMember({ type: "featureItem" })],
    }),
    defineField({
      name: "recommendedExperiences",
      title: "Recommended Experiences",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "country", title: "Country", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            imageField("image", "Image", "Best ratio: 4:5 or 422:320-style crop for the journey detail cards."),
          ],
        }),
      ],
    }),
    imageField("contactImage", "Contact Page Image", "Right-hand image on the Contact Us page. Best ratio: portrait or 4:3 crop."),
  ],
});

const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "text", rows: 2 }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4 video. If set, plays instead of the hero image.",
    }),
    imageField("heroPosterImage", "Hero Poster Image", "Shown while the video loads. Use the same crop as the hero image."),
    imageField("heroImage", "Hero Image (Fallback)", "Shown if no video is uploaded. Best ratio: full-bleed landscape. Minimum 1920x1080 recommended."),
    defineField({ name: "introTitle", title: "Intro Title", type: "text", rows: 2 }),
    defineField({
      name: "introParagraphs",
      title: "Intro Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({ name: "featuredDestinationsLabel", title: "Featured Destinations Label", type: "string" }),
    defineField({ name: "featuredDestinationsTitle", title: "Featured Destinations Title", type: "text", rows: 2 }),
    defineField({
      name: "featuredDestinations",
      title: "Featured Destinations",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "destination" }] })],
    }),
    defineField({ name: "curatedJourneysLabel", title: "Curated Journeys Label", type: "string" }),
    defineField({ name: "curatedJourneysTitle", title: "Curated Journeys Title", type: "text", rows: 2 }),
    defineField({ name: "curatedJourneysLinkLabel", title: "Curated Journeys Link Label", type: "string" }),
    defineField({ name: "curatedJourneysLinkHref", title: "Curated Journeys Link Href", type: "string" }),
    defineField({
      name: "featuredJourneys",
      title: "Featured Journeys",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "journey" }] })],
    }),
    defineField({ name: "experiencesLabel", title: "Experiences Label", type: "string" }),
    defineField({ name: "experiencesTitle", title: "Experiences Title", type: "text", rows: 2 }),
    defineField({ name: "experiencesButtonLabel", title: "Experiences Button Label", type: "string" }),
    defineField({ name: "experiencesButtonHref", title: "Experiences Button Link", type: "string" }),
    defineField({
      name: "experiences",
      title: "Experience Cards",
      type: "array",
      of: [defineArrayMember({ type: "experienceCard" })],
    }),
    defineField({ name: "aboutLabel", title: "About Label", type: "string" }),
    defineField({ name: "aboutTitleLineOne", title: "About Title Line 1", type: "text", rows: 2 }),
    defineField({ name: "aboutTitleLineTwo", title: "About Title Line 2", type: "text", rows: 2 }),
    imageField("aboutImage", "About Image", "Best ratio: 1280:554. Use a wide editorial crop."),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "aboutTagline",
      title: "About Tagline",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    defineField({ name: "aboutLinkLabel", title: "About Link Label", type: "string" }),
    defineField({ name: "aboutLinkHref", title: "About Link Link", type: "string" }),
    defineField({ name: "whyTravelLabel", title: "Why Travel Label", type: "string" }),
    defineField({ name: "whyTravelTitleLineOne", title: "Why Travel Title Line 1", type: "text", rows: 2 }),
    defineField({ name: "whyTravelTitleLineTwo", title: "Why Travel Title Line 2", type: "text", rows: 2 }),
    defineField({ name: "whyTravelLinkLabel", title: "Why Travel Link Label", type: "string" }),
    defineField({ name: "whyTravelLinkHref", title: "Why Travel Link", type: "string" }),
    imageField("whyTravelImage", "Why Travel Image", "Best ratio: tall landscape crop for the supporting image."),
    defineField({
      name: "reasons",
      title: "Reasons",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 4 }),
          ],
        }),
      ],
    }),
    defineField({ name: "testimonialsLabel", title: "Testimonials Label", type: "string" }),
    defineField({ name: "testimonialsTitleLineOne", title: "Testimonials Title Line 1", type: "text", rows: 2 }),
    defineField({ name: "testimonialsTitleLineTwo", title: "Testimonials Title Line 2", type: "text", rows: 2 }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "testimonial" })],
    }),
    defineField({ name: "finalCtaEyebrow", title: "Final CTA Eyebrow", type: "string" }),
    defineField({ name: "finalCtaTitle", title: "Final CTA Title", type: "text", rows: 2 }),
    defineField({ name: "finalCtaButtonLabel", title: "Final CTA Button Label", type: "string" }),
    defineField({ name: "finalCtaButtonHref", title: "Final CTA Button Link", type: "string" }),
  ],
});

const destinationsPage = defineType({
  name: "destinationsPage",
  title: "Destinations Page",
  type: "document",
  fields: [
    imageField("heroImage", "Hero Image", "Best ratio: wide cinematic landscape. Minimum 1920px wide recommended."),
    defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
    ...ctaFields,
  ],
});

const journeysPage = defineType({
  name: "journeysPage",
  title: "Journeys Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
    defineField({ name: "filterPlaceholder", title: "Filter Placeholder", type: "string" }),
    defineField({ name: "seeMoreLabel", title: "See More Label", type: "string" }),
    defineField({ name: "supportTitle", title: "Support Title", type: "text", rows: 2 }),
    defineField({ name: "supportHeading", title: "Support Heading", type: "text", rows: 2 }),
    defineField({ name: "supportBody", title: "Support Body", type: "text", rows: 3 }),
    defineField({ name: "supportButtonLabel", title: "Support Button Label", type: "string" }),
    defineField({ name: "supportButtonHref", title: "Support Button Link", type: "string" }),
    imageField("supportImage", "Support Image", "Best ratio: wide landscape crop for the right-side CTA panel."),
  ],
});

const experiencesPage = defineType({
  name: "experiencesPage",
  title: "Experiences Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: sizeStyles,
          lists: [],
          marks: richMarks,
        }),
      ],
      description: "Rich-text hero title. Use Small/Large per line for a title + tagline effect, and the Align Left/Center/Right marks (select the whole line, then apply) for alignment.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [richListBlock()],
      description: "Rich-text paragraph shown below the hero image/video. Small/Large styles, bullet lists, and the Align Left/Center/Right marks are all available.",
    }),
    imageField("heroImage", "Hero Image", "Shown if no video is uploaded, and as the video's poster while it loads. Best ratio: wide landscape. Minimum 1800px wide recommended."),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4 video. If set, plays instead of the hero image.",
    }),
  ],
});

const inspirationPage = defineType({
  name: "inspirationPage",
  title: "Inspiration Page",
  type: "document",
  fields: [
    defineField({ name: "heroQuote", title: "Hero Quote", type: "text", rows: 4 }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "text", rows: 2 }),
    defineField({ name: "gridTitle", title: "Grid Title", type: "text", rows: 2 }),
    defineField({ name: "supportTitle", title: "Support Title", type: "text", rows: 2 }),
    defineField({ name: "supportHeading", title: "Support Heading", type: "text", rows: 2 }),
    defineField({ name: "supportBody", title: "Support Body", type: "text", rows: 3 }),
    defineField({ name: "supportButtonLabel", title: "Support Button Label", type: "string" }),
    defineField({ name: "supportButtonHref", title: "Support Button Link", type: "string" }),
    imageField("supportImage", "Support Image", "Best ratio: wide landscape crop for the right-side CTA panel."),
  ],
});

const contentPage = defineType({
  name: "contentPage",
  title: "Content Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    imageField("heroImage", "Hero Image", "Optional wide image shown below the page title. Best ratio: 16:9 or wider."),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", title: "URL", type: "url" }),
                  defineField({ name: "blank", title: "Open in new tab", type: "boolean", initialValue: false }),
                ],
              },
              {
                name: "textColor",
                type: "object",
                title: "Text Color",
                description: "Select a range of text, then apply this from the toolbar to color just that range.",
                fields: [
                  defineField({
                    name: "color",
                    title: "Color",
                    type: "string",
                    options: {
                      list: colorPresets.map((c) => ({ title: c.title, value: c.value })),
                    },
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          type: "object",
          name: "table",
          title: "Table",
          fields: [
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "tableRow",
                  title: "Row",
                  fields: [
                    defineField({ name: "isHeader", title: "Header row", type: "boolean", initialValue: false }),
                    defineField({ name: "cells", title: "Cells", type: "array", of: [defineArrayMember({ type: "string" })] }),
                  ],
                  preview: {
                    select: { cells: "cells", isHeader: "isHeader" },
                    prepare: ({ cells, isHeader }: { cells?: string[]; isHeader?: boolean }) => ({
                      title: (cells || []).join(" | "),
                      subtitle: isHeader ? "Header row" : undefined,
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: { prepare: () => ({ title: "Table" }) },
        }),
      ],
      description: "Use Heading 2 / Heading 3 for section titles. Insert images anywhere via the image block.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    imageField("heroImage", "Hero Image", "Fallback image if no video is set. Best ratio: tall cinematic crop. Minimum 1920px wide recommended."),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Upload an MP4 video file. If set, this plays instead of the hero image.",
    }),
    defineField({ name: "heroTagline", title: "Hero Tagline", type: "text", rows: 2 }),
    defineField({ name: "introTitle", title: "Intro Title", type: "text", rows: 2 }),
    defineField({
      name: "introParagraphs",
      title: "Intro Paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    imageField("creatorsImage", "Creators Of Image", "Handwritten / decorative image for the 'Creators of Remarkable Travel Experiences' panel. Transparent PNG or SVG recommended."),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(3),
    }),
    imageField("visionImage", "Vision Image", "Best ratio: 795:485. Use a wide editorial crop."),
    defineField({ name: "visionTitle", title: "Vision Title", type: "text", rows: 2 }),
    defineField({ name: "visionBody", title: "Vision Body", type: "text", rows: 4 }),
    defineField({ name: "missionTitle", title: "Mission Title", type: "text", rows: 2 }),
    defineField({ name: "missionBody", title: "Mission Body", type: "text", rows: 4 }),
    defineField({ name: "valuesTitle", title: "Values Title", type: "text", rows: 2 }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "desc", title: "Description", type: "text", rows: 4 }),
          ],
        }),
      ],
    }),
    defineField({ name: "foundersTitle", title: "Founders Title", type: "text", rows: 2 }),
    defineField({
      name: "founders",
      title: "Founders",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({
              name: "role",
              title: "Role / Title",
              type: "string",
              options: {
                list: [
                  { title: "Founder", value: "Founder" },
                  { title: "Co-Founder", value: "Co-Founder" },
                  { title: "Managing Director", value: "Managing Director" },
                  { title: "Director", value: "Director" },
                ],
              },
            }),
            defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
            defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
            imageField("image", "Image", "Best ratio: 451:370. Use a clean portrait or half-body crop."),
          ],
        }),
      ],
    }),
    ...ctaFields,
  ],
});

export const schemaTypes = [
  navItem,
  actionButton,
  footerColumn,
  socialLink,
  featureItem,
  experienceCard,
  testimonial,
  factItem,
  itineraryItem,
  author,
  destination,
  journey,
  inspirationArticle,
  siteSettings,
  homePage,
  destinationsPage,
  journeysPage,
  experiencesPage,
  inspirationPage,
  aboutPage,
  contentPage,
];
