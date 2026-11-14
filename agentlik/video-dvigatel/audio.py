import json, subprocess
D=json.load(open("data.json")); T=D["total"]; S={s["id"]:s for s in D["shots"]}
run=lambda a: subprocess.run(["ffmpeg","-y","-loglevel","error"]+a,check=True)
# SFX namunalari
run(["-f","lavfi","-i","anoisesrc=d=0.4:c=pink:a=0.5","-af","highpass=f=600,lowpass=f=5000,afade=t=in:d=0.15,afade=t=out:st=0.15:d=0.25,volume=0.5","whoosh.wav"])
run(["-f","lavfi","-i","aevalsrc=0.7*sin(2*PI*(600+1800*t)*t)*exp(-28*t):d=0.15:s=48000","pop.wav"])
run(["-f","lavfi","-i","aevalsrc=0.5*sin(2*PI*1500*t)*exp(-45*t):d=0.08:s=48000","click.wav"])
run(["-f","lavfi","-i","aevalsrc=0.4*(sin(2*PI*1046*t)+sin(2*PI*1318*t)+sin(2*PI*1568*t))*exp(-6*t):d=0.7:s=48000","sparkle.wav"])
ev=[]
for s in D["shots"][1:]: ev.append(("whoosh",s["a"]-0.12))
for k in ("s40","s41","s42","s6","s9b"): ev.append(("pop",S[k]["a"]+0.1))
s8=S["s8"]; [ev.append(("click",s8["a"]+0.15+i*0.12)) for i in range(12)]
s10=S["s10"]; L=s10["b"]-s10["a"]; [ev.append(("pop",s10["a"]+L*x)) for x in (.12,.32,.52)]; ev.append(("sparkle",s10["a"]+L*.75))
s11=S["s11"]; ev.append(("sparkle",s11["a"]+(s11["b"]-s11["a"])*.5))
ev.append(("pop",S["s2b"]["a"]+0.2)); ev.append(("sparkle",S["end"]["a"]+0.1))
# musiqa: yumshoq akkordlar
music=("aevalsrc='0.05*(if(lt(mod(t,8),4),sin(2*PI*220*t)+sin(2*PI*261.63*t)+sin(2*PI*329.63*t),"
       "sin(2*PI*174.61*t)+sin(2*PI*220*t)+sin(2*PI*261.63*t)))*(0.7+0.3*sin(2*PI*0.5*t))"
       "+0.03*sin(2*PI*110*t)*exp(-3*mod(t,0.5))':d=%.2f:s=48000"%T)
inputs=["-i","track_L.wav","-i","track_K.wav","-f","lavfi","-i",music]
names={"whoosh":"whoosh.wav","pop":"pop.wav","click":"click.wav","sparkle":"sparkle.wav"}
flt=[]; labs=[]
for j,(n,t0) in enumerate(ev):
    inputs+=["-i",names[n]]; idx=3+j; ms=max(0,int(t0*1000))
    flt.append(f"[{idx}:a]adelay={ms}|{ms},volume=0.55[e{j}]"); labs.append(f"[e{j}]")
flt.append("[2:a]lowpass=f=1800,volume=0.9,afade=t=in:d=1.5,afade=t=out:st=%.2f:d=2[m]"%(T-2))
flt.append("[0:a][1:a]amix=inputs=2:normalize=0,highpass=f=80,acompressor=threshold=-18dB:ratio=3,volume=1.6[v]")
flt.append("[v][m]"+"".join(labs)+f"amix=inputs={2+len(labs)}:normalize=0,alimiter=limit=0.95,atrim=0:{T}[out]")
run(inputs+["-filter_complex",";".join(flt),"-map","[out]","-ac","2","-ar","48000","mix.wav"])
print("ok",len(ev))
