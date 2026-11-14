# Animatsion video dvigateli (Lobar Agency)

1-video: "49 ta xodim — 0 so'm oylik" (61 s, 1080×1920).

| Fayl | Vazifasi |
|---|---|
| `video.html` | Personajlar (Lobar, Kamola, ofis agentlari), sahnalar, kamera, kartochkalar. `render(t)` har bir kadrni chizadi |
| `build.py` | Ovoz fayllarini gaplarga bo'lib, vaqt jadvali (`data.json`), sahnalar va og'iz harakati konvertini yaratadi |
| `audio.py` | Ovoz + effektlar (whoosh, pop, click, sparkle) + fon musiqasini birlashtiradi (`mix.wav`) |
| `render.js` | Playwright bilan kadrlarni chizadi (`preview t1,t2` yoki `full`) |
| `persona.js` | Kamola persona kartasi |

Yig'ish: `python3 build.py && python3 audio.py && node render.js full && ffmpeg -framerate 30 -i frames/%05d.jpg -i mix.wav -c:v libx264 -crf 20 -pix_fmt yuv420p -c:a aac -shortest video.mp4`
Ovozlar: vidIQ voiceover (Lobar — Jessica, Kamola — Sarah).

## 2-video: "Hoy boshliq, nima bo'lyapti?" (49 s)
`video2.html` (Claude-kub personaji, tutun, chat oynalari), `build2.py`, `audio2.py`. Ovozlar `v2/` papkasida: Lobar — Jessica, Kamola — Sarah, Claude — River.
Render: `VPAGE=video2.html VDATA=data2.json VFRAMES=v2/frames node render.js full`
