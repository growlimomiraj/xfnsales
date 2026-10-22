/**
 * Central Business Configuration & Preview Offer Data
 * ---------------------------------------------------
 * Replace the bracketed placeholders below with verified business details,
 * live telephone routing, and carrier-approved offer terms before deployment.
 */

export const BRAND_NAME = "[YOUR BRAND]";
export const DOMAIN = "[YOUR DOMAIN]";
export const PHONE_DISPLAY = "[YOUR PHONE NUMBER]";
export const PHONE_E164 = "";
export const SUPPORT_EMAIL = "[YOUR SUPPORT EMAIL]";
export const BUSINESS_ROLE = "independent comparison and referral service";

export interface WordmarkParts {
  leading: string;
  accent: string;
}

/**
 * Splits the configured brand name so the ending portion renders in primary purple (#6D2EFF)
 * matching the XFN wordmark treatment.
 */
export function getWordmarkParts(brand: string = BRAND_NAME): WordmarkParts {
  const trimmed = brand.trim();
  if (trimmed === "[YOUR BRAND]") {
    return { leading: "[YOUR ", accent: "BRAND]" };
  }
  const lastSpaceIndex = trimmed.lastIndexOf(" ");
  if (lastSpaceIndex > 0 && lastSpaceIndex < trimmed.length - 1) {
    return {
      leading: trimmed.slice(0, lastSpaceIndex + 1),
      accent: trimmed.slice(lastSpaceIndex + 1),
    };
  }
  const mid = Math.ceil(trimmed.length * 0.55);
  return {
    leading: trimmed.slice(0, mid),
    accent: trimmed.slice(mid),
  };
}

/**
 * Checks whether PHONE_E164 is configured with a valid dialable phone number.
 */
export function hasValidPhoneDestination(e164: string = PHONE_E164): boolean {
  const cleaned = e164.trim();
  if (!cleaned || cleaned.includes("[") || cleaned.includes("YOUR")) {
    return false;
  }
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}

/**
 * Checks whether SUPPORT_EMAIL is configured with a real email address.
 */
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
  billingPeriodLabel: string;
  promoGuaranteeNote: string;
  ctaLabel: string;
  detailsLabel: string;
  fullDetails: {
    summary: string;
    rateProtection: string;
    equipmentAndData: string;
    billingAndAutopay: string;
    availabilityNote: string;
  };
}

export interface ComparisonTier {
  id: string;
  speedLabel: string;
  householdDescriptor: string;
  priceDollars: number;
  billingPeriodLabel: string;
  promoDurationNote: string;
  benefits: string[];
  ctaLabel: string;
  detailsLabel: string;
  fullDetails: {
    summary: string;
    rateProtection: string;
    equipmentAndData: string;
    billingAndAutopay: string;
    availabilityNote: string;
  };
}

export interface ProductFaqItem {
  id: string;
  subject: string;
  question: string;
  answer: string;
}

export interface DisclosurePoint {
  id: string;
  label: string;
  description: string;
}

export interface ServiceFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PrivacySummaryGroup {
  id: string;
  subheading: string;
  body: string;
}

export const SITE_CONTENT = {
  zipChecker: {
    heading: "Check Internet Plan Options by ZIP Code",
    subheading:
      "Enter your 5-digit U.S. ZIP code to review preview broadband tiers and connect with an advisor to verify address-level availability.",
    inputLabel: "Enter your 5-digit ZIP Code",
    inputPlaceholder: "e.g., 02115",
    buttonText: "Find My Plan",
  },

  categoryHeading: "Internet",

  hero: {
    headline: "Multi-Year Price Lock on High-Speed Home Internet",
    savingsLine: "Preview plans starting at $40/mo with a 5-year rate guarantee and WiFi equipment included.",
    supportingCopy:
      "Compare residential broadband options with predictable monthly pricing, unlimited home data, and no annual service contract required on qualifying preview tiers.",
    promoYearsNumeral: "5",
    promoMotifTop: "YEAR PRICE",
    promoMotifBottom: "GUARANTEE",
    promoMotifSub: "No annual contract · WiFi equipment & unlimited data included on preview offers",
    accessibleArtDescription:
      "Promotional graphic highlighting a 5-Year Price Guarantee on qualifying home internet tiers with no annual contract.",
    observedHeroImageUrl:
      "https://xfnsales.us/wp-content/uploads/2026/08/Archer-Relaunch_Hero_Desktop-scaled.avif",
    useExternalHeroAssetIfReachable: false,
  },

  featuredOffers: [
    {
      id: "featured-300",
      speedPrefix: "300 Mbps",
      titleRemainder: "Home Internet with 5-Year Price Lock",
      supportingLine:
        "Reliable everyday speeds for HD streaming, remote work, video calls, and connected home devices.",
      priceDollars: 40,
      billingPeriodLabel: "/mo",
      promoGuaranteeNote: "for 5 years · No term contract · Equipment included",
      ctaLabel: "Check Availability",
      detailsLabel: "Pricing & other info",
      fullDetails: {
        summary:
          "Preview 300 Mbps residential internet tier at $40/month with a 5-year introductory price lock (unconfirmed preview offer data).",
        rateProtection:
          "5-year promotional monthly rate remains fixed for 60 consecutive months when enrolled in eligible automatic payments and paperless billing. Taxes and government fees extra.",
        equipmentAndData:
          "Includes standard WiFi gateway rental and unlimited monthly residential data usage under preview promotional terms.",
        billingAndAutopay:
          "Preview price assumes a $10/mo AutoPay and paperless billing discount using a qualifying bank account. Standard rates apply after the 60-month promotional period.",
        availabilityNote:
          "Speeds, promotional rate locks, and included equipment depend on participating provider infrastructure at your exact street address.",
      },
    },
    {
      id: "featured-gigabit",
      speedPrefix: "Gigabit",
      titleRemainder: "1000 Mbps Internet with 5-Year Price Lock",
      supportingLine:
        "High-capacity multi-device performance for 4K streaming, low-latency gaming, large file transfers, and busy households.",
      priceDollars: 50,
      billingPeriodLabel: "/mo",
      promoGuaranteeNote: "for 5 years · No term contract · Equipment included",
      ctaLabel: "Check Availability",
      detailsLabel: "Pricing & other info",
      fullDetails: {
        summary:
          "Preview Gigabit (up to 1000 Mbps) residential internet tier at $50/month with a 5-year introductory price lock (unconfirmed preview offer data).",
        rateProtection:
          "5-year promotional monthly rate remains fixed for 60 consecutive months with continuous service at the qualifying service address.",
        equipmentAndData:
          "Includes advanced WiFi gateway equipment and unlimited residential data allowance under preview promotional terms.",
        billingAndAutopay:
          "Preview price reflects enrollment in AutoPay and paperless billing with a bank account. Taxes, surcharges, and optional professional installation fees may apply.",
        availabilityNote:
          "Actual speeds vary by home wiring, device capability, and network congestion. Address-level qualification is required prior to order placement.",
      },
    },
  ] as FeaturedOffer[],

  featuredOffersFinePrint:
    "Preview offer terms: $40/mo (300 Mbps) and $50/mo (Gigabit) rates reflect preview promotional pricing with eligible AutoPay and paperless billing enrollment. Taxes and fees extra. 5-year price guarantee applies to the base monthly internet rate for new qualifying residential accounts and does not lock taxes, government fees, or optional add-on services. Final availability, speed tiers, and carrier terms are verified by address during consultation.",

  planComparison: {
    headingPrefix: "Compare internet tiers built for ",
    headingAccent: "every connected household",
    subheading:
      "Review our preview broadband comparison tiers side by side. Each option is structured around multi-year rate stability, included WiFi gateway hardware, and flexible month-to-month service.",
    tiers: [
      {
        id: "tier-300",
        speedLabel: "300 Mbps",
        householdDescriptor: "Everyday streaming, browsing & work-from-home essentials",
        priceDollars: 40,
        billingPeriodLabel: "/mo",
        promoDurationNote: "for 5 years with AutoPay & paperless billing",
        benefits: [
          "5-year introductory monthly price guarantee",
          "WiFi gateway equipment & unlimited data included",
          "Supports up to 8–10 simultaneously connected devices",
          "Optional mobile line bundle savings where available",
          "No annual service contract or early termination fee",
        ],
        ctaLabel: "Select 300 Mbps Plan",
        detailsLabel: "Pricing & other info",
        fullDetails: {
          summary: "300 Mbps preview plan at $40/mo for 60 months with no annual contract.",
          rateProtection:
            "Monthly base rate locked for 5 years for qualifying new residential customers.",
          equipmentAndData:
            "Standard WiFi gateway and unlimited data included at no additional monthly equipment charge.",
          billingAndAutopay:
            "Requires paperless billing and automatic payments from an eligible bank account. Without AutoPay, monthly rate may be $5–$10 higher depending on carrier rules.",
          availabilityNote:
            "Subject to local network availability and address verification by a participating service provider.",
        },
      },
      {
        id: "tier-500",
        speedLabel: "500 Mbps",
        householdDescriptor: "Balanced multi-room HD/4K streaming & cloud collaboration",
        priceDollars: 45,
        billingPeriodLabel: "/mo",
        promoDurationNote: "for 5 years with AutoPay & paperless billing",
        benefits: [
          "5-year introductory monthly price guarantee",
          "WiFi gateway equipment & unlimited data included",
          "Smooth multi-user video conferencing and HD/4K media",
          "Eligible for multi-line mobile bundle incentives",
          "No annual service contract or cancellation penalty",
        ],
        ctaLabel: "Select 500 Mbps Plan",
        detailsLabel: "Pricing & other info",
        fullDetails: {
          summary: "500 Mbps preview plan at $45/mo for 60 months with no annual contract.",
          rateProtection:
            "Monthly base rate locked for 5 years for qualifying new residential customers.",
          equipmentAndData:
            "Includes high-output WiFi gateway and unlimited monthly data with no overage charges.",
          billingAndAutopay:
            "Requires paperless billing and bank account AutoPay enrollment. Taxes, fees, and one-time activation charges may apply.",
          availabilityNote:
            "Subject to local network availability and address verification by a participating service provider.",
        },
      },
      {
        id: "tier-1gig",
        speedLabel: "1 Gig",
        householdDescriptor: "Maximum household bandwidth for 4K media, gaming & smart homes",
        priceDollars: 50,
        billingPeriodLabel: "/mo",
        promoDurationNote: "for 5 years with AutoPay & paperless billing",
        benefits: [
          "5-year introductory monthly price guarantee",
          "Advanced WiFi gateway & unlimited data included",
          "Engineered for high-density smart homes & large downloads",
          "Priority eligibility for mobile and streaming extras",
          "No annual service contract required",
        ],
        ctaLabel: "Select 1 Gig Plan",
        detailsLabel: "Pricing & other info",
        fullDetails: {
          summary: "1 Gig (up to 1000 Mbps) preview plan at $50/mo for 60 months with no annual contract.",
          rateProtection:
            "Monthly base rate locked for 5 years for qualifying new residential customers.",
          equipmentAndData:
            "Includes advanced multi-band WiFi gateway and unlimited data allowance.",
          billingAndAutopay:
            "Requires paperless billing and bank account AutoPay enrollment. Standard carrier rates apply after month 60.",
          availabilityNote:
            "Wired connection recommended for maximum Gigabit throughput. Subject to address-level infrastructure verification.",
        },
      },
    ] as ComparisonTier[],
    conditionsFinePrint:
      "Comparison tier prices ($40/mo, $45/mo, and $50/mo) are preview reference figures and require verification for your specific service address. Promotional rates apply to new residential installations enrolled in paperless billing and bank AutoPay. Equipment inclusion, mobile bundle extras, and actual download/upload speeds vary by participating carrier and regional plant capability.",
  },

  recognitionPanel: {
    heading: "Engineered for Whole-Home WiFi Coverage & Consistent Everyday Speeds",
    supportingLine:
      "Preview broadband tiers combine multi-year price predictability, modern gateway hardware, and unlimited residential data so your household stays connected without surprise monthly rate hikes.",
    badgeText: "HOME BROADBAND COMPARISON · TRANSPARENT MULTI-YEAR TERMS",
  },

  eligibilityBanner: {
    programLabel: "QUALIFYING HOUSEHOLDS",
    headline: "Essential home internet under $15/mo for eligible households",
    supportingCopy:
      "Households participating in qualifying federal or state assistance programs may be eligible for reduced-rate broadband plans starting below $15/month with WiFi equipment included.",
    ctaLabel: "Review Eligibility Options",
    conditionsFinePrint:
      "Reduced-rate internet programs (preview reference under $15/mo) are offered directly by participating carriers to households meeting documented income or public-assistance criteria (such as SNAP, Medicaid, SSI, Federal Public Housing Assistance, or Pell Grant participation). Documentation and carrier approval are required.",
  },

  productFaqCarousel: {
    heading: "Frequently Asked Questions About Preview Internet Plans",
    items: [
      {
        id: "pfaq-1",
        subject: "Promotional rate protection",
        question: "How does the 5-year promotional price lock work?",
        answer:
          "On qualifying preview tiers, the advertised base monthly internet rate is locked for 60 consecutive months from activation when you maintain continuous service and AutoPay/paperless billing. Taxes, government surcharges, and optional add-on services are not locked and may adjust.",
      },
      {
        id: "pfaq-2",
        subject: "Contract and cancellation terms",
        question: "Do these internet plans require an annual contract?",
        answer:
          "No annual term contract is required on the preview tiers shown on this page. Service is billed month-to-month, meaning you can change tiers or cancel service without an early termination fee, subject to returning leased carrier equipment on time.",
      },
      {
        id: "pfaq-3",
        subject: "Available network-security features",
        question: "Are home network security features included with the gateway?",
        answer:
          "Many participating provider gateways include built-in network protection tools through a companion mobile app—allowing you to manage guest WiFi credentials, pause device access, and block known malicious domains at the router level.",
      },
      {
        id: "pfaq-4",
        subject: "Equipment costs",
        question: "Is the WiFi router or gateway included in the monthly price?",
        answer:
          "Yes, the preview promotional offers include one standard WiFi gateway rental and unlimited monthly data in the advertised monthly price. Additional mesh WiFi extenders or whole-home pods, if requested, may carry a separate monthly fee.",
      },
      {
        id: "pfaq-5",
        subject: "Installation or activation timing",
        question: "How quickly can home internet service be installed or activated?",
        answer:
          "Addresses with existing compatible wiring often qualify for a self-install kit shipped within 2–3 business days or picked up locally. Homes requiring new drop lines or wall outlets can schedule a professional technician visit during order confirmation.",
      },
      {
        id: "pfaq-6",
        subject: "Choosing an appropriate speed",
        question: "Which internet speed tier is right for my household?",
        answer:
          "300 Mbps fits 1–3 users handling HD streaming and remote work. 500 Mbps supports medium households running simultaneous 4K streams and video calls. 1 Gig is ideal for larger families, smart homes with 15+ devices, and heavy file uploads or gaming.",
      },
    ] as ProductFaqItem[],
  },

  serviceDisclosures: {
    badge: "TRANSPARENCY & ROLE NOTICE",
    heading: "Important Service Disclosures & Boundaries",
    description: `${BRAND_NAME} operates as an ${BUSINESS_ROLE}. Before contacting an advisor or reviewing plan estimates, please review how our comparison service differs from a network carrier.`,
    limitationsCard: {
      badgeLabel: "SERVICE BOUNDARIES",
      title: "What Our Service Is Not",
      subtitle: "Clear operational distinctions between our comparison platform and network carriers:",
      points: [
        {
          id: "lim-1",
          label: "Not an Internet Service Provider (ISP)",
          description: `${BRAND_NAME} does not provide internet connectivity, telecommunications transmission, or direct utility services to residential or commercial premises.`,
        },
        {
          id: "lim-2",
          label: "Independent of Carrier Corporate Portals",
          description:
            "This website is operated independently for plan comparison and referral purposes and is not the official corporate website or account management portal of any ISP.",
        },
        {
          id: "lim-3",
          label: "No Network Ownership, Billing, or Field Dispatch",
          description:
            "We do not own fiber, coaxial, or wireless infrastructure, issue monthly subscriber bills, manage outages, or dispatch installation/repair technicians.",
        },
        {
          id: "lim-4",
          label: "Preview Figures Are Informational Estimates",
          description:
            "Displayed speeds, multi-year price guarantees, and equipment summaries represent preview reference offers and do not constitute a binding service contract.",
        },
      ] as DisclosurePoint[],
    },
    assistanceCard: {
      badgeLabel: "CONSUMER ASSISTANCE",
      title: "How Our Service Assists You",
      subtitle: "What you can expect when using our comparison tools and advisor referral flow:",
      points: [
        {
          id: "ast-1",
          label: "ZIP & Service Category Comparison",
          description:
            "We help households review typical speed tiers (300 Mbps, 500 Mbps, and 1 Gig) and compare which bandwidth class aligns with their daily usage.",
        },
        {
          id: "ast-2",
          label: "Promotional Offer & Term Research",
          description:
            "We summarize multi-year rate-lock structures, AutoPay discount requirements, equipment inclusions, and no-contract options in plain language.",
        },
        {
          id: "ast-3",
          label: "Direct Referral to Qualification Advisors",
          description:
            "Because exact coverage depends on street-level wiring, we connect callers with representatives who can check live address qualification and current carrier promos.",
        },
        {
          id: "ast-4",
          label: "No Advisory Fee for Plan Comparisons",
          description:
            "There is no separate fee charged by our comparison service to review broadband options or speak with an advisor; subscriber billing occurs solely with the chosen carrier.",
        },
      ] as DisclosurePoint[],
    },
  },

  serviceFaqAccordion: {
    badge: "SERVICE & REFERRAL FAQ",
    heading: "Questions About Our Comparison & Referral Service",
    intro:
      "Learn how our independent comparison process works, how availability is confirmed, and what to expect when speaking with an advisor.",
    items: [
      {
        id: "sfaq-1",
        question: "What connection types and geographic areas are covered?",
        answer:
          "Broadband availability varies block by block across U.S. ZIP codes. Depending on local infrastructure, participating providers may offer fiber-to-the-home, hybrid fiber-coaxial (cable), or fixed wireless connections. While our ZIP tool validates a 5-digit U.S. postal format, an advisor must check your exact street address and unit number to confirm which network technologies are active at your home.",
      },
      {
        id: "sfaq-2",
        question: `What is ${BRAND_NAME}'s relationship to internet service providers?`,
        answer: `${BRAND_NAME} is an ${BUSINESS_ROLE}. We are not a telecommunications carrier and do not own network lines. We publish comparison information and connect consumers with sales advisors who can verify address-level eligibility and help set up new residential service with participating providers. Our service may receive referral or marketing compensation when a consumer enrolls in a plan.`,
      },
      {
        id: "sfaq-3",
        question: "How does the comparison and advisor referral process work?",
        answer:
          "First, review the speed tiers and promotional summaries on this page and enter your 5-digit ZIP code. Next, use the configured phone contact or advisor dialog to speak with a representative. The representative checks live serviceability for your street address, explains exact monthly pricing including local taxes and AutoPay rules, and—only if you choose to proceed—assists with scheduling installation.",
      },
      {
        id: "sfaq-4",
        question: "Is there any fee to use this website or speak with an advisor?",
        answer:
          "No. Browsing plan information on this website and speaking with an advisor to check address availability or compare promotional tiers is free of charge. If you decide to order internet service, your monthly subscription, applicable taxes, and any carrier activation or installation charges are billed directly by the service provider you select.",
      },
      {
        id: "sfaq-5",
        question: "Why can advertised prices and promotional offers vary by address?",
        answer:
          "Internet providers structure promotions around regional network capacity, local competition, new-customer eligibility, and billing preferences such as bank AutoPay and paperless statements. As a result, a 5-year rate lock or specific speed tier shown as preview data on this site may differ from the live offers available at your physical address.",
      },
      {
        id: "sfaq-6",
        question: "Can you help if I want to review my existing internet plan or bill?",
        answer:
          "Our advisors can help you compare your current internet speed and monthly cost against available new-customer alternatives in your area. However, because we are an independent comparison service rather than your current carrier's billing department, changes to an existing carrier account, technical troubleshooting, or billing disputes must be handled directly with your current provider.",
      },
    ] as ServiceFaqItem[],
  },

  privacySummary: {
    badge: "PRIVACY & CONSUMER TRUST",
    heading: "How Location & Contact Details Are Handled",
    intro:
      "We believe in straightforward explanations of how information entered on this page works and how your communication choices are respected.",
    groups: [
      {
        id: "priv-1",
        subheading: "1. Why Location & ZIP Code Details Are Requested",
        body:
          "Residential internet speeds, network technologies, and promotional rate locks depend on local utility infrastructure. When you enter a 5-digit ZIP code in our checker, this site performs an immediate in-browser format check so you can carry that postal code into an advisor consultation. This preview website does not perform silent background database lookups or store your ZIP entry on an external server when you click 'Find My Plan'.",
      },
      {
        id: "priv-2",
        subheading: "2. How Contact Information Supports Requested Assistance",
        body:
          "When you choose to call the configured telephone number or email our support address, the details you share (such as your street address, unit number, and preferred speed tier) are used strictly to verify live carrier availability, explain applicable promotional terms, and assist with service setup if you request enrollment. Telephone calls are never initiated automatically by this website.",
      },
      {
        id: "priv-3",
        subheading: "3. Information Sharing Practices & Communication Choices",
        body:
          "If you decide to enroll in an internet plan during an advisor consultation, your order and service-address details are provided to the fulfilling carrier to provision your account and schedule installation. You are never obligated to place an order during a call, and you may request that the advisor or support contact refrain from follow-up outreach at any time.",
      },
    ] as PrivacySummaryGroup[],
  },

  footer: {
    description: `${BRAND_NAME} (${DOMAIN}) is an ${BUSINESS_ROLE} helping U.S. households review residential broadband speed tiers, multi-year promotional rate structures, and address qualification steps.`,
    navigationLinks: [
      { label: "Check ZIP Code", href: "#zip-checker" },
      { label: "Compare Internet Plans", href: "#plans" },
      { label: "Service Highlights", href: "#benefits" },
      { label: "Service Disclosures", href: "#disclosures" },
      { label: "Service & Referral FAQ", href: "#service-faq" },
    ],
    disclosureBoxText: `Important Notice: ${BRAND_NAME} is an ${BUSINESS_ROLE} and is not an internet service provider or the official website of any telecommunications carrier. All preview prices ($40/mo, $45/mo, $50/mo, and reduced-rate eligibility figures), speed tiers, equipment inclusions, and multi-year price protection summaries are informational reference examples subject to change and address-level verification. Actual availability, taxes, surcharges, AutoPay requirements, and contractual terms are determined solely by the participating service provider.`,
  },
};
