import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, Gem, RefreshCw, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { GoldRates } from '../types';
import { formatPrice, toPersianDigits } from '../utils/pricing';

interface HeroProps {
  goldRates?: GoldRates;
  onExploreShop?: () => void;
  onExploreProducts?: () => void;
  onExploreCollection?: () => void;
  onConsultation?: () => void;
  onOpenPricingModal?: () => void;
  onInstantBuyMelted?: (grams: number, tomans: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  goldRates,
  onExploreShop,
  onExploreProducts,
  onExploreCollection,
  onConsultation,
  onOpenPricingModal,
  onInstantBuyMelted,
}) => {
  const currentRate = goldRates?.rate18K || 4850000;

  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [amountTomans, setAmountTomans] = useState<number>(10000000);
  const [weightGrams, setWeightGrams] = useState<number>(Number((10000000 / currentRate).toFixed(3)));
  const [weightInputStr, setWeightInputStr] = useState<string>(toPersianDigits((10000000 / currentRate).toFixed(3)));
  const [tradeSubmitted, setTradeSubmitted] = useState<boolean>(false);

  // Sync when currentRate changes
  useEffect(() => {
    if (currentRate > 0 && amountTomans > 0) {
      const g = Number((amountTomans / currentRate).toFixed(3));
      setWeightGrams(g);
      setWeightInputStr(toPersianDigits(g));
    }
  }, [currentRate]);

  // Helper to normalize Persian/Arabic digits to English string
  const normalizeDigits = (str: string): string => {
    return str
      .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
      .replace(/,/g, '')
      .replace(/،/g, '')
      .replace(/\s/g, '');
  };

  // Sync grams when tomans change
  const handleTomansChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = normalizeDigits(e.target.value).replace(/\D/g, '');
    const num = Number(rawDigits) || 0;
    setAmountTomans(num);
    if (currentRate > 0) {
      const g = Number((num / currentRate).toFixed(3));
      setWeightGrams(g);
      setWeightInputStr(toPersianDigits(g));
    }
  };

  // Sync tomans when grams change
  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const normalized = normalizeDigits(rawVal).replace(/٫/g, '.');

    // Allow empty or valid decimal numbers
    if (normalized === '' || /^\d*\.?\d*$/.test(normalized)) {
      setWeightInputStr(rawVal);
      const val = parseFloat(normalized);
      if (!isNaN(val) && val >= 0) {
        setWeightGrams(val);
        setAmountTomans(Math.round(val * currentRate));
      } else {
        setWeightGrams(0);
        setAmountTomans(0);
      }
    }
  };

  const handleQuickAmount = (val: number) => {
    setAmountTomans(val);
    if (currentRate > 0) {
      const g = Number((val / currentRate).toFixed(3));
      setWeightGrams(g);
      setWeightInputStr(toPersianDigits(g));
    }
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (onInstantBuyMelted) {
      onInstantBuyMelted(weightGrams, amountTomans);
    }
    setTradeSubmitted(true);
    setTimeout(() => {
      setTradeSubmitted(false);
    }, 4000);
  };

  const handleExplore = onExploreShop || onExploreProducts || (() => {});
  const handleCollection = onExploreCollection || onExploreShop || (() => {});
  const handlePricing = onOpenPricingModal || onConsultation || (() => {});

  return (
    <section className="relative overflow-hidden border-b border-[#E8E4DA] bg-gradient-to-b from-[#FAFAF7] via-[#F6F4EE] to-[#FAFAF7] py-12 lg:py-20">
      {/* Background Decorative Lighting & Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Right Column: Hero Typography & Info */}
          <div className="lg:col-span-7 text-right flex flex-col items-start">
            {/* Elegant Floating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 bg-white/90 shadow-2xs mb-6">
              <Gem className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="text-xs font-semibold text-[#925B03]">
                گالری زرین • سامانه رسمی معاملات هوشمند طلا
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              <span className="text-[11px] text-[#78716C]">مظنه زنده</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1917] font-serif-luxury leading-[1.35] sm:leading-[1.3]">
              خرید و فروش آنلاین طلا{' '}
              <span className="text-[#A16207] underline decoration-[#D4AF37]/50 underline-offset-6">
                بدون اجرت
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl">
              شروع سرمایه‌گذاری امن با هر میزان سرمایه، به‌صورت ۲۴ ساعته. 
              خرید مستقیم طلای آبشده، شمش‌های ۲۴ عیار بین‌المللی و جواهرات لوکس با صدور فاکتور رسمی اتحادیه.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1C1917] text-white hover:bg-[#B8860B] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>مشاهده ویترین محصولات</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('categories-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D4AF37]/60 bg-white text-[#1C1917] font-semibold text-sm hover:border-[#B8860B] hover:bg-[#FDFBF7] transition-all shadow-2xs cursor-pointer"
              >
                دسته‌بندی‌ها
              </button>

              <button
                onClick={handlePricing}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/70 border border-[#E8E4DA] text-[#78716C] hover:text-[#1C1917] text-xs font-medium transition-colors cursor-pointer"
              >
                فرمول شفاف اتحادیه
              </button>
            </div>

            {/* Trust Badges matching Jourabian */}
            <div className="mt-10 pt-6 border-t border-[#E8E4DA] w-full grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1917]">۰٪ بدون اجرت</div>
                  <div className="text-[10px] text-[#78716C]">طلای آبشده قالبی</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#B8860B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1917]">فاکتور رسمی</div>
                  <div className="text-[10px] text-[#78716C]">اتحادیه با هولوگرام</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-[#B8860B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1917]">نقدشوندگی آنی</div>
                  <div className="text-[10px] text-[#78716C]">تسویه ۲۴ ساعته پایا</div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Signature Jourabian Instant Gold Trade Box */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#D4AF37]/40 p-6 sm:p-7 shadow-xl relative">
              
              {/* Top Rate Header Banner */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></span>
                  <span className="text-xs font-medium text-[#78716C]">مظنه ۱۸ عیار زنده:</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-[#A16207]">
                  {formatPrice(currentRate)}
                </div>
              </div>

              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-[#F5F3EF] rounded-2xl border border-[#E8E4DA]">
                <button
                  type="button"
                  onClick={() => setTradeMode('buy')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tradeMode === 'buy'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  خرید طلا
                </button>
                <button
                  type="button"
                  onClick={() => setTradeMode('sell')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    tradeMode === 'sell'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  فروش طلا
                </button>
              </div>

              {/* Trade Calculator Form */}
              <form onSubmit={handleExecuteTrade} className="mt-5 space-y-4">
                {/* Input 1: Amount in Tomans */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-1.5">
                    <span>مبلغ ({tradeMode === 'buy' ? 'پرداختی' : 'دریافتی'}):</span>
                    <span className="text-[11px] text-[#A16207] font-medium">بدون کارمزد</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={amountTomans ? amountTomans.toLocaleString('fa-IR') : ''}
                      onChange={handleTomansChange}
                      placeholder="۱۰,۰۰۰,۰۰۰"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DA] focus:border-[#B8860B] focus:bg-white rounded-xl pr-4 pl-22 py-3 text-base font-bold text-[#1C1917] text-right outline-none transition-all shadow-2xs font-mono"
                      dir="rtl"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center px-3 py-1 rounded-lg bg-[#EFECE6] border border-[#DDD8CC] text-xs font-bold text-[#78716C] pointer-events-none select-none z-10">
                      تومان
                    </div>
                  </div>
                </div>

                {/* Swap Icon */}
                <div className="flex justify-center -my-1">
                  <div className="w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-center text-[#B8860B]">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Input 2: Gold Weight in Grams */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-1.5">
                    <span>وزن معادل طلا (۱۸ عیار):</span>
                    <span className="text-[11px] text-[#78716C]">عیار ۷۵۰ استاندارد</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={weightInputStr}
                      onChange={handleGramsChange}
                      placeholder="۲.۰۶۱"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DA] focus:border-[#B8860B] focus:bg-white rounded-xl pr-4 pl-20 py-3 text-base font-bold text-[#1C1917] text-right outline-none transition-all shadow-2xs font-mono"
                      dir="rtl"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center px-3 py-1 rounded-lg bg-[#EFECE6] border border-[#DDD8CC] text-xs font-bold text-[#78716C] pointer-events-none select-none z-10">
                      گرم
                    </div>
                  </div>
                </div>

                {/* Quick amount shortcut pills */}
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(5000000)}
                    className="flex-1 py-1 rounded-lg text-[11px] bg-[#F5F3EF] hover:bg-[#EAE6DF] text-[#44403C] transition-colors cursor-pointer"
                  >
                    ۵ میلیون
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(10000000)}
                    className="flex-1 py-1 rounded-lg text-[11px] bg-[#F5F3EF] hover:bg-[#EAE6DF] text-[#44403C] transition-colors cursor-pointer"
                  >
                    ۱۰ میلیون
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(25000000)}
                    className="flex-1 py-1 rounded-lg text-[11px] bg-[#F5F3EF] hover:bg-[#EAE6DF] text-[#44403C] transition-colors cursor-pointer"
                  >
                    ۲۵ میلیون
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(50000000)}
                    className="flex-1 py-1 rounded-lg text-[11px] bg-[#F5F3EF] hover:bg-[#EAE6DF] text-[#44403C] transition-colors cursor-pointer"
                  >
                    ۵۰ میلیون
                  </button>
                </div>

                {/* Trade Execution Button matching Jourabian */}
                <button
                  type="submit"
                  className="w-full mt-3 py-3.5 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#D4AF37] hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {tradeMode === 'buy' ? 'خرید آنی طلای بدون اجرت' : 'فروش و تسویه فوری وجه'}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </form>

              {/* Feedback Alert */}
              {tradeSubmitted && (
                <div className="mt-4 p-3 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>
                    درخواست معامله {weightGrams} گرم طلا به ارزش {formatPrice(amountTomans)} با موفقیت ثبت شد! به زودی کارشناس تسویه تماس می‌گیرد.
                  </span>
                </div>
              )}

              {/* Micro-notes */}
              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-center">
                <span className="text-[10px] text-[#A8A29E]">
                  دارای نماد اعتماد تجارت الکترونیکی، مجوز صنف طلا و گواهی عیارسنجی
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
