import React from "react";
import {
  SITE_CONTENT,
  PHONE_E164,
  PHONE_DISPLAY,
} from "../config/siteData";

export const PlanComparison: React.FC = () => {
  const {
    headingPrefix,
    headingAccent,
    subheading,
    tiers,
    conditionsFinePrint,
  } = SITE_CONTENT.planComparison;

  return (
    <section className="xfn-section" id="xfn-plans">
      <div className="xfn-container">
        <div className="xfn-section-head">
          <h2>
            {headingPrefix}
            <span className="xfn-accent">{headingAccent}</span>
          </h2>
          <p className="xfn-sub">{subheading}</p>
        </div>

        <div className="xfn-plan-grid">
          {tiers.map((tier) => (
            <div className="xfn-plan-card" key={tier.id}>
              <p className="xfn-plan-name">{tier.speedLabel}</p>
              <p className="xfn-plan-tag">{tier.householdDescriptor}</p>
              <div className="xfn-price">
                <span className="xfn-cur">$</span>
                <span className="xfn-fig">{tier.priceDollars}</span>
                <span className="xfn-per">
                  /mo for
                  <br />5 years
                </span>
              </div>
              <ul className="xfn-feat">
                {tier.benefits.map((b, idx) => (
                  <li key={idx} className={b.strong ? "xfn-strong" : undefined}>
                    {b.text}
                  </li>
                ))}
              </ul>
              <div className="xfn-plan-cta">
                <a
                  className="xfn-btn xfn-btn-outline"
                  href={`tel:${PHONE_E164}`}
                  aria-label={`${tier.ctaLabel} — call ${PHONE_DISPLAY}`}
                >
                  {tier.ctaLabel}
                </a>
                <a className="xfn-link-under" href="#xfn-faq">
                  {tier.detailsLabel}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="xfn-fineprint">{conditionsFinePrint}</p>
      </div>
    </section>
  );
};
