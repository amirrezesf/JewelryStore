import React from 'react';
import { ArrowLeft, Sparkles, Award, ShieldCheck, Calendar } from 'lucide-react';
import { GoldRates } from '../types';

interface EditorialCollectionProps {
  goldRates?: GoldRates;
  onExplore?: () => void;
  onExploreCollection?: () => void;
  onBookAppointment?: () => void;
}

export const EditorialCollection: React.FC<EditorialCollectionProps> = ({
  onExplore,
  onExploreCollection,
  onBookAppointment,
}) => {
  const handleExplore = onExploreCollection || onExplore || (() => {});
  return (
    <section className="relative my-16 bg-[#F8F6F0] border-y border-[#E8E4DA] overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Showcase (2 high-res editorial images) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="col-span-7 relative overflow-hidden rounded-2xl border border-[#E8E4DA] shadow-xl">
              <img
                src="/ZarinJewelry/assets/images/1599643478518-a784e5dc4c8f.jpg"
                alt="کالکشن سلطنتی ماهور"
                className="w-full aspect-[3/4] object-cover object-center hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4 text-xs font-semibold text-[#925B03] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-xs">
                گردنبند سلطنتی ماهور
              </div>
            </div>

            <div className="col-span-5 space-y-4 sm:space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-[#E8E4DA] shadow-lg">
                <img
                  src="/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg"
                  alt="انگشتر الماس ماهور"
                  className="w-full aspect-square object-cover object-center hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E8E4DA] text-right shadow-2xs">
                <div className="text-xs text-[#78716C]">عیار استاندارد:</div>
                <div className="text-base font-bold text-[#1C1917] mt-0.5">۱۸ عیار استاندارد (۷۵۰)</div>
                <div className="text-[11px] text-[#925B03] mt-1 font-medium">تراش‌های میکرو برلیان VVS1</div>
              </div>
            </div>
          </div>

          {/* Editorial Storytelling Column */}
          <div className="lg:col-span-5 text-right flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-white text-xs font-semibold text-[#925B03] self-start mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              کالکشن ویژه و فاخر ۱۴۰۵
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-luxury text-[#1C1917] leading-tight mb-6">
              کالکشن سلطنتی «ماهور»
            </h2>

            <p className="text-base text-[#57534E] font-light leading-relaxed mb-6">
              «ماهور» تجلی پیوند میراث باستانی زرگری فلات ایران با مینیمالیسم مدرن آتلیه‌های اروپایی است. 
              در این کالکشن، هر قطعه با وسواس بیش از ۸۰ ساعت کار دست استادکاران ماهر زرین و استفاده از طلای ۱۸ عیار با سختی استاندارد و سنگ‌های شناسنامه‌دار خلق شده است.
            </p>

            {/* Features Checklist */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center shrink-0 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-[#B8860B]" />
                </div>
                <span className="text-sm text-[#292524]">تراش دستی میکرو با هماهنگی زاویه شکست نور</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                </div>
                <span className="text-sm text-[#292524]">شناسنامه اصالت بین‌المللی همراه با فاکتور رسمی اتحادیه</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExplore}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#D4AF37] text-white font-bold text-sm hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer shadow-md shadow-[#B8860B]/20"
              >
                <span>مشاهده آثار کالکشن ماهور</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
              {onBookAppointment && (
                <button
                  onClick={onBookAppointment}
                  className="px-6 py-3.5 rounded-full border border-[#D4AF37]/50 bg-white text-[#1C1917] hover:border-[#B8860B] hover:text-[#925B03] font-medium text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#B8860B]" />
                  <span>رزرو وقت مشاوره حضوری</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
