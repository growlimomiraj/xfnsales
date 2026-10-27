/**
 * Verification test for universal cta_click tracking
 */
import {
  extractButtonText,
  extractButtonUrl,
  extractButtonLocation,
  trackCtaClick,
  initCtaTracking,
  CTA_SELECTOR,
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
        if (inside.includes('=')) {
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

console.log('--- Starting Universal CTA Click Event Verification ---');

// Test 1: Button text extraction with priority order
const btn1 = new MockElement('button') as any;
btn1.innerText = 'Call Now';
assert(extractButtonText(btn1) === 'Call Now', 'Extracts innerText correctly');

const btn2 = new MockElement('button') as any;
btn2.setAttribute('aria-label', 'Close modal');
assert(extractButtonText(btn2) === 'Close modal', 'Extracts aria-label when no innerText');

const btn3 = new MockElement('input') as any;
btn3.setAttribute('type', 'submit');
btn3.value = 'Check Availability';
assert(extractButtonText(btn3) === 'Check Availability', 'Extracts input value for submit buttons');

const btn4 = new MockElement('button') as any;
btn4.setAttribute('data-cta-text', 'Custom CTA Text');
btn4.innerText = 'Fallback';
assert(extractButtonText(btn4) === 'Custom CTA Text', 'Prioritizes data-cta-text override');

// Test 2: Button URL extraction
const link1 = new MockElement('a') as any;
link1.setAttribute('href', 'tel:4699028003');
assert(extractButtonUrl(link1) === 'tel:4699028003', 'Extracts anchor href for phone CTA');

const btnAccordion = new MockElement('button') as any;
btnAccordion.setAttribute('aria-controls', 'wawy-acc-body-0');
assert(extractButtonUrl(btnAccordion) === '#wawy-acc-body-0', 'Extracts aria-controls as target anchor');

// Test 3: Button Location extraction
const header = new MockElement('header') as any;
header.id = 'xfn-header';
header.setAttribute('data-cta-location', 'header');
const headerBtn = new MockElement('a') as any;
headerBtn.setAttribute('href', 'tel:4699028003');
header.appendChild(headerBtn);
assert(extractButtonLocation(headerBtn) === 'header', 'Identifies button location in header');

const advisorModal = new MockElement('div') as any;
advisorModal.id = 'xfn-okModal';
advisorModal.setAttribute('data-cta-location', 'advisor_dialog');
const advisorCallBtn = new MockElement('a') as any;
advisorCallBtn.setAttribute('href', 'tel:4699028003');
advisorModal.appendChild(advisorCallBtn);
assert(extractButtonLocation(advisorCallBtn) === 'advisor_dialog', 'Identifies button location in dynamic advisor dialog');

const policyModal = new MockElement('div') as any;
policyModal.id = 'wawyPolicyModal';
policyModal.setAttribute('data-cta-location', 'policy_dialog');
const policyCloseBtn = new MockElement('button') as any;
policyCloseBtn.setAttribute('aria-label', 'Close modal');
policyModal.appendChild(policyCloseBtn);
assert(extractButtonLocation(policyCloseBtn) === 'policy_dialog', 'Identifies button location in dynamic policy dialog');

// Test 4: Direct trackCtaClick pushes correct payload structure
trackCtaClick({
  button_text: 'Order Online',
  button_url: 'https://cabletvconsultation.com/order',
  button_location: 'featured_offers',
});

const lastPush: CtaClickEventData = mockDataLayer[mockDataLayer.length - 1];
assert(lastPush.event === 'cta_click', 'Pushes event named "cta_click"');
assert(lastPush.button_text === 'Order Online', 'Includes correct button_text parameter');
assert(lastPush.button_url === 'https://cabletvconsultation.com/order', 'Includes correct button_url parameter');
assert(lastPush.page_url === 'https://cabletvconsultation.com/', 'Includes correct page_url parameter');
assert(lastPush.button_location === 'featured_offers', 'Includes correct button_location parameter');

// Test 5: Verify event delegation and deduplication
const cleanup = initCtaTracking();
const clickHandler = (global as any).document.listeners.click[0];
assert(typeof clickHandler === 'function', 'Registers click listener on document');

const initialLength = mockDataLayer.length;
const testEvent = {
  target: headerBtn,
};

// Simulate single click
clickHandler(testEvent);
assert(mockDataLayer.length === initialLength + 1, 'Triggers cta_click on valid CTA click');
assert(mockDataLayer[mockDataLayer.length - 1].button_location === 'header', 'Captured header CTA click');

// Simulate duplicate event instance (same Event object dispatched again)
clickHandler(testEvent);
assert(mockDataLayer.length === initialLength + 1, 'Prevents duplicate firing from same event instance');

// Simulate rapid duplicate click on same element within debounce window (< 250ms)
const rapidSecondEvent = { target: headerBtn };
clickHandler(rapidSecondEvent);
assert(mockDataLayer.length === initialLength + 1, 'Prevents duplicate firing from rapid double clicks');

// Simulate clicking a non-CTA element (e.g. plain paragraph text)
const plainParagraph = new MockElement('p') as any;
plainParagraph.innerText = 'Just some descriptive body copy';
const pEvent = { target: plainParagraph };
clickHandler(pEvent);
assert(mockDataLayer.length === initialLength + 1, 'Ignores clicks on non-CTA text elements');

cleanup();

console.log(`\nVerification Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL UNIVERSAL CTA CLICK EVENT TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
