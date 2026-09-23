import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, FileText } from 'lucide-react';
import { Order } from '../types';
import { formatPrice, formatWeight } from '../utils/pricing';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onViewInvoice: (order: Order) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === query ||
        o.trackingCode.toLowerCase() === query ||
        o.phone.includes(query) ||
        o.nationalCode.includes(query)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border border-[#E8E4DA] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F7F5EE]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#B8860B]" />
            <h3 className="text-base font-bold text-[#1C1917]">
              رهگیری آنلاین سفارش و وضعیت مرسوله
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs text-[#57534E]">
              شماره سفارش (مثلاً ZR-...)، شماره پیگیری یا تلفن همراه:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="شماره پیگیری سفارش را وارد کنید..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#1C1917] placeholder-[#A8A29E] focus:border-[#B8860B] outline-none shadow-2xs"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-105 shadow-xs cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>رهگیری</span>
              </button>
            </div>
          </form>

          {/* Search Result */}
          {hasSearched && (
            <div>
              {searchedOrder ? (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-4 text-xs shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-3">
                    <div>
                      <div className="font-bold text-sm text-[#1C1917]">
                        سفارش {searchedOrder.orderNumber}
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        خریدار: {searchedOrder.customerName} • {searchedOrder.date}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#B8860B]/10 text-[#925B03] border border-[#B8860B]/30">
                      {searchedOrder.status === 'processing' && 'در حال آماده‌سازی و صدور فاکتور'}
                      {searchedOrder.status === 'pending' && 'در انتظار تایید حسابداری'}
                      {searchedOrder.status === 'shipped' && 'تحویل به سرویس حمل بیمه‌شده'}
                      {searchedOrder.status === 'delivered' && 'تحویل داده شده'}
                    </span>
                  </div>

                  {/* Progress steps */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-[#059669]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>ثبت نهایی سفارش و تخصیص قطعات طلا</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#059669]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>صدور فاکتور رسمی هولوگرام‌دار ({searchedOrder.officialInvoiceNumber})</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#925B03]">
                      <Clock className="w-4 h-4 shrink-0 animate-pulse" />
                      <span>بسته‌بندی نفیس هاردباکس و تخصیص مامور تحویل بیمه‌شده</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between">
                    <div>
                      <span className="text-[#78716C] block">مجموع ارزش ریالی:</span>
                      <span className="font-bold text-[#A16207] text-sm">{formatPrice(searchedOrder.grandTotal)}</span>
                    </div>
                    <button
                      onClick={() => onViewInvoice(searchedOrder)}
                      className="px-4 py-2 rounded-xl bg-white border border-[#E8E4DA] text-[#925B03] hover:bg-[#FAF8F5] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>مشاهده فاکتور رسمی</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-[#78716C] bg-[#FAF8F5] rounded-xl border border-[#E8E4DA]">
                  سفارشی با این مشخصات یافت نشد. لطفاً شماره پیگیری یا شماره تماس را بررسی نمایید.
                </div>
              )}
            </div>
          )}

          {/* Quick instructions */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] text-xs text-[#57534E] space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 font-medium text-[#925B03]">
              <ShieldCheck className="w-4 h-4" />
              <span>پشتیبانی اختصاصی مرسولات:</span>
            </div>
            <p>
              در صورت نیاز به هماهنگی تغییر ساعت تحویل پیک یا استعلام بارنامه هوایی با شماره ۰۲۱-۲۲۵۵۸۸۹۰ تماس حاصل فرمایید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
