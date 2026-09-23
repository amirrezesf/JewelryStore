import React from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Scale, Sparkles } from 'lucide-react';
import { CartItem, GoldRates } from '../types';
import { calculateProductPrice, formatPrice, formatWeight, toPersianDigits } from '../utils/pricing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  goldRates: GoldRates;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  goldRates,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  // Calculate totals
  let totalWeight = 0;
  let grandTotal = 0;
  let rawGoldTotal = 0;
  let craftTotal = 0;

  items.forEach((item) => {
    const priceInfo = calculateProductPrice(item.product, goldRates);
    totalWeight += item.product.weightInGrams * item.quantity;
    grandTotal += priceInfo.total * item.quantity;
    rawGoldTotal += priceInfo.rawGoldPrice * item.quantity;
    craftTotal += priceInfo.craftFee * item.quantity;
  });

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-r border-[#E8E4DA] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B8860B]" />
              <h2 className="text-base font-bold text-[#1C1917]">سبد خرید جواهرات زرین</h2>
              <span className="text-xs text-[#78716C]">({items.length} اثر)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-[#78716C]">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E4DA] flex items-center justify-center mb-4 shadow-2xs">
                  <ShoppingBag className="w-7 h-7 text-[#B8860B]" />
                </div>
                <p className="text-sm font-medium text-[#1C1917] mb-1">سبد خرید شما خالی است</p>
                <p className="text-xs text-[#78716C] mb-6">
                  آثار بی‌نظیر زرین را در ویترین مشاهده و انتخاب کنید.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white text-xs font-bold hover:brightness-105 shadow-sm cursor-pointer"
                >
                  مشاهده ویترین طلا
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice = calculateProductPrice(item.product, goldRates);
                return (
                  <div
                    key={item.product.id}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] flex gap-3.5 items-start shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover bg-white shrink-0 border border-[#E8E4DA]"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#1C1917] truncate" title={item.product.name}>
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#78716C] hover:text-[#EF4444] p-1 cursor-pointer transition-colors"
                          title="حذف از سبد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#78716C]">
                        <span>کد: {item.product.code}</span>
                        <span>•</span>
                        <span>{item.product.karat} عیار</span>
                        <span>•</span>
                        <span className="text-[#925B03] font-medium">{formatWeight(item.product.weightInGrams)}</span>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[#E8E4DA] rounded-lg bg-white p-0.5 shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1C1917]">
                            {toPersianDigits(item.quantity)}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-xs font-bold text-[#A16207]">
                          {formatPrice(itemPrice.total * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8E4DA] bg-[#F7F5EE] space-y-3.5">
              {/* Gold Weight and Legal Breakdown */}
              <div className="p-3 rounded-xl bg-white border border-[#E8E4DA] space-y-1.5 text-xs shadow-2xs">
                <div className="flex justify-between text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-[#B8860B]" />
                    مجموع وزن طلای خالص سفارش:
                  </span>
                  <span className="font-bold text-[#1C1917]">{formatWeight(totalWeight)}</span>
                </div>
                <div className="flex justify-between text-[#78716C] text-[11px]">
                  <span>بیمه حمل اختصاصی و فاکتور اتحادیه:</span>
                  <span className="text-[#059669] font-medium">رایگان برای این سفارش</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-[#78716C] block">مبلغ کل قابل پرداخت:</span>
                  <span className="text-[10px] text-[#A8A29E]">محاسبه با نرخ رسمی روز</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#A16207] font-serif-luxury">
                  {formatPrice(grandTotal)}
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#C59B27] to-[#D4AF37] text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-[#B8860B]/20 cursor-pointer"
              >
                <span>تکمیل اطلاعات و صدور فاکتور رسمی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
