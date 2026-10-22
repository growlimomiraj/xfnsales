import React from "react";
import { SITE_CONTENT } from "../config/siteData";

export const PromoHero: React.FC = () => {
  const { categoryHeading, hero } = SITE_CONTENT;

  return (
    <>
      {/* ========== PAGE TITLE ========== */}
      <div className="xfn-page-title">
        <div className="xfn-container">
          <h1>{categoryHeading}</h1>
        </div>
      </div>

      {/* ========== HERO ========== */}
      <section className="xfn-hero xfn-has-art" id="xfn-hero">
        <div className="xfn-container xfn-hero-inner">
          <div className="xfn-hero-copy">
            <h2>{hero.headline}</h2>
            <p className="xfn-lede">{hero.savingsLine}</p>
            <p className="xfn-body">{hero.supportingCopy}</p>
          </div>
          <div className="xfn-hero-badge" aria-hidden="true">
            <span className="xfn-num">{hero.promoYearsNumeral}</span>
            <span className="xfn-txt">
              <b>{hero.promoMotifBold}</b>
              {hero.promoMotifLight}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
