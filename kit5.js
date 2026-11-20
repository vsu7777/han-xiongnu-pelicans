// v4：骑马鹈鹕（南匈奴联军）。骨架与单车 rig 同法：髋点固定于鞍、脚底精确落在马镫踏板上表面，两段 IK（股 100、胫 110），全部由 phase 决定、可复现。
(function(){'use strict';const {TAU,mix,line,ell,path,poly}=K;const R=K.RIG;
const SCL=.55,SAD=[-10,-212],HIP=[-63,-169],TREAD=[-4,-104]; // 马局部坐标中的鞍点、镫板
const toPel=h=>[(h[0]-SAD[0])/SCL+HIP[0],(h[1]-SAD[1])/SCL+HIP[1]];
function ik(h,a,L1,L2){const dx=a[0]-h[0],dy=a[1]-h[1],d=Math.min(Math.hypot(dx,dy),L1+L2-1e-6);const al=(L1*L1-L2*L2+d*d)/(2*d),pe=Math.sqrt(Math.max(0,L1*L1-al*al));const ux=dx/d,uy=dy/d;const k1=[h[0]+ux*al-uy*pe,h[1]+uy*al+ux*pe],k2=[h[0]+ux*al+uy*pe,h[1]+uy*al-ux*pe];return k1[0]>k2[0]?k1:k2}
// 鞍上起伏：髋相对鞍 ±3（双频），脚仍钉在镫上
K.pelHorseLeg=c=>{const t=toPel(TREAD),sole=t[1],ankle=[t[0]-4,sole-R.ankleUp],bob=3*Math.sin(c*TAU*2),hip=[HIP[0],HIP[1]+bob];return {tread:t,sole,ankle,hip,knee:ik(hip,ankle,R.thigh,R.shin),bob}};
K.pelHorseRider=function(g,x,y,s,o){const P=o.pal,ink=P.ink,face=o.face||1,c=o.phase||0,detail=o.detail!==false;
 const h=K.horse(g,x,y,s,{...o,cloth:'#9E2A2B',coat:o.coat||'#8a6a48',coat2:o.coat2||'#5e4630'});
 g.save();g.translate(x,y+s*h.bob);g.scale(face*s,s);
 // 镫带 + 镫
 path(g,`M ${SAD[0]+2} ${SAD[1]+10} L ${TREAD[0]} ${TREAD[1]}`,null,'#2a1a12',3);
 g.save();g.translate(SAD[0],SAD[1]);g.scale(SCL,SCL);g.translate(-HIP[0],-HIP[1]);const L=K.pelHorseLeg(c);
 // 身体：左衽皮袍（盖住躯干），颈系红巾（随风后飘）
 g.save();g.translate(0,L.bob);K.bodyDraw(g,P,detail);
 path(g,'M -176 -226 Q -150 -300 -70 -306 Q 10 -312 34 -262 Q 60 -222 22 -192 Q -50 -168 -120 -190 Z','#6b4a2e',ink,5);
 path(g,'M 30 -262 Q -40 -250 -96 -192',null,'#c9a77a',12);path(g,'M 30 -262 Q -40 -250 -96 -192',null,ink,2);for(let i=0;i<8;i++)line(g,-150+i*20,-200,-146+i*20,-188,'#c9a77a',4);
 if(detail)for(let i=0;i<6;i++)path(g,`M ${-150+i*26} -288 Q ${-140+i*26} -250 ${-150+i*26} -210`,null,K.rgba('#000',.3),2);
 const fl=Math.sin(c*TAU*2)*10;path(g,'M 2 -300 Q 40 -312 64 -300 Q 66 -286 60 -278 Q 30 -290 4 -282 Z','#d1352b',ink,3);
 path(g,`M 6 -292 Q -60 ${-300+fl} -130 ${-290+fl*1.6} L -126 ${-270+fl*1.6} Q -60 ${-282+fl} 8 -280 Z`,'#d1352b',ink,3);path(g,`M 8 -286 Q -50 ${-280+fl*.6} -110 ${-250+fl} L -100 ${-236+fl} Q -50 ${-268+fl*.6} 10 -278 Z`,'#b0281f',ink,2.5);
 K.wingGripV2(g,P,detail,20);K.head(g,P,{detail,cap:true,capColor:'#7a5a3a',alert:.6,drop:o.drop||0});
 g.restore();
 // 腿：股—胫—蹼足，脚底 = 镫板上表面
 const col=P.bill;path(g,`M ${L.hip[0]} ${L.hip[1]} L ${L.knee[0]} ${L.knee[1]} L ${L.ankle[0]} ${L.ankle[1]}`,null,ink,22);path(g,`M ${L.hip[0]} ${L.hip[1]} L ${L.knee[0]} ${L.knee[1]} L ${L.ankle[0]} ${L.ankle[1]}`,null,col,17);
 const ax=L.ankle[0],sl=L.sole;poly(g,[[ax-3,L.ankle[1]],[ax+8,L.ankle[1]+2],[ax+36,sl-3],[ax+40,sl],[ax+28,sl-1],[ax+22,sl],[ax+12,sl-1],[ax+4,sl],[ax-14,sl],[ax-9,sl-6]],P.pouch,ink,2.5);
 g.fillStyle=ink;g.fillRect(L.tread[0]-26,sl,52,R.pedalThick);path(g,`M ${L.tread[0]-26} ${sl+3} Q ${L.tread[0]} ${sl-70} ${L.tread[0]+26} ${sl+3}`,null,'#3a3530',6);
 g.restore();
 // 手中旗：「南」字（汉军盟友标识）
 g.restore();
 if(o.flag)K.flag(g,x+face*s*(-40),y+s*(h.bob-235),s*.62,o.t||0,P,{color:'#d1352b',text:'南',textColor:'#fbe3b8',rot:.1});return h};
})();
// ---------- 26 寸女式坤车（南匈奴联军）：低位双斜梁（无横梁）、前车筐、全包链罩、米白车漆。
// 五通、曲柄长、鞍座高度与二八大杠相同（同一套脚踏 IK，脚不离踏）；车轮半径 87（26/28×94），齿比仍 2.5：轮转角 = d/87，曲柄 = 轮/2.5。
(function(){'use strict';const {TAU,mix,wrap,line,ell,path,poly}=K;const R=K.RIG,R26=87,REAR=-158,FRONT=170;K.RIG26={R:R26,rear:REAR,front:FRONT,gear:R.gear};
K.pose26=d=>{const wheel=d/R26;return {d,wheel,crank:wheel/R.gear}};
function wheel26(g,x,ang,P,detail){ell(g,x,0,R26,R26,P.tire,P.ink,10);ell(g,x,0,R26-8,R26-8,null,'#d9dde0',3);const n=detail?16:8;for(let k=0;k<n;k++){const a=k*TAU/n+ang;line(g,x+8*Math.cos(a),8*Math.sin(a),x+(R26-10)*Math.cos(a),(R26-10)*Math.sin(a),'#cfd5da',detail?1.5:2.6)}
 const va=ang+.3;ell(g,x+(R26-12)*Math.cos(va),(R26-12)*Math.sin(va),4.5,4.5,'#d1352b',P.ink,1.5);ell(g,x,0,9,9,'#cfd5da',P.ink,2);
 path(g,`M ${x-R26-6} -6 Q ${x-R26+4} ${-R26-14} ${x} ${-R26-12} Q ${x+R26-4} ${-R26-14} ${x+R26+6} -6`,null,K.rgba('#e8e0cc',.95),7)} // 挡泥板
K.bike26=function(g,o){const P=o.pal,c=o.crank||0,w=o.wheel||0,detail=o.detail!==false,paint=o.frame&&o.frame!==P.metal?o.frame:'#e8e0cc',ink=P.ink,[bx,by]=R.bb;
 wheel26(g,REAR,w,P,detail);wheel26(g,FRONT,o.frontWheel!==undefined?o.frontWheel:w,P,detail);
 // 链条（被链罩半遮）：链节速度 = 曲柄×牙盘半径 = 轮×飞轮半径
 line(g,bx,by-R.ringR,REAR,-R.cogR,ink,4);line(g,bx,by+R.ringR,REAR,R.cogR,ink,4);
 if(detail){const L=Math.hypot(bx-REAR,by-R.ringR+R.cogR),sp=11,off=wrap(c*R.ringR,sp);for(let q=sp-off;q<L;q+=sp){const f=q/L;ell(g,mix(bx,REAR,f),mix(by+R.ringR,R.cogR,f),1.8,1.8,P.spoke)}}
 ell(g,bx,by,R.ringR+3,R.ringR+3,ink,'#cfd5da',3);for(let k=0;k<5;k++){const a=c+k*TAU/5;line(g,bx,by,bx+R.ringR*Math.cos(a),by+R.ringR*Math.sin(a),'#cfd5da',3)}
 // 车架：后下叉/后上叉、立管、两根低位弯斜梁（女式），头管、前叉
 const fr=`M ${REAR} 0 L ${bx} ${by} M ${REAR} 0 L -76 -150 M ${bx} ${by} L -80 -158 M ${bx} ${by} Q 40 -40 98 -118 M -66 -118 Q 10 -70 104 -148 M 98 -116 L 110 -164 M 104 -140 L ${FRONT} 0`;
 path(g,fr,null,ink,13);path(g,fr,null,paint,6);if(detail)path(g,'M -60 -116 Q 10 -72 100 -144',null,K.rgba('#ffffff',.6),2);
 // 全包链罩
 path(g,`M ${REAR+8} -16 Q ${(REAR+bx)/2} -36 ${bx+30} -28 Q ${bx+38} -6 ${bx+26} 18 Q ${(REAR+bx)/2} 20 ${REAR+8} 14 Z`,K.rgba(paint,.9),ink,3);
 // 后货架
 line(g,-232,-118,-100,-118,ink,6);line(g,-226,-116,REAR,-4,ink,4);
 // 弯把（城市把）+ 车铃
 path(g,'M 110 -164 L 118 -206 Q 150 -214 160 -196',null,ink,10);path(g,'M 112 -166 L 119 -205 Q 148 -211 156 -197',null,'#cfd5da',4);ell(g,160,-196,7,5,'#3a3530',ink,1.5);ell(g,128,-218,9,6,'#cfd5da',ink,2);
 // 前车筐（藤编）
 const bk='M 150 -214 L 238 -214 L 230 -150 L 158 -150 Z';path(g,bk,'#b88a52',ink,3);for(let k=1;k<6;k++)line(g,150+k*15,-214,154+k*13,-150,'#7a5a32',2);for(let k=1;k<4;k++)line(g,152,-214+k*16,236-k*2,-214+k*16,'#7a5a32',2);line(g,170,-150,FRONT,-6,ink,3);
 // 鞍座（宽软女式座）
 path(g,'M -118 -183 Q -96 -200 -56 -186 L -52 -176 Q -90 -168 -118 -174 Z','#6b4a2e',ink,4);line(g,-80,-176,-78,-156,ink,6)};
// 南匈奴鹈鹕骑坤车：左衽皮袍 + 颈系红巾 + 皮帽；可举「南」字旗
K.nanBikeRider=function(g,x,y,s,o){const P=o.pal,face=o.face||1,c=o.phase||0;
 K.rider(g,x,y+(94-R26)*s,s,{pal:P,pose:K.pose26(o.d||0),face,detail:o.detail,bikeFn:K.bike26,capColor:'#7a5a3a',alert:.6,shadow:true,
  overlay:(g,P,detail)=>{const ink=P.ink;path(g,'M -176 -226 Q -150 -300 -70 -306 Q 10 -312 34 -262 Q 60 -222 22 -192 Q -50 -168 -120 -190 Z','#6b4a2e',ink,5);path(g,'M 30 -262 Q -40 -250 -96 -192',null,'#c9a77a',12);for(let i=0;i<8;i++)line(g,-150+i*20,-200,-146+i*20,-188,'#c9a77a',4);
   const fl=Math.sin(c*6)*10;path(g,'M 2 -300 Q 40 -312 64 -300 Q 66 -286 60 -278 Q 30 -290 4 -282 Z','#d1352b',ink,3);path(g,`M 6 -292 Q -60 ${-300+fl} -130 ${-290+fl*1.6} L -126 ${-270+fl*1.6} Q -60 ${-282+fl} 8 -280 Z`,'#d1352b',ink,3);path(g,`M 8 -286 Q -50 ${-280+fl*.6} -110 ${-250+fl} L -100 ${-236+fl} Q -50 ${-268+fl*.6} 10 -278 Z`,'#b0281f',ink,2.5)}});
 if(o.flag)K.flag(g,x+face*s*(-150),y+s*(-170),s*.85,o.t||0,P,{color:'#d1352b',text:'南',textColor:'#fbe3b8',rot:.08})};
})();
