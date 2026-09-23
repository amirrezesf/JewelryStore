import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Gem } from 'lucide-react';
import { INITIAL_GOLD_RATES } from '../data/mockData';
import { GoldRates, Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  goldRates?: GoldRates;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll?: () => void;
  onExploreAll?: () => void;
  onSelectCategory?: (category: ProductCategory | 'all') => void;
}

type FilterTab = 'all' | 'no_fee' | 'coins' | 'rings' | 'necklaces_sets' | 'bracelets_earrings' | 'gifts';

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  goldRates,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onViewAll,
  onExploreAll,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const safeRates = goldRates || INITIAL_GOLD_RATES;
  const handleViewAll = onViewAll || onExploreAll || (() => {});

  const filtered = products.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'no_fee') return p.category === 'no_fee' || p.isNoCraftFee || p.craftFeePercent === 0;
    if (activeTab === 'coins') return p.category === 'coins';
    if (activeTab === 'rings') return p.category === 'rings';
    if (activeTab === 'necklaces_sets') return p.category === 'necklaces' || p.category === 'sets';
    if (activeTab === 'bracelets_earrings') return p.category === 'bracelets' || p.category === 'earrings';
    if (activeTab === 'gifts') return p.category === 'gifts';
    return true;
  });

  const tabs: { id: FilterTab; label: string; badge?: string }[] = [
    { id: 'all', label: 'همه محصولات' },
    { id: 'no_fee', label: 'طلای بدون اجرت', badge: '۰٪' },
    { id: 'coins', label: 'شمش و سکه', badge: '۲۴ عیار' },
    { id: 'rings', label: 'انگشتر و رینگ' },
    { id: 'necklaces_sets', label: 'گردنبند و سرویس' },
    { id: 'bracelets_earrings', label: 'دستبند و گوشواره' },
    { id: 'gifts', label: 'طلای کادویی' },
  ];

  return (
    <section id="products-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E4DA]">
      {/* Header matching Jourabian */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          محصولات
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#78716C] max-w-2xl mx-auto">
          جدیدترین آثار گالری زرین با قابلیت محاسبه آنی قیمت بر اساس نرخ زنده طلا و صدور فاکتور رسمی
        </p>
      </div>

      {/* Horizontal Category Switcher Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-3 mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#1C1917] text-white shadow-sm'
                  : 'bg-white border border-[#E8E4DA] text-[#57534E] hover:border-[#B8860B]/60 hover:text-[#1C1917]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#D4AF37] text-black font-bold' : 'bg-[#FAF8F5] text-[#A16207] border border-[#D4AF37]/40'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DA] p-8">
          <Gem className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#1C1917]">محصولی در این دسته‌بندی یافت نشد</h3>
          <p className="text-xs text-[#78716C] mt-1">به زودی مدل‌های جدید به این دسته اضافه می‌شوند.</p>
          <button
            onClick={() => setActiveTab('all')}
            className="mt-4 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/50 text-xs font-semibold text-[#A16207] hover:bg-[#F2EFE9] transition-all cursor-pointer"
          >
            مشاهده همه محصولات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              goldRates={safeRates}
              isWishlisted={wishlistIds.has(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* View All Footer CTA */}
      <div className="mt-12 text-center">
        <button
          onClick={handleViewAll}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#D4AF37]/50 bg-white text-[#925B03] hover:bg-[#B8860B] hover:text-white font-semibold text-sm transition-all duration-300 cursor-pointer shadow-xs"
        >
          <span>مشاهده کلیه آثار ویترین زرین</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
