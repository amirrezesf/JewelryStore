export type Karat = 18 | 24;

export interface PriceBreakdown {
  rawGoldPrice: number;
  craftFee: number;
  profit: number;
  tax: number;
  total: number;
  pricePerGramToday: number;
}

export type ProductCategory = 'no_fee' | 'coins' | 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'sets' | 'gifts' | 'other';

export interface Product {
  id: string;
  code: string; // e.g. "ZR-4082"
  name: string;
  category: ProductCategory;
  karat: Karat;
  weightInGrams: number;
  craftFeePercent: number; // e.g. 14 (%)
  fixedCraftFee?: number; // optional fixed fee in Tomans
  description: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isNoCraftFee?: boolean;
  collectionName?: string;
  specs?: {
    metalColor: string; // طلای زرد، طلای سفید، رزگلد
    stones?: string; // برلیان پاک، زمرد کلمبیا، بدون نگین
    stoneWeight?: string;
    lockType?: string; // قفل کتابی، طوطی، فشاری
    purityMark: string; // ۷۵۰ حک شده
    warranty: string; // گارانتی مادام‌العمر اصالت
    size?: string; // سایز انگشتر یا طول زنجیر
  };
}

export interface GoldRates {
  rate18K: number; // Toman per gram, e.g. 4850000
  rate24K: number; // Toman per gram, e.g. 6466000
  profitPercent: number; // standard 7%
  taxPercent: number; // standard 9% on (craft + profit)
  lastUpdated: string;
  isAutoUpdated?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  image: string;
  description: string;
  badge?: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  engravingText?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  code: string;
  weight: number;
  karat: Karat;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  phone: string;
  nationalCode: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  shippingMethod: 'secure_courier' | 'insured_post' | 'boutique_pickup';
  paymentMethod: 'online' | 'bank_transfer' | 'in_person';
  items: OrderItem[];
  totalWeight: number;
  rawGoldTotal: number;
  craftTotal: number;
  taxTotal: number;
  shippingCost: number;
  grandTotal: number;
  status: OrderStatus;
  officialInvoiceNumber: string;
  trackingCode: string;
  notes?: string;
}

export interface Review {
  id: string;
  authorName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verifiedPurchase: boolean;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  readTime: string;
  publishDate: string;
  category: string;
  image: string;
  author: string;
}

export interface TradeQuote {
  type: 'buy' | 'sell';
  amountTomans: number;
  weightGrams: number;
  ratePerGram: number;
  feePercent: number;
  totalPayable: number;
}

export interface FilterState {
  category: string;
  karat: string; // 'all' | '18' | '24'
  weightRange: string; // 'all' | 'under_2' | '2_to_5' | '5_to_10' | 'above_10'
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'newest' | 'popular' | 'price_asc' | 'price_desc' | 'weight_desc';
}
