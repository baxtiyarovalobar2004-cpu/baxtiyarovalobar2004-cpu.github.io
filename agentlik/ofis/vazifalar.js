// Lobar Agency ofisi — bo'limlar, 48 ta xodim (rasmdagi har bir lavozim), loyiha xonalari va vazifalar.
// Vazifalar agentlik/natijalar/ va agentlik/mijozlar/ dagi rejalardan olingan.
// Vazifa: [xodim kaliti, vazifa matni, davomiylik (soniya, 1x tezlikda)]
// Bu faylni o'zgartirsangiz, VERSION ni oshiring — sahifa yangi vazifalar bilan qayta boshlanadi.

window.OFIS = {
  VERSION: 3,

  // Har bir xodimning savollari (savollar: [kalit, savol]) — xodim qo'lini ko'taradi, siz javob berasiz.
  // ekran: text | design | video | chart | ads | social | mind | chat | seo
  bolimlar: [
    { id: "bozor", nom: "Bozor razvedkasi", rang: "#ef8a80", ekran: "chart", xodimlar: [
      ["customer-research", "Mijozlar tadqiqotchisi"],
      ["competitor-profiling", "Raqobatchilar tahlilchisi"],
      ["competitors", "Taqqoslash sahifalari"],
      ["prospecting", "Prospekting mutaxassisi"],
      ["marketing-psychology", "Marketing psixologi"],
      ["market-analysis", "Bozor tahlilchisi"] ] },
    { id: "strategiya", nom: "Strategiya va pozitsiya", rang: "#f4a261", ekran: "mind", xodimlar: [
      ["product-marketing", "Mahsulot marketologi"],
      ["offers", "Offer mutaxassisi"],
      ["pricing", "Narxlash mutaxassisi"],
      ["marketing-plan", "Marketing rejachisi"],
      ["marketing-loops", "O'sish halqalari"],
      ["brand-positioning", "Brend strategi"] ] },
    { id: "seo", nom: "SEO va qidiruv", rang: "#e9c46a", ekran: "seo", xodimlar: [
      ["seo-audit", "SEO auditor"],
      ["ai-seo", "AI-SEO mutaxassisi"],
      ["site-architecture", "Sayt arxitektori"],
      ["programmatic-seo", "Programmatic SEO"],
      ["schema", "Schema mutaxassisi"],
      ["keyword-research", "Kalit so'z tadqiqotchisi"] ] },
    { id: "kontent", nom: "Kontent va tahririyat", rang: "#7fc97f", ekran: "text", xodimlar: [
      ["content-strategy", "Kontent strateg"],
      ["copywriting", "Kopirayter / ssenarist"],
      ["copy-editing", "Muharrir"],
      ["marketing-ideas", "Kreativ (g'oyalar)"],
      ["directory-submissions", "Kataloglar menejeri"],
      ["content-calendar", "Kontent-kalendar menejeri"] ] },
    { id: "smm", nom: "SMM va LinkedIn", rang: "#5fc4c0", ekran: "social", xodimlar: [
      ["social", "SMM menejer"],
      ["video", "Videograf (xom video)", "video"],
      ["editor", "Montajchi (editor)", "video"],
      ["image", "Grafik dizayner", "design"],
      ["community-marketing", "Hamjamiyat menejeri"],
      ["influencer-marketing", "Blogerlar menejeri"],
      ["linkedin", "LinkedIn menejeri"] ] },
    { id: "lid", nom: "Lid generatsiya", rang: "#6c9bd2", ekran: "ads", xodimlar: [
      ["lead-magnets", "Lid magnit mutaxassisi"],
      ["free-tools", "Bepul vositalar dasturchisi", "text"],
      ["ad-creative", "Reklama kreativchisi", "design"],
      ["ads", "Targetolog"],
      ["co-marketing", "Hamkorlik menejeri", "chat"],
      ["lead-nurture", "Lid isitish mutaxassisi", "chat"] ] },
    { id: "analitika", nom: "Analitika va CRO", rang: "#a68bd8", ekran: "chart", xodimlar: [
      ["cro", "CRO mutaxassisi"],
      ["ab-testing", "A/B test mutaxassisi"],
      ["signup", "Ro'yxatdan o'tish oqimi"],
      ["popups", "Popup mutaxassisi"],
      ["paywalls", "Tarif sahifalari"],
      ["analytics", "Analitik"] ] },
    { id: "operatsiya", nom: "Marketing operatsiyalari", rang: "#e58fb1", ekran: "chat", xodimlar: [
      ["marketing-council", "Marketing kengashi", "mind"],
      ["launch", "Launch menejeri"],
      ["public-relations", "PR menejer", "text"],
      ["referrals", "Referal dastur menejeri"],
      ["aso", "ASO mutaxassisi", "social"],
      ["revops", "RevOps / sotuv menejeri"] ] }
  ],

  xonalar: [
    {
      id: "lobar",
      nom: "Lobar Agency — shaxsiy brend",
      rang: "#f6e7d2",
      uyquIzoh: { ads: "Pullik reklama 2027-fevraldan", "ad-creative": "Fevral kreativlari yanvarda" },
      vazifalar: [
        ["competitor-profiling", "Raqobatchilar tahlili: 4 ta Instagram sahifa", 90],
        ["customer-research", "Biznes egalari og'riqlari: Direct va izohlardan", 70],
        ["prospecting", "Xorazmdagi 100 ta biznes ro'yxati (2GIS, Instagram)", 110],
        ["offers", "\"Mijoz oqimi tizimi\" — 10 mln so'mlik taklif (KP)", 85],
        ["pricing", "Kirish paketi: \"Strategiya + audit\" narxi", 50],
        ["brand-positioning", "Bio va pozitsiya: klinika va o'quv markazlar uchun", 55],
        ["marketing-plan", "90 kunlik reja: haftalik nazorat jadvali", 60],
        ["content-strategy", "Rubrikalar: keys · xatolar · tahlil · jarayon", 55],
        ["copywriting", "Reels 4/10 ssenariysi: Kontent reja (yakuniy)", 60],
        ["copywriting", "Reels 5/10 ssenariysi: Hook (yakuniy)", 60],
        ["copywriting", "HOOK lid magnit: 20 ta tayyor hook", 75],
        ["copy-editing", "Reels 6–10 ssenariylarini tahrirlash", 80],
        ["content-calendar", "Seriya joylash jadvali: Du · Chor · Ju", 45],
        ["marketing-ideas", "2-mavsum \"Keyslar mavsumi\" g'oyalari", 60],
        ["social", "\"Seriya\" Highlights va pinned postlar", 50],
        ["social", "Kalit so'zlarga javob: PROFIL, REJA, HOOK", 45],
        ["editor", "Reels 3/10 joylashga tayyorlash: Sahifa qadoqlash", 50],
        ["video", "Reels 4/10 va 5/10 xom videolarini qabul qilish", 40],
        ["editor", "Reels 4/10 montaji: Kontent reja", 100],
        ["editor", "Reels 5/10 montaji: Hook", 100],
        ["image", "Oblojkalar: SERIYA 3/10, 4/10, 5/10", 70],
        ["image", "Keys karuseli dizayni", 85],
        ["lead-magnets", "PROFIL: 5 qadamli tekshiruv ro'yxati (PDF)", 60],
        ["lead-magnets", "REJA: oylik kontent reja shabloni", 60],
        ["linkedin", "LinkedIn: parfyumeriya keysining qisqa versiyasi", 45],
        ["revops", "10 ta biznesga video-audit yuborish", 95],
        ["revops", "Lidlar kuzatuv jadvali: murojaat → KP → shartnoma", 55],
        ["referrals", "Tavsiya bonusi: hozirgi mijozlardan so'rash", 45],
        ["analytics", "Haftalik 3 raqam: ko'rish vaqti, layk/reach, yuborish", 50],
        ["site-architecture", "Saytga \"Lobar Agency\" bloki va \"Bepul audit\" tugmasi", 70],
        ["schema", "Saytga Organization schema", 40],
        ["marketing-council", "Haftalik maslahat: 3 ta mijozga eng qisqa yo'l", 50]
      ],
      savollar: [
        ["pricing", "10 mln so'm — oylik to'lovmi yoki bir martalik? \"Strategiya + audit\" kirish paketi qancha bo'lsin?"],
        ["copywriting", "Keyslar uchun Quvonch Shifo raqamlarini (lid soni, lid narxi) e'lon qilishga ruxsat bormi?"],
        ["competitor-profiling", "Instagram ulanishiga ruxsat berasizmi? Busiz 4 ta raqobatchini qo'lda tahlil qilamiz."],
        ["editor", "Xom videolarni qayerga tashlaysiz: Google Drive papkasimi yoki Telegram?"],
        ["content-calendar", "Oylik kontent reja Google Sheets'da yuritilsinmi? Yangi jadval ochaymi?"],
        ["referrals", "Tavsiya qilgan mijozga qanday bonus beramiz: chegirma, qo'shimcha video yoki pul?"],
        ["image", "Logo bormi? Yo'q bo'lsa, Lobar Agency uchun logo variantlarini chizaylikmi?"]
      ]
    },
    {
      id: "litsey",
      nom: "UrDU akademik litseyi",
      rang: "#dfeaf5",
      uyquIzoh: { ads: "Target zapusk 2027-aprelda", launch: "YouTube zapusk 2027-mayda" },
      vazifalar: [
        ["social", "Boshlang'ich statistika skrinshotlari (12-noyabr)", 30],
        ["social", "Profil auditi va yangi bio", 50],
        ["social", "Aktual: Qabul · Yo'nalishlar · Bitiruvchilar", 45],
        ["social", "Telegram kanalni ochish va sozlash", 50],
        ["marketing-plan", "Rahbar bilan uchrashuv savollari", 45],
        ["customer-research", "Ota-onalar va 9-sinflar uchun so'rovnoma", 60],
        ["competitor-profiling", "Boshqa litsey va maktablar sahifalari tahlili", 70],
        ["lead-magnets", "Bepul sinov imtihoni konsepsiyasi", 75],
        ["co-marketing", "Maktablar bilan hamkorlik: ekskursiya va ochiq dars", 60],
        ["community-marketing", "Kontent elchilari: 3–5 o'quvchi", 45],
        ["content-calendar", "Dekabr kalendari: 13 Reels + 8 post", 50],
        ["copywriting", "Reels 1: Litseyda bir kun — 30 soniyada", 55],
        ["copywriting", "Reels 2: Litseydan keyin qayerdasan?", 55],
        ["copywriting", "Reels 3: 9-sinfda qilinadigan 3 ta xato", 50],
        ["copywriting", "Reels 7: Direktor 30 soniyada javob beradi", 45],
        ["copywriting", "Reels 8: Litsey vs maktab 10-sinfi", 50],
        ["image", "Karusel: Litsey haqida 7 ta fakt", 80],
        ["image", "Aktual stories ikonkalari", 50],
        ["image", "O'qituvchi tanishtiruvi shabloni", 60],
        ["video", "Suratga olish kuni: bino va darslar", 110],
        ["editor", "Reels 1 montaji", 80],
        ["editor", "Reels 2 montaji", 80],
        ["analytics", "Dekabr hisoboti shabloni", 45]
      ],
      savollar: [
        ["social", "Bugungi obunachi va qamrov statistikasini skrinshot qildingizmi? Dekabr natijasi shunga taqqoslanadi."],
        ["marketing-plan", "Rahbar bilan uchrashuv qachon? Qabul sanalari va o'tgan yilgi arizalar soni kerak."],
        ["ads", "Aprel reklamasi uchun rahbar qancha byudjet ajrata oladi?"],
        ["video", "Suratga olish kuni qachon? O'quvchilarni suratga olishga ruxsat olinganmi?"],
        ["lead-magnets", "Bepul sinov imtihonini qaysi shanbalarda o'tkazish mumkin?"]
      ]
    }
  ]
};
