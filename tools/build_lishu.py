# 由 Make Me a Hanzi 的笔画中线（笔顺）程序化生成"隶书风格"笔画：压扁字面、横画取平、
# 主横与捺加蚕头燕尾、去竖钩。不是隶书字库，也不是任何隶书碑帖的描摹。
#
# graphics.txt 取自 Make Me a Hanzi（Arphic Public License），仓库根目录即该文件：
#   https://github.com/skishore/makemeahanzi
#   https://github.com/skishore/makemeahanzi/blob/master/graphics.txt
#   https://raw.githubusercontent.com/skishore/makemeahanzi/master/graphics.txt
#
# 用法：
#   python3 tools/build_lishu.py glyphs_lishu.js [graphics.txt]
#   MMAH_GRAPHICS=/path/to/graphics.txt python3 tools/build_lishu.py glyphs_lishu.js
# 第二个参数优先。未指定时读环境变量 MMAH_GRAPHICS，再没有则默认 /tmp/mmah/graphics.txt。
# 仓库已带生成好的 glyphs_lishu.js，平常不必重跑；重跑会覆盖该文件。
import json,math,os,sys
if len(sys.argv)<2:
    sys.exit('用法：python3 tools/build_lishu.py <输出.js> [graphics.txt]')
SRC=sys.argv[2] if len(sys.argv)>2 else os.environ.get('MMAH_GRAPHICS','/tmp/mmah/graphics.txt')
if not os.path.isfile(SRC):
    sys.exit('找不到 graphics.txt：%s\n请从 https://github.com/skishore/makemeahanzi 取得仓库根目录的 graphics.txt，\n然后：python3 tools/build_lishu.py glyphs_lishu.js /path/to/graphics.txt\n或：MMAH_GRAPHICS=/path/to/graphics.txt python3 tools/build_lishu.py glyphs_lishu.js' % SRC)
CH='夐嵑汉匈百年十万鹈鹕来袭历史戏仿封燕然山铭铄王师兮征荒裔剿凶虐截海外其邈亘地界神丘建隆熙帝载振万世自此漠北无车铃'
COMP=set('曷负目夂山')
raw={}
for line in open(SRC,encoding='utf8'):
    d=json.loads(line)
    if d['character'] in set(CH)|COMP: raw[d['character']]=d['medians']
def norm(m): return [[(x-512)/1024,(900-y-512)/1024] for x,y in m]
def bbox(strokes):
    xs=[p[0] for s in strokes for p in s];ys=[p[1] for s in strokes for p in s];return min(xs),min(ys),max(xs),max(ys)
def place(strokes,box):
    x0,y0,x1,y1=bbox(strokes);X0,Y0,X1,Y1=[(v-512)/1024 for v in box]
    return [[[X0+(p[0]-x0)/(x1-x0+1e-9)*(X1-X0),Y0+(p[1]-y0)/(y1-y0+1e-9)*(Y1-Y0)] for p in s] for s in strokes]
G={c:[norm(m) for m in raw[c]] for c in raw}
G['嵑']=place(G['山'],(70,250,390,800))+place(G['曷'],(420,80,970,960))
G['夐']=place(G['负'][:2],(260,40,720,250))+place(G['目'],(330,270,690,600))+place(G['夂'],(170,620,880,990))
COMPOSED={'嵑':'山+曷 部件拼合','夐':'⺈(取自“负”前两笔)+目+夂 部件拼合（近似）'}
def resample(pts,step=.012):
    out=[pts[0]];acc=0
    for a,b in zip(pts,pts[1:]):
        L=math.dist(a,b);t=step-acc
        while t<=L:
            f=t/L;out.append([a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]);t+=step
        acc=L-(t-step)
    if math.dist(out[-1],pts[-1])>1e-4:out.append(pts[-1])
    return out
def lishu(strokes):
    S=[[ [p[0]*1.12,p[1]*.80] for p in s] for s in strokes]  # 压扁：隶书字面宽扁
    info=[]
    for s in S:
        dx=s[-1][0]-s[0][0];dy=s[-1][1]-s[0][1];L=math.hypot(dx,dy);ang=math.degrees(math.atan2(dy,dx))
        info.append((dx,dy,L,ang))
    # 横画取平
    for s,(dx,dy,L,ang) in zip(S,info):
        if L>.08 and abs(ang)<22 and len(s)>=2:
            for i,p in enumerate(s):
                f=i/(len(s)-1);ly=s[0][1]+dy*f;p[1]=s[0][1]+(p[1]-ly)*.3+dy*.25*f
    # 去竖钩：竖画末端短促回勾
    for s,(dx,dy,L,ang) in zip(S,info):
        if len(s)>=3 and dy>.25:
            a,b=s[-2],s[-1]
            if b[1]<a[1] and math.dist(a,b)<.16: s.pop()
    hz=[i for i,(dx,dy,L,ang) in enumerate(info) if abs(ang)<22 and L>.38]
    main=max(hz,key=lambda i:info[i][2]) if hz else None
    out=[]
    for i,s in enumerate(S):
        dx,dy,L,ang=info[i];kind='n'
        if i==main: kind='wave'
        elif dx>.12 and dy>.12 and 20<ang<75 and L>.3: kind='na'
        elif dx<-.1 and dy>.15 and L>.28: kind='pie'
        pts=[p[:] for p in s]
        if kind=='wave':
            e=pts[-1];pts.append([e[0]+.05,e[1]-.03])
        if kind=='na':
            e=pts[-1];pts.append([e[0]+.07,e[1]+.005]);pts.append([e[0]+.12,e[1]-.02])
        if kind=='pie':
            e=pts[-1];pts.append([e[0]-.05,e[1]-.012])
        R=resample(pts);n=len(R);W=[]
        for k in range(n):
            f=k/max(1,n-1);w=.058
            if kind=='wave':
                w=.058*(1.35-1.1*math.sin(min(1,f/.12)*math.pi/2)*.4) if f<.15 else .05+.045*max(0,(f-.72)/.28)
                if f>.94:w*=max(.35,1-(f-.94)/.06*.6)
            elif kind=='na':
                w=.05+.05*max(0,(f-.6)/.4)
                if f>.93:w*=max(.35,1-(f-.93)/.07*.6)
            elif kind=='pie':
                w=.06-.02*f
            else:
                w=.06 if f<.9 else .06*(1-(f-.9)*1.5)
            W.append(round(w,4))
        out.append({'k':kind,'p':[[round(p[0],4),round(p[1],4),W[j]] for j,p in enumerate(R)]})
    return out
data={c:lishu(G[c]) for c in CH}
js='// 自动生成：tools/build_lishu.py。笔顺骨架来自 Make Me a Hanzi graphics.txt（Arphic Public License），\n// 经程序隶书化（压扁、横平、蚕头燕尾、去钩）。非隶书字库，非原碑描摹。\nwindow.LISHU='+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\nwindow.LISHU_COMPOSED='+json.dumps(COMPOSED,ensure_ascii=False)+';\n'
open(sys.argv[1],'w').write(js);print(len(data),'chars',len(js),'bytes')
