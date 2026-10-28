/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Call CTA Click Tracking for Google Tag Manager (GTM) & GA4
 * Event name: cta_click
 * Parameters: button_text, button_url, page_url, button_location
 * 
 * NOTE: CTA click tracking is strictly restricted to Call buttons
 * (e.g. tel: links, header call button, card/plan call buttons, advisor hotline).
 * Non-call CTAs (such as 'Find My Plan' / 'Find My Offer', accordion headers,
 * carousel arrows, navigation links, and modal close buttons) are intentionally excluded.
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
 * CSS Selector matching all call CTA elements across the entire application.
 * Restricted strictly to direct call buttons and phone triggers.
 */
export const CALL_CTA_SELECTOR = [
  'a[href^="tel:"]',
  'a[href*="tel:"]',
  '.xfn-call-btn',
  '[data-call-button]',
  '[data-cta-type="call"]',
  '[data-cta="call"]',
].join(', ');

// Export CTA_SELECTOR alias for backward compatibility
export const CTA_SELECTOR = CALL_CTA_SELECTOR;

/**
 * Clean up text content by collapsing whitespace
 */
function cleanText(text: string): string {
  return text.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Check whether an element or any of its ancestors is a call CTA button.
 * Matches tel: links, .xfn-call-btn, or explicit call data attributes.
 */
export function findCallButton(element: HTMLElement | null): HTMLElement | null {
  if (!element) return null;

  // 1. Selector match via closest() if supported
  try {
    if (typeof element.closest === 'function') {
      const match = element.closest<HTMLElement>(CALL_CTA_SELECTOR);
      if (match) return match;
    }
  } catch {
    // Fallback if querySelector engine lacks full selector support
  }

  // 2. Traverse up ancestors to check for tel: links or explicit call attributes
  let curr: HTMLElement | null = element;
  while (curr && curr !== (typeof document !== 'undefined' ? document.body : null)) {
    // Anchor href starting with tel:
    const href = curr.getAttribute('href') || (curr as any).href || '';
    if (typeof href === 'string' && href.trim().toLowerCase().startsWith('tel:')) {
      return curr;
    }

    // Call class names
    if (curr.classList && curr.classList.contains('xfn-call-btn')) {
      return curr;
    }

    // Explicit call data attributes
    const ctaUrl = curr.getAttribute('data-cta-url') || curr.getAttribute('data-button-url') || '';
    if (ctaUrl.trim().toLowerCase().startsWith('tel:')) {
      return curr;
    }

    if (
      (typeof curr.hasAttribute === 'function' ? curr.hasAttribute('data-call-button') : curr.getAttribute('data-call-button') !== null) ||
      curr.getAttribute('data-cta-type') === 'call' ||
      curr.getAttribute('data-cta') === 'call'
    ) {
      return curr;
    }

    curr = curr.parentElement;
  }

  return null;
}

/**
 * Helper to test if a given element is a call button
 */
export function isCallButton(element: HTMLElement | null): boolean {
  return findCallButton(element) !== null;
}

/**
 * Extract clean, descriptive text for a call CTA button
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

  // 5. Input value fallback
  if (element.tagName && element.tagName.toLowerCase() === 'input' && 'value' in element && (element as any).value) {
    return cleanText(String((element as any).value));
  }

  return 'Call Button';
}

/**
 * Extract destination URL, tel link, or action anchor for the CTA button
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
    button_text: params.button_text || 'Call Button',
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
 * Strictly captures clicks on Call CTA buttons only (tel: links, header call button,
 * featured/plan call buttons, advisor hotline).
 * Ignores all non-call CTAs (e.g. 'Find My Plan' / 'Find My Offer', accordions, modal close).
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

    // 2. Identify if the clicked element (or an ancestor) is a Call button
    const callCta = findCallButton(target);
    if (!callCta) {
      // Excluded: Find My Offer, Find My Plan, Accordions, Carousel buttons, Modal close, etc.
      return;
    }

    // 3. Debounce rapid identical clicks on the exact same element within 250ms
    const now = Date.now();
    if (lastClickedElement === callCta && now - lastClickTimestamp < 250) {
      return;
    }
    lastClickTimestamp = now;
    lastClickedElement = callCta;
    handledEvents.add(event);

    // 4. Extract event parameters from the call CTA element
    const button_text = extractButtonText(callCta);
    const button_url = extractButtonUrl(callCta);
    const page_url = window.location.href;
    const button_location = extractButtonLocation(callCta);

    // 5. Push cta_click to GTM dataLayer
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
