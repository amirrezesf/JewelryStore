import React from 'react';
import { X, Sparkles, ShieldCheck, MapPin, Phone, MessageCircle, Clock, Award, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { GoldRates } from '../types';
import { formatPrice } from '../utils/pricing';

interface StaticPagesModalProps {
  type: 'pricing' | 'about' | 'contact' | 'faq' | 'terms' | null;
  onClose: () => void;
  goldRates: GoldRates;
}

export const StaticPagesModal: React.FC<StaticPagesModalProps> = ({
  type,
  onClose,
  goldRates,
}) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white border border-[#E8E4DA] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE]">
          <h3 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
            {type === 'pricing' && (
              <>
                <Sparkles className="w-4 h-4 text-[#B8860B]" />
                <span>سیستم شفاف قیمت‌گذاری طلا و قوانین صنف</span>
              </>
            )}
            {type === 'about' && (
              <>
                <Award className="w-4 h-4 text-[#B8860B]" />
                <span>درباره خانه طلا و جواهرات زرین</span>
              </>
            )}
            {type === 'contact' && (
              <>
                <MapPin className="w-4 h-4 text-[#B8860B]" />
                <span>اطلاعات بوتیک و رزرو مشاوره VIP</span>
              </>
            )}
            {type === 'faq' && (
              <>
                <HelpCircle className="w-4 h-4 text-[#B8860B]" />
                <span>پرسش‌های متداول خریداران</span>
              </>
            )}
            {type === 'terms' && (
              <>
                <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
                <span>قوانین رسمی، شرایط بیمه و ضمانت بازخرید</span>
              </>
            )}
          </h3>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-[#57534E] leading-relaxed">
          {/* PRICING FORMULA MODAL */}
          {type === 'pricing' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/40 text-xs shadow-2xs">
                <div className="text-sm font-bold text-[#925B03] mb-2">
                  نرخ‌های مبنای روز در بازار طلا:
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>طلای ۱۸ عیار (۷۵۰): <strong className="text-[#1C1917]">{formatPrice(goldRates.rate18K)}</strong></div>
                  <div>طلای ۲۴ عیار (۹۹۹): <strong className="text-[#1C1917]">{formatPrice(goldRates.rate24K)}</strong></div>
                </div>
                <div className="text-[11px] text-[#78716C] mt-2">
                  بروزرسانی شده: {goldRates.lastUpdated}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1C1917] mb-2">
                  فرمول دقیق و قانونی محاسبه قیمت طلا در گالری زرین:
                </h4>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] font-mono text-xs text-[#925B03] font-semibold leading-loose shadow-2xs">
                  قیمت نهایی = [وزن طلا × مظنه روز هر گرم] + اجرت ساخت + سود مصوب اتحادیه (۷٪) + مالیات ارزش افزوده (۹٪)
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#1C1917]">شفافیت در مالیات ارزش افزوده طلا:</h5>
                <p>
                  بر اساس قانون جدید مالیات بر ارزش افزوده (ابلاغی دی‌ماه ۱۴۰۰)، اصل طلای خام به طور کامل از پرداخت مالیات ۹ درصدی معاف می‌باشد.
                  در گالری زرین، این مالیات منحصراً بر روی «اجرت ساخت» و «سود قانونی مغازه» اعمال می‌گردد؛ نه بر روی کل ارزش طلا.
                </p>
                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#059669] font-medium">
                  ✓ همراه کلیه سفارش‌ها فاکتور رسمی هولوگرام‌دار صنف طلا و جواهر صادر و ارسال می‌گردد.
                </div>
              </div>
            </div>
          )}

          {/* ABOUT US */}
          {type === 'about' && (
            <div className="space-y-5">
              <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-2xs">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=85&w=1200&auto=format&fit=crop"
                  alt="کارگاه زرگری زرین"
                  className="w-full h-full object-cover"
                />
              </div>

              <p>
                «خانه طلا و جواهرات زرین» از سال ۱۳۶۸ با هدف ارتقای استانداردهای زرگری اصیل ایرانی و ارائه محصولاتی با عیار دقیق، ظرافت بی‌همتا و طراحی مینیمال آغاز به کار نمود.
              </p>
              <p>
                ما معتقدیم هر قطعه طلا تنها یک دارایی ارزشمند مادی نیست؛ بلکه اثری هنری، یادگاری ماندگار و نمادی از عشق، اعتماد و تعهد در لحظات باشکوه زندگی شماست.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-center shadow-2xs">
                  <div className="text-xl font-bold text-[#925B03] font-serif-luxury">+۳۵ سال</div>
                  <div className="text-xs text-[#78716C] mt-1">پیشینه در صنف طلا</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-center shadow-2xs">
                  <div className="text-xl font-bold text-[#925B03] font-serif-luxury">۱۰۰٪ استاندارد</div>
                  <div className="text-xs text-[#78716C] mt-1">تاییدیه ری‌گیری و کد ۷۵۰</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-center shadow-2xs">
                  <div className="text-xl font-bold text-[#925B03] font-serif-luxury">+۱۵,۰۰۰</div>
                  <div className="text-xs text-[#78716C] mt-1">فاکتور رسمی موفق</div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT & BOUTIQUE */}
          {type === 'contact' && (
            <div className="space-y-5">
              <p>
                جهت بازدید حضوری از ویترین اختصاصی، انتخاب حلقه ازدواج یا طراحی سفارشی، مشتاقانه پذیرای شما در بوتیک مرکزی زرین هستیم.
              </p>

              <div className="space-y-3.5">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-start gap-3 shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1C1917] block mb-1">نشانی بوتیک مرکزی:</span>
                    <span className="text-[#57534E]">تهران، خیابان پاسداران، نرسیده به برج سفید، نبش بوستان پنجم، عمارت طلا و جواهر زرین</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#B8860B]" />
                    <div>
                      <span className="font-bold text-[#1C1917] block">تلفن تماس و رزرواسیون VIP:</span>
                      <span className="text-xs text-[#78716C]">پاسخگویی از ساعت ۱۰ الی ۲۱</span>
                    </div>
                  </div>
                  <a
                    href="tel:02122558890"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs shadow-xs"
                  >
                    ۰۲۱-۲۲۵۵۸۸۹۰
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#16A34A]" />
                    <div>
                      <span className="font-bold text-[#1C1917] block">ارتباط اختصاصی واتس‌اپ:</span>
                      <span className="text-xs text-[#78716C]">ارسال فیلم ۳۶۰ درجه از جواهرات</span>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/989123456789"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl border border-[#25D366]/40 text-[#16A34A] bg-[#F0FDF4] font-bold text-xs hover:bg-[#DCFCE7]"
                  >
                    گفتگو در واتس‌اپ
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* FAQS */}
          {type === 'faq' && (
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2 shadow-2xs">
                  <h4 className="font-bold text-[#1C1917] flex items-start gap-2">
                    <span className="text-[#B8860B]">•</span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-[#57534E] leading-relaxed pr-3">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TERMS & POLICIES */}
          {type === 'terms' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2 shadow-2xs">
                <h4 className="font-bold text-[#1C1917]">۱. صدور فاکتور و هویت صنفی</h4>
                <p className="text-xs text-[#57534E]">
                  کلیه معاملات مطابق با ضوابط اتحادیه طلا و جواهر ثبت می‌گردد. مشخصات هویتی خریدار (کد ملی و نام) صرفاً جهت صدور سند مالکیت قانونی درج می‌شود.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2 shadow-2xs">
                <h4 className="font-bold text-[#1C1917]">۲. بیمه حمل و مسئولیت مرسوله</h4>
                <p className="text-xs text-[#57534E]">
                  مسئولیت سلامت فیزیکی و اصالت کالا تا لحظه تحویل حضوری و دریافت امضای خریدار بر عهده گالری زرین می‌باشد. مرسولات پستی دارای بیمه‌نامه تمام‌ارزش هستند.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2 shadow-2xs">
                <h4 className="font-bold text-[#1C1917]">۳. تعهد بازخرید مادام‌العمر</h4>
                <p className="text-xs text-[#57534E]">
                  گالری زرین متعهد است تمامی مصنوعات طلای خود را در هر زمان به همراه فاکتور اصلی، بر اساس نرخ روز طلای تابلوی صنف از مشتری خریداری نماید.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
