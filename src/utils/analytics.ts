/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Universal CTA Click Tracking for Google Tag Manager (GTM) & GA4
 * Event name: cta_click
 * Parameters: button_text, button_url, page_url, button_location
 */

export interface CtaClickEventData {
  event: 'cta_click';
  button_text: string;
  button_url: string;
  page_url: string;
  button_location: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
    __DEBUG_GTM__?: boolean;
  }
}

/**
 * CSS Selector matching all clickable CTA elements across the entire application
 */
export const CTA_SELECTOR = [
  'button',
  'a[href]',
  'input[type="button"]',
  'input[type="submit"]',
  '[role="button"]',
  '.xfn-btn',
  '.xfn-call-btn',
  '.xfn-modal-cta',
  '.xfn-car-btn',
  '.wawy-faq-header',
  '[data-cta]',
  '[data-cta-button]',
].join(', ');

/**
 * Clean up text content by collapsing whitespace
 */
function cleanText(text: string): string {
  return text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Extract clean, descriptive text for any CTA button
 */
export function extractButtonText(element: HTMLElement): string {
  // 1. Explicit data attribute override
  const explicitText = element.getAttribute('data-cta-text') || element.getAttribute('data-button-text');
  if (explicitText && explicitText.trim()) {
    return cleanText(explicitText);
  }

  // 2. Visible text content
  const inner = element.innerText || element.textContent || '';
  if (inner && inner.trim()) {
    return cleanText(inner);
  }

  // 3. Accessible label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel && ariaLabel.trim()) {
    return cleanText(ariaLabel);
  }

  // 4. Title attribute
  const title = element.getAttribute('title');
  if (title && title.trim()) {
    return cleanText(title);
  }

  // 5. Input value
  if (element.tagName && element.tagName.toLowerCase() === 'input' && 'value' in element && (element as any).value) {
    return cleanText(String((element as any).value));
  }

  // 6. Contextual icon / control fallbacks
  if (element.classList && element.classList.contains('xfn-modal-close') || element.getAttribute('aria-label') === 'Close') {
    return 'Close';
  }
  if (element.classList && element.classList.contains('xfn-prev')) {
    return 'Previous Question';
  }
  if (element.classList && element.classList.contains('xfn-next')) {
    return 'Next Question';
  }

  return 'CTA Button';
}

/**
 * Extract destination URL, tel link, or action anchor for any CTA button
 */
export function extractButtonUrl(element: HTMLElement): string {
  // 1. Explicit data attribute override
  const explicitUrl = element.getAttribute('data-cta-url') || element.getAttribute('data-button-url');
  if (explicitUrl && explicitUrl.trim()) {
    return explicitUrl.trim();
  }

  const tag = element.tagName ? element.tagName.toLowerCase() : '';

  // 2. Anchor tag href
  if (tag === 'a') {
    const rawHref = element.getAttribute('href');
    if (rawHref && rawHref.trim()) {
      return rawHref.trim();
    }
    if ('href' in element && (element as any).href) {
      return (element as any).href;
    }
  }

  // 3. Form submit button
  if (tag === 'input' || tag === 'button') {
    const form = ('form' in element ? (element as any).form : null) || element.closest('form');
    if (form) {
      const action = form.getAttribute('action');
      if (action && action.trim()) {
        return action.trim();
      }
    }
  }

  // 4. Modal or accordion controls
  const ariaControls = element.getAttribute('aria-controls');
  if (ariaControls) {
    return `#${ariaControls}`;
  }

  const dataTarget = element.getAttribute('data-target');
  if (dataTarget) {
    return dataTarget;
  }

  return typeof window !== 'undefined' ? window.location.href : '';
}

/**
 * Deterministically identify the section or component where the CTA is located
 */
export function extractButtonLocation(element: HTMLElement): string {
  // 1. Explicit data attribute on the element or an ancestor
  const explicitLocEl = element.closest('[data-cta-location], [data-button-location], [data-location]');
  if (explicitLocEl) {
    const loc =
      explicitLocEl.getAttribute('data-cta-location') ||
      explicitLocEl.getAttribute('data-button-location') ||
      explicitLocEl.getAttribute('data-location');
    if (loc && loc.trim()) {
      return loc.trim();
    }
  }

  // 2. Modals and Dialogs (take precedence regardless of where they sit in DOM)
  if (element.closest('#xfn-okModal, .xfn-modal, .xfn-modal-box')) {
    return 'advisor_dialog';
  }
  if (element.closest('#wawyPolicyModal, .wawy-modal-overlay, .wawy-modal-content')) {
    return 'policy_dialog';
  }

  // 3. Header & Navigation
  if (element.closest('#xfn-header, .xfn-site-header, header')) {
    return 'header';
  }

  // 4. Zip Code Checker & Form
  if (element.closest('#xfn-start, .xfn-addr-hero, #xfn-addrForm')) {
    return 'zip_checker';
  }

  // 5. Promo Hero
  if (element.closest('#xfn-hero, .xfn-hero')) {
    return 'hero';
  }

  // 6. Featured Offers (Price Cards)
  if (element.closest('.xfn-price-cards, [aria-label="Featured plans"]')) {
    return 'featured_offers';
  }

  // 7. Plan Comparison Grid
  if (element.closest('#xfn-plans, .xfn-plan-grid')) {
    return 'plan_comparison';
  }

  // 8. Recognition Panel / Award
  if (element.closest('#xfn-award, .xfn-award')) {
    return 'recognition_panel';
  }

  // 9. Eligibility Banner
  if (element.closest('.xfn-eligibility, [aria-label="Low-cost internet"]')) {
    return 'eligibility_banner';
  }

  // 10. Product FAQ Carousel
  if (element.closest('#xfn-faq, .xfn-faq-view, .xfn-carousel-wrap, #xfn-faqDots')) {
    return 'faq_carousel';
  }

  // 11. Service Disclosures
  if (element.closest('#wawy-disclaimer, .wawy-disclaimer-section')) {
    return 'service_disclosures';
  }

  // 12. Service FAQ Accordion
  if (element.closest('#wawy-faq, .wawy-faq-section, .wawy-faq-wrap')) {
    return 'service_faq';
  }

  // 13. Privacy Summary
  if (element.closest('#wawy-privacy-summary, .wawy-privacy-section')) {
    return 'privacy_summary';
  }

  // 14. Footer
  if (element.closest('.wawy-footer, footer')) {
    return 'footer';
  }

  // 15. Semantic container fallback
  const container = element.closest('section, header, footer, dialog, aside, nav, main');
  if (container) {
    if (container.id) {
      return container.id.replace(/^xfn-|^wawy-/, '');
    }
    return container.tagName.toLowerCase();
  }

  return 'main';
}

/**
 * Dispatch the cta_click event to the existing GTM container
 */
export function trackCtaClick(params: {
  button_text: string;
  button_url: string;
  page_url?: string;
  button_location: string;
}): void {
  if (typeof window === 'undefined') return;

  const payload: CtaClickEventData = {
    event: 'cta_click',
    button_text: params.button_text || 'CTA Button',
    button_url: params.button_url || window.location.href,
    page_url: params.page_url || window.location.href,
    button_location: params.button_location || 'main',
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (window.__DEBUG_GTM__) {
    console.log('[GTM cta_click]', payload);
  }
}

// Tracking state to strictly prevent duplicate firing
const handledEvents = new WeakSet<Event>();
let lastClickTimestamp = 0;
let lastClickedElement: HTMLElement | null = null;

/**
 * Initialize universal click listener across document.
 * Uses event delegation to seamlessly capture clicks on any button,
 * including dynamically rendered dialogs and future components.
 */
export function initCtaTracking(): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const handleClick = (event: MouseEvent) => {
    // 1. Prevent duplicate handling of the same event instance
    if (handledEvents.has(event)) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (!target) return;

    // 2. Traverse up to find the closest interactive CTA button or link
    const cta = target.closest<HTMLElement>(CTA_SELECTOR);
    if (!cta) return;

    // 3. Ignore non-clickable inputs (e.g. typing into the zip text input)
    if (
      cta.tagName &&
      cta.tagName.toLowerCase() === 'input' &&
      cta.getAttribute('type') !== 'submit' &&
      cta.getAttribute('type') !== 'button'
    ) {
      return;
    }

    // 4. Debounce rapid identical clicks on the exact same element within 250ms
    const now = Date.now();
    if (lastClickedElement === cta && now - lastClickTimestamp < 250) {
      return;
    }
    lastClickTimestamp = now;
    lastClickedElement = cta;
    handledEvents.add(event);

    // 5. Extract event parameters
    const button_text = extractButtonText(cta);
    const button_url = extractButtonUrl(cta);
    const page_url = window.location.href;
    const button_location = extractButtonLocation(cta);

    // 6. Push cta_click to GTM dataLayer
    trackCtaClick({
      button_text,
      button_url,
      page_url,
      button_location,
    });
  };

  // Capture phase ensures we record CTA clicks even if nested handlers call stopPropagation
  document.addEventListener('click', handleClick, { capture: true });

  return () => {
    document.removeEventListener('click', handleClick, { capture: true });
  };
}
