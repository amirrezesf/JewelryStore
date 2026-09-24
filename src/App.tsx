import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_GOLD_RATES, 
  INITIAL_ORDERS, 
  INITIAL_REVIEWS 
} from './data/mockData';
import { CartItem, GoldRates, Order, Product, ProductCategory, Review } from './types';

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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Application Data States (persisted in localStorage with validation & fallbacks)
  const [products, setProducts] = useState<Product[]>(() => {
    // try {
    //   const saved = localStorage.getItem('zarrin_products');
    //   if (saved) {
    //     const parsed = JSON.parse(saved);
    //     if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    //   }
    // } catch (e) {
    //   console.error('Error loading products from localStorage:', e);
    // }
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

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

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

  // Derived current view from react-router pathname
  const currentView: 'home' | 'shop' = location.pathname.startsWith('/shop') ? 'shop' : 'home';

  // Category & search extracted from URL query params
  const selectedCatalogCategory = (searchParams.get('category') as Product['category']) || 'all';
  const globalSearchQuery = searchParams.get('q') || '';

  // Modal states derived from URL search parameters so mobile back button closes modals!
  const isCartOpen = searchParams.get('modal') === 'cart';
  const isWishlistOpen = searchParams.get('modal') === 'wishlist';
  const isCheckoutOpen = searchParams.get('modal') === 'checkout';
  const isAdminOpen = searchParams.get('modal') === 'admin';
  const isOrderTrackingOpen = searchParams.get('modal') === 'tracking';
  const isAuthOpen = searchParams.get('modal') === 'auth';
  const activeStaticPage = (searchParams.get('page') as 'pricing' | 'about' | 'contact' | 'faq' | 'terms') || null;

  // Product detail modal synchronized with ?product=ID URL param
  const productIdInUrl = searchParams.get('product');
  useEffect(() => {
    if (productIdInUrl) {
      const p = products.find((item) => item.id === productIdInUrl);
      if (p) {
        setSelectedProductForDetail(p);
      }
    } else {
      setSelectedProductForDetail(null);
    }
  }, [productIdInUrl, products]);

  // Invoice modal synchronized with ?invoice=orderNumber
  const invoiceOrderNumber = searchParams.get('invoice');
  useEffect(() => {
    if (invoiceOrderNumber) {
      const order = orders.find((o) => o.orderNumber === invoiceOrderNumber || o.id === invoiceOrderNumber);
      if (order) {
        setSelectedOrderForInvoice(order);
      }
    } else {
      setSelectedOrderForInvoice(null);
    }
  }, [invoiceOrderNumber, orders]);

  // Navigation helpers that push new history entries so back button works seamlessly
  const openModal = useCallback((modalName: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('modal', modalName);
      return next;
    });
  }, [setSearchParams]);

  const closeModal = useCallback((modalName?: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (modalName) {
        if (next.get('modal') === modalName) {
          next.delete('modal');
        }
      } else {
        next.delete('modal');
      }
      return next;
    });
  }, [setSearchParams]);

  const openStaticPage = useCallback((pageType: 'pricing' | 'about' | 'contact' | 'faq' | 'terms') => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', pageType);
      return next;
    });
  }, [setSearchParams]);

  const closeStaticPage = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('page');
      return next;
    });
  }, [setSearchParams]);

  const openProductDetail = useCallback((product: Product) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('product', product.id);
      return next;
    });
  }, [setSearchParams]);

  const closeProductDetail = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('product');
      return next;
    });
  }, [setSearchParams]);

  const openInvoiceModal = useCallback((order: Order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('invoice', order.orderNumber);
      return next;
    });
  }, [setSearchParams]);

  const closeInvoiceModal = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('invoice');
      return next;
    });
  }, [setSearchParams]);

  // Shop & Category Navigation
  const handleNavigateToHome = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleNavigateToShop = useCallback(() => {
    navigate('/shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleSelectCategory = useCallback((categoryId: Product['category'] | 'all') => {
    if (categoryId === 'all') {
      navigate('/shop');
    } else {
      navigate(`/shop?category=${categoryId}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

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
    closeProductDetail();
    openModal('checkout');
  };

  // Order submission
  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    closeModal('checkout');
    openInvoiceModal(order);
    triggerToast(`سفارش شماره ${order.orderNumber} با موفقیت ثبت و فاکتور رسمی صادر شد.`);
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
  const wishlistProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.has(p.id));
  }, [products, wishlistIds]);

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1C1917] font-['Vazirmatn',sans-serif] selection:bg-[#E8D49E] selection:text-[#1C1917] flex flex-col relative antialiased">
      {/* 1. Live Gold Rate Top Ticker Bar */}
      <GoldRateTicker
        goldRates={goldRates}
        rates={goldRates}
        onOpenRatesModal={() => openStaticPage('pricing')}
        onOpenPricingModal={() => openStaticPage('pricing')}
        onOpenAdmin={() => openModal('admin')}
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
        onOpenCart={() => openModal('cart')}
        onOpenWishlist={() => openModal('wishlist')}
        onOpenAdmin={() => openModal('admin')}
        onOpenAuth={() => openModal('auth')}
        isLoggedIn={isLoggedIn}
        userPhone={userPhone}
        onOpenOrderTracking={() => openModal('tracking')}
        onOpenTracking={() => openModal('tracking')}
        onOpenPricingInfo={() => openStaticPage('pricing')}
        onOpenAbout={() => openStaticPage('about')}
        onOpenContact={() => openStaticPage('contact')}
        onOpenInfoModal={(type) => openStaticPage(type)}
        onOpenSearch={handleNavigateToShop}
        onSearch={handleSearch}
      />

      {/* 3. Main Views (Home vs Shop Catalog) */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 1. Hero Section with Live Calculator & Trade Quote */}
            <Hero
              goldRates={goldRates}
              onExploreShop={handleNavigateToShop}
              onExploreProducts={handleNavigateToShop}
              onExploreCollection={handleNavigateToShop}
              onConsultation={() => openStaticPage('contact')}
              onOpenPricingModal={() => openStaticPage('pricing')}
            />

            {/* 2. Interactive Gold Price Chart */}
            <GoldPriceChart
              goldRates={goldRates}
              onTradeClick={handleNavigateToShop}
            />

            {/* 3. Visual Categories Grid (Jourabian categorization & 0% fee badges) */}
            <CategoriesSection
              onSelectCategory={handleSelectCategory}
            />

            {/* 4. Products Showcase with Interactive Category Tabs */}
            <FeaturedProducts
              products={products}
              goldRates={goldRates}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={(p) => openProductDetail(p)}
              onAddToCart={handleAddToCart}
              onExploreAll={handleNavigateToShop}
              onViewAll={handleNavigateToShop}
              onSelectCategory={handleSelectCategory}
            />

            {/* 5. Why Choose Us (0% fee, fast settlement, secure vault) */}
            <WhyChooseUsSection
              onStartTrading={() => openModal('auth')}
            />

            {/* 6. Step-by-Step Buying Roadmap */}
            <BuyingStepsSection
              onStartStep1={() => openModal('auth')}
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
              onBookAppointment={() => openStaticPage('contact')}
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
            onQuickView={(p) => openProductDetail(p)}
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
        onOpenInfoModal={(type) => openStaticPage(type)}
        onOpenPricing={() => openStaticPage('pricing')}
        onOpenAbout={() => openStaticPage('about')}
        onOpenContact={() => openStaticPage('contact')}
        onOpenFaq={() => openStaticPage('faq')}
        onOpenTerms={() => openStaticPage('terms')}
        onOpenTracking={() => openModal('tracking')}
        onOpenAdmin={() => openModal('admin')}
      />

      {/* 5. Drawers & Modals with History/Back-button integration */}
      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        goldRates={goldRates}
        isWishlisted={selectedProductForDetail ? wishlistIds.has(selectedProductForDetail.id) : false}
        onClose={closeProductDetail}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickCheckout={handleQuickCheckout}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => closeModal('cart')}
        items={cart}
        goldRates={goldRates}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          openModal('checkout');
        }}
        onExploreProducts={() => {
          closeModal('cart');
          handleNavigateToShop();
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => closeModal('wishlist')}
        wishlistProducts={wishlistProducts}
        goldRates={goldRates}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => openProductDetail(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => closeModal('checkout')}
        items={cart}
        goldRates={goldRates}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Official Invoice Modal */}
      <InvoiceModal
        order={selectedOrderForInvoice}
        onClose={closeInvoiceModal}
      />

      {/* Admin Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => closeModal('admin')}
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
          openInvoiceModal(order);
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
        onClose={() => closeModal('tracking')}
        orders={orders}
        onViewInvoice={(order) => {
          openInvoiceModal(order);
        }}
      />

      {/* Static Information Modals */}
      <StaticPagesModal
        type={activeStaticPage}
        onClose={closeStaticPage}
        goldRates={goldRates}
      />

      {/* Auth & Wallet Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => closeModal('auth')}
        goldRate={goldRates.rate18K}
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onOpenAdmin={() => openModal('admin')}
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
