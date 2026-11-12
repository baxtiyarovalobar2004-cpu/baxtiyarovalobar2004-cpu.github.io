// ==== AGENTLIK OFISI — SOZLAMALAR ====
// Shu faylni o'zgartirib, o'z agentligingizni yarating. index.html ga tegish shart emas.
// Fayl o'zgarsa VERSION ni oshiring — brauzerdagi eski holat tozalanib, yangi sozlamalar yuklanadi.

window.OFIS = {
  VERSION: 1,

  // Agentlik nomi, rahbar (savollar kimga boradi) va project menejer ismi
  agentlik: { nom: "Mening Agentligim", egasi: "Rahbar", pm: "Kamola" },

  // Bo'limlar va lavozimlar: [kalit, lavozim nomi, ekran turi (ixtiyoriy)]
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

  // Loyiha xonalari. Har bir loyiha = alohida xona (hammasida bir xil xodimlar to'plami).
  // vazifalar: [xodim kaliti, vazifa matni, davomiylik soniyada]
  // savollar:  [xodim kaliti, savol] — xodim qo'lini ko'tarib turadi
  // uyquIzoh:  { xodim kaliti: "nega hozir ishi yo'qligi" }
  xonalar: [
    {
      id: "namuna",
      nom: "Namuna loyiha",
      rang: "#d9c3a5",
      uyquIzoh: { ads: "Reklama byudjeti tasdiqlangach ishga tushadi" },
      vazifalar: [
        ["competitor-profiling", "Raqobatchilar tahlili: 3 ta sahifa", 80],
        ["customer-research", "Mijozlar og'riqlari: izoh va Direct'dan", 60],
        ["marketing-plan", "Oylik marketing reja", 70],
        ["content-calendar", "Oylik kontent kalendari", 50],
        ["copywriting", "Reels ssenariysi #1", 55],
        ["copywriting", "Reels ssenariysi #2", 55],
        ["video", "Xom videolarni qabul qilish", 40],
        ["editor", "Reels #1 montaji", 90],
        ["image", "Oblojka va karusel dizayni", 70],
        ["social", "Profil auditi: bio va aktual stories", 50],
        ["analytics", "Haftalik hisobot shabloni", 45]
      ],
      savollar: [
        ["pricing", "Xizmat narxi qancha bo'lsin?"],
        ["editor", "Xom videolar qayerga tashlanadi: Google Drive yoki Telegram?"]
      ]
    }
  ]
};
