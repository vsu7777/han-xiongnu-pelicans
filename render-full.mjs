// 无头 Chrome 逐帧截图（纯 renderAt(t)），JPEG 管道进 FFmpeg。不安装任何东西。
import {spawn} from 'node:child_process';import fs from 'node:fs';import {once} from 'node:events';import crypto from 'node:crypto';
const root=decodeURIComponent(new URL('.',import.meta.url).pathname).replace(/\/$/,''),port=9341,FPS=30,args=process.argv.slice(2);
const TAG=process.env.TAG||'',QA=root+(TAG?'/qa_'+TAG:'/qa'),PAGE=TAG?'film-'+TAG+'.html':'film-v4.html',NAME=TAG?'汉匈百年_四幕粗剪_'+TAG+'_无声.mp4':'汉匈百年_四幕粗剪_v4_无声.mp4';
fs.mkdirSync(QA+'/keyframes',{recursive:true});fs.mkdirSync(QA+'/sheet',{recursive:true});
const chromeBin=process.env.CHROME||['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/usr/bin/chromium-browser'].find(p=>fs.existsSync(p));
if(!chromeBin) throw Error('找不到 Chrome/Chromium。请安装其一，或设置环境变量 CHROME 为可执行文件路径。');
const chrome=spawn(chromeBin,['--headless=new','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files','--remote-allow-origins=*',`--remote-debugging-port=${port}`,`--user-data-dir=${QA}/chrome-profile`,'about:blank'],{stdio:['ignore','ignore',fs.openSync(QA+'/chrome.log','w')]});
let ws,id=0;const pend=new Map();
const call=(m,p={})=>new Promise((res,rej)=>{const k=++id;pend.set(k,{res,rej});ws.send(JSON.stringify({id:k,method:m,params:p}))});
const ev=async e=>{const r=await call('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails).slice(0,1500));return r.result.value};
const grab=async(t,type='jpeg')=>Buffer.from(await ev(`seek(${t});cv.toDataURL('image/${type}'${type==='jpeg'?',0.95':''}).split(',')[1]`),'base64');
try{let info;for(let i=0;i<80;i++){try{const r=await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('file://'+root+'/'+PAGE+'?export')}`,{method:'PUT'});if(r.ok){info=await r.json();break}}catch(e){}await new Promise(r=>setTimeout(r,100))}
 ws=new WebSocket(info.webSocketDebuggerUrl);await once(ws,'open');ws.addEventListener('message',e=>{const m=JSON.parse(e.data);const p=m.id&&pend.get(m.id);if(p){pend.delete(m.id);m.error?p.rej(Error(JSON.stringify(m.error))):p.res(m.result)}});
 await call('Runtime.enable');await call('Page.enable');await new Promise(r=>setTimeout(r,800));await ev('window.ready');
 if(args.includes('--fontcheck'))console.log('font',await ev(`document.fonts.check('48px "SJCQ"','汉')`));
 if(args.includes('--cover')){fs.mkdirSync(root+'/'+TAG,{recursive:true});const b=Buffer.from(await ev(`renderCover(g);cv.toDataURL('image/png').split(',')[1]`),'base64');fs.writeFileSync(root+'/'+TAG+'/封面_汉匈百年_1920x1080.png',b);console.log('cover done')}
 if(args.includes('--frames')){const ts=args[args.indexOf('--frames')+1].split(',');fs.mkdirSync(QA+'/preview',{recursive:true});for(const t of ts)fs.writeFileSync(`${QA}/preview/${t}.jpg`,await grab(+t));console.log('frames done')}
 const shots=await ev('SHOTS.map(s=>({id:s.id,start:s.start,dur:s.dur}))'),D=await ev('DURATION');
 if(args.includes('--keys')||args.includes('--all')){for(const s of shots){for(const f of [.2,.5,.85]){const t=+(s.start+s.dur*f).toFixed(3);fs.writeFileSync(`${QA}/keyframes/${s.id}_${String(Math.round(f*100)).padStart(2,'0')}.jpg`,await grab(t))}}console.log('keys done')}
 if(args.includes('--check')||args.includes('--all')){
  const seq=[0,D-.01,83.3,0,83.3,121.1,121.1],hs=[];for(const t of seq)hs.push({t,sha:crypto.createHash('sha256').update(await grab(t,'png')).digest('hex')});
  const rig=await ev(`(()=>{let maxSole=0,maxBone=0,maxRatio=0,maxLink=0;for(let j=1;j<4000;j++){const d=j*13.7,p=K.pose(d);maxRatio=Math.max(maxRatio,Math.abs(p.wheel/p.crank-K.RIG.gear),Math.abs(p.wheel*K.RIG.R-d));
   for(const c of [p.crank,p.crank+Math.PI]){for(const bob of [-3,0,3]){const L=K.legSolve(c,bob),pd=K.pedalAt(c);maxSole=Math.max(maxSole,Math.abs(L.sole-(pd[1]-K.RIG.pedalThick/2)),Math.abs(L.ankle[0]-(pd[0]-4)));maxBone=Math.max(maxBone,Math.abs(Math.hypot(L.knee[0]-L.hip[0],L.knee[1]-L.hip[1])-K.RIG.thigh),Math.abs(Math.hypot(L.ankle[0]-L.knee[0],L.ankle[1]-L.knee[1])-K.RIG.shin))}}
   maxLink=Math.max(maxLink,Math.abs(p.crank*K.RIG.ringR-p.wheel*K.RIG.cogR))}
   const sum=SHOTS.reduce((a,s)=>a+s.dur,0);let prof=K.profile([[0,1],[3.6,1],[4.3,.17],[10.6,.17],[11.2,1],[14,1]]);let mono=true;for(let u=0;u<14;u+=.01)if(prof(u+.01)<prof(u))mono=false;
   return {footSoleOnPedalTopMaxErrPx:maxSole,boneLengthMaxErr:maxBone,wheelCrankRatioErr:maxRatio,chainSpeedMismatch:maxLink,gear:K.RIG.gear,shotDurationsSum:sum,DURATION,durations:SHOTS.map(s=>[s.id,s.dur]),bulletTimeMonotonic:mono}})()`);
  const pelHorse=await ev(`(()=>{if(!K.pelHorseLeg)return null;let ms=0,mb=0;for(let j=0;j<4000;j++){const L=K.pelHorseLeg(j*.0137);ms=Math.max(ms,Math.abs(L.sole-L.tread[1]),Math.abs(L.ankle[1]-(L.sole-K.RIG.ankleUp)));mb=Math.max(mb,Math.abs(Math.hypot(L.knee[0]-L.hip[0],L.knee[1]-L.hip[1])-K.RIG.thigh),Math.abs(Math.hypot(L.ankle[0]-L.knee[0],L.ankle[1]-L.knee[1])-K.RIG.shin))}let r26=0,l26=0;for(let j=1;j<4000;j++){const d=j*13.7,q=K.pose26(d);r26=Math.max(r26,Math.abs(q.wheel/q.crank-K.RIG.gear),Math.abs(q.wheel*K.RIG26.R-d));l26=Math.max(l26,Math.abs(q.crank*K.RIG.ringR-q.wheel*K.RIG.cogR))}return {stirrupSoleMaxErr:ms,boneLengthMaxErr:mb,bike26WheelCrankErr:r26,bike26ChainMismatch:l26,note:'坤车与二八大杠共用 RIG.bb/crank/hip，脚踏 IK 同一函数 legSolve（见 rig 项）'}})()`);
  fs.writeFileSync(QA+'/check.json',JSON.stringify({seek:hs,seekRepeatEqual:hs[0].sha===hs[3].sha&&hs[2].sha===hs[4].sha&&hs[5].sha===hs[6].sha,rig,pelHorse},null,2));console.log('check done')}
 if(args.includes('--video')||args.includes('--all')){const N=Math.round(D*FPS),out=root+(TAG?'/'+TAG+'/':'/')+NAME;
  const ff=spawn('ffmpeg',['-y','-f','image2pipe','-vcodec','mjpeg','-framerate',String(FPS),'-i','pipe:0','-an','-vf','scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p,setsar=1','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-c:v','libx264','-preset','medium','-crf','19','-movflags','+faststart',out],{stdio:['pipe','ignore',fs.openSync(QA+'/encode.log','w')]});
  const b0=Date.now();for(let f=0;f<N;f++){const t=f/FPS,b=await grab(t);if(f%60===0){fs.writeFileSync(`${QA}/sheet/${String(f/60*2).padStart(4,'0')}.jpg`,b)}if(!ff.stdin.write(b))await once(ff.stdin,'drain');if(f%300===0)console.log(`frame ${f}/${N} ${((Date.now()-b0)/1000).toFixed(0)}s`)}
  ff.stdin.end();const [code]=await once(ff,'exit');if(code)throw Error('ffmpeg '+code);fs.writeFileSync(QA+'/render-time.json',JSON.stringify({frames:N,fps:FPS,seconds:(Date.now()-b0)/1000}));console.log('VIDEO DONE')}
}finally{try{ws&&ws.close()}catch(e){}chrome.kill('SIGTERM')}
