import React from 'react';
import { TrendingUp, Clock, Info, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { INITIAL_GOLD_RATES } from '../data/mockData';
import { GoldRates } from '../types';
import { formatPrice } from '../utils/pricing';

interface GoldRateTickerProps {
  goldRates?: GoldRates;
  rates?: GoldRates;
  onOpenPricingModal?: () => void;
  onOpenRatesModal?: () => void;
  onOpenAdmin?: () => void;
  isLoggedIn?: boolean;
}

export const GoldRateTicker: React.FC<GoldRateTickerProps> = ({
  goldRates,
  rates,
  onOpenPricingModal,
  onOpenRatesModal,
  onOpenAdmin,
  isLoggedIn = false,
}) => {
  const currentRates = goldRates || rates || INITIAL_GOLD_RATES;
  const handleOpenPricing = onOpenPricingModal || onOpenRatesModal || (() => {});

  return (
    <div className="bg-[#F4F1EA] border-y border-[#E2DDD3] py-2.5 sm:py-3.5 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Rates Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-5 w-full md:w-auto">
          <div className="hidden xs:flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-xs text-[#57534E] font-medium">نرخ روز طلا:</span>
          </div>

          {/* 18 Karat Rate */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white border border-[#E2DDD3] shadow-xs text-xs">
            <span className="text-[#78716C]">۱۸ عیار:</span>
            <span className="font-bold text-[#A16207]">
              {formatPrice(currentRates.rate18K)}
            </span>
          </div>

          {/* 24 Karat Rate */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white border border-[#E2DDD3] shadow-xs text-xs">
            <span className="text-[#78716C]">۲۴ عیار:</span>
            <span className="font-bold text-[#1C1917]">
              {formatPrice(currentRates.rate24K)}
            </span>
          </div>

          {/* Update Time */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#78716C]">
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>{currentRates.lastUpdated}</span>
          </div>
        </div>

        {/* Right: Actions and Transparency */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleOpenPricing}
            className="text-xs text-[#925B03] hover:text-[#78350F] flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-white hover:bg-[#FAF8F5] transition-colors border border-[#D4AF37]/40 shadow-xs cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>فرمول محاسبه قیمت طلا</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {isLoggedIn && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              تغییر دستی نرخ طلا
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
