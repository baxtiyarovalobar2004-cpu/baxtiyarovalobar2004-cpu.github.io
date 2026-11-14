import json, subprocess
D=json.load(open("data2.json")); T=D["total"]; S={s["id"]:s for s in D["shots"]}
ev=[]
for s in D["shots"][1:]: ev.append(("whoosh",s["a"]-0.12))
for k in ("s1","s2","s3"):
    s=S[k]; t=s["a"]+0.1
    while t<s["b"]-0.2: ev.append(("click",t)); t+=0.11
ev.append(("pop",S["s7"]["a"]+0.05)); ev.append(("sparkle",S["s7"]["a"]+0.15))
for k in ("s90","s91","s92"): ev.append(("pop",S[k]["a"]+(S[k]["b"]-S[k]["a"])*.12))
s10=S["s10"]; L=s10["b"]-s10["a"]; [ev.append(("pop",s10["a"]+L*x)) for x in (.1,.3,.5)]
s12=S["s12"]; ev.append(("sparkle",s12["a"]+(s12["b"]-s12["a"])*.15))
ev.append(("pop",S["s14b"]["a"]+0.05)); ev.append(("sparkle",S["end"]["a"]+0.1))
music=("aevalsrc='0.05*(if(lt(mod(t,8),4),sin(2*PI*220*t)+sin(2*PI*261.63*t)+sin(2*PI*329.63*t),"
       "sin(2*PI*174.61*t)+sin(2*PI*220*t)+sin(2*PI*261.63*t)))*(0.7+0.3*sin(2*PI*0.5*t))"
       "+0.03*sin(2*PI*110*t)*exp(-3*mod(t,0.5))':d=%.2f:s=48000"%T)
inputs=["-i","v2/track_L.wav","-i","v2/track_K.wav","-i","v2/track_C.wav","-f","lavfi","-i",music]
names={"whoosh":"whoosh.wav","pop":"pop.wav","click":"click.wav","sparkle":"sparkle.wav"}
flt=[]; labs=[]
for j,(n,t0) in enumerate(ev):
    inputs+=["-i",names[n]]; ms=max(0,int(t0*1000)); vol=0.35 if n=="click" else 0.55
    flt.append(f"[{4+j}:a]adelay={ms}|{ms},volume={vol}[e{j}]"); labs.append(f"[e{j}]")
flt.append("[3:a]lowpass=f=1800,volume=0.9,afade=t=in:d=1.5,afade=t=out:st=%.2f:d=2[m]"%(T-2))
flt.append("[0:a][1:a][2:a]amix=inputs=3:normalize=0,highpass=f=80,acompressor=threshold=-18dB:ratio=3,volume=1.6[v]")
flt.append("[v][m]"+"".join(labs)+f"amix=inputs={2+len(labs)}:normalize=0,alimiter=limit=0.95,atrim=0:{T}[out]")
subprocess.run(["ffmpeg","-y","-loglevel","error"]+inputs+["-filter_complex",";".join(flt),"-map","[out]","-ac","2","-ar","48000","v2/mix.wav"],check=True)
print("ok",len(ev))
