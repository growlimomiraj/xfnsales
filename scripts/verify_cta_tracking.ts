/**
 * Verification test for Call CTA click tracking
 * Ensures ONLY call buttons trigger the cta_click event,
 * and that 'Find My Offer' / 'Find My Plan' and other non-call CTAs are excluded.
 */
import {
  extractButtonText,
  extractButtonUrl,
  extractButtonLocation,
  trackCtaClick,
  initCtaTracking,
  isCallButton,
  CALL_CTA_SELECTOR,
  CtaClickEventData,
} from '../src/utils/analytics';

// Simple lightweight DOM mock for Node.js verification environment
class MockClassList {
  classes = new Set<string>();
  constructor(initial: string = '') {
    initial.split(/\s+/).filter(Boolean).forEach((c) => this.classes.add(c));
  }
  add(c: string) { this.classes.add(c); }
  contains(c: string) { return this.classes.has(c); }
  remove(c: string) { this.classes.delete(c); }
}

class MockElement {
  tagName: string;
  id: string = '';
  attributes: Record<string, string> = {};
  classList: MockClassList;
  parentElement: MockElement | null = null;
  children: MockElement[] = [];
  innerText: string = '';
  textContent: string = '';
  value: string = '';
  type: string = '';
  href: string = '';

  constructor(tagName: string) {
    this.tagName = tagName.toUpperCase();
    this.classList = new MockClassList();
  }

  hasAttribute(name: string): boolean {
    return this.getAttribute(name) !== null;
  }

  getAttribute(name: string): string | null {
    if (name === 'id') return this.id || null;
    if (name === 'href') return this.href || null;
    if (name === 'type') return this.type || null;
    if (name === 'value') return this.value || null;
    return this.attributes[name] ?? null;
  }

  setAttribute(name: string, val: string) {
    if (name === 'id') this.id = val;
    else if (name === 'href') this.href = val;
    else if (name === 'type') this.type = val;
    else if (name === 'value') this.value = val;
    else this.attributes[name] = val;
  }

  appendChild(child: MockElement) {
    child.parentElement = this;
    this.children.push(child);
  }

  closest(selector: string): MockElement | null {
    const selectors = selector.split(',').map((s) => s.trim());
    let curr: MockElement | null = this;
    while (curr) {
      for (const sel of selectors) {
        if (curr.matchesSelector(sel)) {
          return curr;
        }
      }
      curr = curr.parentElement;
    }
    return null;
  }

  matchesSelector(sel: string): boolean {
    if (sel.startsWith('#')) {
      return this.id === sel.slice(1);
    }
    if (sel.startsWith('.')) {
      return this.classList.contains(sel.slice(1));
    }
    if (sel.includes('[')) {
      const tagPart = sel.split('[')[0];
      if (tagPart && this.tagName.toLowerCase() !== tagPart.toLowerCase()) {
        return false;
      }
      const bracketMatch = sel.match(/\[([^\]]+)\]/);
      if (bracketMatch) {
        const inside = bracketMatch[1];
        if (inside.includes('^=')) {
          const [attr, valWithQuotes] = inside.split('^=');
          const expectedVal = valWithQuotes.replace(/['"]/g, '');
          const actualVal = this.getAttribute(attr);
          return !!actualVal && actualVal.startsWith(expectedVal);
        } else if (inside.includes('*=')) {
          const [attr, valWithQuotes] = inside.split('*=');
          const expectedVal = valWithQuotes.replace(/['"]/g, '');
          const actualVal = this.getAttribute(attr);
          return !!actualVal && actualVal.includes(expectedVal);
        } else if (inside.includes('=')) {
          const [attr, valWithQuotes] = inside.split('=');
          const expectedVal = valWithQuotes.replace(/['"]/g, '');
          return this.getAttribute(attr) === expectedVal;
        } else {
          return this.getAttribute(inside) !== null;
        }
      }
    }
    return this.tagName.toLowerCase() === sel.toLowerCase();
  }
}

// Setup global mock environment
const mockDataLayer: any[] = [];
(global as any).window = {
  dataLayer: mockDataLayer,
  location: { href: 'https://cabletvconsultation.com/' },
};
(global as any).document = {
  activeElement: null,
  body: new MockElement('body'),
  listeners: {} as Record<string, Function[]>,
  addEventListener(event: string, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  },
  removeEventListener(event: string, fn: Function) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((f: Function) => f !== fn);
    }
  },
};

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

console.log('--- Starting Call CTA Click Tracking Verification ---');

// Test 1: Button text extraction for call CTAs
const callBtn1 = new MockElement('a') as any;
callBtn1.href = 'tel:+14699028003';
callBtn1.innerText = 'Call Now: 469-902-8003';
assert(extractButtonText(callBtn1) === 'Call Now: 469-902-8003', 'Extracts innerText correctly');

const callBtn2 = new MockElement('a') as any;
callBtn2.href = 'tel:+14699028003';
callBtn2.setAttribute('aria-label', 'Call 469-902-8003 hotline');
assert(extractButtonText(callBtn2) === 'Call 469-902-8003 hotline', 'Extracts aria-label when no innerText');

const callBtn3 = new MockElement('a') as any;
callBtn3.href = 'tel:+14699028003';
callBtn3.setAttribute('data-cta-text', 'Direct Hotline');
callBtn3.innerText = 'Fallback';
assert(extractButtonText(callBtn3) === 'Direct Hotline', 'Prioritizes data-cta-text override');

// Test 2: Button URL extraction
const phoneLink = new MockElement('a') as any;
phoneLink.setAttribute('href', 'tel:+14699028003');
assert(extractButtonUrl(phoneLink) === 'tel:+14699028003', 'Extracts anchor href for phone CTA');

// Test 3: isCallButton detection
assert(isCallButton(phoneLink), 'Identifies anchor with tel: href as call button');

const nonCallSubmit = new MockElement('button') as any;
nonCallSubmit.setAttribute('type', 'submit');
nonCallSubmit.classList.add('xfn-addr-submit');
nonCallSubmit.innerText = 'Find My Plan';
assert(!isCallButton(nonCallSubmit), 'Identifies "Find My Plan" submit button as NON-call CTA');

const faqAccordion = new MockElement('button') as any;
faqAccordion.classList.add('wawy-faq-header');
faqAccordion.innerText = 'What speeds do I get?';
assert(!isCallButton(faqAccordion), 'Identifies FAQ accordion header as NON-call CTA');

const modalClose = new MockElement('button') as any;
modalClose.classList.add('xfn-modal-close');
assert(!isCallButton(modalClose), 'Identifies modal close button as NON-call CTA');

// Test 4: Button Location identification
const header = new MockElement('header') as any;
header.id = 'xfn-header';
header.setAttribute('data-cta-location', 'header');
const headerCallBtn = new MockElement('a') as any;
headerCallBtn.classList.add('xfn-call-btn');
headerCallBtn.setAttribute('href', 'tel:+14699028003');
header.appendChild(headerCallBtn);
assert(extractButtonLocation(headerCallBtn) === 'header', 'Identifies button location in header');

const advisorModal = new MockElement('div') as any;
advisorModal.id = 'xfn-okModal';
advisorModal.setAttribute('data-cta-location', 'advisor_dialog');
const advisorCallBtn = new MockElement('a') as any;
advisorCallBtn.classList.add('xfn-modal-cta');
advisorCallBtn.setAttribute('href', 'tel:+14699028003');
advisorModal.appendChild(advisorCallBtn);
assert(extractButtonLocation(advisorCallBtn) === 'advisor_dialog', 'Identifies button location in dynamic advisor dialog');

// Test 5: Direct trackCtaClick pushes correct payload structure
trackCtaClick({
  button_text: '469-902-8003',
  button_url: 'tel:+14699028003',
  button_location: 'header',
});

const lastPush: CtaClickEventData = mockDataLayer[mockDataLayer.length - 1];
assert(lastPush.event === 'cta_click', 'Pushes event named "cta_click"');
assert(lastPush.button_text === '469-902-8003', 'Includes correct button_text parameter');
assert(lastPush.button_url === 'tel:+14699028003', 'Includes correct button_url parameter');
assert(lastPush.page_url === 'https://cabletvconsultation.com/', 'Includes correct page_url parameter');
assert(lastPush.button_location === 'header', 'Includes correct button_location parameter');

// Test 6: Verify click listener triggers ONLY for call buttons and rejects others
const cleanup = initCtaTracking();
const clickHandler = (global as any).document.listeners.click[0];
assert(typeof clickHandler === 'function', 'Registers click listener on document');

const initialLength = mockDataLayer.length;

// A) Click on valid call button in header -> MUST FIRE
const callEvent = { target: headerCallBtn };
clickHandler(callEvent);
assert(mockDataLayer.length === initialLength + 1, 'Triggers cta_click on valid call button click');
assert(mockDataLayer[mockDataLayer.length - 1].button_location === 'header', 'Captured header call button click');

// B) Duplicate same event instance -> MUST BE DEDUPLICATED
clickHandler(callEvent);
assert(mockDataLayer.length === initialLength + 1, 'Prevents duplicate firing from same event instance');

// C) Rapid double click (<250ms) -> MUST BE DEBOUNCED
const rapidSecondCall = { target: headerCallBtn };
clickHandler(rapidSecondCall);
assert(mockDataLayer.length === initialLength + 1, 'Prevents duplicate firing from rapid double clicks');

// D) Click on nested element inside call button (e.g. span inside card call button) -> MUST FIRE
const cardCallBtn = new MockElement('a') as any;
cardCallBtn.setAttribute('href', 'tel:+14699028003');
const cardSpan = new MockElement('span') as any;
cardSpan.innerText = 'Shop internet';
cardCallBtn.appendChild(cardSpan);

const nestedCallEvent = { target: cardSpan };
clickHandler(nestedCallEvent);
assert(mockDataLayer.length === initialLength + 2, 'Triggers cta_click when clicking child element inside call button');

const lengthBeforeNonCalls = mockDataLayer.length;

// E) Click on 'Find My Offer' / 'Find My Plan' submit button -> MUST NOT FIRE!
const zipSection = new MockElement('section') as any;
zipSection.id = 'xfn-start';
zipSection.setAttribute('data-cta-location', 'zip_checker');
zipSection.appendChild(nonCallSubmit);

const findOfferEvent = { target: nonCallSubmit };
clickHandler(findOfferEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls, 'DOES NOT fire cta_click on "Find My Offer / Plan" submit button');

// F) Click on FAQ Accordion Header -> MUST NOT FIRE!
const faqEvent = { target: faqAccordion };
clickHandler(faqEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls, 'DOES NOT fire cta_click on FAQ accordion header');

// G) Click on Modal Close button -> MUST NOT FIRE!
const modalCloseEvent = { target: modalClose };
clickHandler(modalCloseEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls, 'DOES NOT fire cta_click on modal close button');

// H) Click on Footer Policy button (e.g. Privacy Policy) -> MUST NOT FIRE!
const policyBtn = new MockElement('button') as any;
policyBtn.innerText = 'Privacy Policy';
const policyEvent = { target: policyBtn };
clickHandler(policyEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls, 'DOES NOT fire cta_click on Privacy Policy button');

// I) Click on ordinary link without tel: (e.g. #xfn-faq details anchor) -> MUST NOT FIRE!
const detailsLink = new MockElement('a') as any;
detailsLink.setAttribute('href', '#xfn-faq');
detailsLink.innerText = 'View details';
const detailsEvent = { target: detailsLink };
clickHandler(detailsEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls, 'DOES NOT fire cta_click on anchor links without tel:');

// J) Click on Advisor Dialog Hotline call button -> MUST FIRE!
const advisorCallEvent = { target: advisorCallBtn };
clickHandler(advisorCallEvent);
assert(mockDataLayer.length === lengthBeforeNonCalls + 1, 'Triggers cta_click on Advisor Dialog Call Hotline button');
assert(mockDataLayer[mockDataLayer.length - 1].button_location === 'advisor_dialog', 'Captured advisor dialog call click');

cleanup();

console.log(`\nVerification Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL CALL CTA CLICK EVENT TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
