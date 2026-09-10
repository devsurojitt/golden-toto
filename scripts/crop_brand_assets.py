from PIL import Image, ImageChops
from pathlib import Path

assets = Path('/home/ubuntu/golden-toto/public/assets')
source = Image.open(assets / 'goldentotologo.jpg').convert('RGB')
pix = source.load()
mask = Image.new('L', source.size, 0)
mp = mask.load()
for y in range(source.height):
    for x in range(source.width):
        r, g, b = pix[x, y]
        darkness = 255 - min(r, g, b)
        mp[x, y] = 255 if darkness > 26 else 0
bbox = mask.getbbox()
if bbox:
    pad = 28
    bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(source.width, bbox[2]+pad), min(source.height, bbox[3]+pad))
    source.crop(bbox).save(assets / 'goldentotologo-cropped.jpg', quality=95, optimize=True)

white = Image.open(assets / 'goldentotologo-white.png').convert('RGBA')
alpha = white.getchannel('A')
bbox = alpha.getbbox()
if bbox:
    pad = 20
    bbox = (max(0, bbox[0]-pad), max(0, bbox[1]-pad), min(white.width, bbox[2]+pad), min(white.height, bbox[3]+pad))
    white.crop(bbox).save(assets / 'goldentotologo-white-cropped.png', optimize=True)
print('cropped brand assets created')
