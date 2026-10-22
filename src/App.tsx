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
import { AdvisorDialog, PlanDetailsPayload } from "./components/AdvisorDialog";
import { PolicyDialog } from "./components/PolicyDialog";
import { PolicyType } from "./config/policyData";
import { FeaturedOffer } from "./config/siteData";

export default function App() {
  const [zipCode, setZipCode] = useState<string>("");
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number | null>(null);
  const [planDetailsPayload, setPlanDetailsPayload] =
    useState<PlanDetailsPayload | null>(null);
  const [advisorSource, setAdvisorSource] = useState<string>("");
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  const handleOpenAdvisor = useCallback(
    (context?: {
      source: string;
      planName?: string;
      planPrice?: number;
      details?: PlanDetailsPayload;
    }) => {
      setAdvisorSource(context?.source ?? "Site Action");
      setSelectedPlanName(context?.planName ?? null);
      setSelectedPlanPrice(
        typeof context?.planPrice === "number" ? context.planPrice : null
      );
      setPlanDetailsPayload(context?.details ?? null);
      setIsAdvisorOpen(true);
    },
    []
  );

  const handleValidZipSubmit = useCallback(
    (validatedZip: string) => {
      setZipCode(validatedZip);
      handleOpenAdvisor({
        source: `ZIP Code Format Check (${validatedZip})`,
      });
    },
    [handleOpenAdvisor]
  );

  const handleSelectOfferOrTier = useCallback(
    (planName: string, priceDollars: number, sectionSource: string) => {
      handleOpenAdvisor({
        source: sectionSource,
        planName,
        planPrice: priceDollars,
      });
    },
    [handleOpenAdvisor]
  );

  const handleViewPlanDetails = useCallback(
    (
      title: string,
      details: FeaturedOffer["fullDetails"],
      sectionSource: string
    ) => {
      handleOpenAdvisor({
        source: sectionSource,
        details: {
          title,
          ...details,
        },
      });
    },
    [handleOpenAdvisor]
  );

  const handleSelectEligibility = useCallback(() => {
    handleOpenAdvisor({
      source: "Eligibility Strip CTA",
      planName: "Essential Home Internet Program (Under $15/mo Preview)",
    });
  }, [handleOpenAdvisor]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F6] text-[#0A0A0A]">
      {/* A. Compact Header */}
      <Header
        onOpenAdvisor={(ctx) =>
          handleOpenAdvisor({
            source: ctx?.source ?? "Header Telephone CTA",
            planName: ctx?.planName,
          })
        }
      />

      <main id="main-content" className="flex-1">
        {/* B. ZIP Finder */}
        <ZipChecker
          zipCode={zipCode}
          onZipChange={setZipCode}
          onValidZipSubmit={handleValidZipSubmit}
        />

        {/* C. Internet Category Heading & D. Purple Promotional Hero */}
        <PromoHero />

        {/* E. Two Overlapping Featured-Offer Cards */}
        <FeaturedOffers
          onSelectOffer={(offerName, price) =>
            handleSelectOfferOrTier(offerName, price, "Featured Offer Card")
          }
          onViewDetails={(title, details) =>
            handleViewPlanDetails(title, details, "Featured Offer Details")
          }
        />

        {/* F. Main Three-Column Plan Comparison */}
        <PlanComparison
          onSelectTier={(tierName, price) =>
            handleSelectOfferOrTier(tierName, price, "Plan Comparison Card")
          }
          onViewDetails={(title, details) =>
            handleViewPlanDetails(title, details, "Plan Comparison Details")
          }
        />

        {/* G. Recognition-Style Panel */}
        <RecognitionPanel />

        {/* H. Eligibility Strip */}
        <EligibilityBanner onSelectEligibility={handleSelectEligibility} />

        {/* I. XFN-Style Product FAQ Carousel */}
        <ProductFaqCarousel />

        {/* J. Imported Service-Disclosure Section — Start of Wawy Content */}
        <ServiceDisclosures />

        {/* K. Imported Service FAQ Accordion */}
        <ServiceFaqAccordion />

        {/* L. Imported Privacy and Consumer-Trust Summary */}
        <PrivacySummary />
      </main>

      {/* M. Complete Final Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenAdvisor={(ctx) =>
          handleOpenAdvisor({
            source: ctx?.source ?? "Footer Contact",
          })
        }
      />

      {/* Interactive Advisor / ZIP / Plan Details Modal */}
      <AdvisorDialog
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        zipCode={zipCode}
        onZipChange={setZipCode}
        selectedPlanName={selectedPlanName}
        selectedPlanPrice={selectedPlanPrice}
        planDetailsPayload={planDetailsPayload}
        sourceLabel={advisorSource}
      />

      {/* Interactive Policy Modal (Privacy Policy, Terms & Conditions, Full Disclaimer) */}
      <PolicyDialog
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
        onSelectPolicy={(policy) => setActivePolicy(policy)}
      />
    </div>
  );
}
