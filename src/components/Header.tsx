import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  FileText,
  User,
  ArrowLeft,
  TrendingUp,
  HelpCircle,
  Compass,
  BookOpen,
  ArrowUpRight,
  Layers,
  Clock
} from 'lucide-react';
import { INITIAL_GOLD_RATES } from '../data/mockData';
import { GoldRates, ProductCategory } from '../types';
import { formatPrice } from '../utils/pricing';

interface NavCategoryItem {
  id: ProductCategory;
  name: string;
  badge: string;
  desc: string;
}

const NAV_CATEGORIES: NavCategoryItem[] = [
  { id: 'no_fee', name: 'طلای آبشده و بدون اجرت', badge: '۰٪ اجرت', desc: 'انگ‌دار با گواهی ری‌گیری معتبر' },
  { id: 'coins', name: 'شمش و سکه بانکی', badge: '۲۴ عیار ۹۹۹', desc: 'پلمپ رسمی با هولوگرام امنیتی' },
  { id: 'rings', name: 'انگشتر و رینگ لوکس', badge: 'سولیتر برلیان', desc: 'طراحی فاخر و نگین‌های شناسنامه‌دار' },
  { id: 'necklaces', name: 'گردنبند و آویز زرین', badge: 'تنیس و اسلیمی', desc: 'مدال‌های دست‌ساز و زنجیرهای لوکس' },
  { id: 'bracelets', name: 'دستبند و النگو', badge: 'کارتیه و بنگل', desc: 'قفل‌های ایمن و طرح‌های ماندگار' },
  { id: 'earrings', name: 'گوشواره و پیرسینگ', badge: 'میخی و آویز', desc: 'وزن سبک و کارمزد اقتصادی' },
  { id: 'sets', name: 'سرویس و نیم‌ست عروس', badge: 'کالکشن تشریفاتی', desc: 'سرویس‌های سلطنتی و مجلل' },
  { id: 'gifts', name: 'کادویی و مینیمال', badge: 'اقتصادی', desc: 'مناسب هدیه و یادبودهای خاص' },
];

interface HeaderProps {
  goldRates?: GoldRates;
  rates?: GoldRates;
  cartCount: number;
  wishlistCount: number;
  currentView?: 'home' | 'shop';
  currentPage?: string;
  onNavigateHome?: () => void;
  onNavigateShop?: () => void;
  onNavigate?: (page: string) => void;
  onSelectCategory?: (category: ProductCategory) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenAuth?: () => void;
  onOpenSearch?: () => void;
  onSearch?: (query: string) => void;
  onOpenOrderTracking?: () => void;
  onOpenTracking?: () => void;
  onOpenPricingInfo?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenInfoModal?: (type: 'pricing' | 'about' | 'contact' | 'faq' | 'terms') => void;
  isLoggedIn?: boolean;
  userPhone?: string;
}

export const Header: React.FC<HeaderProps> = ({
  goldRates,
  rates,
  cartCount,
  wishlistCount,
  currentView,
  currentPage,
  onNavigateHome,
  onNavigateShop,
  onNavigate,
  onSelectCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenAuth,
  onOpenSearch,
  onSearch,
  onOpenOrderTracking,
  onOpenTracking,
  onOpenPricingInfo,
  onOpenAbout,
  onOpenContact,
  onOpenInfoModal,
  isLoggedIn = false,
  userPhone,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'products' | 'market' | 'services' | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<'products' | 'market' | 'services' | null>('products');

  // Animated Search State
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeRates = goldRates || rates || INITIAL_GOLD_RATES;
  const activePage = currentPage || currentView || 'home';

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Focus input automatically when search is triggered
  useEffect(() => {
    if (isSearchActive) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isSearchActive]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K opens search, Esc closes)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchActive((prev) => !prev);
        setOpenDropdown(null);
      } else if (e.key === 'Escape' && isSearchActive) {
        setIsSearchActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive]);

  // Hover delay handling to make dropdown usage smooth
  const handleMouseEnterDropdown = (menu: 'products' | 'market' | 'services') => {
    if (isSearchActive) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menu: 'products' | 'market' | 'services') => {
    if (isSearchActive) return;
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  // Close dropdown or search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (
        isSearchActive &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive]);

  const handleNavigate = (page: string) => {
    setOpenDropdown(null);
    setIsSearchActive(false);
    if (onNavigate) {
      onNavigate(page);
    } else if (page === 'home' && onNavigateHome) {
      onNavigateHome();
    } else if (page === 'shop' && onNavigateShop) {
      onNavigateShop();
    } else if (page === 'collections' && onNavigateShop) {
      onNavigateShop();
    }
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    setOpenDropdown(null);
    setIsSearchActive(false);
    setMobileMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      handleNavigate('shop');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setOpenDropdown(null);
    setIsSearchActive(false);
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTracking = onOpenTracking || onOpenOrderTracking || (() => {});

  const handleOpenInfo = (type: 'pricing' | 'about' | 'contact' | 'faq' | 'terms') => {
    setOpenDropdown(null);
    setIsSearchActive(false);
    setMobileMenuOpen(false);
    if (onOpenInfoModal) {
      onOpenInfoModal(type);
    } else {
      if (type === 'pricing' && onOpenPricingInfo) onOpenPricingInfo();
      else if (type === 'about' && onOpenAbout) onOpenAbout();
      else if (type === 'contact' && onOpenContact) onOpenContact();
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else if (onOpenSearch) {
        onOpenSearch();
      } else {
        handleNavigate('shop');
      }
      setIsSearchActive(false);
    }
  };

  const handleQuickSearchKeyword = (keyword: string) => {
    setSearchQuery(keyword);
    if (onSearch) {
      onSearch(keyword);
    } else {
      handleNavigate('shop');
    }
    setIsSearchActive(false);
  };

  const toggleSearchMode = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
    } else {
      setIsSearchActive(true);
      setOpenDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-[100] w-full backdrop-blur-md bg-white/95 border-b border-[#E8E4DA] transition-all shadow-xs">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#F7F5EE] border-b border-[#E8E4DA] text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[#57534E]">
          {/* Live Gold Price Quick Ticker */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#925B03]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8860B]"></span>
              </span>
              <span className="font-medium text-[#1C1917]">مظنه زنده طلای ۱۸ عیار:</span>
              <span className="font-semibold tracking-wide text-[#A16207]">
                {formatPrice(activeRates.rate18K)} / گرم
              </span>
            </span>

            <button
              onClick={() => handleOpenInfo('pricing')}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#78716C] hover:text-[#A16207] transition-colors underline decoration-[#D4AF37]/40 cursor-pointer"
              title="مشاهده فرمول شفاف قیمت‌گذاری اتحادیه"
            >
              <Sparkles className="w-3 h-3 text-[#B8860B]" />
              نحوه محاسبه شفاف
            </button>
          </div>

          {/* Quick VIP Contact & Order Tracking */}
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={handleOpenTracking}
              className="hover:text-[#A16207] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3 h-3 text-[#B8860B]" />
              پیگیری سفارش
            </button>
            <a
              href="tel:02122558890"
              className="hidden md:flex items-center gap-1 hover:text-[#A16207] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#B8860B]" />
              مشاوره VIP: ۰۲۱-۲۲۵۵۸۸۹۰
            </a>
            {isLoggedIn && onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/50 bg-[#FAF8F5] text-[#925B03] hover:bg-[#B8860B] hover:text-white transition-all duration-200 cursor-pointer shadow-2xs font-semibold"
              >
                <SlidersHorizontal className="w-3 h-3" />
                پنل مدیریت طلا
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 relative" 
        ref={dropdownRef}
      >
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] hover:text-[#B8860B] transition-colors focus:outline-none cursor-pointer"
            aria-label="منوی سایت"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#1C1917]" />}
          </button>
          <button
            onClick={toggleSearchMode}
            className="p-2 text-[#1C1917] hover:text-[#B8860B] transition-colors cursor-pointer"
            aria-label="جستجو"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Logo & Wordmark (Refined Smaller Luxury Scale) */}
        <div 
          onClick={() => { handleNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="cursor-pointer flex flex-col items-center select-none group shrink-0"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#1C1917] font-serif-luxury group-hover:text-[#B8860B] transition-colors">
              گـالری زریـن
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B8860B] mb-0.5"></span>
          </div>
          <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-[#8C6514] font-medium uppercase mt-0.5">
            Zarrin Haute Joaillerie
          </span>
        </div>

        {/* Center Area: Either Animated Search Bar OR Categorized Desktop Dropdowns */}
        {isSearchActive ? (
          /* Animated Search Bar: Dropdowns Disappear, Animated Input Appears */
          <div 
            ref={searchContainerRef}
            className="flex-1 max-w-2xl mx-2 sm:mx-6 transition-all duration-300 ease-out animate-fade-in"
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <div className="relative w-full flex items-center">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B] pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی نام اثر، شمش ۲۴ عیار، انگشتر، النگو، دستبند یا کد محصول..."
                  className="w-full pr-10 pl-24 py-2 sm:py-2.5 rounded-full border-2 border-[#D4AF37] bg-white text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/25 shadow-lg transition-all"
                />

                {/* Clear Input Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-20 top-1/2 -translate-y-1/2 p-1 text-[#A8A29E] hover:text-[#1C1917] transition-colors cursor-pointer"
                    title="پاک کردن متن"
                    aria-label="پاک کردن"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Submit Search Button */}
                <button
                  type="submit"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-[#1C1917] hover:bg-[#B8860B] text-white text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs"
                >
                  جستجو
                </button>
              </div>

              {/* Close Button to return to dropdown navigation links */}
              <button
                type="button"
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchQuery('');
                }}
                className="mr-2 sm:mr-3 p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-all cursor-pointer shrink-0"
                title="بستن جستجو و بازگشت به منوها (Esc)"
                aria-label="بستن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Popular Keywords Suggestion Chips */}
            <div className="hidden lg:flex items-center gap-2 mt-1.5 pr-3 text-[10px] text-[#78716C]">
              <span className="text-[#925B03] font-medium flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                عبارات پرطرفدار:
              </span>
              {['طلای آبشده', 'شمش ۲۴ عیار', 'النگو', 'دستبند کارتیه', 'انگشتر برلیان', 'سرویس عروس'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleQuickSearchKeyword(term)}
                  className="hover:text-[#925B03] hover:underline cursor-pointer transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Normal State: Categorized Desktop Navigation with Luxury Dropdowns */
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-[#44403C] transition-all duration-300 animate-fade-in">
            {/* 1. Dropdown: محصولات و دسته‌بندی‌ها */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown('products')}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => toggleDropdown('products')}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                  openDropdown === 'products'
                    ? 'bg-[#FAF8F5] text-[#925B03] shadow-xs'
                    : 'text-[#44403C] hover:text-[#925B03] hover:bg-[#FAF8F5]'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>محصولات و دسته‌بندی‌ها</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'products' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'
                  }`} 
                />
              </button>

              {/* Mega Dropdown Panel for Products */}
              {openDropdown === 'products' && (
                <div 
                  className="absolute top-full right-0 mt-1.5 w-[560px] bg-white/98 backdrop-blur-md border border-[#E8E4DA] rounded-2xl shadow-2xl p-5 z-[120] animate-fade-in"
                  onMouseEnter={() => handleMouseEnterDropdown('products')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  {/* Header of Dropdown */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#F0ECE1]">
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                        <span>دسته‌بندی‌های رسمی طلا و جواهر</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
                      </h4>
                      <p className="text-[11px] text-[#78716C] mt-0.5">انتخاب دسته‌بندی جهت مشاهده آثار و مظنه شفاف</p>
                    </div>
                    <button
                      onClick={() => { setOpenDropdown(null); handleNavigate('shop'); }}
                      className="text-xs text-[#925B03] hover:text-[#78350F] flex items-center gap-1 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#D4AF37]/30 hover:border-[#B8860B] transition-all cursor-pointer font-bold"
                    >
                      <span>مشاهده همه محصولات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 2-Column Categories Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {NAV_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="min-w-0 pr-1">
                          <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors truncate">
                            {cat.name}
                          </div>
                          <div className="text-[10px] text-[#78716C] truncate mt-0.5">
                            {cat.desc}
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-semibold text-[#925B03] bg-[#F7F5EE] group-hover:bg-[#EAE4D3] px-2 py-0.5 rounded-full border border-[#D4AF37]/20 transition-colors">
                          {cat.badge}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Dropdown Footer Shortcuts */}
                  <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] text-[#78716C]">
                    <button
                      onClick={() => scrollToSection('categories-section')}
                      className="hover:text-[#925B03] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>مشاهده بخش دسته‌بندی‌ها در صفحه اصلی</span>
                    </button>
                    <button
                      onClick={() => scrollToSection('products-section')}
                      className="hover:text-[#925B03] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>ویترین آثار برگزیده</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Dropdown: قیمت و تحلیل بازار */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown('market')}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => toggleDropdown('market')}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                  openDropdown === 'market'
                    ? 'bg-[#FAF8F5] text-[#925B03] shadow-xs'
                    : 'text-[#44403C] hover:text-[#925B03] hover:bg-[#FAF8F5]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>قیمت و تحلیل بازار</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'market' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'
                  }`} 
                />
              </button>

              {/* Market Dropdown Panel */}
              {openDropdown === 'market' && (
                <div 
                  className="absolute top-full right-0 mt-1.5 w-[360px] bg-white/98 backdrop-blur-md border border-[#E8E4DA] rounded-2xl shadow-2xl p-4 z-[120] animate-fade-in space-y-2"
                  onMouseEnter={() => handleMouseEnterDropdown('market')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="px-2 pb-2 border-b border-[#F0ECE1]">
                    <h4 className="text-xs font-bold text-[#1C1917]">تابلوی نرخ و تحلیل معاملات طلا</h4>
                    <p className="text-[11px] text-[#78716C] mt-0.5">مظنه رسمی اتحادیه به همراه ابزار تحلیل</p>
                  </div>

                  {/* Live Rates Mini Ticker Card */}
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E4DA] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#57534E] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                        <span>طلای ۱۸ عیار (۷۵۰):</span>
                      </span>
                      <span className="font-bold text-[#A16207]">{formatPrice(activeRates.rate18K)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EAE6DF]">
                      <span className="text-[#57534E]">طلای ۲۴ عیار (۹۹۹):</span>
                      <span className="font-bold text-[#1C1917]">{formatPrice(activeRates.rate24K)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#8C827A] pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                        <span>آخرین استعلام:</span>
                      </span>
                      <span>امروز ۱۲:۳۰</span>
                    </div>
                  </div>

                  {/* Action 1: Live Chart */}
                  <button
                    onClick={() => scrollToSection('price-chart-section')}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        نمودار زنده روند قیمت طلا
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        تحلیل تعاملی روزانه، هفتگی و ماهانه طلا و سکه
                      </div>
                    </div>
                  </button>

                  {/* Action 2: Transparent Formula */}
                  <button
                    onClick={() => handleOpenInfo('pricing')}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        فرمول شفاف محاسبه قیمت طلا
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        روش مصوب اتحادیه (وزن، اجرت، سود ۷٪ و مالیات ۹٪)
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Dropdown: خدمات و راهنما */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnterDropdown('services')}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                onClick={() => toggleDropdown('services')}
                className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all duration-200 cursor-pointer ${
                  openDropdown === 'services'
                    ? 'bg-[#FAF8F5] text-[#925B03] shadow-xs'
                    : 'text-[#44403C] hover:text-[#925B03] hover:bg-[#FAF8F5]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>خدمات و راهنما</span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    openDropdown === 'services' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'
                  }`} 
                />
              </button>

              {/* Services Dropdown Panel */}
              {openDropdown === 'services' && (
                <div 
                  className="absolute top-full right-0 mt-1.5 w-[360px] bg-white/98 backdrop-blur-md border border-[#E8E4DA] rounded-2xl shadow-2xl p-4 z-[120] animate-fade-in space-y-1.5"
                  onMouseEnter={() => handleMouseEnterDropdown('services')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="px-2 pb-2 border-b border-[#F0ECE1]">
                    <h4 className="text-xs font-bold text-[#1C1917]">خدمات خریداران و امور مشتریان</h4>
                    <p className="text-[11px] text-[#78716C] mt-0.5">راهنمای معامله، رهگیری سفارش و استانداردهای عیار</p>
                  </div>

                  {/* Option 1: Steps */}
                  <button
                    onClick={() => scrollToSection('buying-steps-section')}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        مراحل گام‌به‌گام خرید طلا
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        ثبت‌نام، شارژ کیف پول و تحویل امن با بیمه مرسوله
                      </div>
                    </div>
                  </button>

                  {/* Option 2: Order Tracking */}
                  <button
                    onClick={handleOpenTracking}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        پیگیری سفارشات و استعلام فاکتور
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        پیگیری وضعیت ارسال و مشاهده فاکتور رسمی هولوگرام‌دار
                      </div>
                    </div>
                  </button>

                  {/* Option 3: FAQ */}
                  <button
                    onClick={() => scrollToSection('faq-section')}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        پاسخ به سوالات متداول (FAQ)
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        سوالات متداول درباره عیارسنجی، ری‌گیری و نقدشوندگی
                      </div>
                    </div>
                  </button>

                  {/* Option 4: Terms & Quality Guarantee */}
                  <button
                    onClick={() => handleOpenInfo('terms')}
                    className="w-full text-right p-2.5 rounded-xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8E4DA] transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D4AF37]/30 flex items-center justify-center text-[#B8860B] shrink-0 mt-0.5 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1917] group-hover:text-[#925B03] transition-colors">
                        قوانین و ضمانت اصالت عیار
                      </div>
                      <div className="text-[11px] text-[#78716C] mt-0.5">
                        ضمانت کتبی بازخرید و استانداردهای آزمایشگاهی
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Direct Link: مجله و آموزش طلا */}
            <button
              onClick={() => scrollToSection('blog-section')}
              className="py-2 px-3 rounded-full text-[#44403C] hover:text-[#925B03] hover:bg-[#FAF8F5] transition-all cursor-pointer font-semibold flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>مجله و آموزش</span>
            </button>
          </nav>
        )}

        {/* Actions (Auth, Animated Search Trigger Button, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Animated Search Button Trigger (When search is inactive) */}
          {!isSearchActive && (
            <button
              onClick={toggleSearchMode}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#D4AF37]/45 bg-[#FAF8F5] text-xs text-[#78716C] hover:text-[#1C1917] hover:border-[#B8860B] hover:shadow-xs transition-all duration-300 cursor-pointer group shadow-2xs"
              title="جستجو در آثار طلا و جواهر (⌘K)"
              aria-label="جستجوی محصول"
            >
              <Search className="w-3.5 h-3.5 text-[#B8860B] group-hover:scale-120 group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden xl:inline font-medium text-[11px]">جستجو در محصولات...</span>
              <kbd className="hidden 2xl:inline-block text-[9px] text-[#8C827A] bg-white border border-[#E8E4DA] px-1.5 py-0.5 rounded shadow-2xs font-mono">⌘K</kbd>
            </button>
          )}

          {/* User Auth / Profile */}
          {onOpenAuth && (
            isLoggedIn ? (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#FAF8F5] border border-[#D4AF37]/60 text-[#1C1917] hover:border-[#B8860B] transition-all text-xs font-bold shadow-2xs cursor-pointer"
                title="مشاهده حساب کاربری و کیف پول"
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <User className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{userPhone ? `حساب من (${userPhone.slice(-4)})` : 'حساب کاربری'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1C1917] text-white hover:bg-[#B8860B] transition-all text-xs font-bold shadow-xs cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>ورود / ثبت‌نام</span>
              </button>
            )
          )}

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 sm:p-2.5 rounded-full text-[#44403C] hover:text-[#A16207] hover:bg-[#F5F3EF] transition-colors cursor-pointer"
            title="لیست علاقه‌مندی‌ها"
            aria-label="علاقه‌مندی‌ها"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B8860B] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-full border border-[#D4AF37]/40 bg-[#FAF8F5] text-[#1C1917] hover:border-[#B8860B] hover:bg-[#F2EFE9] transition-all group cursor-pointer shadow-2xs"
            title="سبد خرید"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="w-5 h-5 text-[#B8860B] group-hover:scale-105 transition-transform" />
            <span className="hidden sm:inline text-xs font-medium">سبد خرید</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B8860B] text-white text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (100% Height, 70% Width + 30% Dark Blurred Backdrop, Portal to body to be on top of everything) */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden fixed inset-0 z-[99999] overflow-hidden">
          {/* Backdrop covering the other 30% of the screen with dark 50% opacity and blur effect */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="بستن منو"
          />

          {/* Sidebar Drawer: 100% device height and 70% width on the right */}
          <div
            className="fixed top-0 bottom-0 right-0 w-[70%] h-[100dvh] h-screen bg-white border-l border-[#E8E4DA] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E8E4DA] bg-[#F7F5EE] shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-bold font-serif-luxury text-[#1C1917] truncate">
                  گـالری طلای زریـن
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0"></span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-[#1C1917] hover:bg-[#EAE6DF] transition-colors cursor-pointer shrink-0"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categorized Nav Accordions for Mobile */}
            <div className="p-4 space-y-3 flex-1">
              {/* Search Input in Mobile Drawer */}
              <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full mb-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8860B]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در نام طلا، سکه یا کد اثر..."
                  className="w-full pr-9 pl-14 py-2 rounded-xl border border-[#E8E4DA] bg-[#FAF8F5] text-xs text-[#1C1917] focus:outline-none focus:border-[#B8860B]"
                />
                <button
                  type="submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#1C1917] text-white text-[10px] font-semibold rounded-lg"
                >
                  یافتن
                </button>
              </form>

              {/* User Account Button at Top */}
              {onOpenAuth && (
                <button
                  onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                  className="w-full text-right py-2.5 px-3.5 rounded-xl bg-[#1C1917] text-[#D4AF37] font-bold flex items-center justify-between cursor-pointer shadow-xs mb-1"
                >
                  <span className="flex items-center gap-2 min-w-0 truncate">
                    {isLoggedIn && <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0"></span>}
                    <User className="w-4 h-4 shrink-0" />
                    <span className="text-xs truncate">
                      {isLoggedIn ? (userPhone ? `حساب من (${userPhone})` : 'حساب کاربری و کیف پول') : 'ورود / ثبت‌نام در زرین'}
                    </span>
                  </span>
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0 mr-1" />
                </button>
              )}

              {/* Accordion 1: دسته‌بندی‌های محصولات */}
              <div className="border border-[#E8E4DA] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'products' ? null : 'products')}
                  className="w-full p-2.5 flex items-center justify-between font-bold text-xs text-[#1C1917] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Layers className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                    <span className="truncate">محصولات و ویترین</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${mobileAccordion === 'products' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'}`} />
                </button>

                {mobileAccordion === 'products' && (
                  <div className="px-2.5 pb-2.5 pt-1 border-t border-[#E8E4DA] bg-white space-y-1">
                    <button
                      onClick={() => { setMobileMenuOpen(false); handleNavigate('shop'); }}
                      className="w-full text-right py-1.5 px-2 rounded-md text-[11px] font-bold text-[#925B03] bg-[#FAF8F5] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">همه محصولات</span>
                      <ArrowLeft className="w-3 h-3 shrink-0" />
                    </button>
                    {NAV_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="truncate">{cat.name}</span>
                        <span className="text-[9px] text-[#925B03] bg-[#F7F5EE] px-1.5 py-0.5 rounded-full shrink-0 mr-1">
                          {cat.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 2: قیمت و تحلیل بازار */}
              <div className="border border-[#E8E4DA] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'market' ? null : 'market')}
                  className="w-full p-2.5 flex items-center justify-between font-bold text-xs text-[#1C1917] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <TrendingUp className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                    <span className="truncate">قیمت و بازار</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${mobileAccordion === 'market' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'}`} />
                </button>

                {mobileAccordion === 'market' && (
                  <div className="px-2.5 pb-2.5 pt-1.5 border-t border-[#E8E4DA] bg-white space-y-1.5">
                    <div className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E4DA] space-y-1 text-[10px]">
                      <div className="flex justify-between font-medium">
                        <span>۱۸ عیار:</span>
                        <span className="font-bold text-[#A16207]">{formatPrice(activeRates.rate18K)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>۲۴ عیار:</span>
                        <span className="font-bold text-[#1C1917]">{formatPrice(activeRates.rate24K)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => scrollToSection('price-chart-section')}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">نمودار زنده قیمت طلا</span>
                      <TrendingUp className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                    <button
                      onClick={() => handleOpenInfo('pricing')}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">فرمول شفاف محاسبه طلا</span>
                      <Sparkles className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                  </div>
                )}
              </div>

              {/* Accordion 3: خدمات و راهنما */}
              <div className="border border-[#E8E4DA] rounded-xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                  className="w-full p-2.5 flex items-center justify-between font-bold text-xs text-[#1C1917] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Compass className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                    <span className="truncate">خدمات و راهنما</span>
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${mobileAccordion === 'services' ? 'rotate-180 text-[#B8860B]' : 'text-[#78716C]'}`} />
                </button>

                {mobileAccordion === 'services' && (
                  <div className="px-2.5 pb-2.5 pt-1 border-t border-[#E8E4DA] bg-white space-y-1">
                    <button
                      onClick={() => scrollToSection('buying-steps-section')}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">مراحل خرید طلا</span>
                      <Compass className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                    <button
                      onClick={() => { setMobileMenuOpen(false); handleOpenTracking(); }}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">پیگیری سفارشات</span>
                      <FileText className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                    <button
                      onClick={() => scrollToSection('faq-section')}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">سوالات متداول (FAQ)</span>
                      <HelpCircle className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                    <button
                      onClick={() => handleOpenInfo('terms')}
                      className="w-full text-right py-1.5 px-2 rounded-md hover:bg-[#FAF8F5] text-[11px] text-[#44403C] flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">ضمانت اصالت و عیار</span>
                      <ShieldCheck className="w-3 h-3 text-[#B8860B] shrink-0" />
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Link: مجله و آموزش */}
              <button
                onClick={() => scrollToSection('blog-section')}
                className="w-full text-right p-3 rounded-xl border border-[#E8E4DA] bg-[#FAF8F5] font-bold text-xs text-[#1C1917] flex items-center justify-between cursor-pointer hover:bg-white transition-all"
              >
                <span className="flex items-center gap-2 truncate">
                  <BookOpen className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <span className="truncate">مجله و آموزش سرمایه‌گذاری طلا</span>
                </span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
              </button>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="p-4 border-t border-[#E8E4DA] bg-[#FAF8F5] space-y-2.5 shrink-0">
              {isLoggedIn && onOpenAdmin && (
                <button
                  onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl border border-[#D4AF37]/50 bg-white text-[#925B03] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#B8860B] hover:text-white transition-all cursor-pointer shadow-xs truncate"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">ورود به پنل مدیریت طلا</span>
                </button>
              )}
              <a
                href="tel:02122558890"
                className="w-full py-2.5 rounded-xl bg-white border border-[#E8E4DA] text-[#1C1917] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#EAE6DF] transition-all cursor-pointer truncate"
              >
                <Phone className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                <span className="truncate">تماس با بوتیک: ۰۲۱-۲۲۵۵۸۸۹۰</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
