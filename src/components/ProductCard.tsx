import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { GoldRates, Product } from '../types';
import { calculateProductPrice, formatPrice, formatWeight } from '../utils/pricing';
import { triggerGoldDust } from '../utils/goldDust';

interface ProductCardProps {
  product: Product;
  goldRates: GoldRates;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  goldRates,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const priceInfo = calculateProductPrice(product, goldRates);

  const handleAddToCartWithEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Fire the golden dust particles soaring towards the cart icon in header
    triggerGoldDust(e.currentTarget);

    // Provide visual micro-interaction feedback on the button
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1100);

    onAddToCart(product);
  };

  return (
    <div className="group relative flex flex-col rounded-xl bg-white border border-[#E8E4DA] hover:border-[#B8860B]/60 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Visual Image Showcase */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F3EF] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>

        {/* Badges / Karat & Weight */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-white/90 text-[#925B03] border border-[#D4AF37]/40 shadow-xs backdrop-blur-sm">
            {product.karat} عیار ({product.karat === 24 ? '۹۹۹' : '۷۵۰'})
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/85 text-[#57534E] border border-[#E8E4DA] shadow-xs backdrop-blur-sm">
            {formatWeight(product.weightInGrams)}
          </span>
        </div>

        {/* Special Collection / New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#B8860B] text-white shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              کالکشن جدید
            </span>
          </div>
        )}

        {/* Wishlist Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs ${
            isWishlisted
              ? 'bg-[#B8860B] text-white'
              : 'bg-white/90 text-[#57534E] hover:text-[#B8860B] hover:bg-white border border-[#E8E4DA]'
          }`}
          aria-label="افزودن به علاقه‌مندی‌ها"
          title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Desktop Hover Quick View CTA Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-white/95 backdrop-blur-md border border-[#B8860B]/40 text-[#1C1917] hover:bg-[#B8860B] hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>مشاهده جزئیات</span>
          </button>
        </div>
      </div>

      {/* Product Information Card */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Product Code */}
          <div className="flex items-center justify-between text-[11px] text-[#78716C] mb-1">
            <span>کد: {product.code}</span>
            {product.inStock ? (
              <span className="text-[#059669] flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                موجود در بوتیک
              </span>
            ) : (
              <span className="text-[#D97706] font-medium">ساخت سفارشی</span>
            )}
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-semibold text-[#1C1917] group-hover:text-[#925B03] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#E8E4DA] flex items-center justify-between">
          <div>
            <div className="text-[10px] text-[#78716C]">قیمت نهایی با فاکتور:</div>
            <div className="text-sm sm:text-base font-bold text-[#A16207] tracking-tight">
              {formatPrice(priceInfo.total)}
            </div>
          </div>

          <button
            onClick={handleAddToCartWithEffect}
            disabled={isAdded}
            className={`relative p-2.5 rounded-lg border transition-all duration-300 cursor-pointer shadow-2xs overflow-hidden ${
              isAdded
                ? 'bg-[#B8860B] border-[#B8860B] text-white scale-105 shadow-md shadow-[#B8860B]/30 ring-2 ring-[#D4AF37]/50'
                : 'border-[#D4AF37]/40 bg-[#FAF8F5] text-[#925B03] hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B] active:scale-95'
            }`}
            title={isAdded ? 'به سبد افزوده شد' : 'افزودن به سبد خرید'}
            aria-label="افزودن به سبد خرید"
          >
            {isAdded ? (
              <Check className="w-4 h-4 animate-scale-up" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
