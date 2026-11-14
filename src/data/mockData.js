// The Stitch Room - Core Business Data & Initial Records

export const BRAND_INFO = {
  name: "The Stitch Room",
  tagline: "Excellence in Uniform & Textile Craftsmanship Since 1995",
  shortDesc: "South India's premier manufacturer and supplier of institutional uniforms, medical scrubs, corporate attire, and bespoke bulk garments.",
  foundedYear: 1995,
  phone1: "+91 78128 79053",
  phone2: "+91 93607 22463",
  email: "thestitchroom95@gmail.com",
  address: "No.21, 4a East Cross Road, Gandhinagar East, Katpadi, Vellore - 632006, Tamil Nadu, India",
  workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM (Sunday Closed)",
  whatsapp: "917812879053",
  stats: [
    { value: "28+", label: "Years of Craftsmanship", sub: "Established in 1995" },
    { value: "150+", label: "Institutions Served", sub: "Schools, Hospitals & Corporates" },
    { value: "500k+", label: "Garments Delivered", sub: "Zero quality recall" },
    { value: "99.4%", label: "On-Time Dispatch", sub: "Strict delivery schedules" }
  ]
};

export const UNIFORM_CATEGORIES = [
  {
    id: "school",
    title: "School Uniforms",
    tag: "Most Popular",
    image: "/assets/images/school-uniform.jpg",
    desc: "Engineered for active students. Breathable blends, reinforced knees and seams, stain-resistant finish, and color-lock dye technology.",
    specs: ["Polyester-Cotton 67/33 Blend", "Shrink-resistant <1.5%", "High-density Bar-tacked Pockets", "Custom Crest Embroidery"],
    popularFor: ["Kindergarten", "CBSE & ICSE Schools", "Matriculation Institutions", "House T-Shirts & Sportswear"]
  },
  {
    id: "hospital",
    title: "Hospital & Medical Scrubs",
    tag: "Certified Hygiene",
    image: "/assets/images/hospital-uniform.jpg",
    desc: "Anti-microbial, fluid-repellent fabrics tailored for doctors, surgeons, nurses, and hospital support staff.",
    specs: ["Anti-bacterial Silver-ion Infusion", "High Autoclave Tolerance", "4-Way Comfort Stretch Option", "Quick-Dry Breathable Weave"],
    popularFor: ["Surgeon Scrub Suits", "Nurse Tunics & Pants", "Patient Gowns", "Lab Coats & Overalls"]
  },
  {
    id: "corporate",
    title: "Corporate & Executive Attire",
    tag: "Premium Styling",
    image: "/assets/images/corporate-uniform.jpg",
    desc: "Sophisticated formal shirts, blazers, trousers, and polo tees that elevate institutional brand identity.",
    specs: ["100% Giza/Combed Cotton & Micro-Poly", "Wrinkle-free Crease Retention", "Precision Collar & Cuff Interlining", "Subtle Brand Badging"],
    popularFor: ["Front-desk & Hospitality", "Executive Shirts & Blazers", "Industrial Field Shirts", "Branded Event Polos"]
  },
  {
    id: "college",
    title: "College & Professional Wear",
    tag: "Durable & Sharp",
    image: "/assets/images/college-uniform.jpg",
    desc: "Durable institutional uniforms for engineering, medical, polytechnic, and arts colleges.",
    specs: ["Heavy GSM Drill & Twill Weave", "Double Needle Stitching", "Fade-Proof Reactive Dyeing", "Reinforced Stress Points"],
    popularFor: ["Engineering Workshop Coats", "College Formal Uniforms", "Sports Team Kits", "Graduation Robes"]
  }
];

export const COMPARISON_DATA = [
  {
    feature: "Fabric Durability & GSM",
    market: "140 - 160 GSM standard fabric that thins after 15 washes",
    stitchRoom: "190 - 220 GSM high-twist yarn fabric that retains crispness for 100+ washes",
    highlight: true
  },
  {
    feature: "Stitching & Seam Reinforcement",
    market: "Single chain stitch with synthetic thread prone to unraveling",
    stitchRoom: "Double-needle lockstitch with 100% spun polyester bonded thread + bar-tack anchors",
    highlight: true
  },
  {
    feature: "Color Fastness & Washing",
    market: "Direct dyeing that bleeds into whites and fades under sun exposure",
    stitchRoom: "Grade 4+ Reactive vat-dyed yarns with zero bleed guarantee",
    highlight: false
  },
  {
    feature: "Shrinkage Control",
    market: "Unsanforized fabric shrinking 5% to 8% after first hot wash",
    stitchRoom: "Sanforized and pre-shrunk fabric with less than 1.2% dimensional shift",
    highlight: true
  },
  {
    feature: "Pocket & Button Security",
    market: "2-hole plastic buttons hand-stitched without stem wrap",
    stitchRoom: "Impact-resistant cross-stitched 4-hole buttons with reinforced plackets",
    highlight: false
  },
  {
    feature: "School Crest & Embroidery",
    market: "Low stitch-density patches with puckered fabric edges",
    stitchRoom: "High-density Japanese Tajima automated embroidery with smooth backing",
    highlight: true
  },
  {
    feature: "Fit Guarantee & Alteration Support",
    market: "Generic standard S/M/L with no replacement support",
    stitchRoom: "Master tailor measurement camps + free batch alteration assistance",
    highlight: false
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "The Stitch Room has been our uniform partner for over 7 consecutive academic years. Their fabric longevity is unmatched — parents frequently tell us the uniforms easily last through two years of daily wear.",
    name: "Rev. Fr. Augustine Raj",
    role: "Correspondent & Principal",
    institution: "St. Joseph's Higher Secondary School, Chennai",
    rating: 5
  },
  {
    id: 2,
    quote: "Outfitting 450+ doctors and nursing staff across three campuses requires impeccable turnaround. The anti-microbial scrubs from Stitch Room are breathable, comfortable during 14-hour shifts, and autoclave-safe.",
    name: "Dr. K. Senthil Nathan, MS",
    role: "Medical Director",
    institution: "Apollo Healthcare Network, Vellore",
    rating: 5
  },
  {
    id: 3,
    quote: "Our engineering lab coats and management department blazers were delivered 10 days before the semester reopened. The fit was accurate for 98% of students on day one without rework.",
    name: "Prof. M. Vijayalakshmi",
    role: "Dean of Student Affairs",
    institution: "Bharath Institute of Technology, Coimbatore",
    rating: 5
  }
];

export const FAQS = [
  {
    q: "What is your minimum order quantity (MOQ) for institutional orders?",
    a: "For custom school uniforms or corporate apparel with bespoke dyeing and embroidery, our standard MOQ is 50 sets. For standard institutional patterns and medical scrubs, we accommodate trial orders starting from 25 sets.",
    category: "Ordering"
  },
  {
    q: "Can you provide pre-production samples before mass manufacturing?",
    a: "Yes, absolutely! Once fabric, colors, and badge embroidery designs are chosen, we produce a physical sample set for institutional committee approval before starting mass production.",
    category: "Sampling"
  },
  {
    q: "How do you handle student measurements across large schools?",
    a: "Our team of master tailors conducts on-campus measurement camps at your school or institution. Alternatively, we provide calibrated sizing trial kits with numbered master garments for smooth self-sizing by parents.",
    category: "Fitting"
  },
  {
    q: "What is the typical delivery timeline for bulk uniform orders?",
    a: "Standard academic batches (500 – 3,000 sets) typically require 3 to 4 weeks from final sample sign-off. We schedule early batch dispatches to guarantee zero delay before reopening dates.",
    category: "Delivery"
  },
  {
    q: "Do you supply customized school ties, belts, socks, and sports tracksuits?",
    a: "Yes. We offer complete head-to-toe uniform bundles including jacquard woven ties, brass buckle crest belts, anti-sweat terry socks, house color polo t-shirts, and tracksuits.",
    category: "Products"
  },
  {
    q: "Where is The Stitch Room located, and do you ship across India?",
    a: "Our master manufacturing workshop is located at Katpadi, Vellore, Tamil Nadu. We regularly dispatch consignments across Tamil Nadu, Andhra Pradesh, Karnataka, and nationwide via insured freight partners.",
    category: "Delivery"
  }
];

export const INITIAL_SCHOOLS = [
  {
    id: 1,
    name: "St. Joseph's Higher Secondary School",
    city: "Chennai",
    district: "Chennai",
    students: 1200,
    uniformType: "Navy Pleated Skirt / Trousers + Sky Blue Oxford Shirt",
    category: "Matriculation / State Board",
    established: 1985,
    colors: ["#1e3a8a", "#bae6fd", "#ffffff"],
    status: "Active Partner"
  },
  {
    id: 2,
    name: "Bharath Matriculation School",
    city: "Coimbatore",
    district: "Coimbatore",
    students: 950,
    uniformType: "Khaki Trousers / Pinafore + Olive Green Twill Shirt",
    category: "Matriculation",
    established: 1992,
    colors: ["#3f6212", "#ca8a04", "#fef08a"],
    status: "Active Partner"
  },
  {
    id: 3,
    name: "Madurai Vivekananda Higher Secondary",
    city: "Madurai",
    district: "Madurai",
    students: 800,
    uniformType: "Maroon Check Pinafore + White Poly-Cotton Shirt",
    category: "Higher Secondary",
    established: 1988,
    colors: ["#881337", "#fecdd3", "#ffffff"],
    status: "Active Partner"
  },
  {
    id: 4,
    name: "Salem Sunrise Academy",
    city: "Salem",
    district: "Salem",
    students: 720,
    uniformType: "Royal Blue Blazer + Grey Worsted Wool-blend Trousers",
    category: "CBSE",
    established: 1995,
    colors: ["#1d4ed8", "#64748b", "#ffffff"],
    status: "Active Partner"
  },
  {
    id: 5,
    name: "Vellore Heritage International School",
    city: "Katpadi, Vellore",
    district: "Vellore",
    students: 1400,
    uniformType: "Terracotta & Beige Houndstooth Skirt / Trousers",
    category: "ICSE / Cambridge",
    established: 2004,
    colors: ["#c97550", "#fef3c7", "#0f172a"],
    status: "Active Partner",
    yearsPartner: "12+ Years"
  },
  {
    id: 6,
    name: "Tiruchirappalli Model Matric School",
    city: "Trichy",
    district: "Tiruchirappalli",
    students: 890,
    uniformType: "Deep Emerald Green Tunic + Cream Poplin Shirt",
    category: "Matriculation",
    established: 1998,
    colors: ["#064e3b", "#fef3c7", "#ffffff"],
    status: "Active Partner",
    yearsPartner: "8+ Years"
  },
  {
    id: 7,
    name: "Auxilium Higher Secondary School",
    city: "Katpadi, Vellore",
    district: "Vellore",
    students: 1650,
    uniformType: "Navy Pleated Pinafore + White Poly-Cotton Poplin Shirt",
    category: "State Board / ICSE",
    established: 1978,
    colors: ["#1e3a8a", "#ffffff", "#94a3b8"],
    status: "Active Partner",
    yearsPartner: "15+ Years"
  },
  {
    id: 8,
    name: "Kingston Engineering & Tech Campus",
    city: "Ranipet / Vellore",
    district: "Ranipet",
    students: 1100,
    uniformType: "Charcoal Grey Tailored Blazer + Oxford White Shirt",
    category: "Higher Education / College",
    established: 2002,
    colors: ["#334155", "#e2e8f0", "#c97550"],
    status: "Active Partner",
    yearsPartner: "9+ Years"
  },
  {
    id: 9,
    name: "Bhavan's Vidya Mandir",
    city: "Chennai",
    district: "Chennai",
    students: 1350,
    uniformType: "Crimson & Beige Plaid Skirt + Khaki Twill Trousers",
    category: "CBSE",
    established: 1991,
    colors: ["#991b1b", "#d97706", "#fef3c7"],
    status: "Active Partner",
    yearsPartner: "11+ Years"
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "INQ-2026-001",
    name: "Ramesh Kannan",
    org: "Don Bosco Matriculation School",
    email: "principal.donbosco@gmail.com",
    phone: "+91 98401 23456",
    category: "school",
    quantity: "850 Sets",
    notes: "Need samples for Grades 1 to 10 with school badge embroidery for next academic year.",
    date: "2026-10-18",
    status: "New"
  },
  {
    id: "INQ-2026-002",
    name: "Dr. Ananya Murugan",
    org: "Grace Multispeciality Hospital",
    email: "admin@gracehospital.org",
    phone: "+91 94432 78901",
    category: "hospital",
    quantity: "220 Sets",
    notes: "Scrub suits in Ceil Blue and Emerald Green with doctor name embroidery on chest pocket.",
    date: "2026-10-19",
    status: "Sample Sent"
  },
  {
    id: "INQ-2026-003",
    name: "Karthik Subramanian",
    org: "Apex Logistics & Tech Park",
    email: "karthik.s@apexlogistics.in",
    phone: "+91 97890 54321",
    category: "corporate",
    quantity: "150 Sets",
    notes: "Corporate formal polos with dry-fit fabric and embroidered left collar logo.",
    date: "2026-10-20",
    status: "Contacted"
  }
];
