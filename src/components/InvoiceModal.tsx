import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Gem } from 'lucide-react';
import { Order } from '../types';
import { formatNumber, formatPrice, formatWeight, toPersianDigits } from '../utils/pricing';

interface InvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFFFF] text-[#1A1A1A] border border-[#E8E4DA] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col font-['Vazirmatn',sans-serif]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar (Not printed) */}
        <div className="p-4 bg-[#F7F5EE] border-b border-[#E8E4DA] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#1C1917] font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#059669]" />
            <span>سفارش شما با موفقیت ثبت شد و فاکتور رسمی صادر گردید</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-105 transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور رسمی</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE6DF] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 text-right select-text bg-[#FAFAF8]">
          {/* Header */}
          <div className="border-b-2 border-[#1A1A1A] pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-2xl font-bold font-serif-luxury text-[#111111]">
                  گـالری طلا و جواهرات زریـن
                </span>
                <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
              </div>
              <p className="text-xs text-[#666666] mt-1">
                پروانه کسب رسمی شماره ۱۴۰۱/۴۲۸۹ اتحادیه صنف طلا، جواهر و نقره تهران
              </p>
              <p className="text-xs text-[#666666]">
                نشانی: تهران، پاسداران، نبش بوستان پنجم، عمارت طلا و جواهر زرین • تلفن: ۰۲۱-۲۲۵۵۸۸۹۰
              </p>
            </div>

            <div className="p-3 rounded-xl border border-[#CCCCCC] bg-[#FFFFFF] text-xs space-y-1 text-center min-w-[200px]">
              <div className="font-bold text-[#111111] text-sm">پیش‌فاکتور رسمی طلا و جواهر</div>
              <div>شماره فاکتور: <span className="font-mono font-bold text-[#B8860B]">{order.officialInvoiceNumber}</span></div>
              <div>کد رهگیری پستی: <span className="font-mono">{order.trackingCode}</span></div>
              <div>تاریخ صدور: <span>{order.date}</span></div>
            </div>
          </div>

          {/* Buyer Information Grid */}
          <div className="p-4 rounded-xl border border-[#E0E0E0] bg-[#FFFFFF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[#777777] block">خریدار محترم:</span>
              <span className="font-bold text-[#111111] text-sm">{order.customerName}</span>
            </div>
            <div>
              <span className="text-[#777777] block">کد ملی خریدار:</span>
              <span className="font-mono font-bold text-[#111111]">{toPersianDigits(order.nationalCode)}</span>
            </div>
            <div>
              <span className="text-[#777777] block">شماره تماس:</span>
              <span className="font-mono">{toPersianDigits(order.phone)}</span>
            </div>
            <div className="sm:col-span-3 pt-2 border-t border-[#F0F0F0]">
              <span className="text-[#777777]">نشانی تحویل: </span>
              <span className="text-[#222222]">{order.province}، {order.city}، {order.address}</span>
            </div>
          </div>

          {/* Table of Gold Products */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#F2EFE9] border-b-2 border-[#1A1A1A] text-[#333333]">
                  <th className="p-2.5 font-bold">ردیف</th>
                  <th className="p-2.5 font-bold">شرح کالا / اثر</th>
                  <th className="p-2.5 font-bold">کد اثر</th>
                  <th className="p-2.5 font-bold">عیار</th>
                  <th className="p-2.5 font-bold">وزن خالص (گرم)</th>
                  <th className="p-2.5 font-bold">تعداد</th>
                  <th className="p-2.5 font-bold">قیمت واحد (تومان)</th>
                  <th className="p-2.5 font-bold">مبلغ کل (تومان)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9F8F5]">
                    <td className="p-2.5 text-center">{toPersianDigits(idx + 1)}</td>
                    <td className="p-2.5 font-semibold text-[#111111]">{item.productName}</td>
                    <td className="p-2.5 font-mono text-[#555555]">{item.code}</td>
                    <td className="p-2.5">{item.karat} عیار ({item.karat === 24 ? '۹۹۹' : '۷۵۰'})</td>
                    <td className="p-2.5 font-bold">{formatWeight(item.weight)}</td>
                    <td className="p-2.5 text-center">{toPersianDigits(item.quantity)}</td>
                    <td className="p-2.5 font-mono">{formatNumber(item.unitPrice)}</td>
                    <td className="p-2.5 font-bold font-mono text-[#111111]">{formatNumber(item.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Totals Summary */}
          <div className="p-4 rounded-xl bg-[#F6F4EE] border border-[#E2DFD6] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>مجموع وزن کل طلای خالص:</span>
                <span className="font-bold text-sm text-[#111111]">{formatWeight(order.totalWeight)}</span>
              </div>
              <div className="flex justify-between text-[#666666]">
                <span>نحوه ارسال:</span>
                <span>
                  {order.shippingMethod === 'secure_courier' && 'پیک امنیتی تهران'}
                  {order.shippingMethod === 'insured_post' && 'پست هوایی بیمه‌شده'}
                  {order.shippingMethod === 'boutique_pickup' && 'تحویل در بوتیک مرکزی'}
                </span>
              </div>
              {order.notes && (
                <div className="text-[#666666] pt-1">
                  <span>توضیحات / حکاکی: </span>
                  <span className="text-[#222222]">{order.notes}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 border-t sm:border-t-0 sm:border-r border-[#D9D5CA] pr-0 sm:pr-4">
              <div className="flex justify-between text-[#555555]">
                <span>بیمه حمل و بسته‌بندی هاردباکس:</span>
                <span className="text-[#10B981] font-bold">رایگان (تعهد زرین)</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#111111] pt-2 border-t border-[#D9D5CA]">
                <span>مبلغ کل پرداخت شده:</span>
                <span className="text-[#B8860B] text-lg">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Official Stamp & Signatures */}
          <div className="pt-4 border-t border-[#E0E0E0] grid grid-cols-2 gap-8 items-end text-xs text-center">
            <div className="p-4 border border-dashed border-[#CCCCCC] rounded-xl h-24 flex flex-col justify-between">
              <span className="text-[#666666]">امضای خریدار / تحویل گیرنده:</span>
              <span className="text-[10px] text-[#999999]">مشاهده و تطابق مشخصات و عیار تایید گردید</span>
            </div>

            <div className="p-4 border border-dashed border-[#B8860B]/50 rounded-xl h-24 flex flex-col justify-between relative overflow-hidden bg-[#FFFDF8]">
              <span className="text-[#B8860B] font-bold">مهر و امضای مدیریت گالری زرین</span>
              <div className="text-[11px] text-[#444444]">
                اصالت، وزن و عیار استاندارد اتحادیه تضمین می‌گردد
              </div>
              {/* Seal Stamp Simulation */}
              <div className="absolute right-4 bottom-2 border-2 border-[#B8860B] rounded-full px-2 py-0.5 text-[9px] text-[#B8860B] font-bold rotate-[-12deg] pointer-events-none opacity-80">
                گالری زرین • مهر رسمی
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <p className="text-[10px] text-[#888888] leading-relaxed text-center border-t border-[#EAEAEA] pt-3">
            این فاکتور رسمی معتبرترین سند مالکیت طلای مسکوک و مصنوع بوده و در کلیه مراجع قانونی، صنفی و انتظامی کشور نافذ می‌باشد. 
            تضمین بازخرید مادام‌العمر این قطعه توسط گالری زرین بر مبنای نرخ روز تابلوی اتحادیه معتبر خواهد بود.
          </p>
        </div>
      </div>
    </div>
  );
};
