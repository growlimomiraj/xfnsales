# Internet Plan Comparison & Referral Website — Handover & Configuration Guide

This project implements the merged design combining the complete main-page visual architecture of **XFN Sales** (`A` through `I`) with the lower disclosure-to-footer sequence of **Wawy Support** (`J` through `M`), unified under the XFN purple (`#6D2EFF`), deep purple (`#2B0A6E`), light-gray (`#F4F4F6`), white (`#FFFFFF`), and black (`#0A0A0A`) visual system.

## 1. Environment Inspection Note

In this sandboxed build environment, direct live browsing of external domains (`xfnsales.us` and `wawysupport.com`) and external image hotlinking (`Archer-Relaunch_Hero_Desktop-scaled.avif`) are unavailable. Accordingly, the layout, desktop measurements, color tokens, typography, and section sequence were built directly from the supplied measured blueprint. The promotional hero uses a faithful CSS/HTML purple-indigo gradient composition and oversized typographic rate-guarantee motif (`5 YEAR PRICE GUARANTEE`) with an accessible text equivalent, and includes an optional toggle (`useExternalHeroAssetIfReachable` in `src/config/siteData.ts`) if a local or approved asset is later supplied.

## 2. Editable Configuration Files

All business identity placeholders, contact routing, plan pricing, FAQs, disclosures, and policy drafts are centralized in two files:

- **`src/config/siteData.ts`** — Business identity constants, ZIP checker labels, hero copy, featured offers, 3-column plan comparison tiers, recognition panel, eligibility strip, 6-card product FAQ carousel, 2-card service disclosures, 6-item service FAQ accordion, 3-part privacy summary, and footer configuration.
- **`src/config/policyData.ts`** — Structured draft templates for **Privacy Policy**, **Terms & Conditions**, and **Full Disclaimer**.

## 3. Required Business Inputs Before Production Launch

Update the following placeholders in `src/config/siteData.ts` and `src/config/policyData.ts`:

| Constant / Placeholder | Current Preview Value | Required Owner Action |
| :--- | :--- | :--- |
| `BRAND_NAME` | `"[YOUR BRAND]"` | Set your official business or brand name. |
| `DOMAIN` | `"[YOUR DOMAIN]"` | Set your production domain (e.g., `example.com`). |
| `PHONE_DISPLAY` | `"[YOUR PHONE NUMBER]"` | Set human-readable phone display (e.g., `(800) 555-0199`). |
| `PHONE_E164` | `""` | Set dialable E.164 phone number (e.g., `"+18005550199"`) to enable live `tel:` links. While empty, phone CTAs open the Advisor/Contact Setup dialog instead of routing calls. |
| `SUPPORT_EMAIL` | `"[YOUR SUPPORT EMAIL]"` | Set verified support email to enable live `mailto:` links. |
| `[YOUR LEGAL ENTITY NAME]` | Draft placeholder in `policyData.ts` | Replace with your registered corporate entity name. |
| `[YOUR BUSINESS MAILING ADDRESS]` | Draft placeholder in `policyData.ts` | Replace with your physical compliance mailing address. |
| `[EFFECTIVE DATE]` | Draft placeholder in `policyData.ts` | Replace with the date your legal policies take effect. |

## 4. Unconfirmed Preview Offer Items to Verify

All pricing and promotional terms in `src/config/siteData.ts` are preview reference figures and must be verified against active carrier partner rules before sending live traffic:

- **Featured & Comparison Tier Pricing**: `300 Mbps` at `$40/mo`, `500 Mbps` at `$45/mo`, and `1 Gig (1000 Mbps)` at `$50/mo`.
- **Promotional Rate Protection**: 5-year (60-month) price guarantee terms, AutoPay & paperless billing discount rules, and post-promotional rates.
- **Included Equipment & Extras**: Standard WiFi gateway inclusion, unlimited data allowance, and mobile bundle savings eligibility.
- **Qualifying Household Program**: Essential broadband under `$15/mo` eligibility criteria and carrier documentation requirements.
