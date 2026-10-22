import React from "react";
import {
  BRAND_NAME,
  DOMAIN,
  PHONE_DISPLAY,
  PHONE_E164,
  SUPPORT_EMAIL,
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
    <footer className="wawy-footer">
      <div className="xfn-container">
        <div className="wawy-footer-grid">
          {/* Column 1: XFN Wordmark, Business Description, Toll-Free Phone, Support Email */}
          <div>
            <div style={{ marginBottom: "12px" }}>
              <a
                href="#xfn-top"
                className="xfn-wordmark"
                style={{ color: "#ffffff", display: "inline-block" }}
              >
                <span style={{ color: "#ffffff" }}>{wordmark.leading}</span>
                <span className="xfn-w2" style={{ color: "#b695ff" }}>
                  {wordmark.accent}
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
              <br />
              <strong style={{ color: "#ffffff" }}>Support Email: </strong>{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                style={{ color: "#c4b0ff" }}
              >
                {SUPPORT_EMAIL}
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
