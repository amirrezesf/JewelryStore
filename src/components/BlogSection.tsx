import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft, X, CheckCircle2 } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/mockData';
import { BlogArticle } from '../types';

export const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  return (
    <section id="blog-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E4DA]">
      {/* Title Header matching Jourabian */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#925B03] text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>مرکز آموزش تخصصی طلا</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          مجله و آموزش
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-xl mx-auto">
          آخرین تحلیل‌های بازار طلا، راهنمای خرید بدون اجرت و ترفندهای هوشمندانه حفظ ارزش دارایی
        </p>
      </div>

      {/* Blog Cards Grid matching Jourabian */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group cursor-pointer rounded-3xl bg-white border border-[#E8E4DA] hover:border-[#B8860B] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Box */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5F3EF]">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1C1917] text-[11px] font-bold shadow-xs">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-[11px] text-[#78716C] mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B8860B]" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#B8860B]" />
                    {article.publishDate}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#A16207] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2.5 text-xs text-[#57534E] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Read more */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#A16207]">
              <span>مطالعه مقاله کامل</span>
              <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#B8860B] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E4DA] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-right">
            {/* Modal Header */}
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#F5F3EF]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 right-6 left-6">
                <span className="px-3 py-0.5 rounded-full bg-[#B8860B] text-white text-[11px] font-bold">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#78716C] pb-4 border-b border-[#F0ECE1]">
                <span>نویسنده: {selectedArticle.author}</span>
                <div className="flex items-center gap-3">
                  <span>زمان مطالعه: {selectedArticle.readTime}</span>
                  <span>تاریخ: {selectedArticle.publishDate}</span>
                </div>
              </div>

              <div className="space-y-3.5 text-sm text-[#44403C] leading-relaxed pt-2">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E4DA]/60">
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#F0ECE1] flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#1C1917] text-white font-semibold text-xs hover:bg-[#B8860B] transition-colors cursor-pointer"
                >
                  بستن مقاله
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
