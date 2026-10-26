import React from "react";
import { SITE_CONTENT } from "../config/siteData";

export const RecognitionPanel: React.FC = () => {
  const { heading, supportingLine, learnMoreLabel, badgeText } =
    SITE_CONTENT.recognitionPanel;

  return (
    <section
      className="xfn-container"
      id="xfn-award"
      data-cta-location="recognition_panel"
      aria-label="Recognition"
    >
      <div className="xfn-award">
        <h3>{heading}</h3>
        <p>
          {supportingLine}{" "}
          <a className="xfn-link-under" href="#xfn-faq">
            {learnMoreLabel}
          </a>
        </p>
        <p className="xfn-mark">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 18.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" />
            <path d="M7.6 14.2a6 6 0 0 1 8.8 0" />
            <path d="M4.6 10.6a10.3 10.3 0 0 1 14.8 0" />
          </svg>
          {badgeText}
        </p>
      </div>
    </section>
  );
};
