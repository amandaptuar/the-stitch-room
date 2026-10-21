# The Stitch Room — Premium Institutional Textile & Uniform Website (v2.0)

A modern, high-performance, agency-grade React.js + Vite web application built for **The Stitch Room**, South India's premier manufacturer of institutional uniforms, hospital medical scrubs, corporate attire, and bespoke bulk garments based in Katpadi, Vellore, Tamil Nadu (established 1995).

---

## 🌟 What Was Rebuilt & Upgraded

### 1. Architectural Modernization (Legacy Static HTML/PHP → React + Vite SPA)
- **Framework:** Migrated from static HTML/CSS/PHP scripts to a modular **React 18 + Vite** single-page application.
- **Routing:** Configured client-side routing with **React Router v6**, supporting direct links, route change scroll-to-top, and a custom 404 page.
- **Asset Pipeline:** Bundled all high-resolution imagery (`front1.png`, `legacy.png`, `b2b.png`, `logo.jpeg`, category photographs) with responsive sizing and clean asset organization in `public/`.
- **Icons & Motion:** Integrated **Lucide React** for consistent vector iconography.

### 2. UI/UX Redesign & Brand Consistency
- **Brand Identity:** Curated a sophisticated color system honoring the authentic brand identity:
  - **Terracotta / Burnt Orange:** `#c97550` (Primary brand accent)
  - **Deep Navy / Slate:** `#0f172a` (Authority and structure)
  - **Warm Sand / Alabaster:** `#fbf9f5` (Clean, warm background)
  - **Gold Accents:** `#d4af37` (Tajima embroidery & crest details)
- **Typography:** Professional Google Fonts typography pairing using **Outfit** (headings), **Inter** (body), and **Poppins** (accents).
- **Infinite Marquee Ticker:** Seamless, continuous ribbon highlighting quality certifications (pre-shrunk yarns, reactive vat-dying, Tajima embroidery).
- **Automated Feature Carousel:** Self-playing featured uniform carousel with manual next/prev controls, dot indicators, touch swipe support, and pause-on-hover.
- **Benchmark Comparison Module:** Side-by-side comparison table showing *The Stitch Room Standards* vs *Standard Market Uniforms*.

### 3. Interactive 3D & Canvas Uniform Studio (`/3d-showroom`)
- Complete rebuild of the experimental 3D studio into an interactive real-time canvas customizer:
  - Garment line switcher (School Blazers, Shirts, Medical Scrubs, Corporate Formals)
  - Live fabric color swatch palette (Terracotta Orange, Navy Blue, Forest Green, Medical Ceil Blue, Maroon, Khaki, White, Charcoal)
  - Collar pattern selection (Spread, Mandarin, Button-Down)
  - Institutional neckwear customization (Jacquard striped ties, solid ties)
  - Computerized Tajima crest embroidery badge toggle
  - **Download Specification Card** (exports high-res PNG of custom uniform)
  - **Request Quote for this Design** (pre-fills form with chosen configuration)

### 4. Interactive Bulk Price Estimator (`/uniforms`)
- Instant cost calculation tool for school and hospital procurement committees:
  - Real-time batch volume slider (50 to 2,000+ sets)
  - Tiered bulk discounts (5% at 200 sets, 10% at 500+ sets)
  - Addon toggles for Tajima crest embroidery and jacquard tie/belt bundles
  - Instant indicative unit price and batch total in Indian Rupees (INR)

### 5. Partner Schools Directory (`/clients`)
- Comprehensive interactive directory of partner schools across Tamil Nadu (Chennai, Coimbatore, Madurai, Salem, Vellore, Trichy).
- Search bar filtering by school name, city, or uniform pattern.
- Region dropdown filter.
- Uniform color swatch visualization and "Inquire Similar" shortcuts.

### 6. Fixed Form & Lead Generation Engine (`/contact`)
- **Resolved Dual Submit Handler Bug:** Completely removed conflicting duplicate submit listeners from legacy code.
- **Client-Side Validation:** Validates required fields with user-friendly alerts.
- **Local Persistence & Admin Sync:** Submissions immediately generate an official Reference ID (`INQ-2026-XXX`) and persist to local storage for the Admin Console.
- **Dual Communication Safeguard:** Generates an automated WhatsApp link pre-filled with all form specifications, guaranteeing zero lead loss.
- **Webhook Integration Ready:** Supports Formspree or EmailJS via `.env` configuration.

### 7. Upgraded Admin Management Console (`/admin`)
- **Authentication:** Protected admin dashboard routes with session management and quick sign out. Default credentials: `admin` / `admin123`.
- **Overview Dashboard:** Live KPI metrics (Total Inquiries, New/Unread Leads, Samples Dispatched, Active Partner Schools).
- **Inquiries Manager:** Full table with status updating (`New` → `Contacted` → `Sample Sent` → `Closed`), search, status/category filters, and CSV export.
- **Partner Schools CRUD:** Modal form to Add, Edit, or Remove schools from the public directory.

---

## 📁 Project Directory Structure

```
The-Stitch-Room-/
├── legacy-static-site/       # Secured backup of original static HTML/PHP/CSS files
├── public/
│   ├── assets/images/        # Category and showcase images
│   ├── data/                 # JSON data files (schools.json)
│   ├── b2b.png               # B2B manufacturing banner
│   ├── front1.png            # Desktop hero showcase
│   ├── legacy.png            # Factory heritage showcase
│   ├── logo.jpeg             # Official brand logo
│   ├── robots.txt            # SEO crawler directives (disallows admin)
│   └── sitemap.xml           # Search engine sitemap
├── src/
│   ├── admin/                # Upgraded Admin Console
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminInquiriesPage.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminLoginPage.jsx
│   │   └── AdminSchoolsPage.jsx
│   ├── components/           # Reusable UI components
│   │   ├── FeaturedCarousel.jsx
│   │   ├── Footer.jsx
│   │   ├── MarqueeRibbon.jsx
│   │   ├── Navbar.jsx
│   │   └── WhatsAppFloatingButton.jsx
│   ├── data/                 # Structured business data
│   │   └── mockData.js
│   ├── pages/                # Public website pages
│   │   ├── AboutPage.jsx
│   │   ├── ClientsPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── CustomerPortalPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── Studio3DPage.jsx
│   │   └── UniformsPage.jsx
│   ├── utils/                # Business services & persistence
│   │   └── storage.js
│   ├── App.jsx               # Route definitions & public layout
│   ├── index.css             # Complete design system & responsive styling
│   └── main.jsx              # React DOM entry point
├── .env.example              # Environment variables template
├── index.html                # HTML5 entry with SEO tags & Google Fonts
├── package.json              # Project dependencies & scripts
├── vite.config.js            # Vite build configuration
└── README.md                 # Project documentation
```

---

## 🚀 How to Run and Build

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized, minified production build inside the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Environment Configuration (`.env`)

Copy `.env.example` to `.env` and supply your credentials:

```bash
# Formspree Endpoint (Optional for direct email forwarding)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id

# Direct WhatsApp & Contact Configuration
VITE_CONTACT_EMAIL=thestitchroom95@gmail.com
VITE_CONTACT_PHONE_1=+91 78128 79053
VITE_CONTACT_PHONE_2=+91 93607 22463
VITE_WHATSAPP_NUMBER=917812879053
```

---

## 🛡️ Admin Console Access

- **Route:** `http://localhost:5173/admin/login`
- **Default Username:** `admin`
- **Default Password:** `admin123`
*(Alternative credentials: `stitchroom` / `vellore1995`)*

---

## 🏢 Business Identity & Contact Information
- **Company:** The Stitch Room
- **Location:** No.21, 4a East Cross Road, Gandhinagar East, Katpadi, Vellore - 632006, Tamil Nadu, India
- **Phone:** +91 78128 79053 / +91 93607 22463
- **Email:** thestitchroom95@gmail.com
- **Operating Hours:** Monday – Saturday: 9:00 AM – 7:30 PM (Sunday Closed)
