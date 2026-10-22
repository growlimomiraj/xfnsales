import React from "react";
import { Check } from "lucide-react";
import { SITE_CONTENT, ComparisonTier } from "../config/siteData";

interface PlanComparisonProps {
  onSelectTier: (tierName: string, priceDollars: number) => void;
  onViewDetails: (title: string, details: ComparisonTier["fullDetails"]) => void;
}

export const PlanComparison: React.FC<PlanComparisonProps> = ({
  onSelectTier,
  onViewDetails,
}) => {
  const {
    headingPrefix,
    headingAccent,
    subheading,
    tiers,
    conditionsFinePrint,
  } = SITE_CONTENT.planComparison;

  return (
    <section
      id="plans"
      aria-labelledby="plan-comparison-heading"
      className="w-full bg-[#F4F4F6] py-[52px] md:py-[72px]"
    >
      <div className="site-container">
        {/* Left-aligned heading ~33px, weight 800, concluding phrase emphasized in purple */}
        <div className="max-w-[780px] mb-9 md:mb-11">
          <h2
            id="plan-comparison-heading"
            className="text-[27px] sm:text-[33px] font-extrabold leading-[1.18] tracking-tight text-[#0A0A0A] mb-3"
          >
            <span>{headingPrefix}</span>
            <span className="text-[#6D2EFF]">{headingAccent}</span>
          </h2>
          <p className="text-[15.5px] sm:text-[16.5px] leading-[1.55] text-[#5A5A5A]">
            {subheading}
          </p>
        </div>

        {/* Three equal-height white cards (~360px wide at desktop, 26px gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px] items-stretch">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className="bg-[#FFFFFF] rounded-[16px] border border-[#E6E6EA] p-6 sm:px-[30px] sm:py-[32px] flex flex-col justify-between h-full"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div>
                {/* Purple speed label */}
                <div className="text-[24px] sm:text-[26px] font-extrabold leading-tight text-[#6D2EFF] mb-2">
                  {tier.speedLabel}
                </div>

                {/* Short bold household-use descriptor */}
                <h3 className="text-[16px] sm:text-[17px] font-bold leading-[1.4] text-[#0A0A0A] mb-6 min-h-[46px]">
                  {tier.householdDescriptor}
                </h3>

                {/* Large black price and small billing-period text */}
                <div className="flex items-baseline gap-1.5 pb-6 mb-6 border-b border-[#E6E6EA]">
                  <div className="inline-flex items-start text-[#0A0A0A] leading-none">
                    <span className="text-[26px] sm:text-[30px] font-extrabold mt-2 mr-0.5">
                      $
                    </span>
                    <span className="text-[58px] sm:text-[68px] font-extrabold tracking-tight leading-[0.88] tabular-price">
                      {tier.priceDollars}
                    </span>
                  </div>
                  <div className="flex flex-col pl-1">
                    <span className="text-[18px] font-extrabold text-[#0A0A0A] leading-tight">
                      {tier.billingPeriodLabel}
                    </span>
                    <span className="text-[13px] font-medium text-[#5A5A5A] leading-snug">
                      {tier.promoDurationNote}
                    </span>
                  </div>
                </div>

                {/* Vertical list of 5 benefit rows with purple circular check icons */}
                <ul className="space-y-3.5 mb-8" aria-label={`${tier.speedLabel} plan benefits`}>
                  {tier.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[15px] leading-[1.45] text-[#0A0A0A]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 w-5 h-5 rounded-full bg-[#6D2EFF] text-[#FFFFFF] inline-flex items-center justify-center shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anchored bottom actions: Outlined pill CTA + Underlined details link */}
              <div className="pt-2 mt-auto flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onSelectTier(
                      `${tier.speedLabel} Home Internet Plan`,
                      tier.priceDollars
                    )
                  }
                  className="w-full min-h-[48px] px-6 py-3 rounded-full border-2 border-[#0A0A0A] bg-transparent hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FFFFFF] text-[15px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  {tier.ctaLabel}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onViewDetails(
                      `${tier.speedLabel} Internet Plan ($${tier.priceDollars}/mo)`,
                      tier.fullDetails
                    )
                  }
                  className="text-[14px] font-semibold text-[#0A0A0A] hover:text-[#6D2EFF] underline underline-offset-4 py-1 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {tier.detailsLabel}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Separate compact conditions paragraph below the grid */}
        <p className="mt-8 max-w-[920px] mx-auto text-center text-[12.5px] sm:text-[13px] leading-[1.55] text-[#5A5A5A]">
          {conditionsFinePrint}
        </p>
      </div>
    </section>
  );
};
