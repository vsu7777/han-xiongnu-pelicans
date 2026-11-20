// 共用绘图工具包：确定性、纯函数。所有画面由 (t, seed) 决定。
(function(){
'use strict';
const W=1920,H=1080,TAU=Math.PI*2,SEED=20261120;
const K=window.K={W,H,TAU,SEED,scenes:{}};
const clamp=K.clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const mix=K.mix=(a,b,t)=>a+(b-a)*t;
const smooth=K.smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
K.ease=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
K.easeOut=x=>{x=clamp(x);return 1-Math.pow(1-x,3)};
K.easeIn=x=>{x=clamp(x);return x*x*x};
K.win=(u,a,b)=>clamp((u-a)/(b-a));
const rand=K.rand=i=>{let x=Math.sin(i*127.1+311.7+SEED*0.0131)*43758.5453123;return x-Math.floor(x)};
const wrap=K.wrap=(x,n)=>((x%n)+n)%n;
K.logZoom=(a,b,p)=>Math.exp(mix(Math.log(a),Math.log(b),p));
K.spring=(u,w=14,z=.35)=>{if(u<=0)return 0;const wd=w*Math.sqrt(1-z*z);return 1-Math.exp(-z*w*u)*(Math.cos(wd*u)+z*w/wd*Math.sin(wd*u))};
K.rgba=(hex,a)=>{const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`};
// 分段线性速度的精确积分：keys=[[t,v],...]，返回 d(u)=∫0^u v。纯函数。
K.profile=keys=>u=>{let d=0,prevT=0,prevV=keys[0][1];
 for(const [kt,kv] of keys){if(u<=kt){const vu=kt===prevT?kv:prevV+(kv-prevV)*(u-prevT)/(kt-prevT);return d+(prevV+vu)/2*(u-prevT)}d+=(prevV+kv)/2*(kt-prevT);prevT=kt;prevV=kv}
 return d+prevV*(u-prevT)};
// ---------- 基本图元
K.path=(g,d,fill,stroke,lw=3)=>{const p=new Path2D(d);if(fill){g.fillStyle=fill;g.fill(p)}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.lineJoin='round';g.lineCap='round';g.stroke(p)}};
K.line=(g,x1,y1,x2,y2,c,w=3)=>{g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()};
K.ell=(g,x,y,rx,ry,fill,stroke,w=2,rot=0)=>{g.beginPath();g.ellipse(x,y,Math.max(.01,rx),Math.max(.01,ry),rot,0,TAU);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=w;g.stroke()}};
K.poly=(g,pts,fill,stroke,lw=3,close=true)=>{g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));if(close)g.closePath();if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.lineJoin='round';g.lineCap='round';g.stroke()}};
K.text=(g,s,x,y,size,color,{align='left',weight='',font='"Noto Serif CJK SC",serif',base='alphabetic'}={})=>{g.font=`${weight} ${size}px ${font}`;g.fillStyle=color;g.textAlign=align;g.textBaseline=base;g.fillText(s,x,y);g.textAlign='left';g.textBaseline='alphabetic'};
// 刻字：暗槽+亮边（阴刻），版画刀刻感
K.carved=(g,s,x,y,size,ink,hi,opts={})=>{K.text(g,s,x+size*.03,y+size*.03,size,hi,opts);K.text(g,s,x,y,size,ink,opts)};
// 刀痕排线：沿方向的短刻线，长度/间距由 seed 决定
K.hatch=(g,x,y,w,h,ang,gap,color,lw,id=0,len=60)=>{g.save();g.beginPath();g.rect(x,y,w,h);g.clip();const c=Math.cos(ang),s=Math.sin(ang);const R=Math.hypot(w,h);for(let k=-R;k<R;k+=gap){const off=rand(id+k*.37)*len;for(let q=-R+off;q<R;q+=len*1.6){const cx=x+w/2+(-s)*k+c*q,cy=y+h/2+c*k+s*q;const L=len*(.55+rand(id+k+q)*.45);K.line(g,cx,cy,cx+c*L,cy+s*L,color,lw)}}g.restore()};
// ---------- 四幕配色（原稿色号 + 由其派生的少量墨色/角色色）
K.PAL={
 0:{name:'序',sky:['#16100f','#1e1513','#2a1c18'],ground:['#2a1c18','#211613','#18110f','#100b0a'],ink:'#120c0b',hi:'#e8cfa6',accent:'#b8794d',body:'#efe2c6',shade:'#bba98a',pouch:'#d6974f',pouchHi:'#f2bd71',bill:'#e4ae5e',metal:'#79816b',tire:'#2c1f1a',spoke:'#bd986b',cap:'#6a3b2e',fur:'#af8250',margin:'#1b1211',mText:'#c99b6c'},
 1:{name:'白登',sky:['#1B263B','#2c3b53','#415A77'],ground:['#E0E1DD','#b6bfc9','#8090a3','#415A77'],ink:'#0b1220',hi:'#E0E1DD',accent:'#a83c2e',body:'#ecebe5',shade:'#a9b3bf',pouch:'#c89a68',pouchHi:'#e8c08f',bill:'#d9b27a',metal:'#6f7f90',tire:'#1a2232',spoke:'#c3cbd4',cap:'#3a4a60',fur:'#c9ced6',margin:'#0e1522',mText:'#9fb0c4'},
 2:{name:'漠北',sky:['#3D1917','#D95D39','#F4A261'],ground:['#a64b34','#bd5637','#813824','#51231b'],ink:'#241514',hi:'#F4A261',accent:'#8f2d26',body:'#f2d9ac',shade:'#c5ab7d',pouch:'#d7954d',pouchHi:'#f2bd71',bill:'#e4ae5e',metal:'#79816b',tire:'#38251e',spoke:'#bd986b',cap:'#6a3b2e',fur:'#af8250',margin:'#1b1211',mText:'#c99b6c',deep:'#3D0C02',sand:'#D95D39'},
 3:{name:'郅支',sky:['#0D090A','#170d0e','#2a1112'],ground:['#2a1214','#1d0d0e','#140909','#0D090A'],ink:'#070405',hi:'#FF9F1C',accent:'#9E2A2B',body:'#dccab4',shade:'#8f7563',pouch:'#c47a3c',pouchHi:'#f0a24a',bill:'#d29a4c',metal:'#5c5550',tire:'#1a1010',spoke:'#9b7a5e',cap:'#4a2420',fur:'#9a6a44',margin:'#070405',mText:'#b07a52',fire:['#9E2A2B','#FF9F1C','#ffd27a']},
 4:{name:'燕然',sky:['#102A43','#2B6CB0','#F6AD55'],ground:['#1d3a57','#173049','#11253a','#0b1a2a'],ink:'#07131f',hi:'#F6AD55',accent:'#b8432f',body:'#eae3d2',shade:'#9fb0c0',pouch:'#d29a5e',pouchHi:'#f6c27f',bill:'#ddb06c',metal:'#7a8796',tire:'#0f1b28',spoke:'#b9c6d3',cap:'#33465c',fur:'#a7b2bd',margin:'#07111b',mText:'#9db4cc'}
};
// ---------- 骑行骨架：曲柄、链条、车轮全部由同一个“行驶距离 d”算出（不打滑）
const RIG=K.RIG={R:94,gear:2.5,ringR:22.5,cogR:9,crank:35,bb:[-5,-10],hip:[-63,-169],thigh:100,shin:110,pedalHalf:22,pedalThick:7,ankleUp:15,rear:-165,front:181};
K.pose=d=>{const wheel=d/RIG.R;return {d,wheel,crank:wheel/RIG.gear}};
K.pedalAt=c=>[RIG.bb[0]+RIG.crank*Math.cos(c),RIG.bb[1]+RIG.crank*Math.sin(c)];
function ik(h,a,L1,L2){const dx=a[0]-h[0],dy=a[1]-h[1],d=Math.min(Math.hypot(dx,dy),L1+L2-1e-6);const al=(L1*L1-L2*L2+d*d)/(2*d),pe=Math.sqrt(Math.max(0,L1*L1-al*al));const ux=dx/d,uy=dy/d;const k1=[h[0]+ux*al-uy*pe,h[1]+uy*al+ux*pe],k2=[h[0]+ux*al+uy*pe,h[1]+uy*al-ux*pe];return k1[0]>k2[0]?k1:k2} // 膝盖朝前
K.legSolve=(c,bob)=>{const p=K.pedalAt(c),sole=p[1]-RIG.pedalThick/2,ankle=[p[0]-4,sole-RIG.ankleUp],hip=[RIG.hip[0],RIG.hip[1]+bob];const knee=ik(hip,ankle,RIG.thigh,RIG.shin);return {pedal:p,sole,ankle,hip,knee}};
const {path,line,ell,poly}=K;
function wheel(g,x,ang,P,detail){ell(g,x,0,94,94,P.tire,P.ink,11);ell(g,x,0,86,86,null,P.spoke,3);ell(g,x,0,75,75,null,K.rgba(P.ink,.5),2);const n=detail?16:8;for(let k=0;k<n;k++){const a=k*TAU/n+ang;line(g,x+9*Math.cos(a),9*Math.sin(a),x+83*Math.cos(a),83*Math.sin(a),P.spoke,detail?1.6:2.8)}
 // 气门嘴：一眼能看出轮子转了多少
 const va=ang+.3;ell(g,x+80*Math.cos(va),80*Math.sin(va),5,5,P.hi,P.ink,1.5);ell(g,x,0,10,10,P.spoke,P.ink,2);
 if(detail)path(g,`M ${x-60} -72 Q ${x} -105 ${x+68} -65`,null,K.rgba(P.hi,.6),3)}
function drivetrain(g,c,w,P,detail){const [bx,by]=RIG.bb,rx=RIG.rear;
 line(g,bx,by-RIG.ringR,rx,-RIG.cogR,P.ink,4);line(g,bx,by+RIG.ringR,rx,RIG.cogR,P.ink,4);
 if(detail){const L=Math.hypot(bx-rx,by-RIG.ringR+RIG.cogR),sp=11,off=wrap(c*RIG.ringR,sp); // 链节速度 = 曲柄角速度×牙盘半径 = 轮角速度×飞轮半径
  for(let q=off;q<L;q+=sp){const f=q/L;ell(g,mix(rx,bx,f),mix(-RIG.cogR,by-RIG.ringR,f),1.8,1.8,P.spoke)}
  for(let q=sp-off;q<L;q+=sp){const f=q/L;ell(g,mix(bx,rx,f),mix(by+RIG.ringR,RIG.cogR,f),1.8,1.8,P.spoke)}}
 ell(g,bx,by,RIG.ringR+3,RIG.ringR+3,P.ink,P.spoke,3);for(let k=0;k<5;k++){const a=c+k*TAU/5;line(g,bx,by,bx+RIG.ringR*Math.cos(a),by+RIG.ringR*Math.sin(a),P.spoke,3)}
 ell(g,rx,0,RIG.cogR+2,RIG.cogR+2,P.ink,P.spoke,2);for(let k=0;k<4;k++){const a=w+k*TAU/4;line(g,rx,0,rx+RIG.cogR*Math.cos(a),RIG.cogR*Math.sin(a),P.spoke,1.5)}}
let LD=false;
function legDraw(g,c,far,bob,P){const L=K.legSolve(c,bob),[px,py]=L.pedal;
 // 踏板：始终水平，转轴=曲柄端点
 g.fillStyle=far?K.rgba(P.ink,.85):P.ink;g.fillRect(px-RIG.pedalHalf,py-RIG.pedalThick/2,RIG.pedalHalf*2,RIG.pedalThick);
 const col=far?P.shade:P.bill,lw=far?13:17;path(g,`M ${L.hip[0]} ${L.hip[1]} L ${L.knee[0]} ${L.knee[1]} L ${L.ankle[0]} ${L.ankle[1]}`,null,P.ink,lw+5);path(g,`M ${L.hip[0]} ${L.hip[1]} L ${L.knee[0]} ${L.knee[1]} L ${L.ankle[0]} ${L.ankle[1]}`,null,col,lw);
 // 蹼足：脚掌底边精确落在踏板上表面 L.sole
 if(LD&&!far){for(let i=1;i<5;i++){const f=i/5;for(const [a,b] of [[L.hip,L.knee],[L.knee,L.ankle]]){const x=mix(a[0],b[0],f),y=mix(a[1],b[1],f),dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;line(g,x-nx*6,y-ny*6,x+nx*2+dx/d*4,y+ny*2+dy/d*4,K.rgba(P.ink,.55),2)}}}
 const ax=L.ankle[0],s=L.sole;poly(g,[[ax-3,L.ankle[1]],[ax+8,L.ankle[1]+2],[ax+36,s-3],[ax+40,s],[ax+28,s-1],[ax+22,s],[ax+12,s-1],[ax+4,s],[ax-14,s],[ax-9,s-6]],far?P.shade:P.pouch,P.ink,2.5);
 return L}
K.legDraw=legDraw;
// 单车（二八大杠：水平上管、菱形车架、后货架）——可单独画（废车/倒置拒马）
K.bike=function(g,o){const P=o.pal,c=o.crank||0,w=o.wheel||0,detail=o.detail!==false,fc=o.frame||P.metal,bend=o.bend||0;
 wheel(g,RIG.rear,w,P,detail);g.save();if(o.frontOff){g.translate(o.frontOff[0],o.frontOff[1]);g.rotate(o.frontOff[2]||0)}wheel(g,RIG.front,o.frontWheel!==undefined?o.frontWheel:w,P,detail);g.restore();
 drivetrain(g,c,w,P,detail);
 const b=bend*40;const fr=`M -165 0 L -82 -157 Q ${11+b*.4} ${-157+b} 104 -157 L 181 0 M -5 -10 L -82 -157 M -5 -10 L 104 -157 M -165 0 L -5 -10`;
 path(g,fr,null,P.ink,13);path(g,fr,null,fc,5);
 path(g,'M -82 -155 L -85 -181 M 104 -156 L 129 -218 L 163 -222 L 176 -207',null,P.ink,12);g.save();if(o.barRot){g.translate(129,-218);g.rotate(o.barRot);g.translate(-129,218)}path(g,'M 105 -157 L 130 -219 L 161 -222',null,K.rgba(P.hi,.7),4);path(g,'M 130 -219 L 163 -222 L 176 -207',null,P.ink,10);
 // 车铃
 ell(g,150,-232,10,7,P.spoke,P.ink,2);g.restore();
 path(g,'M -116 -181 Q -94 -196 -58 -183 L -53 -176 L -113 -172 Z',P.cap,P.ink,4);line(g,-240,-125,-105,-125,P.ink,7);line(g,-238,-122,-187,-50,P.ink,5);
 if(detail)path(g,'M -243 -13 Q -251 -68 -204 -90',null,K.rgba(P.hi,.8),3)};
function crankArm(g,c,P){const p=K.pedalAt(c);line(g,RIG.bb[0],RIG.bb[1],p[0],p[1],P.ink,8);line(g,RIG.bb[0],RIG.bb[1],p[0],p[1],P.spoke,4);ell(g,RIG.bb[0],RIG.bb[1],7,7,P.spoke,P.ink,2)}
// 鹈鹕头（长喙+喉囊），局部坐标与骑手一致；供骑手、站姿、飞行复用
K.head=function(g,P,o){const drop=(o.drop||0)*60,puff=(o.puff||0)*85,detail=o.detail!==false,alert=o.alert||0;
 path(g,`M 59 -402 L 273 -389 L 257 ${-373+drop} Q 137 ${-356+drop+puff} 62 -369 Z`,K.rgba(P.ink,.85),P.ink,4);
 path(g,`M 62 -374 L 260 ${-374+drop} Q 190 ${-284+drop+puff} 117 ${-302+drop+puff} Q 69 ${-312+drop+puff*.4} 62 -374 Z`,P.pouch,P.ink,4);
 path(g,`M 78 -363 Q 121 ${-303+drop+puff} 227 ${-363+drop}`,null,P.pouchHi,3);
 if(detail)for(let i=0;i<8;i++)path(g,`M ${87+i*14} ${-357+drop*.2} Q ${94+i*13} ${-321+drop+puff*.8} ${105+i*13} ${-323+drop+puff*.8}`,null,K.rgba(P.ink,.35),1.5);
 path(g,'M 63 -414 Q 101 -427 169 -411 L 284 -390 Q 277 -380 260 -384 L 67 -392 Z',P.bill,P.ink,4);path(g,'M 81 -409 L 245 -391',null,K.rgba(P.hi,.7),3);path(g,'M 267 -390 L 281 -389 L 271 -380 Z',P.cap,P.ink,2);
 const pr=o.pupil||1;ell(g,62,-418,11,12,'#fff6dc',P.ink,2);ell(g,64+alert*3,-418,(4-alert)*pr,(6+alert)*pr,P.ink);
 path(g,`M 42 ${-434-alert*4} Q 56 ${-441-alert*6} 75 ${-434-alert*3}`,null,P.ink,4);
 if(o.cap!==false){const cy=o.capHop||0;g.save();g.translate(0,-cy);g.rotate(-cy*.004);path(g,'M 18 -439 Q 11 -485 48 -517 Q 81 -498 94 -450 L 87 -437 Z',o.capColor||P.cap,P.ink,5);path(g,'M 17 -450 Q 55 -467 91 -452 L 99 -434 Q 61 -444 17 -430 Z',P.fur,P.ink,4);if(detail)for(let i=0;i<10;i++)line(g,21+i*7,-448+Math.sin(i)*2,20+i*7,-435+Math.sin(i+1)*2,K.rgba(P.hi,.7),2);g.restore()}};
function bodyDraw(g,P,detail){path(g,'M -181 -224 Q -216 -257 -205 -300 L -170 -277 Q -131 -328 -72 -309 Q 5 -317 36 -265 Q 73 -221 27 -187 Q -45 -156 -113 -187 L -176 -171 L -156 -200 Z',P.body,P.ink,7);path(g,'M -172 -226 Q -99 -277 -12 -233 Q -43 -195 -112 -198 Z',P.shade,P.ink,3);
 if(detail){for(let i=0;i<9;i++){const xx=-169+i*17;path(g,`M ${xx} -235 Q ${xx+15} -215 ${xx+37} -224`,null,K.rgba(P.ink,.45),2.3)}for(let i=0;i<6;i++)line(g,-182+i*13,-279-i*2,-165+i*13,-263-i*2,K.rgba('#ffffff',.6),3)}
 path(g,'M -13 -241 C 43 -273 -13 -354 28 -406 Q 51 -446 86 -420 Q 112 -392 79 -367 C 55 -342 91 -274 28 -224 Z',P.body,P.ink,6);path(g,'M 22 -249 Q 55 -281 36 -329 Q 22 -368 47 -397',null,P.shade,12);
 if(detail){for(let i=0;i<7;i++){const yy=-262-i*20,xo=i<3?0:(i-3)*2;path(g,`M ${4+xo+Math.sin(i)*4} ${yy} Q ${28+xo} ${yy-9} ${54+xo} ${yy+1}`,null,K.rgba(P.ink,.32),2)}for(let i=0;i<7;i++){const xx=-140+i*24;path(g,`M ${xx} -200 Q ${xx+10} -186 ${xx+24} -190`,null,K.rgba(P.ink,.3),2)}for(let i=0;i<5;i++)path(g,`M ${-120+i*28} -300 Q ${-104+i*28} -292 ${-92+i*28} -296`,null,K.rgba(P.ink,.3),1.8)}}
K.bodyDraw=bodyDraw;
function wingGrip(g,P,detail,press){const py=press||0;path(g,`M -67 -270 Q -18 -288 46 -248 Q 85 -225 132 ${-222+py} L 157 ${-218+py} Q 170 ${-204+py} 157 ${-196+py} Q 101 -199 55 -213 Q -15 -222 -71 -242 Z`,P.shade,P.ink,4);if(detail){for(let i=0;i<6;i++)path(g,`M ${-43+i*22} ${-253+i*4} L ${-16+i*22} ${-239+i*4}`,null,K.rgba(P.ink,.4),2);for(let i=0;i<4;i++)path(g,`M ${-52+i*30} ${-262+i*5} Q ${-30+i*30} ${-266+i*5} ${-10+i*30} ${-256+i*5}`,null,K.rgba(P.hi,.35),1.6)}}
K.wingGripV2=wingGrip;
// 骑车鹈鹕：o.pose 来自 K.pose(d)
K.rider=function(g,x,y,s,o={}){const P=o.pal||K.PAL[2],detail=o.detail!==false,face=o.face||1,pose=o.pose||K.pose(0),c=pose.crank,w=pose.wheel;const bob=o.bob!==undefined?o.bob:Math.sin(c*2)*3;
 g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);g.scale(face*s,s);if(o.alpha!==undefined)g.globalAlpha*=o.alpha;
 if(o.shadow!==false)ell(g,0,95,280,16,K.rgba(P.ink,.3));
 LD=detail;legDraw(g,c+Math.PI,true,bob,P);
 (o.bikeFn||K.bike)(g,{pal:P,crank:c,wheel:w,detail,frame:o.frame});
 g.save();g.translate(0,bob);bodyDraw(g,P,detail);if(o.overlay)o.overlay(g,P,detail);wingGrip(g,P,detail,o.press);K.head(g,P,o);g.restore();
 legDraw(g,c,false,bob,P);LD=false;crankArm(g,c,P);
 if(o.ring){g.globalAlpha*=o.ring;for(let k=0;k<3;k++){g.beginPath();g.arc(150,-232,18+k*12,-2.3,-.5);g.strokeStyle=P.hi;g.lineWidth=3;g.stroke()}}
 g.restore()};
// 骑手局部点 → 屏幕
K.riderPt=(x,y,s,face,lx,ly)=>[x+face*s*lx,y+s*ly];
// 步行鹈鹕（无车），phase 为步态相位
K.walker=function(g,x,y,s,o={}){const P=o.pal,ph=o.phase||0,face=o.face||1,detail=o.detail!==false;g.save();g.translate(x,y);g.scale(face*s,s);if(o.alpha!==undefined)g.globalAlpha*=o.alpha;
 ell(g,0,4,150,12,K.rgba(P.ink,.3));const lift=k=>Math.max(0,Math.sin(ph+k*Math.PI))*26,stride=k=>Math.cos(ph+k*Math.PI)*38;
 for(const k of [1,0]){const fx=stride(k),fy=-lift(k);path(g,`M ${-40+k*16} -120 L ${-30+fx*.5+k*10} -60 L ${fx} ${fy-6}`,null,P.ink,k?14:18);path(g,`M ${-40+k*16} -120 L ${-30+fx*.5+k*10} -60 L ${fx} ${fy-6}`,null,k?P.shade:P.bill,k?9:12);poly(g,[[fx-14,fy],[fx+34,fy],[fx+26,fy-6],[fx+6,fy-10]],P.pouch,P.ink,2.5)}
 const rock=Math.sin(ph*2)*.05;g.rotate(rock);g.translate(40,75);bodyDraw(g,P,detail);g.save();g.translate(0,8);wingGrip(g,P,detail,30);g.restore();K.head(g,P,{detail,cap:o.cap,drop:o.drop||0});g.restore()};
// 飞行鹈鹕：flap 0..1
K.flyer=function(g,x,y,s,o={}){const P=o.pal,f=Math.sin(o.flap||0),face=o.face||1;g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);g.scale(face*s,s);if(o.alpha!==undefined)g.globalAlpha*=o.alpha;
 const wy=-f*120;path(g,`M -40 -10 Q -60 ${wy-40} -170 ${wy-60} Q -120 ${wy*0.5} -20 20 Z`,P.shade,P.ink,4);
 path(g,'M -150 0 Q -80 -60 40 -30 Q 110 -20 120 5 Q 40 40 -80 30 L -170 30 Z',P.body,P.ink,5);
 g.save();g.translate(60,-20);g.scale(.62,.62);g.translate(-60,400);K.head(g,P,{drop:o.drop||.4,cap:false,detail:o.detail});g.restore();
 path(g,`M -20 -10 Q 0 ${-wy*0.6-50} 120 ${-wy*0.8-70} Q 70 ${-wy*0.3} 10 20 Z`,P.body,P.ink,4);if(o.detail!==false)for(let i=0;i<4;i++)line(g,30+i*20,-wy*0.5-20-i*6,50+i*20,-wy*0.6-36-i*6,P.ink,2);
 line(g,-150,20,-200,40,P.bill,8);g.restore()};
// ---------- 群体缓存 + LOD：16相位骑行循环。16辐条、齿比2.5 → 一圈曲柄内车轮转2.5圈，辐条对称所以循环无缝。
const spr=new Map();
K.crowdRider=function(g,x,y,s,crank,face,P,frame,cap){
 if(s>.62){K.rider(g,x,y,s,{pal:P,pose:{crank,wheel:crank*RIG.gear},face,detail:false,frame,capColor:cap});return}
 const lod=s>.26?.6:s>.1?.26:.1;const k=Math.floor(wrap(crank,TAU)/TAU*16)%16;const key=[P.name,frame,cap,lod,k].join('|');let c=spr.get(key);
 if(!c){c=document.createElement('canvas');c.width=Math.ceil(580*lod);c.height=Math.ceil(660*lod);const q=c.getContext('2d');q.translate(270*lod,545*lod);K.rider(q,0,0,lod,{pal:P,pose:{crank:k/16*TAU,wheel:k/16*TAU*RIG.gear},detail:lod>=.6,frame,capColor:cap});spr.set(key,c)}
 g.save();g.translate(x,y);g.scale(face,1);g.drawImage(c,-270*s,-545*s,580*s,660*s);g.restore()};
const wspr=new Map();
K.crowdWalker=function(g,x,y,s,phase,face,P){if(s>.5){K.walker(g,x,y,s,{pal:P,phase,face});return}
 if(s<.03){ell(g,x,y-4,Math.max(1.2,s*80),Math.max(1.2,s*120),P.ink);return}
 const lod=s>.18?.5:.18,k=Math.floor(wrap(phase,TAU)/TAU*12)%12,key=[P.name,lod,k].join('|');let c=wspr.get(key);
 if(!c){c=document.createElement('canvas');c.width=Math.ceil(520*lod);c.height=Math.ceil(620*lod);const q=c.getContext('2d');q.translate(200*lod,580*lod);K.walker(q,0,0,lod,{pal:P,phase:k/12*TAU,detail:lod>=.5});wspr.set(key,c)}
 g.save();g.translate(x,y);g.scale(face,1);g.drawImage(c,-200*s,-580*s,520*s,620*s);g.restore()};
// ---------- 汉军人物
K.horseman=function(g,x,y,s,t,id,P,o={}){g.save();g.translate(x,y);g.scale((o.face||1)*s,s);const q=o.gallop?t*9+id:Math.sin(t*3+id)*.5,ink=P.ink,hi=P.hi;
 ell(g,-17,-88,111,43,ink,hi,2);path(g,'M 54 -98 Q 60 -176 87 -185 L 122 -160 L 155 -135 L 151 -109 L 100 -118 L 83 -57 Z',ink,hi,2);path(g,'M 80 -177 L 81 -212 L 94 -189 L 103 -211 L 108 -180',ink,hi,2);path(g,'M -115 -102 Q -160 -103 -158 -39 Q -142 -71 -123 -65',ink,hi,2);
 for(let k=0;k<4;k++){const xx=-85+k*49,sw=o.gallop?Math.sin(q+k*1.6)*30:Math.max(0,Math.sin(q+k))*10;path(g,`M ${xx} -66 L ${xx+sw*.4} -10 L ${xx+sw+8} 12`,null,ink,12);if(o.sparks&&Math.sin(q+k*1.6)>.9){for(let j=0;j<4;j++)ell(g,xx+sw+10+j*9,10-j*7,2.5,2.5,'#ffcf7a')}}
 path(g,'M -33 -137 L -28 -237 L 26 -235 L 42 -133 Z',ink,hi,2);ell(g,0,-259,22,26,ink,hi,2);path(g,'M -27 -266 Q -7 -317 27 -270 Z',ink,hi,2);
 line(g,30,-183,92,-303,ink,9);line(g,91,-302,130,-455,ink,5);path(g,'M 130 -455 L 125 -490 L 140 -463 Z',hi,ink,2);line(g,124,-440,150,-430,ink,4); // 戟：矛头+横枝
 for(let i=0;i<4;i++)line(g,-21,-224+i*18,24,-224+i*18,K.rgba(hi,.6),2);g.restore()};
// 步兵：weapon 'dao' 环首刀 / 'ji' 戟 / 'bow' 弩
K.soldier=function(g,x,y,s,o={}){const P=o.pal,ph=o.phase||0,run=o.run||0,ink=P.ink,hi=o.rim||P.hi;g.save();g.translate(x,y);g.scale((o.face||1)*s,s);g.rotate(run*.18);
 for(const k of [0,1]){const a=Math.sin(ph+k*Math.PI)*(.25+run*.5);g.save();g.translate(0,-95);g.rotate(a);path(g,'M -10 0 L -14 50 L -8 95 L 14 95 L 10 50 L 12 0 Z',ink,hi,1.5);g.restore()}
 path(g,'M -30 -100 L -26 -190 L 28 -190 L 34 -100 Z',ink,hi,2);for(let i=0;i<4;i++)line(g,-24,-178+i*18,26,-178+i*18,K.rgba(hi,.45),2);
 ell(g,0,-210,18,21,ink,hi,2);path(g,'M -22 -214 Q 0 -252 22 -214 Z',ink,hi,2);
 const arm=o.arm!==undefined?o.arm:Math.sin(ph)*.3;g.save();g.translate(14,-180);g.rotate(arm);line(g,0,0,40,40,ink,10);
 if(o.weapon==='dao'){line(g,40,40,110,-20,K.rgba(hi,.9),5);ell(g,36,44,8,8,null,hi,3)}else if(o.weapon==='ji'){line(g,40,40,80,-200,ink,5);path(g,'M 80 -200 L 78 -230 L 90 -205 Z',hi,ink,2)}else if(o.weapon==='bow'){line(g,40,40,90,20,ink,6);line(g,70,0,95,50,hi,3)}
 g.restore();if(o.torch){ell(g,60,-230,10+Math.sin(o.t*30)*3,16,'#FF9F1C')}g.restore()};
K.flag=function(g,x,y,s,t,P,o={}){g.save();g.translate(x,y);g.rotate(o.rot||0);g.scale(s,s);line(g,0,0,0,-360,P.ink,6);const st=o.stiff?0.15:1,w=Math.sin(t*6+x*.01)*12*st,w2=Math.sin(t*4.3+1)*8*st;
 path(g,`M 2 -350 C 65 ${-370+w2} 130 ${-330+w} 206 ${-344-w} L 185 ${-235+w2} C 115 ${-222+w} 50 -265 3 -239 Z`,o.color||P.accent,P.ink,3);
 if(o.text!==false)K.text(g,o.text||'漢',68,-270,58,o.textColor||P.hi,{weight:'bold'});
 if(o.ice){for(let i=0;i<7;i++){const xx=14+i*27,yy=-240+i*2;poly(g,[[xx,yy],[xx+8,yy],[xx+4,yy+18+rand(i)*20]],'#e8eef5',P.ink,1)}}g.restore()};
// 火焰：分层刻出的火舌，按时间每两帧“换刀”（有意的沸腾感）
K.flame=function(g,x,y,sz,t,id,P){const tt=Math.floor(t*15)/15,F=P.fire||['#9E2A2B','#FF9F1C','#ffd27a'];for(let L=0;L<3;L++){const sc=sz*(1-L*.28);g.beginPath();g.moveTo(x-sc*.5,y);for(let k=0;k<=6;k++){const f=k/6,xx=x-sc*.5+f*sc,hh=sc*(1.1+.6*Math.sin(f*Math.PI))*(.6+.4*rand(id*31+k+Math.floor(tt*15)*7+L));g.lineTo(xx,y-hh*Math.sin(f*Math.PI+.05))}g.lineTo(x+sc*.5,y);g.closePath();g.fillStyle=F[L];g.fill()}};
// ---------- 纸张肌理（与时间无关，首用即建）
let tex=null;K.paper=function(g,a=.5){if(!tex){tex=document.createElement('canvas');tex.width=W;tex.height=H;const c=tex.getContext('2d');for(let i=0;i<29000;i++){const x=rand(i*5)*W,y=rand(i*5+1)*H;c.fillStyle=i%3?'rgba(38,13,4,.14)':'rgba(253,229,182,.21)';c.fillRect(x,y,rand(i*5+2)*3+.3,.6+rand(i*5+3)*1.3)}for(let i=0;i<270;i++){c.strokeStyle='rgba(255,217,161,.035)';c.beginPath();c.moveTo(0,i*4);c.bezierCurveTo(450,i*4+5,1360,i*4-4,W,i*4+1);c.stroke()}}g.globalAlpha=a;g.drawImage(tex,0,0);g.globalAlpha=1};
// 雪/沙/火星粒子：粒子 id 稳定，位置 = 解析函数(t)
K.particles=function(g,t,n,o){const {vx,vy,color,len=10,lw=1.5,alpha=.4,id=0,area=[0,0,W,H]}=o;for(let i=0;i<n;i++){const sp=.6+rand(i+id+3)*.8,x=area[0]+wrap(rand(i+id)*area[2]+t*vx*sp,area[2]),y=area[1]+wrap(rand(i+id+1)*area[3]+t*vy*sp,area[3]);g.globalAlpha=alpha*(.4+rand(i+id+2)*.6);const L=len*sp;const m=Math.hypot(vx,vy)||1;line(g,x,y,x+vx/m*L,y+vy/m*L,color,lw*sp)}g.globalAlpha=1};
// 镜头
K.cam=(g,cx,cy,z,rot=0,sx=W/2,sy=H/2)=>{g.translate(sx,sy);g.rotate(rot);g.scale(z,z);g.translate(-cx,-cy)};
K.shake=(u,evs,amp=14,dec=6)=>{let x=0,y=0;for(const e of evs){const d=u-e;if(d>=0&&d<1.2){const a=amp*Math.exp(-d*dec);x+=a*Math.sin(d*71+e);y+=a*Math.cos(d*53+e*2)}}return [x,y]};
K.sky=(g,P,y0=64,y1=1016)=>{const gr=g.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,P.sky[0]);gr.addColorStop(.55,P.sky[1]);gr.addColorStop(1,P.sky[2]);g.fillStyle=gr;g.fillRect(-4000,-4000,12000,12000)};
K.ridge=function(g,y,amp,fq,off,color,o={}){g.beginPath();g.moveTo(o.x0??-200,H+400);for(let x=o.x0??-200;x<=(o.x1??W+200);x+=24){g.lineTo(x,y+Math.sin((x+off)*fq+(o.ph||0))*amp+Math.sin((x+off)*fq*2.3+1+(o.ph||0))*amp*.3)}g.lineTo(o.x1??W+200,H+400);g.closePath();g.fillStyle=color;g.fill();
 if(o.cut){for(let k=0;k<(o.n||30);k++){const x=(o.x0??-200)+wrap(k*97+off*.0,((o.x1??W+200)-(o.x0??-200))),yy=y+Math.sin((x+off)*fq+(o.ph||0))*amp+18+rand(k+(o.id||0))*70;line(g,x,yy,x+24+rand(k+9)*60,yy+6,o.cut,1.5)}}};
})();
