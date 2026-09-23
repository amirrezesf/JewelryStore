import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, ShieldCheck, Instagram, Send, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onSelectCategory?: (category: Product['category']) => void;
  onNavigateCategory?: (category: Product['category']) => void;
  onOpenInfoModal?: (type: 'pricing' | 'about' | 'contact' | 'faq' | 'terms') => void;
  onOpenPricing?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenFaq?: () => void;
  onOpenTerms?: () => void;
  onOpenTracking?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectCategory,
  onNavigateCategory,
  onOpenInfoModal,
  onOpenPricing,
  onOpenAbout,
  onOpenContact,
  onOpenFaq,
  onOpenTerms,
  onOpenTracking,
  onOpenAdmin,
}) => {
  const handleNavigate = onNavigate || (() => {});
  const handleSelectCat = onSelectCategory || onNavigateCategory || (() => {});
  const handleOpenInfo = (type: 'pricing' | 'about' | 'contact' | 'faq' | 'terms') => {
    if (onOpenInfoModal) {
      onOpenInfoModal(type);
    } else {
      if (type === 'pricing' && onOpenPricing) onOpenPricing();
      else if (type === 'about' && onOpenAbout) onOpenAbout();
      else if (type === 'contact' && onOpenContact) onOpenContact();
      else if (type === 'faq' && onOpenFaq) onOpenFaq();
      else if (type === 'terms' && onOpenTerms) onOpenTerms();
    }
  };
  const handleTracking = onOpenTracking || (() => {});
  const handleAdmin = onOpenAdmin || (() => {});
  return (
    <footer className="bg-[#F7F5EE] border-t border-[#E8E4DA] pt-16 pb-12 text-[#57534E] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8E4DA]">
          {/* Col 1: Brand Story & License */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-serif-luxury text-[#1C1917]">
                گـالری طلا و جواهرات زریـن
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
            </div>
            <p className="text-xs sm:text-sm font-light leading-relaxed text-[#57534E] max-w-sm">
              بیش از ۳۵ سال پاسداری از اصالت هنر طلاسازی ایران. تمامی مصنوعات با کد استاندارد ۷۵۰ و ۹۹۹، فاکتور معتبر صنفی و شناسنامه سنگ‌های گرانبها عرضه می‌شوند.
            </p>

            <div className="p-3.5 rounded-xl bg-white border border-[#E8E4DA] space-y-1 text-xs text-[#925B03] shadow-2xs">
              <div className="flex items-center gap-2 font-medium text-[#1C1917]">
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>پروانه کسب رسمی از اتحادیه طلا و جواهر</span>
              </div>
              <p className="text-[11px] text-[#78716C]">
                شماره ثبت صنفی: ۱۴۰۱/۴۲۸۹ • شناسه یکتای کسب‌وکار طلای زرین
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase mb-4 border-b border-[#E8E4DA] pb-2">
              دسترسی سریع
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNavigate('home')}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  ویترین کلیه محصولات
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate('collections')}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  کالکشن سلطنتی ماهور
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenInfo('pricing')}
                  className="hover:text-[#B8860B] transition-colors flex items-center gap-1 text-[#925B03] font-medium cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#B8860B]" />
                  سیستم شفاف قیمت روز طلا
                </button>
              </li>
              <li>
                <button
                  onClick={handleTracking}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  پیگیری آنلاین سفارشات
                </button>
              </li>
              <li>
                <button
                  onClick={handleAdmin}
                  className="hover:text-[#925B03] transition-colors text-[#78716C] cursor-pointer"
                >
                  ورود به پنل مدیریت
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div>
            <h4 className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase mb-4 border-b border-[#E8E4DA] pb-2">
              دسته‌بندی‌ها
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('rings'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  انگشترهای تک‌نگین و سولیتر
                </button>
              </li>
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('necklaces'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  گردنبند و مدال‌های طلا
                </button>
              </li>
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('earrings'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  گوشواره‌های میخی و مجلسی
                </button>
              </li>
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('bracelets'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  دستبندهای النگویی و زنجیری
                </button>
              </li>
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('coins'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  شمش‌های ۲۴ عیار و سکه
                </button>
              </li>
              <li>
                <button
                  onClick={() => { handleNavigate('shop'); handleSelectCat('sets'); }}
                  className="hover:text-[#925B03] transition-colors cursor-pointer"
                >
                  سرویس‌های عروس و نیم‌ست
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Boutique Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase mb-4 border-b border-[#E8E4DA] pb-2">
              اطلاعات بوتیک و ارتباط
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#57534E]">
              <MapPin className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
              <span>تهران، خیابان پاسداران، نبش بوستان پنجم، عمارت طلا و جواهر زرین</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
              <Phone className="w-4 h-4 text-[#B8860B] shrink-0" />
              <a href="tel:02122558890" className="hover:text-[#925B03] dir-ltr">
                ۰۲۱ - ۲۲۵۵۸۸۹۰
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
              <MessageCircle className="w-4 h-4 text-[#B8860B] shrink-0" />
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#925B03]"
              >
                واتس‌اپ مشاوران VIP (پاسخگویی سریع)
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center text-[#57534E] hover:text-[#925B03] hover:border-[#B8860B] transition-all shadow-2xs"
                title="اینستاگرام گالری زرین"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center text-[#57534E] hover:text-[#925B03] hover:border-[#B8860B] transition-all shadow-2xs"
                title="کانال تلگرام استعلام نرخ طلا"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-[#E8E4DA] flex items-center justify-center text-[#57534E] hover:text-[#925B03] hover:border-[#B8860B] transition-all shadow-2xs"
                title="واتس‌اپ گالری زرین"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal and Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            کلیه حقوق مادی و معنوی متعلق به برند «گالری طلا و جواهرات زرین» می‌باشد. ۱۴۰۵ ©
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleOpenInfo('terms')}
              className="hover:text-[#925B03] transition-colors cursor-pointer"
            >
              قوانین و شرایط خرید
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenInfo('terms')}
              className="hover:text-[#925B03] transition-colors cursor-pointer"
            >
              حفظ حریم خصوصی
            </button>
            <span>•</span>
            <button
              onClick={() => handleOpenInfo('faq')}
              className="hover:text-[#925B03] transition-colors cursor-pointer"
            >
              پاسخ به پرسش‌ها
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
