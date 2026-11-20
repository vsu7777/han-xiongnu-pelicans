from PIL import Image,ImageDraw,ImageFont
import os
F=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',26)
os.makedirs('v2/对比_返修前后',exist_ok=True)
for i in ['0','1-1','1-4','2-3','3-1','3-2','3-3','4-1','4-2','4-3','4-4']:
  W,H=640,360;s=Image.new('RGB',(W*3+120,(H+10)*2+50),'#111');d=ImageDraw.Draw(s)
  d.text((10,10),f'{i}  返修前后对比（同一时刻：镜头 20% / 50% / 85%）',fill='#eee',font=F)
  for r,(lab,q) in enumerate([('v1 粗剪','qa/keyframes_v1'),('v2 返修','qa_v2/keyframes')]):
    d.text((10,50+r*(H+10)+H//2-15),lab,fill='#f6c27f',font=F)
    for j,f in enumerate(['20','50','85']):s.paste(Image.open(f'{q}/{i}_{f}.jpg').resize((W,H)),(120+j*W,50+r*(H+10)))
  s.save(f'v2/对比_返修前后/{i}_v1_vs_v2.jpg',quality=88)
print('ok')
