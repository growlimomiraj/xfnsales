import React from "react";
import {
  SITE_CONTENT,
  PHONE_E164,
  PHONE_DISPLAY,
} from "../config/siteData";

export const FeaturedOffers: React.FC = () => {
  const { featuredOffers, featuredOffersFinePrint } = SITE_CONTENT;

  return (
    <section className="xfn-container" aria-label="Featured plans">
      <div className="xfn-price-cards">
        {featuredOffers.map((offer) => (
          <div className="xfn-card" key={offer.id}>
            <h3>
              <span className="xfn-accent">{offer.speedPrefix}</span>{" "}
              {offer.titleRemainder}
            </h3>
            <p className="xfn-save">{offer.supportingLine}</p>
            <div className="xfn-price">
              <span className="xfn-cur">$</span>
              <span className="xfn-fig">{offer.priceDollars}</span>
              <span className="xfn-per">
                /mo for
                <br />5 years
              </span>
            </div>
            <div className="xfn-card-cta">
              <a
                className="xfn-btn xfn-btn-dark"
                href={`tel:${PHONE_E164}`}
                aria-label={`${offer.ctaLabel} — call ${PHONE_DISPLAY}`}
              >
                {offer.ctaLabel}
              </a>
              <a className="xfn-link-under" href="#xfn-faq">
                {offer.detailsLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="xfn-fineprint">{featuredOffersFinePrint}</p>
    </section>
  );
};
