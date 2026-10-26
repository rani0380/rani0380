// 콘셉트 기획서·스토리보드 작성 예시 (예시 작품: 소프트웨어과 소개 발표 자료)
const fs = require('fs');
const L = require('./lib');
const { d, P, B, H, C, T, gap, W, GRAY, BLUE, PALE, AlignmentType: A, VerticalAlign: V } = L;
const CT = A.CENTER;
const IMG = process.argv[2];
const INK = '1F3FA0'; // 학생이 쓴 내용

const body = [];
const add = (...x) => body.push(...x);
const HD = (ws, ts) => ({ header: true, cells: ts.map((t, i) => C(t, { w: ws[i], fill: BLUE, align: CT, bold: true })) });
// 학생 답안: 문자열 배열 → 줄별 문단
const ans = (lines, o = {}) => (Array.isArray(lines) ? lines : [lines]).map(t => P([{ t, c: INK, s: o.size || 19 }], { after: 20, align: o.align }));
const img = (name, w, h) => new d.Paragraph({ alignment: CT, spacing: { after: 0, line: 240, lineRule: d.LineRuleType.AUTO },
  children: [new d.ImageRun({ type: 'png', data: fs.readFileSync(`${IMG}/${name}.png`), transformation: { width: w, height: h } })] });

add(P([{ t: '작성 예시 · 교사용 참고 자료', s: 18, c: 'B00020', b: true }], { align: CT, after: 20 }));
add(P([{ t: '콘셉트 기획서와 스토리보드 작성 예시', b: true, s: 32 }], { align: CT, after: 40 }));
add(P([{ t: '― 예시 작품: 대구스마트고등학교 소프트웨어과 소개 발표 자료 (7장) ―', s: 20, c: '2F4B7C', b: true }], { align: CT, after: 120 }));
add(T([W], [[C([
  P([{ t: '이 자료의 쓰임', b: true }], { after: 20 }),
  B('학생용 시험지 「6. 콘셉트 기획서」의 ①~④를 예시 작품 기준으로 채운 것입니다. 파란 글씨가 학생이 쓰는 부분입니다.', { after: 0 }),
  B('학생에게 보여 줄 때는 작성 수준과 방법을 안내하는 용도로만 쓰고, 문장을 그대로 옮겨 쓰지 않도록 지도합니다.', { after: 0 }),
  B('채점 기준표의 점수 단계와 연결된 모범 답안이 아니며, 별도의 채점 기준으로 사용하지 않습니다.', { after: 0 }),
], { w: W, fill: PALE, mt: 100, mb: 100 })]]));

// ① 목적·대상 분석
add(H('① 제작 목적과 대상 분석'));
const qa = (q, a, hint) => [C(q, { w: 2900, fill: PALE, bold: true }), C(ans(a), { w: 7306, v: V.TOP })];
add(T([2900, 7306], [
  qa('대상(중학생·학부모)의 특징과 그들이 우리 학과에 대해 궁금해할 내용',
    ['· 중3 학생: 고등학교 생활이 궁금하고, 긴 글보다 그림·캐릭터에 먼저 눈이 간다. → "무엇을 배우나?", "어렵지 않을까?"',
     '· 학부모: 졸업 후 결과를 중요하게 본다. → "자격증은?", "취업·진학은?", "몇 명 뽑나?"']),
  qa('발표 자료로 전달할 핵심 메시지 (한 문장)',
    ['소프트웨어과에서는 내 아이디어를 코드로 현실로 만들고, 취업과 진학을 모두 준비할 수 있다.']),
  qa('사용 환경(강당 프로젝터 화면)의 특징과 제작할 때 고려할 점',
    ['· 멀리서 보고 색이 연하게 보인다. → 제목을 크게, 짙은 네이비 배경에 흰색·노란색 글자로 명도 차이를 크게 둔다.',
     '· 한 장을 짧게 보고 넘긴다. → 한 장에 한 가지 내용만, 문장 대신 키워드와 아이콘으로 보여 준다.']),
]));

// ② 콘셉트·비주얼 방향
add(H('② 디자인 콘셉트와 비주얼 방향'));
add(T([2900, 7306], [
  qa('콘셉트 키워드 3개', ['1) 친근함          2) 스마트          3) 코드']),
  qa('디자인 콘셉트 (한 문장)', ['"스마영이 안내하는, 친근하고 스마트한 코드의 세계" 느낌의 학과 소개']),
  qa('비주얼 방향: 전체 분위기와 표현 스타일',
    ['· 학교 캐릭터 스마영의 공식 색상(교복 네이비 + 부리 노랑)을 그대로 쓴 밝고 깔끔한 분위기',
     '· 둥근 모서리 카드와 둥근 서체로 친근함, 단순한 단색 도형 아이콘으로 스마트함을 표현',
     '· 모든 제목 앞에 코드 괄호 </>를 반복하여 소프트웨어과임을 바로 알 수 있게 함']),
  qa('콘셉트와 비주얼 방향이 제작 목적·대상에 맞는 이유',
    ['· 중학생에게 익숙한 캐릭터와 둥근 형태가 "어렵다"는 느낌을 줄여 준다.',
     '· 학교 공식 색상을 쓰면 학교 홍보물과 통일되어 학부모에게 신뢰감을 준다.',
     '· </> 모티프가 "코드를 배우는 학과"라는 핵심 메시지를 말 없이 전달한다.']),
]));

// ③ 디자인 요소 계획
add(P([{ t: '③ 주요 디자인 요소 계획', b: true, s: 22 }], { pageBreak: true, after: 60 }));
add(P([{ t: '가. 이미지', b: true }], { after: 40 }));
add(T([2900, 7306], [
  qa('사용할 사진과 넣을 슬라이드',
    ['· 스마영 정면(1번), 엄지척 스마영(2·7번), 학교 건물 사진(2번), 실습 사진(3번), 엠블럼(모든 장)']),
  qa('콘셉트에 맞게 사진을 표현하는 방법',
    ['· 건물 사진은 가로로 넓게 잘라 하늘과 건물이 시원하게 보이게 하고, 네이비 테두리로 통일한다.',
     '· 스마영은 노란 원 위에 올려 시선이 모이게 하고, 엠블럼은 흰 둥근 카드에 넣어 어느 배경에서도 보이게 한다.']),
]));
add(gap(100));
add(P([{ t: '나. 색상', b: true }], { after: 40 }));
const cw = [1300, 1300, 1900, 2700, 3006];
const sw = (hex) => C('', { w: cw[1], fill: hex });
add(T(cw, [
  HD(cw, ['구분', '색칠하기', '색 이름', '사용할 곳', '콘셉트와의 관계']),
  { h: 760, cells: [C('주조색', { w: cw[0], fill: PALE, align: CT, bold: true }), sw('0F2A4D'), C(ans(['교복색', '#0F2A4D'], { size: 17 }), { w: cw[2] }),
    C(ans('표지·마무리 배경, 제목·본문 글자, 아이콘 도형', { size: 17 }), { w: cw[3] }), C(ans('학교 교복색으로 신뢰감, 프로젝터에서 대비가 큼', { size: 17 }), { w: cw[4] })] },
  { h: 760, cells: [C('보조색', { w: cw[0], fill: PALE, align: CT, bold: true }), sw('7AB848'), C(ans(['스마영 몸색', '#7AB848'], { size: 17 }), { w: cw[2] }),
    C(ans('캐릭터 라벨, 진학 카드, 강조 숫자', { size: 17 }), { w: cw[3] }), C(ans('캐릭터와 연결되어 친근함, 성장의 느낌', { size: 17 }), { w: cw[4] })] },
  { h: 760, cells: [C('강조색', { w: cw[0], fill: PALE, align: CT, bold: true }), sw('FFC20E'), C(ans(['부리색', '#FFC20E'], { size: 17 }), { w: cw[2] }),
    C(ans('아이콘 원, </> 기호, 페이지 번호, 핵심 단어', { size: 17 }), { w: cw[3] }), C(ans('네이비 위에서 가장 눈에 띄는 밝은 색', { size: 17 }), { w: cw[4] })] },
]));
add(P([{ t: '※ 배경은 얼굴색 #FFFDF7을 사용하여 흰색보다 부드럽게 표현', s: 16, c: INK }], { before: 30 }));
add(gap(100));
add(P([{ t: '다. 서체', b: true }], { after: 40 }));
const tw = [1500, 3000, 1900, 3806];
add(T(tw, [
  HD(tw, ['구분', '서체 느낌·굵기', '크기', '콘셉트와의 관계']),
  [C('제목', { w: tw[0], fill: PALE, align: CT, bold: true }), C(ans('나눔스퀘어라운드 · 굵게 (둥근 획)', { size: 17 }), { w: tw[1] }), C(ans('68 (표지 학과명 176)', { size: 17 }), { w: tw[2] }), C(ans('둥근 획이 친근함을 표현', { size: 17 }), { w: tw[3] })],
  [C('본문', { w: tw[0], fill: PALE, align: CT, bold: true }), C(ans('나눔바른고딕 · 보통', { size: 17 }), { w: tw[1] }), C(ans('32~40', { size: 17 }), { w: tw[2] }), C(ans('반듯하여 멀리서도 읽기 쉬움', { size: 17 }), { w: tw[3] })],
  [C('강조', { w: tw[0], fill: PALE, align: CT, bold: true }), C(ans('나눔고딕코딩 · 굵게 (</> 기호)', { size: 17 }), { w: tw[1] }), C(ans('60', { size: 17 }), { w: tw[2] }), C(ans('코드 화면 느낌으로 "코드" 키워드 표현', { size: 17 }), { w: tw[3] })],
]));
add(P([{ t: '※ 크기는 Canva 프레젠테이션(1920×1080) 기준', s: 16, c: INK }], { before: 30 }));
add(gap(100));
add(P([{ t: '라. 아이콘 (3개 이상)', b: true }], { after: 20 }));
add(P([{ t: '스타일 규칙: ', s: 18 }, { t: '노란 원(#FFC20E) 안에 네이비 단색 도형만 사용 · 모서리는 둥글게 · 선 굵기는 3으로 통일 · 테두리와 그라데이션은 쓰지 않음', s: 18, c: INK }], { after: 40 }));
const iw = [2552, 2551, 2552, 2551];
const icons = [['ic_web', '앱·웹 개발: 브라우저 창 + </>'], ['ic_game', '게임 개발: 게임기 + 십자 버튼'], ['ic_ai', '인공지능: 회로 칩 + AI'], ['ic_data', '빅데이터: 막대그래프']];
add(T(iw, [
  { h: 1900, cells: icons.map(([n], i) => C(img(n, 110, 110), { w: iw[i] })) },
  { cells: icons.map(([, m], i) => C([P([{ t: `아이콘 ${i + 1} 의미:`, s: 16 }], { after: 0 }), ...ans(m, { size: 16 })], { w: iw[i], v: V.TOP })) },
]));
add(P([{ t: '그 밖의 아이콘: 5 자격증 배지, 6 모니터(개발자), 7 네트워크, 8 건물(기업·공기업), 9 학사모(진학) — 같은 규칙으로 제작', s: 16, c: INK }], { before: 30 }));

// ④ 스토리보드
add(P([{ t: '④ 슬라이드 구성 계획 (스토리보드)', b: true, s: 22 }], { pageBreak: true, after: 30 }));
add(P([{ t: '표시 방법: 사진 = ☒ 상자,  문자 = 가로줄(═),  아이콘 = 원(○)에 번호(③-라의 아이콘 번호)', s: 16, c: '444444' }], { after: 50 }));
const notes = [
  '표지: 엠블럼·학교명, 슬로건 "아이디어를 현실로!", 학과명을 가장 크게, 오른쪽에 스마영',
  '학교 소개: 건물 사진 크게, 3개 학과 중 소프트웨어과만 노란색, 스마영 인사 말풍선',
  '교육목표: 왼쪽 실습 사진, 오른쪽 네이비 카드에 교육목표를 큰 글씨로',
  '배우는 분야: 카드 4개(앱·웹, 게임, 인공지능, 빅데이터) + 아이콘 1~4',
  '자격증: 카드 3개(정보처리, 정보기기운용, GTQ·ITQ·네트워크관리사) + 아이콘 5',
  '진로: 취업 카드 3개(아이콘 6~8) + 진학 카드(아이콘 9, 졸업생 진학 사례)',
  '마무리: 모집 인원, 학교설명회 일정 3회, 입학 문의 노란 띠, 엄지척 스마영',
];
const half = W / 2;
const frameCell = (i) => i < 7
  ? C([P([{ t: `슬라이드 ${i + 1}` + (i === 0 ? ' (표지)' : i === 6 ? ' (마무리)' : ''), s: 15, c: '666666' }], { after: 10 }), img(`sb${i + 1}`, 296, 166)], { w: half, v: V.TOP, mt: 30 })
  : C([P([{ t: '슬라이드 8', s: 15, c: '666666' }], { after: 10 }), P([{ t: '7장으로 구성하여 비워 둠', s: 17, c: INK }], { align: CT, before: 700 })], { w: half, v: V.TOP, mt: 30 });
const noteCell = (i) => C([P([{ t: '내용: ', s: 15 }, { t: i < 7 ? notes[i] : '', s: 15, c: INK }], { after: 0 })], { w: half, v: V.TOP, fill: PALE });
const sb = [];
for (let r = 0; r < 4; r++) {
  sb.push({ cells: [frameCell(r * 2), frameCell(r * 2 + 1)] });
  sb.push({ cells: [noteCell(r * 2), noteCell(r * 2 + 1)] });
}
add(T([half, half], sb));
add(P([{ t: '공통 레이아웃(2~6번): 왼쪽 위 </> + 제목, 오른쪽 위 엠블럼, 아래 네이비 띠(학교명·학과명), 오른쪽 아래 노란 원 페이지 번호', s: 16, c: INK }], { before: 40 }));

const doc = new d.Document({
  styles: L.styles, numbering: L.numbering,
  sections: [{ properties: L.pageProps(), headers: { default: L.header('작성 예시 — 콘셉트 기획서·스토리보드') }, footers: { default: L.footer('컴퓨터그래픽 수행평가(Canva 프레젠테이션) · 작성 예시') }, children: body }],
});
d.Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[3], b); console.log('ok'); });
