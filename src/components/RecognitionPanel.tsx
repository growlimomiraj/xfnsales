import React from "react";
import { Wifi } from "lucide-react";
import { SITE_CONTENT } from "../config/siteData";

export const RecognitionPanel: React.FC = () => {
  const { heading, supportingLine, badgeText } = SITE_CONTENT.recognitionPanel;

  return (
    <section
      id="benefits"
      aria-labelledby="recognition-panel-heading"
      className="w-full bg-[#F4F4F6] pt-4 pb-6"
    >
      <div className="site-container">
        {/* G. Wide, centered, rounded lavender-gradient panel (~24px radius, 48px vertical / 28px horizontal padding, ~220px desktop height) */}
        <div
          className="w-full rounded-[24px] px-6 py-10 sm:px-[28px] sm:py-[48px] min-h-[220px] flex flex-col items-center justify-center text-center border border-[#E2D9FA]"
          style={{ background: "var(--gradient-recognition)" }}
        >
          <h2
            id="recognition-panel-heading"
            className="text-[22px] sm:text-[27px] font-extrabold leading-[1.25] tracking-tight text-[#6D2EFF] max-w-[780px] mb-3"
            style={{ textWrap: "balance" }}
          >
            {heading}
          </h2>

          <p className="text-[15px] sm:text-[16.5px] leading-[1.55] text-[#3B354C] max-w-[740px] mb-6">
            {supportingLine}
          </p>

          {/* Small WiFi-style icon and letter-spaced badge line beneath */}
          <div className="inline-flex items-center gap-2.5 text-[#2B0A6E]">
            <Wifi className="w-5 h-5 text-[#6D2EFF] shrink-0" strokeWidth={2.4} aria-hidden="true" />
            <span className="text-[12px] sm:text-[13px] font-extrabold tracking-[0.14em] uppercase">
              {badgeText}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
