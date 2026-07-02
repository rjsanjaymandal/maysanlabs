import pptxgen from "pptxgenjs";

const PALETTE = {
  NAVY: "162447",
  TEAL: "1F6B75",
  LTEAL: "E6F4F5",
  GREEN: "065F46",
  LGREEN: "ECFDF5",
  AMBER: "92400E",
  LAMBER: "FFFBEB",
  WHITE: "FFFFFF",
  LGRAY: "F3F4F6",
  DGRAY: "1F2937",
  BORDER: "D1D5DB",
};

const SLIDE_W = 13.333;
const CONTENT_W = 12.333;
const CONTENT_X = 0.5;
const HEADER_H = 1.1;
const FOOTER_Y = 7.0;
const CONTENT_TOP = 1.3;
const CONTENT_BOTTOM = 6.7;

export interface KPIMetric { label: string; value: string }
export interface FeatureColumn { heading: string; bodyPoints: string[]; tinted?: boolean }
export interface MatrixRow { rows: string[][]; colWidths?: number[] }

export interface KPIGridSlide { type: "kpi_grid"; title: string; subtitle: string; metrics: KPIMetric[]; callout?: string }
export interface FeatureColumnsSlide { type: "feature_columns"; title: string; subtitle: string; columns: FeatureColumn[]; callout?: string }
export interface DataMatrixSlide { type: "data_matrix"; title: string; subtitle: string; matrixTable: MatrixRow; callout?: string }

export type AdvancedSlide = KPIGridSlide | FeatureColumnsSlide | DataMatrixSlide;
export interface AdvancedDeck { deckTitle: string; slides: AdvancedSlide[] }

function addChrome(pptx: pptxgen, slide: pptxgen.Slide, title: string, subtitle: string, pageNum: number, totalPages: number) {
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: "100%", h: HEADER_H, fill: { color: PALETTE.NAVY } });
  slide.addText(title, { x: CONTENT_X, y: 0.15, w: 10, h: 0.4, fontSize: 20, bold: true, color: PALETTE.WHITE, fontFace: "Arial", shrinkText: true });
  slide.addText(subtitle, { x: CONTENT_X, y: 0.6, w: 10, h: 0.3, fontSize: 10, color: "A5D8DD", fontFace: "Arial", shrinkText: true });
  slide.addText(`PAGE ${pageNum} / ${totalPages}`, { x: 11.5, y: 0.35, w: 1.3, h: 0.4, fontSize: 9, bold: true, color: PALETTE.WHITE, fill: { color: PALETTE.TEAL }, align: "center", fontFace: "Arial", rectRadius: 0.1 });
  slide.addShape(pptx.ShapeType.rect, { x: CONTENT_X, y: FOOTER_Y, w: CONTENT_W, h: 0.02, fill: { color: PALETTE.BORDER } });
  slide.addText(`EduMaysan  ·  Maysan Labs      |      business@maysanlabs.com  ·  www.maysanlabs.com      |      Confidential  ·  Page ${pageNum} of ${totalPages}`, { x: CONTENT_X, y: 7.05, w: CONTENT_W, h: 0.3, fontSize: 8.5, color: "6B7280", align: "center", fontFace: "Arial" });
}

function addCallout(pptx: pptxgen, slide: pptxgen.Slide, text: string, y: number) {
  slide.addShape(pptx.ShapeType.rect, { x: CONTENT_X, y, w: 0.06, h: 0.65, fill: { color: PALETTE.GREEN } });
  slide.addText(text, { x: 0.7, y, w: 12.0, h: 0.65, fontSize: 9.5, color: PALETTE.GREEN, fill: { color: PALETTE.LGREEN }, line: { color: "34D399", width: 1 }, inset: 8, fontFace: "Arial", valign: "middle", shrinkText: true });
}

function autoColWidths(rows: string[][]): number[] {
  if (!rows.length) return [];
  const colCount = rows[0].length;
  const maxChars = Array(colCount).fill(0);
  for (const row of rows)
    for (let c = 0; c < Math.min(row.length, colCount); c++)
      maxChars[c] = Math.max(maxChars[c], row[c].length);
  const totalChars = maxChars.reduce((a, b) => a + b, 0);
  if (!totalChars) return Array(colCount).fill(CONTENT_W / colCount);
  const minWidth = 1.0;
  const raw = maxChars.map((c) => Math.max(minWidth, (c / totalChars) * CONTENT_W));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => +((w / sum) * CONTENT_W).toFixed(3));
}

function detectValueColor(val: string): string | undefined {
  const s = val.trim().replace(/[,%$€£]/g, "");
  if (/^[+-]?\d+(\.\d+)?$/.test(s)) {
    const n = parseFloat(s);
    if (n > 0 && s.startsWith("+")) return PALETTE.GREEN;
    if (n < 0) return PALETTE.AMBER;
  }
  if (/^[+↑]\s*\d/.test(val)) return PALETTE.GREEN;
  if (/^[-↓]\s*\d/.test(val)) return PALETTE.AMBER;
  return undefined;
}

function renderKPIGrid(pptx: pptxgen, slide: pptxgen.Slide, slideData: KPIGridSlide) {
  const metrics = slideData.metrics;
  const totalCards = metrics.length;
  const cardsPerRow = totalCards <= 4 ? 2 : totalCards <= 9 ? 3 : 4;
  const cardW = CONTENT_W / cardsPerRow;
  const rows = Math.ceil(totalCards / cardsPerRow);
  const gap = 0.15;
  const availableH = CONTENT_BOTTOM - CONTENT_TOP - 0.3;
  const cardH = Math.min(1.35, (availableH - (rows - 1) * gap) / rows);
  const gridH = rows * cardH + (rows - 1) * gap;
  const startY = Math.max(CONTENT_TOP, CONTENT_TOP + (availableH - gridH) / 2);
  const valueFontSize = totalCards <= 6 ? 24 : totalCards <= 12 ? 18 : 14;
  const labelFontSize = totalCards <= 6 ? 9 : 7;

  metrics.forEach((m, i) => {
    const col = i % cardsPerRow;
    const row = Math.floor(i / cardsPerRow);
    const x = CONTENT_X + col * cardW;
    const y = startY + row * (cardH + gap);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW - gap, h: cardH,
      fill: { color: PALETTE.LGRAY }, line: { color: PALETTE.BORDER, width: 0.5 }, rectRadius: 0.05,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.08, y: y + 0.08, w: cardW - gap - 0.16, h: 0.04, fill: { color: PALETTE.TEAL },
    });
    slide.addText(m.value, {
      x: x + 0.08, y: y + 0.2, w: cardW - gap - 0.16, h: cardH * 0.5,
      fontSize: valueFontSize, bold: true, color: detectValueColor(m.value) || PALETTE.TEAL,
      align: "center", fontFace: "Arial", shrinkText: true, valign: "middle",
    });
    slide.addText(m.label, {
      x: x + 0.08, y: y + 0.2 + cardH * 0.5, w: cardW - gap - 0.16, h: cardH * 0.35,
      fontSize: labelFontSize, color: "6B7280", align: "center", fontFace: "Arial", shrinkText: true, valign: "top",
    });
  });
}

function renderFeatureColumns(pptx: pptxgen, slide: pptxgen.Slide, slideData: FeatureColumnsSlide) {
  const cols = slideData.columns;
  const colW = CONTENT_W / cols.length;
  const colH = CONTENT_BOTTOM - CONTENT_TOP - 0.5;
  const startY = CONTENT_TOP;

  cols.forEach((col, i) => {
    const x = CONTENT_X + i * colW;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: startY, w: colW - 0.1, h: colH,
      fill: { color: col.tinted ? PALETTE.LTEAL : PALETTE.LGRAY }, line: { color: PALETTE.BORDER, width: 0.5 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: startY, w: colW - 0.1, h: 0.04, fill: { color: PALETTE.TEAL },
    });
    slide.addText(col.heading, {
      x: x + 0.12, y: startY + 0.12, w: colW - 0.34, h: 0.35,
      fontSize: 11, bold: true, color: PALETTE.NAVY, fontFace: "Arial", shrinkText: true,
    });
    const points = col.bodyPoints.map((p) => `•  ${p}`).join("\n");
    slide.addText(points, {
      x: x + 0.12, y: startY + 0.5, w: colW - 0.34, h: colH - 0.6,
      fontSize: 8.5, color: PALETTE.DGRAY, fontFace: "Arial",
      lineSpacing: 14, valign: "top", shrinkText: true, wrap: true,
    });
  });
}

function normalizeColWidths(widths: number[], target: number): number[] {
  const sum = widths.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - target) < 0.01) return widths;
  return widths.map((w) => +((w / sum) * target).toFixed(3));
}

function renderDataMatrix(pptx: pptxgen, slide: pptxgen.Slide, slideData: DataMatrixSlide) {
  const rows = slideData.matrixTable.rows;
  if (!rows.length) return;

  const colW = normalizeColWidths(slideData.matrixTable.colWidths || autoColWidths(rows), CONTENT_W);
  const headerCount = 1;
  const dataCount = rows.length - headerCount;
  const rowH = dataCount <= 5 ? 0.50 : dataCount <= 10 ? 0.42 : dataCount <= 20 ? 0.35 : 0.30;
  const totalTableH = rows.length * rowH;
  const tableStartY = CONTENT_TOP;
  const tableEndY = tableStartY + totalTableH;

  let calloutY: number | null = null;
  if (slideData.callout) {
    calloutY = Math.max(tableEndY + 0.3, CONTENT_BOTTOM - 1.0);
    if (calloutY + 0.8 > FOOTER_Y) calloutY = FOOTER_Y - 0.9;
  }

  const formattedRows = rows.map((row, rIdx) => {
    const isHeader = rIdx === 0;
    return row.map((cell, cIdx) => {
      const colorOverride = isHeader ? undefined : detectValueColor(cell);
      const fill = isHeader ? PALETTE.NAVY : cIdx === 0 ? PALETTE.LTEAL : rIdx % 2 === 0 ? PALETTE.LGRAY : PALETTE.WHITE;
      const color = isHeader ? PALETTE.WHITE : colorOverride || (cIdx === 0 ? PALETTE.TEAL : PALETTE.DGRAY);
      return {
        text: cell,
        options: {
          fill: { color: fill },
          color,
          bold: isHeader || cIdx === 0,
          align: (isHeader || cIdx === 0 || /^[$€£\d%]/.test(cell) ? "center" : "left") as "left" | "center",
          fontSize: isHeader ? 9 : 8.5,
          fontFace: "Arial",
          margin: [2, 4, 2, 4] as [number, number, number, number],
          shrinkText: true,
          valign: "middle" as "middle",
        },
      };
    });
  });

  const maxTableH = calloutY ? calloutY - tableStartY - 0.3 : CONTENT_BOTTOM - tableStartY;

  slide.addTable(formattedRows, {
    x: CONTENT_X, y: tableStartY, w: CONTENT_W,
    colW: colW, rowH: rowH,
    border: { type: "solid", color: PALETTE.BORDER, pt: 0.3 },
    fontSize: 8.5, fontFace: "Arial",
    h: Math.min(totalTableH, maxTableH),
    valign: "middle",
    autoPage: false,
  });

  if (slideData.callout && calloutY !== null) addCallout(pptx, slide, slideData.callout, calloutY);
}

export async function compileAdvancedPresentation(deckData: AdvancedDeck): Promise<Blob> {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Maysan Labs";
  pptx.company = "Maysan Labs";
  pptx.subject = "Generated by Maysan Labs Presentation Engine";
  pptx.title = deckData.deckTitle;

  const total = deckData.slides.length;

  for (let i = 0; i < total; i++) {
    const sd = deckData.slides[i];
    const slide = pptx.addSlide();
    addChrome(pptx, slide, sd.title, sd.subtitle, i + 1, total);

    if (sd.type === "kpi_grid") renderKPIGrid(pptx, slide, sd);
    else if (sd.type === "feature_columns") renderFeatureColumns(pptx, slide, sd);
    else if (sd.type === "data_matrix") renderDataMatrix(pptx, slide, sd);
  }

  return (await pptx.write({ outputType: "blob" })) as Blob;
}
