/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from "react";
import { Header } from "./components/Header";
import { ZipChecker } from "./components/ZipChecker";
import { PromoHero } from "./components/PromoHero";
import { FeaturedOffers } from "./components/FeaturedOffers";
import { PlanComparison } from "./components/PlanComparison";
import { RecognitionPanel } from "./components/RecognitionPanel";
import { EligibilityBanner } from "./components/EligibilityBanner";
import { ProductFaqCarousel } from "./components/ProductFaqCarousel";
import { ServiceDisclosures } from "./components/ServiceDisclosures";
import { ServiceFaqAccordion } from "./components/ServiceFaqAccordion";
import { PrivacySummary } from "./components/PrivacySummary";
import { Footer } from "./components/Footer";
import { AdvisorDialog } from "./components/AdvisorDialog";
import { PolicyDialog } from "./components/PolicyDialog";
import { PolicyType } from "./config/policyData";

export default function App() {
  const [zipCode, setZipCode] = useState<string>("");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const handleValidZipSubmit = useCallback((validatedZip: string) => {
    setZipCode(validatedZip);
    setIsAdvisorOpen(true);
  }, []);

  return (
    <div id="xfn-root">
      {/* ========== HEADER ========== */}
      <Header />

      <main id="xfn-top">
        {/* ========== ZIP CODE CAPTURE ========== */}
        <ZipChecker
          zipCode={zipCode}
          onZipChange={setZipCode}
          onValidZipSubmit={handleValidZipSubmit}
        />

        {/* ========== PAGE TITLE & HERO ========== */}
        <PromoHero />

        {/* ========== HERO PRICE CARDS ========== */}
        <FeaturedOffers />

        {/* ========== PLANS ========== */}
        <PlanComparison />

        {/* ========== AWARD BAND ========== */}
        <RecognitionPanel />

        {/* ========== ELIGIBILITY ========== */}
        <EligibilityBanner />

        {/* ========== XFN FAQ CAROUSEL ========== */}
        <ProductFaqCarousel />

        {/* ========== WAWY LOWER SECTION 1: DISCLOSURES ========== */}
        <ServiceDisclosures />

        {/* ========== WAWY LOWER SECTION 2: SERVICE FAQ ACCORDION ========== */}
        <ServiceFaqAccordion />

        {/* ========== WAWY LOWER SECTION 3: PRIVACY SUMMARY ========== */}
        <PrivacySummary />
      </main>

      {/* ========== WAWY LOWER SECTION 4: COMPLETE FOOTER ========== */}
      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      {/* ========== XFN SUCCESS MODAL ========== */}
      <AdvisorDialog
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      {/* ========== WAWY POLICY MODAL ========== */}
      <PolicyDialog
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}
