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

/** ISO country code for the flag icon. Europe uses the EU flag. */
export type FlagCode = "AE" | "VN" | "TH" | "SG" | "EU" | "MY" | "ID" | "IN" | "LK" | "NP" | "BT";

/** Groups used by the destination filter chips. */
export type Area = "asia" | "gulf" | "europe" | "india";

export type Destination = {
  slug: string;
  name: string;
  flag: FlagCode;
  /** Airport code of the main arrival city. Left out for domestic India. */
  code?: string;
  country: string;
  region: "international" | "domestic";
  area: Area;
  /** Named places, shown on cards as a plain comma-separated line. */
  places: string;
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
  flag: FlagCode;
  /** Date or season line, for example "March 2027". */
  window: string;
  nights: number;
  days: number;
  /** Seats left. Leave unset until the client supplies real availability. */
  seatsLeft?: number;
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

/** Ha Long Bay, Vietnam: a real destination we sell, same photo as the Vietnam card. */
export const HERO_IMAGES = [U("1528127269322-539801943592", 2000)];

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
  /** Decorative background behind the logo. Not a photo of any Yeto sign. */
  landscape: [
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
    flag: "AE",
    code: "DXB",
    country: "United Arab Emirates",
    region: "international",
    area: "gulf",
    places: "Burj Khalifa, desert safari, Dubai Marina",
    highlights: ["Burj Khalifa","Desert Safari","Dubai Marina","Palm Jumeirah"],
    images: [U("1512453979798-5ea266f8880c"), U("1518684079-3c830dcef090"), U("1546412414-e1885259563a")],
    bestTime: "October to March",
    blurb: "Burj Khalifa, a desert safari, a dhow cruise dinner and a day trip to Abu Dhabi, in six days.",
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
            "title": "Arrival and Dubai Marina",
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
            "detail": "Dubai Mall, Global Village or a Palm Jumeirah beach day, your choice."
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
    flag: "VN",
    code: "HAN",
    country: "Vietnam",
    region: "international",
    area: "asia",
    places: "Hanoi, Ha Long Bay, Da Nang",
    highlights: ["Ha Long Bay","Ba Na Hills","Hoi An Old Town","Phu Quoc beaches"],
    images: [U("1528127269322-539801943592"), U("1509923936072-1806e0cc3a7c"), U("1583417319070-4a69db38a482")],
    bestTime: "November to April",
    blurb: "Hanoi, a Ha Long Bay cruise, Ba Na Hills and Hoi An in one trip, with the flight from Hanoi to Da Nang included.",
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
          "Flight from Hanoi to Da Nang",
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
    flag: "TH",
    code: "BKK",
    country: "Thailand",
    region: "international",
    area: "asia",
    places: "Phuket, Phang Nga Bay, Bangkok",
    highlights: ["Phi Phi Islands","Grand Palace","James Bond Island","Railay Beach"],
    images: [U("1528181304800-259b08848526"), U("1552465011-b4e21bf6e79a"), U("1537956965359-7573183d1f57")],
    bestTime: "November to March",
    blurb: "Phuket and Bangkok in one trip: Phi Phi Islands and Phang Nga Bay by boat, then the Grand Palace and a Bangkok city tour.",
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
          "Flight from Phuket to Bangkok",
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
    flag: "SG",
    code: "SIN",
    country: "Singapore",
    region: "international",
    area: "asia",
    places: "Sentosa, Gardens by the Bay, Marina Bay",
    highlights: ["Gardens by the Bay","Universal Studios","Sentosa","Marina Bay Sands"],
    images: [U("1525625293386-3f8f99389edd"), U("1565967511849-76a60a516170"), U("1496939376851-89342e90adcd")],
    bestTime: "Year round",
    blurb: "Universal Studios, Gardens by the Bay and Marina Bay in four nights. A good fit for a family with children.",
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
            "title": "Sentosa and Universal Studios",
            "detail": "Full day at Universal Studios Singapore, cable car and Wings of Time in the evening."
          },
          {
            "day": "Day 3",
            "title": "Gardens by the Bay and city tour",
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
    flag: "EU",
    code: "FCO / CDG",
    country: "Italy, France and Switzerland",
    region: "international",
    area: "europe",
    places: "Rome, Switzerland, Paris",
    highlights: ["Eiffel Tower","Jungfraujoch","Venice canals","Swiss Alps"],
    images: [U("1499856871958-5b9627545d1a"), U("1502602898657-3e91760cbb34"), U("1467269204594-9661b134dd2b")],
    bestTime: "April to September",
    blurb: "Rome, Venice, Lucerne, Jungfraujoch and Paris in ten days, by coach, with Indian dinners and a Yeto tour manager.",
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
            "detail": "Drive to Lucerne for Chapel Bridge and Lake Lucerne."
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
    flag: "MY",
    code: "KUL",
    country: "Malaysia",
    region: "international",
    area: "asia",
    places: "Kuala Lumpur, Genting, Langkawi",
    highlights: ["Petronas Towers","Batu Caves","Langkawi Sky Bridge","Genting Highlands"],
    images: [U("1596422846543-75c6fc197f07"), U("1508062878650-88b52897f298"), U("1519181245277-cffeb31da2e3")],
    bestTime: "December to April",
    blurb: "Kuala Lumpur, Genting Highlands and Langkawi, with the cable cars at Genting and Langkawi included.",
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
          "Flight from Kuala Lumpur to Langkawi",
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
    flag: "ID",
    code: "DPS",
    country: "Indonesia",
    region: "international",
    area: "asia",
    places: "Ubud, Nusa Penida, Uluwatu",
    highlights: ["Uluwatu Temple","Tegallalang","Nusa Penida","Ubud"],
    images: [U("1537996194471-e657df975ab4"), U("1518548419970-58e3b4079ab2"), U("1555400038-63f5ba517a47")],
    bestTime: "April to October",
    blurb: "Bali in six days: Nusa Penida, Ubud, Uluwatu and a Kecak dance evening. Suits honeymoons and trips with friends.",
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
    flag: "IN",
    country: "India",
    region: "domestic",
    area: "india",
    places: "Taj Mahal, Jaipur, Kerala backwaters, Goa",
    highlights: ["Taj Mahal", "Jaipur", "Kerala backwaters", "Goa beaches"],
    images: [
      U("1524492412937-b28074a5d7da"),
      U("1477587458883-47145ed94245"),
      U("1599661046289-e31897846e41"),
    ],
    bestTime: "October to March",
    blurb:
      "Forts and palaces in Rajasthan, backwaters in Kerala, beaches in Goa and mountains in the north. Tell us what you want and we will plan the route.",
    featured: false,
    packages: [],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    flag: "LK",
    code: "CMB",
    country: "Sri Lanka",
    region: "international",
    area: "india",
    places: "Sigiriya, Kandy, Ella, Galle Fort",
    highlights: ["Sigiriya", "Kandy", "Ella", "Galle Fort"],
    images: [U("1566296314736-6eaac1ca0cb9")],
    bestTime: "December to March",
    blurb: "Sigiriya rock fortress, Kandy, the hill-country train to Ella and Galle Fort. A small island, so it is easy to cover in one trip.",
    featured: false,
    packages: [],
  },
  {
    slug: "nepal",
    name: "Nepal",
    flag: "NP",
    code: "KTM",
    country: "Nepal",
    region: "international",
    area: "india",
    places: "Kathmandu, Pokhara, Chitwan",
    highlights: ["Kathmandu", "Pokhara", "Boudhanath Stupa", "Chitwan"],
    images: [U("1605640840605-14ac1855827b"), U("1544735716-392fe2489ffa")],
    bestTime: "March to May, October to November",
    blurb: "Kathmandu's old temple squares, the lakeside town of Pokhara and views of the Himalaya. A short flight from India.",
    featured: false,
    packages: [],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    flag: "BT",
    code: "PBH",
    country: "Bhutan",
    region: "international",
    area: "india",
    places: "Paro, Thimphu, Punakha",
    highlights: ["Paro Taktsang", "Thimphu", "Punakha Dzong", "Phobjikha Valley"],
    // TODO-CONFIRM: stand-in Himalayan photo, replace with a Bhutan photo.
    images: [U("1506905925346-21bda4d32df4")],
    bestTime: "March to May, September to November",
    blurb: "Paro Taktsang, Thimphu, Punakha Dzong and the Phobjikha Valley. A dzong is a fortress-monastery.",
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

/** "5 nights, 6 days": the one way trip length is written on the site. */
export const formatStay = (nights: number, days: number) =>
  `${nights} ${nights === 1 ? "night" : "nights"}, ${days} ${days === 1 ? "day" : "days"}`;

const departure = (
  slug: string,
  packageSlug: string,
  name: string,
  window: string,
  includes: string[],
): Departure => {
  const d = dest(slug);
  const pkg = d.packages.find((p) => p.slug === packageSlug)!;
  return {
    slug,
    packageSlug,
    name,
    flag: d.flag,
    window,
    nights: pkg.nights,
    days: pkg.days,
    fromPrice: pkg.fromPrice,
    priceStatus: pkg.priceStatus,
    includes,
    images: d.images,
  };
};

// TODO-CONFIRM: departure windows and the tour-manager promise on all
// departures below are placeholders from the demo, not confirmed dates.
export const departures: Departure[] = [
  departure("vietnam", "vietnam", "Vietnam for Holi 2027", "March 2027", [
    "Flights",
    "4★ hotels",
    "Ha Long cruise",
  ]),
  departure("dubai", "dubai", "Dubai", "Monthly departures", [
    "Flights",
    "Desert safari",
    "Burj Khalifa",
  ]),
  departure("thailand", "thailand", "Thailand", "November to March", [
    "Flights",
    "Island tours",
    "Bangkok city tour",
  ]),
  departure("singapore", "singapore", "Singapore", "All year", [
    "Flights",
    "Universal Studios",
    "Gardens by the Bay",
  ]),
  departure("europe", "europe", "Europe", "April to September", [
    "Flights",
    "3 countries",
    "Indian dinners",
  ]),
  departure("indonesia", "bali", "Indonesia (Bali)", "April to October", [
    "Flights",
    "Nusa Penida",
    "Ubud tour",
  ]),
];

/** Filter chips for the destination grid. Counts come from the data. */
export const AREAS: { value: Area; label: string }[] = [
  { value: "asia", label: "Asia" },
  { value: "gulf", label: "Gulf" },
  { value: "europe", label: "Europe" },
  { value: "india", label: "India and neighbours" },
];

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const inWords = (n: number) => NUMBER_WORDS[n] ?? String(n);

export const whyYeto = [
  {
    icon: "globe",
    title: `${inWords(destinations.length)[0].toUpperCase()}${inWords(destinations.length).slice(1)} destinations`,
    body: `India plus ${inWords(destinations.length - 1)} places across Asia, the Gulf and Europe.`,
  },
  {
    icon: "handshake",
    title: "Local partners",
    // TODO-CONFIRM: partner claim has not been confirmed by the client.
    body: "We work with hotels and local operators in the places we sell, so there is someone on the ground.",
  },
  {
    icon: "list",
    title: "Clear inclusions",
    body: "Every package lists what is included and what is not, before you pay anything.",
  },
  {
    icon: "phone",
    title: "Talk to a person",
    body: "Our team in Nagpur answers your questions before you book.",
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
