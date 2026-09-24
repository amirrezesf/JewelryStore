import { BlogArticle, CategoryInfo, FAQItem, GoldRates, Order, Product, Review } from '../types';

export const INITIAL_GOLD_RATES: GoldRates = {
  rate18K: 4850000, // 4,850,000 Tomans per gram of 18K
  rate24K: 6466000, // 6,466,000 Tomans per gram of 24K
  profitPercent: 7, // 7% legal union profit
  taxPercent: 9, // 9% VAT on (craft + profit)
  lastUpdated: 'امروز ساعت ۱۲:۳۰ (نرخ رسمی اتحادیه طلا و جواهر)',
  isAutoUpdated: true,
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'no_fee',
    name: 'طلای بدون اجرت و آبشده',
    slug: 'no-fee',
    image: '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg',
    description: 'طلای آبشده انگ‌دار با شناسنامه آزمایشگاه عیارسنجی ری‌گیری، بدون اجرت ساخت، ایده‌آل‌ترین روش سرمایه‌گذاری امن',
    badge: '۰٪ اجرت ساخت',
    itemCount: 14,
  },
  {
    id: 'coins',
    name: 'شمش و سکه بانکی',
    slug: 'coins',
    image: '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg',
    description: 'شمش‌های سرمایه‌گذاری ۲۴ عیار خالص ۹۹۹.۹ و سکه‌های رسمی بهار آزادی پلمپ با هولوگرام',
    badge: '۲۴ عیار استاندارد',
    itemCount: 18,
  },
  {
    id: 'rings',
    name: 'انگشتر و رینگ',
    slug: 'rings',
    image: '/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg',
    description: 'انگشترهای سولیتر الماس، نگین‌دار فاخر و رینگ‌های مدرن لاو',
    badge: 'سولیتر و برلیان',
    itemCount: 24,
  },
  {
    id: 'necklaces',
    name: 'گردنبند و آویز',
    slug: 'necklaces',
    image: '/ZarinJewelry/assets/images/1599643478518-a784e5dc4c8f.jpg',
    description: 'گردنبندهای تنیس تمام برلیان، چوکر و آویزهای دست‌ساز اسلیمی زرین',
    badge: 'تنیس و اسلیمی',
    itemCount: 16,
  },
  {
    id: 'bracelets',
    name: 'دستبند و النگو',
    slug: 'bracelets',
    image: '/ZarinJewelry/assets/images/1611591437281-460bfbe1220a.jpg',
    description: 'دستبندهای النگویی صلب، تنیس و زنجیرهای لوکس فیگارو ایتالیایی',
    badge: 'النگویی و تی‌لوکس',
    itemCount: 19,
  },
  {
    id: 'earrings',
    name: 'گوشواره و ایرکاف',
    slug: 'earrings',
    image: '/ZarinJewelry/assets/images/1630019852942-f89202989a59.jpg',
    description: 'گوشواره‌های میخی الماس، اشکی زمرد کلمبیا و آویزهای مجلسی',
    badge: 'میخی و اشکی',
    itemCount: 14,
  },
  {
    id: 'sets',
    name: 'سرویس و نیم‌ست',
    slug: 'sets',
    image: '/ZarinJewelry/assets/images/1515562141207-7a88fb7ce338.jpg',
    description: 'سرویس‌های شاهکار ملکه عروس و نیم‌ست‌های مدرن تشریفاتی',
    badge: 'کالکشن سلطنتی',
    itemCount: 8,
  },
  {
    id: 'gifts',
    name: 'طلای سبک و کادویی',
    slug: 'gifts',
    image: '/ZarinJewelry/assets/images/1598560917505-59a3ad559071.jpg',
    description: 'شمش‌های کادویی ۱ گرمی و پلاک‌های ظریف با بسته‌بندی نفیس هدیه',
    badge: 'اقتصادی و کادویی',
    itemCount: 21,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-nofee-1',
    code: 'ZR-MELT-10',
    name: 'طلای آبشده سرمایه‌گذاری ۱۰ گرمی انگ‌دار (بدون اجرت)',
    category: 'no_fee',
    karat: 18,
    weightInGrams: 10.0,
    craftFeePercent: 0,
    isNoCraftFee: true,
    description: 'قطعه طلای آبشده عیارسنجی شده با انگ رسمی آزمایشگاه معتبر، دارای کد رهگیری ری‌گیری کشوری، بدون کوچکترین اجرت ساخت یا مالیات ارزش افزوده بر اصل طلا.',
    images: [
      '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg',
      '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg'
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isNew: true,
    collectionName: 'طلای بدون اجرت سرمایه‌گذاری',
    specs: {
      metalColor: 'طلای آبشده استاندارد ۱۸ عیار',
      purityMark: 'عیار ۷۵۰ دقیق آزمایشگاه ری‌گیری (انگ رسمی)',
      warranty: 'تضمین نقدشوندگی آنی و بازخرید ۲۴ ساعته',
      size: 'قطعه کارگاهی استاندارد'
    }
  },
  {
    id: 'prod-nofee-2',
    code: 'ZR-MELT-50',
    name: 'شمش طلای آبشده ۵۰ گرمی آزمایشگاهی زرین (۰٪ اجرت)',
    category: 'no_fee',
    karat: 18,
    weightInGrams: 50.0,
    craftFeePercent: 0,
    isNoCraftFee: true,
    description: 'شمش طلای آبشده قالبی با شماره شناسایی یکتا و فاکتور چاپی رسمی اتحادیه. بدون ریالی کارمزد ساخت، ایده‌آل‌ترین گزینه برای پس‌انداز ریالی.',
    images: [
      '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg',
      '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg'
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isNew: false,
    collectionName: 'طلای بدون اجرت سرمایه‌گذاری',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار قالبی ۷۵۰',
      purityMark: 'شناسنامه آزمایشگاه ری‌گیری تهران',
      warranty: 'تضمین بازخرید به قیمت تابلوی روز بدون کسر',
      size: 'ابعاد قالب ۳۰ در ۱۵ میلی‌متر'
    }
  },
  {
    id: 'prod-gift-1',
    code: 'ZR-GIFT-01',
    name: 'شمش کادویی نفیس ۱ گرمی ۲۴ عیار خالص «زرین»',
    category: 'gifts',
    karat: 24,
    weightInGrams: 1.0,
    craftFeePercent: 5.0,
    description: 'شمش ۱ گرمی طلای ناب سوئیس با بسته‌بندی امنیتی هولوگرام‌دار زرین، گزینه‌ای بی‌نقص و ماندگار برای هدیه تولد، پیوند و اعیاد.',
    images: [
      '/ZarinJewelry/assets/images/1598560917505-59a3ad559071.jpg',
      '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg'
    ],
    inStock: true,
    stockCount: 25,
    isFeatured: true,
    isNew: true,
    collectionName: 'کالکشن کادویی و سرمایه‌گذاری سبک',
    specs: {
      metalColor: 'طلای خالص ۲۴ عیار ۹۹۹.۹',
      purityMark: 'Fine Gold 999.9 پلمپ ضدجعل',
      warranty: 'فاکتور رسمی و ضمانت بازخرید ۱۰۰٪',
      size: 'کارت هدیه بانکی استاندارد'
    }
  },
  {
    id: 'prod-1',
    code: 'ZR-1048',
    name: 'انگشتر سولیتر الماس برلیان «نوا»',
    category: 'rings',
    karat: 18,
    weightInGrams: 3.42,
    craftFeePercent: 12,
    description: 'انگشتر تک‌نگین با طراحی فاخر و تراش برلیان ممتاز. طلای سفید ۱۸ عیار مات و براق با نگین برلیان VVS1 اصل شناسنامه‌دار.',
    images: [
      '/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg',
      '/ZarinJewelry/assets/images/1603561591411-07134e71a2a9.jpg',
      '/ZarinJewelry/assets/images/1598560917505-59a3ad559071.jpg'
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: true,
    isNew: true,
    collectionName: 'کالکشن سلطنتی ماهور',
    specs: {
      metalColor: 'طلای سفید و زرد ۱۸ عیار',
      stones: 'تک نگین الماس طبیعی تراش برلیان ۰.۴۵ قیراط',
      stoneWeight: '۰.۴۵ قیراط',
      lockType: 'رکاب ارگونومیک Comfort-Fit',
      purityMark: 'AU 750 حک لیزری استاندارد',
      warranty: 'کارت گارانتی مادام‌العمر و تعویض سنگ',
      size: 'سایز ۵۲ تا ۵۶ (قابلیت تغییر سایز رایگان)'
    }
  },
  {
    id: 'prod-2',
    code: 'ZR-2091',
    name: 'گردنبند تنیس برلیان لوکس «آسترا»',
    category: 'necklaces',
    karat: 18,
    weightInGrams: 14.80,
    craftFeePercent: 16,
    description: 'گردنبند تنیس تمام برلیان با چیدمان یکدست و پیوستگی مخملی روی گردن. انتخابی بی‌همتا برای مجالس باشکوه و استایل جاودان.',
    images: [
      '/ZarinJewelry/assets/images/1599643478518-a784e5dc4c8f.jpg',
      '/ZarinJewelry/assets/images/1515562141207-7a88fb7ce338.jpg'
    ],
    inStock: true,
    stockCount: 2,
    isFeatured: true,
    isNew: true,
    collectionName: 'کالکشن سلطنتی ماهور',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار براق سوپرپولیش',
      stones: '۹۶ عدد الماس برلیان سفید تراش گرد با شناسنامه بین‌المللی',
      stoneWeight: '۳.۲۰ قیراط کل',
      lockType: 'قفل زبانه مخفی دوبل ایمنی',
      purityMark: '۷۵۰ حک استاندارد اتحادیه',
      warranty: 'ضمانت اصالت الماس و فاکتور اتحادیه',
      size: 'طول ۴۲ سانتی‌متر'
    }
  },
  {
    id: 'prod-3',
    code: 'ZR-3042',
    name: 'دستبند النگویی تی‌لوکس «فلورانس»',
    category: 'bracelets',
    karat: 18,
    weightInGrams: 8.95,
    craftFeePercent: 11,
    description: 'دستبند النگویی باز با طراحی هندسی مدرن، خطوط شارپ و صیقل آینه‌ای. مناسب برای استفاده روزمره پرستیژ و هماهنگی با ساعت.',
    images: [
      '/ZarinJewelry/assets/images/1611591437281-460bfbe1220a.jpg',
      '/ZarinJewelry/assets/images/1602751584552-8ba73aad10e1.jpg'
    ],
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isNew: false,
    collectionName: 'کالکشن مینیمال مدرن',
    specs: {
      metalColor: 'طلای رزگلد و زرد ۱۸ عیار',
      stones: 'نگین‌های باگت سوئیسی مخراجی شده',
      stoneWeight: '۰.۱۸ قیراط',
      lockType: 'لولا و ضامن مخفی مغناطیسی ایمن',
      purityMark: 'AU 750 ایتالیا',
      warranty: 'ضمانت مادام‌العمر قفل و اتصالات',
      size: 'سایز ۲ و ۳ زنانه'
    }
  },
  {
    id: 'prod-4',
    code: 'ZR-4015',
    name: 'گوشواره آویز اشکی زمرد کلمبیا «روژان»',
    category: 'earrings',
    karat: 18,
    weightInGrams: 6.20,
    craftFeePercent: 15,
    description: 'گوشواره‌های اشکی چشم‌نواز با زمرد کلمبیا طبیعی با رنگ سبز مخملی عمیق، در قاب خوش‌تراش طلای زرد و برلیان‌های خطی.',
    images: [
      '/ZarinJewelry/assets/images/1630019852942-f89202989a59.jpg',
      '/ZarinJewelry/assets/images/1535632066927-ab7c9ab60908.jpg'
    ],
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    isNew: true,
    collectionName: 'کالکشن الماس و زمرد',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار',
      stones: '۲ قطعه زمرد کلمبیا طبیعی بیضی + ۳۲ قطعه برلیان ریز',
      stoneWeight: '۱.۸۰ قیراط زمرد',
      lockType: 'قفل میخی با پشت‌گوشواره سلیکونی طلایی ضدحساسیت',
      purityMark: '۷۵۰ حک شده',
      warranty: 'شناسنامه گوهرشناسی معتبر',
      size: 'طول ۳.۵ سانتی‌متر'
    }
  },
  {
    id: 'prod-5',
    code: 'ZR-5010',
    name: 'شمش سرمایه‌گذاری ۱۰۰ گرمی زرین ۲۴ عیار',
    category: 'coins',
    karat: 24,
    weightInGrams: 100.0,
    craftFeePercent: 4.5,
    description: 'شمش طلای خالص ۹۹۹.۹ سوئیس استاندارد با پکینگ وکیوم ضدجعل هولوگرام‌دار، دارای کد رهگیری آنلاین و تاییدیه اتحادیه طلا و جواهر.',
    images: [
      '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg',
      '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg'
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isNew: false,
    collectionName: 'کالکشن سرمایه‌گذاری فاخر',
    specs: {
      metalColor: 'طلای ناب خالص ۲۴ عیار ۹۹۹.۹',
      stones: 'فاقد سنگ / طلای شمش خالص',
      lockType: 'وکیوم امنیتی با هولوگرام لیزری سه بعدی',
      purityMark: '999.9 Gold Fine Purity',
      warranty: 'تضمین بازخرید ۱۰۰٪ قطعی به نرخ روز',
      size: 'ابعاد ۵۰ در ۳۰ میلی‌متر'
    }
  },
  {
    id: 'prod-6',
    code: 'ZR-6003',
    name: 'سرویس کامل سلطنتی ملکه «نورجهان»',
    category: 'sets',
    karat: 18,
    weightInGrams: 38.60,
    craftFeePercent: 18,
    description: 'سرویس شاهکار دست‌ساز شامل گردنبند، دستبند، گوشواره و انگشتر ست با نگین‌های تراش مارکیز و باگت با درخششی استثنایی.',
    images: [
      '/ZarinJewelry/assets/images/1515562141207-7a88fb7ce338.jpg',
      '/ZarinJewelry/assets/images/1599643478518-a784e5dc4c8f.jpg'
    ],
    inStock: true,
    stockCount: 1,
    isFeatured: true,
    isNew: true,
    collectionName: 'کالکشن سلطنتی ماهور',
    specs: {
      metalColor: 'طلای سفید و لیمویی ۱۸ عیار',
      stones: 'ترکیب الماس برلیان، مارکیز و باگت دست‌چین',
      stoneWeight: '۶.۵۰ قیراط مجموع',
      lockType: 'قفل‌های ژاپنی تقویت شده مخفی',
      purityMark: 'کد استاندارد اتحادیه ۷۵۰',
      warranty: 'ارائه فاکتور رسمی معتبر و شناسنامه گوهرشناسی بین‌المللی',
      size: 'سرویس کامل ۴ تکه'
    }
  },
  {
    id: 'prod-7',
    code: 'ZR-1055',
    name: 'انگشتر پیچی مدرن «توئیست زرین»',
    category: 'rings',
    karat: 18,
    weightInGrams: 2.85,
    craftFeePercent: 9.5,
    description: 'طراحی مینیمال و ارگونومیک، با انحناهای نرم و الهام گرفته از حرکت امواج آب. سبک و بادوام برای استفاده مداوم و روزمره.',
    images: [
      '/ZarinJewelry/assets/images/1603561591411-07134e71a2a9.jpg',
      '/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg'
    ],
    inStock: true,
    stockCount: 7,
    isFeatured: false,
    isNew: false,
    collectionName: 'کالکشن مینیمال مدرن',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار صیقلی',
      stones: 'بدون نگین (طلای خالص فرم‌داده شده)',
      lockType: 'بدون قفل / رینگ یکپارچه',
      purityMark: 'AU 750',
      warranty: 'گارانتی سلامت فیزیکی و عیار',
      size: 'سایز ۵۰ تا ۵۸'
    }
  },
  {
    id: 'prod-8',
    code: 'ZR-3088',
    name: 'دستبند زنجیری فیگارو ایتالیایی «میلان»',
    category: 'bracelets',
    karat: 18,
    weightInGrams: 11.40,
    craftFeePercent: 10,
    description: 'بافت زنجیری فیگارو اصیل ایتالیایی با حلقه‌های تراش‌خورده الماسی که در هر زاویه‌ای نور را با درخشندگی بالا منعکس می‌کند.',
    images: [
      '/ZarinJewelry/assets/images/1602751584552-8ba73aad10e1.jpg',
      '/ZarinJewelry/assets/images/1611591437281-460bfbe1220a.jpg'
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: false,
    isNew: true,
    collectionName: 'کالکشن هخامنشی و اصیل',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار تراش الماس',
      stones: 'بدون نگین',
      lockType: 'قفل طوطی مستحکم ایتالیایی',
      purityMark: '۷۵۰ حک استاندارد',
      warranty: 'گارانتی دوام و تست عیار رایگان',
      size: 'طول ۱۹ سانتی‌متر'
    }
  },
  {
    id: 'prod-9',
    code: 'ZR-4033',
    name: 'گوشواره میخی تک‌نگین لوتوس «آناهیتا»',
    category: 'earrings',
    karat: 18,
    weightInGrams: 1.95,
    craftFeePercent: 13,
    description: 'طراحی مینیاتوری گل لوتوس هخامنشی با تک نگین الماس درخشان مرکزی. انتخابی بی‌نظیر برای هدایای یادبود و استایل دخترانه ظریف.',
    images: [
      '/ZarinJewelry/assets/images/1535632066927-ab7c9ab60908.jpg',
      '/ZarinJewelry/assets/images/1630019852942-f89202989a59.jpg'
    ],
    inStock: true,
    stockCount: 9,
    isFeatured: false,
    isNew: false,
    collectionName: 'کالکشن هخامنشی و اصیل',
    specs: {
      metalColor: 'طلای رزگلد و زرد ۱۸ عیار',
      stones: 'الماس برلیان طبیعی پاک',
      stoneWeight: '۰.۱۲ قیراط مجموع',
      lockType: 'پیچ میخی ضد گم‌شدن',
      purityMark: '۷۵۰ حک لیزر',
      warranty: 'ضمانت اصالت سنگ و طلا',
      size: 'قطر ۸ میلی‌متر'
    }
  },
  {
    id: 'prod-10',
    code: 'ZR-5022',
    name: 'سکه تمام بهار آزادی طرح جدید (امامی)',
    category: 'coins',
    karat: 24,
    weightInGrams: 8.133,
    craftFeePercent: 2.8,
    description: 'سکه رسمی ضرب بانک مرکزی جمهوری اسلامی ایران، وکیوم شده در قاب مخصوص هولوگرام‌دار زرین با تضمین اصالت فیزیکی و فاکتور چاپی.',
    images: [
      '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg',
      '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg'
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    isNew: false,
    collectionName: 'کالکشن سرمایه‌گذاری فاخر',
    specs: {
      metalColor: 'طلای ۲۱.۶ عیار (۹۰۰ در هزار استاندارد بانک مرکزی)',
      stones: 'فاقد نگین',
      lockType: 'پلمپ هولوگرام دار هوشمند ضد دستکاری',
      purityMark: 'سکه بهار آزادی بانک مرکزی',
      warranty: 'تضمین بازخرید به قیمت تابلوی روز',
      size: 'قطر ۲۲ میلی‌متر'
    }
  },
  {
    id: 'prod-11',
    code: 'ZR-2045',
    name: 'آویز طلای اسلیمی دست‌ساز «ترنج»',
    category: 'necklaces',
    karat: 18,
    weightInGrams: 5.10,
    craftFeePercent: 14,
    description: 'هنر دست زرگران زرین با الهام از طرح ترنج ایرانی، مشبک‌کاری ظریف با تراش‌های لیزری دقیق روی ورق طلای ضخیم و باکیفیت.',
    images: [
      '/ZarinJewelry/assets/images/1598560917505-59a3ad559071.jpg',
      '/ZarinJewelry/assets/images/1599643478518-a784e5dc4c8f.jpg'
    ],
    inStock: true,
    stockCount: 4,
    isFeatured: false,
    isNew: true,
    collectionName: 'کالکشن هخامنشی و اصیل',
    specs: {
      metalColor: 'طلای زرد ۱۸ عیار مات و براق (سندبلاست)',
      stones: 'تک نگین یاقوت سرخ طبیعی در مرکز',
      stoneWeight: '۰.۳۰ قیراط یاقوت',
      lockType: 'پاپیون آویز مناسب برای زنجیر تا قطر ۳ میلی‌متر',
      purityMark: '۷۵۰ دست‌ساز',
      warranty: 'کارت ضمانت اصالت جواهر و سنگ',
      size: 'ارتفاع ۳۰ میلی‌متر'
    }
  },
  {
    id: 'prod-12',
    code: 'ZR-1090',
    name: 'حلقه ازدواج کارتیه لاو «آمور»',
    category: 'rings',
    karat: 18,
    weightInGrams: 4.80,
    craftFeePercent: 11,
    description: 'طرح افسانه‌ای لاو با نمادهای حک شده دقیق پیچ، سمبل وفاداری ابدی. قابلیت حک اسم و تاریخ پیوند به خط نستعلیق داخل حلقه.',
    images: [
      '/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg',
      '/ZarinJewelry/assets/images/1603561591411-07134e71a2a9.jpg'
    ],
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isNew: false,
    collectionName: 'کالکشن مینیمال مدرن',
    specs: {
      metalColor: 'طلای زرد / رزگلد ۱۸ عیار',
      stones: 'قابلیت سفارش با تک نگین برلیان مخفی',
      lockType: 'رینگ مدور راحتی دست',
      purityMark: 'AU 750 استاندارد اروپایی',
      warranty: 'حکاکی رایگان و تغییر سایز بدون کسر وزن',
      size: 'سایز ۴۸ تا ۶۴ (زنانه و مردانه)'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'سارا معتمدی',
    city: 'تهران',
    rating: 5,
    date: '۲ روز پیش',
    comment: 'کیفیت ساخت انگشتر سولیتر نوا فراتر از انتظارم بود. بسته‌بندی مخمل سبز یشمی و فاکتور رسمی اتحادیه حس یک خرید واقعاً لوکس و امن را بهم داد.',
    productName: 'انگشتر سولیتر الماس برلیان نوا',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    authorName: 'دکتر علیرضا کاظمی',
    city: 'شیراز',
    rating: 5,
    date: 'هفته گذشته',
    comment: 'شفافیت در محاسبه قیمت خام، اجرت و مالیات ستودنی است. برخلاف اکثر طلافروشی‌ها که فرمول‌های مبهم دارند، زرین هر ریال را دقیق با فاکتور قانونی ارائه می‌دهد.',
    productName: 'شمش ۱۰۰ گرمی زرین ۲۴ عیار',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    authorName: 'مهتاب بهروزی',
    city: 'اصفهان',
    rating: 5,
    date: '۲ هفته پیش',
    comment: 'گردنبند تنیس آسترا روی گردن فوق‌العاده می‌درخشه. قفل دوبل ایمنی خیلی محکمه و برلیان‌ها شناسنامه معتبر داشتند. ارسال با پیک اختصاصی هم بسیار سریع و محترمانه بود.',
    productName: 'گردنبند تنیس برلیان آسترا',
    verifiedPurchase: true
  }
];

export const INITIAL_REVIEWS = REVIEWS;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-101',
    orderNumber: 'ZR-98421',
    date: '۱۴۰۳/۰۶/۲۱',
    customerName: 'فریبا افشارمنش',
    phone: '09124567890',
    nationalCode: '0019842135',
    province: 'تهران',
    city: 'تهران',
    address: 'زعفرانیه، خیابان اعجازی، پلاک ۱۲، واحد ۴',
    postalCode: '1988765432',
    shippingMethod: 'secure_courier',
    paymentMethod: 'online',
    items: [
      {
        productId: 'prod-1',
        productName: 'انگشتر سولیتر الماس برلیان «نوا»',
        code: 'ZR-1001',
        weight: 4.85,
        karat: 18,
        unitPrice: 28450000,
        quantity: 1,
        totalPrice: 28450000,
        image: '/ZarinJewelry/assets/images/1605100804763-247f67b3557e.jpg'
      }
    ],
    totalWeight: 4.85,
    rawGoldTotal: 23862000,
    craftTotal: 2624820,
    taxTotal: 405000,
    shippingCost: 0,
    grandTotal: 28450000,
    status: 'shipped',
    officialInvoiceNumber: 'INV-1403-4921',
    trackingCode: 'TRK-TEH-88210',
    notes: 'حکاکی حروف F&M داخل حلقه'
  }
];


export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'pricing',
    question: 'قیمت طلا در گالری چگونه محاسبه می‌شود و آیا با نرخ لحظه‌ای تغییر می‌کند؟',
    answer: 'قیمت کلیه محصولات به صورت لحظه‌ای و خودکار بر اساس مظنه رسمی اتحادیه طلا و جواهر محاسبه می‌گردد. در طلای آبشده و بدون اجرت، اجرت ساخت صفر درصد بوده و تنها ارزش طلای خام محاسبه می‌شود. در سایر مصنوعات، فرمول رسمی اتحادیه شامل ارزش طلای خام + اجرت ساخت + ۷٪ سود قانونی + ۹٪ ارزش افزوده (صرفاً روی اجرت و سود) اعمال می‌شود.'
  },
  {
    id: 'faq-2',
    category: 'authenticity',
    question: 'آیا فاکتور رسمی و گواهی اصالت همراه محصول ارسال می‌شود؟',
    answer: 'بله، صد درصد. تمامی سفارش‌ها به همراه فاکتور رسمی و هولوگرام‌دار صنف طلا و جواهر ممهور به مهر رسمی گالری زرین، با درج کد یکتای استاندارد، عیار دقیق (۱۸ یا ۲۴)، وزن با دقت سه‌رقم اعشار و شناسنامه سنگ‌های قیمتی ارسال می‌گردند که در تمام طلافروشی‌های کشور قابل استعلام و داد و ستد است.'
  },
  {
    id: 'faq-3',
    category: 'shipping',
    question: 'نحوه ارسال و بیمه مرسولات طلا چگونه است؟',
    answer: 'در شهر تهران، سفارش‌ها توسط پیک ویژه و امنیتی گالری زرین مستقیماً به دست خریدار تحویل داده می‌شود. برای سایر استان‌ها، مرسولات با پست ویژه و بیمه‌نامه ۱۰۰٪ ارزش ریالی کالا ارسال می‌شوند تا خریدار کوچک‌ترین نگرانی بابت امنیت محموله نداشته باشد.'
  },
  {
    id: 'faq-4',
    category: 'return',
    question: 'شرایط تعویض یا بازخرید طلا در گالری زرین چیست؟',
    answer: 'تمامی قطعات خریداری شده تا ۷ روز در صورت عدم استفاده و سلامت پلمپ قابل تعویض هستند. همچنین گالری زرین تعهد بازخرید مادام‌العمر تمامی محصولات و طلای آبشده را طبق نرخ روز تابلوی اتحادیه و با تسویه آنی تضمین می‌نماید.'
  },
  {
    id: 'faq-5',
    category: 'trade',
    question: 'حداقل میزان سرمایه‌گذاری در طلای بدون اجرت چقدر است؟',
    answer: 'در گالری زرین هیچ‌گونه محدودیتی وجود ندارد! شما می‌توانید حتی با مبالغ خرد (از ۵۰۰ هزار تومان به بالا) خرید طلای آبشده را آغاز کنید و در کیف پول طلایی خود ذخیره نمایید و هر زمان تمایل داشتید تحویل فیزیکی بگیرید.'
  },
  {
    id: 'faq-6',
    category: 'trade',
    question: 'تسویه ریالی پس از فروش طلا چقدر زمان می‌برد؟',
    answer: 'درخواست‌های فروش طلای موجود در کیف پول به صورت آنی پردازش شده و مبلغ ریالی در اولین سیکل پایا/ساتنا (معمولاً بین ۳۰ دقیقه تا حداکثر ۲ ساعت کاری) به حساب شبای ثبت شده شما واریز می‌گردد.'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'راهنمای جامع خرید طلای آبشده بدون اجرت؛ نکات کلیدی انگ و آزمایشگاه',
    slug: 'melted-gold-guide',
    summary: 'چرا سرمایه‌گذاران حرفه‌ای طلای آبشده را به سکه و مصنوعات ترجیح می‌دهند؟ بررسی کدهای ری‌گیری و استعلام عیار ۷۵۰.',
    readTime: '۵ دقیقه',
    publishDate: '۲۸ شهریور ۱۴۰۳',
    category: 'سرمایه‌گذاری طلا',
    image: '/ZarinJewelry/assets/images/1610375461246-83df859d849d.jpg',
    author: 'واحد تحلیل بازار زرین',
    content: [
      'طلای آبشده یکی از محبوب‌ترین ابزارهای حفظ ارزش دارایی در ایران است. برخلاف مصنوعات طلا که بین ۹ تا ۲۵ درصد اجرت ساخت دارند، طلای آبشده هیچ‌گونه اجرتی ندارد.',
      'هنگام خرید طلای آبشده، وجود کد انگ (شناسه آزمایشگاه عیارسنجی) الزامی است. این کد از طریق سامانه پیامکی اتحادیه قابل راستی‌آزمایی است.',
      'در گالری زرین، تمامی قطعات آبشده دارای فاکتور رسمی هولوگرام‌دار اتحادیه و تضمین بازخرید آنی به نرخ روز می‌باشند.'
    ]
  },
  {
    id: 'blog-2',
    title: 'تفاوت طلای ۱۸ عیار و ۲۴ عیار؛ کدام برای حفظ ارزش دارایی بهتر است؟',
    slug: '18k-vs-24k-gold',
    summary: 'مقایسه خلوص ۷۵۰ و ۹۹۹.۹، میزان شکل‌پذیری در ساخت جواهر و تفاوت نقدشوندگی در بازار طلای ایران.',
    readTime: '۴ دقیقه',
    publishDate: '۲۲ شهریور ۱۴۰۳',
    category: 'آموزش طلا',
    image: '/ZarinJewelry/assets/images/1589782182703-2aaa69037b5b.jpg',
    author: 'تیم کارشناسی گوهرشناسی',
    content: [
      'طلای ۲۴ عیار خالص‌ترین فرم طلا با خلوص ۹۹.۹٪ است که در قالب شمش‌های استاندارد ضرب می‌شود. به دلیل نرمی بالا برای استفاده روزمره جواهر مناسب نیست.',
      'طلای ۱۸ عیار با خلوص ۷۵٪ حاوی آلیاژهایی چون مس و نقره است که مقاومت فوق‌العاده‌ای به آن می‌بخشد و استاندارد قانونی طلاسازی در کشور ماست.',
      'برای سرمایه‌گذاری خالص، شمش‌های ۲۴ عیار و طلای آبشده ۱۸ عیار هر دو بالاترین راندمان حفظ ارزش را ایجاد می‌کنند.'
    ]
  },
  {
    id: 'blog-3',
    title: 'فرمول قانونی محاسبه قیمت طلا در فاکتور رسمی اتحادیه',
    slug: 'gold-price-calculation-law',
    summary: 'شفاف‌سازی قانون حذف مالیات از اصل طلا، نحوه محاسبه ۷ درصد سود و ۹ درصد مالیات بر ارزش افزوده اجرت.',
    readTime: '۶ دقیقه',
    publishDate: '۱۵ شهریور ۱۴۰۳',
    category: 'قوانین و فاکتور',
    image: '/ZarinJewelry/assets/images/1515562141207-7a88fb7ce338.jpg',
    author: 'مشاور حقوقی صنف طلا',
    content: [
      'طبق قانون جدید مالیات بر ارزش افزوده، اصل ارزش طلای خام به طور کامل از مالیات ۹٪ معاف است.',
      'فرمول رسمی شامل: (وزن × قیمت هر گرم طلا) + (اجرت ساخت) + (۷٪ سود مغازه) + (۹٪ مالیات فقط روی مجموع اجرت و سود).',
      'فاکتورهای چاپی گالری زرین تمامی این چهار ردیف را به صورت تفکیک‌شده و شفاف چاپ می‌کنند تا خریدار ریال به ریال پرداختی خود را مشاهده کند.'
    ]
  }
];

export const BUYING_STEPS = [
  {
    step: 1,
    title: 'ثبت‌نام و احراز هویت',
    description: 'ثبت نام و احراز هویت در گالری زرین ساده بوده و در چند ثانیه به صورت هوشمند انجام می‌شود. بدون نیاز به مراجعه حضوری یا ارائه مدارک کاغذی.',
    icon: 'UserCheck',
    badge: 'احراز هویت آنی'
  },
  {
    step: 2,
    title: 'شارژ کیف پول',
    description: 'با ثبت نام، کیف پول اختصاصی ریالی و طلایی شما فعال می‌شود. می‌توانید موجودی حساب را از درگاه بانکی شتاب شارژ فرمایید.',
    icon: 'Wallet',
    badge: 'درگاه امن شاپرک'
  },
  {
    step: 3,
    title: 'خرید طلا (سکه، شمش و آبشده)',
    description: 'می‌توانید انواع طلای آبشده، شمش‌های ۲۴ عیار یا جواهرات لوکس را با قیمت لحظه‌ای و بدون اجرت به هر میزان سفارش دهید.',
    icon: 'Coins',
    badge: 'نرخ زنده تابلوی اتحادیه'
  },
  {
    step: 4,
    title: 'تسویه ریالی یا تحویل طلای فیزیکی',
    description: 'هر زمان مایل بودید می‌توانید با یک کلیک طلا را بفروشید و وجه ریالی را تحویل بگیرید، یا درخواست تحویل فیزیکی با بیمه ۱۰۰٪ را ثبت کنید.',
    icon: 'Banknote',
    badge: 'تسویه پایا و تحویل بیمه‌شده'
  }
];
