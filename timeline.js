(function(){
'use strict';
const {W,H}=K;
function shotAt(t){for(const s of SHOTS)if(t<s.start+s.dur)return s;return SHOTS[SHOTS.length-1]}
function overlay(g,s,u,t){const P=K.PAL[s.act];const hideAll=s.id==='4-4'&&u>6.5;K.paper(g,s.act===3?.32:.42);
 const m=hideAll?K.smooth((u-6.5)/1):0;g.fillStyle=P.margin;g.fillRect(0,0,W,64);g.fillRect(0,1016,W,64);g.fillRect(0,0,23,H);g.fillRect(1897,0,23,H);
 g.globalAlpha=1-m;K.line(g,38,64,1882,64,K.rgba(P.mText,.6),1);K.line(g,38,1016,1882,1016,K.rgba(P.mText,.6),1);
 if(ACTS[s.act])K.text(g,ACTS[s.act],64,43,24,P.mText);K.text(g,s.id==='0'||s.id==='end'?'':s.id+'  '+s.title,64,1055,20,P.mText);K.text(g,'历史戏仿 · 粗剪',1856,1055,20,P.mText,{align:'right'});
 if(s.note){const a=K.smooth(u/.4)*(1-K.smooth((u-s.dur+.3)/.3));g.globalAlpha=a*(1-m);K.text(g,s.note,W/2,1055,20,P.mText,{align:'center'})}g.globalAlpha=1}
// 每幕首镜：刻字幕题（右下角版心内，2.8秒）
const ACT_CAP={1:['白登之围','第一幕 · 前二〇〇年'],2:['漠北决战','第二幕 · 前一一九年'],3:['郅支之战','第三幕 · 前三六年','「明犯强汉者，虽远必诛」'],4:['燕然勒功','第四幕 · 公元八九年']};
// 每幕首镜：曹全碑隶书幕头字幕，放在右上天空区（避开主体），2.8 秒
function actTitle(g,s,u){const first={'1-1':1,'2-1':1,'3-1':1,'4-0':1}[s.id];if(!first)return;const a=K.smooth(u/.35)*(1-K.smooth((u-2.6)/.4));if(a<=0)return;const P=K.PAL[s.act],C=ACT_CAP[s.act],h=C[2]?200:160;g.globalAlpha=a;g.fillStyle=K.rgba(P.ink,.62);g.fillRect(1400,84,470,h);K.line(g,1415,98,1855,98,K.rgba(P.hi,.6),1.5);K.line(g,1415,70+h,1855,70+h,K.rgba(P.hi,.6),1.5);
 K.cqLine(g,C[0],1635,150,78,P.hi,{hi:P.ink});K.cqLine(g,C[1],1635,212,30,K.rgba(P.hi,.9),{track:1.0});if(C[2])K.cqLine(g,C[2],1635,256,30,K.rgba(P.hi,.9),{track:1.0});g.globalAlpha=1}
function renderAt(g,t){t=K.clamp(Number(t)||0,0,DURATION-1e-6);const s=shotAt(t),u=t-s.start;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';g.filter='none';g.fillStyle='#000';g.fillRect(0,0,W,H);
 g.save();if(u<2/30&&s.id!=='0'){g.translate(3,-2)} // 硬切=新一次印刷：两帧套印错位
 g.save();g.beginPath();g.rect(23,64,W-46,952);g.clip();K.scenes[s.id](g,u,s);g.restore();g.restore();
 g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.filter='none';actTitle(g,s,u);overlay(g,s,u,t);return {t,id:s.id,u}}
window.renderAt=renderAt;window.shotAt=shotAt;
})();
