// 封面 1920×1080：版画风，第二幕漠北配色。静帧，与成片同一套绘图工具。
window.renderCover=function(g){const P=K.PAL[2],{rand,line,ell,poly}=K;g.setTransform(1,0,0,1,0,0);g.globalAlpha=1;g.globalCompositeOperation='source-over';
 K.sky(g,{sky:['#3D1917','#a8452c','#F4A261']},0,1080);
 ell(g,1430,600,170,170,'#f5bd75');for(let k=0;k<7;k++)line(g,1250,560+k*14,1610,560+k*14,K.rgba('#d9733f',.55),3);
 K.ridge(g,700,34,.0026,0,'#c0603b',{cut:K.rgba('#F4A261',.5),n:40,id:3});K.ridge(g,780,26,.004,500,'#8f3a26',{cut:K.rgba('#F4A261',.35),n:40,id:5});
 // 远处十万骑：纵深逐排缩小
 for(let r=0;r<6;r++){const y=742+r*26,s=.05+r*.025,n=Math.round(1900/(s*620));for(let i=0;i<n;i++){const x=i*s*620+rand(r*99+i)*s*200-60;K.crowdRider(g,x,y,s,rand(r*7+i)*6.3,-1,P,P.metal,P.cap)}}
 K.ridge(g,930,16,.005,900,'#51231b');K.hatch(g,0,925,1920,160,-.08,15,K.rgba('#F4A261',.22),1.6,7,70);
 // 汉旗（右）与领骑鹈鹕（左前景）
 K.flag(g,1720,960,1.05,1.3,P,{color:'#8f2d26'});
 K.rider(g,330,1000,.82,{pal:P,pose:K.pose(380),face:1,alert:.8,detail:true,ring:.9});
 K.paper(g,.42);
 g.fillStyle=K.rgba('#1b1211',.35);g.fillRect(380,90,1160,420);
 K.titleBlock(g,960,270,1,P,{big:196,sub:72,ink:'#F4E0B8',shadow:'#241514'});
 // 朱印：历史戏仿
 g.save();g.translate(1600,440);poly(g,[[-62,-62],[62,-62],[62,62],[-62,62]],'#a3301f','#5a160c',4);[...'历史戏仿'].forEach((c,i)=>K.cq(g,c,(i<2?27:-27),(i%2?28:-28),46,'#f3d9b0'));g.restore();
 g.fillStyle='#1b1211';g.fillRect(0,0,1920,24);g.fillRect(0,1056,1920,24);g.fillRect(0,0,24,1080);g.fillRect(1896,0,24,1080);
 K.text(g,'四幕版画动画 · 粗剪 v3 · 人物事件取自汉匈战争，鹈鹕与单车纯属虚构',960,1040,22,K.rgba('#F4E0B8',.8),{align:'center'});return true};
