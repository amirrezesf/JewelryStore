import React, { useState } from 'react';
import { Smartphone, Download, Check, Share2, PlusSquare, X } from 'lucide-react';

export const MobileAppBanner: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] text-white p-8 sm:p-12 shadow-xl border border-[#D4AF37]/30">
        {/* Glow circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text */}
          <div className="text-right max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              <span>نسخه هوشمند وب‌اپلیکیشن (PWA)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white tracking-tight">
              دسترسی آسان از موبایل و دسکتاپ
            </h2>
            <p className="mt-3 text-sm text-[#D6D3D1] leading-relaxed">
              با افزودن گالری زرین به صفحه اصلی گوشی، در هر لحظه به مظنه زنده، خرید و فروش فوری بدون اجرت و فاکتورهای رسمی خود دسترسی داشته باشید؛ بدون نیاز به اشغال حافظه.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:brightness-105 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>راهنمای نصب PWA روی گوشی</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#4ADE80]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'لینک کپی شد' : 'اشتراک‌گذاری آدرس'}</span>
              </button>
            </div>
          </div>

          {/* Right Phone Mockup Card */}
          <div className="w-64 sm:w-72 bg-[#262220] border-2 border-[#D4AF37]/50 rounded-3xl p-4 shadow-2xl shrink-0 text-center">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3"></div>
            <div className="bg-[#1C1917] rounded-2xl p-4 border border-[#3E3935] text-right space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#3E3935]">
                <span className="text-[#D4AF37] font-bold">گالری زرین</span>
                <span className="text-[10px] text-[#A8A29E]">مظنه زنده</span>
              </div>
              <div className="text-sm font-bold text-white">خرید آنلاین طلای آبشده</div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs flex justify-between items-center">
                <span className="text-[#A8A29E]">کارمزد:</span>
                <span className="text-[#4ADE80] font-bold">۰٪ بدون اجرت</span>
              </div>
              <div className="w-full py-2 rounded-lg bg-[#B8860B] text-white text-xs font-bold text-center">
                معامله ۲۴ ساعته
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PWA Instruction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-8 max-w-md w-full shadow-2xl text-right">
            <div className="flex items-center justify-between pb-4 border-b border-[#F0ECE1]">
              <h3 className="text-lg font-bold text-[#1C1917]">نحوه نصب نسخه وب‌اپلیکیشن</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-[#78716C] hover:bg-[#F5F3EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-[#57534E]">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>در آیفون (Safari):</span>
                </div>
                <p>
                  ۱. روی دکمه Share (آیکون اشتراک‌گذاری) در پایین مرورگر بزنید.<br />
                  ۲. گزینه <strong>Add to Home Screen</strong> را انتخاب فرمایید.<br />
                  ۳. در گوشه بالا روی <strong>Add</strong> بزنید.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                <div className="font-bold text-[#1C1917] mb-1 flex items-center gap-1.5">
                  <PlusSquare className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>در اندروید (Chrome):</span>
                </div>
                <p>
                  ۱. روی آیکون سه‌نقطه در بالای مرورگر کروم بزنید.<br />
                  ۲. گزینه <strong>نصب برنامه (Install App)</strong> یا <strong>افزودن به صفحه اصلی</strong> را لمس کنید.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-3 rounded-xl bg-[#1C1917] text-white font-semibold text-xs hover:bg-[#B8860B] transition-colors"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
