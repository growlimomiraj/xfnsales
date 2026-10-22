import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_CONTENT } from "../config/siteData";

export const ServiceFaqAccordion: React.FC = () => {
  const { badge, heading, intro, items } = SITE_CONTENT.serviceFaqAccordion;
  // Open the first item initially per Section 4.K
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="service-faq"
      aria-labelledby="service-faq-heading"
      className="w-full bg-[#FFFFFF] py-[60px] md:py-[80px] border-b border-[#E6E6EA]"
    >
      <div className="site-container">
        {/* Centered Header Block */}
        <div className="max-w-[720px] mx-auto text-center mb-10 md:mb-12">
          <div className="inline-block text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#6D2EFF] mb-3">
            {badge}
          </div>

          <h2
            id="service-faq-heading"
            className="text-[28px] sm:text-[35px] font-extrabold leading-[1.18] tracking-tight text-[#0A0A0A] mb-3.5"
            style={{ textWrap: "balance" }}
          >
            {heading}
          </h2>

          <p className="text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#5A5A5A]">
            {intro}
          </p>
        </div>

        {/* Narrow Centered Stack (~840px wide) */}
        <div className="max-w-[840px] mx-auto space-y-3.5">
          {items.map((item) => {
            const isExpanded = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div
                key={item.id}
                className={`rounded-[16px] bg-[#FFFFFF] border transition-colors ${
                  isExpanded
                    ? "border-[#6D2EFF] shadow-[0_6px_20px_rgba(109,46,255,0.08)]"
                    : "border-[#E6E6EA] hover:border-[#C9C9D1]"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-5 py-4.5 sm:px-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer rounded-[16px]"
                  >
                    <span className="text-[16.5px] sm:text-[18px] font-bold leading-[1.35] text-[#0A0A0A]">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`w-9 h-9 rounded-[10px] inline-flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded
                          ? "bg-[#EFEAFF] text-[#6D2EFF]"
                          : "bg-[#F4F4F6] text-[#5A5A5A]"
                      }`}
                    >
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                        strokeWidth={2.4}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isExpanded}
                  className={isExpanded ? "block" : "hidden"}
                >
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-[15px] sm:text-[16px] leading-[1.62] text-[#5A5A5A] border-t border-[#F0EDF8]">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
