// 第三幕 郅支之战：暗夜火攻
(function(){const P=K.PAL[3],{TAU,rand,mix,smooth,line,ell,path,poly}=K;
function stars(g,u){for(let i=0;i<160;i++){const x=rand(i)*1920,y=70+rand(i+1)*420;g.globalAlpha=.25+.35*Math.abs(Math.sin(u*(1+rand(i+2)*2)+i));ell(g,x,y,1.4,1.4,'#e9d8c0')}g.globalAlpha=1}
// 木城 v2：月光勾出上沿、火光勾出朝火一侧；o.light=[{x,y,r,a}] 火源列表
const MOON='#a99fb8';
function city(g,u,o={}){const L=o.light||[],moon=o.moon??1;poly(g,[[200,640],[1720,640],[1720,860],[200,860]],'#2a1716',null);
 for(let i=0;i<76;i++){const x=200+i*20,h=200+rand(i)*30,top=640-h*.12,lit=K.illum(L,x+9,700);
  poly(g,[[x,860],[x,660-h*.1],[x+10,top],[x+18,660-h*.1],[x+18,860]],i%2?'#3a2220':'#2f1b1a',P.ink,1.5);
  if(moon)line(g,x+1,860,x+1,660-h*.1,K.rgba(MOON,.35*moon),2),line(g,x,660-h*.1,x+10,top,K.rgba(MOON,.6*moon),2);
  if(lit>0){g.globalAlpha=lit;poly(g,[[x,860],[x,660-h*.1],[x+10,top],[x+18,660-h*.1],[x+18,860]],K.rgba('#7a2e18',.55));line(g,x+17,860,x+17,660-h*.1,'#FF9F1C',2.5);line(g,x+10,top,x+18,660-h*.1,'#ffd27a',2);g.globalAlpha=1}
  if(i%4===0)line(g,x,760+rand(i+3)*30,x+80,760+rand(i+4)*30,'#1a0d0c',4)}
 // 横向绑木
 line(g,200,700,1720,700,'#1a0d0c',7);line(g,200,820,1720,820,'#1a0d0c',7);if(moon){line(g,200,697,1720,697,K.rgba(MOON,.3*moon),1.5);line(g,200,817,1720,817,K.rgba(MOON,.3*moon),1.5)}
 for(const tx of [420,960,1500]){const lit=K.illum(L,tx,600);poly(g,[[tx-60,860],[tx-50,470],[tx+50,470],[tx+60,860]],'#3a201e',P.ink,3);for(let k=0;k<7;k++)line(g,tx-56,500+k*52,tx+56,520+k*52,'#22110f',4);
  if(moon){line(g,tx-50,470,tx-60,860,K.rgba(MOON,.55*moon),3)}if(lit>0){g.globalAlpha=lit;line(g,tx+50,470,tx+60,860,'#FF9F1C',4);g.globalAlpha=1}
  poly(g,[[tx-90,470],[tx,400],[tx+90,470]],'#24110f',P.ink,3);if(moon)line(g,tx-90,470,tx,400,K.rgba(MOON,.7*moon),3);
  poly(g,[[tx-52,470],[tx+52,470],[tx+52,500],[tx-52,500]],'#140909');
  // 望楼火盆
  if(o.braziers!==false){K.glow(g,tx+30,488,120,'#FF9F1C',.28);K.flame(g,tx+30,490,26,u,tx,P);ell(g,tx+30,494,16,5,'#0D090A')}}
 // 城门
 poly(g,[[880,860],[880,700],[1040,700],[1040,860]],'#1d0f0e',P.ink,3);for(let k=1;k<5;k++)line(g,880+k*32,700,880+k*32,860,'#2c1614',3);line(g,880,700,1040,700,K.rgba(MOON,.5*moon),2);
 const gl=K.illum(L,960,780);if(gl>0){g.globalAlpha=gl;line(g,1040,700,1040,860,'#FF9F1C',4);line(g,880,700,1040,700,'#ffd27a',3);g.globalAlpha=1}}
// 拒马：交叉削尖木桩 + 倒立二八大杠（车座朝下扎地、双轮朝天空转）
function chevaux(g,u,o){const F=o.fire||(()=>-1),moon=o.moon??0;for(let row=0;row<2;row++)for(let i=0;i<11;i++){const id=row*11+i,x=280+i*140+row*70,y=932+row*48,s=.4+row*.06,ig=F(id),bend=ig>=0?smooth((u-ig-1.2)/2)*.8:0;
 g.save();g.translate(x,y);g.scale(s,s);for(const sd of [-1,1]){line(g,-120*sd,20,150*sd,-250,P.ink,22);line(g,-120*sd,20,150*sd,-250,'#5a3a26',14);poly(g,[[150*sd-10,-246],[150*sd+10,-252],[165*sd,-285]],'#c9a27a',P.ink,2);if(moon)line(g,-120*sd,14,150*sd,-256,K.rgba(MOON,.6*moon),3)}
 g.save();g.translate(0,-90);g.rotate(Math.PI);const spin=u*(1.2+rand(id))*(ig>=0&&u>ig?.4:1);K.bike(g,{pal:P,wheel:spin,frontWheel:spin*1.1,crank:spin/2.5,bend,detail:true});g.restore();
 if(moon){g.globalAlpha=.5*moon;ell(g,-165,-90-0,94,94,null,MOON,3);ell(g,181,-90,94,94,null,MOON,3);g.globalAlpha=1}g.restore();
 if(ig>=0&&u>ig){const q=smooth((u-ig)/.6);K.glow(g,x,y-60,220*q,'#FF9F1C',.35);K.flame(g,x,y-10,95*q,u,id,P)}}}
K.chevaux=chevaux;K.city=city;
// 3-1 夜景低空潜行推进
K.scenes['3-1']=function(g,u){K.sky(g,{sky:['#0D090A','#2a1416','#4a2426']});
 // 月亮与月晕（冷光源，照亮城墙上沿）
 K.glow(g,330,230,380,'#8f86a8',.35);ell(g,330,230,62,62,'#e9dcc0');ell(g,345,222,52,52,K.rgba('#c9b8a0',.35));stars(g,u);
 const z=K.logZoom(1,1.45,K.ease(u/10));g.save();K.cam(g,960,740,z,0,960,600);
 K.ridge(g,840,10,.004,0,'#1e0f0f');poly(g,[[-400,850],[2400,850],[2400,1300],[-400,1300]],'#2a1514');K.hatch(g,-200,860,2400,300,-.05,16,K.rgba(MOON,.16),1.4,33,80);
 const LT=[{x:450,y:488,r:260,a:.55},{x:990,y:488,r:260,a:.55},{x:1530,y:488,r:260,a:.55}];city(g,u,{light:LT});
 // 哨兵鹈鹕：城门楼上倚戟打瞌睡。慢慢垂头 → 猛地惊醒抬头，循环
 const c=K.wrap(u+.4,2.6)/2.6,nod=c<.78?K.easeIn(c/.78):1-K.easeOut((c-.78)/.22),sleep=nod>.35?1:0;
 K.glow(g,1000,560,260,'#FF9F1C',.22);line(g,1050,705,1095,330,P.ink,9);poly(g,[[1095,330],[1088,290],[1104,328]],'#c9a27a',P.ink,2);line(g,1090,350,1118,360,P.ink,5);
 K.walker(g,1000,706,.5,{pal:P,phase:0,still:true,cap:true,nod,sleep,detail:true});
 if(u>.5){for(let k=0;k<3;k++){const q=K.wrap(u*.6+k/3,1);g.globalAlpha=(1-q)*.8*(nod>.4?1:.3);K.text(g,'z',1080+q*70+k*4,520-q*110,22+q*26,'#e9dcc0',{weight:'bold',font:'serif'});g.globalAlpha=1}}
 chevaux(g,u,{moon:1});
 g.restore();
 // 前景草丛（视差）与夜袭部队
 for(let k=0;k<7;k++){const p=K.win(u,3+k*.35,9.6+k*.2),x=mix(-150,1700,p),y=1005;if(p>0&&p<1)K.soldier(g,x,y,.5,{pal:P,phase:u*9+k,run:.5,weapon:'dao',face:1,rim:MOON})}
 for(let i=0;i<70;i++){const x=K.wrap(rand(i)*2400-u*220*(1+rand(i+1)),2400)-240,h=50+rand(i+2)*90;path(g,`M ${x} 1020 Q ${x+8} ${1020-h*.6} ${x+18+Math.sin(u*2+i)*6} ${1020-h}`,null,'#050303',6)}};
// 3-2 陈汤挥剑 → 甩镜 → 火箭雨
const IGN=[];for(let i=0;i<28;i++)IGN.push(3.0+rand(i+300)*4.5);const BOOMS=[3.4,4.3,5.6,6.9],POPS=[4.9,6.2,8.1];
K.scenes['3-2']=function(g,u){K.sky(g,P);stars(g,u);
 const whip=K.ease(K.win(u,2.2,2.75)),camx=mix(0,1600,whip),[sx,sy]=K.shake(u,BOOMS.concat(POPS),16,5);g.save();g.translate(sx,sy);
 g.save();g.translate(-camx+1600,0);const LT=[];for(let k=0;k<6;k++){const t0=3.5+k*.7;if(u>t0)LT.push({x:300+k*260,y:640,r:420,a:.9*smooth((u-t0)/.8)})}for(let i=0;i<22;i++)if(u>IGN[i])LT.push({x:280+(i%11)*140+(i>=11?70:0),y:900,r:300,a:.6*smooth((u-IGN[i])/.6)});city(g,u,{light:LT,moon:.5});for(const l of LT)K.glow(g,l.x,l.y-40,l.r*.8,'#FF9F1C',.3*l.a);chevaux(g,u,{fire:i=>i<22?IGN[i]:-1,moon:.3});
 // 城上火势与浓烟
 for(let k=0;k<6;k++){const t0=3.5+k*.7;if(u>t0){K.flame(g,300+k*260,650,90*smooth((u-t0)/.8),u,k+90,P);for(let j=0;j<6;j++){const d=(u-t0)*(.5+j*.1);g.globalAlpha=.25;ell(g,300+k*260+Math.sin(j+u)*30,640-d*120-j*30,40+d*30,30+d*20,'#2a1a18')}g.globalAlpha=1}}
 g.restore();
 // 陈汤：左前景剪影，火光勾边
 g.save();g.translate(-camx,0);const arm=u<1?-.3:mix(-.3,-2.4,K.easeOut(K.win(u,1,1.4)));K.soldier(g,520,1040,2.4,{pal:P,weapon:'dao',arm,face:1,rim:'#FF9F1C'});
 for(let r=0;r<3;r++)for(let i=0;i<16;i++){const lit=u>1.6+i*.03+r*.08;if(lit)ell(g,900+i*55+r*20,820-r*40,5,7,'#FF9F1C')}g.restore();
 // 火箭：红色流星雨
 if(u>1.8)for(let i=0;i<300;i++){const t0=1.8+rand(i+70)*5.8,q=(u-t0)/1.3;if(q<0||q>1)continue;const x=-200+rand(i+71)*600+q*1900,y=200+q*500-Math.sin(q*Math.PI)*300+rand(i+72)*200,a=Math.atan2(500-300*Math.PI*Math.cos(q*Math.PI),1900);g.save();g.translate(x,y);g.rotate(a);line(g,-60,0,0,0,K.rgba('#FF9F1C',.5),3);ell(g,0,0,4,3,'#ffd27a');g.restore()}
 // 爆胎/爆炸：短促的刻白放射
 for(const e of BOOMS.concat(POPS)){const d=u-e;if(d>=0&&d<.35){g.globalAlpha=1-d/.35;const x=400+rand(e*10)*1100,y=900;for(let k=0;k<12;k++){const a=k/12*TAU;line(g,x+Math.cos(a)*20,y+Math.sin(a)*20,x+Math.cos(a)*(40+d*400),y+Math.sin(a)*(40+d*300),'#ffd27a',3)}g.globalAlpha=1}}
 if(whip>0&&whip<1){g.globalAlpha=.5*Math.sin(whip*Math.PI);for(let k=0;k<50;k++){const y=80+rand(k)*920;line(g,0,y,1920,y,'#2a1112',6)}g.globalAlpha=1}
 g.restore()};
// 3-3 城门倒塌 → 汉军涌入 → 城头钉旗
K.scenes['3-3']=function(g,u){K.sky(g,P);
 if(u<3.6){const z=1+.35*K.easeOut(K.win(u,1.6,1.95)),[sx,sy]=K.shake(u,[1.6],22,6);g.save();g.translate(sx,sy);K.cam(g,960,700,z,0,960,600);
  poly(g,[[0,860],[1920,860],[1920,1100],[0,1100]],'#140909');poly(g,[[600,860],[600,300],[1320,300],[1320,860]],'#1c0f0f',K.rgba(P.hi,.2),3);
  // 两侧栅墙：火光由门楼向外衰减
  for(let i=0;i<34;i++){const x=i<17?i*36-20:1320+(i-17)*36+20,top=420+rand(i+77)*40,lt=Math.max(.15,1-Math.abs(x-960)/900);poly(g,[[x,860],[x,top+20],[x+14,top],[x+28,top+20],[x+28,860]],'#3a1d18',P.ink,2);g.globalAlpha=lt;line(g,x<960?x+27:x+1,860,x<960?x+27:x+1,top+20,'#FF9F1C',3);line(g,x,top+20,x+14,top,'#ffd27a',2);g.globalAlpha=1}
  for(let k=0;k<4;k++){const fx=[150,420,1500,1770][k];K.glow(g,fx,440,240,'#FF9F1C',.28);K.flame(g,fx,450,70,u,k+140,P)}
  // 门楼：木构轮廓被火光勾亮
  for(let k=0;k<7;k++){const x=640+k*100;line(g,x,860,x,300,'#2a1512',10);line(g,x+5,860,x+5,300,K.rgba('#FF9F1C',.45),2.5)}for(let k=0;k<5;k++){const y=360+k*110;line(g,600,y,1320,y,'#2a1512',8);line(g,600,y-4,1320,y-4,K.rgba('#ffd27a',.4),2)}
  poly(g,[[560,300],[960,200],[1360,300]],'#24110f',P.ink,4);line(g,560,300,960,200,'#FF9F1C',4);line(g,960,200,1360,300,'#ffd27a',3);
  line(g,600,300,600,860,'#FF9F1C',5);line(g,1320,300,1320,860,'#FF9F1C',5);
  for(let k=0;k<8;k++){K.glow(g,620+k*95,290,200,'#FF9F1C',.3);K.flame(g,620+k*95,320,80,u,k+40,P)}
  // 两扇门绕底边铰链向外倒下
  const fall=Math.min(1,K.easeIn(K.win(u,.7,1.6)))+(u>1.6?Math.sin(Math.min(1,(u-1.6)/.3)*Math.PI)*-.05:0);
  for(const side of [-1,1]){g.save();g.translate(960+side*170,860);const sc=Math.cos(fall*Math.PI/2);g.scale(1,Math.max(.02,sc));poly(g,[[-170,0],[-170,-520],[170,-520],[170,0]],'#2b1612',P.ink,4);for(let k=0;k<6;k++)line(g,-170+k*68,0,-170+k*68,-520,'#3f2018',5);K.flame(g,0,-300,140*smooth(u/1.5),u,side+50,P);g.restore()}
  if(u>1.6){const d=u-1.6;g.globalAlpha=Math.max(0,.6-d*.3);for(let k=0;k<14;k++)ell(g,700+k*40,860-d*60*rand(k),60+d*90,30+d*40,'#3a2a26');g.globalAlpha=1}
  // 汉军如潮水涌入（前景大→纵深小）
  for(let i=0;i<40;i++){const t0=1.8+rand(i+400)*1.6,p=K.win(u,t0,t0+1.3);if(p<=0||p>=1)continue;const x=mix(200+rand(i+401)*1500,920+rand(i+402)*80,p),y=mix(1150,860,p),s=mix(1.2,.25,p);K.soldier(g,x,y,s,{pal:P,phase:u*12+i,run:.8,weapon:'dao',face:x<960?1:-1,rim:'#FF9F1C'})}
  g.restore();return}
 const v=u-3.6,cz=K.ease(K.win(v,1,2.4)),z=K.logZoom(1,1.75,cz);g.save();K.cam(g,mix(960,1290,cz),mix(560,370,cz),z);
 poly(g,[[0,700],[1920,700],[1920,1100],[0,1100]],'#1a0e0e',K.rgba(P.hi,.15),3);for(let i=0;i<12;i++)poly(g,[[i*170,700],[i*170,620],[i*170+110,620],[i*170+110,700]],'#1f1110',K.rgba(P.hi,.2),2);
 for(let i=0;i<12;i++){const x=i*170,lt=K.illum([0,1,2,3,4].map(k=>({x:150+k*400,y:680,r:330,a:1})),x+55,650);g.globalAlpha=Math.min(1,lt+.15);line(g,x,700,x,620,'#FF9F1C',4);line(g,x,620,x+110,620,'#ffd27a',3);line(g,x+110,620,x+110,700,'#FF9F1C',4);g.globalAlpha=1}
 for(let k=0;k<12;k++){const y=740+k*30;line(g,0,y,1920,y,K.rgba('#3a1a14',.8),3)}for(let k=0;k<5;k++){K.glow(g,150+k*400,640,330,'#FF9F1C',.32);K.flame(g,150+k*400,700,120,u,k+60,P)}
 // 匈奴旗杆被砍倒
 const fallen=smooth(K.win(v,.4,1.0));K.flag(g,600,620,.9,u,P,{rot:fallen*1.4,color:'#2a1a16',text:false});K.soldier(g,520,700,.9,{pal:P,weapon:'dao',arm:v<.4?-2:.6,face:1,rim:'#FF9F1C'});
 // 赤红大旗钉上垛口，金字逐渐显出
 const slam=K.easeOut(K.win(v,1.0,1.2)),unf=K.easeOut(K.win(v,1.2,2.0)),tx=K.win(v,2.0,3.6);
 g.save();g.translate(1080,640);g.scale(.6+.4*slam,.6+.4*slam);line(g,-20,-20,-20,-440,P.ink,10);const fw=420*unf,wv=Math.sin(u*5)*10;
 path(g,`M -20 -430 Q ${fw*.5} ${-450+wv} ${fw} -430 L ${fw} ${-150+wv} Q ${fw*.5} -130 -20 -150 Z`,'#9E2A2B',P.ink,4);if(v>1.05&&v<1.4){g.globalAlpha=1-(v-1.05)/.35;for(let k=0;k<8;k++)line(g,-20,-430,-20+Math.cos(k)*60,-430+Math.sin(k)*60,'#ffd27a',3);g.globalAlpha=1}
 if(unf>.95){const L1='明犯强汉者',L2='虽远必诛';[...L1].forEach((c,i)=>{const a=smooth(tx*9-i);g.globalAlpha=a;K.cq(g,c,56+i*78,-356,72,'#f0c060',{hi:'#3a0e0e'})});[...L2].forEach((c,i)=>{const a=smooth(tx*9-5-i);g.globalAlpha=a;K.cq(g,c,96+i*78,-236,72,'#f0c060',{hi:'#3a0e0e'})});g.globalAlpha=1}
 g.restore();g.restore()};
// 3-4 弃车螺旋升空
const BIRDS=[];for(let i=0;i<240;i++)BIRDS.push({L:.3+rand(i+500)*3.6,th:rand(i+501)*TAU,w:(.9+rand(i+502)*.8),x0:200+rand(i+503)*1500,k:120+rand(i+504)*160});
K.scenes['3-4']=function(g,u){K.sky(g,P);const lift=K.easeIn(K.win(u,2,9))*700,rot=Math.sin(u*.35)*.06;g.save();K.cam(g,960,540-lift,1,rot);
 poly(g,[[-400,860],[2400,860],[2400,1700],[-400,1700]],'#180b0b');for(let k=0;k<9;k++)K.flame(g,100+k*220,860,150,u,k+70,P);
 // 被抛弃的二八大杠（还在燃烧）
 for(let i=0;i<12;i++){g.save();g.translate(150+i*150,940);g.scale(.3,.3);g.rotate(rand(i+600)*.6-.3);K.bike(g,{pal:P,wheel:u*(rand(i)+.2),crank:0,bend:.4,detail:false});g.restore();K.flame(g,150+i*150,930,40,u,i+120,P)}
 // 鸟群龙卷：半径随高度增大，角速度递减
 const list=[];for(let i=0;i<BIRDS.length;i++){const b=BIRDS[i],d=u-b.L;let x,y,s,face;if(d<0){x=b.x0;y=930;s=.16;face=1;list.push({x,y,s,face,fl:0,d:-1});continue}const h=Math.pow(d,1.35)*b.k,r=80+h*.45,th=b.th+d*b.w*(2.4-Math.min(1.4,h/900));x=mix(b.x0,960,smooth(d/1.2))+r*Math.cos(th);const dep=Math.sin(th);y=880-h+r*.22*dep;s=.16*(1+.35*dep)*(1+h/1600);face=Math.sin(th)>0?-1:1;list.push({x,y,s,face,fl:u*(10+rand(i)*3)+i,d,dep})}
 list.sort((a,b)=>(a.dep||0)-(b.dep||0));for(const b of list){if(b.d<0){g.save();g.translate(b.x,b.y);g.scale(.16,.16);K.walker(g,0,0,1,{pal:P,phase:u*20,detail:false});g.restore();continue}if(b.s>.22)K.flyer(g,b.x,b.y,b.s,{pal:P,flap:b.fl,face:b.face,detail:b.s>.3});else{const f=Math.sin(b.fl)*14*b.s/.16;path(g,`M ${b.x-26} ${b.y-f} Q ${b.x} ${b.y+6} ${b.x+26} ${b.y-f}`,null,P.body,5);line(g,b.x,b.y,b.x+b.face*-22,b.y+2,P.bill,4)}}
 // 掉落的羽毛
 for(let i=0;i<40;i++){const x=rand(i+700)*1920+Math.sin(u*2+i)*30,y=K.wrap(rand(i+701)*1500+u*90,1500)-200-lift*.2+540-540;g.save();g.translate(x,y+lift);g.rotate(Math.sin(u*3+i));ell(g,0,0,10,3,K.rgba(P.body,.6));g.restore()}
 g.restore()};
})();
