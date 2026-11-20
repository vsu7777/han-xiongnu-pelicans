// v3：三极曹全碑隶书简（SJcaoquanbei）字形轮廓 + Make Me a Hanzi 笔顺骨架作揭示遮罩（逐笔凿出）。
// 字库缺「嵑」「夐」：回退到 v2 程序构造笔画（细笔、加长波磔以贴近曹全碑）。字体仅在本地渲染时引用。
(function(){'use strict';const {TAU,clamp,mix}=K;const FAM='"SJCQ"',MISS='嵑夐';K.CQ_FAMILY=FAM;
const mcv=document.createElement('canvas'),mg=mcv.getContext('2d'),tcv=document.createElement('canvas'),tg=tcv.getContext('2d');
function ink(ch,size){mg.font=`${size}px ${FAM}`;mg.textAlign='center';mg.textBaseline='alphabetic';const m=mg.measureText(ch);return {L:m.actualBoundingBoxLeft,R:m.actualBoundingBoxRight,A:m.actualBoundingBoxAscent,D:m.actualBoundingBoxDescent}}
function drawGlyph(c,ch,cx,cy,size,color,hi){const b=ink(ch,size),ax=cx-(b.R-b.L)/2,ay=cy+(b.A-b.D)/2;c.font=`${size}px ${FAM}`;c.textAlign='center';c.textBaseline='alphabetic';if(hi){c.fillStyle=hi;c.fillText(ch,ax+size*.03,ay+size*.03)}c.fillStyle=color;c.fillText(ch,ax,ay);c.textAlign='left'}
const SK={};function skel(ch){if(SK[ch])return SK[ch];const G=window.LISHU[ch];let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const s of G)for(const p of s.p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}
 let tot=0;const st=G.map(s=>{let L=0;for(let i=1;i<s.p.length;i++)L+=Math.hypot(s.p[i][0]-s.p[i-1][0],s.p[i][1]-s.p[i-1][1]);tot+=L;return L});return SK[ch]={G,box:[x0,y0,x1,y1],st,tot}}
// cx,cy=字心(墨迹包围盒中心)；size=字号；o.prog 逐笔进度；o.hi 刻槽亮边；返回 {tip}
const FS=1.18; // 该字体墨迹约占字身 0.8：放大以与 v2 版面字面大小一致
K.cq=function(g,ch,cx,cy,size,color,o={}){
 if(MISS.includes(ch))return K.lishu(g,ch,cx,cy,size*1.08,color,{...o,wmul:(o.wmul||1)*.72});size*=FS;
 const prog=o.prog===undefined?1:clamp(o.prog);if(prog>=1){drawGlyph(g,ch,cx,cy,size,color,o.hi);if(!window.LISHU[ch])return {tip:null};const b=ink(ch,size),{G,box:[x0,y0,x1,y1]}=skel(ch),P=G[G.length-1].p,e=P[P.length-1];return {tip:[cx-(b.R+b.L)/2+(e[0]-x0)/(x1-x0||1)*(b.R+b.L),cy-(b.A+b.D)/2+(e[1]-y0)/(y1-y0||1)*(b.A+b.D)]}}
 // 遮罩：骨架包围盒 → 字形墨迹包围盒；按笔顺累积长度画粗笔（0.2em），逐笔揭开字形
 const S=Math.max(1,Math.abs(g.getTransform().a))*1.25,box=Math.ceil(size*1.5*S);if(tcv.width!==box){tcv.width=box;tcv.height=box;mcv.width=box;mcv.height=box}
 tg.setTransform(1,0,0,1,0,0);tg.clearRect(0,0,box,box);tg.setTransform(S,0,0,S,box/2-cx*S,box/2-cy*S);drawGlyph(tg,ch,cx,cy,size,color,o.hi);
 const b=ink(ch,size),ix0=cx-(b.R+b.L)/2,iy0=cy-(b.A+b.D)/2,iw=b.R+b.L,ih=b.A+b.D,{G,box:[x0,y0,x1,y1],st,tot}=skel(ch);
 const map=p=>[ix0+(p[0]-x0)/(x1-x0||1)*iw,iy0+(p[1]-y0)/(y1-y0||1)*ih];
 mg.setTransform(1,0,0,1,0,0);mg.clearRect(0,0,box,box);mg.setTransform(S,0,0,S,box/2-cx*S,box/2-cy*S);mg.strokeStyle='#000';mg.lineCap='round';mg.lineJoin='round';mg.lineWidth=size*.2;
 let left=prog*tot,tip=null;for(let i=0;i<G.length&&left>0;i++){const P=G[i].p;let rem=Math.min(left,st[i]);left-=st[i];mg.beginPath();let q=map(P[0]);mg.moveTo(q[0],q[1]);tip=q;
  for(let k=1;k<P.length&&rem>0;k++){const d=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);const f=Math.min(1,rem/d);rem-=d;q=map([mix(P[k-1][0],P[k][0],f),mix(P[k-1][1],P[k][1],f)]);mg.lineTo(q[0],q[1]);tip=q}mg.stroke()}
 tg.setTransform(1,0,0,1,0,0);tg.globalCompositeOperation='destination-in';tg.drawImage(mcv,0,0);tg.globalCompositeOperation='source-over';
 g.drawImage(tcv,cx-box/2/S,cy-box/2/S,box/S,box/S);return {tip}};
K.cqStart=function(ch,cx,cy,size){if(!MISS.includes(ch))size*=FS;const {G,box:[x0,y0,x1,y1]}=skel(ch),p=G[0].p[0];if(MISS.includes(ch))return [cx+p[0]*size,cy+p[1]*size];const b=ink(ch,size),ix0=cx-(b.R+b.L)/2,iy0=cy-(b.A+b.D)/2;return [ix0+(p[0]-x0)/(x1-x0||1)*(b.R+b.L),iy0+(p[1]-y0)/(y1-y0||1)*(b.A+b.D)]};
})();
// 横排一行曹全碑隶书：字库缺「〇」，以等粗椭圆环构造；「·」画圆点。返回行宽
(function(){K.cqLine=function(g,str,cx,cy,size,color,o={}){const ch=[...str],adv=c=>c==='·'?size*.5:c==='「'||c==='」'||c==='，'?size*.6:size*(o.track||1.06);const W=ch.reduce((a,c)=>a+adv(c),0);let x=cx-(o.align==='left'?0:W/2);
 for(const c of ch){const w=adv(c),mx=x+w/2;if(c==='〇'){for(const [col,dx] of (o.hi?[[o.hi,size*.03],[color,0]]:[[color,0]])){g.beginPath();g.ellipse(mx+dx,cy+dx,size*.34,size*.3,0,0,Math.PI*2);g.strokeStyle=col;g.lineWidth=size*.075;g.stroke()}}
  else if(c==='·'){K.ell(g,mx,cy,size*.06,size*.06,color)}else if(c==='「'||c==='」'||c==='，'){K.text(g,c,mx,cy+size*.35,size*.8,color,{align:'center',font:K.CQ_FAMILY})}else K.cq(g,c,mx,cy,size,color,{hi:o.hi});x+=w}return W}})();
