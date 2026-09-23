import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  X, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  ChevronDown, 
  RotateCcw 
} from 'lucide-react';
import { FilterState, GoldRates, Product } from '../types';
import { calculateProductPrice, formatPrice } from '../utils/pricing';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';

interface ShopCatalogProps {
  products: Product[];
  goldRates: GoldRates;
  wishlistIds: Set<string>;
  initialCategory?: Product['category'] | 'all';
  initialSearchQuery?: string;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  products,
  goldRates,
  wishlistIds,
  initialCategory = 'all',
  initialSearchQuery = '',
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    karat: 'all',
    weightRange: 'all',
    minPrice: 0,
    maxPrice: 300000000, // 300M Tomans
    inStockOnly: false,
    searchQuery: initialSearchQuery || '',
    sortBy: 'newest',
  });

  useEffect(() => {
    if (typeof initialSearchQuery === 'string') {
      setFilters((prev) => ({ ...prev, searchQuery: initialSearchQuery }));
    }
  }, [initialSearchQuery]);

  // Calculate prices for all items to filter by price accurately
  const productsWithPrice = useMemo(() => {
    return products.map((p) => {
      const price = calculateProductPrice(p, goldRates);
      return {
        ...p,
        calculatedPrice: price.total,
      };
    });
  }, [products, goldRates]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return productsWithPrice.filter((p) => {
      // Category filter
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Karat filter
      if (filters.karat !== 'all' && p.karat.toString() !== filters.karat) {
        return false;
      }

      // Weight range
      if (filters.weightRange === 'under_2' && p.weightInGrams >= 2) return false;
      if (filters.weightRange === '2_to_5' && (p.weightInGrams < 2 || p.weightInGrams > 5)) return false;
      if (filters.weightRange === '5_to_10' && (p.weightInGrams < 5 || p.weightInGrams > 10)) return false;
      if (filters.weightRange === 'above_10' && p.weightInGrams <= 10) return false;

      // Price range
      if (p.calculatedPrice < filters.minPrice || p.calculatedPrice > filters.maxPrice) {
        return false;
      }

      // In stock
      if (filters.inStockOnly && !p.inStock) {
        return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(query);
        const matchCode = p.code.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchCode && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (filters.sortBy === 'popular') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      if (filters.sortBy === 'price_asc') {
        return a.calculatedPrice - b.calculatedPrice;
      }
      if (filters.sortBy === 'price_desc') {
        return b.calculatedPrice - a.calculatedPrice;
      }
      if (filters.sortBy === 'weight_desc') {
        return b.weightInGrams - a.weightInGrams;
      }
      return 0;
    });
  }, [productsWithPrice, filters]);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      karat: 'all',
      weightRange: 'all',
      minPrice: 0,
      maxPrice: 300000000,
      inStockOnly: false,
      searchQuery: '',
      sortBy: 'newest',
    });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.karat !== 'all') count++;
    if (filters.weightRange !== 'all') count++;
    if (filters.inStockOnly) count++;
    if (filters.searchQuery.trim()) count++;
    return count;
  }, [filters]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Catalog Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E8E4DA]">
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#A16207] uppercase block mb-1">
            ZARRIN SHOWROOM
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917]">
            ویترین طلا و جواهرات زرین
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1 font-light">
            محاسبه آنی قیمت بر مبنای نرخ رسمی اتحادیه طلا و جواهر تهران ({filteredProducts.length} اثر موجود)
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="جستجوی نام اثر، کد یا مشخصات..."
            className="w-full pr-10 pl-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] placeholder-[#A8A29E] focus:border-[#B8860B] outline-none shadow-2xs"
          />
          <Search className="w-4 h-4 text-[#B8860B] absolute right-3.5 top-3" />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters({ ...filters, searchQuery: '' })}
              className="absolute left-3 top-3 text-[#78716C] hover:text-[#1C1917] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sorting Controls Bar */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DA] mb-8">
        {/* Mobile Filter Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/50 bg-white text-xs font-semibold text-[#925B03] shadow-2xs cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>فیلترهای پیشرفته</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#B8860B] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#78716C] hover:text-[#A16207] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              پاکسازی
            </button>
          )}
        </div>

        {/* Desktop Quick Category Chips */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilters({ ...filters, category: 'all' })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              filters.category === 'all'
                ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold shadow-2xs'
                : 'bg-white border border-[#E8E4DA] text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            همه دسته‌ها
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold shadow-2xs'
                  : 'bg-white border border-[#E8E4DA] text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 mr-auto">
          <span className="text-xs text-[#78716C]">مرتب‌سازی:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E8E4DA] text-xs text-[#1C1917] focus:border-[#B8860B] outline-none cursor-pointer shadow-2xs"
          >
            <option value="newest">جدیدترین طراحی‌ها</option>
            <option value="popular">محبوب‌ترین و برگزیده</option>
            <option value="price_asc">ارزان‌ترین به گران‌ترین</option>
            <option value="price_desc">گران‌ترین به ارزان‌ترین</option>
            <option value="weight_desc">سنگین‌ترین (بالاترین وزن)</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 p-6 rounded-2xl bg-white border border-[#E8E4DA] space-y-6 sticky top-36 z-10 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-3">
            <h3 className="text-sm font-bold text-[#1C1917] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
              <span>فیلترهای هوشمند</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#A16207] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                حذف همه
              </button>
            )}
          </div>

          {/* Karat Filter */}
          <div>
            <label className="text-xs font-semibold text-[#1C1917] block mb-2.5">
              عیار استاندارد:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFilters({ ...filters, karat: 'all' })}
                className={`py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                  filters.karat === 'all'
                    ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                    : 'border-[#E8E4DA] text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                همه
              </button>
              <button
                onClick={() => setFilters({ ...filters, karat: '18' })}
                className={`py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                  filters.karat === '18'
                    ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                    : 'border-[#E8E4DA] text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                ۱۸ عیار
              </button>
              <button
                onClick={() => setFilters({ ...filters, karat: '24' })}
                className={`py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                  filters.karat === '24'
                    ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                    : 'border-[#E8E4DA] text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                ۲۴ عیار
              </button>
            </div>
          </div>

          {/* Weight Filter */}
          <div>
            <label className="text-xs font-semibold text-[#1C1917] block mb-2.5">
              محدوده وزن:
            </label>
            <div className="space-y-1.5 text-xs text-[#57534E]">
              {[
                { id: 'all', label: 'همه وزن‌ها' },
                { id: 'under_2', label: 'ظریف (زیر ۲ گرم)' },
                { id: '2_to_5', label: 'متوسط (۲ تا ۵ گرم)' },
                { id: '5_to_10', label: 'سنگین (۵ تا ۱۰ گرم)' },
                { id: 'above_10', label: 'فاخر (بالای ۱۰ گرم)' },
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => setFilters({ ...filters, weightRange: w.id })}
                  className={`w-full text-right py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    filters.weightRange === w.id
                      ? 'bg-[#FAF8F5] text-[#925B03] font-semibold border border-[#D4AF37]/40'
                      : 'hover:bg-[#F5F3EF] hover:text-[#1C1917]'
                  }`}
                >
                  <span>{w.label}</span>
                  {filters.weightRange === w.id && <Check className="w-3.5 h-3.5 text-[#B8860B]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Only Toggle */}
          <div className="pt-3 border-t border-[#E8E4DA]">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-[#1C1917]">فقط کالاهای موجود در بوتیک:</span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                className="w-4 h-4 rounded bg-white border-[#D8D3C8] text-[#B8860B] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-white border border-[#E8E4DA] p-8 shadow-xs">
              <Sparkles className="w-8 h-8 text-[#B8860B] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#1C1917] mb-1">
                هیچ اثری با مشخصات انتخابی یافت نشد
              </h3>
              <p className="text-xs text-[#78716C] mb-6">
                می‌توانید فیلترها را حذف کنید یا مدل مورد نظر خود را سفارش دهید.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-xs font-bold hover:brightness-105 shadow-sm cursor-pointer"
              >
                نمایش تمام محصولات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  goldRates={goldRates}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-[200] flex flex-col justify-end bg-black/50 backdrop-blur-xs">
          <div className="bg-white border-t border-[#E8E4DA] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-3">
              <h3 className="text-base font-bold text-[#1C1917] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
                <span>فیلترهای پیشرفته ویترین</span>
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Select */}
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-2">دسته‌بندی:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className={`py-2 px-3 rounded-lg text-xs text-right border cursor-pointer ${
                    filters.category === 'all'
                      ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                      : 'border-[#E8E4DA] text-[#57534E]'
                  }`}
                >
                  همه دسته‌ها
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilters({ ...filters, category: c.id })}
                    className={`py-2 px-3 rounded-lg text-xs text-right border cursor-pointer ${
                      filters.category === c.id
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                        : 'border-[#E8E4DA] text-[#57534E]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Karat */}
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-2">عیار طلا:</label>
              <div className="grid grid-cols-3 gap-2">
                {['all', '18', '24'].map((k) => (
                  <button
                    key={k}
                    onClick={() => setFilters({ ...filters, karat: k })}
                    className={`py-2 rounded-lg text-xs border cursor-pointer ${
                      filters.karat === k
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                        : 'border-[#E8E4DA] text-[#57534E]'
                    }`}
                  >
                    {k === 'all' ? 'همه عیارها' : `${k} عیار`}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="text-xs font-semibold text-[#1C1917] block mb-2">محدوده وزن:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'all', label: 'همه' },
                  { id: 'under_2', label: 'زیر ۲ گرم' },
                  { id: '2_to_5', label: '۲ تا ۵ گرم' },
                  { id: '5_to_10', label: '۵ تا ۱۰ گرم' },
                  { id: 'above_10', label: 'بالای ۱۰ گرم' },
                ].map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setFilters({ ...filters, weightRange: w.id })}
                    className={`py-2 px-2.5 rounded-lg border text-right cursor-pointer ${
                      filters.weightRange === w.id
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] font-bold'
                        : 'border-[#E8E4DA] text-[#57534E]'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* In stock */}
            <div className="pt-2">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs text-[#1C1917]">فقط موارد موجود:</span>
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                  className="w-4 h-4 rounded text-[#B8860B] cursor-pointer"
                />
              </label>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#E8E4DA]">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-sm shadow-sm cursor-pointer"
              >
                اعمال فیلترها ({filteredProducts.length} اثر)
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-3 rounded-xl bg-[#F5F3EF] text-[#57534E] hover:bg-[#EAE6DF] text-xs cursor-pointer"
              >
                حذف فیلترها
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
