import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Truck, 
  MapPin, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  Building,
  Sparkles
} from 'lucide-react';
import { CartItem, GoldRates, Order } from '../types';
import { calculateProductPrice, formatPrice, formatWeight, generateInvoiceNumber, generateTrackingCode } from '../utils/pricing';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  goldRates: GoldRates;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  goldRates,
  onOrderSuccess,
}) => {
  if (!isOpen || items.length === 0) return null;

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    nationalCode: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    shippingMethod: 'secure_courier' as Order['shippingMethod'],
    paymentMethod: 'online' as Order['paymentMethod'],
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute totals
  let totalWeight = 0;
  let rawGoldTotal = 0;
  let craftTotal = 0;
  let taxTotal = 0;
  let grandTotal = 0;

  const orderItems = items.map((item) => {
    const priceInfo = calculateProductPrice(item.product, goldRates);
    const itemTotal = priceInfo.total * item.quantity;
    totalWeight += item.product.weightInGrams * item.quantity;
    rawGoldTotal += priceInfo.rawGoldPrice * item.quantity;
    craftTotal += priceInfo.craftFee * item.quantity;
    taxTotal += priceInfo.tax * item.quantity;
    grandTotal += itemTotal;

    return {
      productId: item.product.id,
      productName: item.product.name,
      code: item.product.code,
      weight: item.product.weightInGrams,
      karat: item.product.karat,
      unitPrice: priceInfo.total,
      quantity: item.quantity,
      totalPrice: itemTotal,
      image: item.product.images[0],
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.nationalCode || !formData.address) {
      alert('لطفاً اطلاعات هویتی و آدرس را جهت صدور فاکتور رسمی تکمیل فرمایید.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: generateTrackingCode(),
        date: new Date().toLocaleDateString('fa-IR'),
        customerName: formData.customerName,
        phone: formData.phone,
        nationalCode: formData.nationalCode,
        province: formData.province,
        city: formData.city,
        address: formData.address,
        postalCode: formData.postalCode,
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
        items: orderItems,
        totalWeight,
        rawGoldTotal,
        craftTotal,
        taxTotal,
        shippingCost: 0, // Free insured shipping
        grandTotal,
        status: 'processing',
        officialInvoiceNumber: generateInvoiceNumber(),
        trackingCode: generateTrackingCode(),
        notes: formData.notes,
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#E8E4DA] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#B8860B]" />
            <h3 className="text-base font-bold text-[#1C1917]">
              تسویه‌حساب امن و صدور فاکتور رسمی طلا
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-8 flex-1 space-y-6">
          {/* Trust Banner */}
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center gap-3 text-xs text-[#925B03] shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#B8860B] shrink-0" />
            <span>
              طبق مصوبه صنف طلا و جواهر، جهت احراز مالکیت طلا و صدور فاکتور معتبر هولوگرام‌دار، درج کدملی و مشخصات خریدار الزامی است.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Fields */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-2">
                ۱. اطلاعات هویتی خریدار
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#57534E] mb-1">
                    نام و نام خانوادگی <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="مطابق با کارت ملی"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] placeholder-[#A8A29E] focus:border-[#B8860B] outline-none shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#57534E] mb-1">
                    شماره تلفن همراه <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] placeholder-[#A8A29E] focus:border-[#B8860B] outline-none shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#57534E] mb-1">
                  کد ملی (جهت ثبت در فاکتور رسمی اتحادیه) <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={formData.nationalCode}
                  onChange={(e) => setFormData({ ...formData, nationalCode: e.target.value })}
                  placeholder="۱۰ رقم بدون خط تیره"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] placeholder-[#A8A29E] focus:border-[#B8860B] outline-none shadow-2xs"
                />
              </div>

              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider pt-3 mb-2">
                ۲. نشانی و نحوه تحویل محموله
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#57534E] mb-1">استان:</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#57534E] mb-1">شهر:</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#57534E] mb-1">
                  آدرس پستی کامل و دقیق <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="خیابان، پلاک، واحد..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                ></textarea>
              </div>

              {/* Shipping Method */}
              <div>
                <label className="block text-xs text-[#57534E] mb-2">شیوه ارسال:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, shippingMethod: 'secure_courier' })}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      formData.shippingMethod === 'secure_courier'
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] shadow-2xs'
                        : 'border-[#E8E4DA] bg-white text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    <div className="text-xs font-bold">پیک ویژه تهران</div>
                    <div className="text-[10px] text-[#78716C] mt-0.5">تحویل بیمه‌شده و محرمانه</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, shippingMethod: 'insured_post' })}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      formData.shippingMethod === 'insured_post'
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] shadow-2xs'
                        : 'border-[#E8E4DA] bg-white text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    <div className="text-xs font-bold">پست ویژه هوایی</div>
                    <div className="text-[10px] text-[#78716C] mt-0.5">بیمه ۱۰۰٪ ارزش ریالی</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, shippingMethod: 'boutique_pickup' })}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      formData.shippingMethod === 'boutique_pickup'
                        ? 'border-[#B8860B] bg-[#B8860B]/10 text-[#925B03] shadow-2xs'
                        : 'border-[#E8E4DA] bg-white text-[#57534E] hover:text-[#1C1917]'
                    }`}
                  >
                    <div className="text-xs font-bold">تحویل حضوری در بوتیک</div>
                    <div className="text-[10px] text-[#78716C] mt-0.5">عمارت زرین پاسداران</div>
                  </button>
                </div>
              </div>

              {/* Order Notes / Engraving */}
              <div>
                <label className="block text-xs text-[#57534E] mb-1">
                  متن حکاکی سفارشی / توضیحات هدیه (اختیاری):
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="مثال: حکاکی تاریخ یا اسم داخل حلقه، بسته‌بندی کادویی با کارت تبریک..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] focus:border-[#B8860B] outline-none shadow-2xs"
                />
              </div>
            </div>

            {/* Right: Order Summary & Official Invoice Preview */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-4 shadow-2xs">
              <div>
                <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-3">
                  خلاصه اقلام فاکتور رسمی
                </h4>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {items.map((it) => {
                    const price = calculateProductPrice(it.product, goldRates);
                    return (
                      <div
                        key={it.product.id}
                        className="flex items-center justify-between text-xs pb-2 border-b border-[#E8E4DA]"
                      >
                        <div className="truncate max-w-[170px]">
                          <span className="font-semibold text-[#1C1917] block truncate">
                            {it.product.name}
                          </span>
                          <span className="text-[10px] text-[#78716C]">
                            {formatWeight(it.product.weightInGrams)} × {it.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-[#A16207]">
                          {formatPrice(price.total * it.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E4DA] space-y-1.5 text-xs text-[#57534E]">
                  <div className="flex justify-between">
                    <span>مجموع وزن طلای خالص سفارش:</span>
                    <span className="font-bold text-[#1C1917]">{formatWeight(totalWeight)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>هزینه بسته‌بندی نفیس و بیمه کامل:</span>
                    <span className="text-[#059669] font-medium">رایگان و هدیه زرین</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#D4AF37]/40 flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-xs text-[#78716C] block">مبلغ نهایی فاکتور:</span>
                    <span className="text-[10px] text-[#059669] font-medium">شامل کد رهگیری اتحادیه</span>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#A16207] font-serif-luxury">
                    {formatPrice(grandTotal)}
                  </div>
                </div>

                {/* Payment Option */}
                <div className="mt-4">
                  <label className="block text-xs text-[#57534E] mb-1.5">روش پرداخت امن:</label>
                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#D4AF37]/40 bg-white cursor-pointer shadow-2xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'online'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                        className="text-[#B8860B]"
                      />
                      <CreditCard className="w-4 h-4 text-[#B8860B]" />
                      <span className="text-[#1C1917] font-medium">درگاه پرداخت شتاب (شاپرک امن)</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E8E4DA] bg-white cursor-pointer shadow-2xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                        className="text-[#B8860B]"
                      />
                      <Building className="w-4 h-4 text-[#B8860B]" />
                      <span className="text-[#1C1917] font-medium">واریز مستقیم شبا (پایا / ساتنا)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#D4AF37] text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-[#B8860B]/20 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>در حال صدور فاکتور رسمی...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>تایید سفارش و دریافت پیش‌فاکتور رسمی</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
