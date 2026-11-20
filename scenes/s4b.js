// 4-0 稽落山之战（v3 新增）：窦宪汉骑 + 南匈奴联军自东（右）冲阵；北匈奴鹈鹕单车阵被冲散，车铃乱响，羽毛、车轮飞散；不血腥
(function(){const P=K.PAL[4],{TAU,rand,mix,smooth,line,ell,path,poly}=K;
const D=K.profile([[0,640],[2.4,640],[4.2,360],[9,220]]),front=u=>2080-D(u);
// 每个鹈鹕被冲到的时刻：前锋到达其 x（预先数值求解，纯函数）
const PEL=[];[[790,.19,70,17,60],[850,.27,96,12,110],[930,.38,128,9,140]].forEach(([y,s,sp,n,x0],r)=>{for(let i=0;i<n;i++){const x=x0+i*sp+rand(r*40+i)*20;let tc=99;for(let u=0;u<9;u+=.005)if(front(u)<=x+40*s/.38){tc=u+rand(r*40+i+1)*.25;break}PEL.push({x,y,s,r,i,tc,id:r*40+i})}});
K.JILUO_HITS=PEL.map(p=>p.tc).filter(t=>t<9).sort((a,b)=>a-b);
const CAV=[];[[792,.22,240,10,120],[872,.34,340,7,40],[990,.55,560,5,260]].forEach(([y,s,sp,n,lag],r)=>{for(let i=0;i<n;i++)CAV.push({y:y+rand(r*30+i)*8,s,off:lag+i*sp+rand(r*30+i+1)*sp*.25,kind:(i+r)%2===1?'nanPel':'han',flag:(i+r)%3===0,r,i})});
K.scenes['4-0']=function(g,u){K.sky(g,{sky:['#16324f','#2B6CB0','#e8a45a']});const [sx,sy]=K.shake(u,K.JILUO_HITS.filter((t,k)=>k%4===0),7,6);g.save();g.translate(sx,sy);const cz=K.logZoom(1.55,1.35,smooth(u/9));K.cam(g,mix(1180,820,K.ease(K.win(u,1.5,8))),835,cz,0,960,640);
 // 稽落山远景
 K.ridge(g,600,70,.0022,0,'#24476b',{cut:K.rgba('#F6AD55',.35),n:40,id:4,x0:-600,x1:2600});K.ridge(g,700,34,.004,400,'#1d3a57',{cut:K.rgba('#9fb8d0',.3),n:40,id:6,x0:-600,x1:2600});
 poly(g,[[-600,760],[2600,760],[2600,1400],[-600,1400]],P.ground[0]);K.hatch(g,-500,765,3000,500,-.03,16,K.rgba('#9fb8d0',.22),1.4,8,90);
 const items=[];
 for(const p of PEL)items.push({y:p.y,f:()=>{const d=u-p.tc;
  if(d<0){K.crowdRider(g,p.x,p.y,p.s,K.pose(u*90+p.id*40).crank,1,P,P.metal,P.cap);if(u>1.5&&Math.sin(u*9+p.id)>.85){g.globalAlpha=.8;for(let k=0;k<2;k++){g.beginPath();g.arc(p.x+150*p.s,p.y-232*p.s,(18+k*12)*p.s/.38,-2.3,-.5);g.strokeStyle=P.hi;g.lineWidth=3;g.stroke()}g.globalAlpha=1}return}
  // 被冲：车抛起翻滚 → 落地（倒扣或扶正）→ 滑停；前轮脱落滚动减速、停住后倒下；鹈鹕跳车落地后步行（或推车）向西逃
  const k=.8+.4*rand(p.id+5),sc=p.s/.38,push=rand(p.id+9)<.4,V=520*k*sc,G=640*k*sc,tl=V/G,spin=(rand(p.id+7)<.5?-1:1)*(3.4+2*rand(p.id+6));
  let bx,by,rot;const restRot=push?0:Math.PI*Math.sign(spin),restOff=push?-94*p.s:-232*p.s;
  if(d<tl){bx=p.x-260*k*sc*d;by=p.y-V*d+G*d*d+restOff*(d/tl);rot=spin*d}
  else{const e=d-tl,sl=1-Math.exp(-e*5),rot0=spin*tl;bx=p.x-260*k*sc*tl-60*sc*sl;by=p.y+restOff-Math.abs(Math.sin(Math.min(e,.25)/.25*Math.PI))*14*sc*Math.exp(-e*4);rot=mix(rot0,restRot,K.easeOut(Math.min(1,e/.35)))}
  // 推车者：扶正后鹈鹕推车西行（车轮转角 = 行进距离 / 轮半径，不打滑）
  const tWalk=tl+.9,vw=120*sc;let walkD=0;if(push&&d>tWalk){walkD=vw*(d-tWalk)}
  g.save();g.translate(bx-walkD,by);g.rotate(rot);g.scale(p.s,p.s);const wa=walkD/(94*p.s);K.bike(g,{pal:P,wheel:wa,frontWheel:wa,crank:0,bend:push?.15:.5,frontOff:!push&&d>.2?[-1e4,0,0]:null,detail:p.s>.3});g.restore();
  if(!push&&d>.2){const e=d-.2,v0=380*sc,kk=1.4,dx=v0*(1-Math.exp(-kk*e))/kk,stopT=1.9,ang=-dx/(94*p.s),fall=K.smooth((e-stopT)/.45);g.save();g.translate(p.x-60*p.s-dx,p.y-94*p.s*(1-fall*.85));g.scale(p.s,p.s*(1-fall*.82));g.rotate(ang);ell(g,0,0,94,94,null,P.ink,11);ell(g,0,0,86,86,null,P.spoke,3);for(let q=0;q<8;q++){const a=q*TAU/8;line(g,0,0,83*Math.cos(a),83*Math.sin(a),P.spoke,2)}g.restore()}
  // 鹈鹕：跳车短弧（0–.7s）→ 落地 → 步行西逃（相位 = 距离 / 每周期前进量）
  const hop=Math.min(d,.7),hx=p.x-90*sc*hop/.7,hy=p.y-Math.sin(hop/.7*Math.PI)*120*sc;
  if(d<.7)K.flyer(g,hx,hy-120*p.s,p.s*1.05,{pal:P,flap:u*12+p.id,face:-1,detail:false,drop:.5});
  else{const run=push?Math.max(0,d-tWalk):d-.7,v=push?vw:150*sc,dist=v*run,wx=push?bx-walkD+120*p.s:hx-dist;K.walker(g,wx,p.y,p.s*1.05,{pal:P,phase:push&&d<tWalk?0:TAU*(dist/(p.s*1.05))/K.WALK.bodyPerCycle+p.id,face:-1,cap:true,still:push&&d<tWalk,detail:p.s>.3})}
  if(d<.8)for(let q=0;q<7;q++){const a=rand(p.id*9+q)*TAU,v=120+rand(p.id*9+q+1)*160;g.save();g.translate(p.x+Math.cos(a)*v*d*p.s/.38,p.y-180*p.s+Math.sin(a)*v*d*p.s/.38+80*d*d);g.rotate(a+d*5);g.globalAlpha=1-d/.8;ell(g,0,0,12*p.s/.38,4*p.s/.38,P.body);g.restore();g.globalAlpha=1}
  if(d<.35){g.globalAlpha=1-d/.35;for(let q=0;q<3;q++){g.beginPath();g.arc(p.x,p.y-230*p.s,(30+q*20+d*120)*p.s/.38,-2.6,-.4);g.strokeStyle='#fbe3b8';g.lineWidth=3;g.stroke()}g.globalAlpha=1}}});
 const F=front(u);for(const c of CAV){const x=F+c.off;if(x>2300||x<-500)continue;items.push({y:c.y+1,f:()=>{const dist=D(u)/c.s;const ph=dist/300+c.i*.37;if(c.kind==='nanPel')K.nanBikeRider(g,x,c.y,c.s*.92,{pal:P,d:D(u)/(c.s*.92)+c.i*137,phase:u,face:-1,flag:c.flag,t:u,detail:c.s>.3});else{K.horseRider(g,x,c.y,c.s,{pal:P,kind:'han',phase:ph,face:-1,hi:'#F6AD55',arm:-.5});if(c.flag)K.flag(g,x+30*c.s,c.y-330*c.s,c.s*.9,u,P,{color:'#b8432f',text:c.i%2===0?'竇':'漢',rot:.15})}}})}
 items.sort((a,b)=>a.y-b.y);for(const it of items)it.f();
 // 扬尘
 for(let i=0;i<50;i++){const x=F+rand(i+3000)*900+120,y=780+rand(i+3001)*240,a=.18*(1-K.smooth((x-F)/1100));if(a<=0)continue;g.globalAlpha=a;ell(g,x+Math.sin(u*2+i)*20,y-Math.abs(Math.sin(u*3+i))*30,40+rand(i)*50,18+rand(i+1)*16,'#c9d6e2');g.globalAlpha=1}
 g.restore()};
})();
