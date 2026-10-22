import React from "react";
import { SITE_CONTENT } from "../config/siteData";

export const PrivacySummary: React.FC = () => {
  const { badge, heading, intro, groups } = SITE_CONTENT.privacySummary;

  return (
    <section className="wawy-privacy-section" id="wawy-privacy-summary">
      <div className="xfn-container" style={{ maxWidth: "900px" }}>
        <div className="wawy-sec-head" style={{ marginBottom: "30px" }}>
          <div className="wawy-badge-tag">{badge}</div>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>

        <div className="wawy-privacy-box">
          <div className="wawy-privacy-grid">
            {groups.map((g, idx) => (
              <div
                key={g.id}
                style={
                  idx > 0
                    ? { borderTop: "1px solid #e6e6ea", paddingTop: "16px" }
                    : undefined
                }
              >
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    margin: "0 0 6px",
                  }}
                >
                  {g.subheading}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#5a5a5a",
                    margin: 0,
                  }}
                >
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
