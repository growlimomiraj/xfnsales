import React from "react";
import { SITE_CONTENT, FeaturedOffer } from "../config/siteData";

interface FeaturedOffersProps {
  onSelectOffer: (offerName: string, priceDollars: number) => void;
  onViewDetails: (title: string, details: FeaturedOffer["fullDetails"]) => void;
}

export const FeaturedOffers: React.FC<FeaturedOffersProps> = ({
  onSelectOffer,
  onViewDetails,
}) => {
  const { featuredOffers, featuredOffersFinePrint } = SITE_CONTENT;

  return (
    <section
      aria-label="Featured Internet Offers"
      className="w-full bg-[#F4F4F6] pb-10 md:pb-12"
    >
      <div className="site-container">
        {/* E. Two equal-width white offer cards overlapping the hero's lower edge by ~84px */}
        <div className="relative z-20 -mt-[64px] md:-mt-[84px] grid grid-cols-1 md:grid-cols-2 gap-[26px]">
          {featuredOffers.map((offer) => (
            <article
              key={offer.id}
              className="bg-[#FFFFFF] rounded-[16px] border border-[#E6E6EA] px-6 py-7 sm:px-[32px] sm:py-[34px] min-h-[293px] flex flex-col justify-between"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div>
                {/* Heading with speed-related portion in purple */}
                <h3 className="text-[23px] sm:text-[26px] font-extrabold leading-[1.22] tracking-tight text-[#0A0A0A] mb-2">
                  <span className="text-[#6D2EFF]">{offer.speedPrefix}</span>{" "}
                  <span>{offer.titleRemainder}</span>
                </h3>

                {/* Muted supporting line */}
                <p className="text-[15px] sm:text-[16px] leading-[1.5] text-[#5A5A5A] mb-6">
                  {offer.supportingLine}
                </p>
              </div>

              <div>
                {/* Large real-text price construction (~72px numeral, raised $, compact adjacent billing-period text) */}
                <div className="flex items-baseline gap-1.5 mb-6">
                  <div className=" inline-flex items-start text-[#0A0A0A] leading-none">
                    <span className="text-[28px] sm:text-[32px] font-extrabold mt-2 mr-0.5">
                      $
                    </span>
                    <span className="text-[60px] sm:text-[72px] font-extrabold tracking-tight leading-[0.88] tabular-price">
                      {offer.priceDollars}
                    </span>
                  </div>
                  <div className="flex flex-col pl-1">
                    <span className="text-[18px] sm:text-[20px] font-extrabold text-[#0A0A0A] leading-tight">
                      {offer.billingPeriodLabel}
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-medium text-[#5A5A5A] leading-snug">
                      {offer.promoGuaranteeNote}
                    </span>
                  </div>
                </div>

                {/* Dark pill CTA + underlined pricing-details action */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectOffer(
                        `${offer.speedPrefix} ${offer.titleRemainder}`,
                        offer.priceDollars
                      )
                    }
                    className="inline-flex items-center justify-center min-h-[46px] px-7 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#242428] active:bg-[#000000] text-[#FFFFFF] text-[15px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {offer.ctaLabel}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onViewDetails(
                        `${offer.speedPrefix} ${offer.titleRemainder} ($${offer.priceDollars}/mo)`,
                        offer.fullDetails
                      )
                    }
                    className="text-[14px] sm:text-[15px] font-semibold text-[#0A0A0A] hover:text-[#6D2EFF] underline underline-offset-4 py-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {offer.detailsLabel}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Centered, compact offer-conditions paragraph within ~880px */}
        <p className="mt-7 max-w-[880px] mx-auto text-center text-[12.5px] sm:text-[13px] leading-[1.55] text-[#5A5A5A]">
          {featuredOffersFinePrint}
        </p>
      </div>
    </section>
  );
};
