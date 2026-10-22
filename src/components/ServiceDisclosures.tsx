import React from "react";
import { Check, Minus } from "lucide-react";
import { SITE_CONTENT } from "../config/siteData";

export const ServiceDisclosures: React.FC = () => {
  const {
    badge,
    heading,
    description,
    limitationsCard,
    assistanceCard,
  } = SITE_CONTENT.serviceDisclosures;

  return (
    <section
      id="disclosures"
      aria-labelledby="service-disclosures-heading"
      className="w-full bg-[#F3EEFF] py-[64px] md:py-[90px] border-t border-b border-[#E3D8FF]"
    >
      <div className="site-container">
        {/* Centered Header Block (~720px wide) */}
        <div className="max-w-[720px] mx-auto text-center mb-11 md:mb-14">
          <div className="inline-block text-[12px] font-extrabold tracking-[0.14em] uppercase text-[#5B21E0] mb-3">
            {badge}
          </div>

          <h2
            id="service-disclosures-heading"
            className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.16] tracking-tight text-[#0A0A0A] mb-4"
            style={{ textWrap: "balance" }}
          >
            {heading}
          </h2>

          <p className="text-[15.5px] sm:text-[17px] leading-[1.6] text-[#4A4458]">
            {description}
          </p>
        </div>

        {/* Two Large White Cards Side by Side (24px grid gap, 20px card radius, 32px 28px padding) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-stretch">
          {/* Card 1: Limitations / Service Boundaries (Subtle cool-neutral tonal header & minus icons) */}
          <article
            className="bg-[#FFFFFF] rounded-[20px] border border-[#DCD6EA] px-6 py-7 sm:px-[28px] sm:py-[32px] flex flex-col justify-between"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E6E6EA]">
                <div>
                  <span className="block text-[11.5px] font-extrabold tracking-[0.13em] uppercase text-[#5A5A5A] mb-1">
                    {limitationsCard.badgeLabel}
                  </span>
                  <h3 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#0A0A0A]">
                    {limitationsCard.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-[12px] bg-[#F4F4F6] border border-[#DCDCE2] text-[#3A3A44] inline-flex items-center justify-center shrink-0"
                >
                  <Minus className="w-5 h-5" strokeWidth={2.6} />
                </span>
              </div>

              <p className="text-[14.5px] sm:text-[15px] text-[#5A5A5A] mb-6 leading-[1.5]">
                {limitationsCard.subtitle}
              </p>

              <ul className="space-y-5" aria-label={limitationsCard.title}>
                {limitationsCard.points.map((point) => (
                  <li key={point.id} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-6 h-6 rounded-full bg-[#EDEDFA] border border-[#D4CEE6] text-[#3F3A52] inline-flex items-center justify-center shrink-0"
                    >
                      <Minus className="w-3.5 h-3.5" strokeWidth={2.8} />
                    </span>
                    <div>
                      <h4 className="text-[15.5px] sm:text-[16px] font-bold text-[#0A0A0A] leading-snug mb-1">
                        {point.label}
                      </h4>
                      <p className="text-[14.5px] sm:text-[15px] leading-[1.55] text-[#5A5A5A]">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Card 2: Assistance Offered (Primary purple tonal header & check icons) */}
          <article
            className="bg-[#FFFFFF] rounded-[20px] border border-[#D2C2FF] px-6 py-7 sm:px-[28px] sm:py-[32px] flex flex-col justify-between"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-[#EAE3FF]">
                <div>
                  <span className="block text-[11.5px] font-extrabold tracking-[0.13em] uppercase text-[#6D2EFF] mb-1">
                    {assistanceCard.badgeLabel}
                  </span>
                  <h3 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#0A0A0A]">
                    {assistanceCard.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-[12px] bg-[#EFEAFF] border border-[#D9C9FF] text-[#6D2EFF] inline-flex items-center justify-center shrink-0"
                >
                  <Check className="w-5 h-5" strokeWidth={2.8} />
                </span>
              </div>

              <p className="text-[14.5px] sm:text-[15px] text-[#5A5A5A] mb-6 leading-[1.5]">
                {assistanceCard.subtitle}
              </p>

              <ul className="space-y-5" aria-label={assistanceCard.title}>
                {assistanceCard.points.map((point) => (
                  <li key={point.id} className="flex items-start gap-3.5">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 w-6 h-6 rounded-full bg-[#6D2EFF] text-[#FFFFFF] inline-flex items-center justify-center shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <div>
                      <h4 className="text-[15.5px] sm:text-[16px] font-bold text-[#0A0A0A] leading-snug mb-1">
                        {point.label}
                      </h4>
                      <p className="text-[14.5px] sm:text-[15px] leading-[1.55] text-[#5A5A5A]">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
