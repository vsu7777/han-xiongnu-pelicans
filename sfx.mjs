// 程序化音效草稿（非配乐、非交响乐）：全部由振荡器/噪声/弦模型现算，无外部素材。读取 shots.js 的事件表。
import fs from 'node:fs';import {createRequire} from 'node:module';const require=createRequire(import.meta.url);
const root=decodeURIComponent(new URL('.',import.meta.url).pathname);require(root+'shots.js');const {SHOTS,DURATION}=globalThis;
const SR=48000,N=Math.round(DURATION*SR),out=new Float32Array(N),TAU=Math.PI*2;
let st=20261120;const noise=()=>{st^=st<<13;st^=st>>>17;st^=st<<5;return (st>>>0)/2147483648-1};
const hash=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const add=(t0,dur,fn)=>{const a=Math.round(t0*SR),n=Math.round(dur*SR);for(let i=0;i<n;i++){const k=a+i;if(k>=0&&k<N)out[k]+=fn(i/SR,i)}};
const env=(x,dur,att=.005,rel=.05)=>Math.min(1,x/att)*Math.min(1,Math.max(0,(dur-x)/rel));
function bell(t0,g=1,dark=0,r=1){add(t0,1.6,x=>{const e=1-Math.exp(-x*1800);const lp=dark?.35:1;return g*e*(.27*Math.sin(TAU*2400*r*x+1.3*Math.sin(TAU*57*x))*Math.exp(-x*5.3)+lp*.17*Math.sin(TAU*3600*r*x)*Math.exp(-x*7)+lp*.07*Math.sin(TAU*4877*r*x)*Math.exp(-x*12))})}
function drum(t0,g=1,f=54){add(t0,.7,x=>g*(.38*Math.sin(TAU*(f*x+13*(1-Math.exp(-18*x))/18))*Math.exp(-x*9)*(1-Math.exp(-x*1500))+.1*noise()*Math.exp(-x*40)))}
function noiseBed(a,b,g,cut,bright,mod){let lp=0,lp2=0;add(a,b-a,(x,i)=>{const w=noise();lp+=cut*(w-lp);lp2+=cut*.12*(lp-lp2);const s=bright?(lp-lp2):lp;const m=1+.5*Math.sin(TAU*mod*x+a)+.3*Math.sin(TAU*mod*2.7*x);return g*s*m*env(x,b-a,.6,.6)})}
function pluckGlide(t0,f0,f1,dur,g){const maxL=Math.ceil(SR/Math.min(f0,f1))+2,buf=new Float32Array(maxL);for(let i=0;i<maxL;i++)buf[i]=noise()*.8;let p=0,y=0;add(t0,dur,x=>{const f=f0*Math.pow(f1/f0,Math.min(1,x/(dur*.7))),L=Math.max(2,SR/f);const r=(p-L+maxL*4)%maxL,i0=Math.floor(r),fr=r-i0;const v=buf[i0%maxL]*(1-fr)+buf[(i0+1)%maxL]*fr;const nv=.996*(v+y)/2;y=v;buf[p%maxL]=nv;p++;return g*nv*env(x,dur,.002,.3)})}
const T={
 wind:(t,a,b,g=1)=>noiseBed(t+a,t+b,.5*g,.03,false,.17),sand:(t,a,b,g=1)=>noiseBed(t+a,t+b,.9*g,.25,true,.4),
 crunch:(t,a,b)=>{let lp=0;add(t+a,b-a,x=>{lp+=.4*(noise()-lp);return .05*lp*(.5+.5*Math.sin(TAU*11*x))**2*env(x,b-a,.5,.5)})},
 drone:(t,a,b,f=65)=>add(t+a,b-a,x=>{let s=0;for(let h=1;h<7;h++)s+=Math.sin(TAU*f*h*x+h)/(h*h);return .09*s*env(x,b-a,1.2,1.5)*(1+.1*Math.sin(TAU*.3*x))}),
 chatter:(t,a,b)=>{for(let k=0;k<(b-a)*7;k++){const tt=t+a+k/7+hash(k)*.08;add(tt,.02,x=>.06*noise()*Math.exp(-x*300))}},
 brush:(t,a,b)=>{let lp=0;add(t+a,b-a,x=>{lp+=.3*(noise()-lp);return .04*lp*Math.abs(Math.sin(TAU*.9*x))*env(x,b-a,.2,.3)})},
 zheng:(t,a)=>pluckGlide(t+a,660,330,1.6,.5),gulp:(t,a)=>add(t+a,.32,x=>.35*Math.sin(TAU*(180*x-90*x*x/.32))*Math.sin(Math.PI*x/.32)),
 bellEcho:(t,a)=>{for(let k=0;k<4;k++)bell(t+a+k*.27,.28*Math.pow(.5,k),1)},bell:(t,a,g=1)=>bell(t+a,g),bellFaint:(t,a)=>bell(t+a,.12,1),
 drumAccel:(t,a,b)=>{let x=a,iv=.62;while(x<b){drum(t+x,.6+.4*(x-a)/(b-a));x+=iv;iv=Math.max(.13,iv*.9)}},
 drumRoll:(t,a,b)=>{let x=a,iv=.4;while(x<b-.05){drum(t+x,.5,70);x+=iv;iv=Math.max(.08,iv*.85)}},
 silence:(t,a,b)=>{const i0=Math.round((t+a)*SR),i1=Math.round((t+b)*SR);for(let i=i0-480;i<i0;i++)out[i]*=(i0-i)/480;for(let i=i0;i<i1;i++)out[i]=0;T._sil.push([t+a,t+b])},
 volley:(t,a)=>{for(let k=0;k<40;k++)add(t+a+hash(k+9)*.45,.06,x=>.08*noise()*Math.exp(-x*80)*Math.sin(TAU*900*x))},
 whoosh:(t,a)=>{let lp=0;add(t+a,.7,x=>{const c=.02+.3*x/.7;lp+=c*(noise()-lp);return .3*lp*Math.sin(Math.PI*x/.7)})},
 catch:(t,a)=>add(t+a,.5,x=>.32*Math.sin(TAU*(135*x+28*(1-Math.exp(-x*19))/19))*Math.exp(-x*10)*(1-Math.exp(-x*1500))+.12*Math.sin(TAU*610*x)*Math.exp(-x*37)),
 boom:(t,a)=>{drum(t+a,1.2,42);let lp=0;add(t+a,1,x=>{lp+=.08*(noise()-lp);return .5*lp*Math.exp(-x*4)})},thud:(t,a)=>drum(t+a,.8,60),
 creak:(t,a)=>add(t+a,.7,x=>.12*Math.sign(Math.sin(TAU*(310-120*x)*x))*Math.sin(TAU*7*x)**2*env(x,.7,.03,.2)),
 insects:(t,a,b)=>add(t+a,b-a,x=>.03*Math.sin(TAU*4600*x)*(Math.sin(TAU*14*x)>.3?1:0)*(.5+.5*Math.sin(TAU*.5*x))*env(x,b-a,1,1)),
 steps:(t,a,b)=>{for(let x=a;x<b;x+=.42)add(t+x,.08,y=>.12*noise()*Math.exp(-y*60))},
 fire:(t,a,b,g=1)=>{noiseBed(t+a,t+b,.5*g,.05,false,.8);for(let k=0;k<(b-a)*14;k++)add(t+a+hash(k*3+t)*(b-a),.01,x=>.12*g*noise()*Math.exp(-x*500))},
 pop:(t,a)=>add(t+a,.12,x=>.5*noise()*Math.exp(-x*45)),crack:(t,a)=>add(t+a,.4,x=>.3*noise()*Math.exp(-x*20)+.15*Math.sin(TAU*220*x)*Math.exp(-x*15)),
 crash:(t,a)=>{drum(t+a,1.3,38);let lp=0;add(t+a,1.4,x=>{lp+=.2*(noise()-lp);return .55*lp*Math.exp(-x*3)})},bigDrum:(t,a)=>drum(t+a,1.25,46),
 chop:(t,a)=>{drum(t+a,.6,90);add(t+a,.1,x=>.3*noise()*Math.exp(-x*60))},nail:(t,a)=>add(t+a,.6,x=>.22*(Math.sin(TAU*1800*x)+.6*Math.sin(TAU*2930*x))*Math.exp(-x*9)),
 flap:(t,a,b)=>{let lp=0;add(t+a,b-a,x=>{lp+=.1*(noise()-lp);return .25*lp*Math.max(0,Math.sin(TAU*5.5*x))**3*env(x,b-a,.3,.5)})},
 quacks:(t,a,b)=>{for(let k=0;k<(b-a)*3;k++){const tt=t+a+hash(k+77)*(b-a),f=300+hash(k+78)*200;add(tt,.22,x=>.07*Math.sign(Math.sin(TAU*f*(1-x)*x))*Math.sin(TAU*9*x)**2*Math.sin(Math.PI*x/.22))}},
 walk:(t,a,b)=>{for(let x=a;x<b;x+=.16)add(t+x,.05,y=>.1*(1-(x-a)/(b-a))**1.5*noise()*Math.exp(-y*90))},
 swell:(t,a,b)=>add(t+a,b-a,x=>{const p=x/(b-a);let s=0;for(const f of [110,165,220,277,330])s+=Math.sin(TAU*f*x+f);return .05*s*p*p*env(x,b-a,.5,.8)}),
 chisel:(t,a,b,iv)=>{for(let x=a;x<=b+1e-6;x+=iv)add(t+x,.35,y=>.2*(Math.sin(TAU*2650*y)+.5*Math.sin(TAU*4100*y))*Math.exp(-y*16)+.15*noise()*Math.exp(-y*120))},
 // v3：马蹄（四拍跑步节奏，步幅 0.46s）、乱铃（随机时刻/音高的车铃）
 hooves:(t,a,b,g=1)=>{for(let x=a;x<b;x+=.46)for(const [o,f] of [[0,70],[.07,64],[.19,76],[.25,68]]){const tt=x+o+hash(Math.round(x*100)+o*10)*.02;if(tt<b)add(t+tt,.12,y=>g*(.22*Math.sin(TAU*f*y)*Math.exp(-y*38)+.1*noise()*Math.exp(-y*90))*Math.min(1,(tt-a)/.8))}},
 bellChaos:(t,a,b,n=30)=>{for(let k=0;k<n;k++){const tt=a+hash(k*7+311)*(b-a);bell(t+tt,.35+.4*hash(k*7+312),hash(k*7+313)<.4?1:0,.82+.36*hash(k*7+314))}},
 _sil:[]};
const silences=[];for(const s of SHOTS)for(const [type,...p] of s.sfx){if(type==='silence')continue;T[type](s.start,...p)}
for(const s of SHOTS)for(const [type,...p] of s.sfx)if(type==='silence')T.silence(s.start,...p); // 静音窗最后施加，确保数字零
for(let i=0;i<N;i++)out[i]=.85*Math.tanh(out[i]*1.6);for(const [a,b] of T._sil){for(let i=Math.round(a*SR);i<Math.round(b*SR);i++)out[i]=0}
const QA=root+(process.env.TAG?'qa_'+process.env.TAG+'/':'qa/');fs.mkdirSync(QA,{recursive:true});fs.writeFileSync(QA+'sfx.f32',Buffer.from(out.buffer));fs.writeFileSync(QA+'sfx-events.json',JSON.stringify({sampleRate:SR,duration:DURATION,silences:T._sil,events:SHOTS.flatMap(s=>s.sfx.map(([type,...p])=>({shot:s.id,type,globalStart:+(s.start+p[0]).toFixed(3),params:p})))},null,1));console.log('sfx ok',N/SR);
