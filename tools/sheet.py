import sys,os
from PIL import Image,ImageDraw,ImageFont
qa=sys.argv[1];out=sys.argv[2]
ids=['0','1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','3-1','3-2','3-3','3-4','4-0','4-1','4-2','4-3','4-4','end']
W,H=480,270;F=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',22)
cols=6;rows=(len(ids)+1)//2
s=Image.new('RGB',(W*cols,(H+30)*rows),'#111');d=ImageDraw.Draw(s)
for n,i in enumerate(ids):
  r=n//2;c0=(n%2)*3
  for j,f in enumerate(['20','50','85']):
    s.paste(Image.open(f'{qa}/keyframes/{i}_{f}.jpg').resize((W,H)),((c0+j)*W,r*(H+30)+30))
  d.text((c0*W+8,r*(H+30)+2),f'{i}  (20% / 50% / 85%)',fill='#eee',font=F)
s.save(out,quality=88);print(s.size)
