import React, { useState } from 'react';
import { TrendingUp, Gem, Calendar, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { GoldRates } from '../types';
import { formatPrice } from '../utils/pricing';

interface GoldPriceChartProps {
  goldRates: GoldRates;
  onTradeClick?: () => void;
}

type Timeframe = '24h' | 'weekly' | 'monthly';

interface ChartPoint {
  time: string;
  price: number;
}

const DATA_24H: ChartPoint[] = [
  { time: '۰۰:۰۰', price: 4790000 },
  { time: '۰۳:۰۰', price: 4795000 },
  { time: '۰۶:۰۰', price: 4802000 },
  { time: '۰۹:۰۰', price: 4820000 },
  { time: '۱۲:۰۰', price: 4845000 },
  { time: '۱۵:۰۰', price: 4860000 },
  { time: '۱۸:۰۰', price: 4850000 },
  { time: '۲۱:۰۰', price: 4855000 },
  { time: '۲۴:۰۰', price: 4850000 },
];

const DATA_WEEKLY: ChartPoint[] = [
  { time: 'شنبه', price: 4680000 },
  { time: 'یکشنبه', price: 4710000 },
  { time: 'دوشنبه', price: 4745000 },
  { time: 'سه‌شنبه', price: 4790000 },
  { time: 'چهارشنبه', price: 4830000 },
  { time: 'پنج‌شنبه', price: 4865000 },
  { time: 'جمعه', price: 4850000 },
];

const DATA_MONTHLY: ChartPoint[] = [
  { time: 'هفته ۱', price: 4520000 },
  { time: 'هفته ۲', price: 4610000 },
  { time: 'هفته ۳', price: 4730000 },
  { time: 'هفته ۴', price: 4850000 },
];

export const GoldPriceChart: React.FC<GoldPriceChartProps> = ({ goldRates, onTradeClick }) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('24h');
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const activeData = timeframe === '24h' ? DATA_24H : timeframe === 'weekly' ? DATA_WEEKLY : DATA_MONTHLY;

  // Compute min and max
  const prices = activeData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.995;
  const maxPrice = Math.max(...prices) * 1.005;

  // ViewBox coordinates
  const svgWidth = 760;
  const svgHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const points = activeData.map((d, i) => {
    const x = paddingX + (i / (activeData.length - 1)) * chartW;
    const y = paddingY + chartH - ((d.price - minPrice) / (maxPrice - minPrice)) * chartH;
    return { x, y, ...d };
  });

  // Generate SVG path with smooth cubic bezier curves
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const highPrice = Math.max(...prices);
  const lowPrice = Math.min(...prices);
  const currentPrice = goldRates.rate18K || activeData[activeData.length - 1].price;

  return (
    <section id="price-chart-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title matching Jourabian */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#1C1917] tracking-tight">
          قیمت طلا
        </h2>
        <p className="mt-2 text-sm text-[#78716C]">
          مظنه زنده طلای ۱۸ عیار اتحادیه و روند تغییرات در بازار
        </p>
      </div>

      {/* Main Chart Card matching Jourabian with luxury styling */}
      <div className="relative rounded-3xl bg-white border border-[#E8E4DA] p-5 sm:p-8 shadow-md">
        {/* Subtle decorative diamond in background */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-20">
          <Gem className="w-8 h-8 text-[#B8860B]" />
        </div>
        <div className="absolute bottom-4 left-4 pointer-events-none opacity-20">
          <Gem className="w-7 h-7 text-[#B8860B]" />
        </div>

        {/* Top Header inside Card */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-5">
          {/* Left stats: Current Price */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></span>
            <div>
              <span className="text-xs text-[#78716C]">قیمت اکنون هر گرم ۱۸ عیار:</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-bold text-[#1C1917]">
                  {formatPrice(currentPrice)}
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+۲.۱۶٪</span>
                </span>
              </div>
            </div>
          </div>

          {/* Timeframe selector pills matching Jourabian */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F5F3EF] border border-[#E8E4DA] self-stretch sm:self-auto justify-center">
            <button
              onClick={() => { setTimeframe('24h'); setHoverIndex(null); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                timeframe === '24h'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              ۲۴ ساعت اخیر
            </button>
            <button
              onClick={() => { setTimeframe('weekly'); setHoverIndex(null); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                timeframe === 'weekly'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              هفتگی
            </button>
            <button
              onClick={() => { setTimeframe('monthly'); setHoverIndex(null); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                timeframe === 'monthly'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              ماهانه
            </button>
          </div>
        </div>

        {/* High / Low summary bar */}
        <div className="flex items-center justify-between text-xs py-3 px-2 text-[#78716C]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
            <span>بالاترین قیمت:</span>
            <span className="font-semibold text-[#1C1917]">{formatPrice(highPrice)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]"></span>
            <span>پایین‌ترین قیمت:</span>
            <span className="font-semibold text-[#1C1917]">{formatPrice(lowPrice)}</span>
          </div>
        </div>

        {/* The SVG Canvas Chart */}
        <div className="relative w-full overflow-hidden mt-2">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Gradient for the gold area fill */}
              <linearGradient id="goldChartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.32" />
                <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </linearGradient>

              {/* Stroke glow */}
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#B8860B" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Horizontal Guide lines */}
            {[0.25, 0.5, 0.75].map((ratio) => {
              const y = paddingY + chartH * ratio;
              return (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#F0ECE1"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Filled Area */}
            <path d={areaD} fill="url(#goldChartGradient)" />

            {/* Main Smooth Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#goldGlow)"
            />

            {/* Data point dots */}
            {points.map((pt, i) => {
              const isSelected = hoverIndex === i;
              return (
                <g key={i} className="cursor-pointer">
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="9"
                      fill="#D4AF37"
                      fillOpacity="0.25"
                      className="animate-ping"
                    />
                  )}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? '6' : '4'}
                    fill={isSelected ? '#B8860B' : '#FFFFFF'}
                    stroke="#D4AF37"
                    strokeWidth={isSelected ? '3' : '2'}
                    onMouseEnter={() => setHoverIndex(i)}
                    onTouchStart={() => setHoverIndex(i)}
                  />
                  {/* Time label on X-axis */}
                  <text
                    x={pt.x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#8C827A"
                    fontFamily="Vazirmatn, sans-serif"
                  >
                    {pt.time}
                  </text>
                </g>
              );
            })}

            {/* Tooltip on active point */}
            {hoverIndex !== null && points[hoverIndex] && (
              <g transform={`translate(${points[hoverIndex].x}, ${Math.max(25, points[hoverIndex].y - 38)})`}>
                <rect
                  x="-65"
                  y="-18"
                  width="130"
                  height="34"
                  rx="8"
                  fill="#1C1917"
                  className="shadow-xl"
                />
                <polygon
                  points="0,20 -6,16 6,16"
                  fill="#1C1917"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Vazirmatn, sans-serif"
                >
                  {formatPrice(points[hoverIndex].price)}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>به‌روزرسانی خودکار بر اساس تابلوی مرکزی اتحادیه طلا و جواهر</span>
          </div>

          {onTradeClick && (
            <button
              onClick={onTradeClick}
              className="px-4 py-2 rounded-xl bg-[#1C1917] text-white font-medium hover:bg-[#B8860B] transition-colors cursor-pointer text-xs flex items-center gap-1.5"
            >
              <span>معامله آنلاین بدون اجرت</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
