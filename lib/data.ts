/**
 * Single source of truth for Yeto Holidays content.
 *
 * Shapes (Destination, Package, Departure, Review) are kept close to what a
 * database table would hold, so Supabase can replace these arrays later
 * without touching components.
 *
 * Prices on the original six destinations carry `priceStatus: "placeholder"`:
 * they are indicative starting fares carried over from the approved demo and
 * must be replaced with confirmed, contracted rates before taking bookings.
 */

export type PriceStatus = "placeholder" | "confirmed";

export type ItineraryDay = { day: string; title: string; detail: string };

/** A sellable trip inside a destination, e.g. "Bali" inside Indonesia. */
export type Package = {
  slug: string;
  name: string;
  nights: number;
  days: number;
  /** Indicative starting price per person, in INR. */
  fromPrice: number;
  priceStatus: PriceStatus;
  /**
   * Share of the price paid online at booking. Terms: 25% to 50% advance, balance
   * 15 to 30 days before departure; 100% when booked within 15 days of travel.
   */
  depositPercent: number;
  itinerary: ItineraryDay[];
  inclusions: string[];
};

export type Destination = {
  slug: string;
  name: string;
  flag: string;
  country: string;
  region: "international" | "domestic";
  tagline: string;
  highlights: string[];
  images: string[];
  bestTime: string;
  blurb: string;
  featured: boolean;
  /** Empty means itinerary and price are shared on enquiry. */
  packages: Package[];
};

/** A fixed group departure, shown in the home page tours rail. */
export type Departure = {
  slug: string;
  packageSlug: string;
  name: string;
  flag: string;
  badge?: string;
  window: string;
  duration: string;
  fromPrice: number;
  priceStatus: PriceStatus;
  includes: string[];
  images: string[];
};

export type Review = {
  quote: string;
  name: string;
  trip: string;
};

// TODO-CONFIRM: terms give a 25% to 50% range; confirm the per-package figure.
const DEFAULT_DEPOSIT_PERCENT = 25;

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const HERO_IMAGES = [
  U("1507525428034-b723cf961d3e", 2000),
  U("1519046904884-53103b34b206", 2000),
  U("1476514525535-07fb3b4ae5f1", 2000),
];

export const EXPERIENCE_IMAGES = {
  travellers: [
    U("1488646953014-85cb44e25828"),
    U("1530789253388-582c481c54b0"),
    U("1469854523086-cc02fe5d8800"),
  ],
  group: [
    U("1539635278303-d4002c07eae3"),
    U("1522202176988-66273c2fd55f"),
    U("1517457373958-b7bdd4587205"),
  ],
  honeymoon: [
    U("1520250497591-112f2f40a3f4"),
    U("1583939003579-730e3918a45a"),
    U("1519741497674-611481863552"),
  ],
  corporate: [
    U("1517245386807-bb43f82c33c4"),
    U("1524178232363-1fb2b075b655"),
    U("1552664730-d307ca884978"),
  ],
  signboard: [
    U("1501785888041-af3ef285b470"),
    U("1464822759023-fed622ff2c3b"),
    U("1441974231531-c6227db76b6e"),
  ],
};

/** Destinations are listed in the order they appear on /destinations. */
export const destinations: Destination[] = [
  {
    slug: "dubai",
    name: "Dubai",
    flag: "🇦🇪",
    country: "United Arab Emirates",
    region: "international",
    tagline: "Luxury • Shopping • Adventure",
    highlights: ["Burj Khalifa","Desert Safari","Dubai Marina","Palm Jumeirah"],
    images: [U("1512453979798-5ea266f8880c"), U("1518684079-3c830dcef090"), U("1546412414-e1885259563a")],
    bestTime: "October – March",
    blurb: "Skyline dinners, desert dunes and gold-souk mornings. Dubai is the easiest first international trip for a family — and still the most fun one for a group.",
    featured: true,
    packages: [
      {
        slug: "dubai",
        name: "Dubai",
        nights: 5,
        days: 6,
        fromPrice: 64900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrival & Dubai Marina",
            "detail": "Airport pickup, hotel check-in and an evening at Marina Walk with a dhow cruise dinner."
          },
          {
            "day": "Day 2",
            "title": "City tour & Burj Khalifa",
            "detail": "Half-day city tour covering Jumeirah Mosque and the Dubai Frame, then At The Top (Levels 124 & 125) and the Dubai Fountain show."
          },
          {
            "day": "Day 3",
            "title": "Desert safari",
            "detail": "Dune bashing, camel rides and a BBQ dinner with live entertainment at a desert camp."
          },
          {
            "day": "Day 4",
            "title": "Abu Dhabi day trip",
            "detail": "Sheikh Zayed Grand Mosque, Ferrari World (optional) and the Corniche."
          },
          {
            "day": "Day 5",
            "title": "Free day & shopping",
            "detail": "Dubai Mall, Global Village or a Palm Jumeirah beach day — your call."
          },
          {
            "day": "Day 6",
            "title": "Departure",
            "detail": "Breakfast, check-out and airport transfer for your return flight."
          }
        ],
        inclusions: [
          "Return economy flights",
          "4★ hotel stay with daily breakfast",
          "All airport and intercity transfers",
          "Guided city tour and desert safari",
          "Burj Khalifa entry tickets",
          "Visa assistance",
          "Yeto tour manager on group departures"
        ],
      },
    ],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    country: "Vietnam",
    region: "international",
    tagline: "Hanoi • Da Nang • Phu Quoc",
    highlights: ["Ha Long Bay","Ba Na Hills","Hoi An Old Town","Phu Quoc beaches"],
    images: [U("1528127269322-539801943592"), U("1509923936072-1806e0cc3a7c"), U("1583417319070-4a69db38a482")],
    bestTime: "November – April",
    blurb: "Limestone islands, lantern-lit streets and some of the best food in Asia. Vietnam gives you three very different holidays in one trip.",
    featured: true,
    packages: [
      {
        slug: "vietnam",
        name: "Vietnam",
        nights: 6,
        days: 7,
        fromPrice: 58900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrive Hanoi",
            "detail": "Transfer to your hotel, evening walk around Hoan Kiem Lake and the Old Quarter."
          },
          {
            "day": "Day 2",
            "title": "Ha Long Bay cruise",
            "detail": "Full-day cruise through the karst islands with lunch on board, kayaking and a cave visit."
          },
          {
            "day": "Day 3",
            "title": "Fly to Da Nang",
            "detail": "Morning flight, afternoon at My Khe Beach and the Marble Mountains."
          },
          {
            "day": "Day 4",
            "title": "Ba Na Hills & Golden Bridge",
            "detail": "Cable car up to Ba Na Hills, the Golden Bridge, French Village and Fantasy Park."
          },
          {
            "day": "Day 5",
            "title": "Hoi An",
            "detail": "Ancient town walking tour, tailor shops and the lantern-lit riverfront by night."
          },
          {
            "day": "Day 6",
            "title": "Free day",
            "detail": "Beach day, a Vietnamese cooking class, or a Cham Islands add-on."
          },
          {
            "day": "Day 7",
            "title": "Departure",
            "detail": "Transfer to Da Nang airport for your flight home."
          }
        ],
        inclusions: [
          "Return economy flights",
          "Internal Hanoi–Da Nang flight",
          "4★ hotels with daily breakfast",
          "Ha Long Bay day cruise with lunch",
          "Ba Na Hills cable car tickets",
          "All transfers and sightseeing",
          "Visa assistance",
          "Yeto tour manager on group departures"
        ],
      },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    country: "Thailand",
    region: "international",
    tagline: "Bangkok • Phuket • Krabi",
    highlights: ["Phi Phi Islands","Grand Palace","James Bond Island","Railay Beach"],
    images: [U("1528181304800-259b08848526"), U("1552465011-b4e21bf6e79a"), U("1537956965359-7573183d1f57")],
    bestTime: "November – March",
    blurb: "Longtail boats, limestone cliffs and night markets. The classic island-and-city combination that never stops working.",
    featured: true,
    packages: [
      {
        slug: "thailand",
        name: "Thailand",
        nights: 5,
        days: 6,
        fromPrice: 52900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrive Phuket",
            "detail": "Airport transfer, check-in and a sunset at Patong Beach."
          },
          {
            "day": "Day 2",
            "title": "Phi Phi Islands",
            "detail": "Speedboat day trip to Maya Bay, Pileh Lagoon and Bamboo Island with lunch and snorkelling."
          },
          {
            "day": "Day 3",
            "title": "Phang Nga Bay",
            "detail": "James Bond Island, sea-canoeing through the caves and a local seafood lunch."
          },
          {
            "day": "Day 4",
            "title": "Fly to Bangkok",
            "detail": "Morning flight, afternoon at Asiatique and the riverside night market."
          },
          {
            "day": "Day 5",
            "title": "Bangkok city tour",
            "detail": "Grand Palace, Wat Pho and Wat Arun, then shopping around Siam."
          },
          {
            "day": "Day 6",
            "title": "Departure",
            "detail": "Breakfast and transfer to Suvarnabhumi for your return flight."
          }
        ],
        inclusions: [
          "Return economy flights",
          "Internal Phuket–Bangkok flight",
          "4★ hotels with daily breakfast",
          "Phi Phi and Phang Nga island tours",
          "Bangkok city tour with entry tickets",
          "All airport and hotel transfers",
          "Visa assistance"
        ],
      },
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    country: "Singapore",
    region: "international",
    tagline: "Family • Luxury • Attractions",
    highlights: ["Gardens by the Bay","Universal Studios","Sentosa","Marina Bay Sands"],
    images: [U("1525625293386-3f8f99389edd"), U("1565967511849-76a60a516170"), U("1496939376851-89342e90adcd")],
    bestTime: "Year round",
    blurb: "Spotless, walkable and packed with things to do. The most stress-free international holiday you can book for a family with kids.",
    featured: true,
    packages: [
      {
        slug: "singapore",
        name: "Singapore",
        nights: 4,
        days: 5,
        fromPrice: 71900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrival & Marina Bay",
            "detail": "Transfer to your hotel and an evening at Marina Bay with the Spectra light show."
          },
          {
            "day": "Day 2",
            "title": "Sentosa & Universal Studios",
            "detail": "Full day at Universal Studios Singapore, cable car and Wings of Time in the evening."
          },
          {
            "day": "Day 3",
            "title": "Gardens by the Bay & city tour",
            "detail": "Flower Dome, Cloud Forest and the Supertree Grove, plus Merlion Park and Chinatown."
          },
          {
            "day": "Day 4",
            "title": "Free day",
            "detail": "Orchard Road shopping, Singapore Zoo, or a Jurong Bird Park add-on."
          },
          {
            "day": "Day 5",
            "title": "Departure",
            "detail": "Check-out and transfer to Changi Airport."
          }
        ],
        inclusions: [
          "Return economy flights",
          "4★ centrally located hotel with breakfast",
          "Universal Studios entry tickets",
          "Gardens by the Bay conservatory tickets",
          "Half-day city tour",
          "All airport transfers",
          "Visa assistance"
        ],
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    flag: "🇪🇺",
    country: "Italy • France • Switzerland",
    region: "international",
    tagline: "Italy • France • Switzerland",
    highlights: ["Eiffel Tower","Jungfraujoch","Venice canals","Swiss Alps"],
    images: [U("1499856871958-5b9627545d1a"), U("1502602898657-3e91760cbb34"), U("1467269204594-9661b134dd2b")],
    bestTime: "April – September",
    blurb: "Three countries, one unforgettable route. Alpine trains, Parisian evenings and Italian mornings — paced so you actually enjoy it.",
    featured: true,
    packages: [
      {
        slug: "europe",
        name: "Europe",
        nights: 9,
        days: 10,
        fromPrice: 189900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrive Rome",
            "detail": "Transfer to your hotel and an evening walk to the Trevi Fountain."
          },
          {
            "day": "Day 2",
            "title": "Rome & Vatican City",
            "detail": "Colosseum, Roman Forum, St. Peter's Basilica and the Vatican Museums."
          },
          {
            "day": "Day 3",
            "title": "Florence & Pisa",
            "detail": "Travel north with a stop at the Leaning Tower and an evening in Florence."
          },
          {
            "day": "Day 4",
            "title": "Venice",
            "detail": "St. Mark's Square, a gondola ride and the glass-blowing workshops of Murano."
          },
          {
            "day": "Day 5",
            "title": "Into Switzerland",
            "detail": "Scenic drive to Lucerne, Chapel Bridge and Lake Lucerne."
          },
          {
            "day": "Day 6",
            "title": "Jungfraujoch",
            "detail": "Cogwheel train to the Top of Europe, Ice Palace and Sphinx observatory."
          },
          {
            "day": "Day 7",
            "title": "Mount Titlis & on to France",
            "detail": "Rotair cable car and Cliff Walk, then evening travel towards Paris."
          },
          {
            "day": "Day 8",
            "title": "Paris city tour",
            "detail": "Eiffel Tower, Seine river cruise, Louvre exterior and Champs-Élysées."
          },
          {
            "day": "Day 9",
            "title": "Disneyland Paris or free day",
            "detail": "A full day at Disneyland, or Versailles and Montmartre at your own pace."
          },
          {
            "day": "Day 10",
            "title": "Departure",
            "detail": "Transfer to Charles de Gaulle for your return flight."
          }
        ],
        inclusions: [
          "Return economy flights",
          "3★/4★ hotels with daily breakfast",
          "Indian dinners through the tour",
          "All intercity coach travel",
          "Jungfraujoch and Mount Titlis excursions",
          "Seine river cruise",
          "Schengen visa assistance",
          "Yeto tour manager throughout"
        ],
      },
    ],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    country: "Malaysia",
    region: "international",
    tagline: "Kuala Lumpur • Langkawi",
    highlights: ["Petronas Towers","Batu Caves","Langkawi Sky Bridge","Genting Highlands"],
    images: [U("1596422846543-75c6fc197f07"), U("1508062878650-88b52897f298"), U("1519181245277-cffeb31da2e3")],
    bestTime: "December – April",
    blurb: "City skylines and island cable cars at a price that leaves room for the shopping. Malaysia pairs beautifully with Singapore.",
    featured: true,
    packages: [
      {
        slug: "malaysia",
        name: "Malaysia",
        nights: 5,
        days: 6,
        fromPrice: 49900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrive Kuala Lumpur",
            "detail": "Transfer and an evening at the Petronas Twin Towers and KLCC Park."
          },
          {
            "day": "Day 2",
            "title": "KL city tour",
            "detail": "Batu Caves, the National Mosque, Merdeka Square and KL Tower."
          },
          {
            "day": "Day 3",
            "title": "Genting Highlands",
            "detail": "Awana SkyWay cable car, Chin Swee Temple and the hilltop theme park."
          },
          {
            "day": "Day 4",
            "title": "Fly to Langkawi",
            "detail": "Island transfer, Cenang Beach and a sunset cruise."
          },
          {
            "day": "Day 5",
            "title": "Langkawi island tour",
            "detail": "SkyCab cable car, Sky Bridge and an island-hopping boat trip."
          },
          {
            "day": "Day 6",
            "title": "Departure",
            "detail": "Breakfast and transfer to the airport."
          }
        ],
        inclusions: [
          "Return economy flights",
          "Internal KL–Langkawi flight",
          "4★ hotels with daily breakfast",
          "Genting and Langkawi cable car tickets",
          "Island-hopping tour",
          "All transfers and sightseeing",
          "Visa assistance"
        ],
      },
    ],
  },
  {
    slug: "indonesia",
    name: "Indonesia",
    flag: "🇮🇩",
    country: "Indonesia",
    region: "international",
    tagline: "Bali • Temples • Rice terraces",
    highlights: ["Uluwatu Temple","Tegallalang","Nusa Penida","Ubud"],
    images: [U("1537996194471-e657df975ab4"), U("1518548419970-58e3b4079ab2"), U("1555400038-63f5ba517a47")],
    bestTime: "April – October",
    blurb: "Cliff-edge temples, emerald rice terraces and villa mornings. A good fit for honeymoons and friends' trips alike.",
    featured: false,
    packages: [
      {
        slug: "bali",
        name: "Bali",
        nights: 5,
        days: 6,
        fromPrice: 54900,
        priceStatus: "placeholder",
        depositPercent: DEFAULT_DEPOSIT_PERCENT,
        itinerary: [
          {
            "day": "Day 1",
            "title": "Arrive Bali",
            "detail": "Transfer to Kuta or Seminyak, evening at the beach."
          },
          {
            "day": "Day 2",
            "title": "Nusa Penida",
            "detail": "Fast boat across for Kelingking Beach, Angel's Billabong and Broken Beach."
          },
          {
            "day": "Day 3",
            "title": "Ubud & rice terraces",
            "detail": "Tegallalang rice terraces, the Sacred Monkey Forest, Tirta Empul and a swing stop."
          },
          {
            "day": "Day 4",
            "title": "Uluwatu & Kecak dance",
            "detail": "Cliffside temple, the sunset Kecak fire dance and a Jimbaran Bay seafood dinner."
          },
          {
            "day": "Day 5",
            "title": "Water sports & free time",
            "detail": "Tanjung Benoa water sports, spa afternoon or a Mount Batur sunrise add-on."
          },
          {
            "day": "Day 6",
            "title": "Departure",
            "detail": "Check-out and transfer to Ngurah Rai airport."
          }
        ],
        inclusions: [
          "Return economy flights",
          "4★ resort with daily breakfast",
          "Nusa Penida day trip with lunch",
          "Ubud and Uluwatu guided tours",
          "Kecak dance tickets",
          "All transfers in private vehicles",
          "Visa on arrival assistance"
        ],
      },
    ],
  },
  // Destinations below have no package content yet: blurbs and highlights
  // name well-known places only. Itinerary and price are shared on enquiry.
  // TODO-CONFIRM: packages, prices and photos for these four with the client.
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    country: "India",
    region: "domestic",
    tagline: "Heritage • Hill stations • Coast",
    highlights: ["Taj Mahal", "Jaipur", "Kerala backwaters", "Goa beaches"],
    images: [
      U("1524492412937-b28074a5d7da"),
      U("1477587458883-47145ed94245"),
      U("1599661046289-e31897846e41"),
    ],
    bestTime: "October – March",
    blurb:
      "Forts and palaces in Rajasthan, backwaters in Kerala, beaches in Goa and mountains in the north. Tell us what you want and we will plan the route.",
    featured: false,
    packages: [],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    flag: "🇱🇰",
    country: "Sri Lanka",
    region: "international",
    tagline: "Beaches • Tea country • Heritage",
    highlights: ["Sigiriya", "Kandy", "Ella", "Galle Fort"],
    images: [U("1566296314736-6eaac1ca0cb9")],
    bestTime: "December – March",
    blurb:
      "A compact island with ancient rock fortresses, hill-country train rides and long beaches. Easy to combine into one trip.",
    featured: false,
    packages: [],
  },
  {
    slug: "nepal",
    name: "Nepal",
    flag: "🇳🇵",
    country: "Nepal",
    region: "international",
    tagline: "Himalaya • Temples • Lakes",
    highlights: ["Kathmandu", "Pokhara", "Boudhanath Stupa", "Chitwan"],
    images: [U("1605640840605-14ac1855827b"), U("1544735716-392fe2489ffa")],
    bestTime: "March – May, October – November",
    blurb:
      "Old temple squares in Kathmandu, a lakeside town in Pokhara and the Himalaya on the horizon. A short flight from India.",
    featured: false,
    packages: [],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    flag: "🇧🇹",
    country: "Bhutan",
    region: "international",
    tagline: "Monasteries • Valleys • Mountains",
    highlights: ["Paro Taktsang", "Thimphu", "Punakha Dzong", "Phobjikha Valley"],
    // TODO-CONFIRM: stand-in Himalayan photo, replace with a Bhutan photo.
    images: [U("1506905925346-21bda4d32df4")],
    bestTime: "March – May, September – November",
    blurb:
      "Mountain monasteries, fortress-monasteries called dzongs and quiet valleys. A small country that rewards a slower pace.",
    featured: false,
    packages: [],
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

/** Home page features these six, in this order. */
const FEATURED_ORDER = ["dubai", "vietnam", "thailand", "singapore", "europe", "malaysia"];
export const featuredDestinations = FEATURED_ORDER.map(
  (slug) => destinations.find((d) => d.slug === slug)!,
);

/** The package whose price and length headline a destination, if any. */
export const leadPackage = (d: Destination): Package | undefined => d.packages[0];

const dest = (slug: string) => getDestination(slug)!;

export const departures: Departure[] = [
  {
    slug: "vietnam",
    // TODO-CONFIRM: departure windows, badges and tour-manager promises on all
    // departures below are demo placeholders, not confirmed dates.
    packageSlug: "vietnam",
    name: "Vietnam — Holi 2027",
    flag: "🇻🇳",
    badge: "Flagship departure",
    window: "March 2027",
    duration: "6 Nights / 7 Days",
    fromPrice: 58900,
    priceStatus: "placeholder",
    includes: ["Flights", "4★ hotels", "Ha Long cruise", "Tour manager"],
    images: dest("vietnam").images,
  },
  {
    slug: "dubai",
    packageSlug: "dubai",
    name: "Dubai",
    flag: "🇦🇪",
    window: "Monthly departures",
    duration: "5 Nights / 6 Days",
    fromPrice: 64900,
    priceStatus: "placeholder",
    includes: ["Flights", "Desert safari", "Burj Khalifa", "Tour manager"],
    images: dest("dubai").images,
  },
  {
    slug: "thailand",
    packageSlug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    window: "Nov – Mar departures",
    duration: "5 Nights / 6 Days",
    fromPrice: 52900,
    priceStatus: "placeholder",
    includes: ["Flights", "Island tours", "Bangkok city tour", "Transfers"],
    images: dest("thailand").images,
  },
  {
    slug: "singapore",
    packageSlug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    badge: "Family favourite",
    window: "Year-round departures",
    duration: "4 Nights / 5 Days",
    fromPrice: 71900,
    priceStatus: "placeholder",
    includes: ["Flights", "Universal Studios", "Gardens by the Bay", "Transfers"],
    images: dest("singapore").images,
  },
  {
    slug: "europe",
    packageSlug: "europe",
    name: "Europe",
    flag: "🇪🇺",
    window: "Apr – Sep departures",
    duration: "9 Nights / 10 Days",
    fromPrice: 189900,
    priceStatus: "placeholder",
    includes: ["Flights", "3 countries", "Indian meals", "Tour manager"],
    images: dest("europe").images,
  },
  {
    slug: "indonesia",
    packageSlug: "bali",
    name: "Bali",
    flag: "🇮🇩",
    window: "Apr – Oct departures",
    duration: "5 Nights / 6 Days",
    fromPrice: 54900,
    priceStatus: "placeholder",
    includes: ["Flights", "Nusa Penida", "Ubud tour", "Private transfers"],
    images: dest("indonesia").images,
  },
];

export const whyYeto = [
  {
    icon: "globe",
    title: "Global Destinations",
    body: "From Dubai and Europe to Thailand, Vietnam and Bhutan, plus holidays within India. Routes planned and paced around how you want to travel.",
  },
  {
    icon: "handshake",
    title: "Trusted Partners",
    body: "Hotels, local operators and on-ground partners in the destinations we sell.",
  },
  {
    icon: "rupee",
    title: "Transparent Pricing",
    body: "Clear packages with inclusions and exclusions written out in full. No surprises after you have paid.",
  },
  {
    icon: "family",
    title: "Group Travel",
    body: "Departures designed for families, friend circles and organisations — with a tour manager who travels with you.",
  },
  {
    icon: "phone",
    title: "Personal Assistance",
    body: "A real travel team to talk to, from the first enquiry to the day you land back home.",
  },
];

/**
 * Real customer reviews only. Keep empty until the client supplies genuine
 * ones: the Reviews section does not render while this array is empty.
 */
export const reviews: Review[] = [];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
