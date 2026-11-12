# Lobar Agency — AI marketing agentlik

Claude Code ichida ishlaydigan marketing jamoasi. Uni boshqaradigan direktor va 8 ta bo'lim bor. Rasmdagi 50 ta marketing vazifasi shu bo'limlarga taqsimlangan.

## Jamoa

| Bo'lim | Skill | Nima qiladi |
|---|---|---|
| Direktor | `agentlik-direktor` | Vazifani qabul qiladi, bo'limlarga taqsimlaydi, ko'p ekspertli maslahat beradi |
| Bozor tahlili | `bozor-tahlili` | Mijozlar tadqiqoti, raqobatchilar, prospecting, psixologiya, bozor tahlili |
| Strategiya | `strategiya` | Pozitsiya, offer, narx, marketing reja, o'sish halqalari, brend |
| SEO | `seo` | Audit, AI-SEO, sayt arxitekturasi, programmatic SEO, schema, kalit so'zlar |
| Kontent | `kontent` | Kontent strategiya, kopirayting, tahrir, g'oyalar, kataloglar, kalendar |
| SMM | `smm` | Instagram/Telegram/TikTok, video, rasm, hamjamiyat, blogerlar, LinkedIn |
| Lid generatsiya | `lid-generatsiya` | Lid magnit, bepul vositalar, kreativlar, reklama, co-marketing, isitish |
| Analitika va CRO | `analitika-cro` | Konversiya, A/B test, ro'yxatdan o'tish, popup, tariflar, analitika |
| Operatsiyalar | `operatsiyalar` | Launch, PR, referal, ASO, RevOps/CRM |

## Qanday ishlatiladi

1. Shu repoda Claude Code sessiyasini oching (skilllar `.claude/skills/` dan avtomatik yuklanadi).
2. Yangi mijoz uchun `agentlik/mijozlar/_shablon/brief.md` ni nusxalang yoki shunchaki yozing:
   - `/agentlik-direktor yangi mijoz: Urganchdagi qandolat do'koni, Instagram orqali sotuvni oshirmoqchi`
3. Yoki to'g'ridan-to'g'ri bo'limga murojaat qiling:
   - `/bozor-tahlili Toshkentdagi fitnes zallar raqobatini o'rgan`
   - `/kontent kelasi oy uchun Instagram kontent kalendari`
   - `/lid-generatsiya Meta reklama uchun 3 ta kreativ konsepsiya`
4. Natijalar `agentlik/natijalar/<mijoz>/` papkasida saqlanadi.

## Qoidalar
- Raqam va faktlar o'ylab topilmaydi. Taxminlar "taxmin" deb belgilanadi.
- Reklama byudjeti, post joylash, xabar yuborish kabi tashqi harakatlar faqat sizning tasdiqingiz bilan bajariladi.

## Vizual ofis

`agentlik/ofis/index.html` — agentlik ofisi brauzerda:
- Har bir loyiha alohida xona. Har xonada rasmdagi 48 ta lavozim 8 bo'limga bo'lingan, ustidan project menejer kuzatib yuradi.
- Ishlayotgan xodim kompyuterda ishlaydi, ishi yo'g'i "zzz" deb uxlaydi. Yangi topshiriq kelsa, uyg'onib ishga tushadi.
- "➕ Yangi loyiha" tugmasi yangi xona qo'shadi.
- Doimiy xonalar va vazifalar `agentlik/ofis/vazifalar.js` faylida (o'zgartirgach `VERSION` ni oshiring).
- Ish jarayoni simulyatsiya: vazifalar haqiqiy rejalardan, progress esa taxminiy.

## Har bir loyiha alohida
| Loyiha | Brif | Google Sheets |
|---|---|---|
| Lobar Agency — shaxsiy brend | `mijozlar/lobar-agency/` | https://docs.google.com/spreadsheets/d/1zJJR0Y-C95NQapPMlWmjk3UbNqVO5vRRw0WN0JQwM58/edit |
| UrDU akademik litseyi | `mijozlar/urdu-litsey/` | https://docs.google.com/spreadsheets/d/11cN98CObIFLY0felR8cYyfK_QTLC306LRt-C31OX4rg/edit |

Ofis (faqat egasiga ko'rinadi): https://claude.ai/artifact/SskcorgvTg1z8nMreXFT84
Raqobatchilar tahlili vidIQ orqali, haftasiga 1 marta (kredit tejash uchun).
