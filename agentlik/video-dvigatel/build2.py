import json, subprocess, wave, struct, math
SRC={
 "L":[(0,3.90,"Yo'q! Birinchi 2 soniyani kes, gapni toza qoldir!"),(4.39,9.34,"Ssenariy hook bilan boshlansin! Raqam, xato yoki qarama-qarshilik!"),(9.91,14.92,"Oblojka: pastda katta oq sarlavha, ikkinchi so'z sariq plashkada!"),(15.56,19.43,"Uchta chatda uchta ish! Hammasini o'zim tushuntirib o'tiribman!"),(20.22,20.87,"Bir martami?!"),(21.90,23.88,"…Unda men uch soat nima qildim?")],
 "K":[(0,1.94,"Hoy boshliq, nima bo'lyapti?!"),(2.58,5.20,"Nega o'zingiz? Claude'ni chaqiring."),(5.63,7.34,"Siz esa faqat tasdiqlaysiz."),(8.19,9.50,"Sen qutisan, Claude.")],
 "C":[(0,4.55,"Salom! Hammasini menga bir marta ayting, men jamoaga taqsimlayman."),(5.66,10.44,"Montajchi kesadi. Ssenarist yozadi. Dizayner oblojka chizadi."),(11.57,12.59,"Asabiylashdingiz."),(12.94,14.21,"Menga ham qahva bormi?")]}
order=[("L",0),("L",1),("L",2),("K",0),("L",3),("K",1),("C",0),("L",4),("C",1),("K",2),("L",5),("C",2,1.5),("C",3),("K",3,1.7)]
T=0.3; lines=[]; place=[]
for o in order:
    who,i=o[0],o[1]; hold=o[2] if len(o)>2 else 0
    a,b,txt=SRC[who][i]; a=max(0,a-0.05); d=b-a+0.05
    lines.append(dict(who=who,a=round(T,3),b=round(T+d,3),text=txt,src=a)); place.append((who,a,d,T))
    T+=d+hold+0.22
END=T+0.1; TOTAL=END+2.0
ln=lines; S=[]
def add(i,a,b): S.append(dict(id=i,a=round(a,3),b=round(b,3)))
nxt=lambda k: ln[k+1]["a"]
add("s1",0,nxt(0)); add("s2",ln[1]["a"],nxt(1)); add("s3",ln[2]["a"],nxt(2)); add("s4",ln[3]["a"],nxt(3)); add("s5",ln[4]["a"],nxt(4))
add("s6",ln[5]["a"],nxt(5)); add("s7",ln[6]["a"],nxt(6)); add("s8",ln[7]["a"],nxt(7))
c2=ln[8]; o=c2["a"]-(5.66-0.05); add("s90",c2["a"],7.0+o); add("s91",7.0+o,8.57+o); add("s92",8.57+o,nxt(8))
add("s10",ln[9]["a"],nxt(9)); add("s11",ln[10]["a"],nxt(10)); add("s12",ln[11]["a"],nxt(11)); add("s13",ln[12]["a"],nxt(12))
add("s14a",ln[13]["a"],ln[13]["b"]+0.15); add("s14b",ln[13]["b"]+0.15,END); add("end",END,TOTAL)
env={}
for who in "LKC":
    parts=[p for p in place if p[0]==who]; flt=[]; labs=[]
    for j,(w,a,d,t0) in enumerate(parts):
        flt.append(f"[0:a]atrim={a}:{a+d},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={d-0.06}:d=0.06,adelay={int(t0*1000)}|{int(t0*1000)}[p{j}]"); labs.append(f"[p{j}]")
    flt.append("".join(labs)+f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={TOTAL}[o]")
    subprocess.run(["ffmpeg","-y","-loglevel","error","-i",f"v2/{who}.mp3","-filter_complex",";".join(flt),"-map","[o]","-ac","1","-ar","48000",f"v2/track_{who}.wav"],check=True)
    w=wave.open(f"v2/track_{who}.wav"); n=w.getnframes(); sr=w.getframerate(); vals=struct.unpack(f"<{n}h",w.readframes(n)); hop=sr//30; arr=[]
    for f in range(int(TOTAL*30)+2):
        seg=vals[f*hop:(f+1)*hop]; arr.append(math.sqrt(sum(x*x for x in seg)/len(seg)) if seg else 0)
    mx=sorted(arr)[int(len(arr)*.97)] or 1; sm=[]; p=0
    for v in arr:
        v=min(1,v/mx); v=0 if v<.12 else v; p=p*.35+v*.65; sm.append(round(p,3))
    env[who]=sm
json.dump(dict(lines=[{k:l[k] for k in("who","a","b","text")} for l in lines],shots=S,env=env,total=TOTAL),open("data2.json","w"))
print("TOTAL",round(TOTAL,2)); [print(s["id"],s["a"],s["b"]) for s in S]
