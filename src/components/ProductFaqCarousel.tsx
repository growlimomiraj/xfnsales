import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "../config/siteData";

export const ProductFaqCarousel: React.FC = () => {
  const { heading, items } = SITE_CONTENT.productFaqCarousel;
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Compute responsive visible card count (Desktop: 3, Tablet: 2, Mobile: 1)
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setVisibleCards(3);
      } else if (width >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  // Total valid positions = totalItems - visibleCards + 1
  // For 6 items and 3 visible cards on desktop: 6 - 3 + 1 = 4 valid positions (0, 1, 2, 3)
  const totalPositions = Math.max(1, items.length - visibleCards + 1);
  const maxIndex = totalPositions - 1;

  // Clamp currentIndex whenever visibleCards changes on resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 44;
    if (deltaX > minSwipeDistance) {
      handleNext();
    } else if (deltaX < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const gapPx = 20;

  return (
    <section
      aria-labelledby="product-faq-carousel-heading"
      className="w-full bg-[#F4F4F6] py-[52px] md:py-[72px]"
    >
      <div className="site-container">
        {/* Header Row with Left-Aligned Heading (~33px, weight 800) & Circular Prev/Next Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
          <h2
            id="product-faq-carousel-heading"
            className="text-[27px] sm:text-[33px] font-extrabold leading-[1.18] tracking-tight text-[#0A0A0A]"
          >
            {heading}
          </h2>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous FAQ card"
              className="w-11 h-11 rounded-full border border-[#C9C9D1] bg-[#FFFFFF] text-[#0A0A0A] inline-flex items-center justify-center transition-colors enabled:hover:border-[#6D2EFF] enabled:hover:text-[#6D2EFF] enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.4} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next FAQ card"
              className="w-11 h-11 rounded-full border border-[#C9C9D1] bg-[#FFFFFF] text-[#0A0A0A] inline-flex items-center justify-center transition-colors enabled:hover:border-[#6D2EFF] enabled:hover:text-[#6D2EFF] enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Product Frequently Asked Questions"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden rounded-[12px] focus-visible:outline-2 focus-visible:outline-[#6D2EFF]"
        >
          <div
            className="flex items-stretch transition-transform duration-300 ease-out"
            style={{
              gap: `${gapPx}px`,
              transform: `translate3d(calc(-${currentIndex} * ((100% + ${gapPx}px) / ${visibleCards})), 0, 0)`,
            }}
          >
            {items.map((item, idx) => {
              const isVisible =
                idx >= currentIndex && idx < currentIndex + visibleCards;
              return (
                <article
                  key={item.id}
                  aria-hidden={!isVisible}
                  className="bg-[#FFFFFF] border border-[#E6E6EA] rounded-[12px] px-[24px] py-[28px] sm:px-[28px] sm:py-[30px] flex flex-col justify-between shrink-0"
                  style={{
                    width: `calc((100% - ${(visibleCards - 1) * gapPx}px) / ${visibleCards})`,
                    minHeight: "268px",
                  }}
                >
                  <div>
                    <h3 className="text-[19px] sm:text-[20px] font-bold leading-[1.3] text-[#6D2EFF] mb-3.5">
                      {item.question}
                    </h3>
                    <p className="text-[15px] sm:text-[15.5px] leading-[1.6] text-[#5A5A5A]">
                      {item.answer}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots + Position Counter */}
        <div className="mt-7 flex items-center justify-center gap-2.5" role="tablist" aria-label="Carousel pagination">
          {Array.from({ length: totalPositions }).map((_, posIdx) => {
            const isActive = posIdx === currentIndex;
            return (
              <button
                key={posIdx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show FAQ position ${posIdx + 1} of ${totalPositions}`}
                onClick={() => setCurrentIndex(posIdx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "w-7 bg-[#6D2EFF]"
                    : "w-2.5 bg-[#C9C9D1] hover:bg-[#9D9DA8]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
