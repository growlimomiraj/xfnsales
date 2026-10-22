import React from "react";
import { SITE_CONTENT } from "../config/siteData";

export const PrivacySummary: React.FC = () => {
  const { badge, heading, intro, groups } = SITE_CONTENT.privacySummary;

  return (
    <section
      id="privacy-summary"
      aria-labelledby="privacy-summary-heading"
      className="w-full bg-[#F4F4F6] py-[60px] md:py-[76px]"
    >
      <div className="site-container">
        {/* Centered Header Block */}
        <div className="max-w-[720px] mx-auto text-center mb-9 md:mb-11">
          <div className="inline-block text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#6D2EFF] mb-3">
            {badge}
          </div>

          <h2
            id="privacy-summary-heading"
            className="text-[28px] sm:text-[35px] font-extrabold leading-[1.18] tracking-tight text-[#0A0A0A] mb-3.5"
            style={{ textWrap: "balance" }}
          >
            {heading}
          </h2>

          <p className="text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#5A5A5A]">
            {intro}
          </p>
        </div>

        {/* Single Centered White Card within ~900px outer container, 20px radius, fine gray border, 32px 28px padding */}
        <div className="max-w-[900px] mx-auto">
          <div
            className="bg-[#FFFFFF] rounded-[20px] border border-[#E6E6EA] px-6 py-7 sm:px-[28px] sm:py-[32px] divide-y divide-[#E6E6EA]"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {groups.map((group, idx) => (
              <div
                key={group.id}
                className={
                  idx === 0
                    ? "pb-6"
                    : idx === groups.length - 1
                    ? "pt-6"
                    : "py-6"
                }
              >
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0A0A0A] mb-2 leading-snug">
                  {group.subheading}
                </h3>
                <p className="text-[15px] sm:text-[15.5px] leading-[1.62] text-[#5A5A5A]">
                  {group.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
