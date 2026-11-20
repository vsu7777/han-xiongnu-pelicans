// 序 · 片名（v2）：大字「汉匈百年」+ 小字「十万鹈鹕来袭」，程序隶书笔画；保留历史戏仿声明
K.titleBlock=function(g,cx,cy,a,P,o={}){const big=o.big||176,sub=o.sub||66;g.globalAlpha=a;
 [...'汉匈百年'].forEach((c,i)=>K.cq(g,c,cx+(i-1.5)*big*1.08,cy,big,o.ink||P.hi,{hi:o.shadow||'#000',wmul:1.05}));
 const sy=cy+big*.62+sub*.2;K.line(g,cx-big*2.05,sy-sub*.62,cx-sub*3.5,sy-sub*.62,K.rgba(o.ink||P.hi,.55),2);K.line(g,cx+sub*3.5,sy-sub*.62,cx+big*2.05,sy-sub*.62,K.rgba(o.ink||P.hi,.55),2);
 [...'十万鹈鹕来袭'].forEach((c,i)=>K.cq(g,c,cx+(i-2.5)*sub*1.1,sy,sub,o.subInk||K.rgba(P.hi,.92),{hi:o.shadow||'#000'}));g.globalAlpha=1};
K.scenes['0']=function(g,u){const P=K.PAL[0];K.sky(g,P);K.ridge(g,820,18,.004,0,'#2a1c18');K.ridge(g,880,12,.006,300,P.ink);
 const a=K.smooth((u-.3)/.6);K.titleBlock(g,960,390,a,P);g.globalAlpha=a;
 K.text(g,'四幕 · 十七镜 · 粗剪 v4',960,640,30,K.rgba(P.hi,.8),{align:'center'});K.text(g,'历史戏仿：人物事件取自汉匈战争，鹈鹕、单车与笑料皆为虚构',960,690,24,K.rgba(P.hi,.6),{align:'center'});g.globalAlpha=1;
 const d=K.profile([[0,0],[1,1800],[3.5,1800]])(u);const x=-250+d*.42;K.rider(g,x,920,.42,{pal:P,pose:K.pose(d*1.2),face:1,ring:u>2.5&&u<3.2?1-(u-2.5)/.7:0})};
