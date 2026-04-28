/**
 * Sanity seed script — migrates all fallback content into your Sanity project.
 *
 * Prerequisites:
 *   1. Add SANITY_API_TOKEN=<token> to .env.local
 *      (sanity.io/manage → project → API → Tokens → create "Editor" token)
 *   2. Run:  npm run seed
 *
 * Safe to re-run — uses createOrReplace so nothing is duplicated.
 * Images are NOT migrated here; upload them manually via the Studio (/studio).
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("❌ SANITY_API_TOKEN is missing in .env.local");
  console.error("   → sanity.io/manage → your project → API → Tokens → New Token (Editor)");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-01-01", token, useCdn: false });

let _k = 0;
const k = () => `k${++_k}`;

// ─── AUTHORS ──────────────────────────────────────────────────────────────────

const AUTHORS = [
  { _id: "author-abram", _type: "author", name: "Abram Korsgaard", role: "Wildlife Photographer" },
  { _id: "author-anika", _type: "author", name: "Anika Kenter", role: "Tourist Guide" },
  { _id: "author-ruben", _type: "author", name: "Ruben Kenter", role: "Wildlife Photographer" },
  { _id: "author-jakob", _type: "author", name: "Jakob Ekstrom Bothman", role: "Wildlife Photographer" },
];

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────

const DESTINATIONS = [
  {
    _id: "destination-slovenia",
    _type: "destination",
    sortOrder: 1,
    name: "Slovenia",
    slug: { _type: "slug", current: "slovenia" },
    blurb: "From the iconic beauty of Lake Bled to the vibrant streets of Ljubljana, it offers a perfect blend of nature, culture, and tranquility.",
    region: "Central Europe",
    bestSeason: "April - October",
    tone: "Emerald lakes, alpine villages, and elegant city breaks.",
    listingImageFirst: true,
    listingBody1: "From the iconic beauty of Lake Bled to the vibrant streets of Ljubljana, it offers a perfect blend of nature, culture, and tranquility.",
    listingBody2: "Explore medieval castles, serene alpine lakes, and lush meadows in one of Europe's most captivating hidden gems.",
    detailHeroTitle: "Europe's Hidden Gem",
    detailHeroSubtitle: "A Land Of Unforgettable Journeys",
    detailDescription1: "feels like a place pulled from a quiet dream. As the morning mist lifts over Lake Bled, the still waters mirror a tiny island church, and the sound of distant bells echoes through the mountains. Wandering through the charming streets of Ljubljana, every corner reveals a blend of history, art, and effortless beauty.",
    detailDescription2: "By the time the sun sets behind the Julian Alps, painting the sky in soft gold and pink, you realize Slovenia isn't just a destination—it's a feeling you carry long after the journey ends.",
  },
  {
    _id: "destination-iceland",
    _type: "destination",
    sortOrder: 2,
    name: "Iceland",
    slug: { _type: "slug", current: "iceland" },
    blurb: "From the magical Northern Lights to its rugged natural beauty, every corner feels like a once-in-a-lifetime experience.",
    region: "Nordic Atlantic",
    bestSeason: "September - April",
    tone: "Volcanic landscapes, glacier adventures, and dramatic winter skies.",
    listingImageFirst: false,
    listingBody1: "From the magical Northern Lights to its rugged natural beauty, every corner feels like a once-in-a-lifetime experience.",
    listingBody2: "Discover geothermal hot springs, dramatic waterfalls, and vast volcanic landscapes that stretch endlessly to the horizon.",
    detailHeroTitle: "Land of Fire and Ice",
    detailHeroSubtitle: "Where Nature Writes the Rules",
    detailDescription1: "Iceland unfolds like a living myth. Where volcanoes breathe beneath glaciers and the Northern Lights dance across an ink-black sky, every moment feels borrowed from another world. The silence of the highlands is broken only by the thunder of waterfalls and the hiss of geothermal vents.",
    detailDescription2: "As you drive along the Ring Road, each bend reveals something more extraordinary than the last—black sand beaches, ice caves glowing aquamarine blue, and vast lava fields that stretch beyond sight. Iceland doesn't just show you nature; it makes you feel it.",
  },
  {
    _id: "destination-norway",
    _type: "destination",
    sortOrder: 3,
    name: "Norway",
    slug: { _type: "slug", current: "norway" },
    blurb: "From the Northern Lights in the Arctic to scenic train journeys through dramatic valleys, it offers unforgettable natural beauty at every turn.",
    region: "Scandinavia",
    bestSeason: "May - September",
    tone: "Fjords, design-led stays, and cinematic road journeys.",
    listingImageFirst: true,
    listingBody1: "From the Northern Lights in the Arctic to scenic train journeys through dramatic valleys, it offers unforgettable natural beauty at every turn.",
    listingBody2: "Sail through majestic fjords, trek across ancient glaciers, and witness the midnight sun over some of the world's most breathtaking coastlines.",
    detailHeroTitle: "The Land of Fjords",
    detailHeroSubtitle: "Nature in Its Most Dramatic Form",
    detailDescription1: "Norway rises from the sea in soaring cliffs and deep fjords that have inspired poets, painters, and dreamers for centuries. To sail through the Geirangerfjord is to understand why Norwegians speak of their land with quiet reverence—it is beautiful in a way that demands silence.",
    detailDescription2: "From the midnight sun casting golden light over the Arctic at summer's peak, to the Northern Lights weaving green ribbons across winter skies, Norway moves through extremes with extraordinary grace. This is a destination that changes with the seasons—and leaves its mark on every traveller.",
  },
];

// ─── JOURNEYS ─────────────────────────────────────────────────────────────────

const JOURNEYS = [
  {
    _id: "journey-golf-escape-slovenia",
    _type: "journey",
    sortOrder: 1,
    title: "A Golf Escape in the Fabled Cities of Slovenia",
    slug: { _type: "slug", current: "golf-escape-slovenia" },
    alt: "Golf escape Slovenia",
    shortDescription: "Play the emerald-green fairways of Europe's finest golf courses.",
    fullDescription: [
      "Play the emerald-green fairways of Europe's finest golf courses. Surrounded by rolling contours, Slovenia's golf courses that we selected for you are set against breathtakingly beautiful landscapes: from Alpine Mountains to Pannonian Plain to pristine Green Vineyards. They offer challenging opportunities to tee off in complete tranquility.",
      "Our journey offers two 18-hole Championship Kings courses and a unique 9-hole course in the middle of 185-acre vineyards from the 15th century. Enjoy three different perfectly maintained and manicured golf courses with a taste of Slovenian culture and adventure.",
    ],
    accentColor: "#b5bfab",
    lightText: false,
    hasDivider: true,
    featuredOnHome: true,
    destination: { _type: "reference", _ref: "destination-slovenia" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "7 nights, 8 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "March - November" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Group of 4 up to 12" },
    ],
    priceFrom: "4231",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Excited on Your Golf Escape With Us",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive in Ljubljana and check-in at your hotel in Bled or Bohinj.",
        activities: [
          "Meet your holiday Experience Manager on arrival at Ljubljana International Airport.",
          "Private transfer to your luxury hotel in Bled or a private chalet in Bohinj.",
          "Enjoy a dinner overviewing the lake.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "Morning championship round at Bled Golf & Country Club.",
        activities: [
          "Tee off at the Kings Course with sweeping views of Lake Bled and the Julian Alps.",
          "Clubhouse lunch with a curated tasting of local Slovenian wines.",
          "Afternoon at leisure — sunset walk along the lakeshore or a spa session.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Explore the historic city center of Ljubljana with a guided walking tour.",
        activities: [
          "Visit Ljubljana Castle and enjoy panoramic views of the city.",
          "Lunch at a traditional Slovenian restaurant, tasting local delicacies.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "Transfer to Lake Bled for a morning boat ride to Bled Island.",
        activities: [
          "Climb the bell tower on Bled Island and ring the wishing bell.",
          "Afternoon hike around Lake Bohinj with a picnic lunch in nature.",
          "Return to your accommodation for a wellness spa session and gourmet dinner.",
        ],
      },
    ],
  },
  {
    _id: "journey-winter-adventure-iceland",
    _type: "journey",
    sortOrder: 2,
    title: "The Unbelievable is Your Reality: Winter Adventure in Iceland",
    slug: { _type: "slug", current: "winter-adventure-iceland" },
    alt: "Winter adventure Iceland",
    shortDescription: "Where the rarest forces of nature collide and mother nature reigns supreme, you will experience a sparkling winter wonderland in Iceland.",
    fullDescription: [
      "Experience the raw, untamed beauty of Iceland in winter, where the rarest forces of nature collide in a spectacular display of power and wonder. Watch the Northern Lights ripple across an endless arctic sky as glaciers gleam under the moonlight and geysers explode through frozen ground.",
      "Your journey takes you across Iceland's most dramatic winter landscapes — from the otherworldly ice caves of Vatnajökull to the thundering curtains of Seljalandsfoss frozen mid-fall. This is a sparkling winter wonderland unlike anything else on earth.",
    ],
    accentColor: "#acb1b4",
    lightText: false,
    hasDivider: false,
    featuredOnHome: true,
    destination: { _type: "reference", _ref: "destination-iceland" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "7 nights, 8 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "September - April" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Group of 2 up to 10" },
    ],
    priceFrom: "5890",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Ready for Your Icelandic Winter Adventure?",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive in Reykjavik and settle into your boutique hotel.",
        activities: [
          "Meet your Experience Manager on arrival at Keflavik International Airport.",
          "Private transfer to your luxury hotel in Reykjavik.",
          "Welcome dinner featuring traditional Icelandic cuisine.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "Northern Lights hunt and geothermal experience.",
        activities: [
          "Morning guided glacier walk on Sólheimajökull glacier.",
          "Soak in a secluded geothermal hot spring under open skies.",
          "Evening Northern Lights tour with expert aurora photographers.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Explore the ice caves of Vatnajökull National Park.",
        activities: [
          "Private guided tour inside luminous blue ice caves.",
          "Visit Jökulsárlón glacier lagoon and Diamond Beach.",
          "Gourmet dinner at a remote lodge with panoramic ice views.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "South Coast wonders and waterfall walks.",
        activities: [
          "Walk behind the frozen curtain of Seljalandsfoss waterfall.",
          "Explore the black sand beaches of Reynisfjara.",
          "Return to Reykjavik for a farewell dinner and evening at leisure.",
        ],
      },
    ],
  },
  {
    _id: "journey-norwegian-fjords-grand-gallery",
    _type: "journey",
    sortOrder: 3,
    title: "Norwegian Fjords: A Journey Through Nature's Grand Gallery",
    slug: { _type: "slug", current: "norwegian-fjords-grand-gallery" },
    alt: "Norwegian fjords",
    shortDescription: "Sail through majestic fjords, trek ancient glaciers, and witness the midnight sun over some of the world's most breathtaking coastlines.",
    fullDescription: [
      "Norway's fjords are among the most majestic landscapes on the planet — sheer cliff faces plunging thousands of feet into crystalline blue water, ancient villages perched at the water's edge, and a silence so profound it feels sacred. Sailing through the Geirangerfjord, you understand why this place is considered one of Earth's greatest natural wonders.",
      "Our journey takes you deep into Norway's grand gallery of natural art — trekking ancient glaciers, traversing dramatic mountain passes, and witnessing the ethereal midnight sun painting the sky in amber and gold for hours without setting. Every moment is a reminder of just how extraordinary this world truly is.",
    ],
    accentColor: "#796250",
    lightText: true,
    hasDivider: false,
    featuredOnHome: false,
    destination: { _type: "reference", _ref: "destination-norway" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "8 nights, 9 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "May - September" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Group of 2 up to 8" },
    ],
    priceFrom: "6450",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Sail Into Norway's Grand Fjord Gallery",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive in Oslo and begin your Scandinavian journey.",
        activities: [
          "Private airport transfer to your waterfront hotel in Oslo.",
          "Evening harbour walk and welcome dinner at a celebrated Oslo restaurant.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "Cruise through the UNESCO-listed Geirangerfjord.",
        activities: [
          "Board a private vessel for the Geirangerfjord sailing experience.",
          "Pass the Seven Sisters and Suitor waterfalls at close range.",
          "Overnight at a clifftop lodge with panoramic fjord views.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Glacier trek on the ancient Briksdalsbreen arm.",
        activities: [
          "Guided hike onto the Briksdalsbreen glacier with crampons and poles.",
          "Fjord kayaking through calm waters surrounded by towering cliffs.",
          "Local dinner featuring fresh Norwegian seafood.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "Bergen and the midnight sun coastal experience.",
        activities: [
          "Explore Bergen's UNESCO Bryggen Wharf and fish market.",
          "Funicular ride to Fløyen for panoramic city and fjord views.",
          "Sunset coastal cruise under the lingering Arctic summer sun.",
        ],
      },
    ],
  },
  {
    _id: "journey-alpine-golf-slovenia",
    _type: "journey",
    sortOrder: 4,
    title: "Alpine Greens: A Premium Golf Journey Through Slovenia",
    slug: { _type: "slug", current: "alpine-golf-slovenia" },
    alt: "Alpine golf Slovenia",
    shortDescription: "Discover Slovenia's most prestigious golf courses nestled between the Julian Alps and vineyard-covered hillsides.",
    fullDescription: [
      "Slovenia's rolling hills and pristine fairways offer a golf experience unlike any in Europe. Nestled between the Julian Alps and the Adriatic coast, Slovenia's courses combine world-class golf with stunning scenery and warm Slovenian hospitality that makes every round memorable.",
      "This journey includes access to Slovenia's most prestigious courses, including legendary 18-hole championship layouts set against the backdrop of medieval castles and vineyard-covered hillsides. Off the course, explore Ljubljana's baroque old town and the fairy-tale shores of Lake Bled.",
    ],
    accentColor: "#576168",
    lightText: true,
    hasDivider: true,
    featuredOnHome: false,
    destination: { _type: "reference", _ref: "destination-slovenia" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "7 nights, 8 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "March - November" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Group of 4 up to 12" },
    ],
    priceFrom: "3980",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Tee Off Among the Julian Alps",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive in Ljubljana and discover Slovenia's charming capital.",
        activities: [
          "Private airport transfer and hotel check-in.",
          "Guided walk through Ljubljana's baroque old town and Triple Bridge.",
          "Welcome dinner at a celebrated Ljubljana restaurant.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "Championship round at Bled Golf & Country Club.",
        activities: [
          "Tee off on the Kings Course with alpine mountain backdrops.",
          "Winery lunch in the rolling Goriska Brda vineyard hills.",
          "Evening visit to Bled Castle perched above the iconic lake.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Unique 9-hole golf through a 15th-century vineyard estate.",
        activities: [
          "Play the historic vineyard course set among century-old vines.",
          "Private wine tasting with the estate sommelier.",
          "Spa and wellness evening at your alpine hotel.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "Final round and farewell to Slovenia.",
        activities: [
          "Morning farewell breakfast with panoramic lake views.",
          "Optional last round at your preferred course.",
          "Private transfer to Ljubljana Airport.",
        ],
      },
    ],
  },
  {
    _id: "journey-equestrian-iceland-highlands",
    _type: "journey",
    sortOrder: 5,
    title: "Riding the Wilderness: Equestrian Journey Through Iceland",
    slug: { _type: "slug", current: "equestrian-iceland-highlands" },
    alt: "Equestrian Iceland",
    shortDescription: "Explore Iceland's volcanic highlands on horseback, crossing lava fields, geothermal springs, and untouched wilderness at a gentle pace.",
    fullDescription: [
      "Iceland's Icelandic horse is one of the purest and most spirited breeds in the world, bred in isolation for over a thousand years to navigate the island's rugged volcanic terrain. Riding these sure-footed horses across Iceland's highlands is an experience of raw intimacy with both animal and landscape.",
      "Your journey winds through lava fields still steaming with geothermal energy, across moss-carpeted plains and past crystalline rivers fed by glacial melt. Each evening, you settle by candlelight in remote farm stays, sharing meals with local guides who have lived and loved this land their entire lives.",
    ],
    accentColor: "#b5bfab",
    lightText: false,
    hasDivider: false,
    featuredOnHome: false,
    destination: { _type: "reference", _ref: "destination-iceland" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "5 nights, 6 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "June - August" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Group of 2 up to 6" },
    ],
    priceFrom: "4750",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Ride Into Iceland's Untamed Highlands",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive and meet your Icelandic horse companions.",
        activities: [
          "Airport transfer to your traditional Icelandic farm stay.",
          "Introduction session with your horse and experienced guides.",
          "Farm dinner with locally sourced highland ingredients.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "First highland trek across ancient lava fields.",
        activities: [
          "Morning ride across vast moss-covered lava plains.",
          "Stop at a hidden geothermal hot spring for a warm soak.",
          "Campfire dinner under the midnight sun.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Journey through glacial river valleys and open plains.",
        activities: [
          "Ride alongside crystal-clear rivers fed by glacial melt.",
          "Riverside picnic lunch prepared by your guide.",
          "Return to the farm for a traditional Icelandic supper.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "Summit views and cultural highland experience.",
        activities: [
          "Ascend to elevated moorlands for sweeping volcanic panoramas.",
          "Visit a remote turf-roof farmhouse with a local family.",
          "Farewell dinner celebrating the spirit of Icelandic hospitality.",
        ],
      },
    ],
  },
  {
    _id: "journey-adriatic-gastronomy",
    _type: "journey",
    sortOrder: 6,
    title: "A Gastronomic Journey Through the Adriatic Coast",
    slug: { _type: "slug", current: "adriatic-gastronomy" },
    alt: "Adriatic gastronomy",
    shortDescription: "Indulge in the finest culinary traditions of the Adriatic, from fresh seafood markets to intimate wine cellars and Michelin-starred tables.",
    fullDescription: [
      "The Adriatic coast is a living culinary library — from the salt-crusted fishermen of Dalmatia who pull silver-scaled catches from waters at dawn, to the truffle hunters of Istria who know every forest path by heart. Along this coastline, food isn't just sustenance; it's identity, heritage, and joy.",
      "Your gastronomic journey takes you from the intimate wine cellars of Slovenia's Brda region to the terracotta-roofed restaurants of the Croatian coast, where Michelin-starred chefs reimagine centuries of tradition with contemporary elegance. This is the Adriatic at its most delicious.",
    ],
    accentColor: "#b96b42",
    lightText: true,
    hasDivider: false,
    featuredOnHome: false,
    destination: { _type: "reference", _ref: "destination-slovenia" },
    facts: [
      { _key: k(), _type: "factItem", label: "Duration", value: "6 nights, 7 days" },
      { _key: k(), _type: "factItem", label: "Best season", value: "April - October" },
      { _key: k(), _type: "factItem", label: "Suited for", value: "Couples or small groups" },
    ],
    priceFrom: "3640",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Savour the Adriatic at Your Own Pace",
    itinerary: [
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -1", title: "Arrive in Ljubljana and dive into Slovenia's food scene.",
        activities: [
          "Morning visit to Ljubljana's Central Market with your chef guide.",
          "Hands-on cooking class focused on traditional Slovenian recipes.",
          "Wine-pairing dinner at a celebrated Ljubljana restaurant.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -2", title: "Explore the Brda wine region and truffle heartlands.",
        activities: [
          "Private tour of a boutique Brda winery with cellar tasting.",
          "Guided truffle hunting in the Istrian forests with local hunters.",
          "Intimate winemaker's table dinner overlooking the vineyards.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -3", title: "Coastal flavors along the Adriatic shoreline.",
        activities: [
          "Early morning fish market tour at a working Dalmatian harbour.",
          "Seafood cooking workshop with a local coastal chef.",
          "Sunset dinner at a cliffside Adriatic restaurant.",
        ],
      },
      {
        _key: k(), _type: "itineraryItem",
        day: "Day -4", title: "Istrian fine dining and farewell tasting experience.",
        activities: [
          "Full-day Istrian food and olive oil tour through hilltop villages.",
          "Farewell dinner at a Michelin-recognised Adriatic restaurant.",
          "Return transfer and departure with memories to savour.",
        ],
      },
    ],
  },
];

// ─── INSPIRATION ARTICLES ─────────────────────────────────────────────────────

const ARTICLES = [
  {
    _id: "article-slovenia-uncovered",
    _type: "inspirationArticle",
    sortOrder: 1,
    title: "Slovenia Uncovered: When, Where & How to Experience Its Magic",
    slug: { _type: "slug", current: "slovenia-uncovered" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-slovenia" },
    destinationLabel: "SLOVENIA",
    author: { _type: "reference", _ref: "author-abram" },
    intro: "There's a quiet kind of magic in Slovenia—one that doesn't demand attention, but gently reveals itself the longer you stay. It begins in the soft morning light over Lake Bled, where still waters mirror the Julian Alps and the world feels untouched. As the day unfolds, that magic follows you—through winding alpine roads, into emerald-green rivers, and along charming streets where history and modern life exist in perfect harmony.",
    section1Title: "The Beauty Of Slovenia",
    section1Body: [
      "The beauty of Slovenia lies in its ever-changing rhythm. In spring and summer, it feels alive—lush landscapes, sunlit lakes, and open trails inviting you to explore freely. Autumn slows everything down, wrapping the countryside in warm tones and quiet moments, while winter brings a serene stillness, where snow-dusted peaks and cozy hideaways create an entirely different kind of escape. Each season offers not just a new view, but a new feeling.",
      "Beyond its landscapes, Slovenia's soul is found in its experiences. It's in the taste of local wines in the Vipava Valley, in the silence of ancient caves carved over millennia, and in the warmth of small, authentic encounters that make you feel instantly at home. Here, travel isn't rushed—it's savored.",
    ],
    galleryTitle: "What Makes The Journey Special?",
    galleryBody: "What makes the journey truly special is the way everything flows effortlessly. Distances are short, yet the experiences feel vast—allowing you to move from mountains to vineyards to the sea in a single, unhurried day. It's a place designed for those who seek variety without compromise, and beauty without crowds.",
    section2Title: "The Beauty Of Slovenia",
    section2Body: [
      "The beauty of Slovenia lies in its ever-changing rhythm. In spring and summer, it feels alive—lush landscapes, sunlit lakes, and open trails inviting you to explore freely. Autumn slows everything down, wrapping the countryside in warm tones and quiet moments, while winter brings a serene stillness, where snow-dusted peaks and cozy hideaways create an entirely different kind of escape. Each season offers not just a new view, but a new feeling.",
      "Beyond its landscapes, Slovenia's soul is found in its experiences. It's in the taste of local wines in the Vipava Valley, in the silence of ancient caves carved over millennia, and in the warmth of small, authentic encounters that make you feel instantly at home. Here, travel isn't rushed—it's savored.",
    ],
    closingText: "And perhaps that's what makes Slovenia so unforgettable. It doesn't overwhelm you—it invites you. To slow down, to look closer, and to discover a kind of beauty that stays with you long after the journey ends.",
    ctaTitle: "Excited For Your Slovenian Trip?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-norway-wilderness",
    _type: "inspirationArticle",
    sortOrder: 2,
    title: "Norway Uncovered: When, Where & How to Experience Its Magic",
    slug: { _type: "slug", current: "norway-wilderness" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-norway" },
    destinationLabel: "NORWAY",
    author: { _type: "reference", _ref: "author-abram" },
    intro: "Norway reveals itself slowly—through the vast silence of its fjords, the otherworldly shimmer of the Northern Lights, and the enduring warmth of its coastal towns. It is a country that asks you to pause and look, because nearly every view rewards the patient traveller with something truly extraordinary.",
    section1Title: "The Soul Of Norway",
    section1Body: [
      "Norway's landscape is one of contrasts that somehow coexist in perfect harmony. Dramatic fjords carved by ancient glaciers sit alongside quiet fishing villages where little has changed in centuries. In summer, the midnight sun casts a golden permanence over the land; in winter, darkness gives way to the aurora borealis dancing in emerald waves across the arctic sky.",
      "What defines Norway is not just what you see, but what you feel. There's a purity to the air, a clarity to the light, and a deep sense of space that is rare in the modern world. Travelling here, you feel both small and profoundly alive.",
    ],
    galleryTitle: "What Makes Norway Unforgettable?",
    galleryBody: "Norway's magic lies in its scale—vast enough to feel infinite, yet intimate enough to feel personal. Whether you're kayaking through a still fjord at dawn or watching reindeer cross a snow-covered plateau, every moment feels like a privilege.",
    section2Title: "The Soul Of Norway",
    section2Body: [
      "The Norwegian coastline stretches for thousands of kilometres, dotted with islands, inlets, and centuries-old stave churches. Each region has its own character—from the urban sophistication of Oslo to the raw, windswept beauty of the Lofoten Islands and the alpine grandeur of the interior.",
      "What binds it all together is a culture of simplicity and connection to nature. The concept of friluftsliv—open-air living—is embedded in Norwegian life, and as a visitor, you are invited into that rhythm entirely.",
    ],
    closingText: "Norway doesn't need to perform. It simply is—wild, generous, and quietly magnificent. And long after you've left its shores, you'll find its landscapes have taken up permanent residence in your memory.",
    ctaTitle: "Ready For Your Norwegian Adventure?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-iceland-wonders",
    _type: "inspirationArticle",
    sortOrder: 3,
    title: "Iceland Uncovered: Fire, Ice & Everything In Between",
    slug: { _type: "slug", current: "iceland-wonders" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-iceland" },
    destinationLabel: "ICELAND",
    author: { _type: "reference", _ref: "author-abram" },
    intro: "Iceland exists in its own category. It is a place where geological forces play out in real time—where you can stand between two tectonic plates, watch a geyser erupt on schedule, and see glaciers retreating before your eyes. It is, in every sense, a living landscape.",
    section1Title: "The Spirit Of Iceland",
    section1Body: [
      "Iceland rewards curiosity. Its interior—known as the Highlands—remains one of Europe's last true wildernesses, accessible only for a few months each year and traversable only by four-wheel drive. Here, vast lava fields and obsidian mountains stretch uninterrupted to the horizon under skies that seem impossibly wide.",
      "In winter, the darkness brings its own gift: the Northern Lights. Standing beneath a rippling green aurora on a clear Icelandic night is one of those experiences that resists description—it simply must be lived.",
    ],
    galleryTitle: "What Makes Iceland Extraordinary?",
    galleryBody: "Iceland's power is elemental. From the thundering force of Dettifoss waterfall to the eerie stillness of an ice cave lit from within—every experience here operates at a scale and intensity that stays with you.",
    section2Title: "The Spirit Of Iceland",
    section2Body: [
      "Beyond its dramatic landscapes, Iceland is a country of remarkable warmth. Reykjavik, one of the world's smallest capitals, punches far above its weight in art, cuisine, and culture—its geothermally heated pools a gathering point for locals and visitors alike.",
      "Icelandic food culture has evolved dramatically in recent years, with a new generation of chefs drawing on local traditions and exceptional ingredients—arctic char, skyr, langoustine—to create something genuinely world-class.",
    ],
    closingText: "Iceland leaves a mark. Its scale humbles you, its beauty moves you, and its people welcome you. It is a destination that invites you not just to visit, but to return.",
    ctaTitle: "Ready to Experience Iceland?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-slovenia-highlands",
    _type: "inspirationArticle",
    sortOrder: 4,
    title: "Slovenia's Alpine Highlands: A Journey Above the Clouds",
    slug: { _type: "slug", current: "slovenia-highlands" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-slovenia" },
    destinationLabel: "SLOVENIA",
    author: { _type: "reference", _ref: "author-abram" },
    intro: "Above the towns and the tourist trails, Slovenia opens up into something altogether wilder. The Julian Alps rise sharply from the green plains, their limestone peaks dusted with snow even in summer, their valleys carved by rivers of extraordinary clarity.",
    section1Title: "Above the Treeline",
    section1Body: [
      "The Triglav National Park—Slovenia's only national park—encompasses the heart of the Julian Alps. Named for its highest peak, Mount Triglav, the park is a place of deep significance in Slovenian culture. To climb Triglav is a rite of passage for Slovenians, a connection to something ancient and unbreakable.",
      "For visitors, the park offers hiking trails through glacial valleys, swimming in mountain lakes so cold they take your breath away, and the kind of silence that is genuinely rare in the modern world.",
    ],
    galleryTitle: "What the Highlands Reveal",
    galleryBody: "Above a certain altitude in Slovenia, the world simplifies beautifully. The noise fades, the views expand, and time slows to the pace of your own footsteps. The highlands reward those who make the effort.",
    section2Title: "Above the Treeline",
    section2Body: [
      "Beyond hiking, the Slovenian Alps offer world-class cycling routes, horse riding through meadows carpeted in wildflowers, and fly-fishing in rivers teeming with brown and marble trout. In winter, the ski resorts are refreshingly uncrowded compared to their Austrian and Swiss counterparts.",
      "The alpine villages—particularly Kranjska Gora and Bovec—offer a warm hospitality rooted in mountain tradition. Local cheeses, cured meats, and buckwheat dishes fuel the body after long days in the hills.",
    ],
    closingText: "The Slovenian highlands ask nothing of you except your presence. Come with open eyes and willing legs, and they will give you far more than you expect.",
    ctaTitle: "Discover Slovenia's Highland Magic",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-norway-northern-lights",
    _type: "inspirationArticle",
    sortOrder: 5,
    title: "Chasing the Aurora: Norway's Northern Lights Experience",
    slug: { _type: "slug", current: "norway-northern-lights" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-norway" },
    destinationLabel: "NORWAY",
    author: { _type: "reference", _ref: "author-anika" },
    intro: "The Northern Lights are not guaranteed—and that unpredictability is part of their power. When they appear, usually without warning, they transform the sky into something that feels borrowed from mythology. Norway's Arctic north is one of the finest places on Earth to witness this spectacle.",
    section1Title: "Under the Arctic Sky",
    section1Body: [
      "The Lofoten Islands sit well above the Arctic Circle, their dramatic peaks rising straight from the sea in a geological statement that never loses its power to astonish. In winter, these islands offer some of the best aurora viewing in the world—far from light pollution, with clear horizons and the full canopy of the northern sky visible overhead.",
      "By day, the islands offer their own remarkable beauty. Traditional fishing villages painted in red and yellow stand against snow-covered mountains and icy blue fjords. The contrast of colours in winter light is something painters have tried to capture for centuries.",
    ],
    galleryTitle: "The Light that Changes Everything",
    galleryBody: "The Northern Lights do something unusual to the people who see them. Grown adults stand in silence, mouths open, necks craned upward. Whatever you thought you knew about colour and light is quietly revised.",
    section2Title: "Under the Arctic Sky",
    section2Body: [
      "Beyond the aurora, Tromsø—Norway's 'Arctic capital'—offers a rich cultural life: indigenous Sámi culture, world-class seafood, and the unique experience of the polar night, when the sun doesn't rise for weeks and the city operates in a beautiful perpetual twilight.",
      "Dog sledding, snowshoeing, and reindeer encounters round out the winter programme. But for most visitors, the defining memory is simpler: standing outside on a clear night, looking up, and watching the sky come alive.",
    ],
    closingText: "The Northern Lights cannot be booked or scheduled, only sought. Norway gives you the best possible conditions for that search—and the results, when they come, are worth every cold, patient minute.",
    ctaTitle: "Chase the Aurora in Norway",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-iceland-fire-ice",
    _type: "inspirationArticle",
    sortOrder: 6,
    title: "Iceland's Fire & Ice: Adventures at the Edge of the Earth",
    slug: { _type: "slug", current: "iceland-fire-ice" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-iceland" },
    destinationLabel: "ICELAND",
    author: { _type: "reference", _ref: "author-ruben" },
    intro: "There are places on Earth where the geological drama is so intense it feels personal. Iceland is one of them. Volcanoes and glaciers share the same island in an uneasy, endlessly fascinating coexistence—and between them lies some of the most extraordinary terrain on the planet.",
    section1Title: "Where Earth Breathes",
    section1Body: [
      "Iceland sits on the Mid-Atlantic Ridge, where two tectonic plates are pulling apart at the rate of a few centimetres per year. The consequences of this geological restlessness are visible everywhere—in the hot springs that bubble up through lava fields, in the volcanoes that have shaped the island's history, and in the glaciers that creep slowly toward the sea.",
      "Vatnajökull, Europe's largest glacier, is a world unto itself—a vast plateau of ice covering active volcanoes, riddled with ice caves of astonishing blue clarity that glow from within when sunlight filters through the ancient frozen ceiling.",
    ],
    galleryTitle: "Adventures at the Extremes",
    galleryBody: "Iceland rewards those who go further. Whether that means venturing into the highlands in a modified 4x4, hiking across a glacier with crampons, or soaking in a natural hot spring at midnight—the country consistently exceeds expectations.",
    section2Title: "Where Earth Breathes",
    section2Body: [
      "The south coast of Iceland is a study in contrasts. Black sand beaches where the Atlantic breaks in massive waves. Waterfalls that tumble from cliffs you can walk behind. Fields of lupins in summer purple. Abandoned farmhouses slowly being reclaimed by the landscape.",
      "Every kilometre of the Ring Road reveals something new—a reminder that Iceland, despite its relatively small size, contains multitudes.",
    ],
    closingText: "Iceland is not a comfortable destination—it is a challenging, exhilarating, humbling one. And those who come prepared for that challenge leave with something that lasts a lifetime.",
    ctaTitle: "Explore Iceland's Wild Edge",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
  {
    _id: "article-slovenia-wine-trails",
    _type: "inspirationArticle",
    sortOrder: 7,
    title: "Slovenia's Wine Trails: A Journey Through Taste and Terroir",
    slug: { _type: "slug", current: "slovenia-wine-trails" },
    publishDate: "2026-04-07",
    destination: { _type: "reference", _ref: "destination-slovenia" },
    destinationLabel: "SLOVENIA",
    author: { _type: "reference", _ref: "author-jakob" },
    intro: "Slovenia is one of Europe's best-kept wine secrets. Its three distinct wine regions—the Vipava Valley, Goriška Brda, and the Karst—produce wines of exceptional character that rarely travel far beyond the country's borders. Which means the only way to truly experience them is to go.",
    section1Title: "The Taste of Slovenia",
    section1Body: [
      "Goriška Brda, known as the Slovenian Tuscany, is a region of rolling hills, medieval hilltop villages, and terraced vineyards that produce some of Central Europe's finest white wines. The Brda Rebula—a native grape variety with ancient roots—is a revelation: golden, textured, and deeply expressive of its limestone and sandstone terroir.",
      "In the Vipava Valley, a strong Bora wind shapes the wines as much as the soil. The valley's ancient orange wines—made by leaving white grape skins in contact with the juice—are among the most distinctive in the world, with a depth and complexity that demands unhurried attention.",
    ],
    galleryTitle: "Why Slovenia's Wines Captivate",
    galleryBody: "Slovenian wine culture is intimate and authentic. Winemakers still welcome visitors at family cellars, pour generously, and tell stories about vintages the way others talk about family members. It is wine with a human face.",
    section2Title: "The Taste of Slovenia",
    section2Body: [
      "Pairing the wines with food is unavoidable and delightful. Slovenia's cuisine draws on Italian, Austrian, and Balkan influences while maintaining its own distinctive identity. The combination of local prosciutto, aged cheeses, truffle dishes, and handmade pasta with a well-chosen Slovenian wine is one of the simple pleasures of Central European travel.",
      "Many producers also offer accommodation and dining, allowing guests to wake among the vines, spend the day tasting and exploring, and fall asleep to the sounds of the countryside. It is a pace of travel that is increasingly rare and deeply restorative.",
    ],
    closingText: "Slovenia's wine trails offer something increasingly rare: genuine discovery. These are wines and places that haven't been packaged for mass consumption. They reward the curious traveller with experiences that feel entirely, wonderfully personal.",
    ctaTitle: "Explore Slovenia's Wine Country",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
  },
];

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

const SITE_SETTINGS = {
  _id: "siteSettings",
  _type: "siteSettings",
  navItems: [
    { _key: k(), label: "Destinations", href: "/destinations" },
    { _key: k(), label: "Journeys", href: "/journeys" },
    { _key: k(), label: "Experiences", href: "/experiences" },
    { _key: k(), label: "Inspiration", href: "/inspiration" },
    { _key: k(), label: "About", href: "/about" },
  ],
  headerActions: [
    { _key: k(), label: "Plan Your Journey", href: "#", variant: "solid" },
  ],
  newsletter: {
    title: "Get Inspired, Stay Informed",
    body: "Subscribe to receive curated travel stories, exclusive journey insights, and early access to new destinations.",
    inputPlaceholder: "Enter your email address",
    buttonLabel: "Subscribe",
  },
  footer: {
    ctaLabel: "Plan Your Journey",
    ctaHref: "#",
    year: 2026,
    copyrightText: "© 2026 Tivor. All rights reserved.",
    followLabel: "Follow Us",
    columns: [
      { _key: k(), _type: "footerColumn", head: "Quick Access", links: ["Destinations", "Journeys", "Experiences", "Inspiration", "About", "Career"] },
      { _key: k(), _type: "footerColumn", head: "Information", links: ["FAQs", "Privacy Policy", "Terms and Conditions", "Refund Policy"] },
      { _key: k(), _type: "footerColumn", head: "Resources", links: ["Blogs", "News", "Events"] },
      { _key: k(), _type: "footerColumn", head: "Top Destinations", links: ["Slovenia", "Iceland", "Norway"] },
      { _key: k(), _type: "footerColumn", head: "Contact Us", links: ["+971 4 555 7842", "travel@tivor.ae", "WhatsApp"] },
      { _key: k(), _type: "footerColumn", head: "Reach Us", links: ["Office 1204,\nAl Saqr Business Tower\nSheikh Zayed Road\nDubai, UAE"] },
    ],
    socialLinks: [
      { _key: k(), _type: "socialLink", platform: "Instagram", href: "#" },
      { _key: k(), _type: "socialLink", platform: "LinkedIn", href: "#" },
    ],
  },
  destinationFeatures: [
    { _key: k(), _type: "featureItem", title: "A Personal Journey Designer", desc: "Crafting every detail around your preferences and travel style" },
    { _key: k(), _type: "featureItem", title: "Seamless Door-to-Door Transfers", desc: "Effortless travel with private transfers and expert local chauffeurs" },
    { _key: k(), _type: "featureItem", title: "Priority Access to Iconic Landmarks", desc: "Skip the queues and explore the extraordinary with ease" },
    { _key: k(), _type: "featureItem", title: "Round-the-Clock Concierge Support", desc: "Always by your side, wherever your journey takes you" },
  ],
  recommendedExperiences: [
    { _key: k(), country: "SLOVENIA", title: "Hot air balloon ride watching the magical sunrise over an Alpine Lake" },
    { _key: k(), country: "NORWAY", title: "Customized lake side picnic" },
    { _key: k(), country: "SLOVENIA", title: "Private visit to a bee farm" },
  ],
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

const HOME_PAGE = {
  _id: "homePage",
  _type: "homePage",
  heroTitle: "Extraordinary Journeys, Tailored for You",
  heroSubtitle: "Bespoke luxury travel crafted around your passions, pace, and sense of discovery.",
  introTitle: "A New Way to Experience the World",
  introParagraphs: [
    "At the heart of everything we do lies a simple belief—travel should be as unique as the individual experiencing it. We go beyond conventional itineraries to design journeys that reflect your passions, pace, and sense of discovery.",
    "Every detail is thoughtfully considered, from handpicked stays and seamless transfers to immersive experiences that connect you deeply with each destination.",
  ],
  featuredDestinationsLabel: "Our Destinations",
  featuredDestinationsTitle: "Places That Leave Their Mark",
  featuredDestinations: [
    { _key: k(), _type: "reference", _ref: "destination-slovenia" },
    { _key: k(), _type: "reference", _ref: "destination-iceland" },
    { _key: k(), _type: "reference", _ref: "destination-norway" },
  ],
  curatedJourneysLabel: "Curated Journeys",
  curatedJourneysTitle: "Journeys Designed Around You",
  curatedJourneysLinkLabel: "View All Journeys",
  curatedJourneysLinkHref: "/journeys",
  featuredJourneys: [
    { _key: k(), _type: "reference", _ref: "journey-golf-escape-slovenia" },
    { _key: k(), _type: "reference", _ref: "journey-winter-adventure-iceland" },
  ],
  experiencesLabel: "Our Experiences",
  experiencesTitle: "Travel Beyond the Ordinary",
  experiencesButtonLabel: "Plan Your Journey",
  experiencesButtonHref: "#",
  experiences: [
    { _key: k(), _type: "experienceCard", label: "Sports and Adventure" },
    { _key: k(), _type: "experienceCard", label: "Health and Wellness" },
    { _key: k(), _type: "experienceCard", label: "Romantic Escape" },
    { _key: k(), _type: "experienceCard", label: "Gastronomy" },
  ],
  aboutLabel: "About Tivor",
  aboutTitleLineOne: "We Don't Just",
  aboutTitleLineTwo: "Plan Trips",
  aboutBody: "We craft experiences that reflect who you are. From the first conversation to the final moment of your journey, we are with you—attentive, thoughtful, and genuinely passionate about creating travel that matters.",
  aboutLinkLabel: "Learn More About Us",
  aboutLinkHref: "/about",
  whyTravelLabel: "Why Tivor",
  whyTravelTitleLineOne: "Travel Differently,",
  whyTravelTitleLineTwo: "Travel Better",
  whyTravelLinkLabel: "Start Planning",
  whyTravelLinkHref: "#",
  reasons: [
    { _key: k(), title: "Tailor-Made Journeys", desc: "Every itinerary is custom designed to match your interests, travel style, and pace." },
    { _key: k(), title: "Insider Access", desc: "Gain access to hidden locations, exclusive experiences, and private tours not available to the general public." },
    { _key: k(), title: "Seamless Travel Planning", desc: "From flights and accommodations to unique experiences, we take care of every detail." },
  ],
  testimonialsLabel: "What Our Guests Say",
  testimonialsTitleLineOne: "Stories From",
  testimonialsTitleLineTwo: "Those Who've Travelled With Us",
  testimonials: [
    { _key: k(), _type: "testimonial", quote: '"Seamless and beautifully curated travel."', body: "From booking to the final day, everything was smooth and stress-free. The team ensured we enjoyed every moment without worrying about anything.", author: "— Sophia Laurent, France" },
    { _key: k(), _type: "testimonial", quote: '"A journey we will cherish forever."', body: "The attention to detail and unique experiences made this trip exceptional. We felt truly taken care of throughout.", author: "— James Carter, Australia" },
    { _key: k(), _type: "testimonial", quote: '"An unforgettable experience from start to finish."', body: "Every detail of our trip was thoughtfully planned. The destinations, the stays, and the experiences were beyond anything we imagined.", author: "— Emma Richardson, UK" },
  ],
  finalCtaEyebrow: "Begin Your Journey",
  finalCtaTitle: "Your Perfect Trip Starts Here",
  finalCtaButtonLabel: "Plan Your Journey",
  finalCtaButtonHref: "#",
};

// ─── PAGE SINGLETONS ──────────────────────────────────────────────────────────

const DESTINATIONS_PAGE = {
  _id: "destinationsPage",
  _type: "destinationsPage",
  title: "All Destinations",
};

const JOURNEYS_PAGE = {
  _id: "journeysPage",
  _type: "journeysPage",
  title: "Be Inspired by Our Journeys Designed Exclusively for You",
  body: "We craft bespoke travel experiences that reflect your passions, preferences, and pace. From handpicked destinations to personalized itineraries and exclusive moments, every detail is thoughtfully curated to create a journey that feels uniquely yours—seamless, meaningful, and truly unforgettable.",
  filterPlaceholder: "Choose Your Destination",
  seeMoreLabel: "See More Journeys",
  supportTitle: "Can't Find What You Are Looking For?",
  supportHeading: "Allow Us To Guide You",
  supportBody: "Tell us how you envision your journey, and we'll design a bespoke experience tailored just for you.",
  supportButtonLabel: "Plan Your Journey",
  supportButtonHref: "#",
};

const INSPIRATION_PAGE = {
  _id: "inspirationPage",
  _type: "inspirationPage",
  heroQuote: "Every Journey Leaves More Than Memories—It Leaves Moments That Stay With You Long After You've Returned.",
  gridTitle: "Inspired by Those Who've Wandered Before You",
  supportTitle: "Can't Find What You Are Looking For?",
  supportHeading: "Allow Us To Guide You",
  supportBody: "Tell us how you envision your journey, and we'll design a bespoke experience tailored just for you.",
  supportButtonLabel: "Plan Your Journey",
  supportButtonHref: "#",
};

const ABOUT_PAGE = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroTagline: "Imagine crafting your unique travel",
  introTitle: "A World of New Horizons",
  introParagraphs: [
    "At the heart of everything we do lies a simple belief—travel should be as unique as the individual experiencing it. We go beyond conventional itineraries to design journeys that reflect your passions, pace, and sense of discovery.",
    "Our approach is rooted in understanding what truly matters to you. Whether it's the quiet luxury of a secluded retreat, the thrill of exploring untouched landscapes, or meaningful cultural encounters, we curate each journey with care and intention.",
  ],
  pillars: ["Sustainable", "Immersive", "Luxurious"],
  visionTitle: "The Vision",
  visionBody: "To instill a culture of true luxury and excellence in the travel sector and to actively contribute to the prosperity of all the countries from where it operates and to where it caters.",
  missionTitle: "The Mission",
  missionBody: "To embrace global and consumer changes in the travel sector by providing our customers with the opportunity to experience the world's most untamed locations in a luxurious, immersive, and sustainable way.",
  valuesTitle: "Our Values",
  values: [
    { _key: k(), title: "High Quality Services", desc: "We maintain the highest standards of service, ensuring every interaction reflects elegance, precision, and genuine care." },
    { _key: k(), title: "Immersed in Local Culture", desc: "We believe travel is most meaningful when it connects you authentically with the places and people you encounter." },
    { _key: k(), title: "Sustainable Tourism", desc: "We are committed to preserving the natural and cultural landscapes that make travel worthwhile for generations to come." },
  ],
  foundersTitle: "Meet The Founders",
  founders: [
    { _key: k(), name: "John Thomas", bio: "A passionate traveler turned entrepreneur, the founder brings a deep love for exploration and cultural discovery into every journey curated by the company." },
    { _key: k(), name: "Aleena David", bio: "A passionate traveler turned entrepreneur, the founder brings a deep love for exploration and cultural discovery into every journey curated by the company." },
  ],
  ctaEyebrow: "Experience Tivor",
  ctaTitle: "Travel Differently",
  ctaButtonLabel: "Begin Your Journey",
  ctaButtonHref: "#",
};

// ─── SEED ─────────────────────────────────────────────────────────────────────

async function upsert(doc: Record<string, unknown>) {
  await client.createOrReplace(doc as any);
  console.log(`  ✓ ${doc._type}: ${(doc.title || doc.name || doc._id) as string}`);
}

async function seed() {
  console.log(`\nSeeding Sanity project "${projectId}" / dataset "${dataset}"\n`);

  console.log("── Authors ──────────────────────────────────");
  for (const doc of AUTHORS) await upsert(doc);

  console.log("\n── Destinations ─────────────────────────────");
  for (const doc of DESTINATIONS) await upsert(doc);

  console.log("\n── Journeys ─────────────────────────────────");
  for (const doc of JOURNEYS) await upsert(doc);

  console.log("\n── Inspiration Articles ─────────────────────");
  for (const doc of ARTICLES) await upsert(doc);

  console.log("\n── Site Settings ────────────────────────────");
  await upsert(SITE_SETTINGS);

  console.log("\n── Home Page ────────────────────────────────");
  await upsert(HOME_PAGE);

  console.log("\n── Page Singletons ──────────────────────────");
  await upsert(DESTINATIONS_PAGE);
  await upsert(JOURNEYS_PAGE);
  await upsert(INSPIRATION_PAGE);
  await upsert(ABOUT_PAGE);

  console.log("\n✅ Seed complete!\n");
  console.log("Next step: upload images via the Studio at http://localhost:3000/studio");
  console.log("See the guide below for the order of images to upload.\n");
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
