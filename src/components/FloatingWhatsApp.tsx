import React, { useState, useEffect, useRef } from 'react';
import { MessageSquareText, X, Sparkles } from 'lucide-react';
import { playLuxuryHoverChime, playLuxuryClickChime } from '../utils/audio';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const lastHoverTimeRef = useRef<number>(0);

  useEffect(() => {
    // Smooth entrance delay on page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    const now = Date.now();
    // Debounce hover sound effect (400ms) to avoid multiple rapid triggers on cursor jitter
    if (now - lastHoverTimeRef.current > 400) {
      lastHoverTimeRef.current = now;
      playLuxuryHoverChime();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Calculate ripple diameter to gracefully expand across the button from click point
    const size = Math.max(rect.width, rect.height) * 2.4;

    const newRipple: ClickRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
    playLuxuryClickChime();
  };

  const handleRippleEnd = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      className={`floating-whatsapp-wrapper fixed bottom-6 left-6 z-30 flex items-center gap-3 transition-all duration-700 ease-out transform ${
        isLoaded
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      {/* Tooltip with Luxury Gold Accent */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-xs border border-[#E8E4DA] text-xs text-[#1C1917] shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B] animate-pulse" />
          <span>مشاور و کارشناس اختصاصی طلا و جواهر (آنلاین)</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#78716C] hover:text-[#1C1917] mr-1 cursor-pointer"
            aria-label="بستن راهنما"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Luxury Chat Floating Action Button with Radiating Golden Ripple Effect */}
      <div className="relative flex items-center justify-center">
        {/* Radiating Subtle Golden Ripple Waves */}
        <span
          className="absolute inset-0 rounded-full border border-[#D4AF37]/65 bg-[#D4AF37]/10 pointer-events-none animate-golden-ripple"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full border border-[#B8860B]/45 pointer-events-none animate-golden-ripple-delayed"
          aria-hidden="true"
        />

        <a
          href="https://wa.me/989123456789?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AC%D9%87%D8%AA%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%AE%D8%B1%DB%8C%D8%AF%20%D8%B7%D9%84%D8%A7%20%D9%88%20%D8%AC%D9%88%D8%A7%D9%87%D8%B1%20%D8%B2%D8%B1%DB%8C%D9%86%20%D9%BE%DB%8C%D8%A7%D9%85%20%D9%85%DB%8C%E2%80%8C%D8%AF%D9%87%D9%85."
          target="_blank"
          rel="noreferrer"
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          className="w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-[#1C1917] via-[#292524] to-[#44403C] border border-[#D4AF37]/60 text-[#D4AF37] hover:text-white hover:border-[#B8860B] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer z-10"
          title="گفتگو و مشاوره آنلاین طلا"
          aria-label="گفتگو و مشاوره آنلاین طلا"
        >
          {/* Localized Golden Click Ripples (Centered at Interaction Point) */}
          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full pointer-events-none animate-golden-click-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
                onAnimationEnd={() => handleRippleEnd(ripple.id)}
              />
            ))}
          </span>

          {/* Subtle Luxury Golden Ripple Ring on Hover */}
          <span className="absolute inset-0 rounded-full border border-[#D4AF37]/50 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500 pointer-events-none z-0"></span>

          <MessageSquareText className="w-5 h-5 relative z-10 drop-shadow-xs" />

          {/* Status Dot with Gold & White Ring */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] border-2 border-[#1C1917] shadow-xs z-20"></span>
        </a>
      </div>
    </div>
  );
};
