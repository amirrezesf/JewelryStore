import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E8E4DA]">
      {/* Title Header matching Jourabian */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#925B03] text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>پاسخگویی شفاف و دقیق</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          سوالات متداول
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#78716C]">
          پاسخ به پرتکرارترین پرسش‌های مشتریان قبل از شروع معامله و خرید طلا
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white border border-[#E8E4DA] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-[#1C1917] leading-snug">
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#B8860B]">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-[#F0ECE1] bg-[#FDFBF7]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
