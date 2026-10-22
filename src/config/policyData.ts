import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  SUPPORT_EMAIL,
} from "./siteData";

export type PolicyType = "privacy" | "terms" | "disclaimer";

export interface PolicySection {
  heading?: string;
  paragraphs: string[];
}

export interface PolicyDocument {
  id: PolicyType;
  title: string;
  effectiveDate: string;
  sections: PolicySection[];
}

export const POLICY_DOCUMENTS: Record<PolicyType, PolicyDocument> = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    effectiveDate: "January 1, 2026",
    sections: [
      {
        paragraphs: [
          `${BRAND_NAME} (${DOMAIN}) operates as an independent broadband comparison and referral concierge. We respect your privacy and are committed to protecting personal data submitted through our address availability checker.`,
        ],
      },
      {
        heading: "Information We Collect",
        paragraphs: [
          "We collect contact information (phone number, optional email) and address details (ZIP code and street location) strictly to query telecommunication coverage databases and match your household with compatible providers.",
        ],
      },
      {
        heading: "How We Use Information",
        paragraphs: [
          "We use your information solely to determine physical line availability, compare provider promo tiers, and connect you with certified carrier specialists. We never sell your personal contact info to third-party list brokers.",
        ],
      },
      {
        heading: "Contact & Opt-Out",
        paragraphs: [
          `You may opt out of future communications at any time by calling our support line at ${PHONE_DISPLAY} or emailing ${SUPPORT_EMAIL}.`,
        ],
      },
    ],
  },

  terms: {
    id: "terms",
    title: "Terms & Conditions",
    effectiveDate: "January 1, 2026",
    sections: [
      {
        paragraphs: [
          `By using ${DOMAIN} and submitting inquiries through our platform, you agree to these Terms and Conditions.`,
        ],
      },
      {
        heading: "Independent Referral Service",
        paragraphs: [
          `${BRAND_NAME} is an independent third-party comparison service and referral advisor. We do not own, operate, or maintain physical telecommunication lines. All network services, speeds, billing, and installation procedures are managed directly by the participating service provider.`,
        ],
      },
      {
        heading: "Availability & Pricing",
        paragraphs: [
          "Advertised plans, promotional rates (e.g. $40–$50/mo and under $15/mo for eligible households), equipment charges, and download/upload speeds are subject to carrier confirmation at your exact physical service address.",
        ],
      },
    ],
  },

  disclaimer: {
    id: "disclaimer",
    title: "Full Legal Disclaimer & Disclosures",
    effectiveDate: "January 1, 2026",
    sections: [
      {
        heading: "Independent Advisory Notice",
        paragraphs: [
          `${DOMAIN} is an independent third-party referral service and service advisor for participating telecommunications providers. Service availability, pricing, promotions, package options, speeds, channel lineups, equipment, and features vary by provider, service address, ZIP code, and customer eligibility.`,
          `All advertised prices ($40 to $50/mo), discounts, rebates, and special incentives are subject to change or cancellation without notice and may be available for a limited time only. ${BRAND_NAME} does not guarantee provider pricing, service speeds, coverage, or installation timelines.`,
        ],
      },
    ],
  },
};
