// 唯一时间真相：镜头顺序、时长（非均分）、页边注、音效事件（镜头内局部秒）。Node 音效脚本也读这个文件。
(function(root){
const SHOTS=[
 {id:'0',act:0,dur:3.5,title:'序',sfx:[['bellFaint',2.6]]},
 {id:'1-1',act:1,dur:11,title:'上帝视角 · 四色包围',note:'四色马阵语出《史记·匈奴列传》；单车为戏仿',sfx:[['wind',0,11],['crunch',0,11]]},
 {id:'1-2',act:1,dur:9,title:'山顶仰拍',sfx:[['wind',0,9],['drone',0,9,65],['chatter',.5,9]]},
 {id:'1-3',act:1,dur:12,title:'分屏 · 大鱼美人图',note:'戏仿：史载陈平“奇计”，后世附会“美人图”；鲤鱼美人纯属虚构',sfx:[['wind',0,12,.4],['brush',1.5,6.5],['zheng',8.2],['gulp',10.2]]},
 {id:'1-4',act:1,dur:10,title:'迷雾突围',sfx:[['wind',0,10],['hooves',3.0,9.9,.7],['bellEcho',1.2],['bellEcho',3.4],['bellEcho',5.9],['bellEcho',8.1]]},
 {id:'2-1',act:2,dur:9,title:'两军对峙 · 视差横摇',sfx:[['sand',0,9],['drumAccel',0,8.8]]},
 {id:'2-2',act:2,dur:8,title:'霍去病 · 变焦',sfx:[['sand',0,3.6,.6],['drumRoll',0,3.6],['silence',3.6,4.1],['bell',4.1],['sand',4.1,8,.35]]},
 {id:'2-3',act:2,dur:14,title:'万弩齐发 · 子弹时间',sfx:[['sand',0,14,.5],['volley',.5],['whoosh',3.1],['catch',5.4],['catch',6.5],['catch',7.6],['catch',8.7],['catch',9.8],['boom',3.2],['boom',11.2],['catch',12.6],['bell',13.0,.5]]},
 {id:'2-4',act:2,dur:10,title:'封狼居胥 · 摇臂升起',note:'封狼居胥 · 霍去病 · 前119年',sfx:[['sand',0,10,.4],['drone',0,9.5,98],['thud',1.6],['thud',3.0],['creak',9.0]]},
 {id:'3-1',act:3,dur:10,title:'夜袭潜行',sfx:[['insects',0,10],['steps',3,9.5]]},
 {id:'3-2',act:3,dur:9,title:'火箭 · 甩镜',sfx:[['fire',2.7,9],['volley',1.8],['whoosh',2.2],['boom',3.4],['boom',4.3],['pop',4.9],['boom',5.6],['pop',6.2],['boom',6.9],['crack',7.6],['pop',8.1]]},
 {id:'3-3',act:3,dur:9,title:'破城 · 立旗',note:'戏剧化处理：语出陈汤上疏，并非现场旗文',sfx:[['fire',0,9,.6],['crash',1.6],['bigDrum',1.9],['bigDrum',2.6],['bigDrum',3.3],['chop',4.0],['nail',4.8],['bigDrum',5.6],['bigDrum',6.4],['bigDrum',7.2]]},
 {id:'3-4',act:3,dur:9,title:'螺旋升空',sfx:[['fire',0,9,.8],['flap',.4,8.5],['quacks',.5,8.8]]},
 {id:'4-0',act:4,dur:9,title:'稽落山之战',note:'稽落山之战 · 窦宪、耿秉率汉军与南匈奴联军大破北匈奴 · 公元89年',sfx:[['wind',0,9,.3],['hooves',0,8.6,1],['bellChaos',2.2,7.5,34],['crash',2.75],['thud',3.3],['crash',4.05],['pop',4.5],['thud',4.9],['crash',5.6],['flap',3,8],['quacks',3.2,7.5]]},
 {id:'4-1',act:4,dur:11,title:'地平线 · 西去',note:'示意：北匈奴此后向西迁徙；与欧洲匈人关系学界仍有争论',sfx:[['wind',0,11,.35],['walk',0,10.5]]},
 {id:'4-2',act:4,dur:7,title:'甩镜 · 日出燕然',sfx:[['whoosh',0],['swell',.6,7]]},
 {id:'4-3',act:4,dur:11,title:'凿石刻铭',note:'《封燕然山铭》班固撰 · 字形用三极曹全碑隶书简字体，非原刻（嵑、夐两字为程序构造）',sfx:[['wind',0,11,.25],['chisel',1.0,10.1,.5]]},
 {id:'4-4',act:4,dur:10,title:'落款',note:'戏仿落款：非碑文原文',sfx:[['wind',0,6.5,.25],['bellFaint',9.3]]},
 {id:'end',act:0,dur:4.5,title:'尾',sfx:[]}
];
let s=0;for(const x of SHOTS){x.start=+s.toFixed(4);s+=x.dur}
const ACTS={0:'',1:'第一幕 · 白登之围 · 前200年',2:'第二幕 · 漠北决战 · 前119年',3:'第三幕 · 郅支之战 · 前36年',4:'第四幕 · 燕然勒功 · 公元89年'};
root.SHOTS=SHOTS;root.ACTS=ACTS;root.DURATION=+s.toFixed(4);
})(typeof window!=='undefined'?window:globalThis);
