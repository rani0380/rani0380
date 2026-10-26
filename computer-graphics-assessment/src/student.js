const fs = require('fs');
const L = require('./lib');
const { d, P, B, H, C, T, lines, brk, gap, W, GRAY, BLUE, PALE, AlignmentType: A, VerticalAlign: V } = L;
const CT = A.CENTER;

const body = [];
const add = (...x) => body.push(...x);

// ---------- 1쪽: 표지·평가 안내 ----------
add(P([{ t: '20      학년도   학기  컴퓨터그래픽 수행평가', s: 20, c: '444444' }], { align: CT, after: 40 }));
add(P([{ t: '그래픽 소프트웨어를 활용한 디지털 이미지 제작', b: true, s: 34 }], { align: CT, after: 40 }));
add(P([{ t: '― 우리 학과 소개 홍보 포스터 ―', s: 24, c: '2F4B7C', b: true }], { align: CT, after: 160 }));

add(T([1700, 3400, 1500, 3606], [
  { h: 480, cells: [C('평가명', { w: 1700, fill: GRAY, align: CT, bold: true }), C('그래픽 소프트웨어를 활용한 디지털 이미지 제작', { w: 8506, span: 3 })] },
  { h: 480, cells: [C('과목', { w: 1700, fill: GRAY, align: CT, bold: true }), C('컴퓨터그래픽 (1학년)', { w: 3400 }),
    C('평가 시간', { w: 1500, fill: GRAY, align: CT, bold: true }), C('3차시 (50분 × 3차시)', { w: 3606 })] },
  { h: 560, cells: [C('학년·반·번호', { w: 1700, fill: GRAY, align: CT, bold: true }), C('  1 학년        반        번', { w: 3400 }),
    C('이름', { w: 1500, fill: GRAY, align: CT, bold: true }), C('', { w: 3606 })] },
]));

add(H('1. 평가 안내'));
add(T([1700, 8506], [
  [C('성취기준', { w: 1700, fill: GRAY, align: CT, bold: true }),
   C('[컴그 03-01] 벡터 이미지와 래스터 이미지의 기본적인 원리와 차이점을 이해하고, 각각의 고유한 표현 방법을 응용하여 다양한 이미지를 표현할 수 있고, 적용하고자 하는 매체에 맞는 시각적 균형과 심미적 표현을 할 수 있다.', { w: 8506, size: 18 })],
]));
add(gap());
add(T([1000, 2600, 3806, 2800], [
  { header: true, cells: ['차시', '수행 단계', '학생 활동', '제출·확인 자료'].map((t, i) => C(t, { w: [1000, 2600, 3806, 2800][i], fill: BLUE, align: CT, bold: true })) },
  [C('1차시', { w: 1000, align: CT }), C('① 주제 분석 및 구성 계획', { w: 2600, bold: true }),
   C('제작 주제와 조건을 분석하고 제작 계획서(6번)를 작성한다.', { w: 3806 }), C('제작 계획서·배치 스케치', { w: 2800 })],
  [C('2차시', { w: 1000, align: CT }), C('② 그래픽 소프트웨어를 활용한 제작', { w: 2600, bold: true }),
   C('계획서에 따라 Photoshop으로 포스터를 제작한다(5번 실습 과제).', { w: 3806 }), C('중간 저장 파일(PSD)', { w: 2800 })],
  [C('3차시', { w: 1000, align: CT }), C('③ 점검·수정·최종 제출', { w: 2600, bold: true }),
   C('결과물을 점검하여 수정·보완하고 점검·수정 기록(7번)을 작성한 뒤 최종 제출한다.', { w: 3806 }), C('최종 파일(PSD·JPG), 점검·수정 기록', { w: 2800 })],
]));
add(P([{ t: '※ 시험지는 1차시가 끝날 때 제출하고, 2·3차시 시작 때 돌려받아 이어서 사용합니다.', s: 17, c: '444444' }], { before: 40 }));

add(H('2. 과제 개요'));
add(T([1700, 8506], [
  [C('제작 주제', { w: 1700, fill: GRAY, align: CT, bold: true }), C([{ t: '우리 학과 소개 홍보 포스터', b: true }], { w: 8506 })],
  [C('활용 목적', { w: 1700, fill: GRAY, align: CT, bold: true }), C('중학생과 학부모에게 우리 학과에서 배우는 내용과 학과의 매력을 알려 진학에 대한 관심을 높인다. (입학 설명회 및 학교 홍보 게시판 게시용)', { w: 8506 })],
  [C('대상 매체', { w: 1700, fill: GRAY, align: CT, bold: true }), C('인쇄용 포스터 — A4 세로 크기로 컬러 인쇄하여 게시판에 붙인다. (보는 사람: 중학생, 학부모)', { w: 8506 })],
]));

add(H('3. 제작 조건'));
const cond = (k, v) => [C(k, { w: 1700, fill: GRAY, align: CT, bold: true }), C(v, { w: 8506 })];
add(T([1700, 8506], [
  cond('작업 크기', 'A4 세로 : 폭 210mm × 높이 297mm (새 문서 단위를 "밀리미터"로 설정)'),
  cond('해상도', '300 픽셀/인치(ppi)'),
  cond('색상 모드', 'CMYK 색상, 8비트 (인쇄 매체용)'),
  cond('제공 소스', [P('바탕화면의 [제공소스] 폴더', { after: 20 }),
    B('학과 실습 장면 사진 3장 (JPG)', { after: 0 }), B('학교 로고 1개 (PNG, 투명 배경)', { after: 0 })]),
  cond('사용할 수 있는 이미지', [P('제공 소스, 본인이 직접 촬영한 사진(사람 얼굴이 나오면 촬영 대상의 동의를 받을 것)', { after: 20 }),
    P([{ t: '인터넷에서 찾은 이미지, 다른 사람의 작업 파일은 사용할 수 없습니다.', b: true }], { after: 0 })]),
  cond('필수 포함 문구', [
    P('① 학교명과 학과명 (예: ○○고등학교 ○○과)', { after: 20 }),
    P('② 홍보 슬로건 1개 — 직접 작성, 20자 이내', { after: 20 }),
    P('③ 학과에서 배우는 내용 또는 진출 분야 키워드 3개 이상', { after: 20 }),
    P('④ 입학 문의 정보 — 입학 문의 ☎ ________________ (선생님이 안내한 번호)', { after: 0 })]),
  cond('필수 제작 조건', [
    B('제공 사진 2장 이상과 학교 로고를 사용한다.', { after: 0 }),
    B('셰이프 도구 또는 펜 도구로 직접 만든 벡터 요소(도형, 아이콘, 문자 배경 상자 등)를 1개 이상 넣는다.', { after: 0 }),
    B('문자와 로고 등 중요한 요소는 가장자리에서 10mm 안쪽에 배치한다.', { after: 0 }),
    B('문자 레이어와 셰이프 레이어는 래스터화하지 않고, 레이어를 병합하지 않은 채 저장한다.', { after: 0 })]),
]));

add(gap(120));
add(T([W], [[C([
  P([{ t: '■ AI 활용 금지 안내', b: true, c: 'B00020', s: 21 }], { after: 40 }),
  P('이 평가는 AI를 활용하지 않고 본인의 힘으로 수행합니다. 아래의 내용은 계획·제작·수정의 모든 과정에서 사용할 수 없습니다.', { after: 30 }),
  B('생성형 AI 서비스(챗봇, 이미지 생성 AI 등)로 아이디어, 문구, 이미지를 만드는 것', { after: 0 }),
  B('Photoshop의 생성형 AI 기능: 생성형 채우기, 생성형 확장, 이미지 생성, 뉴럴 필터 등', { after: 0 }),
  B('AI가 자동으로 대상을 찾아 주는 선택 기능: 피사체 선택, 개체 선택 도구, 배경 제거(빠른 작업) 등', { after: 30 }),
  P([{ t: '→ 선택은 사각형·원형 선택 윤곽 도구, 올가미 도구, 빠른 선택 도구, 자동 선택 도구, 펜 도구 등으로 직접 합니다.', s: 18 }], { after: 0 }),
], { w: W, fill: 'FFF4F4', mt: 100, mb: 100 })]]));

add(H('4. 평가요소'));
add(T([4400, 1200, 4606], [
  { header: true, cells: [C('평가요소', { w: 4400, fill: BLUE, align: CT, bold: true }), C('배점', { w: 1200, fill: BLUE, align: CT, bold: true }), C('확인 자료', { w: 4606, fill: BLUE, align: CT, bold: true })] },
  [C('디자인 주제 분석 및 이미지 구성 계획', { w: 4400 }), C('30점', { w: 1200, align: CT }), C('제작 계획서, 배치 스케치', { w: 4606 })],
  [C('그래픽 소프트웨어 활용 및 이미지 표현', { w: 4400 }), C('30점', { w: 1200, align: CT }), C('편집 가능한 원본 파일(PSD), 수행 과정', { w: 4606 })],
  [C('디자인 완성도 및 시각적 표현', { w: 4400 }), C('40점', { w: 1200, align: CT }), C('최종 이미지(JPG), 점검·수정 기록', { w: 4606 })],
  [C('합계', { w: 4400, bold: true, align: CT, fill: PALE }), C('100점', { w: 1200, align: CT, bold: true, fill: PALE }), C('', { w: 4606, fill: PALE })],
]));

// ---------- 2쪽: 실습 과제 ----------
add(H('5. 실습 과제 (2차시) — Photoshop으로 포스터 제작하기'));
add(P('제작 계획서(6번)를 옆에 두고 아래 순서대로 제작하세요. 한 단계를 마칠 때마다 확인 칸에 ✓ 표시합니다.', { after: 80 }));
const sw = [700, 1700, 6806, 1000];
const step = (n, name, items) => ({ cells: [C(n, { w: sw[0], align: CT, bold: true }), C(name, { w: sw[1], bold: true }),
  C(items.map((x, i) => (i === 0 && typeof x === 'string') ? P(x, { after: 20 }) : (typeof x === 'string' ? B(x, { after: 0 }) : x)).flat(), { w: sw[2] }),
  C('☐', { w: sw[3], align: CT, size: 26 })] });
add(T(sw, [
  { header: true, cells: ['단계', '기능', '할 일', '확인'].map((t, i) => C(t, { w: sw[i], fill: BLUE, align: CT, bold: true })) },
  step('1', '새 문서', ['[파일] → [새로 만들기]에서 작업 조건을 설정하고 바로 저장한다.',
    '폭 210mm, 높이 297mm, 해상도 300ppi, 색상 모드 CMYK 8비트, 배경 흰색',
    '[파일] → [다른 이름으로 저장] → 형식 Photoshop(*.PSD), 파일명은 8번 제출 안내를 따른다.']),
  step('2', '선택', ['제공 사진을 불러와 포스터에 필요한 부분을 선택한다.',
    '사각형·원형 선택 윤곽, 올가미, 빠른 선택, 자동 선택, 펜 도구 중 대상에 알맞은 도구를 고른다.',
    '선택 영역 추가(Shift)·빼기(Alt)로 경계를 다듬는다.']),
  step('3', '변형', ['사진과 도형의 크기·방향을 배치 스케치에 맞게 조정한다.',
    '[편집] → [자유 변형](Ctrl+T)으로 크기 조절, 회전, 뒤집기 등을 한다. 비율이 찌그러지지 않게 한다.',
    [P([{ t: '사진(래스터)은 원본보다 크게 확대하면 흐려지므로 필요 이상으로 키우지 않는다.', b: true, s: 18 }], { after: 0, indent: { left: 340 } })]]),
  step('4', '이미지 합성', ['사진 2장 이상을 하나의 화면으로 자연스럽게 합성한다.',
    '레이어 마스크를 추가하고 브러시(검정·흰색)나 그레이디언트로 경계를 자연스럽게 처리한다.',
    '지우개로 원본 픽셀을 지우는 대신 레이어 마스크를 사용한다.']),
  step('5', '색상 조정', ['사진의 색감을 색상 계획(6번-④)에 맞게 통일한다.',
    '조정 레이어(색조/채도, 곡선, 레벨, 색상 균형 등)를 1개 이상 사용한다.',
    '필요하면 조정 레이어를 특정 사진 레이어에만 적용(클리핑 마스크)한다.']),
  step('6', '벡터 요소', ['셰이프 도구 또는 펜 도구로 도형·아이콘·문자 배경 상자 등을 직접 만든다.',
    '도구 옵션을 [모양(셰이프)]으로 두어 셰이프 레이어로 만든다. 래스터화하지 않는다.',
    [P([{ t: '셰이프(벡터)는 크기를 바꿔도 선명하다는 점을 활용한다.', s: 18 }], { after: 0, indent: { left: 340 } })]]),
  step('7', '문자', ['필수 포함 문구 4가지(3번 제작 조건)를 모두 입력한다.',
    '문자 도구로 입력하고 서체, 크기, 굵기, 자간·행간, 색상을 계획에 맞게 지정한다.',
    '제목이 멀리서도 잘 보이도록 크기 차이를 분명하게 둔다. 문자 레이어는 래스터화하지 않는다.']),
  step('8', '레이어 정리', ['레이어 이름을 내용이 드러나게 바꾸고 순서를 정리한다.',
    '예: 제목, 슬로건, 사진_실습1, 조정_색조, 도형_배경상자 / 관련 레이어는 그룹으로 묶어도 된다.',
    '[이미지 병합]이나 [레이어 병합]은 하지 않는다.']),
  step('9', '중간 저장', ['2차시가 끝나기 전에 현재 상태를 중간 저장 파일로 제출한다.',
    '파일명: 학번_이름_중간.psd → 선생님이 안내한 제출 폴더에 저장']),
]));
add(P([{ t: '※ 작업 중에는 Ctrl+S로 자주 저장하세요. 3차시에는 중간 저장 파일을 열어 점검·수정을 이어 갑니다.', s: 17, c: '444444' }], { before: 60 }));

// ---------- 3쪽: 제작 계획서 ①② ----------
add(H('6. 제작 계획서 (1차시)', { pageBreak: true, before: 0 }));
add(P('아래 ①~④를 순서대로 작성하세요. 계획서는 제작할 때 그대로 따라 할 수 있을 만큼 구체적으로 씁니다.', { after: 80 }));
add(P([{ t: '① 주제와 목적 분석', b: true, s: 21 }], { after: 60, keepNext: true }));
const qa = (q, n, hint) => [C(q, { w: 2900, fill: PALE, bold: true }), C(lines(n, hint), { w: 7306, v: V.TOP })];
add(T([2900, 7306], [
  qa('홍보 대상은 누구이며, 그들이 궁금해할 내용은 무엇인가?', 2),
  qa('포스터로 전달할 핵심 메시지 (한 문장)', 2),
  qa('우리 학과의 특징 키워드 (3개 이상)', 2, '1)                        2)                        3)'),
  qa('표현하고 싶은 포스터의 분위기와 그 이유', 2),
  qa('대상 매체(A4 인쇄 포스터, 게시판 게시)의 특징과 제작할 때 고려할 점', 3),
]));
add(gap(160));
add(P([{ t: '② 벡터 이미지와 래스터 이미지의 특징과 활용 이유', b: true, s: 21 }], { after: 60, keepNext: true }));
const vw = [2300, 3953, 3953];
const vr = (k, n) => [C(k, { w: vw[0], fill: PALE, bold: true }), C(lines(n), { w: vw[1], v: V.TOP }), C(lines(n), { w: vw[2], v: V.TOP })];
add(T(vw, [
  { header: true, cells: [C('구분', { w: vw[0], fill: BLUE, align: CT, bold: true }), C('벡터 이미지', { w: vw[1], fill: BLUE, align: CT, bold: true }), C('래스터(비트맵) 이미지', { w: vw[2], fill: BLUE, align: CT, bold: true })] },
  vr('이미지를 표현하는 원리', 2),
  vr('확대·축소할 때의 변화', 2),
  vr('이 포스터에서 이 방식으로 표현할 요소', 2),
  vr('그 요소를 이 방식으로 표현하는 이유', 3),
  vr('Photoshop에서 만드는 방법 (도구·레이어 종류)', 2),
]));

// ---------- 4쪽: 배치 스케치 ③ ----------
add(P([{ t: '③ 배치 스케치', b: true, s: 21 }], { pageBreak: true, after: 40 }));
add(P('A4 세로 틀 안에 제목, 슬로건, 사진, 로고, 벡터 요소, 키워드, 문의 정보의 위치를 그리고 각 요소의 이름을 적으세요.', { after: 20 }));
add(P([{ t: '표시 방법: 사진 = ☒ 상자,  문자 = 가로줄(═),  벡터 도형 = 실제 모양,  안쪽 점선 = 가장자리 10mm 여백선', s: 17, c: '444444' }], { after: 80 }));
// inner box simulating 10mm margin
const dot = { style: L.BorderStyle.DASHED, size: 4, color: '999999' };
const none = { style: L.BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const sketchW = 6300, sketchH = Math.round(6300 * 297 / 210);
const inner = T([sketchW - 900], [{ h: sketchH - 1100, exact: true, cells: [C('', { w: sketchW - 900, borders: { top: dot, bottom: dot, left: dot, right: dot } })] }], { align: CT });
const thumbs = T([1700, 1706], [
  { h: 2400, exact: true, cells: [C('', { w: 1700 }), C('', { w: 1706 })] },
  [C('아이디어 A', { w: 1700, align: CT, size: 16 }), C('아이디어 B', { w: 1706, align: CT, size: 16 })],
]);
add(T([sketchW, W - sketchW], [{ h: sketchH, exact: true, cells: [
  C([P('', { after: 300 }), inner], { w: sketchW, v: V.TOP, mt: 0 }),
  C([P([{ t: '아이디어 스케치 (작게 2가지)', b: true, s: 18 }], { after: 40 }), thumbs, P('', { after: 60 }),
    P([{ t: '배치 의도', b: true, s: 18 }], { after: 20 }),
    P([{ t: '가장 먼저 보이게 할 요소와 시선의 흐름', s: 17 }], { after: 0 }), ...lines(3),
    P([{ t: '시각적 균형을 잡는 방법 (대칭·비대칭 등)', s: 17 }], { before: 80, after: 0 }), ...lines(3),
    P([{ t: '여백을 활용하는 방법', s: 17 }], { before: 80, after: 0 }), ...lines(2),
  ], { w: W - sketchW, v: V.TOP }),
] }]));

// ---------- 5쪽: 색상 및 문자 ④ ----------
add(P([{ t: '④ 색상 및 문자 표현 계획', b: true, s: 21 }], { pageBreak: true, after: 60 }));
add(P([{ t: '가. 색상 계획', b: true }], { after: 40 }));
const cw = [1400, 1300, 1500, 2600, 3406];
add(T(cw, [
  { header: true, cells: ['구분', '색칠하기', '색 이름', '사용할 곳', '선택한 이유'].map((t, i) => C(t, { w: cw[i], fill: BLUE, align: CT, bold: true })) },
  ...['주조색', '보조색', '강조색'].map(k => ({ h: 1000, cells: [C(k, { w: cw[0], fill: PALE, align: CT, bold: true }), C('', { w: cw[1] }), C('', { w: cw[2] }), C('', { w: cw[3] }), C('', { w: cw[4] })] })),
]));
add(gap(140));
add(P([{ t: '나. 문자 표현 계획', b: true }], { after: 40 }));
const tw = [1900, 3606, 2400, 2300];
add(T(tw, [
  { header: true, cells: ['구분', '들어갈 문구', '서체 느낌·굵기·색', '크기 순위·위치'].map((t, i) => C(t, { w: tw[i], fill: BLUE, align: CT, bold: true })) },
  ...['제목\n(학교명·학과명)', '홍보 슬로건\n(20자 이내)', '키워드\n(3개 이상)', '입학 문의 정보'].map(k => ({ h: 1050, cells: [
    C(k.split('\n').map((s, i) => P(s, { after: 0, bold: i === 0, size: i ? 16 : undefined, align: CT })), { w: tw[0], fill: PALE }),
    C('', { w: tw[1] }), C('', { w: tw[2] }), C('', { w: tw[3] })] })),
]));
add(gap(140));
add(P([{ t: '다. 가독성 계획', b: true }], { after: 20 }));
add(P('사진 위에 놓이는 문자를 잘 읽히게 하는 방법 (배경과의 명도 대비, 문자 배경 상자, 그림자 등)', { after: 0 }));
add(...lines(4));

// ---------- 6쪽: 점검·수정 기록, 제출 ----------
add(H('7. 점검·수정 기록 (3차시)', { pageBreak: true, before: 0 }));
add(P('중간 저장 파일을 열어 [화면 크기에 맞추기](Ctrl+0)와 [100%] 보기로 확인하고, 각 항목에서 발견한 문제와 실제로 수정한 내용을 적으세요.', { after: 80 }));
const kw = [1300, 3000, 2900, 3006];
const kr = (k, q) => ({ h: 1050, cells: [C(k, { w: kw[0], fill: PALE, align: CT, bold: true }), C(q, { w: kw[1], size: 17 }), C('', { w: kw[2] }), C('', { w: kw[3] })] });
add(T(kw, [
  { header: true, cells: ['점검 항목', '점검 질문', '발견한 문제', '실제로 수정한 내용 (사용한 기능 포함)'].map((t, i) => C(t, { w: kw[i], fill: BLUE, align: CT, bold: true })) },
  kr('화면 구성', '제목·사진·문자의 크기 차이로 중요한 내용이 먼저 눈에 들어오는가?'),
  kr('색상', '주조색·보조색·강조색이 어울리고, 사진들의 색감이 통일되어 있는가?'),
  kr('배치', '요소 사이의 간격과 정렬이 정돈되어 있고, 중요한 요소가 가장자리 10mm 안쪽에 있는가?'),
  kr('가독성', '배경 위의 문자가 잘 읽히고, 필수 포함 문구 4가지가 모두 들어 있는가?'),
  kr('시각적 균형', '화면의 한쪽이 지나치게 무겁거나 비어 보이지 않는가?'),
]));
add(P([{ t: '제작 계획과 달라진 점과 그 이유', b: true }], { before: 100, after: 0 }));
add(...lines(2));

add(H('8. 제출 안내'));
const fw = [2300, 3900, 2006, 2000];
add(T(fw, [
  { header: true, cells: ['제출물', '파일명 (예: 1학년 3반 5번 홍길동 → 10305)', '형식', '제출 시기'].map((t, i) => C(t, { w: fw[i], fill: BLUE, align: CT, bold: true })) },
  [C('중간 저장 파일', { w: fw[0] }), C('10305_홍길동_중간.psd', { w: fw[1] }), C('PSD', { w: fw[2], align: CT }), C('2차시 종료 시', { w: fw[3], align: CT })],
  [C('편집 가능한 원본 파일', { w: fw[0] }), C('10305_홍길동_학과포스터.psd', { w: fw[1] }), C('PSD (레이어 유지)', { w: fw[2], align: CT }), C('3차시 종료 시', { w: fw[3], align: CT })],
  [C('최종 이미지', { w: fw[0] }), C('10305_홍길동_학과포스터.jpg', { w: fw[1] }), C('JPG (품질: 최고)', { w: fw[2], align: CT }), C('3차시 종료 시', { w: fw[3], align: CT })],
  [C('시험지 (계획서·기록)', { w: fw[0] }), C('이 시험지 전체', { w: fw[1] }), C('종이', { w: fw[2], align: CT }), C('3차시 종료 시', { w: fw[3], align: CT })],
]));
add(P([{ t: '제출 방법: ', b: true }, '파일은 선생님이 안내한 제출 폴더 ( ______________________________ )에 저장하고, 시험지는 선생님께 직접 냅니다.'], { before: 60, after: 20 }));
add(P([{ t: 'JPG 저장: ', b: true }, '[파일] → [사본 저장] → 형식 JPEG 선택 → 품질 12(최고)'], { after: 80 }));
add(T([5103, 5103], [[
  C([P([{ t: '제출 전 확인', b: true }], { after: 20 }),
    P('☐ 파일명이 규칙에 맞는가?', { after: 0 }), P('☐ PSD에 레이어가 병합되지 않고 남아 있는가?', { after: 0 }),
    P('☐ JPG를 따로 저장했는가?', { after: 0 }), P('☐ 시험지의 모든 칸을 작성했는가?', { after: 0 })], { w: 5103, v: V.TOP }),
  C([P([{ t: 'AI 미사용 확인', b: true }], { after: 20 }),
    P('나는 이 평가의 모든 과정에서 AI를 활용하지 않고 스스로 수행하였습니다.', { after: 120 }),
    P('학생 이름 :                         (서명)', { after: 0 })], { w: 5103, v: V.TOP, fill: 'FFF4F4' }),
]]));

const doc = new d.Document({
  styles: L.styles, numbering: L.numbering,
  sections: [{ properties: L.pageProps(), headers: { default: L.header('1학년   반   번  이름 :              ') }, footers: { default: L.footer('컴퓨터그래픽 수행평가 · 학생용') }, children: body }],
});
d.Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log('ok'); });
