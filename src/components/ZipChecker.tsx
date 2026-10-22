import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { SITE_CONTENT } from "../config/siteData";

interface ZipCheckerProps {
  zipCode: string;
  onZipChange: (zip: string) => void;
  onValidZipSubmit: (zip: string) => void;
}

export const ZipChecker: React.FC<ZipCheckerProps> = ({
  zipCode,
  onZipChange,
  onValidZipSubmit,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { heading, subheading, inputLabel, inputPlaceholder, buttonText } =
    SITE_CONTENT.zipChecker;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Allow user to type or paste, preserving leading zeros
    onZipChange(rawValue);
    if (errorMessage) {
      const trimmed = rawValue.trim();
      if (/^\d{5}$/.test(trimmed)) {
        setErrorMessage(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = zipCode.trim();

    if (!trimmed) {
      setErrorMessage(
        "Please enter a 5-digit U.S. ZIP code (for example, 02115 or 90210) to continue."
      );
      return;
    }

    if (!/^\d{5}$/.test(trimmed)) {
      setErrorMessage(
        `“${trimmed}” is not a valid 5-digit ZIP code. Please enter exactly 5 numeric digits (0–9), including any leading zero.`
      );
      return;
    }

    setErrorMessage(null);
    onZipChange(trimmed);
    onValidZipSubmit(trimmed);
  };

  return (
    <section
      id="zip-checker"
      aria-labelledby="zip-checker-heading"
      className="w-full bg-[#F4F4F6] pt-[40px] pb-[44px] md:pt-[52px] md:pb-[58px] border-b border-[#E6E6EA]/70"
    >
      <div className="site-container">
        {/* Centered Heading (~50px desktop, 1.15 line-height, weight 800) & Explanatory Sentence */}
        <div className="max-w-[860px] mx-auto text-center mb-7 md:mb-9">
          <h1
            id="zip-checker-heading"
            className="text-[32px] sm:text-[42px] lg:text-[50px] font-extrabold leading-[1.15] tracking-tight text-[#0A0A0A] mb-3.5"
            style={{ textWrap: "balance" }}
          >
            {heading}
          </h1>
          <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#5A5A5A] max-w-[700px] mx-auto">
            {subheading}
          </p>
        </div>

        {/* Full-Width Horizontal Form inside the Shared Container */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full"
          aria-describedby={errorMessage ? "zip-input-error" : "zip-input-hint"}
        >
          <label
            htmlFor="zip-code-input"
            className="block text-[15px] font-bold text-[#0A0A0A] mb-2"
          >
            {inputLabel}
          </label>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[14px] sm:gap-[18px] w-full">
            <input
              id="zip-code-input"
              name="zipCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zipCode}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? "zip-input-error" : "zip-input-hint"}
              className={`w-full flex-1 h-[58px] rounded-[8px] px-[18px] text-[17px] font-medium text-[#0A0A0A] placeholder:text-[#767680] bg-[#F7F7F9] border transition-colors tabular-price ${
                errorMessage
                  ? "border-[#C81E1E] bg-[#FFF8F8]"
                  : "border-[#C9C9D1] hover:border-[#9E9EA8] focus:border-[#6D2EFF] focus:bg-[#FFFFFF]"
              }`}
            />

            <button
              type="submit"
              className="h-[58px] w-full sm:w-[165px] rounded-[8px] bg-[#0A0A0A] hover:bg-[#232326] active:bg-[#000000] text-[#FFFFFF] text-[17px] font-bold px-5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              {buttonText}
            </button>
          </div>

          {/* Helpful inline validation error or subtle format note */}
          {errorMessage ? (
            <div
              id="zip-input-error"
              role="alert"
              className="mt-3 flex items-start gap-2 text-[14px] sm:text-[15px] font-medium text-[#B91C1C]"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          ) : (
            <p
              id="zip-input-hint"
              className="mt-2.5 text-[13px] text-[#5A5A5A]"
            >
              Format check accepts 5-digit U.S. postal codes (including leading zeros such as 02115). Live street-address qualification is completed with an advisor.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
