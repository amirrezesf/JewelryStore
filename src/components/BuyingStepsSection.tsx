import React from 'react';
import { UserCheck, Wallet, Coins, Banknote, CheckCircle2, ArrowLeft } from 'lucide-react';
import { BUYING_STEPS } from '../data/mockData';

interface BuyingStepsSectionProps {
  onStartStep1?: () => void;
}

export const BuyingStepsSection: React.FC<BuyingStepsSectionProps> = ({ onStartStep1 }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#B8860B]" />;
      case 'Wallet':
        return <Wallet className="w-6 h-6 text-[#B8860B]" />;
      case 'Coins':
        return <Coins className="w-6 h-6 text-[#B8860B]" />;
      case 'Banknote':
        return <Banknote className="w-6 h-6 text-[#B8860B]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#B8860B]" />;
    }
  };

  return (
    <section id="buying-steps-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E8E4DA]">
      {/* Title Header matching Jourabian */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[#925B03] text-xs font-semibold mb-3">
          <span>مسیر گام‌به‌گام و شفاف</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          مراحل خرید طلا
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#78716C] max-w-lg mx-auto">
          از ثبت‌نام تا دریافت طلای فیزیکی، فقط در ۴ مرحله ساده و کاملاً خودکار
        </p>
      </div>

      {/* The Stepper Roadmap matching Jourabian's Start -> Steps -> End */}
      <div className="relative">
        {/* Start indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] text-[#D4AF37] text-xs font-bold shadow-sm">
            <span>شروع</span>
            <span role="img" aria-label="runner">🏃‍♂️</span>
          </div>
        </div>

        {/* Connecting central dotted line on desktop */}
        <div className="hidden md:block absolute top-12 bottom-12 right-1/2 translate-x-1/2 w-0.5 border-r-2 border-dashed border-[#D4AF37]/60 z-0"></div>

        {/* Steps Grid / Timeline */}
        <div className="space-y-8 relative z-10">
          {BUYING_STEPS.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.step}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="rounded-2xl bg-white border border-[#E8E4DA] p-6 shadow-sm hover:shadow-md hover:border-[#B8860B] transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/40 text-[11px] font-bold text-[#925B03]">
                        {item.badge}
                      </span>
                      <span className="text-xs font-extrabold text-[#78716C]">
                        گام {item.step}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Step Marker Node */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#B8860B] flex items-center justify-center shadow-md shrink-0 z-10">
                  {getIcon(item.icon)}
                </div>

                {/* Spacer on desktop to balance timeline */}
                <div className="hidden md:block flex-1"></div>
              </div>
            );
          })}
        </div>

        {/* Finish indicator */}
        <div className="flex items-center justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-xs font-bold shadow-md">
            <span>پایان و تحویل طلا</span>
            <span role="img" aria-label="finish">🏁</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      {onStartStep1 && (
        <div className="mt-12 text-center">
          <button
            onClick={onStartStep1}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1917] text-white hover:bg-[#B8860B] font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <span>شروع گام اول: ثبت‌نام و ورود</span>
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      )}
    </section>
  );
};
