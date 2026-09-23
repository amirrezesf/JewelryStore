<div dir="rtl" align="right">
<div align="center">
  <img src="banner.png" alt="Project Banner" width="100%">
</div>
<h1 align="center">💎 ZarinJewelry</h1>

<p align="center">
  فروشگاه اینترنتی جواهرات؛ ساخته‌شده با React، TypeScript و Vite
</p>

<p align="center">
  <a href="https://amirrezesf.github.io/JewelryStore">
    <img alt="مشاهده دمو" src="https://img.shields.io/badge/🚀_مشاهده_دمو_زنده-Live_Demo-D4AF37?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
</p>

---

## 📑 فهرست مطالب

- [معرفی پروژه](#-معرفی-پروژه)
- [ویژگی‌ها](#-ویژگی‌ها)
- [تکنولوژی‌های استفاده‌شده](#-تکنولوژی‌های-استفادهشده)
- [ساختار پروژه](#-ساختار-پروژه)
- [پیش‌نیازها](#-پیشنیازها)
- [نصب و راه‌اندازی](#-نصب-و-راهاندازی)
- [متغیرهای محیطی](#-متغیرهای-محیطی)
- [اسکریپت‌های موجود](#-اسکریپتهای-موجود)
- [مشارکت در پروژه](#-مشارکت-در-پروژه)
- [مجوز](#-مجوز)

---

## 🌟 معرفی پروژه

**JewelryStore** یک اپلیکیشن وب مدرن برای فروشگاه جواهرات است. رابط کاربری آن با **React 19** و **Tailwind CSS 4** ساخته شده و برای تجربه‌ای روان، سریع و زیبا از انیمیشن‌های کتابخانه **Motion** بهره می‌برد. این پروژه با **Vite** بیلد می‌شود.

🔗 **دمو زنده:** [amirrezesf.github.io/JewelryStore](https://amirrezesf.github.io/JewelryStore)

## ✨ ویژگی‌ها

- 🛍️ رابط کاربری فروشگاهی برای نمایش و مرور محصولات جواهرات
- 🎨 طراحی مدرن و ریسپانسیو با Tailwind CSS
- ✨ انیمیشن‌ها و انتقال‌های روان با Motion
- 🧩 آیکون‌های سبک و یکدست با Lucide React
- ⚡ محیط توسعه سریع با Vite و Hot Module Replacement
- 🔒 مدیریت امن کلیدها و تنظیمات از طریق متغیرهای محیطی
- 🟦 تایپ‌سیف کامل با TypeScript

## 🛠️ تکنولوژی‌های استفاده‌شده

| دسته | تکنولوژی |
| --- | --- |
| فرانت‌اند | React 19، TypeScript |
| ابزار بیلد | Vite 6، esbuild |
| استایل | Tailwind CSS 4 (`@tailwindcss/vite`)، Autoprefixer |
| انیمیشن | Motion |
| آیکون | Lucide React |
| سرور | Express، tsx |
| پیکربندی | dotenv |

## 📁 ساختار پروژه

```text
JewelryStore/
├── src/               # سورس‌کد اصلی اپلیکیشن
├── index.html         # نقطه ورود HTML
├── vite.config.ts     # تنظیمات Vite
├── tsconfig.json      # تنظیمات TypeScript
├── package.json       # وابستگی‌ها و اسکریپت‌ها
├── metadata.json      # متادیتای پروژه
├── .env.example       # نمونه فایل متغیرهای محیطی
└── .gitignore
```

## 📋 پیش‌نیازها

- [Node.js](https://nodejs.org/) نسخه ۱۸ یا بالاتر
- مدیر بسته `npm` (همراه با Node.js نصب می‌شود)

## 🚀 نصب و راه‌اندازی

**۱. کلون کردن مخزن**

```bash
git clone https://github.com/amirrezesf/JewelryStore.git
cd JewelryStore
```

**۲. نصب وابستگی‌ها**

```bash
npm install
```

**۳. تنظیم متغیرهای محیطی**

فایل نمونه را کپی کنید و مقادیر آن را تکمیل نمایید:

```bash
cp .env.example .env
```

**۴. اجرای پروژه در حالت توسعه**

```bash
npm run dev
```

اپلیکیشن روی آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

## 🔐 متغیرهای محیطی

| متغیر | توضیح | ضروری |
| --- | --- | :---: |
| `APP_URL` | آدرسی که اپلیکیشن روی آن میزبانی می‌شود (برای لینک‌های داخلی، callbackهای OAuth و endpointهای API) | ✅ |

مثال فایل `.env`:

```env
APP_URL="http://localhost:3000"
```

> ⚠️ **هشدار امنیتی:** فایل `.env` را هرگز در مخزن عمومی commit نکنید و اطلاعات حساس خود را با دیگران به اشتراک نگذارید.

## 📜 اسکریپت‌های موجود

| دستور | توضیح |
| --- | --- |
| `npm run dev` | اجرای سرور توسعه روی پورت `3000` |
| `npm run build` | ساخت نسخه‌ی بهینه برای production |
| `npm run preview` | پیش‌نمایش نسخه‌ی بیلد‌شده |
| `npm run lint` | بررسی نوع‌ها (Type Check) با TypeScript |
| `npm run clean` | پاک‌سازی خروجی‌های بیلد |

## 🤝 مشارکت در پروژه

از مشارکت شما استقبال می‌کنیم! برای همکاری:

1. مخزن را **Fork** کنید.
2. یک شاخه‌ی جدید بسازید: `git checkout -b feature/amazing-feature`
3. تغییرات خود را commit کنید: `git commit -m "Add amazing feature"`
4. شاخه را push کنید: `git push origin feature/amazing-feature`
5. یک **Pull Request** باز کنید.

همچنین می‌توانید باگ‌ها و پیشنهادهای خود را از بخش [Issues](https://github.com/amirrezesf/JewelryStore/issues) گزارش دهید.

## 📄 مجوز

این پروژه تحت مجوز [MIT](./LICENSE) منتشر شده است.

## 👤 سازنده

**امیررضا** — [@amirrezesf](https://github.com/amirrezesf)

---

<p align="center">اگر این پروژه برایتان مفید بود، با ⭐ دادن به آن حمایت کنید.</p>

</div>
