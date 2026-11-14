const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const mode = process.argv[2]; const D = JSON.parse(fs.readFileSync('data.json'));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + process.cwd() + '/video.html'); await p.evaluate(d => window.init(d), D);
  if (mode === 'preview') {
    const times = process.argv[3].split(',').map(Number);
    for (const t of times) { await p.evaluate(t => render(t), t); await p.screenshot({ path: `prev_${t}.jpg`, type: 'jpeg', quality: 80 }); }
  } else {
    fs.mkdirSync('frames', { recursive: true });
    const N = Math.ceil(D.total * 30);
    for (let f = 0; f < N; f++) { await p.evaluate(t => render(t), f / 30); await p.screenshot({ path: `frames/${String(f).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 88 }); if (f % 150 === 0) console.log(f, '/', N); }
  }
  await b.close();
})();
