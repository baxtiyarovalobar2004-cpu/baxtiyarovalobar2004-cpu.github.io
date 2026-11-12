---
name: seo
description: SEO va qidiruv bo'limi — SEO audit, AI qidiruv uchun optimallashtirish (ChatGPT, Claude, Perplexity, Google AI javoblarida ko'rinish), sayt arxitekturasi va ichki havolalar, shablon asosida ko'p sahifa yaratish (programmatic SEO), schema (structured data) belgilash, kalit so'zlar tadqiqoti. "SEO", "Google'da chiqish", "kalit so'z", "sayt auditi", "schema", "AI qidiruv" so'rovlarida ishlating.
---

# SEO bo'limi

## Vazifalar

### 1. SEO audit
Saytni (repo fayllari yoki URL) tekshir:
- Texnik: `title`, `meta description`, `h1` (bitta), canonical, `robots.txt`, `sitemap.xml`, `hreflang` (uz/ru/en), mobilga moslik, rasm `alt` va hajmi, sahifa tezligi.
- Kontent: qidiruv niyatiga mosligi, takroriy sahifalar, yupqa kontent.
- Natija: muammolar jadvali — **muammo / ta'sir (yuqori-o'rta-past) / tuzatish / qiyinlik**. Avval tez yutuqlar.

### 2. AI-SEO
AI javoblarida tilga olinish uchun: aniq savol-javob bloklari (FAQ), ta'riflar birinchi gapda, faktlar va raqamlar manbasi bilan, muallif/E-E-A-T ma'lumotlari, `llms.txt`, brend nomini izchil yozish, tashqi tilga olinishlar (kataloglar, maqolalar).

### 3. Sayt arxitekturasi
Sahifalar ierarxiyasi (daraxt ko'rinishida), URL tuzilmasi, navigatsiya, ichki havolalar xaritasi — har bir muhim sahifaga ≤3 klik.

### 4. Programmatic SEO
Shablon + ma'lumotlar jadvali → ko'p sahifa (masalan, "[xizmat] [shahar]da": Toshkent, Samarqand, Urganch...). Har sahifada noyob qiymat bo'lishi shart, aks holda tavsiya qilma.

### 5. Schema
JSON-LD yoz: `Organization`, `LocalBusiness`, `Person`, `Service`, `Product`, `FAQPage`, `BreadcrumbList`, `Review` (faqat haqiqiy sharhlar). Kodni sahifaga qo'shishdan oldin ko'rsat.

### 6. Kalit so'zlar tadqiqoti
Uz (lotin va kirill), ru va en variantlari; niyat bo'yicha klasterlash (ma'lumot / tijoriy / tranzaksion / navigatsion); har klaster uchun sahifa. Qidiruv hajmini bilmasang — o'ylab topma, "tekshirish kerak" deb belgila (Google Keyword Planner, Yandex Wordstat).

## Qoida
Sayt fayllarini o'zgartirishdan oldin rejani ko'rsat; o'zgartirishlarni git commit bilan qil.
