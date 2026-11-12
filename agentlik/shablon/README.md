# AI marketing agentlik + vizual ofis — arxitektura va shablon

Bu shablon ikki qismdan iborat:
1. **Agentlik "miyasi"** — Claude Code ichida ishlaydigan direktor va 8 ta bo'lim (skill). Haqiqiy ishni shular bajaradi: tahlil, strategiya, ssenariy, reja va hisobot.
2. **Vizual ofis** — brauzerda ochiladigan sahifa. Unda har bir loyiha alohida xona, 49 ta xodim ishlaydi, dam oladi, gaplashadi va savol beradi, project menejer esa ularni kuzatadi.

Hech qanday server, baza yoki to'lovli xizmat kerak emas. Hammasi oddiy fayllar.

---

## 1. Umumiy sxema

```
┌──────────────────────────── SIZ (rahbar) ────────────────────────────┐
│  Claude Code'da yozasiz: "/agentlik-direktor yangi mijoz: ..."       │
└───────────────┬──────────────────────────────────────┬───────────────┘
                │                                      │
                ▼                                      ▼
┌──────────── AGENTLIK MIYASI ────────────┐   ┌──────── VIZUAL OFIS ────────┐
│ .claude/skills/                         │   │ ofis/index.html  (dvigatel) │
│   agentlik-direktor  ← vazifani qabul   │   │ ofis/sozlamalar.js (ma'lumot)│
│     │  qiladi, bo'limga taqsimlaydi     │   │                             │
│     ├─ bozor-tahlili                    │   │  xonalar = loyihalar        │
│     ├─ strategiya                       │   │  xodimlar = lavozimlar      │
│     ├─ seo                              │   │  vazifalar → navbat → ish   │
│     ├─ kontent                          │   │  savollar → qo'l ko'tarish  │
│     ├─ smm                              │   │  PM → kuzatish va taklif    │
│     ├─ lid-generatsiya                  │   └──────────────▲──────────────┘
│     ├─ analitika-cro                    │                  │ vazifalar ro'yxati
│     └─ operatsiyalar                    │                  │ (qo'lda yoki Claude
│                                         │                  │  yangilaydi)
│ agentlik/mijozlar/<loyiha>/brief.md  ───┼──────────────────┘
│ agentlik/natijalar/<loyiha>/*.md        │
└───────────────┬─────────────────────────┘
                ▼
     Google Sheets (har loyihaga alohida): kontent reja, raqobatchilar, hisobot
```

**Asosiy qoida:** har bir loyiha alohida, ya'ni o'z brifi, o'z natijalar papkasi, o'z Sheets jadvali va ofisda o'z xonasi bo'ladi.

---

## 2. Fayllar tuzilmasi

```
shablon/
├── README.md                         ← shu hujjat
├── .claude/skills/                   ← agentlik bo'limlari (Claude Code avtomatik yuklaydi)
│   ├── agentlik-direktor/SKILL.md    ← [AGENTLIK NOMI] va [ISM] ni o'zgartiring
│   ├── bozor-tahlili/SKILL.md
│   ├── strategiya/SKILL.md
│   ├── seo/SKILL.md
│   ├── kontent/SKILL.md
│   ├── smm/SKILL.md
│   ├── lid-generatsiya/SKILL.md
│   ├── analitika-cro/SKILL.md
│   └── operatsiyalar/SKILL.md
├── agentlik/
│   ├── mijozlar/_shablon/brief.md    ← yangi loyiha brifi shabloni
│   └── natijalar/                    ← tayyor hujjatlar shu yerga tushadi
└── ofis/
    ├── index.html                    ← ofis dvigateli (o'zgartirish shart emas)
    └── sozlamalar.js                 ← agentlik nomi, bo'limlar, xonalar, vazifalar
```

---

## 3. Vizual ofis qanday ishlaydi

### 3.1. Ma'lumot va dvigatel ajratilgan
- `sozlamalar.js` faqat **ma'lumot**: agentlik nomi, bo'limlar va lavozimlar, xonalar, boshlang'ich vazifalar va savollar.
- `index.html` **dvigatel**: chizish, harakat, mantiq. U `sozlamalar.js` ni o'qiydi.
- Yangi agentlik yaratish uchun faqat `sozlamalar.js` ni o'zgartirish kifoya.

### 3.2. Holat (state) — nima saqlanadi
Brauzerning `localStorage` xotirasida bitta obyekt saqlanadi:

```
S = {
  rooms:     [ {id, nom, rang, uyquIzoh, custom} ]       // xonalar (loyihalar)
  workers:   { "xona:rol": {room, role, cur, idle} }     // har xonada har lavozim
  queue:     [ {id, room, role, title, d, p, src} ]      // navbatdagi vazifalar
  done:      [ ...bajarilganlar, at: vaqt ]
  questions: [ {id, room, role, q, a} ]                  // a bo'sh = qo'l ko'tarilgan
  pmLog:     [ {at, text, kind} ]                        // PM xabarlari
  auto, speed, paused, view                              // boshqaruv
}
```
- `cur` — xodimning hozirgi vazifasi, `p` — jarayon (0–1), `d` — davomiylik (soniya).
- `src: "men"` — rahbar bergan topshiriq. U navbatni kutmay, darhol boshlanadi.
- `VERSION` o'zgarsa, eski holat tashlab yuboriladi va `sozlamalar.js` dan qayta yuklanadi.

### 3.3. Asosiy sikl (har 300 ms)
```
setInterval:
  tick(dt)      → vazifa jarayoni, energiya, navbatdan yangi ish olish
  behave()      → bo'sh xodimlarning xatti-harakati (uxlash, qahva, suhbat...)
  render()      → CSS klasslarini yangilash (faqat o'zgarganda)
  pmSuggest()   → PM har ~90 soniyada taklif yoki ogohlantirish chiqaradi
setInterval(pmLoop, 1500) → PM kimning yoniga borishini tanlaydi
```

### 3.4. Xodimning ikki qatlamli holati
1. **Ish holati** (`S.workers`, saqlanadi): vazifasi bormi, jarayon necha foiz.
2. **Vizual holat** (`VIS`, saqlanmaydi): qayerda turibdi va nima qilyapti.

```
                 vazifa keldi / savol bor
   ┌────────────────────────────────────────────┐
   ▼                                            │
 [desk] ── bo'sh, vaqti keldi ──► tanlov (xarakterga qarab og'irlik):
   │                               ├─ sleep   (stolda uxlaydi, "zzz")
   │                               ├─ phone   (stolda telefon)
   │                               ├─ stretch (kerishadi)
   │                               ├─ cooler  → [walk] → [away: suv]   ─┐
   │                               ├─ coffee  → [walk] → [away: qahva] ─┤ vaqti tugadi
   │                               ├─ sofa    → [walk] → [sofa]        ─┤ yoki ish keldi
   │                               └─ chat    → ikkalasi [walk] → [chat]┘ → [walk] → [desk]
   └─ vazifa bor → "work" (yozadi; jarayon faqat stolda o'tirganda oshadi)
```
- **Joylar (spots)** dam olish zonasidagi bo'sh nuqtalar: kuller, qahva, divan, suhbat stoli. Bitta joyda bir vaqtda bitta odam turadi.
- Bir xonadan bir vaqtda ko'pi bilan 7 kishi tanaffusga chiqadi (`MAX_AWAY`).

### 3.5. Xarakter, energiya, kayfiyat
- Har xodimga 8 ta xarakterdan biri beriladi: quvnoq, ishchan, uyquchan, gapdon, qahvasevar, perfeksionist, sportchi yoki xotirjam. Xarakter tanaffus tanlovi og'irliklarini va charchash tezligini o'zgartiradi.
- **Energiya** (0–100): ishlaganda kamayadi, dam olganda tiklanadi.
  - Energiya 30 dan past bo'lsa, xodim charchaydi: ko'zlari yarim yumuq, peshonasida ter, sekin yozadi.
  - Energiya 12 dan past bo'lsa, ish o'rtasida qahvaga chiqadi.
- **Kayfiyat:** charchagan 😩, oddiy 🙂 yoki quvnoq 😄. Ishni tugatganda, savoliga javob olganda va suhbatda quvnoq bo'ladi.
- Ism, jins, soch turmagi, teri rangi va xarakter `hash(lavozim + xona)` dan olinadi. Shuning uchun har ochilishda bir xil chiqadi.

### 3.6. Odamcha qanday chiziladi
- Har bir odamcha bitta **inline SVG** (viewBox `0 0 44 76`). Undagi guruhlar: oyoqlar `.lg`, qo'llar `.ar`, bosh `.hd`, ko'zlar `.eo/.ec`, og'iz `.mo-n/.mo-h/.mo-t`, ter `.sweat`, piyola `.cup`, telefon `.phone`.
- **Harakatlar faqat CSS bilan** qilinadi: div'ga `work`, `sleep`, `walk`, `drink` kabi klass qo'shiladi, CSS esa qo'l va bosh qismlarini aylantiradi. JavaScript faqat klass va `left/top` ni o'zgartiradi, bu sahifani yengil qiladi.
- **Kiyim** lavozimga qarab tanlanadi (`OUTFIT_BY_ROLE`, `OUTFIT_BY_DEPT`). Kiyim turlari: kostyum, blazer, ko'ylak, xudi, sviter, futbolka, jilet. Aksessuarlar: ko'zoynak, quloqchin, beret, kepka, mikrofonli quloqchin, galstuk, beyjik.

### 3.7. Qatlamlar (kim kimning ustida)
```
z 0  stul suyanchig'i
z 1  o'tirgan odamcha            ← stol uning oyoqlarini yopadi
z 3  stol, divanning old qismi
z 4  monitor, klaviatura
z 6  yurgan / tik turgan odamcha
z 60 project menejer
```
Odamchalar har xonaning ustidagi `.agents` qatlamida `position:absolute` bilan turadi. Ularning koordinatasi stoldagi `.seat` nuqtasidan yoki zonadagi `.spot` nuqtasidan hisoblanadi. Ekran o'lchami o'zgarsa, `snapAll()` hammani joyiga qo'yadi.

### 3.8. Project menejer (PM)
- Yo'lakda turadi. Ishlayotganlar va qo'l ko'targanlar yoniga borib gapiradi.
- **"PM'dan so'rash":** odamchani bosib tanlansa, PM o'sha xodim yoniga boradi va `explain()` bilan sababini aytadi: vazifasi yo'q, navbatda ish bor lekin Avto o'chiq, savolga javob kutyapti, charchagan yoki tanaffusda. Kerak bo'lsa, topshiriq ham taklif qiladi (`SUGGEST`).
- **O'z takliflari:** javobsiz savollar ko'p bo'lsa, xonada ish tugasa yoki ko'p xodim charchasa, PM xabar yozadi. U xabar ro'yxatiga tushadi va brauzer bildirishnomasi ham keladi (ruxsat berilgan bo'lsa).

### 3.9. Cheklovlar
- Bu **simulyatsiya**: vazifalar ro'yxati haqiqiy, lekin jarayon foizi taxminiy. Haqiqiy ishni Claude Code'dagi bo'limlar bajaradi.
- Holat faqat shu brauzerda saqlanadi. Boshqa telefon yoki kompyuterda ofis boshidan boshlanadi.
- Bildirishnomalar faqat sahifa ochiq turganda keladi. Sahifa yopiq paytda bildirishnoma yuborish uchun alohida server kerak.

---

## 4. O'rnatish

### 4.1. Ofisni ko'rish
- **Eng oddiy yo'l:** `ofis/` papkasini kompyuterga yuklab, `index.html` ni brauzerda ochish.
- **Telefonda:** Claude'ga "shu ofisni artifact qilib joylab ber" deyish (faqat egasiga ko'rinadi) yoki GitHub Pages'ga joylash.

### 4.2. O'z agentligingizni sozlash (`ofis/sozlamalar.js`)
1. `agentlik: { nom, egasi, pm }` — agentlik nomi, rahbar ismi va PM ismi.
2. `xonalar` — har bir loyiha uchun bitta obyekt: `id`, `nom`, `rang`, `vazifalar`, `savollar`, `uyquIzoh`.
3. `bolimlar` — lavozimlarni qo'shish, olib tashlash yoki nomini o'zgartirish mumkin. Ekran turlari: `text`, `design`, `video`, `chart`, `ads`, `social`, `mind`, `chat`, `seo`.
4. O'zgartirgach `VERSION` ni bittaga oshiring.

Yangi loyihani ofisning o'zida "➕ Yangi loyiha" tugmasi bilan ham qo'shsa bo'ladi.

### 4.3. Agentlik bo'limlari (Claude Code)
1. `.claude/` va `agentlik/` papkalarini o'z repongizga ko'chiring.
2. `agentlik-direktor/SKILL.md` ichida `[AGENTLIK NOMI]`, `[ISM]` va `[KASB]` ni to'ldiring.
3. Claude Code'da yozing: `/agentlik-direktor yangi mijoz: <biznes, maqsad, byudjet>`.
4. Direktor brif ochadi (`agentlik/mijozlar/<loyiha>/brief.md`), ishni bo'limlarga taqsimlaydi va natijani `agentlik/natijalar/<loyiha>/` ga yozadi.

### 4.4. Tavsiya etiladigan ish tartibi
| Ish | Qayerda | Qanchalik tez-tez |
|---|---|---|
| Brif | `mijozlar/<loyiha>/brief.md` | loyiha boshida, keyin yangilanadi |
| Oylik kontent reja | Google Sheets (har loyihaga alohida fayl) | oyda 1 marta |
| Raqobatchilar tahlili | vidIQ yoki qo'lda → Sheets'dagi "Raqobatchilar" varag'i | haftada 1 marta (vidIQ kreditini tejash uchun) |
| Xom video → montaj | montajchi Drive'ga tashlaydi → montaj ko'rsatmasi → tayyor video | har video uchun |
| Hisobot | Sheets'dagi "Haftalik hisobot" varag'i | haftada 1 marta |

---

## 5. Claude'dan qayta yaratib berishni so'rash uchun tayyor matn

> Menga AI marketing agentlik qurib ber. Claude Code skilllari sifatida direktor va 8 ta bo'lim bo'lsin: bozor tahlili, strategiya, SEO, kontent, SMM, lid generatsiya, analitika/CRO, operatsiyalar. Har bir loyiha uchun alohida brif, natijalar papkasi va Google Sheets bo'lsin. Yana vizual ofis sahifasini qil: har loyiha alohida xona, ichida 49 ta lavozim 8 bo'limga bo'lingan. Xodimlar SVG odamcha bo'lib, boshi ustida ismi va lavozimi yozilsin va kasbiga mos kiyim kiysin. Vazifasi bo'lsa kompyuterda ishlasin, bo'lmasa uxlasin, suv yoki qahva ichishga borsin, hamkasbi bilan gaplashsin. Har kimning xarakteri va energiyasi bo'lsin: charchasa yuzida ko'rinsin. Savoli bo'lgan xodim qo'lini ko'tarsin. Project menejer xodimlarni kuzatib yursin, so'ralsa xodim nega bo'shligini tushuntirsin, o'zi ham takliflar bersin. Ma'lumotlar alohida `sozlamalar.js` faylida, holat esa localStorage'da saqlansin. Shu README dagi arxitekturaga amal qil.
