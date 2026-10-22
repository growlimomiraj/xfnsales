import React, { useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    heading,
    subheading,
    inputLabel,
    inputPlaceholder,
    buttonText,
    emptyError,
    invalidError,
  } = SITE_CONTENT.zipChecker;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 5);
    onZipChange(cleaned);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = zipCode.trim();
    if (!value) {
      setErrorMessage(emptyError);
      inputRef.current?.focus();
    } else if (!/^\d{5}$/.test(value)) {
      setErrorMessage(invalidError);
      inputRef.current?.focus();
    } else {
      setErrorMessage(null);
      onValidZipSubmit(value);
    }
  };

  return (
    <section className="xfn-addr-hero" id="xfn-start">
      <div className="xfn-container">
        <h2>{heading}</h2>
        <p className="xfn-addr-sub">{subheading}</p>
        <form
          className="xfn-addr-form"
          id="xfn-addrForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <div
            className={`xfn-addr-field${errorMessage ? " xfn-invalid" : ""}`}
            id="xfn-addrField"
          >
            <label htmlFor="xfn-addr">{inputLabel}</label>
            <input
              ref={inputRef}
              id="xfn-addr"
              name="zip"
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
              placeholder={inputPlaceholder}
              aria-describedby="xfn-addrErr"
              aria-invalid={errorMessage ? "true" : undefined}
              value={zipCode}
              onChange={handleInput}
            />
            <p
              className="xfn-addr-err"
              id="xfn-addrErr"
              hidden={!errorMessage}
            >
              {errorMessage || emptyError}
            </p>
          </div>
          <button
            className="xfn-btn xfn-btn-dark xfn-addr-submit"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};
