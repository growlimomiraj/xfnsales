import React from "react";
import { SITE_CONTENT } from "../config/siteData";

export const ServiceDisclosures: React.FC = () => {
  const { badge, heading, description, notCard, doCard } =
    SITE_CONTENT.serviceDisclosures;

  return (
    <section className="wawy-disclaimer-section" id="wawy-disclaimer">
      <div className="xfn-container">
        <div className="wawy-sec-head" style={{ marginBottom: "30px" }}>
          <div className="wawy-disclaimer-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{badge}</span>
          </div>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>

        <div className="wawy-disclaimer-grid">
          {/* Card 1: What We Do NOT Do */}
          <div className="wawy-disc-box-not">
            <div className="wawy-disc-title">
              <div className="wawy-disc-icon wawy-disc-icon-not">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    fontWeight: 800,
                    color: "#0a0a0a",
                  }}
                >
                  {notCard.title}
                </h3>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#5a5a5a",
                  }}
                >
                  {notCard.subtitle}
                </div>
              </div>
            </div>

            <ul className="wawy-disc-list">
              {notCard.items.map((item, idx) => (
                <li className="wawy-disc-item" key={idx}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5a5a5a"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: What We DO */}
          <div className="wawy-disc-box-do">
            <div className="wawy-disc-title">
              <div className="wawy-disc-icon wawy-disc-icon-do">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "19px",
                    fontWeight: 800,
                    color: "#2b0a6e",
                  }}
                >
                  {doCard.title}
                </h3>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#6d2eff",
                  }}
                >
                  {doCard.subtitle}
                </div>
              </div>
            </div>

            <ul className="wawy-disc-list">
              {doCard.items.map((item, idx) => (
                <li className="wawy-disc-item" key={idx}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6d2eff"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
