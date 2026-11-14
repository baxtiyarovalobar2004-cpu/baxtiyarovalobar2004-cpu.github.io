import json, subprocess, wave, struct, math
L=[(0,4.21,"Men 49 ta xodim yolladim. Hech biriga oylik to'lamayman!"),(4.6,6.65,"Kamola, hozir kim nima qilyapti?"),(7.12,8.88,"Anavi-chi? Uxlab yotibdi-ku!"),(9.34,11.15,"Bu-chi? Qo'lini ko'tarib turibdi."),(11.58,12.41,"Oylik bo'lsin."),(12.86,17.80,"Biznesingizga ham shunday AI jamoa kerakmi? Kommentga AGENT deb yozing."),(18.24,20.34,"Sizlarga rostdan hech narsa kerak emasmi?")]
K=[(0,2.87,"Chunki biz — sun'iy intellekt agentlarmiz."),(3.33,10.36,"Strateg raqobatchilarni tahlil qilyapti. Ssenarist Reels yozyapti. Montajchi videongizni kesyapti."),(10.82,15.62,"U targetolog. Reklama fevraldan boshlanadi. Ishi bo'lmasa — uxlaydi."),(16.2,20.27,"Sizga savoli bor: 10 mln — oylikmi yoki bir martalik?"),(20.76,25.28,"Bugun raqobatchilar tahlili, kontent reja va ssenariylar tayyor bo'ldi."),(25.76,28.84,"Faqat… qahva mashinasi bitta kamlik qilyapti.")]
K2=[(0,5.0,"Biznesingizga ham shunday AI jamoa kerakmi? Kommentga AGENT deb yozing.")]
order=[("L",0),("K",0,1.3),("L",1),("K",1),("L",2),("K",2),("L",3),("K",3),("L",4,1.0),("K",4,.4),("L",5,0.98),("K2",0),("L",6),("K",5,1.1)]
T=0.3; lines=[]; place=[]
for o in order:
    who,i=o[0],o[1]; hold=o[2] if len(o)>2 else 0
    a,b,txt={"L":L,"K":K,"K2":K2}[who][i]
    a=max(0,a-0.05); d=b-a+0.05
    lines.append(dict(who="K" if who=="K2" else who,i=i,a=round(T,3),b=round(T+d,3),text=txt,hold=hold,src=(a,b)))
    place.append((who,a,d,T))
    T+=d+hold+0.22
END=T+0.3; TOTAL=END+2.2
# kadrlar
S=[]; ln=lines
def add(id,a,b): S.append(dict(id=id,a=round(a,3),b=round(b,3)))
def cut(l,frac): return l["a"]+(l["b"]-l["a"])*frac
add("s1",0,ln[1]["a"])
k1=ln[1]; add("s2a",k1["a"],cut(k1,.55)); add("s2b",cut(k1,.55),ln[2]["a"])
add("s3",ln[2]["a"],ln[3]["a"])
k2=ln[3]; o=k2["a"]-(3.33-0.05)
add("s40",k2["a"],5.93+o); add("s41",5.93+o,8.13+o); add("s42",8.13+o,ln[4]["a"])
l3=ln[4]; add("s5a",l3["a"],cut(l3,.45)); add("s5b",cut(l3,.45),ln[5]["a"])
add("s6",ln[5]["a"],ln[6]["a"])
l4=ln[6]; add("s7a",l4["a"],cut(l4,.35)); add("s7b",cut(l4,.35),ln[7]["a"])
add("s8",ln[7]["a"],ln[8]["a"])
l5=ln[8]; add("s9a",l5["a"],l5["b"]+.1); add("s9b",l5["b"]+.1,ln[9]["a"])
add("s10",ln[9]["a"],ln[10]["a"]); add("s11",ln[10]["a"],ln[11]["a"]); add("s11k",ln[11]["a"],ln[12]["a"]); add("s12",ln[12]["a"],ln[13]["a"])
add("s13",ln[13]["a"],END); add("end",END,TOTAL)
# ovoz: har bir spiker uchun alohida trek
for who in "LK":
    parts=[p for p in place if p[0]==who or (who=="K" and p[0]=="K2")]
    flt=[]; labels=[]
    for j,(w,a,d,t0) in enumerate(parts):
        src=1 if w=="K2" else 0
        flt.append(f"[{src}:a]atrim={a}:{a+d},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={d-0.06}:d=0.06,adelay={int(t0*1000)}|{int(t0*1000)}[p{j}]"); labels.append(f"[p{j}]")
    flt.append("".join(labels)+f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={TOTAL}[o]")
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",f"{who}.mp3","-i","K2.mp3","-filter_complex",";".join(flt),"-map","[o]","-ac","1","-ar","48000",f"track_{who}.wav"],check=True)
# og'iz uchun konvert (30 fps)
env={}
for who in "LK":
    w=wave.open(f"track_{who}.wav"); n=w.getnframes(); sr=w.getframerate(); raw=w.readframes(n)
    vals=struct.unpack(f"<{n}h",raw); hop=sr//30; arr=[]
    for f in range(int(TOTAL*30)+2):
        seg=vals[f*hop:(f+1)*hop]
        r=math.sqrt(sum(x*x for x in seg)/len(seg)) if seg else 0
        arr.append(r)
    mx=sorted(arr)[int(len(arr)*.97)] or 1
    sm=[]; p=0
    for v in arr:
        v=min(1,v/mx); v=0 if v<.12 else v; p=p*.35+v*.65; sm.append(round(p,3))
    env[who]=sm
json.dump(dict(lines=[{k:l[k] for k in("who","a","b","text")} for l in lines],shots=S,env=env,total=TOTAL),open("data.json","w"))
print("TOTAL",round(TOTAL,2)); [print(s) for s in S]
