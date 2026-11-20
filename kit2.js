// v2 增补工具：程序隶书笔画、火光照明、噪声雾、篝火、步行循环。确定性纯函数，首用即建的缓存与时间无关。
(function(){'use strict';const {TAU,rand,mix,smooth,clamp,wrap,line,ell,path,poly}=K;
// ---------- 程序隶书：按笔顺逐笔"刻"出。prog∈[0,1] 为整字进度（按笔画长度分配），返回刀尖位置
const LEN={};function glyph(ch){const G=window.LISHU[ch];if(!G)throw Error('LISHU missing '+ch);if(!LEN[ch]){let tot=0;const st=G.map(s=>{let L=0;for(let i=1;i<s.p.length;i++)L+=Math.hypot(s.p[i][0]-s.p[i-1][0],s.p[i][1]-s.p[i-1][1]);tot+=L;return L});LEN[ch]={st,tot}}return [G,LEN[ch]]}
function strokeFill(g,P,m,cx,cy,sz,wm){// 沿中线左右偏移成多边形：一笔一填充
 const n=Math.floor(m),fr=m-n;const pts=P.slice(0,n+1);if(fr>0&&n+1<P.length){const a=P[n],b=P[n+1];pts.push([mix(a[0],b[0],fr),mix(a[1],b[1],fr),mix(a[2],b[2],fr)])}if(pts.length<1)return null;
 const L=[],R=[];for(let i=0;i<pts.length;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;const w=pts[i][2]*wm/2;L.push([cx+(pts[i][0]-dy*w)*sz,cy+(pts[i][1]+dx*w)*sz]);R.push([cx+(pts[i][0]+dy*w)*sz,cy+(pts[i][1]-dx*w)*sz])}
 g.beginPath();L.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));for(let i=R.length-1;i>=0;i--)g.lineTo(R[i][0],R[i][1]);g.closePath();g.fill();
 const e=pts[0],z=pts[pts.length-1];g.beginPath();g.arc(cx+e[0]*sz,cy+e[1]*sz,e[2]*wm/2*sz,0,TAU);g.arc(cx+z[0]*sz,cy+z[1]*sz,z[2]*wm/2*sz*.9,0,TAU);g.fill();return [cx+z[0]*sz,cy+z[1]*sz]}
// cx,cy=字心；size=字身(em)；opts.hi=刻槽亮边色；返回 {tip,stroke}
K.lishu=function(g,ch,cx,cy,size,color,o={}){const [G,{st,tot}]=glyph(ch),prog=o.prog===undefined?1:clamp(o.prog),wm=o.wmul||1;let left=prog*tot,tip=null,si=-1;
 const layers=o.hi?[[o.hi,size*.035,size*.035],[color,0,0]]:[[color,0,0]];
 for(const [col,ox,oy] of layers){g.fillStyle=col;left=prog*tot;for(let i=0;i<G.length;i++){if(left<=0)break;const P=G[i].p,L=st[i];const f=Math.min(1,left/L);left-=L;const t=strokeFill(g,P,f*(P.length-1),cx+ox,cy+oy,size,wm);if(!ox){tip=t;si=i}}}
 return {tip,stroke:si,n:G.length}};
K.lishuStrokes=ch=>glyph(ch)[0].length;
// ---------- 火光：径向加色辉光（克制，只在火源周围）
K.glow=function(g,x,y,r,col,a){if(a<=0)return;const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,K.rgba(col,a));gr.addColorStop(.45,K.rgba(col,a*.35));gr.addColorStop(1,K.rgba(col,0));g.save();g.globalCompositeOperation='lighter';g.fillStyle=gr;g.fillRect(x-r,y-r,2*r,2*r);g.restore()};
// 光源列表 → 某点照度
K.illum=(L,x,y)=>{let s=0;for(const l of L){const d=Math.hypot(x-l.x,y-l.y);s+=l.a*Math.max(0,1-d/l.r)**1.5}return Math.min(1,s)};
// ---------- 篝火：石圈 + 交叉柴堆 + 细长火舌（每两帧换刀）+ 火星
K.campfire=function(g,x,y,s,t,id=0){const tt=Math.floor(t*15);g.save();g.translate(x,y);g.scale(s,s);
 K.glow(g,0,-20,150,'#ffb060',.35);ell(g,0,6,70,16,'rgba(40,20,10,.45)');
 for(let k=0;k<9;k++){const a=Math.PI*.05+k/8*Math.PI*.9;ell(g,Math.cos(a)*-52,8+Math.sin(a)*5,10,7,'#5d6470','#0b1220',2)}
 const logs=[[-44,10,40,-12],[44,10,-38,-14],[-30,14,34,4],[-6,16,8,-26]];for(const [x1,y1,x2,y2] of logs){line(g,x1,y1,x2,y2,'#0b1220',13);line(g,x1,y1,x2,y2,'#5a3a24',9);ell(g,x1,y1,6,6,'#c48a52','#0b1220',2)}
 ell(g,0,2,26,8,'#ffcf7a');
 const T=[[-20,.75],[-9,1.1],[0,1.35],[11,1.0],[22,.7],[-2,.6]];const C=['#a83c2e','#e08a3c','#ffd9a0'];
 for(let L=0;L<3;L++){g.fillStyle=C[L];for(let k=0;k<T.length;k++){const [bx,hh]=T[k];const r=rand(id*91+k*7+tt*13+L),r2=rand(id*91+k*7+tt*13+L+50);const h=(56+34*r)*hh*(1-L*.3),w=(13-L*3)*(1-Math.abs(bx)/60),lean=-10-14*r2+L*3,cx=bx*(1-L*.25);
  g.beginPath();g.moveTo(cx-w,6);g.bezierCurveTo(cx-w*1.1,-h*.35,cx+lean*.4-w*.5,-h*.6,cx+lean,-h);g.bezierCurveTo(cx+lean*.3+w*.6,-h*.55,cx+w*1.15,-h*.3,cx+w,6);g.closePath();g.fill()}}
 for(let i=0;i<14;i++){const life=1.4,q=wrap(t+rand(id+i*3)*life,life)/life,sx=(rand(id+i*3+1)-.5)*40-q*50+Math.sin(q*9+i)*8,sy=-30-q*170;g.globalAlpha=1-q;ell(g,sx,sy,2.6,2.6,'#ffd9a0');g.globalAlpha=1}
 g.restore()};
// ---------- 噪声雾：可平铺的分形值噪声，首用即建；按偏移滚动绘制
const fogC={};function vnoise(px,py,per,seed){const xi=Math.floor(px),yi=Math.floor(py),fx=px-xi,fy=py-yi,h=(a,b)=>rand(seed+wrap(a,per)*57.3+b*311.1),sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy);return mix(mix(h(xi,yi),h(xi+1,yi),sx),mix(h(xi,yi+1),h(xi+1,yi+1),sx),sy)}
K.fogTex=function(key,w,h,o={}){if(fogC[key])return fogC[key];const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d'),im=q.createImageData(w,h),col=o.col||[216,224,232],cut=o.cut??.48,soft=o.soft??.25,base=o.per||6,seed=o.seed||1;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){let n=0,a=.5,f=1,norm=0;for(let oc=0;oc<5;oc++){n+=a*vnoise(x/w*base*f,y/h*base*f*(h/w)*1.0+oc*7.1,base*f,seed+oc*101);norm+=a;a*=.5;f*=2}n/=norm;
  const vy=y/h,band=Math.sin(Math.PI*vy)**.6;let v=smooth((n*band-cut*band+ .5*(1-band)*0-(1-band)*.4+.0)/soft+.5);if(o.steps){v=Math.round(v*o.steps)/o.steps}const i=(y*w+x)*4;im.data[i]=col[0];im.data[i+1]=col[1];im.data[i+2]=col[2];im.data[i+3]=Math.round(255*v)}
 q.putImageData(im,0,0);fogC[key]=c;return c};
// 平铺滚动：tex 在 x 方向可平铺
K.fogDraw=function(g,tex,offx,y,w,h,alpha){g.save();g.globalAlpha=alpha;const x0=-wrap(offx,w);for(let x=x0;x<1920+w;x+=w)g.drawImage(tex,x,y,w+1,h);g.restore()};
// ---------- 步行鹈鹕 v2：支撑相脚掌钉地（相对身体后移）、摆动相抬脚前送；身体上下颠、左右晃
const WS=80,ST=.6;K.WALK={stride:WS,stance:ST,bodyPerCycle:WS/ST};
function ik(h,a,L1,L2,fwd){const dx=a[0]-h[0],dy=a[1]-h[1],d=Math.min(Math.hypot(dx,dy),L1+L2-1e-6);const al=(L1*L1-L2*L2+d*d)/(2*d),pe=Math.sqrt(Math.max(0,L1*L1-al*al));const ux=dx/d,uy=dy/d;const k1=[h[0]+ux*al-uy*pe,h[1]+uy*al+ux*pe],k2=[h[0]+ux*al+uy*pe,h[1]+uy*al-ux*pe];return (k1[0]>k2[0])===fwd?k1:k2}
K.walkFoot=(c)=>{c=wrap(c,1);if(c<ST)return [mix(WS/2,-WS/2,c/ST),0,0];const f=(c-ST)/(1-ST);return [mix(-WS/2,WS/2,smooth(f)),-Math.sin(Math.PI*f)*28,Math.sin(Math.PI*f)*.35]};
K.walker=function(g,x,y,s,o={}){const P=o.pal,ph=o.phase||0,face=o.face||1,detail=o.detail!==false,c0=ph/TAU;g.save();g.translate(x,y);g.scale(face*s,s);if(o.alpha!==undefined)g.globalAlpha*=o.alpha;
 ell(g,0,4,150,12,K.rgba(P.ink,.3));const still=o.still?1:0;const bob=still?0:-5*Math.cos(4*Math.PI*c0)-3,sway=still?0:.05*Math.sin(TAU*c0);
 for(const k of [1,0]){const [fx0,fy,toe]=still?[k?-14:18,0,0]:K.walkFoot(c0+k*.5),fx=fx0+(k?-6:6);const hip=[-34+k*14,-122+bob],ft=[fx,fy-8],kn=ik(hip,ft,64,64,true);
  const col=k?P.shade:P.bill;path(g,`M ${hip[0]} ${hip[1]} L ${kn[0]} ${kn[1]} L ${ft[0]} ${ft[1]}`,null,P.ink,k?14:18);path(g,`M ${hip[0]} ${hip[1]} L ${kn[0]} ${kn[1]} L ${ft[0]} ${ft[1]}`,null,col,k?9:12);
  if(detail&&!k){for(let i=1;i<4;i++){const f=i/4,ax=mix(hip[0],kn[0],f),ay=mix(hip[1],kn[1],f);line(g,ax-5,ay,ax+5,ay+3,K.rgba(P.ink,.55),2);const bx=mix(kn[0],ft[0],f),by=mix(kn[1],ft[1],f);line(g,bx-5,by,bx+4,by+3,K.rgba(P.ink,.55),2)}}
  g.save();g.translate(fx,fy);g.rotate(toe);poly(g,[[-14,0],[34,0],[26,-6],[6,-10]],P.pouch,P.ink,2.5);if(detail)for(let i=0;i<3;i++)line(g,0+i*9,-3,10+i*9,-1,K.rgba(P.ink,.5),1.5);g.restore()}
 const nod=o.nod||0;g.translate(0,bob);g.rotate(sway);g.translate(40,75);
 g.save();g.translate(-40,-200);g.rotate(nod*.42);g.translate(40,200);bodyNeck(g,P,detail);g.save();g.translate(0,8);K.wingGripV2(g,P,detail,30);g.restore();
 g.save();g.translate(50,-380);g.rotate(nod*.45);g.translate(-50,380);K.head(g,P,{detail,cap:o.cap,drop:o.drop||0,pupil:o.pupil});if(o.sleep>0){ell(g,62,-418,12,13*o.sleep,P.body,P.ink,2);line(g,51,-417+3,73,-417+3,P.ink,3)}g.restore();g.restore();g.restore()};
function bodyNeck(g,P,detail){K.bodyDraw(g,P,detail)}
})();
