import type { AdvancedDeck, AdvancedSlide } from "./maysanPptEngine";

export type ParseMode = "json" | "csv" | "markdown" | "kv";

export interface ParseSuccess {
  json: AdvancedDeck;
  mode: ParseMode;
}

function detectDelimiter(lines: string[]): string | null {
  const candidates = [",", "\t", ";", "|"];
  const sample = lines.slice(0, Math.min(5, lines.length)).join("\n");
  let best: string | null = null;
  let bestScore = 0;
  for (const d of candidates) {
    const escaped = d === "\t" ? "\\t" : `\\${d}`;
    const count = (sample.match(new RegExp(escaped, "g")) || []).length;
    if (count > bestScore) {
      bestScore = count;
      best = d;
    }
  }
  return bestScore > 0 ? best : null;
}

function smartColWidths(rows: string[][]): number[] {
  if (rows.length === 0) return [];
  const colCount = rows[0].length;
  const total = 12.333;
  const colMaxChars: number[] = Array(colCount).fill(0);
  for (const row of rows) {
    for (let c = 0; c < Math.min(row.length, colCount); c++) {
      colMaxChars[c] = Math.max(colMaxChars[c], row[c].length);
    }
  }
  const totalChars = colMaxChars.reduce((a, b) => a + b, 0);
  if (totalChars === 0) return Array(colCount).fill(total / colCount);
  const minWidth = 1.0;
  const raw = colMaxChars.map((c) => Math.max(minWidth, (c / totalChars) * total));
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((w) => +((w / sum) * total).toFixed(3));
}

function isNumeric(val: string): boolean {
  return /^[$€£]?\d[\d,.]*\s*[%KkMmBb]?$/.test(val.trim());
}

function inferTitle(headers: string[], firstRow: string[]): string {
  const h = headers.map((h) => h.toLowerCase());
  if (h.includes("metric") || h.includes("kpi")) return "Key Metrics";
  if (h.includes("revenue") || h.includes("sales")) return "Revenue Report";
  if (h.includes("department") || h.includes("team")) return "Department Overview";
  if (h.includes("quarter") || h.includes("q1")) return "Quarterly Breakdown";
  if (h.includes("product") || h.includes("service")) return "Product Overview";
  if (h.includes("name") || h.includes("employee")) return "Roster";
  if (h.includes("status") || h.includes("stage")) return "Pipeline Status";
  return headers.slice(0, 2).join(" & ");
}

function tryParseAdvancedJSON(raw: string): AdvancedDeck | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.slides) && parsed.slides.length > 0) {
      const slides = parsed.slides as AdvancedSlide[];
      if (slides[0]?.type) {
        return { deckTitle: parsed.deckTitle || "Untitled Deck", slides } as AdvancedDeck;
      }
    }
  } catch {
    /* not JSON */
  }
  return null;
}

function splitCSVLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function tryParseCSV(raw: string): ParseSuccess | null {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length < 2) return null;

  const delimiter = detectDelimiter(lines);
  if (!delimiter) return null;

  const headers = splitCSVLine(lines[0], delimiter);
  if (headers.length < 2) return null;

  const dataRows = lines.slice(1).map((l) => splitCSVLine(l, delimiter)).filter((r) => r.length >= 2);
  if (dataRows.length === 0) return null;

  const label = inferTitle(headers, dataRows[0]);
  const allRows = [headers, ...dataRows];
  const colW = smartColWidths(allRows);

  const slide: AdvancedSlide = {
    type: "data_matrix",
    title: label,
    subtitle: `${dataRows.length} records • ${headers.length} fields`,
    matrixTable: { colWidths: colW, rows: [headers, ...dataRows] },
    callout: `Parsed from ${delimiter === "\t" ? "TSV" : delimiter === "|" ? "pipe-delimited" : "CSV"}. ${dataRows.length} rows, ${headers.length} columns.`,
  };

  return { json: { deckTitle: label, slides: [slide] }, mode: "csv" };
}

function tryParseMarkdownTable(raw: string): ParseSuccess | null {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  const tableLines: string[] = [];
  let inTable = false;
  for (const line of lines) {
    if (line.includes("|")) {
      tableLines.push(line);
      inTable = true;
    } else if (inTable) break;
  }

  if (tableLines.length < 2) return null;

  const separatorIdx = tableLines.findIndex((l) => /^\|?\s*:?-{3,}:?\s*(\|?\s*:?-{3,}:?\s*)*\|?$/.test(l));
  if (separatorIdx < 0) return null;

  const parseRow = (line: string): string[] =>
    line.split("|").map((c) => c.trim()).filter((c) => c.length > 0);

  const headers = parseRow(tableLines[0]);
  if (headers.length < 2) return null;

  const dataRows = tableLines.slice(separatorIdx + 1).map(parseRow).filter((r) => r.length >= 2);
  if (dataRows.length === 0) return null;

  const label = inferTitle(headers, dataRows[0] || []);
  const allRows = [headers, ...dataRows];
  const colW = smartColWidths(allRows);

  const slide: AdvancedSlide = {
    type: "data_matrix",
    title: label,
    subtitle: `${dataRows.length} records • ${headers.length} columns`,
    matrixTable: { colWidths: colW, rows: [headers, ...dataRows] },
    callout: `Parsed from markdown table. ${dataRows.length} rows, ${headers.length} columns.`,
  };

  return { json: { deckTitle: label, slides: [slide] }, mode: "markdown" };
}

function tryParseKeyValue(raw: string): ParseSuccess | null {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  const kvPairs: [string, string][] = [];
  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      if (key.length > 0 && value.length > 0) {
        kvPairs.push([key, value]);
      }
    }
  }

  if (kvPairs.length < 1) return null;

  const numericCount = kvPairs.filter(([, v]) => isNumeric(v)).length;
  const mostlyNumeric = numericCount >= kvPairs.length * 0.6;

  if (mostlyNumeric) {
    const slide: AdvancedSlide = {
      type: "kpi_grid",
      title: "Key Metrics",
      subtitle: `${kvPairs.length} performance indicators extracted from input data`,
      metrics: kvPairs.map(([label, value]) => ({ label, value })),
      callout: `Parsed from key:value pairs. ${kvPairs.length} metrics.`,
    };

    return {
      json: { deckTitle: "Key Metrics", slides: [slide] },
      mode: "kv",
    };
  }

  const colW = smartColWidths([["Property", "Value"], ...kvPairs]);

  const slide: AdvancedSlide = {
    type: "data_matrix",
    title: "Properties",
    subtitle: `${kvPairs.length} properties`,
    matrixTable: {
      colWidths: colW,
      rows: [["Property", "Value"], ...kvPairs.map(([k, v]) => [k, v])],
    },
    callout: `Parsed from key:value pairs. ${kvPairs.length} properties found.`,
  };

  return { json: { deckTitle: "Properties", slides: [slide] }, mode: "kv" };
}

export function parseStructuredData(raw: string): ParseSuccess | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const fromJSON = tryParseAdvancedJSON(trimmed);
  if (fromJSON) return { json: fromJSON, mode: "json" };

  const fromCSV = tryParseCSV(trimmed);
  if (fromCSV) return fromCSV;

  const fromMarkdown = tryParseMarkdownTable(trimmed);
  if (fromMarkdown) return fromMarkdown;

  const fromKV = tryParseKeyValue(trimmed);
  if (fromKV) return fromKV;

  return null;
}
