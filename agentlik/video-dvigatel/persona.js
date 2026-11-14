const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + process.cwd() + '/video.html'); await p.evaluate(d => window.init(d), JSON.parse(fs.readFileSync('data.json')));
  await p.evaluate(() => {
    const pose = { armL: [20, -110], armR: [-14, 30], mouth: 0, blink: false, tilt: 3, smile: true, propL: "clipboard" };
    document.getElementById('stage').innerHTML = `<svg class="main" viewBox="0 0 1080 1920">${roomBg(0.7, "#2b1d5a")}${personAt(KAMOLA, pose, 170, 430, 1.85)}<rect y="1450" width="1080" height="470" fill="#0e0d14"/></svg>
    <div style="position:absolute;left:0;right:0;top:120px;text-align:center;color:#ffc93c;font-weight:900;letter-spacing:6px;font-size:30px">LOBAR AGENCY</div>
    <div style="position:absolute;left:70px;right:70px;top:1490px;color:#fff">
      <div style="font-size:72px;font-weight:900">Kamola <span style="font-size:36px;color:#8b7cf6">· Project menejer</span></div>
      <div style="font-size:34px;line-height:1.45;margin-top:14px;color:#ddd">Xotirjam, aniq va biroz hazilkash. 49 ta agentni kuzatib yuradi, kim nima qilayotganini Lobarga aytib turadi. Hech qachon shoshmaydi — faqat qahva tugasa xavotirlanadi ☕</div>
      <div style="margin-top:22px;display:flex;gap:14px;flex-wrap:wrap">${["📋 papka doim qo'lida","👔 to'q ko'k kostyum","💛 sariq brend nishoni","😌 xotirjam ovoz"].map(x=>`<span style="background:#24212f;border:2px solid #383349;border-radius:999px;padding:10px 20px;font-size:28px;font-weight:700">${x}</span>`).join("")}</div></div>`;
  });
  await p.screenshot({ path: 'kamola_persona.png' }); await b.close(); })();
