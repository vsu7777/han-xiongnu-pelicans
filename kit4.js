// v3 增补：精细刘邦（立姿抱臂）、奔马（位移驱动的跑步循环）+ 汉骑/刘邦/南匈奴骑手。确定性纯函数。
(function(){'use strict';const {TAU,rand,mix,smooth,clamp,wrap,line,ell,path,poly}=K;
const hatchIn=(g,clipPath,x,y,w,h,ang,gap,col,lw)=>{g.save();g.clip(new Path2D(clipPath));const c=Math.cos(ang),s=Math.sin(ang),R=Math.hypot(w,h);for(let k=-R;k<R;k+=gap){const cx=x+w/2-s*k,cy=y+h/2+c*k;line(g,cx-c*R,cy-s*R,cx+c*R,cy+s*R,col,lw)}g.restore()};
// ---------- 刘邦（白登山顶，抱臂受冻）：局部坐标，脚底 y=0，头顶约 -700
K.liubang=function(g,u,P){const ink=P.ink,SNOW='#eef2f6',ROBE='#141a24',ROBE2='#1f2733',CAPE='#3b2226',CAPE2='#552f31',SKIN='#e6d3bb',SKD='#b89b80',RED='#8a2c26';
 // 斗篷：肩部积雪，下摆被风吹向右
 const fl=Math.sin(u*2.1)*10;const cape=`M -150 -420 Q -250 -380 -270 -200 Q -300 -60 -330 70 L ${330+fl} ${70+fl*.3} Q 300 -60 272 -200 Q 250 -380 150 -420 Z`;
 path(g,cape,CAPE,ink,6);hatchIn(g,cape,-340,-430,680,520,1.25,13,K.rgba('#000',.28),2);
 for(let i=0;i<9;i++){const x=-250+i*62;path(g,`M ${x*.62} -400 Q ${x*.95} -160 ${x*1.08+fl*.3} 66`,null,i%2?CAPE2:K.rgba('#000',.45),i%2?5:3)}
 for(let i=0;i<40;i++){const x=-300+rand(i+1200)*600,y=-380+rand(i+1201)*440;if(Math.abs(x)>140+(y+420)*.4)ell(g,x,y,2.2,2.2,K.rgba(SNOW,.75))}
 // 袍身（玄色深衣）与衣纹排线
 const robe='M -175 60 L -160 -330 Q -110 -405 0 -412 Q 110 -405 160 -330 L 175 60 Z';path(g,robe,ROBE,ink,6);
 hatchIn(g,robe,-180,-420,360,490,-1.35,11,K.rgba('#5d6878',.35),1.6);
 for(let i=0;i<7;i++){const x=-130+i*44;path(g,`M ${x} -170 Q ${x+(i-3)*6} -60 ${x+(i-3)*10} 58`,null,K.rgba('#000',.6),4);path(g,`M ${x+5} -170 Q ${x+5+(i-3)*6} -60 ${x+5+(i-3)*10} 58`,null,K.rgba('#6f7b8c',.45),1.5)}
 path(g,'M -175 60 Q 0 40 175 60',null,RED,10);path(g,'M -175 52 Q 0 32 175 52',null,K.rgba('#d9b9a0',.6),2);
 // 交领右衽：左襟压右襟，领缘朱红镶白
 path(g,'M -70 -404 L 60 -250 L 92 -268 L -30 -410 Z',RED,ink,3);path(g,'M -58 -402 L 66 -258',null,K.rgba('#efe3d2',.8),3);
 path(g,'M 70 -404 L 8 -322 L -8 -340 L 40 -410 Z','#6b2420',ink,3);
 // 腰带 + 玉带钩 + 垂绶
 path(g,'M -168 -205 Q 0 -190 168 -205 L 166 -170 Q 0 -156 -166 -170 Z','#2a1c16',ink,4);for(let i=0;i<12;i++)line(g,-150+i*26,-200,-146+i*26,-170,K.rgba('#8d6a4a',.6),2);
 path(g,'M -20 -196 Q 0 -206 26 -194 Q 30 -184 22 -176 Q 0 -168 -22 -178 Z','#9fc2a8',ink,2.5);line(g,-8,-188,16,-187,K.rgba('#fff',.6),2);
 path(g,'M 30 -170 Q 40 -100 24 -20 M 44 -170 Q 58 -100 48 -16',null,RED,6);ell(g,24,-14,6,9,'#9fc2a8',ink,1.5);
 // 佩剑：剑鞘斜挂左腰，剑首环、剑格（剑镡）
 line(g,-150,-178,-300,40,ink,20);line(g,-150,-178,-300,40,'#3d2a1e',14);line(g,-155,-170,-292,30,K.rgba('#b08a5a',.6),2);poly(g,[[-292,26],[-312,48],[-298,56],[-284,36]],'#a28a5c',ink,2);
 line(g,-150,-178,-112,-238,ink,14);line(g,-150,-178,-112,-238,'#6b4a2e',9);line(g,-166,-168,-134,-190,'#c8a868',9);ell(g,-106,-246,11,11,null,'#c8a868',4);
 // 抱臂：两袖交叠于胸前，袖口宽大，露出攥紧的手指
 const sv1='M -205 -300 Q -60 -268 118 -210 Q 140 -170 104 -158 Q -50 -186 -196 -222 Z',sv2='M 205 -292 Q 60 -255 -112 -205 Q -134 -170 -98 -156 Q 66 -180 198 -214 Z';
 path(g,sv1,ROBE2,ink,4);hatchIn(g,sv1,-210,-310,360,160,.3,9,K.rgba('#7a8798',.35),1.4);path(g,sv2,'#232c39',ink,4);hatchIn(g,sv2,-140,-300,350,150,-.3,9,K.rgba('#7a8798',.3),1.4);
 for(let i=0;i<4;i++)path(g,`M ${150-i*60} ${-262+i*14} Q ${120-i*60} ${-236+i*14} ${130-i*60} ${-214+i*14}`,null,K.rgba('#000',.55),3);
 for(let k=0;k<3;k++)path(g,`M ${96+k*9} -214 Q ${104+k*9} -226 ${112+k*9} -214`,SKIN,ink,2.5);for(let k=0;k<3;k++)path(g,`M ${-92-k*9} -206 Q ${-100-k*9} -218 ${-108-k*9} -206`,SKIN,ink,2.5);
 // 肩头积雪
 for(const sd of [-1,1]){path(g,`M ${sd*60} -414 Q ${sd*120} -440 ${sd*190} -404 Q ${sd*240} -380 ${sd*262} -340 Q ${sd*200} -372 ${sd*130} -388 Q ${sd*90} -396 ${sd*60} -400 Z`,SNOW,ink,3);for(let k=0;k<4;k++)ell(g,sd*(100+k*40),-404+k*14,9,5,'#ffffff')}
 // 颈与头
 path(g,'M -34 -440 L -30 -404 L 30 -404 L 34 -440 Z',SKD,ink,3);
 const face='M -80 -575 Q -86 -500 -64 -460 Q -40 -425 0 -420 Q 40 -425 64 -460 Q 86 -500 80 -575 Q 70 -640 0 -645 Q -70 -640 -80 -575 Z';path(g,face,SKIN,ink,5);
 hatchIn(g,face,20,-650,90,240,1.0,7,K.rgba(SKD,.75),2);path(g,'M 58 -600 Q 72 -520 56 -462',null,K.rgba(SKD,.8),8);
 ell(g,-84,-540,12,22,SKIN,ink,3);ell(g,84,-540,12,22,SKD,ink,3);
 // 无奈：眉头上挑成八字，眼皮下垂，眼珠斜望包围圈
 const sq=1+Math.sin(u*9)*.12,look=Math.sin(u*.7)*4;
 path(g,'M -64 -578 Q -40 -594 -14 -598',null,ink,7);path(g,'M 14 -598 Q 40 -594 64 -578',null,ink,7);line(g,-10,-620,10,-620,K.rgba(SKD,.9),2);path(g,'M -30 -628 Q 0 -634 30 -628',null,K.rgba(SKD,.8),2);
 for(const sd of [-1,1]){const ex=sd*36;path(g,`M ${ex-20} -556 Q ${ex} ${-568*1} ${ex+20} -556 Q ${ex} -546 ${ex-20} -556 Z`,'#f4ede2',ink,2.5);ell(g,ex-6+look,-555,6,6*sq,ink);path(g,`M ${ex-22} -560 Q ${ex} -572 ${ex+22} -560`,null,ink,4);path(g,`M ${ex-16} -546 Q ${ex} -541 ${ex+16} -546`,null,K.rgba(SKD,.9),2)}
 path(g,'M -4 -556 L -12 -500 Q -2 -492 12 -498',null,ink,3.5);path(g,'M 2 -552 L 10 -504',null,K.rgba(SKD,.9),5);ell(g,-8,-497,4,2.5,ink);ell(g,10,-497,4,2.5,ink);
 path(g,'M -22 -470 Q 0 -478 22 -470',null,'#7a3a32',4); // 嘴角下垂
 // 胡须：上髭两撇 + 颔下长须分缕 + 鬓须
 path(g,'M -4 -486 Q -30 -492 -54 -470 Q -36 -482 -8 -478 Z','#22262e',ink,2);path(g,'M 4 -486 Q 30 -492 54 -470 Q 36 -482 8 -478 Z','#22262e',ink,2);
 for(let i=0;i<11;i++){const x0=-36+i*7.2,sw=Math.sin(u*1.3+i)*4;path(g,`M ${x0} -458 Q ${x0*1.1+sw} -400 ${x0*.5+sw*2} ${-352-Math.abs(i-5)*6}`,null,i%2?'#2b3038':'#3d434d',4)}
 for(let i=0;i<5;i++){path(g,`M ${-78+i*3} -530 Q ${-76+i*4} -490 ${-56+i*3} -462`,null,'#2b3038',2.5);path(g,`M ${78-i*3} -530 Q ${76-i*4} -490 ${56-i*3} -462`,null,'#2b3038',2.5)}
 // 发髻 + 刘氏冠（竹皮长板冠，前低后高）+ 冠缨系于颔下
 path(g,'M -78 -592 Q -70 -650 0 -656 Q 70 -650 78 -592 Q 40 -620 0 -622 Q -40 -620 -78 -592 Z','#1b1e24',ink,3);ell(g,0,-662,26,16,'#1b1e24',ink,3);
 path(g,'M -34 -668 L -46 -760 L 58 -790 L 44 -672 Z','#151a22',ink,4);for(let i=1;i<5;i++)line(g,-34+i*16,-668-i*1,-44+i*20,-762-i*7,K.rgba('#6f7b8c',.45),2);path(g,'M -46 -760 L 58 -790',null,K.rgba(SNOW,.9),5);
 path(g,'M -40 -664 Q -84 -580 -66 -470 Q -40 -430 -20 -426',null,'#6b2420',3);path(g,'M 40 -668 Q 84 -580 66 -470 Q 40 -430 20 -426',null,'#6b2420',3);
 for(let k=0;k<6;k++)ell(g,-40+k*18,-765-k*4.5,8,4,'#ffffff')};
// ---------- 奔马：phase 由行进距离/步幅算出（可复现）。局部坐标：面向 +x，地面 y=0
const LEGS=[{x:-104,off:0,hind:1,far:1},{x:-92,off:.1,hind:1,far:0},{x:86,off:.5,hind:0,far:1},{x:98,off:.6,hind:0,far:0}];
function seg(g,x1,y1,x2,y2,w1,w2,col,ink){const dx=x2-x1,dy=y2-y1,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;poly(g,[[x1+nx*w1/2,y1+ny*w1/2],[x2+nx*w2/2,y2+ny*w2/2],[x2-nx*w2/2,y2-ny*w2/2],[x1-nx*w1/2,y1-ny*w1/2]],col,ink,2.5)}
// 三段腿：上臂/胫 → 管骨 → 系部+蹄；前腿腕关节向后折，后腿跗关节向前折
function leg(g,L,c,col,ink,y0){const q=wrap(c+L.off,1),sw=Math.sin(q*TAU),f=Math.max(0,Math.sin(q*TAU-.9));const hx=L.x,hy=y0-150;let a1,a2,a3,l1,l2;
 if(L.hind){a1=-.35+.5*sw;a2=a1+.55+f*.9;a3=a2-.5-f*.4;l1=72;l2=62}else{a1=.45*sw;a2=a1-f*1.5;a3=a2-.35-f*.6;l1=66;l2=64}
 const kx=hx+Math.sin(a1)*l1,ky=hy+Math.cos(a1)*l1,fx=kx+Math.sin(a2)*l2,fy=ky+Math.cos(a2)*l2,px=fx+Math.sin(a3)*22,py=fy+Math.cos(a3)*22;
 seg(g,hx,hy-10,kx,ky,L.hind?40:30,16,col,ink);seg(g,kx,ky,fx,fy,13,10,col,ink);ell(g,kx,ky,9,9,col,ink,2);seg(g,fx,fy,px,py,11,13,col,ink);
 g.save();g.translate(px,py);g.rotate(-a3);poly(g,[[-8,-2],[8,-2],[10,10],[-10,10]],ink);g.restore()}
K.horse=function(g,x,y,s,o={}){const c=o.phase||0,P=o.pal,ink=P.ink,col=o.coat||'#6b4a34',col2=o.coat2||'#4a3022',face=o.face||1;g.save();g.translate(x,y);g.scale(face*s,s);
 ell(g,0,6,190,14,K.rgba(ink,.3));const bob=-10*Math.sin(c*TAU)-6,pitch=.05*Math.sin(c*TAU+1);
 for(const L of LEGS)if(L.far)leg(g,L,c,col2,ink,bob);
 g.save();g.translate(0,bob);g.rotate(pitch);
 // 尾：随奔跑甩动
 const tw=Math.sin(c*TAU*2)*14;path(g,`M -150 -170 Q -220 ${-170+tw} -260 ${-120+tw*1.5} Q -230 ${-150+tw} -150 -150 Z`,col2,ink,3);for(let k=0;k<4;k++)path(g,`M -160 -165 Q ${-210-k*8} ${-160+tw} ${-250-k*6} ${-118+tw*1.4+k*6}`,null,K.rgba(ink,.6),2);
 const body='M -160 -160 Q -170 -200 -110 -205 Q -20 -200 70 -205 Q 130 -210 150 -170 Q 160 -120 120 -105 Q 20 -95 -100 -105 Q -160 -115 -160 -160 Z';path(g,body,col,ink,5);
 g.save();g.clip(new Path2D(body));for(let k=0;k<9;k++)path(g,`M ${-120+k*28} -110 Q ${-110+k*28} -140 ${-120+k*28} -170`,null,K.rgba(ink,.3),2);for(let k=0;k<5;k++)path(g,`M -140 ${-190+k*6} Q -20 ${-200+k*6} 120 ${-195+k*6}`,null,K.rgba(o.hi||P.hi,.25),2);g.restore();
 // 颈与头
 const nod=Math.sin(c*TAU)*.08;g.save();g.translate(110,-180);g.rotate(nod);path(g,'M -20 10 Q 20 -70 70 -110 L 110 -100 Q 120 -80 100 -60 Q 60 -20 40 30 Z',col,ink,5);
 path(g,'M 66 -112 L 98 -120 Q 140 -100 158 -60 Q 164 -44 148 -40 Q 120 -50 100 -60 Z',col,ink,4);ell(g,96,-98,4,4,ink);line(g,72,-118,64,-140,ink,5);line(g,82,-120,80,-142,ink,5);ell(g,150,-48,3,2,ink);
 for(let k=0;k<7;k++){const yy=-104+k*16;path(g,`M ${60-k*8} ${yy} Q ${30-k*10+Math.sin(c*TAU+k)*6} ${yy-12} ${10-k*12} ${yy+4}`,null,col2,5)}
 // 辔头缰绳
 path(g,'M 100 -100 L 150 -56 M 96 -80 L 128 -64',null,'#2a1a12',3);g.restore();
 // 鞍与鞍鞯
 path(g,'M -60 -205 Q -30 -225 30 -222 Q 50 -215 50 -200 L -60 -196 Z','#3a2a20',ink,3);path(g,'M -70 -200 L 46 -198 L 40 -150 L -64 -152 Z',o.cloth||'#8a2c26',ink,3);for(let k=0;k<4;k++)line(g,-60+k*28,-150,-56+k*28,-140,o.cloth||'#8a2c26',3);
 const sad=[0,-212];g.restore();
 for(const L of LEGS)if(!L.far)leg(g,L,c,col,ink,bob);
 g.restore();return {saddle:[x+face*s*0,y+s*(bob-212)],bob}};
// 骑手：kind 'han' 红缨札甲汉骑 / 'liubang' 刘邦（刘氏冠、斗篷）/ 'nan' 南匈奴骑手（皮帽皮袍）
K.horseRider=function(g,x,y,s,o){const P=o.pal,ink=P.ink,face=o.face||1,c=o.phase||0,kind=o.kind||'han';
 const h=K.horse(g,x,y,s,{...o,cloth:kind==='liubang'?'#c9a13a':kind==='nan'?'#4a5a3a':'#8a2c26',coat:o.coat||(kind==='liubang'?'#d9d2c4':undefined),coat2:o.coat2||(kind==='liubang'?'#a69f92':undefined)});
 g.save();g.translate(x,y+s*h.bob);g.scale(face*s,s);g.translate(-10,-212);const lean=.18+.04*Math.sin(c*TAU*2);
 // 腿
 path(g,'M -6 -4 Q 30 40 20 96 L 44 100',null,ink,22);path(g,'M -6 -4 Q 30 40 20 96 L 44 100',null,kind==='nan'?'#5a4630':'#2a3040',15);
 g.save();g.rotate(lean);
 if(kind==='liubang'){const fl=Math.sin(c*TAU*2)*12;path(g,`M -20 -120 Q -120 ${-110+fl} -200 ${-40+fl} Q -150 ${-30+fl*.5} -40 -20 Z`,'#552f31',ink,4);for(let k=0;k<4;k++)path(g,`M -30 -110 Q ${-110-k*10} ${-90+fl} ${-180-k*6} ${-40+fl+k*4}`,null,K.rgba('#000',.4),2)}
 const torso=kind==='han'?'#3a3530':kind==='nan'?'#6b5236':'#141a24';path(g,'M -36 0 L -28 -120 Q 0 -134 28 -120 L 36 0 Z',torso,ink,4);
 if(kind==='han'){for(let r=0;r<5;r++)for(let k=0;k<4;k++){const xx=-26+k*14,yy=-112+r*22;path(g,`M ${xx} ${yy} L ${xx+12} ${yy} L ${xx+12} ${yy+18} L ${xx} ${yy+18} Z`,'#4b4238','#b18c5a',1.2)}}
 if(kind==='liubang'){path(g,'M -16 -124 L 14 -60 L 22 -66 L -6 -126 Z','#8a2c26',ink,2);line(g,-34,-30,34,-30,'#2a1c16',8);ell(g,0,-30,6,4,'#9fc2a8',ink,1.5)}
 if(kind==='nan'){for(let k=0;k<5;k++)line(g,-30,-110+k*24,30,-108+k*24,K.rgba('#c9a77a',.6),2);line(g,-36,-2,36,-2,'#c9a77a',6)}
 // 头
 g.save();g.translate(4,-150);ell(g,0,0,22,25,'#e2c7a6',ink,3);ell(g,10,-4,3,3,ink);path(g,'M 18 6 L 26 8 L 18 12',null,ink,2);
 if(kind==='han'){path(g,'M -26 -6 Q -24 -40 0 -42 Q 24 -40 26 -6 L 18 -2 L -20 -2 Z','#4b4a46',ink,3);line(g,0,-42,0,-56,ink,3);const tw=Math.sin(c*TAU*2)*6;path(g,`M 0 -56 Q -20 ${-66+tw} -44 ${-54+tw} Q -24 ${-50+tw} 0 -50 Z`,'#c0392b',ink,2)}
 if(kind==='liubang'){path(g,'M -6 18 Q 6 44 20 18',null,'#2b3038',6);path(g,'M -10 -18 L -18 -62 L 26 -74 L 18 -22 Z','#151a22',ink,3);path(g,'M -18 -62 L 26 -74',null,K.rgba('#eef2f6',.9),3)}
 if(kind==='nan'){path(g,'M -28 -4 Q -30 -44 4 -48 Q 32 -44 28 -4 Z','#7a5a3a',ink,3);path(g,'M -30 -6 Q 0 -16 30 -6 L 30 4 Q 0 -4 -30 4 Z','#c9a77a',ink,2);path(g,'M -22 -4 L -34 26',null,'#7a5a3a',8)}
 g.restore();
 // 手臂与兵器
 const arm=o.arm??0;g.save();g.translate(14,-110);g.rotate(.6+arm);line(g,0,0,52,28,ink,13);line(g,0,0,52,28,torso,8);
 if(kind==='han'){line(g,40,30,140,-150,ink,5);path(g,'M 140 -150 L 136 -186 L 152 -156 Z','#c9d3dd',ink,2);line(g,128,-128,152,-122,ink,4)}
 if(kind==='nan'){path(g,'M 52 -20 Q 80 30 52 80',null,'#5a3a24',5);line(g,52,-20,52,80,K.rgba('#e9dcc0',.8),1.5)}
 if(kind==='liubang'){line(g,52,28,92,18,'#2a1a12',3)}
 g.restore();g.restore();g.restore();return h};
})();
