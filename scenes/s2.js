// 第二幕 漠北决战：落日金红。2-2 的人像与短样同源（已改为本引擎调用）。
(function(){const P=K.PAL[2],{TAU,rand,mix,smooth,line,ell,path,poly}=K;
function terrain(g,t,stretch=1,off=0){K.sky(g,P);ell(g,1425+(stretch-1)*150,358,122,122,'#f5bd75');for(let i=0;i<13;i++)line(g,1306,315+i*11,1547,315+i*11,'#d97845',1.4);
 for(let j=0;j<4;j++){const y=540+j*94,amp=65+j*13,o=off*(.25+j*.25);g.save();g.translate(960,0);g.scale(stretch,1);g.translate(-960,0);K.ridge(g,y,amp,.0027+j*.0005,o,P.ground[j],{ph:j*1.7,cut:j%2?'#a75b3a':'#dc8b54',n:36,id:j*80,x0:-300,x1:2300});g.restore()}
 K.particles(g,t,110,{vx:-110,vy:4,color:P.hi,len:20,lw:1.5,alpha:.25,id:900,area:[-100,380,2200,600]})}
K.terrain2=terrain;
// 2-1 视差横摇：左汉军重骑方阵 → 右胡帽鹈鹕大军与沙墙
K.scenes['2-1']=function(g,u){const p=K.easeIn(K.win(u,.3,8.6)),cx=mix(0,2500,p);terrain(g,u,1,cx*.6);
 g.save();g.translate(-cx*.5,0);for(let row=0;row<3;row++)for(let i=0;i<30;i++){const x=40+i*58+(row%2)*28,y=650+row*60;K.horseman(g,x,y,.15+row*.04,u,i+row*30,P)}
 for(let i=0;i<6;i++)K.flag(g,180+i*300,640,.55,u,P,{color:'#241817',textColor:'#d39154'});g.restore();
 // 右侧：沙墙（后轮卷起）
 g.save();g.translate(-cx*.5,0);for(let k=0;k<26;k++){const x=2100+k*90,h=260+rand(k)*200+Math.sin(u*2+k)*30;g.globalAlpha=.55;ell(g,x,640-h*.5,120+rand(k+3)*60,h*.6,k%2?'#e08a55':'#c96a42')}g.globalAlpha=1;
 for(let row=0;row<4;row++)for(let i=0;i<34;i++){const s=.13+row*.035,x=2050+i*62+(row%2)*30-u*260*s,y=660+row*55;K.crowdRider(g,x,y,s,K.pose(u*260+i*70+row*33).crank,-1,P,P.metal,P.cap)}g.restore();
 // 近景主体：汉军重骑与鹈鹕前排（大且可辨）
 g.save();g.translate(-cx,0);for(let i=0;i<7;i++)K.horseman(g,120+i*230,960-(i%2)*30,.78,u,i,P,{sparks:true});K.flag(g,560,930,1.35,u,P,{color:P.accent});
 for(let i=0;i<8;i++){const x=2700+i*250-u*260*.62;K.rider(g,x,950-(i%2)*30,.62,{pal:P,pose:K.pose(u*260+i*120),face:-1,detail:i<4})}
 g.restore();path(g,`M -50 1008 Q 380 ${960+Math.sin(u)*12} 780 1010 Q 1460 950 1970 999 L 1970 1100 L -50 1100 Z`,P.ink,null);
 // 横摇速度线（版画刀痕，非炫光）
 if(p>.3){g.globalAlpha=(p-.3)*.25;for(let k=0;k<30;k++){const y=120+rand(k)*860;line(g,rand(k+5)*1920,y,rand(k+5)*1920+200,y,'#fbe0b4',2)}g.globalAlpha=1}};
// 2-2 霍去病：模拟希区柯克变焦（脸部尺寸不变，背景横向拉伸）
K.scenes['2-2']=function(g,u){const z=smooth(u/3.4);terrain(g,u+20,1+z*.7,u*40);g.save();g.translate(960,0);const t=u,w=Math.sin(t*4)*20,w2=Math.sin(t*5.3+1)*14;
 path(g,`M -200 641 C -500 ${610+w} -558 839 -948 ${865+w} L -802 994 Q -384 ${931-w} -95 992 L 285 1006 L 199 650 Z`,'#9b3029',P.ink,7);path(g,`M -260 700 C -500 ${700+w2} -600 900 -900 ${930+w2} L -820 1000 Q -500 950 -200 1000 Z`,'#c04e36',P.ink,4);for(let i=0;i<8;i++)path(g,`M ${-180+i*40} 675 Q ${-500+i*52} ${810+w+i*5} ${-800+i*95} 970`,null,i%2?'#5c2320':'#c04e36',10);
 path(g,'M -155 637 Q -317 637 -398 748 L -462 1035 L 454 1035 L 373 750 Q 290 648 154 634 Z','#302925',P.ink,8);path(g,'M -172 663 Q -322 628 -394 751 L -377 829 Q -282 806 -170 793 Z','#3c3630',P.hi,3);path(g,'M 165 663 Q 314 634 391 759 L 373 827 Q 269 810 172 791 Z','#3c3630',P.hi,3);
 for(let row=0;row<7;row++)for(let col=0;col<12;col++){const x=-277+col*48+(row%2)*21,y=739+row*43;if(Math.abs(x)>320-row*3)continue;path(g,`M ${x} ${y} L ${x+40} ${y-1} L ${x+38} ${y+36} Q ${x+20} ${y+45} ${x+1} ${y+35} Z`,col>5?'#4b4238':'#302d29','#b18c5a',1.5);line(g,x+6,y+5,x+30,y+5,'#d3ad72',1.4);ell(g,x+9,y+13,2,2,P.hi);ell(g,x+30,y+13,2,2,P.hi)} // 札甲：甲片编缀
 path(g,'M -91 536 L -107 656 L -2 715 L 106 649 L 81 530 Z','#c38451',P.ink,5);path(g,'M -128 625 L -4 696 L -18 743 L -150 665 Z','#2c2925',P.hi,3);path(g,'M 125 624 L -4 696 L 10 742 L 149 662 Z','#2c2925',P.hi,3);
 path(g,'M -146 301 Q -156 431 -117 526 L -63 580 L 5 612 L 82 572 L 131 500 Q 160 405 137 297 L 13 252 Z','#e1a16b',P.ink,7);path(g,'M -141 318 L -91 328 L -98 431 L -68 506 L -4 550 L 27 602 L -59 579 L -119 527 Q -151 436 -141 318 Z','#9a583d',null);path(g,'M 37 315 L 116 325 L 126 405 L 94 440 L 91 502 L 49 538 L 10 535 L 19 501 L -4 468 L 20 393 Z','#f0c08a',null);
 path(g,'M -147 387 Q -192 370 -173 438 L -137 467 Z','#ba7951',P.ink,4);path(g,'M 140 384 Q 182 374 166 440 L 137 461 Z','#d99b65',P.ink,4);
 const sh=smooth((u-4.1)/.12),j=sh*Math.sin(u*95)*2.6*(1-smooth((u-6)/1)),ey=399;
 path(g,`M -116 ${ey-17-sh*9} Q -74 ${ey-34-sh*5} -31 ${ey-13} L -42 ${ey+7+sh*8} Q -80 ${ey+17+sh*5} -112 ${ey+1} Z`,'#f4d3a1',P.ink,4);path(g,`M 31 ${ey-12} Q 76 ${ey-34-sh*6} 119 ${ey-19-sh*8} L 113 ${ey+1} Q 77 ${ey+17+sh*5} 39 ${ey+8+sh*7} Z`,'#f4d3a1',P.ink,4);
 ell(g,-66+j,ey-2,8-sh*2.5,13-sh*2,P.ink);ell(g,70+j,ey-2,8-sh*2.5,13-sh*2,P.ink);ell(g,-63+j,ey-6,2,3,P.body);ell(g,73+j,ey-6,2,3,P.body);
 path(g,`M -121 ${ey-34-sh*14} L -78 ${ey-40-sh*10} L -27 ${ey-24-sh*5}`,null,P.ink,10);path(g,`M 30 ${ey-25-sh*6} L 80 ${ey-41-sh*10} L 123 ${ey-36-sh*15}`,null,P.ink,10);
 path(g,'M -2 405 L -22 465 L -5 477 L 24 470',null,'#713f2f',4);path(g,`M -43 523 Q 0 ${518+sh*7} 43 520`,null,P.ink,4);
 path(g,'M -165 341 Q -164 223 -100 190 Q 0 131 108 192 Q 174 247 166 343 L 115 317 Q -3 281 -123 323 Z','#272625',P.ink,7);for(let i=-3;i<=3;i++){const x=i*41;path(g,`M ${x*.5} ${182+Math.abs(i)*4} Q ${x*1.12} 230 ${x*1.15} 306`,null,'#997f55',4)}
 path(g,'M -172 330 Q 0 266 172 329 L 166 352 Q 0 305 -167 353 Z','#64503a',P.ink,5);path(g,'M -167 346 L -139 344 L -125 483 L -149 532 L -183 491 Z','#302d28',P.hi,3);path(g,'M 142 345 L 167 347 L 182 485 L 148 530 L 125 484 Z','#302d28',P.hi,3);
 path(g,`M -30 179 Q -62 91 -194 ${103+w*.2} Q -97 123 -92 181 L -64 215 Z`,'#90322b',P.ink,5);g.restore();
 if(u>=4.1&&u<4.58){const a=(u-4.1)/.48;g.globalAlpha=(1-a)*.6;for(let k=0;k<3;k++)ell(g,1160,400,45+a*420+k*32,45+a*420+k*32,null,'#f7cc83',2);g.globalAlpha=1}};
// 2-3 万弩齐发 → 子弹时间接箭
const tau=K.profile([[0,1],[3.6,1],[4.3,.17],[10.6,.17],[11.2,1],[14,1]]);
const HITS=[5.4,7.6,9.8,12.6],MID=[[6.5,1],[8.7,0]];
K.scenes['2-3']=function(g,u){
 if(u<3.2){ // 仰拍：弩手与抛物线箭云
  K.sky(g,P);ell(g,1500,300,140,140,'#f5bd75');K.ridge(g,880,30,.003,0,P.ground[3]);
  // 箭雨目标：远处鹈鹕骑阵（右侧地平线），一只抬头看天
  for(let r=0;r<3;r++)for(let i=0;i<14;i++){const x=1040+i*68+r*30+((u*60*(1+r*.3))%68),y=880+r*22,s=.1+r*.035;K.crowdRider(g,x,y,s,K.pose(u*500+i*70).crank,-1,P,P.metal,P.cap)}
  {const al=smooth((u-.9)/.4);K.rider(g,1640,1000,.62,{pal:P,pose:K.pose(u*300),face:-1,alert:al,drop:.25*al,detail:true})}
  for(let i=0;i<9;i++)K.soldier(g,120+i*110,1010,.95-i*.04,{pal:P,weapon:'bow',arm:-.9+(u>.5?.15:0),face:1,phase:0,rim:P.hi});
  for(let i=0;i<420;i++){const t0=.5+rand(i)*.7,q=(u-t0)/2.4;if(q<0||q>1.2)continue;const x=200+q*2000+rand(i+5)*500-200,y=900-q*900+q*q*600-rand(i+9)*300;const a=Math.atan2(-900+1200*q,2000);g.save();g.translate(x,y);g.rotate(a);line(g,-46,0,0,0,P.ink,2.4);g.restore()}
  return}
 const v=u-3.2,T=tau(u),groundShift=T*700*.42;terrain(g,T,1,-groundShift*.6);
 for(let r=0;r<2;r++)for(let i=0;i<9;i++){const x=200+i*215+r*100,y=711+r*130;K.crowdRider(g,x,y,.26+r*.11,K.pose(T*700+i*90).crank,-1,P,P.metal,P.cap)}
 // 远空箭云（慢动作）
 if(v<1.6)for(let i=0;i<60;i++){const q=(T-tau(3.2)-rand(i)*.2)/.9;if(q<0||q>1)continue;const x=-200+q*1300+rand(i+3)*500,y=100+rand(i+4)*200+q*q*300;g.save();g.translate(x,y);g.rotate(.4);line(g,-50,0,0,0,'#33201a',3);g.restore()}
 // 中景两位骑手也在接箭
 MID.forEach(([h,k],i)=>{const x=420+i*560,y=950,s=.7,dp=smooth((u-(h-1.2))/.5)*(1-smooth((u-h-.6)/.4)),pf=.6*Math.max(0,K.spring(u-h,13,.25))*(u>h?1:0)*(1-smooth((u-h-1.4)/.5));K.rider(g,x,y,s,{pal:P,pose:K.pose(T*700+i*200),face:-1,drop:dp,puff:pf,detail:true});arrowTo(g,u,h,x-s*255,y-s*(372-dp*30),-400,200+i*80,.9)});
 // 主角
 const bx=1300,by=880,bs=1.45;let drop=0,puff=0,alert=smooth((u-3.6)/.5);for(const h of HITS){drop=Math.max(drop,smooth((u-(h-1.1))/.4)*(1-smooth((u-h-.35)/.3)));if(u>h)puff+=.42*K.spring(u-h,12,.22)*Math.exp(-(u-h)*.25)}
 const capHop=u>12.6?Math.max(0,Math.sin((u-12.6)/.55*Math.PI))*70*(u<13.15?1:0):0;
 K.rider(g,bx,by,bs,{pal:P,pose:K.pose(T*700),face:-1,drop,puff:Math.min(puff,.9),alert,capHop,ring:u>13&&u<13.6?1-(u-13)/.6:0,detail:true});
 HITS.forEach((h,i)=>arrowTo(g,u,h,bx-bs*255,by-bs*(372-drop*30),-300-i*60,250+i*60,1.25));
 for(const h of HITS){const d=u-h;if(d>=0&&d<.3){g.globalAlpha=(1-d/.3)*.8;const mx=bx-bs*255,my=by-bs*350;for(let i=0;i<7;i++){const a=i*TAU/7;line(g,mx+Math.cos(a)*(20+d*90),my+Math.sin(a)*(20+d*90),mx+Math.cos(a)*(30+d*150),my+Math.sin(a)*(30+d*150),P.body,2.5)}g.globalAlpha=1}}
 for(let i=0;i<32;i++){const x=K.wrap(i*71+T*700*1.45,2200)-150,y=990+rand(i+555)*24;line(g,x,y,x+rand(i+701)*38+8,y+4,'#9c6240',2)}};
// 箭：沿抛物线飞抵嘴缘才被“吞入”（箭杆缩短消失），不穿身体
function arrowTo(g,u,h,mx,my,sx,sy,sz){const dur=1.9,q=(u-(h-dur))/dur;if(q<0||u>h+.25)return;const qq=Math.min(q,1);const x=mix(sx,mx,qq),y=mix(sy,my,qq)-240*Math.sin(Math.PI*qq),dx=mx-sx,dy=my-sy-240*Math.PI*Math.cos(Math.PI*qq);const L=u<h?140:140*(1-(u-h)/.25);g.save();g.translate(x,y);g.rotate(Math.atan2(dy,dx));line(g,-L*sz,0,0,0,'#2b1814',3*sz);poly(g,[[0,0],[-16*sz,-6*sz],[-12*sz,0],[-16*sz,6*sz]],'#2b1814');if(L>20)poly(g,[[-L*sz,0],[(-L+14)*sz,-8*sz],[(-L+27)*sz,0],[(-L+14)*sz,8*sz]],'#2b1814');g.restore()}
// 2-4 封狼居胥：立旗 → 摇臂拉升俯瞰满谷废车
const WRECK=[];for(let i=0;i<54;i++)WRECK.push({x:-100+rand(i)*2300,y:1000+rand(i+50)*560,rot:(rand(i+7)-.5)*1.4,bend:rand(i+9),bar:(rand(i+11)-.5)*1.6,spin:4+rand(i+13)*8,stop:3+rand(i+15)*5.5});
WRECK.push({x:1450,y:1560,rot:.25,bend:.6,bar:.9,spin:9,stop:9.0,last:true});WRECK.sort((a,b)=>a.y-b.y);
K.scenes['2-4']=function(g,u){const c=K.ease(K.win(u,3.4,9.6)),z=K.logZoom(1.9,.7,c),cx=mix(620,1000,c),cy=mix(430,1020,c);K.sky(g,P);
 g.save();K.cam(g,cx,cy,z);ell(g,1100,380,220,220,'#f5bd75');for(let i=0;i<18;i++)line(g,880,300+i*12,1320,300+i*12,'#d97845',1.6);
 // 狼居胥山
 poly(g,[[-800,960],[-200,760],[300,560],[620,470],[880,620],[1300,760],[2800,960]],P.ground[3],P.ink,5);poly(g,[[-900,930],[2900,930],[2900,1900],[-900,1900]],P.ground[1],P.ink,4);K.hatch(g,-400,940,2800,800,.05,22,K.rgba(P.ink,.25),2,4,90);K.hatch(g,300,480,700,500,1.1,16,K.rgba('#f4a261',.35),2,3,70);
 // 将士立旗：两次发力
 const raise=Math.min(K.easeOut(K.win(u,.5,1.6))*.55+K.easeOut(K.win(u,2.0,3.0))*.45,1),rot=mix(-1.25,0,raise);K.flag(g,640,470,.6,u,P,{rot,color:'#b2302a'});
 for(let k=0;k<4;k++)K.soldier(g,590+k*36,478+k*3,.3,{pal:P,phase:0,arm:-1.2+raise*.6,face:k%2?-1:1,rim:P.hi});
 // 山谷：废旧二八大杠，车把扭曲、轮子空转减速
 for(const w of WRECK){const tt=Math.min(u,w.stop),ang=w.spin*(tt-tt*tt/(2*w.stop));const wob=w.last&&u>w.stop?Math.sin((u-w.stop)*20)*.05*Math.exp(-(u-w.stop)*6):0;g.save();g.translate(w.x,w.y);g.rotate(w.rot);g.scale(w.last?.75:.36,w.last?.75:.36);K.bike(g,{pal:P,wheel:0,frontWheel:ang+wob,crank:0,bend:w.bend,barRot:w.bar,detail:w.last,frontOff:[0,0,0]});g.restore()}
 g.restore();
 // 封山字幕：曹全碑隶书大字 + 小字，置左上天空（避开旗与将士）
 {const a=K.smooth(K.win(u,1.2,2.0))*(1-K.smooth(K.win(u,8.4,9.2)));if(a>0){g.globalAlpha=a;K.cqLine(g,'封狼居胥',430,200,104,'#2a0e08',{hi:'#F4A261'});K.cqLine(g,'霍去病',430,296,44,'#2a0e08',{hi:K.rgba('#F4A261',.8)});g.globalAlpha=1}}
 g.save();
 g.restore()};
})();
