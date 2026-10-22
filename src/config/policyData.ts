import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
  BUSINESS_ROLE,
} from "./siteData";

export type PolicyType = "privacy" | "terms" | "disclaimer";

export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyDocument {
  id: PolicyType;
  title: string;
  effectiveDate: string;
  draftNotice: string;
  sections: PolicySection[];
}

export const POLICY_DOCUMENTS: Record<PolicyType, PolicyDocument> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy (Draft Template)",
    effectiveDate: "[EFFECTIVE DATE — e.g., October 21, 2026]",
    draftNotice:
      "DRAFT CONFIGURATION NOTICE: Bracketed fields ([YOUR BRAND], [YOUR LEGAL ENTITY NAME], [YOUR BUSINESS ADDRESS], [YOUR SUPPORT EMAIL]) must be completed and reviewed by the site owner before live production use.",
    sections: [
      {
        heading: "1. Scope & Business Identity",
        paragraphs: [
          `This Privacy Policy describes how ${BRAND_NAME} ("[YOUR LEGAL ENTITY NAME]"), operating at ${DOMAIN} as an ${BUSINESS_ROLE}, handles information when you visit this website or contact our team via telephone (${PHONE_DISPLAY}) or email (${SUPPORT_EMAIL}).`,
          "This website is designed as an informational broadband comparison and advisor referral resource. We do not operate as a broadband carrier or utility provider.",
        ],
      },
      {
        heading: "2. Information Handled in the Browser vs. Direct Contact",
        paragraphs: [
          "ZIP Code Format Checker: When you enter a 5-digit postal code into the on-page ZIP checker, format validation occurs locally within your web browser to open the advisor consultation dialog. Entering a ZIP code alone does not transmit personal data to third-party brokers.",
          "Voluntary Direct Contact: If you choose to call our configured telephone line or send an email to our support address, you may provide your name, callback number, street address, and household bandwidth preferences so an advisor can check live carrier serviceability.",
        ],
      },
      {
        heading: "3. How Requested Information Is Used",
        paragraphs: [
          "Information voluntarily shared during a telephone consultation or email inquiry is used to: (a) check whether participating broadband providers service your specific street address, (b) explain applicable monthly rates, AutoPay requirements, and equipment terms, and (c) connect you with order fulfillment if you explicitly ask to enroll in a plan.",
        ],
      },
      {
        heading: "4. Sharing & Referral Disclosures",
        paragraphs: [
          "When you ask to check live address qualification or place a service order, necessary service-address and order details are shared with the participating telecommunications provider or authorized fulfillment partner serving your area.",
          "Owner Configuration Placeholder: Specify any analytics, call-routing vendors, or CRM processors used by [YOUR LEGAL ENTITY NAME] here prior to production launch.",
        ],
      },
      {
        heading: "5. Your Choices & Contact Rights",
        paragraphs: [
          `You may use this website to review preview comparison tiers without submitting personal contact information. For questions regarding privacy practices or to submit a data inquiry, contact [YOUR LEGAL ENTITY NAME] at ${SUPPORT_EMAIL} or by mail at [YOUR BUSINESS MAILING ADDRESS].`,
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms & Conditions (Draft Template)",
    effectiveDate: "[EFFECTIVE DATE — e.g., October 21, 2026]",
    draftNotice:
      "DRAFT CONFIGURATION NOTICE: Bracketed legal-entity, governing-law, and contact placeholders must be finalized by the site owner prior to commercial deployment.",
    sections: [
      {
        heading: "1. Agreement to Terms & Independent Role",
        paragraphs: [
          `By accessing ${DOMAIN}, operated by ${BRAND_NAME} ("[YOUR LEGAL ENTITY NAME]"), you acknowledge that ${BRAND_NAME} is an ${BUSINESS_ROLE} and not an internet service provider (ISP), local exchange carrier, or government agency.`,
        ],
      },
      {
        heading: "2. Informational Nature of Preview Offers",
        paragraphs: [
          "All broadband plans, speeds (including 300 Mbps, 500 Mbps, and 1 Gig), introductory prices ($40/mo, $45/mo, $50/mo), 5-year rate protection summaries, equipment inclusions, and reduced-rate eligibility descriptions (<$15/mo) displayed on this website are preview reference figures for comparison purposes.",
          "Nothing on this website constitutes a binding offer or service contract. Actual service availability, connection technology, installation fees, taxes, and subscriber agreements are established solely between you and the fulfilling telecommunications carrier.",
        ],
      },
      {
        heading: "3. ZIP Code Format Check vs. Live Service Coverage",
        paragraphs: [
          "The ZIP code input tool on this website validates that an entry consists of five numeric digits (including leading zeros). Validation of a 5-digit ZIP format does not confirm that any specific provider or speed tier is available at your physical street address.",
        ],
      },
      {
        heading: "4. No Advisory Fees & Carrier Billing",
        paragraphs: [
          `${BRAND_NAME} does not charge consumers a fee to view comparison content or speak with a plan advisor. If you enroll in a broadband plan through a participating provider, all recurring monthly charges, equipment leases, taxes, and surcharges are billed directly by that carrier under its subscriber agreement.`,
        ],
      },
      {
        heading: "5. Limitation of Liability & Governing Law",
        paragraphs: [
          `To the fullest extent permitted by applicable law in [YOUR STATE/JURISDICTION], ${BRAND_NAME} ("[YOUR LEGAL ENTITY NAME]") is not liable for carrier network outages, installation delays, throughput variations, or changes to carrier promotional pricing. Questions about these Terms may be directed to ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },

  disclaimer: {
    id: "disclaimer",
    title: "Full Service & Offer Disclaimer",
    effectiveDate: "[EFFECTIVE DATE — e.g., October 21, 2026]",
    draftNotice:
      "IMPORTANT HANDOVER NOTICE: Verify all promotional pricing, rate-lock periods, and carrier attribution rules against active partner agreements before publishing live traffic.",
    sections: [
      {
        heading: "1. Independent Comparison & Referral Service Disclosure",
        paragraphs: [
          `${BRAND_NAME} (${DOMAIN}) is an ${BUSINESS_ROLE}. We are not owned by, operated by, or acting as the official corporate portal of any internet service provider. We help consumers compare broadband tiers and connect with representatives who verify address-level availability. ${BRAND_NAME} may receive referral or marketing compensation when a consumer orders service through a participating partner.`,
        ],
      },
      {
        heading: "2. Preview Pricing, Rate Guarantees & AutoPay Terms",
        paragraphs: [
          "Preview rates shown on this page—including $40/mo for 300 Mbps, $45/mo for 500 Mbps, and $50/mo for Gigabit (1000 Mbps)—are unconfirmed preview reference figures modeled on promotional residential tiers requiring enrollment in paperless billing and automatic payments from a qualifying bank account.",
          "Multi-year price protection (such as a 5-year / 60-month price guarantee) applies only to the base monthly internet service charge for qualifying new residential accounts at the original installation address. It does not freeze federal, state, or local taxes, universal service fees, regulatory recovery fees, or optional add-on services.",
        ],
      },
      {
        heading: "3. Speeds, Equipment & Network Management",
        paragraphs: [
          "Referenced speeds (300 Mbps, 500 Mbps, 1 Gig / 1000 Mbps) represent maximum wired download speeds under optimal network conditions. Actual wireless (WiFi) speeds vary based on device capability, home layout, interference, and network congestion.",
          "Where WiFi gateway equipment and unlimited data are listed as included, terms apply to one standard carrier-issued gateway per household. Unreturned equipment upon cancellation is subject to carrier non-return fees.",
        ],
      },
      {
        heading: "4. Qualifying Household Discount Programs",
        paragraphs: [
          "References to essential broadband plans under $15/month apply strictly to qualifying low-income households that apply for and are approved under a participating carrier's income-constrained or public-assistance connectivity program. Eligibility criteria and application approval are managed exclusively by the carrier.",
        ],
      },
      {
        heading: "5. Trademarks & Contact Information",
        paragraphs: [
          `All third-party product names, speed designations, or carrier marks belong to their respective owners and are referenced strictly for comparative identification. To configure or inquire about this site's disclosures, contact ${BRAND_NAME} at ${SUPPORT_EMAIL} or ${PHONE_DISPLAY}.`,
        ],
      },
    ],
  },
};
