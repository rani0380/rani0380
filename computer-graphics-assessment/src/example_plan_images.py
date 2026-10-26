"""콘셉트 기획서 작성 예시용 이미지: 스토리보드 와이어프레임 7장 + 아이콘 잘라내기."""
import sys
from PIL import Image, ImageDraw, ImageFont

OUT, RENDER_DIR = sys.argv[1], sys.argv[2]   # RENDER_DIR: 예시 작품 PDF를 200dpi로 렌더링한 r-N.png
S = 60  # 1인치 = 60px (13.333 x 7.5 in → 800 x 450)
W, H = 800, 450
F = '/usr/share/fonts/truetype/nanum/NanumGothic.ttf'
FB = '/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf'
INK = (40, 70, 160)
GRAY = (150, 150, 150)


def font(sz, bold=False):
    return ImageFont.truetype(FB if bold else F, sz)


def new():
    im = Image.new('RGB', (W, H), 'white')
    return im, ImageDraw.Draw(im)


def px(v):
    return int(round(v * S))


def photo(d, x, y, w, h, label):
    b = [px(x), px(y), px(x + w), px(y + h)]
    d.rectangle(b, outline=INK, width=3)
    d.line([b[0], b[1], b[2], b[3]], fill=INK, width=2)
    d.line([b[0], b[3], b[2], b[1]], fill=INK, width=2)
    tw = d.textlength(label, font=font(18, True))
    cx, cy = (b[0] + b[2]) / 2, (b[1] + b[3]) / 2
    d.rectangle([cx - tw / 2 - 6, cy - 14, cx + tw / 2 + 6, cy + 14], fill='white')
    d.text((cx, cy), label, font=font(18, True), fill=INK, anchor='mm')


def txt(d, x, y, w, label, big=False, lines=2):
    gap = 10 if big else 7
    for i in range(lines):
        yy = px(y) + i * gap
        d.line([px(x), yy, px(x + w), yy], fill=INK, width=4 if big else 2)
    d.text((px(x), px(y) - (24 if big else 18)), label, font=font(17 if big else 14, True), fill=INK)


def icon(d, cx, cy, n, r=0.55):
    d.ellipse([px(cx - r), px(cy - r), px(cx + r), px(cy + r)], outline=INK, width=3)
    d.text((px(cx), px(cy)), str(n), font=font(20, True), fill=INK, anchor='mm')


def box(d, x, y, w, h, label=None, dash=False):
    d.rounded_rectangle([px(x), px(y), px(x + w), px(y + h)], radius=10, outline=GRAY if dash else INK, width=2)
    if label:
        d.text((px(x + w / 2), px(y + h / 2)), label, font=font(14, True), fill=INK, anchor='mm')


def common(d, title):
    d.text((px(0.6), px(0.75)), '</>', font=font(22, True), fill=INK, anchor='lm')
    txt(d, 1.5, 0.75, 6.5, title, big=True, lines=1)
    box(d, 12.0, 0.3, 0.85, 0.85, '엠블럼')
    d.rectangle([0, px(7.1), W, H], outline=INK, width=2)
    d.text((px(0.6), px(7.3)), '학교명 · 학과명 (공통 하단 띠)', font=font(12), fill=INK, anchor='lm')
    d.ellipse([px(12.35), px(6.9), px(12.93), px(7.48)], outline=INK, width=2)
    d.text((px(12.64), px(7.19)), 'No', font=font(11, True), fill=INK, anchor='mm')


frames = []
# 1 표지
im, d = new(); d.rectangle([0, 0, W - 1, H - 1], outline=INK, width=2)
d.text((px(0.4), px(0.3)), '배경: 네이비', font=font(14, True), fill=GRAY)
box(d, 0.8, 0.75, 0.95, 1.0, '엠블럼')
txt(d, 1.95, 1.1, 3.5, '학교명', lines=1)
txt(d, 0.8, 2.7, 4.0, '슬로건(노랑)', lines=1)
txt(d, 0.8, 4.0, 6.2, '학과명 (가장 크게)', big=True, lines=2)
txt(d, 0.8, 5.4, 5.0, '부제 2줄', lines=2)
d.ellipse([px(8.45), px(1.15), px(13.05), px(5.75)], outline=INK, width=2)
photo(d, 9.3, 1.1, 3.3, 5.6, '스마영')
frames.append(im)
# 2 학교 소개
im, d = new(); common(d, '학교 소개 제목')
photo(d, 0.6, 1.75, 9.0, 3.8, '학교 건물 사진 (가로로 넓게)')
for i, t in enumerate(('학과1', '학과2', '소프트웨어과★')):
    box(d, 0.6 + i * 3.05, 6.2, 2.85, 0.65, t)
box(d, 9.95, 1.85, 2.95, 1.75, '말풍선 인사')
photo(d, 10.35, 4.05, 2.3, 2.85, '스마영')
frames.append(im)
# 3 교육목표
im, d = new(); common(d, '학과 소개 제목')
photo(d, 0.6, 1.85, 6.2, 2.9, '실습 사진')
box(d, 0.6, 5.5, 6.2, 0.95)
txt(d, 0.9, 6.05, 5.5, '한 줄 메시지', lines=1)
box(d, 7.2, 1.85, 5.55, 4.6)
txt(d, 7.6, 3.2, 4.6, '교육목표 (큰 글씨, 네이비 카드)', lines=4)
frames.append(im)
# 4 배우는 분야
im, d = new(); common(d, '배우는 분야 제목')
for i in range(4):
    x = 0.6 + i * 3.08
    box(d, x, 1.9, 2.85, 4.75)
    icon(d, x + 1.425, 2.95, i + 1)
    txt(d, x + 0.4, 4.1, 2.05, '분야명', lines=1)
    txt(d, x + 0.3, 5.1, 2.25, '설명', lines=2)
frames.append(im)
# 5 자격증
im, d = new(); common(d, '자격증 제목')
for i in range(3):
    x = 0.6 + i * 4.1
    box(d, x, 1.9, 3.85, 4.5)
    icon(d, x + 1.925, 2.95, 5)
    txt(d, x + 0.5, 4.6, 2.85, '자격증 이름', lines=3)
frames.append(im)
# 6 진로
im, d = new(); common(d, '진로 제목')
box(d, 0.6, 1.8, 1.6, 0.55, '취업')
for i, n in enumerate((6, 7, 8)):
    x = 0.6 + i * 2.95
    box(d, x, 2.55, 2.75, 3.6)
    icon(d, x + 1.375, 3.55, n)
    txt(d, x + 0.35, 4.8, 2.05, '분야', lines=2)
box(d, 9.65, 1.8, 1.6, 0.55, '진학')
box(d, 9.65, 2.55, 3.1, 3.6)
icon(d, 11.2, 3.55, 9)
txt(d, 10.0, 4.8, 2.4, '진학 사례', lines=2)
frames.append(im)
# 7 마무리
im, d = new(); d.rectangle([0, 0, W - 1, H - 1], outline=INK, width=2)
d.text((px(10.4), px(0.25)), '배경: 네이비', font=font(14, True), fill=GRAY)
txt(d, 1.5, 0.8, 8.5, '마무리 인사 제목', big=True, lines=1)
box(d, 0.6, 1.55, 5.4, 4.3)
txt(d, 0.9, 2.9, 4.5, '모집 인원 (숫자 크게)', big=True, lines=1)
txt(d, 0.9, 4.2, 4.5, '전형별 인원', lines=2)
box(d, 6.3, 1.55, 6.45, 4.3)
txt(d, 6.65, 2.1, 4.0, '학교설명회', lines=1)
for i in range(3):
    d.ellipse([px(6.65), px(2.65 + i * 0.95), px(7.4), px(3.4 + i * 0.95)], outline=INK, width=2)
    txt(d, 7.6, 3.05 + i * 0.95, 4.5, '', lines=1)
box(d, 0.6, 6.2, 9.6, 0.85, '입학 문의 ☎ (노란 띠)')
photo(d, 11.2, 5.95, 1.1, 1.5, '스마영')
frames.append(im)

for i, im in enumerate(frames, 1):
    im.save(f'{OUT}/sb{i}.png')

# 아이콘 잘라내기 (200dpi 렌더링, 반지름 0.62in)
DPI = 200
def cut(page, cx, cy, name):
    im = Image.open(f'{RENDER_DIR}/r-{page}.png')
    r = 0.7
    im.crop((int((cx - r) * DPI), int((cy - r) * DPI), int((cx + r) * DPI), int((cy + r) * DPI))).save(f'{OUT}/{name}.png')
for i, n in enumerate(('ic_web', 'ic_game', 'ic_ai', 'ic_data')):
    cut(4, 0.6 + i * 3.08 + 1.425, 2.95, n)
cut(5, 0.6 + 1.925, 2.95, 'ic_badge')
for i, n in enumerate(('ic_monitor', 'ic_network', 'ic_building')):
    cut(6, 0.6 + i * 2.95 + 1.375, 3.55, n)
cut(6, 11.2, 3.55, 'ic_cap')
print('done')
