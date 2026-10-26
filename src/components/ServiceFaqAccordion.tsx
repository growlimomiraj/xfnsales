import React, { useState } from "react";
import { SITE_CONTENT } from "../config/siteData";

export const ServiceFaqAccordion: React.FC = () => {
  const { badge, heading, intro, items } = SITE_CONTENT.serviceFaqAccordion;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section
      className="wawy-faq-section"
      id="wawy-faq"
      data-cta-location="service_faq"
    >
      <div className="xfn-container">
        <div className="wawy-sec-head">
          <div className="wawy-badge-tag">{badge}</div>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="wawy-faq-wrap">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const btnId = `${item.id}-btn`;
            return (
              <div
                key={item.id}
                className={`wawy-faq-item${isOpen ? " wawy-open" : ""}`}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    className="wawy-faq-header"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenId((prev) => (prev === item.id ? null : item.id))
                    }
                  >
                    <span className="wawy-faq-q">{item.question}</span>
                    <span className="wawy-faq-icon" aria-hidden="true">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="wawy-faq-body"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
