// 第一幕 白登之围：凛冽蓝灰
(function(){const P=K.PAL[1],{TAU,rand,mix,smooth,line,ell,path,poly}=K;
const RINGS=[{r:330,col:'#efeee9',cap:'#c9ced6',dir:1},{r:440,col:'#8d99a6',cap:'#5d6b7b',dir:-1},{r:550,col:'#151a22',cap:'#0b0f15',dir:1},{r:660,col:'#a33a2c',cap:'#7a2a20',dir:-1}];
RINGS.forEach(R=>{R.n=Math.round(TAU*R.r/62);R.w=R.dir*(.13+.0001*R.r)});
function snow(g,u,n,a,id){K.particles(g,u,n,{vx:-520,vy:330,color:P.hi,len:14,lw:2,alpha:a,id})}
function fog(g,a){const gr=g.createLinearGradient(0,64,0,1016);gr.addColorStop(0,K.rgba('#c9d3de',a));gr.addColorStop(.5,K.rgba('#c9d3de',a*.3));gr.addColorStop(1,K.rgba('#c9d3de',a*.9));g.fillStyle=gr;g.fillRect(0,0,1920,1080)}
function fire(g,x,y,s,u){const F={fire:['#a83c2e','#e08a3c','#ffd9a0']};K.flame(g,x,y,40*s,u,3,F);ell(g,x,y+4,46*s,10*s,K.rgba('#000',.4))}
K.scenes['1-1']=function(g,u){K.sky(g,P);
 const p=K.ease(K.win(u,1.2,8.5)),z=K.logZoom(2.3,.95,p),rot=-.04+p*.06;g.save();K.cam(g,0,mix(-280,60,p),z,rot,960,560);
 // 雪原：同心刻线
 ell(g,0,60,2600,1050,P.ground[1]);for(let k=0;k<28;k++)ell(g,0,60,120+k*90,(120+k*90)*.4,null,K.rgba(P.ground[3],.35),2);
 const items=[];RINGS.forEach((R,ri)=>{for(let k=0;k<R.n;k++){const th=k*TAU/R.n+R.w*u+ri*.3;const x=R.r*Math.cos(th),y=60+R.r*.4*Math.sin(th);const face=(-Math.sin(th)*R.dir)>0?1:-1;const d=R.r*Math.abs(R.w)*u/.3+k*37;items.push({y,x,face,d,R,depth:.85+.25*Math.sin(th)})}});
 items.sort((a,b)=>a.y-b.y);const back=items.filter(i=>i.y<60),front=items.filter(i=>i.y>=60);
 const drawI=i=>{const s=.3*i.depth;K.crowdRider(g,i.x,i.y,s*z>.62?s:s,K.pose(i.d).crank,i.face,P,i.R.col,i.R.cap)};
 // crowdRider 以世界尺度绘制；LOD 依屏幕尺度：用屏幕比例换算
 const lodDraw=i=>{const s=.3*i.depth,ss=s*z;if(ss>.62)K.rider(g,i.x,i.y,s,{pal:P,pose:K.pose(i.d),face:i.face,detail:false,frame:i.R.col,capColor:i.R.cap});else{g.save();g.translate(i.x,i.y);g.scale(1/z,1/z);K.crowdRider(g,0,0,ss,K.pose(i.d).crank,i.face,P,i.R.col,i.R.cap);g.restore()}};
 back.forEach(lodDraw);
 // 白登山
 // 白登山 v2：高出骑阵的岩峰（受光左坡 + 背光右坡 + 顺坡雪沟），峰顶篝火压在远处雪原上
 const M=[[-320,90],[-262,30],[-228,-12],[-176,-70],[-150,-118],[-104,-160],[-82,-214],[-44,-250],[-22,-292],[0,-306],[28,-294],[54,-262],[96,-214],[126,-168],[176,-104],[226,-40],[268,20],[320,90]];
 poly(g,M,P.ground[0],P.ink,4);poly(g,[[0,-306],[28,-294],[54,-262],[96,-214],[126,-168],[176,-104],[226,-40],[268,20],[320,90],[40,90],[20,-120]],P.ground[2]);
 for(let k=0;k<14;k++){const x0=-150+k*24,side=x0<0?-1:1;g.beginPath();g.moveTo(x0*.3,-280+Math.abs(x0)*.25);for(let q=1;q<=8;q++)g.lineTo(x0*.3+side*q*q*3.6+x0*q*.09,-280+Math.abs(x0)*.25+q*42);g.strokeStyle=K.rgba(x0<0?P.ground[3]:P.ink,.45);g.lineWidth=2;g.stroke()}
 for(let k=0;k<10;k++){const x=-220+rand(k+60)*440,y=-60+rand(k+61)*130;if(Math.abs(x)>300-(y+60)*.3)continue;poly(g,[[x-14,y],[x-4,y-12],[x+12,y-8],[x+16,y]],P.ground[3],P.ink,2)}
 poly(g,M,null,P.ink,4,true);
 ell(g,0,-302,70,12,K.rgba('#ffcf9a',.14));K.campfire(g,0,-306,.5,u,3);for(let k=0;k<4;k++){const a=k*1.6+.4;K.soldier(g,Math.cos(a)*64,-298+Math.sin(a)*10,.11,{pal:P,phase:0,arm:.2,face:Math.cos(a)>0?-1:1,rim:'#e08a3c'})}
 front.forEach(lodDraw);g.restore();
 snow(g,u,240,.55,11);fog(g,.18+.12*smooth(u/4))};
// 1-2 刘邦：低角度仰拍
K.scenes['1-2']=function(g,u){K.sky(g,P);const br=1+.012*Math.sin(u*.9);g.save();K.cam(g,960,600,br,0,960,600);
 // 远处山脊上仍在绕圈的骑阵剪影
 K.ridge(g,780,20,.003,0,P.ground[3]);for(let i=0;i<26;i++){const x=K.wrap(i*90+u*70,2340)-210;K.crowdRider(g,x,770+Math.sin(x*.003)*16,.09,K.pose(u*70/.09+i*40).crank,1,P,RINGS[i%4].col,RINGS[i%4].cap)}
 // 坡顶雪地（低机位）
 path(g,'M -100 1100 L -100 900 Q 500 820 960 840 Q 1500 860 2100 930 L 2100 1100 Z',P.ground[0],P.ink,4);K.hatch(g,0,880,1920,200,-.12,16,K.rgba(P.ground[3],.4),1.4,5,50);
 // 冻僵的大旗：硬挺，只剩高频细颤
 const fj=Math.sin(u*47)*.004;K.flag(g,1360,900,1.55,u,P,{rot:-.06+fj,stiff:true,ice:true,color:'#5c2a2a',textColor:'#e9e3da'});
 // 刘邦 v3：五官明暗、分缕胡须、刘氏冠、交领深衣、腰带带钩、斗篷积雪、佩剑；骨骼高频小幅抖动
 const sh=Math.sin(u*53)*2.4+Math.sin(u*71)*1.4,sr=Math.sin(u*61)*.006;g.save();g.translate(760+sh,1010);g.rotate(sr);g.scale(.92,.92);K.liubang(g,u,P);g.restore();
 // 呼出的白气：每1.7秒一口，被风迅速吹散
 for(let b=0;b<6;b++){const t0=.4+b*1.7,d=u-t0;if(d<0||d>1.2)continue;for(let k=0;k<14;k++){const x=760+sh+d*(260+rand(k+b*20)*260)*1.2,y=1010-.92*470+(rand(k+b)-.5)*40*d-d*40;g.globalAlpha=(1-d/1.2)*.45;ell(g,x,y,10+d*40*rand(k+9),6+d*20,'#eef2f6')}}g.globalAlpha=1;
 g.restore();snow(g,u,320,.6,23);fog(g,.12)};
// 1-3 分屏：上 陈平作画；下 阏氏鹈鹕
function carpPts(){const pts=[];for(let i=0;i<=80;i++){const a=i/80*TAU;const x=Math.cos(a)*230,y=Math.sin(a)*(70+40*Math.cos(a))*.9;pts.push([x,y])}return pts}const CARP=carpPts();
function carp(g,x,y,s,prog,glow,P2){g.save();g.translate(x,y);g.scale(s,s);
 if(glow>0){g.globalAlpha=glow;poly(g,CARP,'#e7b54a',null);for(let r=0;r<5;r++)for(let k=0;k<7;k++){g.beginPath();g.arc(-120+k*38,-30+r*18-(r%2)*6,16,.2,Math.PI-.2);g.strokeStyle='#a87422';g.lineWidth=2;g.stroke()}
  poly(g,[[-220,0],[-330,-90],[-300,0],[-330,90]],'#e7b54a','#6b4a1a',3);path(g,'M -40 -95 Q 20 -170 90 -100','#e7b54a','#6b4a1a',3);
  // 美人面：长睫毛大眼、朱唇、珍珠耳环
  ell(g,150,-20,20,16,'#fff8e8','#3a2a12',3);ell(g,154,-18,8,10,'#1a120a');for(let k=0;k<5;k++)line(g,138+k*8,-36,132+k*10,-52,'#1a120a',2.5);path(g,'M 205 20 Q 214 12 224 22 Q 214 30 205 20 Z','#b8302a');ell(g,100,40,9,9,'#fbf5ea','#8c7a5c',2);line(g,100,22,100,31,'#8c7a5c',2);g.globalAlpha=1}
 const n=Math.floor(prog*CARP.length);if(n>1){g.beginPath();CARP.slice(0,n).forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.strokeStyle='#1a120a';g.lineWidth=6;g.stroke()}
 g.restore();return n>0?[x+CARP[Math.min(n,CARP.length-1)][0]*s,y+CARP[Math.min(n,CARP.length-1)][1]*s]:[x,y]}
K.scenes['1-3']=function(g,u){
 // 上半屏：帐中篝火光
 const open=K.easeOut(u/1.1);g.save();g.beginPath();g.rect(23,64,1874*open,474);g.clip();
 const gr=g.createRadialGradient(400,500,40,400,500,1200);gr.addColorStop(0,'#5a4a3a');gr.addColorStop(1,P.sky[0]);g.fillStyle=gr;g.fillRect(0,0,1920,540);
 K.flame(g,300,520,90,u,7,{fire:['#a83c2e','#e08a3c','#ffd9a0']});
 g.fillStyle='#efe6d2';g.fillRect(560,120,1100,380);K.line(g,560,120,1660,120,'#6a5a46',10);K.line(g,560,500,1660,500,'#6a5a46',10);
 const prog=K.win(u,1.3,6.2),glow=K.smooth((u-6.2)/.8);const tip=carp(g,1110,310,1.25,prog,glow);
 // 陈平：手臂与毛笔，笔尖 = 描线终点
 const bx=tip[0],by=tip[1];path(g,`M 1920 ${by-220} Q ${bx+260} ${by-170} ${bx+70} ${by-60}`,null,'#1f2836',70);path(g,`M 1920 ${by-220} Q ${bx+260} ${by-170} ${bx+70} ${by-60}`,null,'#2f3c50',50);ell(g,bx+60,by-55,30,24,'#e9dfd0',P.ink,3);line(g,bx+50,by-60,bx,by,'#5b3b20',8);poly(g,[[bx-6,by-8],[bx+6,by+4],[bx-3,by+10]],'#111');
 if(open<1){K.ell(g,23+1874*open,300,18,240,'#7a5a3a',P.ink,3)}g.restore();
 // 分割线
 g.fillStyle=P.ink;g.fillRect(23,536,1874,8);
 // 下半屏：阏氏鹈鹕（金冠）
 g.save();g.beginPath();g.rect(23,544,1874,472);g.clip();K.sky(g,P,544,1016);K.ridge(g,900,14,.004,0,P.ground[2]);
 const sc=K.smooth((u-6.8)/1.2),unroll=K.easeOut((u-8.2)/.8);
 const pup=1+1.3*K.spring(u-9.0,16,.3),puff=.55*K.spring(u-9.3,9,.22),gulp=u>10.2&&u<10.7?Math.sin((u-10.2)/.5*Math.PI):0;
 g.save();g.translate(1640,1180);g.scale(-1.2,1.2);path(g,'M -200 0 Q -220 -260 -60 -300 Q 40 -280 60 -200 L 60 0 Z',P.body,P.ink,6);path(g,'M -13 -241 C 43 -273 -13 -354 28 -406 Q 51 -446 86 -420 Q 112 -392 79 -367 C 55 -342 91 -274 28 -224 Z',P.body,P.ink,6);
 g.save();g.translate(0,-gulp*18);K.head(g,P,{pupil:pup,puff:puff+gulp*.25,drop:.15,cap:false});g.restore();
 // 匈奴金冠（鹰形饰）
 path(g,'M 20 -440 Q 55 -470 94 -446 L 92 -428 Q 55 -446 20 -424 Z','#d9a441',P.ink,3);path(g,'M 52 -462 L 46 -505 Q 60 -520 74 -505 L 66 -462 Z','#e7b54a',P.ink,3);ell(g,60,-512,10,8,'#e7b54a',P.ink,2);for(let k=0;k<4;k++)line(g,28+k*18,-430,26+k*18,-405+Math.sin(u*4+k)*3,'#d9a441',2);
 g.restore();
 // 信使递来的画卷
 if(sc>0){const sx=K.mix(-200,500,sc);path(g,`M ${sx-260} 980 Q ${sx-120} 900 ${sx-20} 880`,null,'#2f3c50',46);ell(g,sx,870,26,20,'#e9dfd0',P.ink,3);
  const w=520*unroll;g.fillStyle='#efe6d2';g.fillRect(sx+10,720,w,240);K.line(g,sx+10,720,sx+10+w,720,'#6a5a46',8);K.line(g,sx+10,960,sx+10+w,960,'#6a5a46',8);if(unroll>0){g.save();g.beginPath();g.rect(sx+10,720,w,240);g.clip();carp(g,sx+275,840,.75,1,1);g.restore()}ell(g,sx+10+w,840,14,126,'#7a5a3a',P.ink,3)}
 g.restore()};
// 1-4 雾中突围：主视角平推跟拍
K.scenes['1-4']=function(g,u){K.sky(g,P);const camx=K.mix(0,1400,K.ease(K.win(u,3.6,10)));g.save();g.translate(-camx*.2,0);K.ridge(g,700,30,.002,0,P.ground[3],{x0:-200,x1:2600});g.restore();
 g.save();g.translate(-camx*.55,0);path(g,'M -400 1100 L -400 760 Q 900 720 3600 770 L 3600 1100 Z',P.ground[1]);
 // 远排：向左绕；近排：向右绕（环形阵在侧视里的两段）
 for(let i=0;i<34;i++){const x=K.wrap(i*92-u*150,3200)-300;K.crowdRider(g,x,760,.2,K.pose(u*150/.2+i*50).crank,-1,P,RINGS[i%4].col,RINGS[i%4].cap)}g.restore();
 g.save();g.translate(-camx,0);path(g,'M -400 1100 L -400 900 Q 1500 860 4000 910 L 4000 1100 Z',P.ground[0],P.ink,3);
 const gap=K.smooth((u-1.6)/1.4);
 for(let i=0;i<16;i++){let x=K.wrap(i*170+u*200,2900)-300;const dx=x-960;if(Math.abs(dx)<420)x+=Math.sign(dx||1)*gap*(420-Math.abs(dx))*.9;const ring=u>1+rand(i)*2&&Math.sin(u*6+i)>.6?1:0;K.rider(g,x,930,.42,{pal:P,pose:K.pose(u*200/.42+i*80),face:1,detail:false,frame:RINGS[i%4].col,capColor:RINGS[i%4].cap,ring:ring*.8,press:ring*10})}
 // 阏氏：张翅拨开队列
 const wing=K.smooth((u-1.2)/.8)*(1-K.smooth((u-4.5)/1));g.save();g.translate(960,930);g.scale(.46,.46);K.rider(g,0,0,1,{pal:P,pose:K.pose(0),face:-1,detail:true,frame:'#d9a441',cap:false});path(g,`M 30 -260 Q ${-120-wing*120} ${-380-wing*80} ${-260-wing*200} ${-240+wing*20} Q -100 -220 30 -230 Z`,P.shade,P.ink,4);g.restore();
 g.restore();
 // 噪声雾团：两层可平铺分形噪声，近层快、远层慢（不再是规整椭圆）
 const far=K.fogTex('fog14a',640,300,{per:5,seed:31,cut:.5,soft:.22}),near=K.fogTex('fog14b',640,300,{per:4,seed:77,cut:.55,soft:.18});
 K.fogDraw(g,far,camx*.7+u*40,260,1920,900,.55);
 // 刘邦与亲兵骑马穿过缺口：前景放大（人马约屏高 0.4），跑步相位 = 位移 / 步幅
 g.save();g.translate(-camx,0);const PARTY=[{k:'han',t0:3.0,dx:-330,y:930,s:.82},{k:'han',t0:3.15,dx:420,y:945,s:.88},{k:'liubang',t0:3.3,dx:0,y:985,s:1.12},{k:'han',t0:3.45,dx:-640,y:1000,s:1.05}];
 PARTY.sort((a,b)=>a.y-b.y);for(const m of PARTY){const p=K.win(u,m.t0,m.t0+6.4);if(p<=0)continue;const x=mix(380,2900,p)+m.dx,dist=(mix(380,2900,p)-380)/m.s;K.horseRider(g,x,m.y,m.s,{pal:P,kind:m.k,phase:dist/300+m.t0,face:1,hi:'#c9d3de',arm:m.k==='han'?-.2:0})}g.restore();
 K.fogDraw(g,near,camx*1.6+u*90,120,2560,1200,.32);
 const tf=g.createLinearGradient(0,64,0,1016);tf.addColorStop(0,K.rgba('#cfd8e2',.55));tf.addColorStop(.3,K.rgba('#cfd8e2',0));tf.addColorStop(.75,K.rgba('#cfd8e2',0));tf.addColorStop(1,K.rgba('#cfd8e2',.5));g.fillStyle=tf;g.fillRect(0,0,1920,1080);
 K.particles(g,u,200,{vx:-420,vy:260,color:P.hi,len:12,lw:2,alpha:.45,id:41});
 const out=K.smooth((u-9)/1);if(out>0){g.fillStyle=K.rgba('#dfe5ea',out*.85);g.fillRect(0,0,1920,1080)}};
})();
