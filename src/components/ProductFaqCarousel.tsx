import React, { useEffect, useRef, useState, useCallback } from "react";
import { SITE_CONTENT } from "../config/siteData";

export const ProductFaqCarousel: React.FC = () => {
  const { heading, items } = SITE_CONTENT.productFaqCarousel;
  const viewRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [maxIdx, setMaxIdx] = useState(3);
  const [isCarouselMode, setIsCarouselMode] = useState(true);
  const [translateX, setTranslateX] = useState(0);

  const measureCarousel = useCallback(
    (targetIdx?: number) => {
      const isDesktopOrTablet = window.matchMedia("(min-width: 641px)").matches;
      setIsCarouselMode(isDesktopOrTablet);

      const viewEl = viewRef.current;
      const trackEl = trackRef.current;
      if (!isDesktopOrTablet || !viewEl || !trackEl || !trackEl.children.length) {
        setTranslateX(0);
        setMaxIdx(0);
        return;
      }

      const firstCard = trackEl.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth || 1;
      const perView = Math.max(1, Math.round(viewEl.clientWidth / cardWidth));
      const computedMax = Math.max(0, items.length - perView);
      setMaxIdx(computedMax);

      const nextIndex = Math.min(
        Math.max(typeof targetIdx === "number" ? targetIdx : index, 0),
        computedMax
      );
      if (nextIndex !== index) {
        setIndex(nextIndex);
      }

      const targetCard = trackEl.children[nextIndex] as HTMLElement | undefined;
      setTranslateX(targetCard ? -targetCard.offsetLeft : 0);
    },
    [index, items.length]
  );

  useEffect(() => {
    measureCarousel(index);
    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureCarousel();
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [measureCarousel, index]);

  const go = (nextIdx: number) => {
    const clamped = Math.min(Math.max(nextIdx, 0), maxIdx);
    setIndex(clamped);
    measureCarousel(clamped);
  };

  const totalDots = isCarouselMode ? maxIdx + 1 : 0;

  return (
    <section
      className="xfn-section"
      id="xfn-faq"
      data-cta-location="faq_carousel"
    >
      <div className="xfn-container">
        <div className="xfn-section-head">
          <h2>{heading}</h2>
        </div>

        <div className="xfn-faq-wrap">
          <button
            className="xfn-car-btn xfn-prev"
            id="xfn-faqPrev"
            type="button"
            aria-label="Previous questions"
            disabled={!isCarouselMode || index === 0}
            onClick={() => go(index - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>

          <div className="xfn-faq-view" id="xfn-faqView" ref={viewRef}>
            <div
              className="xfn-faq-track"
              id="xfn-faqTrack"
              ref={trackRef}
              style={
                isCarouselMode
                  ? { transform: `translateX(${translateX}px)` }
                  : undefined
              }
            >
              {items.map((item) => (
                <article className="xfn-faq-card" key={item.id}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul>
                      {item.bullets.map((b, bIdx) => (
                        <li key={bIdx}>
                          <b>{b.boldPrefix}</b>
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>

          <button
            className="xfn-car-btn xfn-next"
            id="xfn-faqNext"
            type="button"
            aria-label="More questions"
            disabled={!isCarouselMode || index >= maxIdx}
            onClick={() => go(index + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {totalDots >= 2 && (
          <div
            className="xfn-dots"
            id="xfn-faqDots"
            role="tablist"
            aria-label="Question pages"
          >
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? "xfn-on" : undefined}
                aria-label={`Go to question page ${i + 1} of ${totalDots}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
