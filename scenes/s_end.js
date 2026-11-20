K.scenes['end']=function(g,u){const P=K.PAL[0];g.fillStyle='#000';g.fillRect(0,0,1920,1080);const a=K.smooth(u/.6)*(1-K.smooth((u-4)/.5));g.globalAlpha=a;
 K.text(g,'历史戏仿',960,380,56,P.hi,{align:'center',weight:'bold'});
 const L=['史实线索：白登之围（前200）、漠北之战与封狼居胥（前119）、郅支之战（前36）、窦宪燕然勒石（公元89）',
 '陈平“奇计”见《史记》；“明犯强汉者，虽远必诛”语出陈汤上疏；《封燕然山铭》为班固所撰',
 '鹈鹕、二八大杠、鲤鱼美人、旗上题字、“自此漠北无车铃”落款均为戏仿；北匈奴西迁为示意，非89年直抵欧洲',
 '画面与声音均由代码生成 · 制作方法参考 The Pelican Test 与 meme67-art-history（代码 MIT，未用其画面/音乐/构图/笑点）'];
 L.forEach((s,i)=>K.text(g,s,960,480+i*52,24,K.rgba(P.hi,.78),{align:'center'}));g.globalAlpha=1};
