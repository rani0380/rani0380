"""서술형 시험지용 그림: 1) 래스터·벡터 확대 비교 2) 포스터 시안 3) 아이콘 세트."""
import sys
from PIL import Image, ImageDraw, ImageFont

OUT = sys.argv[1]
FB = '/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf'
F = '/usr/share/fonts/truetype/nanum/NanumGothic.ttf'
f = lambda s, b=True: ImageFont.truetype(FB if b else F, s)

# ---------- 그림 1: 같은 원을 8배 확대 ----------
W, H = 1200, 560
im = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(im)
# 그림 A: 16x16 픽셀 원을 확대 (계단 현상)
small = Image.new('L', (16, 16), 255); ImageDraw.Draw(small).ellipse([1, 1, 14, 14], fill=0)
pix = small.resize((420, 420), Image.NEAREST).convert('RGB')
im.paste(pix, (90, 50))
for i in range(17):  # 픽셀 격자
    d.line([90 + i * 26.25, 50, 90 + i * 26.25, 470], fill=(210, 210, 210), width=1)
    d.line([90, 50 + i * 26.25, 510, 50 + i * 26.25], fill=(210, 210, 210), width=1)
# 그림 B: 매끄러운 원
big = Image.new('L', (1680, 1680), 255); ImageDraw.Draw(big).ellipse([105, 105, 1575, 1575], fill=0)
im.paste(big.resize((420, 420), Image.LANCZOS).convert('RGB'), (690, 50))
d.rectangle([90, 50, 510, 470], outline=(120, 120, 120), width=2)
d.rectangle([690, 50, 1110, 470], outline=(120, 120, 120), width=2)
d.text((300, 515), '그림 A', font=f(34), fill='black', anchor='mm')
d.text((900, 515), '그림 B', font=f(34), fill='black', anchor='mm')
im.save(f'{OUT}/fig1.png')

# ---------- 그림 2: 축제 포스터 시안 (문제가 있는 시안) ----------
W, H = 700, 990
im = Image.new('RGB', (W, H), (250, 250, 250)); d = ImageDraw.Draw(im)
# 밝은 하늘색 사진 영역(사진을 대신하는 회색 계열 그라데이션)
for y in range(0, 640):
    c = int(225 + 20 * y / 640)
    d.line([0, y, W, y], fill=(c - 10, c, 255 if c > 245 else c + 10))
d.text((W / 2, 320), '[ 공연 사진 ]', font=f(30, False), fill=(150, 160, 180), anchor='mm')
# 왼쪽에 몰린 요소들
d.rounded_rectangle([18, 30, 330, 120], radius=6, fill=(255, 238, 120))
d.text((30, 52), '스마트 축제 2026', font=f(44), fill=(255, 255, 255))   # 밝은 배경 위 흰 글자
d.text((20, 150), '노래 · 댄스 · 체험 부스', font=f(36), fill=(255, 230, 90))  # 하늘색 위 노란 글자
d.rectangle([18, 220, 260, 470], fill=(255, 140, 80)); d.text((139, 345), '[ 사진 ]', font=f(26, False), fill='white', anchor='mm')
d.rectangle([18, 480, 260, 630], fill=(80, 170, 120)); d.text((139, 555), '[ 사진 ]', font=f(26, False), fill='white', anchor='mm')
d.ellipse([20, 650, 170, 800], fill=(255, 120, 120)); d.text((95, 725), '로고', font=f(26), fill='white', anchor='mm')
d.text((20, 830), '일시 11월 27일(금) 13:00 / 장소 대강당', font=f(19, False), fill=(170, 170, 170))
d.text((20, 870), '대구스마트고등학교 학생회', font=f(17, False), fill=(190, 190, 190))
d.text((680, 975), '모두 와 주세요!', font=f(16, False), fill=(200, 200, 200), anchor='rd')
d.rectangle([0, 0, W - 1, H - 1], outline=(90, 90, 90), width=3)
im.save(f'{OUT}/fig2.png')

# ---------- 그림 3: 아이콘 세트 ----------
W, H = 1240, 400
im = Image.new('RGB', (W, H), 'white'); d = ImageDraw.Draw(im)
NAV = (30, 50, 90); LW = 9
def cell(i):
    return 40 + i * 300, 40
# ① 집 (외곽선, 둥근 모서리)
x, y = cell(0)
d.line([x + 40, y + 120, x + 120, y + 45, x + 200, y + 120], fill=NAV, width=LW, joint='curve')
d.rounded_rectangle([x + 62, y + 115, x + 178, y + 235], radius=14, outline=NAV, width=LW)
d.rounded_rectangle([x + 102, y + 170, x + 138, y + 235], radius=8, outline=NAV, width=LW)
# ② 책 (외곽선, 둥근 모서리)
x, y = cell(1)
d.rounded_rectangle([x + 30, y + 60, x + 120, y + 220], radius=14, outline=NAV, width=LW)
d.rounded_rectangle([x + 120, y + 60, x + 210, y + 220], radius=14, outline=NAV, width=LW)
for k in range(3):
    d.line([x + 50, y + 100 + k * 30, x + 100, y + 100 + k * 30], fill=NAV, width=6)
# ③ 시계 (채움 + 각진, 굵기 다름) ← 스타일이 다른 아이콘
x, y = cell(2)
d.regular_polygon((x + 120, y + 140, 100), 8, fill=(0, 0, 0))
d.polygon([(x + 112, y + 70), (x + 128, y + 70), (x + 128, y + 140), (x + 112, y + 140)], fill='white')
d.polygon([(x + 120, y + 132), (x + 180, y + 132), (x + 180, y + 148), (x + 120, y + 148)], fill='white')
# ④ 별 (외곽선, 둥근 모서리)
x, y = cell(3)
import math
pts = []
for k in range(10):
    r = 100 if k % 2 == 0 else 42
    a = -math.pi / 2 + k * math.pi / 5
    pts.append((x + 120 + r * math.cos(a), y + 140 + r * math.sin(a)))
d.line(pts + [pts[0]], fill=NAV, width=LW, joint='curve')
for i, t in enumerate(('①', '②', '③', '④')):
    d.text((160 + i * 300, 360), t, font=f(38), fill='black', anchor='mm')
im.save(f'{OUT}/fig3.png')
print('ok')
