export const ADDRESS = {
  line1: "H.No. 6-5/1, Plot No. 98, Venkateswara Enclave,",
  line2: "Suchitra X Roads, Jeedimetla (V),",
  line3: "Medchal–Malkajgiri District, Telangana — 500067",
  short: "Suchitra X Roads, Hyderabad",
  hours: "Open Daily · 10:00 AM – 9:00 PM",
  phone: "+91 7893754324",
  // TODO: replace with the client's real number (digits only, with country code)
  phoneDigits: "91 7893754324",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Metro Spa, Suchitra X Roads, Jeedimetla, Hyderabad, Telangana 500067"),
};

// TODO: replace each url with the client's real profile / chat link
export const SOCIALS = [
  { id: "instagram", label: "Instagram", url: "https://instagram.com/metrospa9?cplk=NHVyenphYmZheGc2" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/metrospa.suchitra.7" },
  { id: "whatsapp", label: "WhatsApp", url: "https://wa.me/917893754324" },
] as const;

export type Service = {
  id: string;
  index: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  benefits: string[];
  price45: string;
  price60?: string;
  durationNote: string;
  image: string;
  accent: string;
};

export const SERVICES: Service[] = [
  {
    id: "dry",
    index: "01",
    name: "Dry Massage",
    tag: "No-Oil Ritual",
    tagline: "Stretch. Press. Release.",
    description:
      "A powerful oil-free full-body ritual. Deep stretching and precise pressure-point work melt stiffness and awaken your body's natural energy lines.",
    benefits: [
      "Reduces stress levels deeply",
      "Refreshes body & mind",
      "Improves blood circulation",
    ],
    price45: "₹1,800",
    price60: "₹2,500",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/6187252/pexels-photo-6187252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#c6a15b",
  },
  {
    id: "aroma",
    index: "02",
    name: "Aroma Therapeutic",
    tag: "Oil Therapy",
    tagline: "Essential oils, elevated senses.",
    description:
      "Warm massage oil infused with pure essential oils. A sensory journey that eases anxiety, melts headaches, induces deep sleep and restores cognitive calm.",
    benefits: [
      "Eases anxiety & depression",
      "Boosts energy & immunity",
      "Induces deep restful sleep",
    ],
    price45: "₹1,500",
    price60: "₹2,500",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/6629614/pexels-photo-6629614.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#9db5a3",
  },
  {
    id: "balinese",
    index: "03",
    name: "Balinese Massage",
    tag: "Island Ritual",
    tagline: "Fluid strokes, fragrant calm.",
    description:
      "Performed on a plush couch or floor mattress with scented oils. Long, flowing strokes become frictionless and meditative — pure island tranquility.",
    benefits: [
      "Soothes mind with aromatherapy",
      "Fluid, frictionless strokes",
      "Deep comfort & relaxation",
    ],
    price45: "₹1,500",
    price60: "₹2,000",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/6629610/pexels-photo-6629610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#b98a5e",
  },
  {
    id: "hotstone",
    index: "04",
    name: "Hot Stone Therapy",
    tag: "Warm Stone",
    tagline: "Heat that hugs the muscle.",
    description:
      "Heated basalt stones placed on key energy points, then glided with gentle pressure. Warmth loosens tight muscles and balances energy — ideal for lighter-touch lovers.",
    benefits: [
      "Loosens tight muscles",
      "Balances body energy",
      "Comforting warm relief",
    ],
    price45: "₹1,800",
    price60: "₹2,500",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/6629530/pexels-photo-6629530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    accent: "#c6a15b",
  },
  {
    id: "swedish",
    index: "05",
    name: "Swedish Massage",
    tag: "Classic Renewal",
    tagline: "The timeless full-body reset.",
    description:
      "The classic full-body massage for total relaxation. Rhythmic strokes improve joint flexibility, flush toxins and boost circulation from head to toe.",
    benefits: [
      "Full-body relaxation",
      "Improves joint flexibility",
      "Flushes toxins, boosts flow",
    ],
    price45: "₹1,500",
    price60: "₹2,500",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/7233271/pexels-photo-7233271.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#9db5a3",
  },
  {
    id: "deep",
    index: "06",
    name: "Deep Tissue",
    tag: "Therapeutic Depth",
    tagline: "Beyond the surface.",
    description:
      "Slow, focused pressure reaches deeper muscle layers and connective tissue. Built for chronic tension, stiffness and bodies that carry stress.",
    benefits: [
      "Targets deep muscle layers",
      "Relieves chronic tension",
      "Restores mobility & ease",
    ],
    price45: "₹2,000",
    price60: "₹2,500",
    durationNote: "45 / 60 mins",
    image:
      "https://images.pexels.com/photos/6629605/pexels-photo-6629605.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    accent: "#b98a5e",
  },
];

export const SCRUBS = [
  {
    id: "choco",
    name: "Whitening Exotic Chocolate & Cherry Scrub",
    short: "Chocolate & Cherry",
    description:
      "A decadent ritual — skin is polished with chocolate & cherry massage cream and essential aroma oils. Baby-soft, awake and glossy, while dark or discoloured areas are nourished and brightened.",
    price: "₹1,500",
    duration: "30 Mins",
    image:
      "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    ingredients: ["Cocoa Butter", "Cherry Extract", "Aroma Oils"],
  },
  {
    id: "papaya",
    name: "Papaya Massage-Cream Scrub",
    short: "Papaya Glow",
    description:
      "A superfruit polish formulated with papaya massage cream to nourish and naturally exfoliate. Enriched with Vitamin C to promote renewal and reveal rich, glowing new skin.",
    price: "₹1,500",
    duration: "30 Mins",
    image:
      "https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    ingredients: ["Papaya Enzymes", "Vitamin C", "Silk Cream"],
  },
];

export const MEMBERSHIPS = [
  {
    name: "Silver",
    voucher: "Silver Voucher",
    sessions: "6 Sessions",
    validity: "2 Months Validity",
    price: "₹10,000",
    per: "₹1,667 / session",
    tier: 1,
    featured: false,
    gradient: "from-slate-200 via-white to-slate-300",
  },
  {
    name: "Gold",
    voucher: "Gold Voucher",
    sessions: "10 Sessions",
    validity: "3 Months Validity",
    price: "₹15,000",
    per: "₹1,500 / session",
    tier: 2,
    featured: false,
    gradient: "from-amber-200 via-yellow-100 to-amber-300",
  },
  {
    name: "Platinum",
    voucher: "Platinum Voucher",
    sessions: "14 Sessions",
    validity: "4 Months Validity",
    price: "₹20,000",
    per: "₹1,428 / session",
    tier: 3,
    featured: true,
    gradient: "from-stone-200 via-amber-100 to-stone-300",
  },
  {
    name: "Titanium",
    voucher: "Titanium Voucher",
    sessions: "20 Sessions",
    validity: "6 Months Validity",
    price: "₹25,000",
    per: "₹1,250 / session",
    tier: 4,
    featured: false,
    gradient: "from-zinc-300 via-slate-100 to-zinc-400",
  },
  {
    name: "Diamond",
    voucher: "Diamond Voucher",
    sessions: "30 Sessions",
    validity: "12 Months Validity",
    price: "₹35,000",
    per: "₹1,166 / session",
    tier: 5,
    featured: false,
    gradient: "from-cyan-100 via-white to-sky-200",
  },
];

export const MEMBERSHIP_FEATURES = [
  "Each session includes 60-min therapy with Steam & Shower",
  "Appointments as per availability — book in advance",
  "Shareable: use it yourself or with friends",
  "Once expired, membership cannot be renewed or refunded",
  "Cancellation carries no monetary refund",
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    area: "Suchitra",
    text: "The most calming hour of my week. The aroma therapy here genuinely melts stress away — the ambience, the oils, everything feels premium.",
    rating: 5,
    service: "Aroma Therapeutic",
  },
  {
    name: "Rahul Verma",
    area: "Alwal",
    text: "Deep tissue done right. My shoulder stiffness from desk work is gone after two sessions. Professional, hygienic and truly therapeutic.",
    rating: 5,
    service: "Deep Tissue",
  },
  {
    name: "Sneha Reddy",
    area: "Kompally",
    text: "Hot stone therapy was pure bliss — warm, slow, deeply relaxing. The steam & shower after felt like a five-star ritual. Highly recommended.",
    rating: 5,
    service: "Hot Stone Therapy",
  },
  {
    name: "Arjun Mehta",
    area: "Jeedimetla",
    text: "Took the Gold membership for my parents and me. Flexible, shareable and great value. The Balinese massage is my personal favourite.",
    rating: 5,
    service: "Gold Membership",
  },
];

export const GALLERY = [
  {
    src: "https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Candle Ritual",
  },
  {
    src: "https://images.pexels.com/photos/9146378/pexels-photo-9146378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    label: "Therapy Suite",
  },
  {
    src: "https://images.pexels.com/photos/19572633/pexels-photo-19572633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Essential Oils",
  },
  {
    src: "https://images.pexels.com/photos/6187648/pexels-photo-6187648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Basalt Stones",
  },
  {
    src: "https://images.pexels.com/photos/4177714/pexels-photo-4177714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Linen & Care",
  },
  {
    src: "https://images.pexels.com/photos/6724507/pexels-photo-6724507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    label: "Floral Calm",
  },
];

export const HERO_VIDEO =
  "https://videos.pexels.com/video-files/6187885/6187885-uhd_3840_2160_25fps.mp4";