// 第四幕 燕然勒功：苍茫青金、破晓
(function(){const P=K.PAL[4],{TAU,rand,mix,smooth,line,ell,path,poly}=K;
// 前景锈蚀车轮残骸：与时间无关，缓存一次（带景深虚化）
let fg=null;function fgLayer(){if(fg)return fg;fg=document.createElement('canvas');fg.width=1920;fg.height=1080;const q=fg.getContext('2d');q.filter='blur(3px)';const rust={...P,tire:'#3a2418',spoke:'#8a5a38',metal:'#6b4a32',ink:'#120a06',hi:'#b0784a'};
 for(let i=0;i<9;i++){q.save();q.translate(80+i*230+rand(i)*60,1010+rand(i+1)*40);q.rotate((rand(i+2)-.5)*.9);q.scale(.8+rand(i+3)*.4,.35+rand(i+4)*.2);K.bike(q,{pal:rust,wheel:rand(i)*6,frontWheel:rand(i+5)*6,bend:rand(i+6),barRot:rand(i+7)-.5,detail:true});q.restore()}
 for(let i=0;i<6;i++){K.ell(q,200+i*300,990,22,16,'#8a5a38','#120a06',3)}q.filter='none';return fg}
// 4-1 路径：屏幕位置/尺度随 s 变化。脚步相位 = 局部步行距离 / 每周期身体前进量（脚掌钉地不打滑）
const PX=s=>mix(1750,90,Math.pow(s,.8)),PY=s=>mix(905,712,Math.pow(s,.55)),PS=s=>mix(.42,.012,Math.pow(s,.45));
const DIST=[0];{const n=1200;for(let i=1;i<=n;i++){const a=(i-1)/n*1.1+1e-4,b=i/n*1.1+1e-4;DIST.push(DIST[i-1]+Math.hypot(PX(b)-PX(a),PY(b)-PY(a))/PS((a+b)/2))}}
const distAt=s=>{const f=K.clamp(s/1.1)*1200,i=Math.floor(f);return i>=1200?DIST[1200]:mix(DIST[i],DIST[i+1],f-i)};
K.scenes['4-1']=function(g,u){K.sky(g,{sky:['#1b3a5a','#2B6CB0','#7a9cc0']});
 poly(g,[[-100,700],[2020,700],[2020,1100],[-100,1100]],P.ground[0]);K.hatch(g,0,705,1920,300,0,14,K.rgba('#9fb8d0',.25),1.3,2,90);
 // 长龙：拉开间距，沿路径远去（s 随时间增大），尺度递减至小黑点
 const N=24,items=[];for(let i=0;i<N;i++){const s0=i/N*1.6-.62+u*.07+rand(i+800)*.02;if(s0<0||s0>1.08)continue;const sp=Math.min(s0,1);
  const ph=K.TAU*distAt(sp)/K.WALK.bodyPerCycle+rand(i+801)*K.TAU;items.push({x:PX(sp)+(rand(i+802)-.5)*40*PS(sp)/.42,y:PY(sp),sc:PS(sp),ph})}
 items.sort((a,b)=>a.y-b.y);for(const b of items)K.crowdWalker(g,b.x,b.y,b.sc,b.ph,-1,P);
 g.drawImage(fgLayer(),0,0)};
// 4-2 甩镜回东方：日出照亮燕然山。山体刀痕 = 顺山势的等高刻线 + 沿坡向下的沟壑线（不再是斜向短线）
const MTN=[[-100,1100],[200,820],[560,640],[820,430],[960,360],[1120,450],[1400,650],[1700,800],[2020,1100]];
const mtnY=x=>{for(let i=1;i<MTN.length;i++)if(x<=MTN[i][0]){const a=MTN[i-1],b=MTN[i];return mix(a[1],b[1],(x-a[0])/(b[0]-a[0]))}return 1100};
function mtnCuts(g,col){for(let k=1;k<22;k++){const f=k/22;g.beginPath();let on=false;for(let x=-80;x<=2000;x+=12){const top=mtnY(x),y=top+(1100-top)*f*f*.9+Math.sin(x*.013+k)*6*f;const gap=rand(Math.floor(x/70)*31+k*7)<.4;if(gap||y>1090){on=false;continue}on?g.lineTo(x,y):g.moveTo(x,y);on=true}g.strokeStyle=col;g.lineWidth=3.4-f*2;g.stroke()}
 for(let k=0;k<10;k++){const side=k%2?1:-1,x0=960+side*(30+rand(k+900)*260),y0=mtnY(x0)+14;g.beginPath();g.moveTo(x0,y0);for(let q=1;q<=6;q++){g.lineTo(x0+side*q*q*1.6,y0+q*34)}for(let q=6;q>=1;q--){g.lineTo(x0+side*q*q*1.6+side*(7-q)*1.1,y0+q*34)}g.closePath();g.fillStyle=col;g.fill()}}
K.scenes['4-2']=function(g,u){const w=K.easeOut(K.win(u,0,.6));K.sky(g,P);
 const sunY=mix(820,610,K.easeOut(K.win(u,.6,4.5)));ell(g,960,sunY,150,150,'#f6c27f');
 const ray=K.smooth(K.win(u,1,3));g.globalAlpha=.35*ray;for(let k=0;k<22;k++){const a=-Math.PI+k/21*Math.PI,L=1400*ray;poly(g,[[960,sunY],[960+Math.cos(a-.02)*L,sunY+Math.sin(a-.02)*L],[960+Math.cos(a+.02)*L,sunY+Math.sin(a+.02)*L]],'#fbe3b8')}g.globalAlpha=1;
 for(let k=0;k<4;k++){g.globalAlpha=.6;ell(g,300+k*450+u*20,260+k*40,420,40,k%2?'#2B6CB0':'#3d7ab8');g.globalAlpha=1}
 poly(g,MTN,'#0f2338',P.ink,5);g.save();g.beginPath();MTN.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();g.clip();mtnCuts(g,K.rgba('#2B6CB0',.35));
 const lit=K.easeOut(K.win(u,1.5,5));g.beginPath();g.rect(0,1100-lit*760,1920,lit*760);g.clip();mtnCuts(g,'#F6AD55');g.restore();
 K.flag(g,962,362,.55,u,P,{color:lit>.9?'#c8452f':'#5a2a26'});
 if(u<.6){g.globalAlpha=.7*(1-w);for(let k=0;k<60;k++){const y=70+rand(k)*940;line(g,0,y,1920,y,'#0b1a2a',8)}g.globalAlpha=1}};
// 4-3 凿石刻铭：竖排右起
const COLS=['封燕然山铭','铄王师兮征荒裔','剿凶虐兮截海外'];const CH=[];COLS.forEach((c,ci)=>[...c].forEach((ch,k)=>CH.push({ch,x:1330-ci*230,y:190+k*112+(ci===0?50:0)})));
const STRIKE=i=>1.0+i*.5;K.chIdx=CH;
function stone(g){g.fillStyle='#55626f';g.fillRect(-500,-500,3000,2200);for(let i=0;i<60;i++){const x=rand(i)*1920,y=rand(i+1)*1080;line(g,x,y,x+rand(i+2)*200-100,y+rand(i+3)*120,K.rgba('#2a3440',.5),2)}K.hatch(g,0,0,1920,1080,.6,22,K.rgba('#8fa0b0',.25),2,9,80)}
// 起刀点：每字第一笔的起点
const startPt=(c,sz)=>K.cqStart(c.ch,c.x,c.y-36,sz);
// 石匠：左手握铁凿（四指绕杆、拇指压杆），右手持铁锤横击凿顶；刃口 = 当前笔画刀尖
const SKIN='#d8b088',SKD='#9c7352',ROBE='#3e4c5a';
function mason(g,tip,u,swing,recoil){g.save();g.translate(tip[0],tip[1]);g.scale(-1,1);g.translate(-tip[0],-tip[1]);swing=-swing;const ink=P.ink,dx=.62,dy=-.78,px=.78,py=.62;const [tx,ty]=[tip[0]+dx*recoil,tip[1]+dy*recoil],Lc=290,hx=tx+dx*Lc,hy=ty+dy*Lc;
 // 左前臂（粗麻袖）向右平伸出画，避开已刻字列
 const gx=tx+dx*150,gy=ty+dy*150;path(g,`M ${gx+10} ${gy+38} Q ${gx+200} ${gy+70} ${gx+700} ${gy+110} L ${gx+700} ${gy+30} Q ${gx+220} ${gy+6} ${gx+20} ${gy-20} Z`,ROBE,ink,4);for(let k=0;k<5;k++)line(g,gx+140+k*90,gy+20+k*10,gx+190+k*90,gy+60+k*10,K.rgba('#9fb0c0',.35),2);
 // 凿杆：八棱铁凿，刃口斜磨，顶端被锤打成蘑菇头
 const sh=(w1,w2,c,lw)=>poly(g,[[tx+px*w1,ty+py*w1],[hx+px*w2,hy+py*w2],[hx-px*w2,hy-py*w2],[tx-px*w1,ty-py*w1]],c,lw?ink:null,lw);
 sh(5,9,'#4b5561',3);line(g,tx+px*2,ty+py*2,hx+px*4,hy+py*4,'#9aa8b6',2.5);line(g,tx-px*3,ty-py*3,hx-px*6,hy-py*6,'#2a323b',2);
 poly(g,[[tx,ty],[tx+dx*18+px*5,ty+dy*18+py*5],[tx+dx*18-px*5,ty+dy*18-py*5]],'#d3dde6',ink,1.5);
 ell(g,hx,hy,16,9,'#5c6672',ink,2.5,Math.atan2(dy,dx)+Math.PI/2);
 // 手：手背/掌 + 四指（垂直于凿杆的圆角指节）+ 拇指
 g.save();g.translate(gx,gy);g.rotate(Math.atan2(dy,dx));
 path(g,'M -30 -8 Q -46 30 -10 52 Q 30 60 52 40 Q 62 18 40 -6 Z',SKIN,ink,3);
 for(let k=0;k<4;k++){const x=-24+k*16;path(g,`M ${x} 10 Q ${x-3} -16 ${x+5} -22 Q ${x+15} -24 ${x+15} -14 L ${x+13} 12 Z`,k%2?SKIN:'#e2bc94',ink,2.5);line(g,x+2,-12,x+12,-13,K.rgba(SKD,.9),1.5)}
 path(g,'M 34 2 Q 30 -18 4 -14 Q -10 -12 -14 -4 Q 2 -2 28 12 Z',SKIN,ink,2.5);ell(g,-8,-8,5,3.5,'#f0d6b8',ink,1);
 for(let k=0;k<3;k++)line(g,-14+k*14,32,0+k*14,44,K.rgba(SKD,.8),2);g.restore();
 // 右臂 + 铁锤：以手腕为轴摆动，接触时锤面贴住凿顶
 const H0x=hx+dx*24,H0y=hy+dy*24,wx=H0x+px*175,wy=H0y+py*175,ca=Math.cos(swing),sa=Math.sin(swing),rx=(H0x-wx)*ca-(H0y-wy)*sa+wx,ry=(H0x-wx)*sa+(H0y-wy)*ca+wy;
 path(g,`M ${wx-24} ${wy-22} Q ${wx+200} ${wy-90} ${wx+700} ${wy-150} L ${wx+700} ${wy-70} Q ${wx+200} ${wy+10} ${wx+16} ${wy+30} Z`,ROBE,ink,4);for(let k=0;k<4;k++)line(g,wx+120+k*110,wy-40-k*14,wx+170+k*110,wy-6-k*14,K.rgba('#9fb0c0',.35),2);
 line(g,wx,wy,rx,ry,ink,16);line(g,wx,wy,rx,ry,'#7a5232',10);
 g.save();g.translate(rx,ry);g.rotate(Math.atan2(wy-ry,wx-rx));poly(g,[[-20,-44],[22,-44],[26,44],[-24,44]],'#39424c',ink,3);line(g,-18,-40,-18,40,'#8a98a6',3);g.restore();
 g.save();g.translate(wx,wy);g.rotate(Math.atan2(ry-wy,rx-wx));path(g,'M -24 -26 Q 10 -34 30 -18 Q 40 0 30 18 Q 8 32 -26 24 Z',SKIN,ink,3);for(let k=0;k<3;k++)line(g,4+k*9,-20,4+k*9,20,K.rgba(SKD,.9),2);g.restore();g.restore()}
K.scenes['4-3']=function(g,u){const z=K.logZoom(1,1.12,u/11);g.save();K.cam(g,1000,540,z);stone(g);
 let tip=startPt(CH[0],96);
 CH.forEach((c,k)=>{const t0=STRIKE(k);if(u<t0)return;const p=Math.min(1,(u-t0)/.45);const r=K.cq(g,c.ch,c.x,c.y-36,96,'#1d2631',{prog:p,hi:'#a9b7c4',wmul:1.05});
  if(u<t0+.45)tip=r.tip||startPt(c,96);else if(u<t0+.5&&k+1<CH.length){const nx=startPt(CH[k+1],96),q=K.smooth((u-t0-.45)/.05);const e=r.tip;tip=[mix(e[0],nx[0],q),mix(e[1],nx[1],q)]}else if(k===CH.length-1)tip=r.tip});
 // 石屑：从刃口迸出
 for(let k=0;k<CH.length;k++){const d=u-STRIKE(k);if(d<0||d>.45)continue;for(let j=0;j<10;j++){const a=-Math.PI*rand(k*40+j),sp=120+rand(k*40+j+1)*260;ell(g,tip[0]+Math.cos(a)*sp*d,tip[1]+Math.sin(a)*sp*d+400*d*d,2.5,2.5,j%3?'#c7d1da':'#F6AD55')}}
 const ph=K.wrap(u-1.0,.5)/.5,swing=u<1?-.5:(ph<.7?-.9*smooth(ph/.7):-.9+.9*smooth((ph-.7)/.3)),recoil=u<1?0:Math.max(0,1-ph*8)*-4;
 mason(g,tip,u,swing,recoil);
 g.restore()};
// 4-4 缓慢推近：碑文 → 右下角落款，渐暗为纯黑
K.scenes['4-4']=function(g,u){const p=K.ease(K.win(u,0,6.5)),z=K.logZoom(.62,2.4,p),cx=mix(960,1450,p),cy=mix(560,893,p),dark=smooth(K.win(u,6.3,7.6));
 g.fillStyle='#000';g.fillRect(0,0,1920,1080);g.save();K.cam(g,cx,cy,z);g.globalAlpha=1-dark;K.sky(g,{sky:['#102A43','#2B6CB0','#3b6d9c']});
 poly(g,[[360,-40],[1560,-40],[1600,1120],[320,1120]],'#5d6a77',P.ink,6);g.fillStyle='#4e5a66';g.fillRect(380,40,1160,1040);
 [...'封燕然山铭'].forEach((c,k)=>K.cq(g,c,1440,130+k*78,66,'#1d2631',{hi:'#a9b7c4'}));
 const TXT=['铄王师兮征荒裔','剿凶虐兮截海外','夐其邈兮亘地界','封神丘兮建隆嵑','熙帝载兮振万世'];TXT.forEach((col,ci)=>[...col].forEach((c,k)=>K.cq(g,c,1300-ci*150,236+k*100,74,'#1d2631',{hi:'#a9b7c4'})));
 g.globalAlpha=1;const ta=1-smooth(K.win(u,9.5,10));g.globalAlpha=ta;
 // 落款七字：竖排，比碑文小但笔画加粗；黑场里转为暖白独留
 [...'自此漠北无车铃'].forEach((c,k)=>K.cq(g,c,1452,798+k*38,34,dark>0?'#efe0c0':'#1d2631',{hi:dark>0?null:'#a9b7c4',wmul:1.3}));g.globalAlpha=1;g.restore()};
})();
