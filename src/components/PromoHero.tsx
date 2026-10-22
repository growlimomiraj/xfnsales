import React, { useEffect, useState } from "react";
import { SITE_CONTENT } from "../config/siteData";

export const PromoHero: React.FC = () => {
  const { categoryHeading, hero } = SITE_CONTENT;
  const [externalAssetReady, setExternalAssetReady] = useState(false);

  useEffect(() => {
    if (!hero.useExternalHeroAssetIfReachable || !hero.observedHeroImageUrl) {
      return;
    }
    let isMounted = true;
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      if (isMounted) setExternalAssetReady(true);
    };
    img.onerror = () => {
      if (isMounted) setExternalAssetReady(false);
    };
    img.src = hero.observedHeroImageUrl;
    return () => {
      isMounted = false;
    };
  }, [hero.observedHeroImageUrl, hero.useExternalHeroAssetIfReachable]);

  return (
    <>
      {/* C. Separate, left-aligned purple Internet category heading underneath ZIP section and above hero */}
      <div className="w-full bg-[#F4F4F6] pt-8 pb-6 md:pt-11 md:pb-7">
        <div className="site-container">
          <h2 className="text-[30px] sm:text-[36px] font-extrabold leading-[1.15] tracking-tight text-[#6D2EFF]">
            {categoryHeading}
          </h2>
        </div>
      </div>

      {/* D. Full-width purple promotional hero (~385px tall at reference desktop width, top padding ~78px, extra bottom space for 84px card overlap) */}
      <section
        aria-label="Featured Internet Promotional Offer"
        className="relative w-full overflow-hidden text-[#FFFFFF] min-h-[385px] pt-[52px] pb-[118px] md:pt-[78px] md:pb-[132px]"
        style={
          externalAssetReady
            ? {
                backgroundImage: `url("${hero.observedHeroImageUrl}")`,
                backgroundSize: "cover",
                backgroundPosition: "center right",
                backgroundColor: "#2B0A6E",
              }
            : {
                background:
                  "radial-gradient(circle at 78% 42%, rgba(128, 66, 255, 0.48) 0%, rgba(71, 22, 176, 0.35) 38%, rgba(43, 10, 110, 0) 70%), linear-gradient(108deg, #2B0A6E 0%, #37108A 50%, #521CD0 100%)",
              }
        }
      >
        {/* Subtle geometric depth rings when using the CSS/HTML hero composition */}
        {!externalAssetReady && (
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-24 -top-28 w-[520px] h-[520px] rounded-full border border-white/10 bg-gradient-to-br from-[#6D2EFF]/30 to-transparent blur-2xl" />
            <div className="absolute right-[8%] top-[10%] w-[380px] h-[380px] rounded-full border border-white/10" />
          </div>
        )}

        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
            {/* Left Side: Large white headline (~40px, weight 800), bold savings/support line, compact supporting paragraph (450–500px) */}
            <div className="lg:col-span-7 max-w-[580px]">
              <h3
                className="text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.14] tracking-tight text-[#FFFFFF] mb-3.5"
                style={{ textWrap: "balance" }}
              >
                {hero.headline}
              </h3>

              <p className="text-[17px] sm:text-[19px] font-bold leading-[1.35] text-[#EFEAFF] mb-3">
                {hero.savingsLine}
              </p>

              <p className="text-[15px] sm:text-[16px] leading-[1.55] text-white/90 max-w-[490px]">
                {hero.supportingCopy}
              </p>
            </div>

            {/* Right Side: Oversized white numeral & multiline price-protection motif (only rendered when external background artwork is not already displaying it) */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              {externalAssetReady ? (
                <span className="sr-only">{hero.accessibleArtDescription}</span>
              ) : (
                <div
                  role="img"
                  aria-label={hero.accessibleArtDescription}
                  className="inline-flex items-center gap-4 sm:gap-5 px-6 py-5 sm:px-7 sm:py-6 rounded-[22px] bg-white/[0.08] border border-white/20 backdrop-blur-[2px] shadow-[0_16px_40px_rgba(14,4,42,0.32)]"
                >
                  {/* Dominant oversized numeral */}
                  <span
                    aria-hidden="true"
                    className="text-[88px] sm:text-[112px] lg:text-[124px] font-black leading-[0.82] tracking-tighter text-[#FFFFFF] select-none tabular-price drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
                  >
                    {hero.promoYearsNumeral}
                  </span>

                  {/* Multiline price-protection motif */}
                  <div aria-hidden="true" className="flex flex-col justify-center">
                    <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.14em] text-[#D7C6FF] mb-1">
                      MULTI-YEAR RATE LOCK
                    </span>
                    <span className="text-[24px] sm:text-[30px] lg:text-[32px] font-extrabold leading-[0.98] tracking-tight text-[#FFFFFF]">
                      {hero.promoMotifTop}
                    </span>
                    <span className="text-[24px] sm:text-[30px] lg:text-[32px] font-extrabold leading-[1.02] tracking-tight text-[#C7B2FF]">
                      {hero.promoMotifBottom}
                    </span>
                    <span className="mt-2 pt-2 border-t border-white/20 text-[12px] sm:text-[13px] font-medium text-white/85 max-w-[210px] leading-snug">
                      {hero.promoMotifSub}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
