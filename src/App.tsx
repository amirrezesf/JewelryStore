import React, { useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_GOLD_RATES, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS 
} from './data/mockData';
import { CartItem, GoldRates, Order, Product, Review } from './types';

// Components
import { GoldRateTicker } from './components/GoldRateTicker';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GoldPriceChart } from './components/GoldPriceChart';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { BuyingStepsSection } from './components/BuyingStepsSection';
import { MobileAppBanner } from './components/MobileAppBanner';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { EditorialCollection } from './components/EditorialCollection';
import { TrustFeatures } from './components/TrustFeatures';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ShopCatalog } from './components/ShopCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AdminPanel } from './components/AdminPanel';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { StaticPagesModal } from './components/StaticPagesModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AuthModal } from './components/AuthModal';

export default function App() {
  // Application Data States (persisted in localStorage with validation & fallbacks)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zarrin_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [goldRates, setGoldRates] = useState<GoldRates>(() => {
    try {
      const saved = localStorage.getItem('zarrin_rates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && typeof parsed.rate18K === 'number' && parsed.rate18K > 0) {
          return { ...INITIAL_GOLD_RATES, ...parsed };
        }
      }
    } catch (e) {
      console.error('Error loading gold rates from localStorage:', e);
    }
    return INITIAL_GOLD_RATES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zarrin_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading orders from localStorage:', e);
    }
    return INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('zarrin_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading reviews from localStorage:', e);
    }
    return INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zarrin_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
    return [];
  });

  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('zarrin_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch (e) {
      console.error('Error loading wishlist from localStorage:', e);
    }
    return new Set<string>();
  });

  // Navigation & View State
  const [currentView, setCurrentView] = useState<'home' | 'shop'>('home');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<Product['category'] | 'all'>('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeStaticPage, setActiveStaticPage] = useState<'pricing' | 'about' | 'contact' | 'faq' | 'terms' | null>(null);

  // User Authentication & Session (Admin panel is accessible after login)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zarrin_is_logged_in') === 'true';
    } catch {
      return false;
    }
  });
  const [userPhone, setUserPhone] = useState<string>(() => {
    try {
      return localStorage.getItem('zarrin_user_phone') || '';
    } catch {
      return '';
    }
  });

  const handleLoginSuccess = (phone: string) => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    try {
      localStorage.setItem('zarrin_is_logged_in', 'true');
      localStorage.setItem('zarrin_user_phone', phone);
    } catch (e) {
      console.warn('Storage write error', e);
    }
    triggerToast('ورود با موفقیت انجام شد. دسترسی به پنل مدیریت طلا فعال گردید.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone('');
    try {
      localStorage.removeItem('zarrin_is_logged_in');
      localStorage.removeItem('zarrin_user_phone');
    } catch (e) {
      console.warn('Storage remove error', e);
    }
    triggerToast('از حساب کاربری خارج شدید.');
  };

  // Selected entities for modals
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setGlobalSearchQuery(query);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('zarrin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zarrin_rates', JSON.stringify(goldRates));
  }, [goldRates]);

  useEffect(() => {
    localStorage.setItem('zarrin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zarrin_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zarrin_wishlist', JSON.stringify(Array.from(wishlistIds)));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('zarrin_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Review submission
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'امروز',
    };
    setReviews((prev) => [review, ...prev]);
    triggerToast('دیدگاه ارزشمند شما با موفقیت ثبت شد.');
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        triggerToast(`اثر «${product.name}» از لیست علاقه‌مندی‌ها حذف شد.`);
      } else {
        next.add(product.id);
        triggerToast(`اثر «${product.name}» به علاقه‌مندی‌ها افزوده شد.`);
      }
      return next;
    });
  };

  // Cart handlers
  const handleAddToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedSize: selectedSize || item.selectedSize }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize }];
    });
    triggerToast(`«${product.name}» به سبد خرید افزوده شد.`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Quick checkout direct from product detail
  const handleQuickCheckout = (product: Product, quantity = 1) => {
    setCart([{ product, quantity }]);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  // Order submission
  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setSelectedOrderForInvoice(order);
    triggerToast(`سفارش شماره ${order.orderNumber} با موفقیت ثبت و فاکتور رسمی صادر شد.`);
  };

  // Category navigation from anywhere
  const handleSelectCategory = (categoryId: Product['category']) => {
    setSelectedCatalogCategory(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToShop = () => {
    setSelectedCatalogCategory('all');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin resets
  const handleResetDemoData = () => {
    if (window.confirm('آیا مایل به بازنشانی داده‌های اولیه فروشگاه، نرخ‌ها و محصولات هستید؟')) {
      setProducts(INITIAL_PRODUCTS);
      setGoldRates(INITIAL_GOLD_RATES);
      setOrders(INITIAL_ORDERS);
      setReviews(INITIAL_REVIEWS);
      setCart([]);
      setWishlistIds(new Set());
      localStorage.clear();
      triggerToast('اطلاعات با موفقیت به حالت اولیه بازنشانی شد.');
    }
  };

  // Compute products in wishlist
  const wishlistProducts = products.filter((p) => wishlistIds.has(p.id));

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C1917] font-['Vazirmatn',sans-serif] selection:bg-[#E8D49E] selection:text-[#1C1917] flex flex-col relative antialiased">
      {/* 1. Live Gold Rate Top Ticker Bar */}
      <GoldRateTicker
        goldRates={goldRates}
        rates={goldRates}
        onOpenRatesModal={() => setActiveStaticPage('pricing')}
        onOpenPricingModal={() => setActiveStaticPage('pricing')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isLoggedIn={isLoggedIn}
      />

      {/* 2. Main Luxury Sticky Header */}
      <Header
        goldRates={goldRates}
        rates={goldRates}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.size}
        currentView={currentView}
        currentPage={currentView}
        onNavigateHome={handleNavigateToHome}
        onNavigateShop={handleNavigateToShop}
        onNavigate={(page) => {
          if (page === 'shop' || page === 'collections') handleNavigateToShop();
          else handleNavigateToHome();
        }}
        onSelectCategory={handleSelectCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={isLoggedIn}
        userPhone={userPhone}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenTracking={() => setIsOrderTrackingOpen(true)}
        onOpenPricingInfo={() => setActiveStaticPage('pricing')}
        onOpenAbout={() => setActiveStaticPage('about')}
        onOpenContact={() => setActiveStaticPage('contact')}
        onOpenInfoModal={(type) => setActiveStaticPage(type)}
        onOpenSearch={handleNavigateToShop}
        onSearch={handleSearch}
      />

      {/* 3. Main Views */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero Section with Live Calculator & Trade Quote */}
            <Hero
              goldRates={goldRates}
              rates={goldRates}
              onExploreShop={handleNavigateToShop}
              onExploreProducts={handleNavigateToShop}
              onExploreCollection={handleNavigateToShop}
              onConsultation={() => setActiveStaticPage('contact')}
              onOpenPricingModal={() => setActiveStaticPage('pricing')}
            />

            {/* 2. Interactive Gold Price Chart */}
            <GoldPriceChart
              goldRates={goldRates}
              onTradeNow={handleNavigateToShop}
            />

            {/* 3. Visual Categories Grid (Jourabian categorization & 0% fee badges) */}
            <CategoriesSection
              onSelectCategory={handleSelectCategory}
              onExploreAll={handleNavigateToShop}
            />

            {/* 4. Products Showcase with Interactive Category Tabs */}
            <FeaturedProducts
              products={products}
              goldRates={goldRates}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => setSelectedProductForDetail(p)}
              onAddToCart={handleAddToCart}
              onExploreAll={handleNavigateToShop}
              onViewAll={handleNavigateToShop}
              onSelectCategory={handleSelectCategory}
            />

            {/* 5. Why Choose Us (0% fee, fast settlement, secure vault) */}
            <WhyChooseUsSection
              onStartTrading={() => setIsAuthOpen(true)}
            />

            {/* 6. Step-by-Step Buying Roadmap */}
            <BuyingStepsSection
              onStartStep1={() => setIsAuthOpen(true)}
            />

            {/* 7. Mobile App & PWA Banner */}
            <MobileAppBanner />

            {/* 8. Educational Blog & Gold Analysis Articles */}
            <BlogSection />

            {/* 9. FAQ Accordion Section */}
            <FaqSection />

            {/* 10. Editorial Showcase / VIP Collection */}
            <EditorialCollection
              goldRates={goldRates}
              onExploreCollection={handleNavigateToShop}
              onExplore={handleNavigateToShop}
              onBookAppointment={() => setActiveStaticPage('contact')}
            />

            {/* 11. Trust & Heritage Badges */}
            <TrustFeatures />

            {/* 12. Customer Reviews & Testimonials */}
            <CustomerReviews
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          </>
        ) : (
          /* Shop Catalog View */
          <ShopCatalog
            products={products}
            goldRates={goldRates}
            wishlistIds={wishlistIds}
            initialCategory={selectedCatalogCategory}
            initialSearchQuery={globalSearchQuery}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={(p) => setSelectedProductForDetail(p)}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* 4. Luxury Footer */}
      <Footer
        onNavigate={(page) => {
          if (page === 'shop' || page === 'collections') handleNavigateToShop();
          else handleNavigateToHome();
        }}
        onSelectCategory={handleSelectCategory}
        onNavigateCategory={handleSelectCategory}
        onOpenInfoModal={(type) => setActiveStaticPage(type)}
        onOpenPricing={() => setActiveStaticPage('pricing')}
        onOpenAbout={() => setActiveStaticPage('about')}
        onOpenContact={() => setActiveStaticPage('contact')}
        onOpenFaq={() => setActiveStaticPage('faq')}
        onOpenTerms={() => setActiveStaticPage('terms')}
        onOpenTracking={() => setIsOrderTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 5. Drawers & Modals */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        goldRates={goldRates}
        isWishlisted={selectedProductForDetail ? wishlistIds.has(selectedProductForDetail.id) : false}
        onClose={() => setSelectedProductForDetail(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickCheckout={handleQuickCheckout}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        goldRates={goldRates}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreProducts={() => {
          setIsCartOpen(false);
          handleNavigateToShop();
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        goldRates={goldRates}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProductForDetail(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        goldRates={goldRates}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Official Invoice Modal */}
      <InvoiceModal
        order={selectedOrderForInvoice}
        onClose={() => setSelectedOrderForInvoice(null)}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        goldRates={goldRates}
        onUpdateGoldRates={(newRates) => {
          setGoldRates(newRates);
          triggerToast('نرخ روز طلا با موفقیت در سیستم بروزرسانی شد.');
        }}
        products={products}
        onAddProduct={(p) => {
          setProducts((prev) => [p, ...prev]);
          triggerToast(`اثر «${p.name}» با موفقیت افزوده شد.`);
        }}
        onUpdateProduct={(p) => {
          setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
          triggerToast(`اطلاعات اثر «${p.name}» بروزرسانی شد.`);
        }}
        onDeleteProduct={(id) => {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          triggerToast('اثر از ویترین حذف شد.');
        }}
        orders={orders}
        onUpdateOrderStatus={(orderId, status) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o))
          );
          triggerToast('وضعیت سفارش تغییر یافت.');
        }}
        onViewInvoice={(order) => {
          setSelectedOrderForInvoice(order);
        }}
        reviews={reviews}
        onDeleteReview={(revId) => {
          setReviews((prev) => prev.filter((r) => r.id !== revId));
          triggerToast('دیدگاه حذف شد.');
        }}
        onResetDemoData={handleResetDemoData}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        orders={orders}
        onViewInvoice={(order) => {
          setIsOrderTrackingOpen(false);
          setSelectedOrderForInvoice(order);
        }}
      />

      {/* Static Information Modals */}
      <StaticPagesModal
        type={activeStaticPage}
        onClose={() => setActiveStaticPage(null)}
        goldRates={goldRates}
      />

      {/* Auth & Wallet Modal (Admin panel is accessed from here after login) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        goldRate={goldRates.rate18K}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating VIP WhatsApp Concierge */}
      <FloatingWhatsApp />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] px-5 py-3 rounded-2xl bg-white border border-[#D4AF37]/50 text-xs font-semibold text-[#1C1917] shadow-xl flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
