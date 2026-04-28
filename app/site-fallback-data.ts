export const IMG = {
  hero: "https://www.figma.com/api/mcp/asset/46c3f49f-e238-49e1-aa48-7e028885f32a",
  slovenia: "https://www.figma.com/api/mcp/asset/98daaf6f-edbc-45bd-b116-141708962b3f",
  iceland: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
  norway: "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
  journey1: "https://www.figma.com/api/mcp/asset/fadf5543-79cf-42f7-8877-c847dee3333d",
  journey2: "https://www.figma.com/api/mcp/asset/28c35292-92c4-407a-9c11-91cbe9c9db9a",
  expSports: "https://www.figma.com/api/mcp/asset/1cb5f560-3c78-4def-b7ef-8fbc58a3970c",
  expHealth: "https://www.figma.com/api/mcp/asset/c84fce0c-8825-4618-a2b1-a7ba78792c21",
  expRomantic: "https://www.figma.com/api/mcp/asset/1d8451a3-f2a4-413a-9406-bc7392c5e3f0",
  expGastronomy: "https://www.figma.com/api/mcp/asset/851887b4-36f0-4c8c-8b10-f1d576c78c0b",
  aboutHero: "https://www.figma.com/api/mcp/asset/19f3e69a-b68b-4fbd-bf59-9aae4ac0a599",
  whyUs: "https://www.figma.com/api/mcp/asset/a1c97108-6955-42ca-be1a-881db5e71b07",
  newsletterBg: "https://www.figma.com/api/mcp/asset/2ece4d93-8477-46be-9f94-72c9b63e37a9",
  logoLight: "https://www.figma.com/api/mcp/asset/c1542984-59fb-4b7d-9958-030e9dbee24f",
  logoDark: "https://www.figma.com/api/mcp/asset/c12ea2a7-7f80-4925-a1f6-f774d96dc9e3",
  logoOnLight: "https://www.figma.com/api/mcp/asset/52e64f15-934b-4d86-920f-a5a06313f7d5",
  footerIcon: "https://www.figma.com/api/mcp/asset/1713c2b7-db76-45dc-bf44-cac9ee81b759",
  stars: "https://www.figma.com/api/mcp/asset/ad23b2b3-f774-4b1f-8acc-9e8f6f310ae3",
  instagram: "https://www.figma.com/api/mcp/asset/d266e143-1bda-4b6f-8755-72f510c5ff15",
  linkedin: "https://www.figma.com/api/mcp/asset/5ad8eac6-88fd-4113-9977-860fec3084b2",
  copyright: "https://www.figma.com/api/mcp/asset/0bf10d4a-71e4-4510-8a1d-3c9de3c0ca8a",
} as const;

export const destinations = [
  {
    slug: "slovenia",
    img: IMG.slovenia,
    name: "Slovenia",
    blurb:
      "From the iconic beauty of Lake Bled to the vibrant streets of Ljubljana, it offers a perfect blend of nature, culture, and tranquility.",
    region: "Central Europe",
    bestSeason: "April - October",
    tone: "Emerald lakes, alpine villages, and elegant city breaks.",
    detail: {
      heroImg: "https://www.figma.com/api/mcp/asset/891483a7-9e36-4416-a42a-59bc5630effc",
      heroTitle: "Europe's Hidden Gem",
      heroSubtitle: "A Land Of Unforgettable Journeys",
      scriptImg: "https://www.figma.com/api/mcp/asset/af2c879a-7f6f-4de0-9693-c4c2a7a3bddf",
      desc1:
        "feels like a place pulled from a quiet dream. As the morning mist lifts over Lake Bled, the still waters mirror a tiny island church, and the sound of distant bells echoes through the mountains. Wandering through the charming streets of Ljubljana, every corner reveals a blend of history, art, and effortless beauty.",
      desc2:
        "By the time the sun sets behind the Julian Alps, painting the sky in soft gold and pink, you realize Slovenia isn't just a destination—it's a feeling you carry long after the journey ends.",
      gallery: [
        "https://www.figma.com/api/mcp/asset/8e6ea23c-1fe1-4f3b-9ec5-08fa8d7d9ceb",
        "https://www.figma.com/api/mcp/asset/89661e75-4af8-4384-ac6d-b91099400512",
      ] as [string, string],
      ctaImg: "https://www.figma.com/api/mcp/asset/762b430a-40d1-486b-b4a2-4b14e436a5ce",
    },
  },
  {
    slug: "iceland",
    img: IMG.iceland,
    name: "Iceland",
    blurb:
      "From the magical Northern Lights to its rugged natural beauty, every corner feels like a once-in-a-lifetime experience.",
    region: "Nordic Atlantic",
    bestSeason: "September - April",
    tone: "Volcanic landscapes, glacier adventures, and dramatic winter skies.",
    detail: {
      heroImg: IMG.iceland,
      heroTitle: "Land of Fire and Ice",
      heroSubtitle: "Where Nature Writes the Rules",
      scriptImg: null,
      desc1:
        "Iceland unfolds like a living myth. Where volcanoes breathe beneath glaciers and the Northern Lights dance across an ink-black sky, every moment feels borrowed from another world. The silence of the highlands is broken only by the thunder of waterfalls and the hiss of geothermal vents.",
      desc2:
        "As you drive along the Ring Road, each bend reveals something more extraordinary than the last—black sand beaches, ice caves glowing aquamarine blue, and vast lava fields that stretch beyond sight. Iceland doesn't just show you nature; it makes you feel it.",
      gallery: [IMG.iceland, IMG.iceland] as [string, string],
      ctaImg: IMG.iceland,
    },
  },
  {
    slug: "norway",
    img: IMG.norway,
    name: "Norway",
    blurb:
      "From the Northern Lights in the Arctic to scenic train journeys through dramatic valleys, it offers unforgettable natural beauty at every turn.",
    region: "Scandinavia",
    bestSeason: "May - September",
    tone: "Fjords, design-led stays, and cinematic road journeys.",
    detail: {
      heroImg: IMG.norway,
      heroTitle: "The Land of Fjords",
      heroSubtitle: "Nature in Its Most Dramatic Form",
      scriptImg: null,
      desc1:
        "Norway rises from the sea in soaring cliffs and deep fjords that have inspired poets, painters, and dreamers for centuries. To sail through the Geirangerfjord is to understand why Norwegians speak of their land with quiet reverence—it is beautiful in a way that demands silence.",
      desc2:
        "From the midnight sun casting golden light over the Arctic at summer's peak, to the Northern Lights weaving green ribbons across winter skies, Norway moves through extremes with extraordinary grace. This is a destination that changes with the seasons—and leaves its mark on every traveller.",
      gallery: [IMG.norway, IMG.norway] as [string, string],
      ctaImg: IMG.norway,
    },
  },
];

export const journeys = [
  {
    slug: "golf-escape-slovenia",
    img: "https://www.figma.com/api/mcp/asset/31197009-5de0-4c42-a106-ef6132311a3f",
    alt: "Golf escape Slovenia",
    title: "A Golf Escape in the Fabled Cities of Slovenia",
    desc: "Play the emerald-green fairways of Europe's finest golf courses.",
    fullDesc: [
      "Play the emerald-green fairways of Europe's finest golf courses. Surrounded by rolling contours, Slovenia's golf courses that we selected for you are set against breathtakingly beautiful landscapes: from Alpine Mountains to Pannonian Plain to pristine Green Vineyards. They offer challenging opportunities to tee off in complete tranquility.",
      "Our journey offers two 18-hole Championship Kings courses and a unique 9-hole course in the middle of 185-acre vineyards from the 15th century. Enjoy three different perfectly maintained and manicured golf courses with a taste of Slovenian culture and adventure.",
    ],
    accent: "bg-[#b5bfab]",
    lightText: false,
    hasDivider: true,
    destination: "slovenia",
    featured: true,
    details: [
      ["Duration", "7 nights, 8 days"],
      ["Best season", "March - November"],
      ["Suited for", "Group of 4 up to 12"],
    ] as [string, string][],
    inclusions: [
      "Accommodation 4 nights in a private chalet or 5-star hotel and 3 nights in a 5-star 480-acre estate",
      "4 golf games across 3 different championship courses",
      "Private transfers throughout",
      "Daily breakfast",
      "4 dinners at curated restaurants",
      "2 private guided cultural tours",
      "1 private picnic and wine tasting",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/694e3c1e-22cd-4900-98ef-f784fd2cc71a",
    priceFrom: "4231",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Excited on Your Golf Escape With Us",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive in Ljubljana and check-in at your hotel in Bled or Bohinj.",
        img: "https://www.figma.com/api/mcp/asset/694e3c1e-22cd-4900-98ef-f784fd2cc71a",
        activities: [
          "Meet your holiday Experience Manager on arrival at Ljubljana International Airport.",
          "Private transfer to your luxury hotel in Bled or a private chalet in Bohinj.",
          "Enjoy a dinner overviewing the lake.",
        ],
      },
      {
        day: "Day -2",
        title: "Morning championship round at Bled Golf & Country Club.",
        img: "https://www.figma.com/api/mcp/asset/31197009-5de0-4c42-a106-ef6132311a3f",
        activities: [
          "Tee off at the Kings Course with sweeping views of Lake Bled and the Julian Alps.",
          "Clubhouse lunch with a curated tasting of local Slovenian wines.",
          "Afternoon at leisure — sunset walk along the lakeshore or a spa session.",
        ],
      },
      {
        day: "Day -3",
        title: "Explore the historic city center of Ljubljana with a guided walking tour.",
        img: "https://www.figma.com/api/mcp/asset/8e6ea23c-1fe1-4f3b-9ec5-08fa8d7d9ceb",
        activities: [
          "Visit Ljubljana Castle and enjoy panoramic views of the city.",
          "Lunch at a traditional Slovenian restaurant, tasting local delicacies.",
        ],
      },
      {
        day: "Day -4",
        title: "Transfer to Lake Bled for a morning boat ride to Bled Island.",
        img: "https://www.figma.com/api/mcp/asset/89661e75-4af8-4384-ac6d-b91099400512",
        activities: [
          "Climb the bell tower on Bled Island and ring the wishing bell.",
          "Afternoon hike around Lake Bohinj with a picnic lunch in nature.",
          "Return to your accommodation for a wellness spa session and gourmet dinner.",
        ],
      },
    ],
  },
  {
    slug: "winter-adventure-iceland",
    img: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
    alt: "Winter adventure Iceland",
    title: "The Unbelievable is Your Reality: Winter Adventure in Iceland",
    desc: "Where the rarest forces of nature collide and mother nature reigns supreme, you will experience a sparkling winter wonderland in Iceland.",
    fullDesc: [
      "Experience the raw, untamed beauty of Iceland in winter, where the rarest forces of nature collide in a spectacular display of power and wonder. Watch the Northern Lights ripple across an endless arctic sky as glaciers gleam under the moonlight and geysers explode through frozen ground.",
      "Your journey takes you across Iceland's most dramatic winter landscapes — from the otherworldly ice caves of Vatnajökull to the thundering curtains of Seljalandsfoss frozen mid-fall. This is a sparkling winter wonderland unlike anything else on earth.",
    ],
    accent: "bg-[#acb1b4]",
    lightText: false,
    hasDivider: false,
    destination: "iceland",
    featured: true,
    details: [
      ["Duration", "7 nights, 8 days"],
      ["Best season", "September - April"],
      ["Suited for", "Group of 2 up to 10"],
    ] as [string, string][],
    inclusions: [
      "7 nights in luxury boutique hotels and lodges",
      "Private airport and inter-destination transfers",
      "Daily breakfast and 4 dinners",
      "Northern Lights guided tour with aurora photographer",
      "Guided glacier walk on Sólheimajökull with crampons and poles",
      "Private ice cave tour inside Vatnajökull National Park",
      "Access to secluded geothermal hot springs",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
    priceFrom: "5890",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Ready for Your Icelandic Winter Adventure?",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive in Reykjavik and settle into your boutique hotel.",
        img: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
        activities: [
          "Meet your Experience Manager on arrival at Keflavik International Airport.",
          "Private transfer to your luxury hotel in Reykjavik.",
          "Welcome dinner featuring traditional Icelandic cuisine.",
        ],
      },
      {
        day: "Day -2",
        title: "Northern Lights hunt and geothermal experience.",
        img: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
        activities: [
          "Morning guided glacier walk on Sólheimajökull glacier.",
          "Soak in a secluded geothermal hot spring under open skies.",
          "Evening Northern Lights tour with expert aurora photographers.",
        ],
      },
      {
        day: "Day -3",
        title: "Explore the ice caves of Vatnajökull National Park.",
        img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
        activities: [
          "Private guided tour inside luminous blue ice caves.",
          "Visit Jökulsárlón glacier lagoon and Diamond Beach.",
          "Gourmet dinner at a remote lodge with panoramic ice views.",
        ],
      },
      {
        day: "Day -4",
        title: "South Coast wonders and waterfall walks.",
        img: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
        activities: [
          "Walk behind the frozen curtain of Seljalandsfoss waterfall.",
          "Explore the black sand beaches of Reynisfjara.",
          "Return to Reykjavik for a farewell dinner and evening at leisure.",
        ],
      },
    ],
  },
  {
    slug: "norwegian-fjords-grand-gallery",
    img: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
    alt: "Norwegian fjords",
    title: "Norwegian Fjords: A Journey Through Nature's Grand Gallery",
    desc: "Sail through majestic fjords, trek ancient glaciers, and witness the midnight sun over some of the world's most breathtaking coastlines.",
    fullDesc: [
      "Norway's fjords are among the most majestic landscapes on the planet — sheer cliff faces plunging thousands of feet into crystalline blue water, ancient villages perched at the water's edge, and a silence so profound it feels sacred. Sailing through the Geirangerfjord, you understand why this place is considered one of Earth's greatest natural wonders.",
      "Our journey takes you deep into Norway's grand gallery of natural art — trekking ancient glaciers, traversing dramatic mountain passes, and witnessing the ethereal midnight sun painting the sky in amber and gold for hours without setting. Every moment is a reminder of just how extraordinary this world truly is.",
    ],
    accent: "bg-[#796250]",
    lightText: true,
    hasDivider: false,
    destination: "norway",
    featured: false,
    details: [
      ["Duration", "8 nights, 9 days"],
      ["Best season", "May - September"],
      ["Suited for", "Group of 2 up to 8"],
    ] as [string, string][],
    inclusions: [
      "8 nights in premium fjord-view hotels and clifftop lodges",
      "Private airport and inter-destination transfers",
      "Daily breakfast and 5 dinners",
      "Private Geirangerfjord sailing day trip past the Seven Sisters waterfall",
      "Guided glacier trek on Briksdalsbreen with equipment provided",
      "Fjord kayaking experience through calm waters",
      "Bergen guided city tour including Bryggen Wharf and Fløyen funicular",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
    priceFrom: "6450",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Sail Into Norway's Grand Fjord Gallery",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive in Oslo and begin your Scandinavian journey.",
        img: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
        activities: [
          "Private airport transfer to your waterfront hotel in Oslo.",
          "Evening harbour walk and welcome dinner at a celebrated Oslo restaurant.",
        ],
      },
      {
        day: "Day -2",
        title: "Cruise through the UNESCO-listed Geirangerfjord.",
        img: "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
        activities: [
          "Board a private vessel for the Geirangerfjord sailing experience.",
          "Pass the Seven Sisters and Suitor waterfalls at close range.",
          "Overnight at a clifftop lodge with panoramic fjord views.",
        ],
      },
      {
        day: "Day -3",
        title: "Glacier trek on the ancient Briksdalsbreen arm.",
        img: "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
        activities: [
          "Guided hike onto the Briksdalsbreen glacier with crampons and poles.",
          "Fjord kayaking through calm waters surrounded by towering cliffs.",
          "Local dinner featuring fresh Norwegian seafood.",
        ],
      },
      {
        day: "Day -4",
        title: "Bergen and the midnight sun coastal experience.",
        img: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
        activities: [
          "Explore Bergen's UNESCO Bryggen Wharf and fish market.",
          "Funicular ride to Fløyen for panoramic city and fjord views.",
          "Sunset coastal cruise under the lingering Arctic summer sun.",
        ],
      },
    ],
  },
  {
    slug: "alpine-golf-slovenia",
    img: "https://www.figma.com/api/mcp/asset/9d5d7460-4c1e-47fc-b6ee-012c613d7cdf",
    alt: "Alpine golf Slovenia",
    title: "Alpine Greens: A Premium Golf Journey Through Slovenia",
    desc: "Discover Slovenia's most prestigious golf courses nestled between the Julian Alps and vineyard-covered hillsides.",
    fullDesc: [
      "Slovenia's rolling hills and pristine fairways offer a golf experience unlike any in Europe. Nestled between the Julian Alps and the Adriatic coast, Slovenia's courses combine world-class golf with stunning scenery and warm Slovenian hospitality that makes every round memorable.",
      "This journey includes access to Slovenia's most prestigious courses, including legendary 18-hole championship layouts set against the backdrop of medieval castles and vineyard-covered hillsides. Off the course, explore Ljubljana's baroque old town and the fairy-tale shores of Lake Bled.",
    ],
    accent: "bg-[#576168]",
    lightText: true,
    hasDivider: true,
    destination: "slovenia",
    featured: false,
    details: [
      ["Duration", "7 nights, 8 days"],
      ["Best season", "March - November"],
      ["Suited for", "Group of 4 up to 12"],
    ] as [string, string][],
    inclusions: [
      "7 nights in alpine boutique hotels and vineyard estate stays",
      "Private transfers throughout the journey",
      "Daily breakfast and 3 gourmet dinners",
      "3 rounds of golf at championship Alpine courses",
      "Private wine tasting with the estate sommelier",
      "Guided walking tour of Ljubljana's baroque old town",
      "Spa and wellness session at your alpine hotel",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/9d5d7460-4c1e-47fc-b6ee-012c613d7cdf",
    priceFrom: "3980",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Tee Off Among the Julian Alps",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive in Ljubljana and discover Slovenia's charming capital.",
        img: "https://www.figma.com/api/mcp/asset/9d5d7460-4c1e-47fc-b6ee-012c613d7cdf",
        activities: [
          "Private airport transfer and hotel check-in.",
          "Guided walk through Ljubljana's baroque old town and Triple Bridge.",
          "Welcome dinner at a celebrated Ljubljana restaurant.",
        ],
      },
      {
        day: "Day -2",
        title: "Championship round at Bled Golf & Country Club.",
        img: "https://www.figma.com/api/mcp/asset/b29d9302-9f59-4cc1-b07f-d12cbb607352",
        activities: [
          "Tee off on the Kings Course with alpine mountain backdrops.",
          "Winery lunch in the rolling Goriska Brda vineyard hills.",
          "Evening visit to Bled Castle perched above the iconic lake.",
        ],
      },
      {
        day: "Day -3",
        title: "Unique 9-hole golf through a 15th-century vineyard estate.",
        img: "https://www.figma.com/api/mcp/asset/765d602d-9556-463b-90a0-cae3961a9c25",
        activities: [
          "Play the historic vineyard course set among century-old vines.",
          "Private wine tasting with the estate sommelier.",
          "Spa and wellness evening at your alpine hotel.",
        ],
      },
      {
        day: "Day -4",
        title: "Final round and farewell to Slovenia.",
        img: "https://www.figma.com/api/mcp/asset/98daaf6f-edbc-45bd-b116-141708962b3f",
        activities: [
          "Morning farewell breakfast with panoramic lake views.",
          "Optional last round at your preferred course.",
          "Private transfer to Ljubljana Airport.",
        ],
      },
    ],
  },
  {
    slug: "equestrian-iceland-highlands",
    img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
    alt: "Equestrian Iceland",
    title: "Riding the Wilderness: Equestrian Journey Through Iceland",
    desc: "Explore Iceland's volcanic highlands on horseback, crossing lava fields, geothermal springs, and untouched wilderness at a gentle pace.",
    fullDesc: [
      "Iceland's Icelandic horse is one of the purest and most spirited breeds in the world, bred in isolation for over a thousand years to navigate the island's rugged volcanic terrain. Riding these sure-footed horses across Iceland's highlands is an experience of raw intimacy with both animal and landscape.",
      "Your journey winds through lava fields still steaming with geothermal energy, across moss-carpeted plains and past crystalline rivers fed by glacial melt. Each evening, you settle by candlelight in remote farm stays, sharing meals with local guides who have lived and loved this land their entire lives.",
    ],
    accent: "bg-[#b5bfab]",
    lightText: false,
    hasDivider: false,
    destination: "iceland",
    featured: false,
    details: [
      ["Duration", "5 nights, 6 days"],
      ["Best season", "June - August"],
      ["Suited for", "Group of 2 up to 6"],
    ] as [string, string][],
    inclusions: [
      "5 nights in authentic Icelandic farm stays",
      "All meals included — breakfast, packed lunch, and dinner",
      "Dedicated equestrian guide and full riding equipment",
      "Daily guided highland treks on pure-bred Icelandic horses",
      "Access to geothermal hot springs along the route",
      "Cultural visit to a remote turf-roof farmhouse with a local family",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
    priceFrom: "4750",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Ride Into Iceland's Untamed Highlands",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive and meet your Icelandic horse companions.",
        img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
        activities: [
          "Airport transfer to your traditional Icelandic farm stay.",
          "Introduction session with your horse and experienced guides.",
          "Farm dinner with locally sourced highland ingredients.",
        ],
      },
      {
        day: "Day -2",
        title: "First highland trek across ancient lava fields.",
        img: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
        activities: [
          "Morning ride across vast moss-covered lava plains.",
          "Stop at a hidden geothermal hot spring for a warm soak.",
          "Campfire dinner under the midnight sun.",
        ],
      },
      {
        day: "Day -3",
        title: "Journey through glacial river valleys and open plains.",
        img: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
        activities: [
          "Ride alongside crystal-clear rivers fed by glacial melt.",
          "Riverside picnic lunch prepared by your guide.",
          "Return to the farm for a traditional Icelandic supper.",
        ],
      },
      {
        day: "Day -4",
        title: "Summit views and cultural highland experience.",
        img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
        activities: [
          "Ascend to elevated moorlands for sweeping volcanic panoramas.",
          "Visit a remote turf-roof farmhouse with a local family.",
          "Farewell dinner celebrating the spirit of Icelandic hospitality.",
        ],
      },
    ],
  },
  {
    slug: "adriatic-gastronomy",
    img: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
    alt: "Adriatic gastronomy",
    title: "A Gastronomic Journey Through the Adriatic Coast",
    desc: "Indulge in the finest culinary traditions of the Adriatic, from fresh seafood markets to intimate wine cellars and Michelin-starred tables.",
    fullDesc: [
      "The Adriatic coast is a living culinary library — from the salt-crusted fishermen of Dalmatia who pull silver-scaled catches from waters at dawn, to the truffle hunters of Istria who know every forest path by heart. Along this coastline, food isn't just sustenance; it's identity, heritage, and joy.",
      "Your gastronomic journey takes you from the intimate wine cellars of Slovenia's Brda region to the terracotta-roofed restaurants of the Croatian coast, where Michelin-starred chefs reimagine centuries of tradition with contemporary elegance. This is the Adriatic at its most delicious.",
    ],
    accent: "bg-[#b96b42]",
    lightText: true,
    hasDivider: false,
    destination: "slovenia",
    featured: false,
    details: [
      ["Duration", "6 nights, 7 days"],
      ["Best season", "April - October"],
      ["Suited for", "Couples or small groups"],
    ] as [string, string][],
    inclusions: [
      "6 nights in boutique coastal hotels and wine estate stays",
      "Private transfers throughout",
      "Daily breakfast and 4 dinners",
      "Hands-on traditional Slovenian cooking class with a local chef",
      "Private boutique winery tour and cellar tasting in Brda",
      "Guided truffle hunting in the Istrian forests",
      "Farewell dinner at a Michelin-recognised Adriatic restaurant",
    ],
    highlightsImg: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
    priceFrom: "3640",
    priceBasis: "Based on 2 guests traveling together",
    priceCtaTitle: "Savour the Adriatic at Your Own Pace",
    itinerary: [
      {
        day: "Day -1",
        title: "Arrive in Ljubljana and dive into Slovenia's food scene.",
        img: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
        activities: [
          "Morning visit to Ljubljana's Central Market with your chef guide.",
          "Hands-on cooking class focused on traditional Slovenian recipes.",
          "Wine-pairing dinner at a celebrated Ljubljana restaurant.",
        ],
      },
      {
        day: "Day -2",
        title: "Explore the Brda wine region and truffle heartlands.",
        img: "https://www.figma.com/api/mcp/asset/762b430a-40d1-486b-b4a2-4b14e436a5ce",
        activities: [
          "Private tour of a boutique Brda winery with cellar tasting.",
          "Guided truffle hunting in the Istrian forests with local hunters.",
          "Intimate winemaker's table dinner overlooking the vineyards.",
        ],
      },
      {
        day: "Day -3",
        title: "Coastal flavors along the Adriatic shoreline.",
        img: "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
        activities: [
          "Early morning fish market tour at a working Dalmatian harbour.",
          "Seafood cooking workshop with a local coastal chef.",
          "Sunset dinner at a cliffside Adriatic restaurant.",
        ],
      },
      {
        day: "Day -4",
        title: "Istrian fine dining and farewell tasting experience.",
        img: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
        activities: [
          "Full-day Istrian food and olive oil tour through hilltop villages.",
          "Farewell dinner at a Michelin-recognised Adriatic restaurant.",
          "Return transfer and departure with memories to savour.",
        ],
      },
    ],
  },
];

export const destinationFeatures = [
  {
    img: "https://www.figma.com/api/mcp/asset/71aa0d9c-d3f8-4178-9811-26706c7da2fc",
    title: "A Personal Journey Designer",
    desc: "Crafting every detail around your preferences and travel style",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/d9bdeb87-1a0a-42f6-900b-7becdca9fb84",
    title: "Seamless Door-to-Door Transfers",
    desc: "Effortless travel with private transfers and expert local chauffeurs",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/b2c4abab-62eb-4923-a3cb-4143633a770e",
    title: "Priority Access to Iconic Landmarks",
    desc: "Skip the queues and explore the extraordinary with ease",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/712be8ce-fcd8-414e-8603-be2f924ff94b",
    title: "Round-the-Clock Concierge Support",
    desc: "Always by your side, wherever your journey takes you",
  },
];

export const experiences = [
  { img: IMG.expSports, label: "Sports and Adventure" },
  { img: IMG.expHealth, label: "Health and Wellness" },
  { img: IMG.expRomantic, label: "Romantic Escape" },
  { img: IMG.expGastronomy, label: "Gastronomy" },
];

export const reasons = [
  {
    title: "Tailor - Made Journeys",
    desc: "Every itinerary is custom designed to match your interests, travel style, and pace.",
  },
  {
    title: "Insider Access",
    desc: "Gain access to hidden locations, exclusive experiences, and private tours not available to the general public.",
  },
  {
    title: "Seamless Travel Planning",
    desc: "From flights and accommodations to unique experiences, we take care of every detail.",
  },
];

export const testimonials = [
  {
    quote: '"Seamless and beautifully curated travel."',
    body: "From booking to the final day, everything was smooth and stress-free. The team ensured we enjoyed every moment without worrying about anything.",
    author: "— Sophia Laurent, France",
  },
  {
    quote: '"A journey we will cherish forever."',
    body: "The attention to detail and unique experiences made this trip exceptional. We felt truly taken care of throughout.",
    author: "— James Carter, Australia",
  },
  {
    quote: '"An unforgettable experience from start to finish."',
    body: "Every detail of our trip was thoughtfully planned. The destinations, the stays, and the experiences were beyond anything we imagined.",
    author: "— Emma Richardson, UK",
  },
];

export const footerColumns = [
  {
    head: "Quick Access",
    links: ["Destinations", "Journeys", "Experiences", "Inspiration", "About", "Career"],
  },
  {
    head: "Information",
    links: ["FAQs", "Privacy Policy", "Terms and Conditions", "Refund Policy"],
  },
  { head: "Resources", links: ["Blogs", "News", "Events"] },
  { head: "Top Destinations", links: ["Slovenia", "Iceland", "Norway"] },
  { head: "Contact Us", links: ["+971 4 555 7842", "travel@tivor.ae", "WhatsApp"] },
  {
    head: "Reach Us",
    links: ["Office 1204,\nAl Saqr Business Tower\nSheikh Zayed Road\nDubai, UAE"],
  },
];

export const inspirations = [
  {
    slug: "slovenia-uncovered",
    img: "https://www.figma.com/api/mcp/asset/d1e9ef77-5b63-4f4f-8f9f-50dc77c98825",
    date: "7 April, 2026",
    destination: "SLOVENIA",
    title: "Slovenia Uncovered: When, Where & How to Experience Its Magic",
    avatar: "https://www.figma.com/api/mcp/asset/17c91f99-02a9-4284-8d28-50871092e103",
    author: "Abram Korsgaard",
    role: "Wildlife Photographer",
    intro:
      "There's a quiet kind of magic in Slovenia—one that doesn't demand attention, but gently reveals itself the longer you stay. It begins in the soft morning light over Lake Bled, where still waters mirror the Julian Alps and the world feels untouched. As the day unfolds, that magic follows you—through winding alpine roads, into emerald-green rivers, and along charming streets where history and modern life exist in perfect harmony.",
    heroImg: "https://www.figma.com/api/mcp/asset/ec1dee09-10a8-49dc-9764-d610e89f6200",
    section1: {
      title: "The Beauty Of Slovenia",
      body: [
        "The beauty of Slovenia lies in its ever-changing rhythm. In spring and summer, it feels alive—lush landscapes, sunlit lakes, and open trails inviting you to explore freely. Autumn slows everything down, wrapping the countryside in warm tones and quiet moments, while winter brings a serene stillness, where snow-dusted peaks and cozy hideaways create an entirely different kind of escape. Each season offers not just a new view, but a new feeling.",
        "Beyond its landscapes, Slovenia's soul is found in its experiences. It's in the taste of local wines in the Vipava Valley, in the silence of ancient caves carved over millennia, and in the warmth of small, authentic encounters that make you feel instantly at home. Here, travel isn't rushed—it's savored.",
      ],
      img: "https://www.figma.com/api/mcp/asset/941bc8e7-01f0-4be9-baab-4e21af0bd03c",
    },
    gallerySection: {
      title: "What Makes The Journey Special?",
      body: "What makes the journey truly special is the way everything flows effortlessly. Distances are short, yet the experiences feel vast—allowing you to move from mountains to vineyards to the sea in a single, unhurried day. It's a place designed for those who seek variety without compromise, and beauty without crowds.",
      images: [
        "https://www.figma.com/api/mcp/asset/e74bf794-92e7-4303-9180-246e844564c3",
        "https://www.figma.com/api/mcp/asset/1a631e86-129d-433b-9d94-bc1d387f88c8",
        "https://www.figma.com/api/mcp/asset/2d54ae49-70bd-43c7-bfb2-6835b6005277",
      ] as [string, string, string],
    },
    section2: {
      title: "The Beauty Of Slovenia",
      body: [
        "The beauty of Slovenia lies in its ever-changing rhythm. In spring and summer, it feels alive—lush landscapes, sunlit lakes, and open trails inviting you to explore freely. Autumn slows everything down, wrapping the countryside in warm tones and quiet moments, while winter brings a serene stillness, where snow-dusted peaks and cozy hideaways create an entirely different kind of escape. Each season offers not just a new view, but a new feeling.",
        "Beyond its landscapes, Slovenia's soul is found in its experiences. It's in the taste of local wines in the Vipava Valley, in the silence of ancient caves carved over millennia, and in the warmth of small, authentic encounters that make you feel instantly at home. Here, travel isn't rushed—it's savored.",
      ],
      img: "https://www.figma.com/api/mcp/asset/00b23eba-6288-4703-9802-e016de9544fc",
    },
    closingText:
      "And perhaps that's what makes Slovenia so unforgettable. It doesn't overwhelm you—it invites you. To slow down, to look closer, and to discover a kind of beauty that stays with you long after the journey ends.",
    ctaTitle: "Excited For Your Slovenian Trip?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/aaf2e59d-98bf-423b-a163-41dc165a16b9",
  },
  {
    slug: "norway-wilderness",
    img: "https://www.figma.com/api/mcp/asset/3c5d8241-271d-4e33-90f0-c8896b40fdf7",
    date: "7 April, 2026",
    destination: "NORWAY",
    title: "Norway Uncovered: When, Where & How to Experience Its Magic",
    avatar: "https://www.figma.com/api/mcp/asset/17c91f99-02a9-4284-8d28-50871092e103",
    author: "Abram Korsgaard",
    role: "Wildlife Photographer",
    intro:
      "Norway reveals itself slowly—through the vast silence of its fjords, the otherworldly shimmer of the Northern Lights, and the enduring warmth of its coastal towns. It is a country that asks you to pause and look, because nearly every view rewards the patient traveller with something truly extraordinary.",
    heroImg: "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
    section1: {
      title: "The Soul Of Norway",
      body: [
        "Norway's landscape is one of contrasts that somehow coexist in perfect harmony. Dramatic fjords carved by ancient glaciers sit alongside quiet fishing villages where little has changed in centuries. In summer, the midnight sun casts a golden permanence over the land; in winter, darkness gives way to the aurora borealis dancing in emerald waves across the arctic sky.",
        "What defines Norway is not just what you see, but what you feel. There's a purity to the air, a clarity to the light, and a deep sense of space that is rare in the modern world. Travelling here, you feel both small and profoundly alive.",
      ],
      img: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
    },
    gallerySection: {
      title: "What Makes Norway Unforgettable?",
      body: "Norway's magic lies in its scale—vast enough to feel infinite, yet intimate enough to feel personal. Whether you're kayaking through a still fjord at dawn or watching reindeer cross a snow-covered plateau, every moment feels like a privilege.",
      images: [
        "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
        "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
        "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
      ] as [string, string, string],
    },
    section2: {
      title: "The Soul Of Norway",
      body: [
        "The Norwegian coastline stretches for thousands of kilometres, dotted with islands, inlets, and centuries-old stave churches. Each region has its own character—from the urban sophistication of Oslo to the raw, windswept beauty of the Lofoten Islands and the alpine grandeur of the interior.",
        "What binds it all together is a culture of simplicity and connection to nature. The concept of friluftsliv—open-air living—is embedded in Norwegian life, and as a visitor, you are invited into that rhythm entirely.",
      ],
      img: "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
    },
    closingText:
      "Norway doesn't need to perform. It simply is—wild, generous, and quietly magnificent. And long after you've left its shores, you'll find its landscapes have taken up permanent residence in your memory.",
    ctaTitle: "Ready For Your Norwegian Adventure?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
  },
  {
    slug: "iceland-wonders",
    img: "https://www.figma.com/api/mcp/asset/fa0197e3-18eb-4f1b-81e6-62996f4abd04",
    date: "7 April, 2026",
    destination: "ICELAND",
    title: "Iceland Uncovered: Fire, Ice & Everything In Between",
    avatar: "https://www.figma.com/api/mcp/asset/17c91f99-02a9-4284-8d28-50871092e103",
    author: "Abram Korsgaard",
    role: "Insider Traveler",
    intro:
      "Iceland exists in its own category. It is a place where geological forces play out in real time—where you can stand between two tectonic plates, watch a geyser erupt on schedule, and see glaciers retreating before your eyes. It is, in every sense, a living landscape.",
    heroImg: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
    section1: {
      title: "The Spirit Of Iceland",
      body: [
        "Iceland rewards curiosity. Its interior—known as the Highlands—remains one of Europe's last true wildernesses, accessible only for a few months each year and traversable only by four-wheel drive. Here, vast lava fields and obsidian mountains stretch uninterrupted to the horizon under skies that seem impossibly wide.",
        "In winter, the darkness brings its own gift: the Northern Lights. Standing beneath a rippling green aurora on a clear Icelandic night is one of those experiences that resists description—it simply must be lived.",
      ],
      img: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
    },
    gallerySection: {
      title: "What Makes Iceland Extraordinary?",
      body: "Iceland's power is elemental. From the thundering force of Dettifoss waterfall to the eerie stillness of an ice cave lit from within—every experience here operates at a scale and intensity that stays with you.",
      images: [
        "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
        "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
        "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
      ] as [string, string, string],
    },
    section2: {
      title: "The Spirit Of Iceland",
      body: [
        "Beyond its dramatic landscapes, Iceland is a country of remarkable warmth. Reykjavik, one of the world's smallest capitals, punches far above its weight in art, cuisine, and culture—its geothermally heated pools a gathering point for locals and visitors alike.",
        "Icelandic food culture has evolved dramatically in recent years, with a new generation of chefs drawing on local traditions and exceptional ingredients—arctic char, skyr, langoustine—to create something genuinely world-class.",
      ],
      img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
    },
    closingText:
      "Iceland leaves a mark. Its scale humbles you, its beauty moves you, and its people welcome you. It is a destination that invites you not just to visit, but to return.",
    ctaTitle: "Ready to Experience Iceland?",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
  },
  {
    slug: "slovenia-highlands",
    img: "https://www.figma.com/api/mcp/asset/200a6ed1-1911-4301-8f54-1a3e03e8a215",
    date: "7 April, 2026",
    destination: "SLOVENIA",
    title: "Slovenia's Alpine Highlands: A Journey Above the Clouds",
    avatar: "https://www.figma.com/api/mcp/asset/17c91f99-02a9-4284-8d28-50871092e103",
    author: "Abram Korsgaard",
    role: "Wanderer",
    intro:
      "Above the towns and the tourist trails, Slovenia opens up into something altogether wilder. The Julian Alps rise sharply from the green plains, their limestone peaks dusted with snow even in summer, their valleys carved by rivers of extraordinary clarity.",
    heroImg: "https://www.figma.com/api/mcp/asset/8e6ea23c-1fe1-4f3b-9ec5-08fa8d7d9ceb",
    section1: {
      title: "Above the Treeline",
      body: [
        "The Triglav National Park—Slovenia's only national park—encompasses the heart of the Julian Alps. Named for its highest peak, Mount Triglav, the park is a place of deep significance in Slovenian culture. To climb Triglav is a rite of passage for Slovenians, a connection to something ancient and unbreakable.",
        "For visitors, the park offers hiking trails through glacial valleys, swimming in mountain lakes so cold they take your breath away, and the kind of silence that is genuinely rare in the modern world.",
      ],
      img: "https://www.figma.com/api/mcp/asset/89661e75-4af8-4384-ac6d-b91099400512",
    },
    gallerySection: {
      title: "What the Highlands Reveal",
      body: "Above a certain altitude in Slovenia, the world simplifies beautifully. The noise fades, the views expand, and time slows to the pace of your own footsteps. The highlands reward those who make the effort.",
      images: [
        "https://www.figma.com/api/mcp/asset/8e6ea23c-1fe1-4f3b-9ec5-08fa8d7d9ceb",
        "https://www.figma.com/api/mcp/asset/89661e75-4af8-4384-ac6d-b91099400512",
        "https://www.figma.com/api/mcp/asset/98daaf6f-edbc-45bd-b116-141708962b3f",
      ] as [string, string, string],
    },
    section2: {
      title: "Above the Treeline",
      body: [
        "Beyond hiking, the Slovenian Alps offer world-class cycling routes, horse riding through meadows carpeted in wildflowers, and fly-fishing in rivers teeming with brown and marble trout. In winter, the ski resorts are refreshingly uncrowded compared to their Austrian and Swiss counterparts.",
        "The alpine villages—particularly Kranjska Gora and Bovec—offer a warm hospitality rooted in mountain tradition. Local cheeses, cured meats, and buckwheat dishes fuel the body after long days in the hills.",
      ],
      img: "https://www.figma.com/api/mcp/asset/762b430a-40d1-486b-b4a2-4b14e436a5ce",
    },
    closingText:
      "The Slovenian highlands ask nothing of you except your presence. Come with open eyes and willing legs, and they will give you far more than you expect.",
    ctaTitle: "Discover Slovenia's Highland Magic",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/762b430a-40d1-486b-b4a2-4b14e436a5ce",
  },
  {
    slug: "norway-northern-lights",
    img: "https://www.figma.com/api/mcp/asset/6babace7-0bb8-4598-934c-df8c39a0185e",
    date: "7 April, 2026",
    destination: "NORWAY",
    title: "Chasing the Aurora: Norway's Northern Lights Experience",
    avatar: "https://www.figma.com/api/mcp/asset/7dcad9e4-1142-407c-9e79-a4cf12d12718",
    author: "Anika Kenter",
    role: "Tourist Guide",
    intro:
      "The Northern Lights are not guaranteed—and that unpredictability is part of their power. When they appear, usually without warning, they transform the sky into something that feels borrowed from mythology. Norway's Arctic north is one of the finest places on Earth to witness this spectacle.",
    heroImg: "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
    section1: {
      title: "Under the Arctic Sky",
      body: [
        "The Lofoten Islands sit well above the Arctic Circle, their dramatic peaks rising straight from the sea in a geological statement that never loses its power to astonish. In winter, these islands offer some of the best aurora viewing in the world—far from light pollution, with clear horizons and the full canopy of the northern sky visible overhead.",
        "By day, the islands offer their own remarkable beauty. Traditional fishing villages painted in red and yellow stand against snow-covered mountains and icy blue fjords. The contrast of colours in winter light is something painters have tried to capture for centuries.",
      ],
      img: "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
    },
    gallerySection: {
      title: "The Light that Changes Everything",
      body: "The Northern Lights do something unusual to the people who see them. Grown adults stand in silence, mouths open, necks craned upward. Whatever you thought you knew about colour and light is quietly revised.",
      images: [
        "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
        "https://www.figma.com/api/mcp/asset/935b70c3-9c58-45f8-bfe4-9bcdf083e82e",
        "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
      ] as [string, string, string],
    },
    section2: {
      title: "Under the Arctic Sky",
      body: [
        "Beyond the aurora, Tromsø—Norway's 'Arctic capital'—offers a rich cultural life: indigenous Sámi culture, world-class seafood, and the unique experience of the polar night, when the sun doesn't rise for weeks and the city operates in a beautiful perpetual twilight.",
        "Dog sledding, snowshoeing, and reindeer encounters round out the winter programme. But for most visitors, the defining memory is simpler: standing outside on a clear night, looking up, and watching the sky come alive.",
      ],
      img: "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
    },
    closingText:
      "The Northern Lights cannot be booked or scheduled, only sought. Norway gives you the best possible conditions for that search—and the results, when they come, are worth every cold, patient minute.",
    ctaTitle: "Chase the Aurora in Norway",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/32a88857-92ff-4015-83d1-157bf06bdcaa",
  },
  {
    slug: "iceland-fire-ice",
    img: "https://www.figma.com/api/mcp/asset/b3a83eb6-0a6a-4461-95a6-a25a3ccf664d",
    date: "7 April, 2026",
    destination: "ICELAND",
    title: "Iceland's Fire & Ice: Adventures at the Edge of the Earth",
    avatar: "https://www.figma.com/api/mcp/asset/9a8b9b5c-df74-4089-8144-44642c107441",
    author: "Ruben Kenter",
    role: "Wildlife Photographer",
    intro:
      "There are places on Earth where the geological drama is so intense it feels personal. Iceland is one of them. Volcanoes and glaciers share the same island in an uneasy, endlessly fascinating coexistence—and between them lies some of the most extraordinary terrain on the planet.",
    heroImg: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
    section1: {
      title: "Where Earth Breathes",
      body: [
        "Iceland sits on the Mid-Atlantic Ridge, where two tectonic plates are pulling apart at the rate of a few centimetres per year. The consequences of this geological restlessness are visible everywhere—in the hot springs that bubble up through lava fields, in the volcanoes that have shaped the island's history, and in the glaciers that creep slowly toward the sea.",
        "Vatnajökull, Europe's largest glacier, is a world unto itself—a vast plateau of ice covering active volcanoes, riddled with ice caves of astonishing blue clarity that glow from within when sunlight filters through the ancient frozen ceiling.",
      ],
      img: "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
    },
    gallerySection: {
      title: "Adventures at the Extremes",
      body: "Iceland rewards those who go further. Whether that means venturing into the highlands in a modified 4x4, hiking across a glacier with crampons, or soaking in a natural hot spring at midnight—the country consistently exceeds expectations.",
      images: [
        "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
        "https://www.figma.com/api/mcp/asset/4dbeeef5-4051-4391-8738-597e8ebd6516",
        "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
      ] as [string, string, string],
    },
    section2: {
      title: "Where Earth Breathes",
      body: [
        "The south coast of Iceland is a study in contrasts. Black sand beaches where the Atlantic breaks in massive waves. Waterfalls that tumble from cliffs you can walk behind. Fields of lupins in summer purple. Abandoned farmhouses slowly being reclaimed by the landscape.",
        "Every kilometre of the Ring Road reveals something new—a reminder that Iceland, despite its relatively small size, contains multitudes.",
      ],
      img: "https://www.figma.com/api/mcp/asset/da508e02-94ba-4051-8aff-9cc4e95517b9",
    },
    closingText:
      "Iceland is not a comfortable destination—it is a challenging, exhilarating, humbling one. And those who come prepared for that challenge leave with something that lasts a lifetime.",
    ctaTitle: "Explore Iceland's Wild Edge",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/11a74b9a-69fa-406d-a3f9-e3f5ffab46bc",
  },
  {
    slug: "slovenia-wine-trails",
    img: "https://www.figma.com/api/mcp/asset/6d2b4c1c-97ca-4698-b011-0a43e9ec543f",
    date: "7 April, 2026",
    destination: "SLOVENIA",
    title: "Slovenia's Wine Trails: A Journey Through Taste and Terroir",
    avatar: "https://www.figma.com/api/mcp/asset/84016b8c-27e1-4741-894b-06f2d657bfe1",
    author: "Jakob Ekstrom Bothman",
    role: "Wildlife Photographer",
    intro:
      "Slovenia is one of Europe's best-kept wine secrets. Its three distinct wine regions—the Vipava Valley, Goriška Brda, and the Karst—produce wines of exceptional character that rarely travel far beyond the country's borders. Which means the only way to truly experience them is to go.",
    heroImg: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
    section1: {
      title: "The Taste of Slovenia",
      body: [
        "Goriška Brda, known as the Slovenian Tuscany, is a region of rolling hills, medieval hilltop villages, and terraced vineyards that produce some of Central Europe's finest white wines. The Brda Rebula—a native grape variety with ancient roots—is a revelation: golden, textured, and deeply expressive of its limestone and sandstone terroir.",
        "In the Vipava Valley, a strong Bora wind shapes the wines as much as the soil. The valley's ancient orange wines—made by leaving white grape skins in contact with the juice—are among the most distinctive in the world, with a depth and complexity that demands unhurried attention.",
      ],
      img: "https://www.figma.com/api/mcp/asset/765d602d-9556-463b-90a0-cae3961a9c25",
    },
    gallerySection: {
      title: "Why Slovenia's Wines Captivate",
      body: "Slovenian wine culture is intimate and authentic. Winemakers still welcome visitors at family cellars, pour generously, and tell stories about vintages the way others talk about family members. It is wine with a human face.",
      images: [
        "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
        "https://www.figma.com/api/mcp/asset/765d602d-9556-463b-90a0-cae3961a9c25",
        "https://www.figma.com/api/mcp/asset/762b430a-40d1-486b-b4a2-4b14e436a5ce",
      ] as [string, string, string],
    },
    section2: {
      title: "The Taste of Slovenia",
      body: [
        "Pairing the wines with food is unavoidable and delightful. Slovenia's cuisine draws on Italian, Austrian, and Balkan influences while maintaining its own distinctive identity. The combination of local prosciutto, aged cheeses, truffle dishes, and handmade pasta with a well-chosen Slovenian wine is one of the simple pleasures of Central European travel.",
        "Many producers also offer accommodation and dining, allowing guests to wake among the vines, spend the day tasting and exploring, and fall asleep to the sounds of the countryside. It is a pace of travel that is increasingly rare and deeply restorative.",
      ],
      img: "https://www.figma.com/api/mcp/asset/b29d9302-9f59-4cc1-b07f-d12cbb607352",
    },
    closingText:
      "Slovenia's wine trails offer something increasingly rare: genuine discovery. These are wines and places that haven't been packaged for mass consumption. They reward the curious traveller with experiences that feel entirely, wonderfully personal.",
    ctaTitle: "Explore Slovenia's Wine Country",
    ctaBody: "Tell us how you envision your journey, and we'll shape it into something truly exceptional.",
    ctaImg: "https://www.figma.com/api/mcp/asset/8b36ea26-7f69-48f1-851d-bb92d38ba156",
  },
];

export const recommendedExperiences = [
  {
    img: "https://www.figma.com/api/mcp/asset/b29d9302-9f59-4cc1-b07f-d12cbb607352",
    country: "SLOVENIA",
    title: "Hot air balloon ride watching the magical sunrise over an Alpine Lake",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/75175e74-969e-4251-8187-e9c353b65a12",
    country: "NORWAY",
    title: "Customized lake side picnic",
  },
  {
    img: "https://www.figma.com/api/mcp/asset/765d602d-9556-463b-90a0-cae3961a9c25",
    country: "SLOVENIA",
    title: "Private visit to a bee farm",
  },
];

export const shell = "mx-auto w-full max-w-[1520px] px-5 sm:px-8 lg:px-12 xl:px-[130px]";
export const section = "py-20 lg:py-28 xl:py-[150px]";
