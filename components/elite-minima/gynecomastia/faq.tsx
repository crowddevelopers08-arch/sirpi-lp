'use client'

import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: 'Can exercise completely remove gynecomastia?',
      answer: 'Exercise can help reduce overall body fat, but it may not eliminate persistent glandular breast tissue. The appropriate treatment depends on the individual assessment.'
    },
    {
      question: 'Will gynecomastia surgery leave scars?',
      answer: 'Surgical correction can involve incisions, and the location and visibility of scars depend on the technique used and individual healing. Your surgeon will explain the expected incision and scar pattern during consultation.'
    },
    {
      question: 'Is gynecomastia surgery painful?',
      answer: 'Some discomfort, swelling and tightness can occur after surgery. Your surgical team will provide appropriate post-operative care and medication guidance.'
    },
    {
      question: 'Can gynecomastia come back after surgery?',
      answer: 'The outcome depends on the underlying cause, treatment performed and individual factors. Your surgeon can discuss the possibility of recurrence during consultation.'
    },
    {
      question: 'Do I need a consultation before deciding?',
      answer: 'Yes. A consultation allows the surgeon to assess your condition, understand your concerns and explain the appropriate treatment options.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="bg-[var(--g-bone)] py-12 sm:py-14 md:py-15 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-10 lg:gap-12 xl:gap-16">

          {/* =========================================== */}
          {/* DESKTOP LAYOUT - Left Side - Header and Grid (Unchanged) */}
          {/* =========================================== */}
          <div className="hidden lg:block">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[var(--g-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--g-accent)]">FAQ</p>
              </div>
              <h2 className="text-black mb-4" style={{ color: "#000000" }}>
                Frequently Asked Questions
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-[var(--g-ink)]/75">
                Clear answers to the questions men most often ask before considering gynecomastia correction.
              </p>
            </div>

            {/* Desktop Grid Layout Section - Unchanged */}
            <div className="grid grid-cols-7 grid-rows-6 gap-2 h-[350px]">
              {/* Div 1 - Larger left area */}
              <div className="col-span-4 row-span-6 bg-gradient-to-br from-[var(--g-accent)] to-[var(--g-violet-deep)] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/faq-1.jpg"
                  alt="Medical consultation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Div 2 - Top right */}
              <div className="col-span-3 row-span-3 col-start-5 bg-gradient-to-br from-[var(--g-base)] to-[var(--g-raised)] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/faq-2.jpg"
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Div 3 - Bottom right */}
              <div className="col-span-3 row-span-3 col-start-5 row-start-4 bg-gradient-to-br from-[var(--g-accent)] to-[var(--g-violet-deep)] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/faq-3.jpg"
                  alt="Medical equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* =========================================== */}
          {/* MOBILE/TABLET LAYOUT - Left Side - Header and ORIGINAL GRID IMAGE */}
          {/* =========================================== */}
          <div className="lg:hidden">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <svg className="w-5 h-5 text-[var(--g-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--g-accent)]">FAQ</p>
              </div>
              <h2 className="text-black mb-3 sm:mb-4" style={{ color: "#000000" }}>
                Frequently Asked Questions
              </h2>
              <p className="text-[0.95rem] leading-relaxed text-[var(--g-ink)]/75">
                Clear answers to the questions men most often ask before considering gynecomastia correction.
              </p>
            </div>

            {/* MOBILE/TABLET - ORIGINAL GRID LAYOUT (Adapted for smaller screens) */}
            <div className="grid grid-cols-3 grid-rows-4 gap-2 h-[300px] sm:h-[350px] md:h-[400px] mb-8 sm:mb-10">
              {/* Div 1 - Larger left area - Takes 2 columns, full height */}
              <div className="col-span-2 row-span-4 bg-gradient-to-br from-[var(--g-accent)] to-[var(--g-violet-deep)] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img
                  src="/faq-1.jpg"
                  alt="Medical consultation"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Div 2 - Top right - Takes 1 column, 2 rows */}
              <div className="col-span-1 row-span-2 col-start-3 bg-gradient-to-br from-[var(--g-base)] to-[var(--g-raised)] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img
                  src="/faq-2.jpg"
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Div 3 - Bottom right - Takes 1 column, 2 rows */}
              <div className="col-span-1 row-span-2 col-start-3 row-start-3 bg-gradient-to-br from-[var(--g-accent)] to-[var(--g-violet-deep)] rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                <img
                  src="/faq-3.jpg"
                  alt="Medical equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* =========================================== */}
          {/* Right Side - FAQ Accordion - Fully Responsive */}
          {/* =========================================== */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md ${
                  openIndex === index ? 'border-[var(--g-accent)]' : 'border-[var(--g-bone-line)]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 md:p-6 text-left hover:bg-[var(--g-bone)] transition-colors"
                >
                  <span className="flex items-start gap-3 pr-3 sm:pr-4">
                    <span className="text-[0.95rem] sm:text-[1rem] font-bold leading-snug text-[var(--g-accent)] tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.95rem] sm:text-[1rem] font-bold leading-snug text-[var(--g-accent-deep)]">
                      {faq.question}
                    </span>
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[var(--g-accent)] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 pl-[3.25rem] sm:pl-[3.5rem] md:pl-[3.75rem]">
                    <p className="text-[0.92rem] leading-relaxed text-[var(--g-ink)]/75">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Contact CTA - Mobile Only */}
            <div className="lg:hidden bg-[var(--g-bone-2)] border border-[var(--g-bone-line)] rounded-xl p-4 sm:p-5 mt-4 sm:mt-6">
              <p className="text-[var(--g-accent-deep)] font-bold text-[0.95rem] mb-3">
                Still have questions?
              </p>
              <button className="g-btn g-btn-ink w-full sm:w-auto" onClick={() => {
                  const section = document.getElementById("book");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}>
                Talk to Our Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .lg\\:block {
            display: none !important;
          }
        }

        @media (min-width: 1024px) {
          .lg\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;
