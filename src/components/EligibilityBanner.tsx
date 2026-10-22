import React from "react";
import {
  SITE_CONTENT,
  PHONE_E164,
  PHONE_DISPLAY,
} from "../config/siteData";

export const EligibilityBanner: React.FC = () => {
  const {
    programLabel,
    headline,
    supportingCopy,
    ctaLabel,
    conditionsFinePrint,
  } = SITE_CONTENT.eligibilityBanner;

  return (
    <section className="xfn-container" aria-label="Low-cost internet">
      <div className="xfn-eligibility">
        <p className="xfn-ess-mark">{programLabel}</p>
        <div className="xfn-elig-copy">
          <h3>{headline}</h3>
          <p>{supportingCopy}</p>
        </div>
        <a
          className="xfn-btn xfn-btn-white"
          href={`tel:${PHONE_E164}`}
          aria-label={`${ctaLabel} — call ${PHONE_DISPLAY}`}
        >
          {ctaLabel}
        </a>
      </div>
      <p className="xfn-fineprint">{conditionsFinePrint}</p>
    </section>
  );
};
