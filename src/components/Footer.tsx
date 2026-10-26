import React from "react";
import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  PHONE_E164,
  SITE_CONTENT,
  getWordmarkParts,
} from "../config/siteData";
import { PolicyType } from "../config/policyData";

interface FooterProps {
  onOpenPolicy: (policy: PolicyType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const wordmark = getWordmarkParts();
  const currentYear = new Date().getFullYear();
  const { description, navigationLinks, disclosureBoxText } = SITE_CONTENT.footer;

  return (
    <footer className="wawy-footer" data-cta-location="footer">
      <div className="xfn-container">
        <div className="wawy-footer-grid">
          {/* Column 1: Wordmark, Business Description, Toll-Free Phone */}
          <div>
            <div style={{ marginBottom: "12px" }}>
              <a
                href="#xfn-top"
                className="xfn-wordmark"
                style={{ color: "#ffffff", display: "inline-flex", alignItems: "center", gap: "10px" }}
                aria-label="Cable TV Consultation"
              >
                <img
                  src="/logo.png"
                  alt="Cable TV Consultation"
                  className="xfn-brand-logo"
                  width="36"
                  height="36"
                />
                <span>
                  <span style={{ color: "#ffffff" }}>{wordmark.leading}</span>
                  <span className="xfn-w2" style={{ color: "#b695ff" }}>
                    {wordmark.accent}
                  </span>
                </span>
              </a>
            </div>
            <p
              style={{
                fontSize: "14px",
                maxWidth: "440px",
                margin: "0 0 16px",
                lineHeight: 1.6,
              }}
            >
              {description}
            </p>
            <div style={{ fontSize: "13.5px" }}>
              <strong style={{ color: "#ffffff" }}>Toll-Free Phone: </strong>{" "}
              <a
                href={`tel:${PHONE_E164}`}
                style={{ color: "#c4b0ff", fontWeight: 700 }}
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul className="wawy-footer-links">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policies */}
          <div>
            <h4>Legal &amp; Policies</h4>
            <ul className="wawy-footer-links">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("privacy")}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("terms")}
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy("disclaimer")}
                >
                  Full Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Rounded Disclosure Box */}
        <div className="wawy-footer-disclaimer-box">
          <strong style={{ color: "#ffffff" }}>Disclosure: </strong>{" "}
          {disclosureBoxText}
        </div>

        {/* Bottom Copyright Row */}
        <div className="wawy-footer-bottom">
          <div>
            &copy; {currentYear} {BRAND_NAME} ({DOMAIN}). All rights reserved.
          </div>
          <div>Independent Consumer Concierge</div>
        </div>
      </div>
    </footer>
  );
};
