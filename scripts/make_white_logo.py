from PIL import Image
from pathlib import Path

src = Path('/home/ubuntu/golden-toto/public/assets/goldentotologo.jpg')
out = Path('/home/ubuntu/golden-toto/public/assets/goldentotologo-white.png')
im = Image.open(src).convert('RGBA')
p = im.load()
for y in range(im.height):
    for x in range(im.width):
        r, g, b, a = p[x, y]
        # The supplied logo uses a warm near-white background; keep only the maroon artwork.
        darkness = 255 - min(r, g, b)
        alpha = max(0, min(255, int((darkness - 18) * 2.2)))
        p[x, y] = (255, 255, 255, alpha)
im.save(out, optimize=True)
print(out)
