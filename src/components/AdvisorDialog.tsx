import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Info,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import {
  BRAND_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  SUPPORT_EMAIL,
  BUSINESS_ROLE,
  hasValidPhoneDestination,
  hasValidEmailDestination,
} from "../config/siteData";

export interface PlanDetailsPayload {
  title: string;
  summary: string;
  rateProtection: string;
  equipmentAndData: string;
  billingAndAutopay: string;
  availabilityNote: string;
}

interface AdvisorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  zipCode: string;
  onZipChange: (zip: string) => void;
  selectedPlanName?: string | null;
  selectedPlanPrice?: number | null;
  planDetailsPayload?: PlanDetailsPayload | null;
  sourceLabel?: string;
}

export const AdvisorDialog: React.FC<AdvisorDialogProps> = ({
  isOpen,
  onClose,
  zipCode,
  onZipChange,
  selectedPlanName,
  selectedPlanPrice,
  planDetailsPayload,
  sourceLabel,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [localZip, setLocalZip] = useState(zipCode);
  const [zipError, setZipError] = useState<string | null>(null);

  const validPhone = hasValidPhoneDestination(PHONE_E164);
  const validEmail = hasValidEmailDestination(SUPPORT_EMAIL);
  const isValidFiveDigitZip = /^\d{5}$/.test(zipCode.trim());

  useEffect(() => {
    setLocalZip(zipCode);
    setZipError(null);
  }, [zipCode, isOpen]);

  // Focus management and restoration
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(timer);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLocalZipApply = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = localZip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setZipError("Please enter exactly 5 numeric digits (e.g., 02115).");
      return;
    }
    setZipError(null);
    onZipChange(trimmed);
  };

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
        aria-labelledby="advisor-dialog-title"
        className="w-full max-w-[620px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-[#FFFFFF] border border-[#E6E6EA] text-[#0A0A0A] shadow-[0_20px_50px_rgba(15,6,45,0.35)]"
      >
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#E6E6EA] px-6 py-4.5 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11.5px] font-extrabold tracking-[0.13em] uppercase text-[#6D2EFF]">
              {planDetailsPayload
                ? "PREVIEW OFFER TERMS & DETAILS"
                : "ADDRESS QUALIFICATION & ADVISOR CONSULTATION"}
            </span>
            <h2
              id="advisor-dialog-title"
              className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#0A0A0A]"
            >
              {planDetailsPayload
                ? planDetailsPayload.title
                : "Verify Live Street-Address Coverage"}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 rounded-full bg-[#F4F4F6] hover:bg-[#E8E4F8] text-[#0A0A0A] inline-flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* ZIP Code Format Validation vs. Actual Service Coverage Notice */}
          <div className="rounded-[14px] bg-[#F3EEFF] border border-[#D9C9FF] p-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="w-5 h-5 text-[#6D2EFF] mt-0.5 shrink-0"
                strokeWidth={2.3}
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="text-[14.5px] font-bold text-[#0A0A0A] mb-1">
                  {isValidFiveDigitZip ? (
                    <>
                      ZIP Format Validated:{" "}
                      <span className="text-[#6D2EFF] tabular-price">
                        {zipCode.trim()}
                      </span>{" "}
                      (5-Digit Postal Format Only)
                    </>
                  ) : (
                    "Enter Your 5-Digit ZIP Code for Reference"
                  )}
                </div>
                <p className="text-[13.5px] leading-[1.52] text-[#4A4458]">
                  <strong>Important Coverage Distinction:</strong> Validating a
                  5-digit ZIP code format happens in your browser and{" "}
                  <strong>does not confirm</strong> that a specific broadband
                  carrier, speed tier, or promotional rate is wired to your
                  exact street address. Live serviceability requires a street
                  and unit-number check with an advisor.
                </p>

                {/* Inline ZIP updater if user opened dialog without a valid ZIP or wants to switch */}
                <form
                  onSubmit={handleLocalZipApply}
                  className="mt-3 flex flex-wrap items-center gap-2"
                  noValidate
                >
                  <label htmlFor="dialog-zip-input" className="sr-only">
                    5-digit ZIP code
                  </label>
                  <input
                    id="dialog-zip-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={localZip}
                    onChange={(e) => setLocalZip(e.target.value)}
                    placeholder="e.g., 02115"
                    className="h-9 w-32 rounded-[8px] px-3 text-[14px] font-semibold bg-[#FFFFFF] border border-[#C9C9D1] text-[#0A0A0A] tabular-price"
                  />
                  <button
                    type="submit"
                    className="h-9 px-3.5 rounded-[8px] bg-[#0A0A0A] hover:bg-[#232326] text-[#FFFFFF] text-[13px] font-bold cursor-pointer transition-colors"
                  >
                    {isValidFiveDigitZip ? "Update ZIP" : "Set ZIP"}
                  </button>
                  {zipError && (
                    <span
                      role="alert"
                      className="w-full text-[12.5px] font-medium text-[#B91C1C] mt-1"
                    >
                      {zipError}
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Selected Plan Context (if user clicked a specific plan or eligibility CTA) */}
          {selectedPlanName && (
            <div className="rounded-[14px] bg-[#F7F7F9] border border-[#E6E6EA] p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-[#6D2EFF] mt-0.5 shrink-0"
                  strokeWidth={2.3}
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-[12px] font-bold uppercase tracking-wider text-[#5A5A5A]">
                    Selected Preview Option
                  </span>
                  <span className="text-[16px] font-extrabold text-[#0A0A0A]">
                    {selectedPlanName}
                  </span>
                </div>
              </div>
              {typeof selectedPlanPrice === "number" && (
                <div className="text-right shrink-0">
                  <span className="text-[22px] font-extrabold text-[#0A0A0A] tabular-price">
                    ${selectedPlanPrice}
                  </span>
                  <span className="text-[13px] font-bold text-[#5A5A5A]">
                    /mo preview
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Detailed Pricing & Plan Terms (shown when "Pricing & other info" was clicked) */}
          {planDetailsPayload && (
            <div className="rounded-[14px] bg-[#F7F7F9] border border-[#E6E6EA] p-4.5 space-y-3 text-[14px] leading-[1.55]">
              <div>
                <h3 className="font-bold text-[#0A0A0A]">Offer Summary</h3>
                <p className="text-[#5A5A5A]">{planDetailsPayload.summary}</p>
              </div>
              <div className="pt-2 border-t border-[#E6E6EA]">
                <h3 className="font-bold text-[#0A0A0A]">
                  Promotional Rate Protection
                </h3>
                <p className="text-[#5A5A5A]">
                  {planDetailsPayload.rateProtection}
                </p>
              </div>
              <div className="pt-2 border-t border-[#E6E6EA]">
                <h3 className="font-bold text-[#0A0A0A]">
                  Equipment &amp; Data Terms
                </h3>
                <p className="text-[#5A5A5A]">
                  {planDetailsPayload.equipmentAndData}
                </p>
              </div>
              <div className="pt-2 border-t border-[#E6E6EA]">
                <h3 className="font-bold text-[#0A0A0A]">
                  AutoPay &amp; Billing Requirements
                </h3>
                <p className="text-[#5A5A5A]">
                  {planDetailsPayload.billingAndAutopay}
                </p>
              </div>
              <div className="pt-2 border-t border-[#E6E6EA]">
                <h3 className="font-bold text-[#0A0A0A]">
                  Address Qualification Note
                </h3>
                <p className="text-[#5A5A5A]">
                  {planDetailsPayload.availabilityNote}
                </p>
              </div>
            </div>
          )}

          {/* Advisor Telephone & Email Action Block */}
          <div className="rounded-[16px] border border-[#E6E6EA] bg-[#FFFFFF] p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Info
                className="w-5 h-5 text-[#6D2EFF] mt-0.5 shrink-0"
                strokeWidth={2.2}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-[16px] font-extrabold text-[#0A0A0A] mb-1">
                  Speak with a Plan Comparison Advisor
                </h3>
                <p className="text-[14px] leading-[1.52] text-[#5A5A5A]">
                  {BRAND_NAME} operates as an {BUSINESS_ROLE}. Advisors can check
                  which participating providers service your exact street
                  address{isValidFiveDigitZip ? ` in ZIP ${zipCode.trim()}` : ""}
                  , confirm live promotional rates, and explain carrier billing
                  terms.
                </p>
              </div>
            </div>

            {validPhone ? (
              <div className="pt-1">
                <a
                  href={`tel:${PHONE_E164.trim()}`}
                  className="w-full min-h-[50px] px-6 py-3.5 rounded-full bg-[#6D2EFF] hover:bg-[#5A1FE0] text-[#FFFFFF] text-[16px] font-bold inline-flex items-center justify-center gap-2.5 no-underline transition-colors tabular-price"
                >
                  <Phone className="w-5 h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                  <span>Call Advisor: {PHONE_DISPLAY}</span>
                </a>
              </div>
            ) : (
              /* Helpful Contact-Setup Message when PHONE_E164 is unconfigured */
              <div className="rounded-[12px] bg-[#F7F7F9] border border-[#D4D4DC] p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-2 text-[14px] font-bold text-[#0A0A0A]">
                    <Phone className="w-4 h-4 text-[#6D2EFF]" aria-hidden="true" />
                    <span>Configured Phone Display: {PHONE_DISPLAY}</span>
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#6D2EFF]">
                    Preview Placeholder Mode
                  </span>
                </div>

                <p className="text-[13.5px] leading-[1.5] text-[#5A5A5A]">
                  <strong>Contact Setup Notice:</strong> No live telephone
                  destination is currently configured (
                  <code className="text-[12.5px] bg-[#EAEAEF] px-1.5 py-0.5 rounded">
                    PHONE_E164 = &quot;&quot;
                  </code>
                  ). Calls are intentionally disabled in preview so traffic is
                  never routed to an unverified number. To activate a live{" "}
                  <code className="text-[12.5px] bg-[#EAEAEF] px-1.5 py-0.5 rounded">
                    tel:
                  </code>{" "}
                  link, set{" "}
                  <code className="text-[12.5px] bg-[#EAEAEF] px-1.5 py-0.5 rounded">
                    PHONE_DISPLAY
                  </code>{" "}
                  and{" "}
                  <code className="text-[12.5px] bg-[#EAEAEF] px-1.5 py-0.5 rounded">
                    PHONE_E164
                  </code>{" "}
                  in{" "}
                  <code className="text-[12.5px] bg-[#EAEAEF] px-1.5 py-0.5 rounded">
                    src/config/siteData.ts
                  </code>
                  .
                </p>
              </div>
            )}

            {/* Email contact status */}
            <div className="pt-2 border-t border-[#E6E6EA] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13.5px] text-[#5A5A5A]">
              <div className="inline-flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6D2EFF] shrink-0" aria-hidden="true" />
                <span>Support Email:</span>
                {validEmail ? (
                  <a
                    href={`mailto:${SUPPORT_EMAIL.trim()}`}
                    className="font-bold text-[#6D2EFF] hover:underline"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                ) : (
                  <span className="font-semibold text-[#0A0A0A]">
                    {SUPPORT_EMAIL} (Configure in siteData.ts)
                  </span>
                )}
              </div>

              {sourceLabel && (
                <span className="inline-flex items-center gap-1 text-[12px] text-[#5A5A5A]">
                  <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Opened from: {sourceLabel}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#F7F7F9] border-t border-[#E6E6EA] px-6 py-3.5 flex items-center justify-between gap-4">
          <span className="text-[12.5px] text-[#5A5A5A]">
            No automatic calls are ever placed by this dialog.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] px-5 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#232326] text-[#FFFFFF] text-[14px] font-bold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
