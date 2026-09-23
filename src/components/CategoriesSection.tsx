import React from 'react';
import { ArrowLeft, Sparkles, Gem, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { ProductCategory } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header matching Jourabian */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#925B03] text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>تنوع بی‌نظیر برای هر نوع سلیقه و بودجه</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          دسته‌بندی محصولات
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#78716C] max-w-2xl mx-auto">
          دسترسی مستقیم و تفکیک‌شده به انواع طلای بدون اجرت، شمش‌های سرمایه‌گذاری و جواهرات نفیس
        </p>
      </div>

      {/* Grid of Categorized Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative cursor-pointer flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E8E4DA] hover:border-[#B8860B] shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Box with Floating Badge */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F3EF]">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

              {/* Tag / Badge */}
              {cat.badge && (
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1C1917]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-[11px] font-bold shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Item Count */}
              {cat.itemCount && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#1C1917] text-[11px] font-semibold">
                    {cat.itemCount} اثر موجود
                  </span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-right">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#A16207] transition-colors flex items-center justify-between">
                  <span>{cat.name}</span>
                  <Gem className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-2 text-xs text-[#78716C] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-semibold text-[#A16207]">
                <span>مشاهده و سفارش آنلاین</span>
                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#B8860B] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
