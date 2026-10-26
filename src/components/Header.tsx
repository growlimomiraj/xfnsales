import React, { useEffect, useState } from "react";
import {
  PHONE_DISPLAY,
  PHONE_E164,
} from "../config/siteData";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`xfn-site-header${scrolled ? " xfn-scrolled" : ""}`}
      id="xfn-header"
      data-cta-location="header"
    >
      <div className="xfn-container xfn-nav-inner">
        <a className="xfn-wordmark xfn-brand-link" href="#xfn-top" aria-label="Cable TV Consultation">
          <img
            src="/logo.png"
            alt="Cable TV Consultation"
            className="xfn-brand-logo"
            width="44"
            height="44"
          />
        </a>
        <a
          className="xfn-call-btn"
          href={`tel:${PHONE_E164}`}
          aria-label={`${PHONE_DISPLAY} — call ${PHONE_DISPLAY}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4Z" />
          </svg>
          <span className="xfn-num">{PHONE_DISPLAY}</span>
        </a>
      </div>
    </header>
  );
};
