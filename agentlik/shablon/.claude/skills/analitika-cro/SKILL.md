---
name: analitika-cro
description: Analitika va konversiya (CRO) bo'limi — sahifa va formalarda konversiyani oshirish, A/B testlar rejasi, ro'yxatdan o'tish oqimini yaxshilash, popup va overlaylar, pullik obuna/tarif ekranlari, kuzatuv va o'lchash (UTM, pikseller, GA4, Yandex Metrika, hisobotlar). "Konversiya", "sotuv kam", "A/B test", "analitika", "hisobot", "UTM", "piksel", "forma" so'rovlarida ishlating.
---

# Analitika va CRO bo'limi

## Vazifalar

### 1. CRO (sahifa/forma auditi)
Tekshiruv ro'yxati: 5 soniyada tushunarlimi (nima, kimga, nima uchun)? Asosiy CTA ko'rinadimi? Ijtimoiy isbot bormi? Forma maydonlari minimalmi? Mobil versiya? Yuklanish tezligi? Telegram/telefon orqali tez aloqa bormi?
Natija: muammo → gipoteza → tuzatish → kutilgan ta'sir (ICE bali: Impact, Confidence, Ease).

### 2. A/B testlar
Test kartasi: gipoteza ("Agar X ni Y ga o'zgartirsak, Z oshadi, chunki..."), asosiy metrika, variantlar, kerakli trafik/davomiylik, to'xtatish sharti. Bir vaqtda bitta o'zgaruvchi. Kichik trafikda statistik ahamiyat cheklovini ochiq ayt.

### 3. Ro'yxatdan o'tish oqimi
Qadamlar xaritasi, har bir qadamda yo'qotish sabablari, qisqartirish (telefon + SMS kod, Telegram orqali kirish), bo'sh holat va xato xabarlari matni.

### 4. Popup va overlaylar
Trigger (vaqt, scroll, chiqish niyati), taklif, matn, chastota cheklovi. Foydalanuvchini bezor qilmasligi shart.

### 5. Tarif/paywall ekranlari
Tariflar taqqoslash, tavsiya etilgan tarifni ajratish, yillik/oylik almashtirgich, kafolat, FAQ, upgrade momentlari.

### 6. Analitika
- O'lchash rejasi: biznes maqsad → KPI → hodisa (event) → vosita.
- UTM shablon: `utm_source / utm_medium / utm_campaign / utm_content` (izchil nomlash qoidasi bilan).
- Hisobot: davr, asosiy raqamlar, o'tgan davr bilan taqqoslash, nima ishladi/ishlamadi, keyingi harakatlar.
- **Raqamlarni faqat haqiqiy ma'lumotdan** ol (ulangan vosita, foydalanuvchi bergan fayl). Ma'lumot bo'lmasa — so'ra.
