import React, { useEffect, useRef } from "react";
import { X, FileText } from "lucide-react";
import { POLICY_DOCUMENTS, PolicyType } from "../config/policyData";

interface PolicyDialogProps {
  activePolicy: PolicyType | null;
  onClose: () => void;
  onSelectPolicy: (policy: PolicyType) => void;
}

export const PolicyDialog: React.FC<PolicyDialogProps> = ({
  activePolicy,
  onClose,
  onSelectPolicy,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activePolicy) {
      if (!previousFocusRef.current) {
        previousFocusRef.current = document.activeElement as HTMLElement | null;
      }
      const timer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(timer);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
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
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePolicy, onClose]);

  if (!activePolicy) return null;

  const doc = POLICY_DOCUMENTS[activePolicy];
  const policyTabs: { id: PolicyType; label: string }[] = [
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms & Conditions" },
    { id: "disclaimer", label: "Full Disclaimer" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0E0526]/70 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-dialog-title"
        className="w-full max-w-[760px] max-h-[90vh] flex flex-col rounded-[20px] bg-[#FFFFFF] border border-[#E6E6EA] text-[#0A0A0A] shadow-[0_20px_50px_rgba(15,6,45,0.35)] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#FFFFFF] border-b border-[#E6E6EA] px-6 py-4.5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-9 h-9 rounded-[10px] bg-[#EFEAFF] text-[#6D2EFF] inline-flex items-center justify-center shrink-0"
            >
              <FileText className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <div>
              <h2
                id="policy-dialog-title"
                className="text-[19px] sm:text-[22px] font-extrabold tracking-tight text-[#0A0A0A]"
              >
                {doc.title}
              </h2>
              <p className="text-[12.5px] text-[#5A5A5A]">
                Effective Date: {doc.effectiveDate}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close policy dialog"
            className="w-10 h-10 rounded-full bg-[#F4F4F6] hover:bg-[#E8E4F8] text-[#0A0A0A] inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Policy Switcher Bar */}
        <div
          className="bg-[#F7F7F9] border-b border-[#E6E6EA] px-6 py-2.5 flex flex-wrap items-center gap-2 shrink-0"
          role="tablist"
          aria-label="Switch legal document"
        >
          {policyTabs.map((tab) => {
            const isSelected = tab.id === activePolicy;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectPolicy(tab.id)}
                className={`px-3.5 py-1.5 rounded-[8px] text-[13.5px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#6D2EFF] text-[#FFFFFF]"
                    : "bg-transparent text-[#5A5A5A] hover:text-[#0A0A0A] hover:bg-[#EAEAEF]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Policy Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Explicit Draft Notice Banner */}
          <div className="rounded-[12px] bg-[#F3EEFF] border border-[#D9C9FF] p-4 text-[13.5px] leading-[1.55] text-[#3E3559]">
            {doc.draftNotice}
          </div>

          {doc.sections.map((section, idx) => (
            <section key={idx} className="space-y-2.5">
              <h3 className="text-[17px] font-extrabold text-[#0A0A0A]">
                {section.heading}
              </h3>
              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[14.5px] sm:text-[15px] leading-[1.62] text-[#5A5A5A]"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F7F7F9] border-t border-[#E6E6EA] px-6 py-3.5 flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-5 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#232326] text-[#FFFFFF] text-[14px] font-bold transition-colors cursor-pointer"
          >
            Close Policy View
          </button>
        </div>
      </div>
    </div>
  );
};
