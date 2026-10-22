import React from "react";
import { SITE_CONTENT } from "../config/siteData";

interface EligibilityBannerProps {
  onSelectEligibility: () => void;
}

export const EligibilityBanner: React.FC<EligibilityBannerProps> = ({
  onSelectEligibility,
}) => {
  const {
    programLabel,
    headline,
    supportingCopy,
    ctaLabel,
    conditionsFinePrint,
  } = SITE_CONTENT.eligibilityBanner;

  return (
    <section
      aria-labelledby="eligibility-strip-heading"
      className="w-full bg-[#F4F4F6] pt-2 pb-10 md:pb-12"
    >
      <div className="site-container">
        {/* H. Broad purple-gradient strip with 24px radius, ~34px vertical & 44px horizontal padding, 3 aligned desktop regions */}
        <div
          className="w-full rounded-[24px] px-6 py-8 sm:px-[44px] sm:py-[34px] text-[#FFFFFF] shadow-[0_8px_28px_rgba(43,10,110,0.16)]"
          style={{ background: "var(--gradient-eligibility)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Region: Short program label */}
            <div className="lg:w-[190px] shrink-0">
              <span className="inline-block text-[12px] sm:text-[13px] font-extrabold tracking-[0.14em] uppercase text-[#E4D8FF] border-b-2 border-[#FFFFFF]/30 pb-1">
                {programLabel}
              </span>
            </div>

            {/* Center Region: White headline and supporting copy */}
            <div className="flex-1 max-w-[600px]">
              <h2
                id="eligibility-strip-heading"
                className="text-[22px] sm:text-[26px] font-extrabold leading-[1.22] tracking-tight text-[#FFFFFF] mb-2"
              >
                {headline}
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.5] text-white/90">
                {supportingCopy}
              </p>
            </div>

            {/* Right Region: White pill CTA */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onSelectEligibility}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-[#FFFFFF] hover:bg-[#F4F0FF] active:bg-[#E7DFFF] text-[#0A0A0A] text-[15px] font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>

        {/* Compact centered conditions paragraph below this strip */}
        <p className="mt-5 max-w-[880px] mx-auto text-center text-[12.5px] sm:text-[13px] leading-[1.55] text-[#5A5A5A]">
          {conditionsFinePrint}
        </p>
      </div>
    </section>
  );
};
