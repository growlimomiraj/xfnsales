import React, { useEffect, useRef } from "react";
import { POLICY_DOCUMENTS, PolicyType } from "../config/policyData";

interface PolicyDialogProps {
  activePolicy: PolicyType | null;
  onClose: () => void;
}

export const PolicyDialog: React.FC<PolicyDialogProps> = ({
  activePolicy,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activePolicy) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 15);
      return () => window.clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }
  }, [activePolicy]);

  useEffect(() => {
    if (!activePolicy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePolicy, onClose]);

  if (!activePolicy) return null;

  const doc = POLICY_DOCUMENTS[activePolicy];

  return (
    <div
      className="wawy-modal-overlay"
      id="wawyPolicyModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="wawy-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wawyPolicyTitle"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="wawy-modal-close"
          id="wawyClosePolicyModal"
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3
          className="wawy-modal-title"
          id="wawyPolicyTitle"
          style={{ textAlign: "left", marginBottom: "16px" }}
        >
          {doc.title}
        </h3>

        <div
          id="wawyPolicyBody"
          style={{
            fontSize: "14px",
            color: "#5a5a5a",
            lineHeight: 1.65,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <p style={{ marginBottom: "12px" }}>
            <strong style={{ color: "#0a0a0a" }}>Effective Date:</strong>{" "}
            {doc.effectiveDate}
          </p>
          {doc.sections.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              {sec.heading && (
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    margin: "14px 0 6px",
                  }}
                >
                  {sec.heading}
                </h4>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} style={{ marginBottom: "10px" }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
