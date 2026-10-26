import React, { useEffect, useRef } from "react";
import { PHONE_DISPLAY, PHONE_E164 } from "../config/siteData";

interface AdvisorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisorDialog: React.FC<AdvisorDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => {
        ctaRef.current?.focus();
      }, 15);
      return () => window.clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
        lastFocusedRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const first = closeRef.current;
        const last = ctaRef.current;
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="xfn-modal" id="xfn-okModal" hidden={!isOpen}>
      <div className="xfn-modal-scrim" onClick={onClose} />
      <div
        className="xfn-modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="xfn-okTitle"
        aria-describedby="xfn-okBody"
        data-cta-location="advisor_dialog"
      >
        <button
          ref={closeRef}
          className="xfn-modal-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h2 id="xfn-okTitle">Congratulations!</h2>
        <p id="xfn-okBody">5 agents are available</p>
        <a
          ref={ctaRef}
          className="xfn-modal-cta"
          href={`tel:${PHONE_E164}`}
          id="xfn-okCta"
          aria-label={`Call Hotline — call ${PHONE_DISPLAY}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6 4Z" />
          </svg>
          Call Hotline
        </a>
      </div>
    </div>
  );
};
