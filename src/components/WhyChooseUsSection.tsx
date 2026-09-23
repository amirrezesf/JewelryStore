import React from 'react';
import { ShieldCheck, Zap, Lock, Sparkles, ArrowLeft } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onStartTrading?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onStartTrading }) => {
  const pillars = [
    {
      id: 1,
      title: 'خرید و فروش ۲۴ ساعته بدون اجرت',
      description: 'امکان خرید و فروش آنلاین طلای آبشده و شمش در تمامی ساعات شبانه‌روز با کمترین کارمزد و صفر درصد اجرت ساخت.',
      icon: Zap,
      badge: '۰٪ اجرت ساخت',
      stat: '۲۴/۷ فعال',
    },
    {
      id: 2,
      title: 'نقدشوندگی سریع و تسویه آسان',
      description: 'تبدیل آنی طلا به وجه نقد و واریز مستقیم به شماره شبای بانکی شما در اولین سیکل تسویه پایا و ساتنا کشوری.',
      icon: Sparkles,
      badge: 'تسویه بانکی شتاب',
      stat: 'زیر ۳۰ دقیقه',
    },
    {
      id: 3,
      title: 'نگهداری امن و سرمایه‌گذاری مطمئن',
      description: 'امکان ذخیره امن در خزانه بیمه‌شده گالری یا درخواست تحویل فیزیکی با بیمه‌نامه رسمی پست تا درب منزل.',
      icon: Lock,
      badge: 'ضمانت ۱۰۰٪ اصالت',
      stat: 'بیمه کامل مرسوله',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E4DA]">
      {/* Title Header matching Jourabian */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          چرا ما را انتخاب کنید؟
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-xl mx-auto">
          بدون اجرت، نقدشوندگی بالا و نگهداری امن؛ سه رکن اساسی اعتماد در گالری زرین
        </p>
      </div>

      {/* 3 Pillars Grid matching Jourabian */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar) => {
          const IconComp = pillar.icon;
          return (
            <div
              key={pillar.id}
              className="relative rounded-3xl bg-white border border-[#E8E4DA] p-8 shadow-sm hover:shadow-xl hover:border-[#B8860B]/70 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Top icon and badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] group-hover:scale-110 group-hover:bg-[#B8860B] group-hover:text-white transition-all shadow-xs">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#925B03] border border-[#D4AF37]/30">
                    {pillar.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] group-hover:text-[#A16207] transition-colors leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Stat pill */}
              <div className="mt-8 pt-5 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-xs text-[#78716C]">ویژگی متمایز:</span>
                <span className="text-xs font-bold text-[#1C1917] bg-[#F5F3EF] px-3 py-1 rounded-full">
                  {pillar.stat}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action */}
      {onStartTrading && (
        <div className="mt-12 text-center">
          <button
            onClick={onStartTrading}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1917] text-white hover:bg-[#B8860B] font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <span>شروع سرمایه‌گذاری آنلاین طلا</span>
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      )}
    </section>
  );
};
