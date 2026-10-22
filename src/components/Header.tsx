import React from "react";
import { Phone } from "lucide-react";
import {
  BRAND_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  getWordmarkParts,
  hasValidPhoneDestination,
} from "../config/siteData";

interface HeaderProps {
  onOpenAdvisor: (context?: { source: string; planName?: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdvisor }) => {
  const wordmark = getWordmarkParts(BRAND_NAME);
  const validPhone = hasValidPhoneDestination(PHONE_E164);

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#E6E6EA] sticky top-0 z-30">
      <div className="site-container min-h-[65px] flex items-center justify-between gap-4 py-2">
        {/* Left: Compact Wordmark (~25px, weight 600, dark leading text + purple ending portion) */}
        <a
          href="#zip-checker"
          className="text-[20px] sm:text-[25px] font-semibold tracking-tight leading-none text-[#0A0A0A] no-underline whitespace-nowrap shrink-0"
          aria-label={`${BRAND_NAME} — Return to top`}
        >
          <span>{wordmark.leading}</span>
          <span className="text-[#6D2EFF]">{wordmark.accent}</span>
        </a>

        {/* Right: Purple Pill-Shaped Telephone CTA (~44-45px height, 15px bold, 11px 21px padding) */}
        {validPhone ? (
          <a
            href={`tel:${PHONE_E164.trim()}`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] py-[11px] px-[16px] sm:px-[21px] rounded-full bg-[#6D2EFF] hover:bg-[#5A1FE0] active:bg-[#4B16C4] text-[#FFFFFF] text-[14px] sm:text-[15px] font-bold leading-none no-underline transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="tabular-price">{PHONE_DISPLAY}</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() =>
              onOpenAdvisor({
                source: "Header Telephone CTA",
              })
            }
            className="inline-flex items-center justify-center gap-2 min-h-[44px] py-[11px] px-[16px] sm:px-[21px] rounded-full bg-[#6D2EFF] hover:bg-[#5A1FE0] active:bg-[#4B16C4] text-[#FFFFFF] text-[14px] sm:text-[15px] font-bold leading-none transition-colors cursor-pointer whitespace-nowrap shrink-0"
            aria-label={`Call or configure phone number ${PHONE_DISPLAY}`}
          >
            <Phone className="w-4 h-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="tabular-price">{PHONE_DISPLAY}</span>
          </button>
        )}
      </div>
    </header>
  );
};
