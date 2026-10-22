import React from "react";
import { Phone, Mail } from "lucide-react";
import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  PHONE_E164,
  SUPPORT_EMAIL,
  BUSINESS_ROLE,
  SITE_CONTENT,
  getWordmarkParts,
  hasValidPhoneDestination,
  hasValidEmailDestination,
} from "../config/siteData";
import { PolicyType } from "../config/policyData";

interface FooterProps {
  onOpenPolicy: (policy: PolicyType) => void;
  onOpenAdvisor: (context?: { source: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onOpenAdvisor,
}) => {
  const wordmark = getWordmarkParts(BRAND_NAME);
  const validPhone = hasValidPhoneDestination(PHONE_E164);
  const validEmail = hasValidEmailDestination(SUPPORT_EMAIL);
  const currentYear = new Date().getFullYear();
  const { description, navigationLinks, disclosureBoxText } = SITE_CONTENT.footer;

  return (
    <footer
      aria-label="Site Footer and Legal Disclosures"
      className="w-full bg-[#2B0A6E] text-[#D7CEEB] pt-[52px] pb-[32px] md:pt-[64px] md:pb-[36px]"
    >
      <div className="site-container">
        {/* Three columns with approximate proportions 2:1:1 and ~36px column gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 pb-11">
          {/* Column 1 (2 parts wide on desktop): XFN-style brand wordmark, short business description, phone, email */}
          <div className="lg:col-span-2 max-w-[520px]">
            <a
              href="#zip-checker"
              className="inline-block text-[24px] sm:text-[26px] font-semibold tracking-tight leading-none text-[#FFFFFF] no-underline mb-4"
            >
              <span>{wordmark.leading}</span>
              <span className="text-[#B594FF]">{wordmark.accent}</span>
            </a>

            <p className="text-[14.5px] sm:text-[15px] leading-[1.6] text-[#D7CEEB] mb-5">
              {description}
            </p>

            <div className="space-y-2.5 text-[14.5px] sm:text-[15px]">
              <div className="flex items-center gap-2.5">
                <Phone
                  className="w-4 h-4 text-[#B594FF] shrink-0"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span className="text-white/80 font-medium">Telephone:</span>
                {validPhone ? (
                  <a
                    href={`tel:${PHONE_E164.trim()}`}
                    className="font-bold text-[#C6B2FF] hover:text-[#FFFFFF] underline underline-offset-4 transition-colors tabular-price"
                  >
                    {PHONE_DISPLAY}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAdvisor({ source: "Footer Telephone Contact" })
                    }
                    className="font-bold text-[#C6B2FF] hover:text-[#FFFFFF] underline underline-offset-4 transition-colors cursor-pointer tabular-price text-left"
                  >
                    {PHONE_DISPLAY} (Configure phone routing)
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Mail
                  className="w-4 h-4 text-[#B594FF] shrink-0"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span className="text-white/80 font-medium">Support Email:</span>
                {validEmail ? (
                  <a
                    href={`mailto:${SUPPORT_EMAIL.trim()}`}
                    className="font-bold text-[#C6B2FF] hover:text-[#FFFFFF] underline underline-offset-4 transition-colors"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAdvisor({ source: "Footer Support Email Contact" })
                    }
                    className="font-bold text-[#C6B2FF] hover:text-[#FFFFFF] underline underline-offset-4 transition-colors cursor-pointer text-left"
                  >
                    {SUPPORT_EMAIL} (Configure email)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Column 2 (1 part wide): 5 internal navigation links mapped to actual page sections */}
          <div>
            <h2 className="text-[16px] font-extrabold tracking-tight text-[#FFFFFF] mb-4">
              Quick Navigation
            </h2>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14.5px] sm:text-[15px] font-medium text-[#C6B2FF] hover:text-[#FFFFFF] hover:underline underline-offset-4 transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (1 part wide): Controls for Privacy Policy, Terms & Conditions, and Full Disclaimer */}
          <div>
            <h2 className="text-[16px] font-extrabold tracking-tight text-[#FFFFFF] mb-4">
              Consumer Policies &amp; Legal
            </h2>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("privacy")}
                  className="text-[14.5px] sm:text-[15px] font-medium text-[#C6B2FF] hover:text-[#FFFFFF] hover:underline underline-offset-4 transition-colors cursor-pointer py-0.5 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("terms")}
                  className="text-[14.5px] sm:text-[15px] font-medium text-[#C6B2FF] hover:text-[#FFFFFF] hover:underline underline-offset-4 transition-colors cursor-pointer py-0.5 text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("disclaimer")}
                  className="text-[14.5px] sm:text-[15px] font-medium text-[#C6B2FF] hover:text-[#FFFFFF] hover:underline underline-offset-4 transition-colors cursor-pointer py-0.5 text-left"
                >
                  Full Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Subtle Separator */}
        <hr className="border-0 border-t border-white/15 mb-6" />

        {/* Full-Width Rounded Disclosure Box */}
        <div className="w-full rounded-[16px] bg-white/[0.06] border border-white/15 px-5 py-4 sm:px-6 sm:py-5 mb-6">
          <p className="text-[12.5px] sm:text-[13px] leading-[1.6] text-[#D7CEEB]">
            {disclosureBoxText}
          </p>
        </div>

        {/* Final Row: Configured brand/domain copyright at left and short business-role label at right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[13px] text-[#C8BCE3]">
          <div>
            &copy; {currentYear} {BRAND_NAME} ({DOMAIN}). All rights reserved.
          </div>
          <div className="font-medium text-white/85 capitalize">
            {BUSINESS_ROLE}
          </div>
        </div>
      </div>
    </footer>
  );
};
