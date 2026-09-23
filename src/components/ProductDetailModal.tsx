import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  Check, 
  Info, 
  ZoomIn, 
  Truck, 
  RotateCcw,
  Scale,
  Gem,
  Award,
  Share2
} from 'lucide-react';
import { GoldRates, Product } from '../types';
import { calculateProductPrice, formatNumber, formatPrice, formatWeight, toPersianDigits } from '../utils/pricing';
import { triggerGoldDust } from '../utils/goldDust';

interface ProductDetailModalProps {
  product: Product | null;
  goldRates: GoldRates;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  onQuickCheckout: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  goldRates,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onQuickCheckout,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'pricing' | 'shipping'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [copiedLink, setCopiedLink] = useState(false);

  const priceInfo = calculateProductPrice(product, goldRates);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const whatsappMessage = encodeURIComponent(
    `سلام، از سایت گالری زرین تماس می‌گیرم.\nدر خصوص اثر «${product.name}» با کد «${product.code}» به وزن ${product.weightInGrams} گرم و عیار ${product.karat} عیار سوال و استعلام داشتم.`
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      {/* Container Card */}
      <div 
        className="relative w-full max-w-5xl bg-white border border-[#E8E4DA] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8E4DA] bg-[#F7F5EE]">
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span>شناسه اثر:</span>
            <span className="font-mono text-[#925B03] font-bold bg-white px-2 py-0.5 rounded border border-[#E8E4DA]">
              {product.code}
            </span>
            {product.collectionName && (
              <span className="hidden sm:inline-block text-[#A8A29E]">• {product.collectionName}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
              title="اشتراک‌گذاری لینک اثر"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] text-[#059669]">لینک کپی شد</span>
            )}

            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isWishlisted
                  ? 'text-[#B8860B] bg-[#EAE6DF]'
                  : 'text-[#78716C] hover:text-[#B8860B] hover:bg-[#EAE6DF]'
              }`}
              title="علاقه‌مندی"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Visual Gallery & Interactive Zoom */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Main Image Box */}
              <div
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E8E4DA] cursor-crosshair select-none group shadow-2xs"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                        }
                      : undefined
                  }
                />

                {/* Subtle zoom instruction pill */}
                <div className="absolute bottom-3 left-3 pointer-events-none bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#57534E] border border-[#E8E4DA] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 shadow-2xs">
                  <ZoomIn className="w-3 h-3 text-[#B8860B]" />
                  <span>بزرگنمایی لنز لمسی / ماوس</span>
                </div>

                {/* Karat Badge */}
                <div className="absolute top-3 right-3 pointer-events-none bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#925B03] border border-[#D4AF37]/50 shadow-2xs">
                  {product.karat} عیار ({product.karat === 24 ? '۹۹۹' : '۷۵۰'})
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square w-16 sm:w-20 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#B8860B] ring-2 ring-[#B8860B]/30'
                          : 'border-[#E8E4DA] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Micro-Row under photos */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-center gap-2.5 text-xs text-[#57534E] shadow-2xs">
                  <Award className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>تاییدیه اتحادیه طلا و جواهر</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-center gap-2.5 text-xs text-[#57534E] shadow-2xs">
                  <RotateCcw className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span>تضمین بازخرید به نرخ روز</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Pricing Breakdown, CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Status and category */}
                <div className="flex items-center justify-between gap-2 text-xs mb-2">
                  <span className="text-[#925B03] font-medium">
                    {product.category === 'rings' && 'انگشتر و رینگ'}
                    {product.category === 'necklaces' && 'گردنبند و آویز'}
                    {product.category === 'earrings' && 'گوشواره'}
                    {product.category === 'bracelets' && 'دستبند و النگو'}
                    {product.category === 'coins' && 'سکه و شمش سرمایه‌گذاری'}
                    {product.category === 'sets' && 'سرویس و نیم‌ست'}
                  </span>

                  {product.inStock ? (
                    <span className="text-[#059669] flex items-center gap-1 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                      موجود در بوتیک (تحویل فوری)
                    </span>
                  ) : (
                    <span className="text-[#D97706]">قابل ساخت سفارشی (۴ تا ۷ روز کاری)</span>
                  )}
                </div>

                {/* Grand Title */}
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#1C1917] leading-snug">
                  {product.name}
                </h2>

                {/* Short Description */}
                <p className="mt-3 text-sm text-[#57534E] font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Weight & Karat Summary Bar */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-between text-xs shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#B8860B]" />
                    <span className="text-[#57534E]">وزن خالص طلا:</span>
                    <span className="font-bold text-[#1C1917]">{formatWeight(product.weightInGrams)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gem className="w-4 h-4 text-[#B8860B]" />
                    <span className="text-[#57534E]">عیار:</span>
                    <span className="font-bold text-[#925B03]">
                      {product.karat} عیار ({product.karat === 24 ? '۹۹۹' : '۷۵۰'})
                    </span>
                  </div>
                </div>

                {/* Detailed Transparent Price Breakdown Box */}
                <div className="mt-5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>محاسبه شفاف و قانونی قیمت طلا</span>
                    </div>
                    <span className="text-[11px] text-[#78716C]">
                      مظنه گرمی: {formatPrice(priceInfo.pricePerGramToday)}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#57534E]">
                    <div className="flex justify-between">
                      <span>ارزش خام طلای ۱۸ عیار ({formatWeight(product.weightInGrams)}):</span>
                      <span className="font-mono text-[#1C1917] font-medium">{formatPrice(priceInfo.rawGoldPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>اجرت ساخت استادکار ({toPersianDigits(product.craftFeePercent)}٪):</span>
                      <span className="font-mono text-[#1C1917] font-medium">{formatPrice(priceInfo.craftFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>سود قانونی مصوب اتحادیه ({toPersianDigits(goldRates.profitPercent)}٪):</span>
                      <span className="font-mono text-[#1C1917] font-medium">{formatPrice(priceInfo.profit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مالیات بر ارزش افزوده ({toPersianDigits(goldRates.taxPercent)}٪ فقط بر اجرت و سود):</span>
                      <span className="font-mono text-[#1C1917] font-medium">{formatPrice(priceInfo.tax)}</span>
                    </div>
                  </div>

                  {/* Grand Final Price */}
                  <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#78716C] block">مبلغ نهایی با فاکتور رسمی:</span>
                      <span className="text-xs text-[#059669] font-medium">معاف از مالیات بر اصل طلا</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-[#A16207] font-serif-luxury">
                      {formatPrice(priceInfo.total * quantity)}
                    </div>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div className="mt-6 flex items-center gap-4">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#E8E4DA] rounded-xl bg-white p-1 shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F3EF] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#1C1917]">
                      {toPersianDigits(quantity)}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5F3EF] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => {
                      triggerGoldDust(e.currentTarget);
                      onAddToCart(product, quantity);
                    }}
                    className="flex-1 py-3.5 px-4 rounded-xl border border-[#D4AF37]/50 bg-white text-[#925B03] hover:bg-[#B8860B] hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد خرید</span>
                  </button>

                  {/* Quick Checkout */}
                  <button
                    onClick={() => {
                      onQuickCheckout(product, quantity);
                    }}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#D4AF37] text-white font-bold text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#B8860B]/20"
                  >
                    <span>خرید سریع و فاکتور</span>
                  </button>
                </div>

                {/* WhatsApp Consultation Button */}
                <div className="mt-3">
                  <a
                    href={`https://wa.me/989123456789?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl border border-[#E8E4DA] bg-[#FAF8F5] text-[#16A34A] hover:bg-[#F0FDF4] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>مشاوره اختصاصی و استعلام فوری در واتس‌اپ</span>
                  </a>
                </div>
              </div>

              {/* Technical Specifications & Details Tabs */}
              <div className="pt-6 border-t border-[#E8E4DA]">
                <div className="flex items-center gap-4 border-b border-[#E8E4DA] pb-2 text-xs">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 font-medium transition-colors relative cursor-pointer ${
                      activeTab === 'specs' ? 'text-[#A16207] font-bold' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    مشخصات فنی و سنگ‌ها
                    {activeTab === 'specs' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8860B]"></span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 font-medium transition-colors relative cursor-pointer ${
                      activeTab === 'shipping' ? 'text-[#A16207] font-bold' : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    ارسال بیمه‌شده و فاکتور
                    {activeTab === 'shipping' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8860B]"></span>
                    )}
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#57534E]">
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                      <div>
                        <span className="text-[#78716C] block">رنگ و آلیاژ طلا:</span>
                        <span className="text-[#1C1917] font-medium">{product.specs?.metalColor || 'طلای زرد ۱۸ عیار استاندارد'}</span>
                      </div>
                      <div>
                        <span className="text-[#78716C] block">پلاک و شناسه عیار:</span>
                        <span className="text-[#1C1917] font-medium">{product.specs?.purityMark || 'حک استاندارد ۷۵۰ اتحادیه'}</span>
                      </div>
                      <div>
                        <span className="text-[#78716C] block">نگین و سنگ‌های قیمتی:</span>
                        <span className="text-[#1C1917] font-medium">{product.specs?.stones || 'بدون نگین / طلای خالص'}</span>
                      </div>
                      <div>
                        <span className="text-[#78716C] block">گارانتی و ضمانت:</span>
                        <span className="text-[#1C1917] font-medium">{product.specs?.warranty || 'ضمانت مادام‌العمر اصالت'}</span>
                      </div>
                      {product.specs?.size && (
                        <div className="col-span-2">
                          <span className="text-[#78716C] block">اندازه و سایز:</span>
                          <span className="text-[#1C1917] font-medium">{product.specs.size}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2 text-xs leading-relaxed text-[#57534E]">
                      <p>
                        • <strong className="text-[#1C1917]">ارسال تهران:</strong> ظرف ۴ تا ۶ ساعت کاری با پیک ویژه و محافظ اختصاصی گالری زرین.
                      </p>
                      <p>
                        • <strong className="text-[#1C1917]">ارسال شهرستان:</strong> توسط پست ویژه هوایی با پوشش بیمه‌نامه ۱۰۰٪ ارزش ریالی کالا.
                      </p>
                      <p>
                        • <strong className="text-[#1C1917]">فاکتور رسمی:</strong> همراه مرسوله، فاکتور رسمی اتحادیه طلا و جواهر دارای هولوگرام امنیتی، مهر گالری و شناسنامه سنگ تحویل می‌گردد.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
