/**
 * Central Business Configuration & Content (xfnsales.us + lower disclosure sequence)
 */

export const BRAND_NAME = "XfnSales";
export const WORDMARK_LEADING = "xfn";
export const WORDMARK_ACCENT = "sales";
export const DOMAIN = "xfnsales.us";
export const PHONE_DISPLAY = "(888) 785-5617";
export const PHONE_E164 = "+18887855617";
export const SUPPORT_EMAIL = "support@xfnsales.us";
export const BUSINESS_ROLE = "independent comparison and referral service";

export interface WordmarkParts {
  leading: string;
  accent: string;
}

export function getWordmarkParts(): WordmarkParts {
  return {
    leading: WORDMARK_LEADING,
    accent: WORDMARK_ACCENT,
  };
}

export function hasValidPhoneDestination(e164: string = PHONE_E164): boolean {
  const cleaned = e164.trim();
  if (!cleaned || cleaned.includes("[") || cleaned.includes("YOUR")) {
    return false;
  }
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}

export function hasValidEmailDestination(email: string = SUPPORT_EMAIL): boolean {
  const cleaned = email.trim();
  if (!cleaned || cleaned.includes("[") || cleaned.includes("YOUR")) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned);
}

export interface FeaturedOffer {
  id: string;
  speedPrefix: string;
  titleRemainder: string;
  supportingLine: string;
  priceDollars: number;
  ctaLabel: string;
  detailsLabel: string;
}

export interface ComparisonTier {
  id: string;
  speedLabel: string;
  householdDescriptor: string;
  priceDollars: number;
  benefits: { text: string; strong?: boolean }[];
  ctaLabel: string;
  detailsLabel: string;
}

export interface ProductFaqItem {
  id: string;
  question: string;
  answer: string;
  bullets?: { boldPrefix: string; text: string }[];
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONTENT = {
  zipChecker: {
    heading: "Enter Your Zip Code",
    subheading: "Let's find deals and services available in your area",
    inputLabel: "Zip Code",
    inputPlaceholder: "Enter 5-digit ZIP Code (e.g. 90210)",
    buttonText: "Find My Plan",
    emptyError: "Please enter your 5-digit ZIP code.",
    invalidError: "Please enter a valid 5-digit US ZIP code (e.g. 90210).",
  },

  categoryHeading: "Internet",

  hero: {
    headline: "Our best price on WiFi is back",
    savingsLine: "Save up to $60/mo compared with your current provider",
    supportingCopy:
      "Get online in minutes with same-day WiFi, equipment and unlimited data included, and no annual contract. Plus a free mobile line for 1 year.",
    promoYearsNumeral: "5",
    promoMotifBold: "year price",
    promoMotifLight: "guarantee",
    heroArtPath: "/assets/Archer-Relaunch_Hero_Desktop-scaled.avif",
  },

  featuredOffers: [
    {
      id: "featured-300",
      speedPrefix: "300 Mbps WiFi",
      titleRemainder: "for work and play",
      supportingLine: "Save $45/mo compared with a typical national provider",
      priceDollars: 40,
      ctaLabel: "Shop internet",
      detailsLabel: "Pricing & other info",
    },
    {
      id: "featured-gig",
      speedPrefix: "Gig WiFi",
      titleRemainder: "built for streaming",
      supportingLine: "Save $60/mo plus a 2-year streaming credit",
      priceDollars: 50,
      ctaLabel: "Shop internet",
      detailsLabel: "Pricing & other info",
    },
  ] as FeaturedOffer[],

  featuredOffersFinePrint:
    "Limited-time offer for new residential customers. Restrictions apply. Autopay with stored bank account and paperless billing required. Taxes and fees extra and subject to change. Mobile service requires home internet service. After 50 GB, data speeds may be reduced during network congestion. Savings comparisons are based on advertised rates for comparable plans over five years.",

  planComparison: {
    headingPrefix: "Back to school on award-winning WiFi — ",
    headingAccent: "with everything included",
    subheading:
      "Members get more with WiFi recognized by independent network testing. Every plan includes WiFi equipment, unlimited data, and more.",
    tiers: [
      {
        id: "tier-300",
        speedLabel: "300 Mbps",
        householdDescriptor: "For everyday use",
        priceDollars: 40,
        benefits: [
          { text: "5-Year Price Guarantee. Cancel anytime.", strong: true },
          { text: "Simple, seamless WiFi with 99% reliability" },
          { text: "A free mobile line for 1 year" },
          { text: "No annual contract" },
        ],
        ctaLabel: "Build your plan",
        detailsLabel: "Pricing & other info",
      },
      {
        id: "tier-500",
        speedLabel: "500 Mbps",
        householdDescriptor: "Keep up on all your devices",
        priceDollars: 45,
        benefits: [
          { text: "5-Year Price Guarantee. Cancel anytime.", strong: true },
          { text: "Fast, consistent speed — even at peak hours" },
          { text: "A free mobile line for 1 year" },
          { text: "No annual contract" },
        ],
        ctaLabel: "Build your plan",
        detailsLabel: "Pricing & other info",
      },
      {
        id: "tier-1gig",
        speedLabel: "1 Gig",
        householdDescriptor: "Made for busy households",
        priceDollars: 50,
        benefits: [
          { text: "5-Year Price Guarantee. Cancel anytime.", strong: true },
          { text: "The most reliable, fiber-powered WiFi" },
          { text: "A free mobile line for 1 year" },
          { text: "A 2-year streaming credit ($12.99/mo value)" },
          { text: "No annual contract" },
        ],
        ctaLabel: "Build your plan",
        detailsLabel: "Pricing & other info",
      },
    ] as ComparisonTier[],
    conditionsFinePrint:
      "Limited-time offer for new residential customers. Restrictions apply. Autopay with stored bank account and paperless billing required. Taxes and fees extra and subject to change. Mobile service requires home internet service. Gig service is powered by fiber and connected to the premises by coaxial cable. Reliability claim based on independent fixed-broadband experience testing.",
  },

  recognitionPanel: {
    heading: "Awarded best-in-class WiFi + mobile experience",
    supportingLine:
      "Ranked first for combined home and mobile network experience in independent nationwide testing, April 2026.",
    learnMoreLabel: "Learn more",
    badgeText: "NETWORK INDEX",
  },

  eligibilityBanner: {
    programLabel: "Essentials",
    headline: "Reliable home internet for under $15/mo",
    supportingCopy:
      "Available for eligible households and includes unlimited data and equipment. See if you qualify.",
    ctaLabel: "Check eligibility",
    conditionsFinePrint:
      "Restrictions apply. Not available in all areas. Limited to residential customers meeting certain eligibility criteria. Subject to program terms and conditions. Advertised price applies to a single outlet. Actual speeds vary and are not guaranteed. Limited to 75 Mbps.",
  },

  productFaqCarousel: {
    heading: "Frequently asked questions",
    items: [
      {
        id: "pfaq-1",
        question: "What is the 5-Year Price Guarantee?",
        answer:
          "The 5-Year Price Guarantee locks in your base monthly home internet rate for 60 months. You get one simple, consistent price with no annual contract required and the option to change or cancel your service at any time. Current plans also include WiFi equipment and unlimited data in that price. Plus, if you move to a new address in our service area, your rate stays the same.",
      },
      {
        id: "pfaq-2",
        question: "Is there a contract or early termination fee?",
        answer:
          "No, there is no annual contract and no early termination fee. You can cancel any time without a penalty.",
      },
      {
        id: "pfaq-3",
        question: "What is network protection and how does it help secure my home?",
        answer:
          "Network protection is a suite of features built into your gateway, designed to keep you informed and at ease, day and night. It is included with your internet service at no additional cost or equipment. It includes:",
        bullets: [
          {
            boldPrefix: "Motion sensing:",
            text: " away or asleep, detect movement in your home using your smart devices. No cameras needed.",
          },
          {
            boldPrefix: "Always-on security:",
            text: " protection for every device on your network against known threats.",
          },
          {
            boldPrefix: "Parental controls:",
            text: " pause the internet by device or schedule screen time by person.",
          },
        ],
      },
      {
        id: "pfaq-4",
        question: "Is WiFi equipment included in the monthly price?",
        answer:
          "Yes. Your gateway is included at no extra cost on every plan on this page — there is no separate equipment rental line on your bill. If you already own a compatible router you can use it instead, though some features are only available on our gateway.",
      },
      {
        id: "pfaq-5",
        question: "How fast can I get connected?",
        answer:
          "Most addresses in our service area qualify for same-day or next-day activation. Self-install takes about 15 minutes and the kit ships free. If your home needs a technician visit, we schedule it in a two-hour window and there is no installation charge on current offers.",
      },
      {
        id: "pfaq-6",
        question: "What speed do I actually need?",
        answer:
          "For one or two people browsing, email, and HD video, 300 Mbps is comfortable. Add remote work, several streaming devices, or gaming and 500 Mbps gives you more headroom. Choose 1 Gig for large households, frequent large uploads, or anyone working with video files. You can change plans at any time without a fee.",
      },
    ] as ProductFaqItem[],
  },

  serviceDisclosures: {
    badge: "Consumer Transparency & Legal Independence Notice",
    heading: "Important Service Disclosures & Boundaries",
    description: `${BRAND_NAME} is an independent third-party comparison service and consumer advisor. We believe in total clarity regarding our role.`,
    notCard: {
      title: "What We Do NOT Do",
      subtitle: "Important consumer boundaries",
      items: [
        "We are not an official telecommunications or utility service provider.",
        "We are not affiliated with, endorsed by, or authorized by any single carrier.",
        "We do not physically bill, install, or own the physical underground utility cables.",
        "Carrier brand references are purely descriptive and informational.",
      ],
    },
    doCard: {
      title: "What We DO",
      subtitle: "Consumer advocacy & concierge",
      items: [
        "Compare high-speed cable, pure fiber, fixed wireless, and satellite by exact address.",
        "Surface eligible promotions, introductory credits, and bill-lowering opportunities.",
        "Connect you with live phone specialists ready to verify coverage and activate plans.",
        "Provide a 100% free consultation with zero obligation or hidden fees.",
      ],
    },
  },

  serviceFaqAccordion: {
    badge: "Got Questions?",
    heading: "Frequently Asked Questions",
    intro:
      "Everything you need to know about our free broadband comparison and switching service.",
    items: [
      {
        id: "sfaq-1",
        question: "What providers and technologies do you cover?",
        answer: `We help you compare cable, fiber, DSL, fixed wireless, and satellite broadband options available at your specific address. ${BRAND_NAME} is an independent comparison service and referral advisor for participating telecommunications networks across the United States.`,
      },
      {
        id: "sfaq-2",
        question: `Is ${BRAND_NAME} an official service provider?`,
        answer: `No. ${BRAND_NAME} is an independent third-party comparison and referral service. We are not an official utility service provider and do not own, operate, or directly maintain physical utility cables or network poles.`,
      },
      {
        id: "sfaq-3",
        question: "How does the service work?",
        answer:
          "Share your address or 5-digit ZIP code and our system identifies available broadband technologies and plan tiers physically wired to your location. Final pricing, terms, and availability are verified and confirmed before you finalize any activation.",
      },
      {
        id: "sfaq-4",
        question: "Is this comparison service free?",
        answer:
          "Yes! Our comparison concierge, address availability lookups, and bill-lowering consultations are 100% free with zero obligation to buy or switch.",
      },
      {
        id: "sfaq-5",
        question: "Are the prices guaranteed?",
        answer:
          "All pricing, speeds, and promotional offers displayed are verified at the time of your address lookup. Because promotional rates change based on location and season, our phone specialists confirm the exact rate before activation.",
      },
      {
        id: "sfaq-6",
        question: "Can you help lower my existing broadband bill?",
        answer:
          "Yes! Through our Free Bill Review service, we review what you are currently paying and identify loyalty discounts, repackaged tiers, or competing promotions in your area that often allow you to lower your monthly payment.",
      },
    ] as ServiceFaqItem[],
  },

  privacySummary: {
    badge: "Data Security",
    heading: "Privacy Policy & Consumer Trust Summary",
    intro: `${BRAND_NAME} is committed to protecting your personal information with strict confidentiality.`,
    groups: [
      {
        id: "priv-1",
        subheading: "Address & Location Data",
        body:
          "Used solely to query telecommunication coverage databases and identify wired broadband tiers at your residence.",
      },
      {
        id: "priv-2",
        subheading: "Contact Details",
        body:
          "Phone number and optional email provided when requesting telephone assistance, quote verification, or callback.",
      },
      {
        id: "priv-3",
        subheading: "Zero Data Resale Guarantee",
        body:
          "We do not sell your personal contact info to third-party list brokers. You may opt out of future communications anytime.",
      },
    ],
  },

  footer: {
    description: `${BRAND_NAME} provides independent broadband rate comparison, speed analysis, and concierge switching assistance for consumers across the United States.`,
    navigationLinks: [
      { label: "Check ZIP Code", href: "#xfn-start" },
      { label: "Plans & Pricing", href: "#xfn-plans" },
      { label: "Network Recognition", href: "#xfn-award" },
      { label: "Disclosures", href: "#wawy-disclaimer" },
      { label: "Service FAQ", href: "#wawy-faq" },
    ],
    disclosureBoxText: `${DOMAIN} is an independent third-party comparison service and referral advisor for participating telecommunications providers. Service availability, pricing, speeds, package options, and promotions vary by provider, service address, ZIP code, and customer eligibility. All advertised prices ($40 to $50/mo and under $15/mo for qualifying households), discounts, and incentives are subject to change without notice and may require qualifying services, term commitments, or autopay. ${BRAND_NAME} is not an official utility service provider and does not directly sell, bill, or service the physical network infrastructure.`,
  },
};
