import React from 'react';
import { ShieldCheck, FileCheck, Truck, Gift, Headset } from 'lucide-react';

export const TrustFeatures: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'ضمانت ۱۰۰٪ اصالت و عیار',
      description: 'تمامی قطعات با عیار استاندارد ۷۵۰ و ۹۹۹ حک شده توسط اتحادیه طلا و جواهر تحویل می‌شوند.',
    },
    {
      icon: FileCheck,
      title: 'صدور فاکتور رسمی صنف',
      description: 'ارائه فاکتور رسمی چاپی هولوگرام‌دار دارای مشخصات کامل، وزن دقیق و کد رهگیری صنفی.',
    },
    {
      icon: Truck,
      title: 'ارسال فوق‌امنیتی و بیمه‌شده',
      description: 'ارسال با پیک اختصاصی مسلح در تهران و پست هوایی با بیمه‌نامه کامل ارزش ریالی برای کل کشور.',
    },
    {
      icon: Gift,
      title: 'بسته‌بندی نفیس هاردباکس',
      description: 'جعبه مخمل لوکس با پاپیون ابریشمی زرین و ساک هاردباکس شکیل آماده برای هدیه.',
    },
    {
      icon: Headset,
      title: 'مشاوره تخصصی و VIP',
      description: 'پشتیبانی اختصاصی کارشناسان طلا و جواهر جهت انتخاب وزن، سایز و استعلامات لحظه‌ای.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold tracking-wider text-[#925B03] uppercase block mb-1">
          TRUST & ASSURANCE
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#1C1917]">
          تعهدات و استانداردهای اعتماد زرین
        </h2>
        <p className="mt-2 text-sm text-[#57534E]">
          اصول بنیادینی که خرید طلای آنلاین را به تجربه‌ای آسوده، ایمن و ماندگار تبدیل می‌کند.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-[#E8E4DA] hover:border-[#B8860B]/50 shadow-xs hover:shadow-md transition-all text-center flex flex-col items-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-center mb-4 group-hover:border-[#B8860B] group-hover:bg-[#B8860B]/10 transition-colors shadow-2xs">
                <Icon className="w-6 h-6 text-[#925B03]" />
              </div>
              <h3 className="text-sm font-semibold text-[#1C1917] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#57534E] leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
