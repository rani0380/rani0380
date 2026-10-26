const d = require('docx');
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle,
  ShadingType, VerticalAlign, HeightRule, PageBreak, Header, Footer, PageNumber, LevelFormat } = d;

const FONT = '맑은 고딕';
const A4 = { width: 11906, height: 16838 };
const MARGIN = 850; // 15mm
const W = A4.width - MARGIN * 2; // 10206
const WL = A4.height - MARGIN * 2; // landscape content width
const LINE = { style: BorderStyle.SINGLE, size: 4, color: '555555' };
const BORDERS = { top: LINE, bottom: LINE, left: LINE, right: LINE };
const GRAY = 'E7E9EE', BLUE = 'DCE6F2', PALE = 'F4F6F9';

function runs(c, base = {}) {
  if (c === undefined || c === null) return [];
  if (!Array.isArray(c)) c = [c];
  return c.map(x => {
    if (x instanceof TextRun) return x;
    if (typeof x === 'string') return new TextRun({ text: x, ...base });
    return new TextRun({ text: x.t, bold: x.b ?? base.bold, color: x.c ?? base.color,
      size: x.s ?? base.size, underline: x.u ? {} : undefined, italics: x.i });
  });
}

function P(c, o = {}) {
  return new Paragraph({
    children: runs(c, { bold: o.bold, size: o.size, color: o.color }),
    alignment: o.align || AlignmentType.LEFT,
    spacing: { before: o.before ?? 0, after: o.after ?? 60, line: o.line },
    indent: o.indent,
    numbering: o.bullet ? { reference: 'bul', level: o.level || 0 } : (o.num ? { reference: o.num, level: 0 } : undefined),
    border: o.border, shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: 'auto' } : undefined,
    keepNext: o.keepNext, pageBreakBefore: o.pageBreak,
  });
}
const B = (c, o = {}) => P(c, { ...o, bullet: true, after: o.after ?? 40 });
const brk = () => new Paragraph({ children: [new PageBreak()] });
const gap = (n = 80) => P('', { after: 0, before: 0, line: n < 240 ? 240 : n, size: 4 });

// Section heading with left bar
function H(t, o = {}) {
  return P([{ t, b: true, s: o.size || 24 }], {
    before: o.before ?? 160, after: 100, keepNext: true, pageBreak: o.pageBreak,
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: '2F4B7C', space: 6 },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: '2F4B7C', space: 2 } },
  });
}

// writing lines
function lines(n, prefix) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(new Paragraph({
      children: runs(prefix && i === 0 ? prefix : '', { color: '666666' }),
      spacing: { before: 0, after: 0, line: 400, lineRule: 'exact' },
      border: { bottom: { style: BorderStyle.DOTTED, size: 4, color: '999999', space: 1 } },
    }));
  }
  return out;
}

function C(content, o = {}) {
  let children;
  if (content === undefined || content === null || content === '') children = [P('', { after: 0 })];
  else if (typeof content === 'string' || (Array.isArray(content) && content.length && !(content[0] instanceof Paragraph) && !(content[0] instanceof Table)))
    children = [P(content, { align: o.align, bold: o.bold, size: o.size, after: 0, color: o.color })];
  else children = Array.isArray(content) ? content : [content];
  return new TableCell({
    children, width: { size: o.w, type: WidthType.DXA },
    columnSpan: o.span, rowSpan: o.rowSpan,
    shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
    verticalAlign: o.v || VerticalAlign.CENTER,
    margins: { top: o.mt ?? 60, bottom: o.mb ?? 60, left: 100, right: 100 },
    borders: o.borders || BORDERS,
  });
}

// rows: array of { cells:[...], h, exact, header } or plain arrays of cells
function T(widths, rows, o = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    alignment: o.align,
    rows: rows.map(r => {
      const cells = Array.isArray(r) ? r : r.cells;
      return new TableRow({
        children: cells, tableHeader: r.header, cantSplit: r.cantSplit ?? true,
        height: r.h ? { value: r.h, rule: r.exact ? HeightRule.EXACT : HeightRule.ATLEAST } : undefined,
      });
    }),
  });
}

const numbering = {
  config: [
    { reference: 'bul', levels: [
      { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 340, hanging: 220 } } } },
      { level: 1, format: LevelFormat.BULLET, text: '-', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 640, hanging: 220 } } } }] },
  ],
};
const styles = {
  default: { document: { run: { font: { ascii: FONT, eastAsia: FONT, hAnsi: FONT, cs: FONT }, size: 19 },
    paragraph: { spacing: { line: 264 } } } },
};

function footer(label) {
  return new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: `${label}  |  `, size: 16, color: '777777' }),
    new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '777777' }),
    new TextRun({ text: ' / ', size: 16, color: '777777' }),
    new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '777777' })] })] });
}
function header(text) {
  return new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
    new TextRun({ text, size: 17, color: '444444' })] })] });
}
const pageProps = (land) => ({ page: {
  size: land ? { width: A4.width, height: A4.height, orientation: d.PageOrientation.LANDSCAPE } : A4,
  margin: { top: MARGIN + 100, bottom: MARGIN, left: MARGIN, right: MARGIN, header: 400, footer: 400 } } });

module.exports = { d, P, B, H, C, T, lines, brk, gap, runs, W, WL, GRAY, BLUE, PALE, numbering, styles, footer, header, pageProps, AlignmentType, VerticalAlign, BorderStyle };
