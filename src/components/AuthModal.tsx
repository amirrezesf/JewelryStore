import React, { useState, useEffect } from 'react';
import { X, Smartphone, KeyRound, CheckCircle2, User, Wallet, Coins, ArrowLeft, SlidersHorizontal, LogOut } from 'lucide-react';
import { formatPrice } from '../utils/pricing';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  goldRate: number;
  onOpenAdmin?: () => void;
  isLoggedIn?: boolean;
  onLoginSuccess?: (phoneNumber: string) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  goldRate,
  onOpenAdmin,
  isLoggedIn = false,
  onLoginSuccess,
  onLogout,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>(isLoggedIn ? 'profile' : 'phone');
  const [phoneNumber, setPhoneNumber] = useState<string>('09121234567');
  const [otpCode, setOtpCode] = useState<string>('');
  const [walletGoldGrams, setWalletGoldGrams] = useState<number>(3.85);
  const [walletTomans, setWalletTomans] = useState<number>(25000000);

  useEffect(() => {
    if (isLoggedIn) {
      setStep('profile');
    } else {
      setStep('phone');
    }
  }, [isLoggedIn, isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('profile');
    if (onLoginSuccess) {
      onLoginSuccess(phoneNumber);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-[260] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#E8E4DA] max-w-md w-full shadow-2xl overflow-hidden text-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F0ECE1] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-serif-luxury text-[#1C1917]">
              {step === 'profile' ? 'حساب کاربری و کیف پول' : 'ورود / ثبت‌نام در زرین'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#78716C] hover:bg-[#EAE6DF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Phone */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="p-6 sm:p-8 space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] mx-auto mb-3 shadow-2xs">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1C1917]">شماره موبایل خود را وارد کنید</h4>
              <p className="text-xs text-[#78716C] mt-1">
                کد تایید پیامکی برای احراز هویت فوری ارسال خواهد شد
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1.5">
                شماره تلفن همراه:
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full bg-[#FAF8F5] border border-[#E8E4DA] focus:border-[#B8860B] focus:bg-white rounded-xl px-4 py-3 text-sm font-bold text-[#1C1917] text-left outline-none transition-all"
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#1C1917] text-white hover:bg-[#B8860B] font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>دریافت کد تایید یکبار مصرف</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-[#A8A29E] text-center pt-2">
              با ورود یا ثبت‌نام، شرایط و قوانین معاملات طلای زرین را می‌پذیرید.
            </p>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="p-6 sm:p-8 space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/40 flex items-center justify-center text-[#B8860B] mx-auto mb-3 shadow-2xs">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1C1917]">کد ۴ رقمی پیامک شده</h4>
              <p className="text-xs text-[#78716C] mt-1">
                کد تایید به شماره {phoneNumber} ارسال گردید
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1.5 text-center">
                کد تایید پیامکی:
              </label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="۱۲۳۴"
                className="w-full bg-[#FAF8F5] border border-[#E8E4DA] focus:border-[#B8860B] focus:bg-white rounded-xl px-4 py-3 text-xl font-bold tracking-[0.5em] text-center text-[#1C1917] outline-none transition-all"
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white hover:brightness-105 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-md"
            >
              <span>تایید و ورود به سامانه</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-[#A16207] hover:underline pt-2 cursor-pointer"
            >
              تغییر شماره موبایل
            </button>
          </form>
        )}

        {/* Step 3: User Profile, Gold Wallet & Admin Access (After Login) */}
        {step === 'profile' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* User details */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#B8860B] text-white flex items-center justify-center font-bold text-base">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1917]">کاربر احراز هویت شده زرین</div>
                  <div className="text-[11px] text-[#78716C]">{phoneNumber}</div>
                  <span className="inline-block mt-0.5 text-[10px] bg-[#DCFCE7] text-[#166534] font-semibold px-2 py-0.5 rounded-full">
                    احراز هویت سطح طلایی ۲۴k
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Panel Access Button - Available after login */}
            {onOpenAdmin && (
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D4AF37]/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#B8860B]" />
                    <span>دسترسی مدیر به تنظیمات</span>
                  </span>
                  <span className="text-[10px] text-[#925B03] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                    دسترسی مدیریت
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-white hover:brightness-105 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>ورود به پنل مدیریت طلا</span>
                </button>
              </div>
            )}

            {/* Gold and Cash Wallet */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C1917] to-[#2E2824] text-white border border-[#D4AF37]/50 shadow-md">
                <div className="flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    <span>موجودی طلای بدون اجرت:</span>
                  </span>
                  <span className="text-[10px] text-[#D6D3D1]">۱۸ عیار قالبی</span>
                </div>
                <div className="text-2xl font-bold mt-1 text-white">
                  {walletGoldGrams.toLocaleString('fa-IR')} <span className="text-sm font-normal text-[#D4AF37]">گرم</span>
                </div>
                <div className="text-[11px] text-[#A8A29E] mt-1">
                  ارزش روز: {formatPrice(Math.round(walletGoldGrams * goldRate))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DA]">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <span className="flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-[#B8860B]" />
                    <span>موجودی کیف پول ریالی:</span>
                  </span>
                  <span className="text-[10px] text-[#16A34A] font-semibold">آماده خرید آنی</span>
                </div>
                <div className="text-xl font-bold mt-1 text-[#1C1917]">
                  {formatPrice(walletTomans)}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-[#1C1917] text-white font-semibold text-xs hover:bg-[#B8860B] transition-colors cursor-pointer"
              >
                بستن و ادامه خرید
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-center text-xs text-[#DC2626] hover:underline flex items-center justify-center gap-1.5 py-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>خروج از حساب کاربری</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
