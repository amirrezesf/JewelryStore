import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  SlidersHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { GoldRates, Order, Product, Review } from '../types';
import { formatNumber, formatPrice, formatWeight, toPersianDigits } from '../utils/pricing';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  goldRates: GoldRates;
  onUpdateGoldRates: (newRates: GoldRates) => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onViewInvoice: (order: Order) => void;
  reviews: Review[];
  onDeleteReview: (reviewId: string) => void;
  onResetDemoData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  goldRates,
  onUpdateGoldRates,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  onViewInvoice,
  reviews,
  onDeleteReview,
  onResetDemoData,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'rates' | 'products' | 'orders' | 'reviews'>('rates');

  // Rates form state
  const [rate18K, setRate18K] = useState(goldRates.rate18K);
  const [rate24K, setRate24K] = useState(goldRates.rate24K);
  const [profitPercent, setProfitPercent] = useState(goldRates.profitPercent);
  const [taxPercent, setTaxPercent] = useState(goldRates.taxPercent);
  const [ratesSavedNotice, setRatesSavedNotice] = useState(false);

  // Product edit/create modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModal, setIsNewProductModal] = useState(false);

  const [prodForm, setProdForm] = useState<Partial<Product>>({
    code: '',
    name: '',
    category: 'rings',
    karat: 18,
    weightInGrams: 3.5,
    craftFeePercent: 12,
    description: '',
    images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1200'],
    inStock: true,
    stockCount: 5,
    isFeatured: false,
    isNew: true,
    collectionName: 'کالکشن مدرن',
  });

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const timeString = `امروز ساعت ${toPersianDigits(now.getHours())}:${toPersianDigits(now.getMinutes().toString().padStart(2, '0'))} (بروزرسانی دستی مدیریت)`;
    onUpdateGoldRates({
      rate18K: Number(rate18K),
      rate24K: Number(rate24K),
      profitPercent: Number(profitPercent),
      taxPercent: Number(taxPercent),
      lastUpdated: timeString,
      isAutoUpdated: false,
    });
    setRatesSavedNotice(true);
    setTimeout(() => setRatesSavedNotice(false), 3000);
  };

  const handleOpenNewProduct = () => {
    setProdForm({
      code: `ZR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      category: 'rings',
      karat: 18,
      weightInGrams: 3.5,
      craftFeePercent: 12,
      description: '',
      images: ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1200'],
      inStock: true,
      stockCount: 5,
      isFeatured: false,
      isNew: true,
      collectionName: 'کالکشن مدرن',
    });
    setEditingProduct(null);
    setIsNewProductModal(true);
  };

  const handleOpenEditProduct = (product: Product) => {
    setProdForm({ ...product });
    setEditingProduct(product);
    setIsNewProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.code) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...prodForm,
      } as Product);
    } else {
      const newP: Product = {
        id: `prod-${Date.now()}`,
        code: prodForm.code || 'ZR-0000',
        name: prodForm.name || '',
        category: prodForm.category || 'rings',
        karat: prodForm.karat || 18,
        weightInGrams: Number(prodForm.weightInGrams) || 1,
        craftFeePercent: Number(prodForm.craftFeePercent) || 10,
        description: prodForm.description || '',
        images: prodForm.images && prodForm.images.length > 0 ? prodForm.images : ['https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1200'],
        inStock: prodForm.inStock ?? true,
        stockCount: Number(prodForm.stockCount) || 1,
        isFeatured: prodForm.isFeatured ?? false,
        isNew: prodForm.isNew ?? true,
        collectionName: prodForm.collectionName,
      };
      onAddProduct(newP);
    }
    setIsNewProductModal(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full sm:max-w-5xl bg-white border-t sm:border border-[#E8E4DA] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden h-[94vh] sm:h-auto sm:max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-3.5 sm:p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#B8860B]/10 flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-[#1C1917] truncate">
                پنل مدیریت و کنترل نرخ طلا
              </h2>
              <p className="text-[10px] text-[#78716C] hidden xs:block truncate">
                نظارت هوشمند، تنظیم زنده مظنه اتحادیه و کاتالوگ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onResetDemoData}
              className="text-[11px] text-[#78716C] hover:text-[#925B03] px-2.5 py-1.5 rounded-lg border border-[#E8E4DA] bg-white hover:bg-[#FAF8F5] transition-colors cursor-pointer"
              title="بازنشانی داده‌ها به حالت اولیه"
            >
              <span className="hidden sm:inline">بازنشانی داده‌ها</span>
              <RefreshCw className="w-3.5 h-3.5 sm:hidden" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] cursor-pointer"
              aria-label="بستن پنل مدیریت"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation (Scrollable on mobile) */}
        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 border-b border-[#E8E4DA] bg-[#FAF8F5] overflow-x-auto no-scrollbar text-xs shrink-0">
          <button
            onClick={() => setActiveTab('rates')}
            className={`py-3 px-3 sm:px-4 font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rates'
                ? 'border-[#B8860B] text-[#925B03]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>نرخ زنده طلا</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-3 sm:px-4 font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'border-[#B8860B] text-[#925B03]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>محصولات ({toPersianDigits(products.length)})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 sm:px-4 font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#B8860B] text-[#925B03]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>سفارش‌ها ({toPersianDigits(orders.length)})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-3 sm:px-4 font-semibold transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#B8860B] text-[#925B03]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>نظرات ({toPersianDigits(reviews.length)})</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-3.5 sm:p-6 overflow-y-auto flex-1">
          {/* Tab 1: Gold Pricing Engine Control */}
          {activeTab === 'rates' && (
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-start gap-2.5 sm:gap-3 text-xs text-[#925B03] shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#1C1917] mb-1">
                    موتور قیمت‌گذاری پویا و بلادرنگ
                  </div>
                  <p className="text-[#57534E] leading-relaxed text-[11px] sm:text-xs">
                    با تغییر نرخ هر گرم طلا در این بخش، قیمت تمام محصولات ویترین و سبدهای خرید بر اساس فرمول قانونی اتحادیه (وزن × نرخ طلا + اجرت ساخت + سود ۷٪ + مالیات ۹٪ بر اجرت) در کسری از ثانیه مجدداً محاسبه و بروزرسانی خواهد شد.
                  </p>
                </div>
              </div>

              {ratesSavedNotice && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-[#16A34A] text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>نرخ روز طلا ذخیره شد و قیمت تمامی محصولات بازنویسی گردید.</span>
                </div>
              )}

              <form onSubmit={handleSaveRates} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                    <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                      نرخ هر گرم طلای ۱۸ عیار (تومان):
                    </label>
                    <input
                      type="number"
                      required
                      step="1000"
                      value={rate18K}
                      onChange={(e) => setRate18K(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E4DA] text-sm font-mono text-[#A16207] font-bold focus:border-[#B8860B] outline-none shadow-2xs"
                    />
                    <div className="text-[11px] text-[#78716C] mt-1.5 flex items-center justify-between">
                      <span>نمایش فعلی:</span>
                      <span className="font-bold font-mono text-[#A16207]">{formatPrice(rate18K)}</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                    <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                      نرخ هر گرم طلای ۲۴ عیار (تومان):
                    </label>
                    <input
                      type="number"
                      required
                      step="1000"
                      value={rate24K}
                      onChange={(e) => setRate24K(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8E4DA] text-sm font-mono text-[#1C1917] font-bold focus:border-[#B8860B] outline-none shadow-2xs"
                    />
                    <div className="text-[11px] text-[#78716C] mt-1.5 flex items-center justify-between">
                      <span>نمایش فعلی:</span>
                      <span className="font-bold font-mono text-[#1C1917]">{formatPrice(rate24K)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                    <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                      درصد سود قانونی فروشگاه:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={profitPercent}
                        onChange={(e) => setProfitPercent(Number(e.target.value))}
                        className="w-24 px-3.5 py-2 rounded-xl bg-white border border-[#E8E4DA] text-xs font-mono font-bold text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                      />
                      <span className="text-[11px] text-[#78716C]">درصد (مصوب اتحادیه: ۷٪)</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                    <label className="block text-xs font-semibold text-[#57534E] mb-1.5">
                      درصد مالیات ارزش افزوده (VAT):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={taxPercent}
                        onChange={(e) => setTaxPercent(Number(e.target.value))}
                        className="w-24 px-3.5 py-2 rounded-xl bg-white border border-[#E8E4DA] text-xs font-mono font-bold text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                      />
                      <span className="text-[11px] text-[#78716C]">درصد (روی اجرت و سود: ۹٪)</span>
                    </div>
                  </div>
                </div>

                {/* Quick adjustments shortcuts */}
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] shadow-2xs">
                  <span className="text-[11px] font-semibold text-[#78716C] block mb-2">
                    تنظیمات سریع نوسانات بازار طلا:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setRate18K((prev) => prev + 50000)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E4DA] text-xs font-medium text-[#059669] hover:bg-[#F0FDF4] cursor-pointer"
                    >
                      + ۵۰,۰۰۰ ۱۸k
                    </button>
                    <button
                      type="button"
                      onClick={() => setRate18K((prev) => prev - 50000)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E4DA] text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2] cursor-pointer"
                    >
                      - ۵۰,۰۰۰ ۱۸k
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRate18K(4920000);
                        setRate24K(6560000);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E8E4DA] text-xs font-medium text-[#925B03] hover:bg-[#FFFBEB] cursor-pointer"
                    >
                      مظنه پایه (۴,۹۲۰,۰۰۰)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#B8860B]/20"
                >
                  <Save className="w-4 h-4" />
                  <span>ذخیره و اعمال نرخ طلا در کل فروشگاه</span>
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Products Manager */}
          {activeTab === 'products' && (
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-[#57534E] font-medium">
                  مجموع: <span className="font-bold text-[#1C1917] font-mono">{toPersianDigits(products.length)}</span> اثر طلا
                </span>
                <button
                  onClick={handleOpenNewProduct}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن اثر جدید</span>
                </button>
              </div>

              {/* Mobile Card List View for Products (clean on phones) */}
              <div className="grid grid-cols-1 gap-2.5 sm:hidden">
                {products.map((prod) => (
                  <div key={prod.id} className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] flex gap-3 items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-13 h-13 rounded-xl object-cover bg-white border border-[#E8E4DA] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-[#925B03] font-bold">{prod.code}</span>
                          <span className="text-[10px] text-[#78716C]">• {prod.karat}K</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#1C1917] truncate">{prod.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#57534E] mt-0.5">
                          <span className="font-mono font-bold text-[#A16207]">{formatWeight(prod.weightInGrams)}</span>
                          <span>اجرت: {toPersianDigits(prod.craftFeePercent)}٪</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {prod.inStock ? (
                        <span className="text-[#059669] bg-[#DCFCE7] px-1.5 py-0.5 rounded text-[9px] font-bold">
                          موجود
                        </span>
                      ) : (
                        <span className="text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded text-[9px] font-bold">
                          سفارشی
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 rounded-lg bg-white border border-[#E8E4DA] text-[#57534E] hover:text-[#925B03] cursor-pointer"
                          title="ویرایش"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-white border border-[#E8E4DA] text-[#57534E] hover:text-[#DC2626] cursor-pointer"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View for Products */}
              <div className="hidden sm:block overflow-x-auto border border-[#E8E4DA] rounded-xl shadow-2xs">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#F7F5EE] border-b border-[#E8E4DA] text-[#57534E]">
                      <th className="p-3">تصویر</th>
                      <th className="p-3">کد</th>
                      <th className="p-3">نام اثر</th>
                      <th className="p-3">دسته</th>
                      <th className="p-3">عیار</th>
                      <th className="p-3">وزن (گرم)</th>
                      <th className="p-3">اجرت (٪)</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DA] bg-white">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-2.5">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-10 h-10 rounded-lg object-cover bg-[#F7F5EE]"
                          />
                        </td>
                        <td className="p-3 font-mono text-[#925B03] font-semibold">{prod.code}</td>
                        <td className="p-3 font-bold text-[#1C1917] max-w-[200px] truncate">
                          {prod.name}
                        </td>
                        <td className="p-3 text-[#57534E]">
                          {prod.category === 'rings' && 'انگشتر'}
                          {prod.category === 'necklaces' && 'گردنبند'}
                          {prod.category === 'earrings' && 'گوشواره'}
                          {prod.category === 'bracelets' && 'دستبند'}
                          {prod.category === 'coins' && 'سکه و شمش'}
                          {prod.category === 'sets' && 'سرویس'}
                        </td>
                        <td className="p-3 text-[#57534E]">{prod.karat}K</td>
                        <td className="p-3 font-mono font-bold text-[#A16207]">
                          {formatWeight(prod.weightInGrams)}
                        </td>
                        <td className="p-3 font-mono text-[#57534E]">{toPersianDigits(prod.craftFeePercent)}٪</td>
                        <td className="p-3">
                          {prod.inStock ? (
                            <span className="text-[#059669] bg-[#DCFCE7] px-2 py-0.5 rounded-full text-[10px] font-medium">
                              موجود
                            </span>
                          ) : (
                            <span className="text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full text-[10px] font-medium">
                              سفارشی
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-[#57534E] hover:text-[#925B03] transition-colors cursor-pointer"
                              title="ویرایش"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] text-[#57534E] hover:text-[#DC2626] transition-colors cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Orders Manager */}
          {activeTab === 'orders' && (
            <div className="space-y-3.5 sm:space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 sm:py-16 text-center text-[#78716C] text-xs">
                  هنوز سفارشی ثبت نشده است. با ثبت سفارش در فروشگاه، سفارش‌ها با پیش‌فاکتور رسمی در اینجا ظاهر خواهند شد.
                </div>
              ) : (
                <>
                  {/* Mobile Cards for Orders */}
                  <div className="grid grid-cols-1 gap-3 sm:hidden">
                    {orders.map((order) => (
                      <div key={order.id} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2.5">
                        <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-2">
                          <span className="font-mono text-xs font-bold text-[#925B03]">{order.orderNumber}</span>
                          <span className="text-[10px] text-[#78716C]">{order.date}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-[#1C1917] block">{order.customerName}</span>
                            <span className="text-[11px] text-[#78716C] font-mono">{toPersianDigits(order.phone)}</span>
                          </div>
                          <div className="text-left">
                            <span className="font-mono font-bold text-[#A16207] block text-xs">{formatPrice(order.grandTotal)}</span>
                            <span className="text-[10px] text-[#78716C] font-mono">وزن: {formatWeight(order.totalWeight)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E8E4DA]">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className="px-2 py-1 rounded-lg bg-white border border-[#E8E4DA] text-[11px] text-[#925B03] font-bold outline-none flex-1"
                          >
                            <option value="pending">در انتظار تایید</option>
                            <option value="processing">در حال ساخت</option>
                            <option value="shipped">ارسال بیمه‌شده</option>
                            <option value="delivered">تحویل به خریدار</option>
                            <option value="cancelled">لغو شده</option>
                          </select>

                          <button
                            onClick={() => onViewInvoice(order)}
                            className="px-2.5 py-1 rounded-lg border border-[#E8E4DA] bg-white text-[#925B03] hover:bg-[#FAF8F5] text-[11px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>فاکتور</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table for Orders */}
                  <div className="hidden sm:block overflow-x-auto border border-[#E8E4DA] rounded-xl shadow-2xs">
                    <table className="w-full text-xs text-right border-collapse">
                      <thead>
                        <tr className="bg-[#F7F5EE] border-b border-[#E8E4DA] text-[#57534E]">
                          <th className="p-3">شماره سفارش</th>
                          <th className="p-3">خریدار</th>
                          <th className="p-3">تلفن</th>
                          <th className="p-3">تاریخ</th>
                          <th className="p-3">وزن طلا</th>
                          <th className="p-3">مبلغ کل</th>
                          <th className="p-3">وضعیت</th>
                          <th className="p-3 text-center">فاکتور رسمی</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E4DA] bg-white">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#FAF8F5]">
                            <td className="p-3 font-mono text-[#925B03] font-semibold">{order.orderNumber}</td>
                            <td className="p-3 font-bold text-[#1C1917]">{order.customerName}</td>
                            <td className="p-3 font-mono text-[#57534E]">{toPersianDigits(order.phone)}</td>
                            <td className="p-3 text-[#78716C]">{order.date}</td>
                            <td className="p-3 font-mono font-bold text-[#A16207]">{formatWeight(order.totalWeight)}</td>
                            <td className="p-3 font-bold text-[#1C1917] font-mono">{formatPrice(order.grandTotal)}</td>
                            <td className="p-3">
                              <select
                                value={order.status}
                                onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                                className="px-2 py-1 rounded bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#925B03] outline-none"
                              >
                                <option value="pending">در انتظار تایید</option>
                                <option value="processing">در حال ساخت / آماده‌سازی</option>
                                <option value="shipped">ارسال بیمه‌شده</option>
                                <option value="delivered">تحویل به مشتری</option>
                                <option value="cancelled">لغو شده</option>
                              </select>
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => onViewInvoice(order)}
                                className="px-3 py-1 rounded-lg border border-[#E8E4DA] bg-white text-[#925B03] hover:bg-[#FAF8F5] transition-all flex items-center gap-1 mx-auto cursor-pointer shadow-2xs"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>مشاهده فاکتور</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab 4: Reviews Manager */}
          {activeTab === 'reviews' && (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] flex justify-between gap-3 shadow-2xs">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs sm:text-sm text-[#1C1917]">{rev.authorName}</span>
                        <span className="text-[11px] text-[#78716C]">({rev.city})</span>
                      </div>
                      <p className="text-xs text-[#57534E] mb-2 font-light leading-relaxed">«{rev.comment}»</p>
                      <span className="text-[10px] text-[#925B03] font-medium block truncate">{rev.productName} • {rev.date}</span>
                    </div>
                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-2 rounded-xl bg-white border border-[#E8E4DA] text-[#78716C] hover:text-[#DC2626] self-start cursor-pointer transition-colors shrink-0"
                      title="حذف نظر"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit / Create Product Sub-Modal */}
      {isNewProductModal && (
        <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border-t sm:border border-[#E8E4DA] rounded-t-3xl sm:rounded-2xl max-w-xl w-full p-4 sm:p-6 text-right max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E4DA]">
              <h3 className="text-sm sm:text-base font-bold text-[#1C1917]">
                {editingProduct ? 'ویرایش اثر طلا' : 'افزودن اثر جدید به ویترین'}
              </h3>
              <button
                type="button"
                onClick={() => setIsNewProductModal(false)}
                className="p-1 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">کد محصول:</label>
                  <input
                    type="text"
                    required
                    value={prodForm.code}
                    onChange={(e) => setProdForm({ ...prodForm, code: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] font-mono outline-none focus:border-[#B8860B]"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium">دسته‌بندی:</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] outline-none focus:border-[#B8860B]"
                  >
                    <option value="rings">انگشتر</option>
                    <option value="necklaces">گردنبند</option>
                    <option value="earrings">گوشواره</option>
                    <option value="bracelets">دستبند</option>
                    <option value="coins">سکه و شمش</option>
                    <option value="sets">سرویس و نیم‌ست</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#57534E] mb-1 font-medium">نام اثر:</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="مثال: انگشتر طلا کارتیه نگین‌دار"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] outline-none focus:border-[#B8860B]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium text-[11px] sm:text-xs">عیار طلا:</label>
                  <select
                    value={prodForm.karat}
                    onChange={(e) => setProdForm({ ...prodForm, karat: Number(e.target.value) as any })}
                    className="w-full px-2.5 sm:px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] outline-none focus:border-[#B8860B]"
                  >
                    <option value={18}>۱۸ (۷۵۰)</option>
                    <option value={24}>۲۴ (۹۹۹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium text-[11px] sm:text-xs">وزن (گرم):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodForm.weightInGrams}
                    onChange={(e) => setProdForm({ ...prodForm, weightInGrams: Number(e.target.value) })}
                    className="w-full px-2.5 sm:px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] font-mono outline-none focus:border-[#B8860B]"
                  />
                </div>
                <div>
                  <label className="block text-[#57534E] mb-1 font-medium text-[11px] sm:text-xs">اجرت (٪):</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={prodForm.craftFeePercent}
                    onChange={(e) => setProdForm({ ...prodForm, craftFeePercent: Number(e.target.value) })}
                    className="w-full px-2.5 sm:px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] font-mono outline-none focus:border-[#B8860B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#57534E] mb-1 font-medium">آدرس عکس اثر (URL):</label>
                <input
                  type="url"
                  value={prodForm.images?.[0] || ''}
                  onChange={(e) => setProdForm({ ...prodForm, images: [e.target.value] })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] font-mono outline-none focus:border-[#B8860B]"
                />
              </div>

              <div>
                <label className="block text-[#57534E] mb-1 font-medium">توضیحات و شناسنامه سنگ:</label>
                <textarea
                  rows={2}
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] outline-none focus:border-[#B8860B]"
                ></textarea>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={prodForm.inStock}
                    onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B8860B]"
                  />
                  <span>موجود در بوتیک</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#1C1917]">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B8860B]"
                  />
                  <span>محصول برگزیده ویترین</span>
                </label>
              </div>

              <div className="flex gap-2.5 pt-3 border-t border-[#E8E4DA]">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  ذخیره اطلاعات اثر
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewProductModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-[#57534E] text-xs hover:bg-[#F0EDE6] cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
