// Dışa aktarma (v0.6.0): Vibe çıktıları ve odak/rapor metinleri → Juris antetli Word (.docx) ve Excel (.xlsx).
// Girdi Markdown'dır (Vibe yanıtları Markdown üretir); başlık, paragraf, madde/numaralı liste, tablo, ayraç ve **kalın** / *italik* / `kod` desteklenir.
import {
  AlignmentType, BorderStyle, Document, Footer, Header, HeadingLevel, LevelFormat, Packer, PageNumber, Paragraph, ShadingType,
  Table, TableCell, TableRow, TextRun, WidthType,
} from "docx";
import ExcelJS from "exceljs";
import type { FastifyInstance } from "fastify";
import { z } from "zod";

const NAVY = "0A2240", RED = "BC2F2C", INK2 = "4A5568", PAPER = "F3F2EE";
const F_BODY = "Inter", F_HEAD = "Playfair Display";

export type Block =
  | { t: "h"; level: number; text: string } | { t: "p"; text: string } | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; rows: string[][] } | { t: "hr" } | { t: "quote"; text: string };

/** Basit Markdown ayrıştırıcı — Vibe çıktılarının kullandığı alt küme */
export function parseMd(md: string): Block[] {
  const lines = String(md ?? "").replace(/\r\n?/g, "\n").split("\n");
  const out: Block[] = []; let para: string[] = [];
  const flush = () => { if (para.length) { out.push({ t: "p", text: para.join(" ").trim() }); para = []; } };
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]!; const s = l.trim();
    if (!s) { flush(); continue; }
    let m: RegExpMatchArray | null;
    if ((m = s.match(/^(#{1,4})\s+(.*)$/))) { flush(); out.push({ t: "h", level: m[1]!.length, text: m[2]!.replace(/#+\s*$/, "").trim() }); continue; }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(s)) { flush(); out.push({ t: "hr" }); continue; }
    if (s.startsWith("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1]!)) {
      flush(); const rows: string[][] = [];
      const cells = (x: string) => x.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      rows.push(cells(s)); i++;
      while (i + 1 < lines.length && lines[i + 1]!.trim().startsWith("|")) { i++; rows.push(cells(lines[i]!)); }
      out.push({ t: "table", rows }); continue;
    }
    if ((m = s.match(/^[-*•]\s+(.*)$/))) { flush(); const items = [m[1]!]; while (i + 1 < lines.length && /^\s*[-*•]\s+/.test(lines[i + 1]!)) { i++; items.push(lines[i]!.trim().replace(/^[-*•]\s+/, "")); } out.push({ t: "ul", items }); continue; }
    if ((m = s.match(/^\d+[.)]\s+(.*)$/))) { flush(); const items = [m[1]!]; while (i + 1 < lines.length && /^\s*\d+[.)]\s+/.test(lines[i + 1]!)) { i++; items.push(lines[i]!.trim().replace(/^\d+[.)]\s+/, "")); } out.push({ t: "ol", items }); continue; }
    if ((m = s.match(/^>\s?(.*)$/))) { flush(); out.push({ t: "quote", text: m[1]! }); continue; }
    para.push(s);
  }
  flush();
  return out;
}

/** **kalın**, *italik*, `kod` → parçalar */
export function inline(text: string): { text: string; bold?: boolean; italics?: boolean; code?: boolean }[] {
  const parts: { text: string; bold?: boolean; italics?: boolean; code?: boolean }[] = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`)/g; let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    const t = m[0];
    if (t.startsWith("**") || t.startsWith("__")) parts.push({ text: t.slice(2, -2), bold: true });
    else if (t.startsWith("`")) parts.push({ text: t.slice(1, -1), code: true });
    else parts.push({ text: t.slice(1, -1), italics: true });
    last = m.index + t.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts.length ? parts : [{ text }];
}
const plain = (t: string) => inline(t).map((p) => p.text).join("");
const runs = (t: string, o: { size?: number; color?: string; bold?: boolean } = {}) =>
  inline(t).map((p) => new TextRun({ text: p.text, bold: p.bold || o.bold, italics: p.italics, font: p.code ? "JetBrains Mono" : F_BODY, size: o.size ?? 21, color: o.color ?? "1F2937" }));

export interface ExportMeta { kapsam?: string; tarih?: string; hazirlayan?: string; kaynak?: string }

export async function toDocx(title: string, md: string, meta: ExportMeta = {}): Promise<Buffer> {
  const blocks = parseMd(md);
  const body: (Paragraph | Table)[] = [];
  body.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: title, font: F_HEAD, size: 40, color: NAVY })] }));
  const metaLine = [meta.kapsam, meta.tarih ?? new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }), meta.hazirlayan].filter(Boolean).join("  ·  ");
  body.push(new Paragraph({ spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 6 } }, children: [new TextRun({ text: metaLine, font: F_BODY, size: 18, color: INK2 })] }));
  for (const b of blocks) {
    if (b.t === "h") body.push(new Paragraph({ heading: b.level <= 1 ? HeadingLevel.HEADING_1 : b.level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3, spacing: { before: 240, after: 80 },
      children: [new TextRun({ text: plain(b.text), font: b.level <= 2 ? F_HEAD : F_BODY, size: b.level <= 1 ? 32 : b.level === 2 ? 27 : 23, bold: b.level >= 3, color: b.level >= 3 ? RED : NAVY })] }));
    else if (b.t === "p") body.push(new Paragraph({ spacing: { after: 120, line: 300 }, children: runs(b.text) }));
    else if (b.t === "quote") body.push(new Paragraph({ spacing: { after: 120 }, indent: { left: 360 }, border: { left: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } }, children: runs(b.text, { color: INK2 }) }));
    else if (b.t === "hr") body.push(new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB", space: 4 } }, children: [] }));
    else if (b.t === "ul" || b.t === "ol") b.items.forEach((it) => body.push(new Paragraph({ numbering: { reference: b.t === "ul" ? "madde" : "sira", level: 0 }, spacing: { after: 60 }, children: runs(it) })));
    else if (b.t === "table") {
      const cols = Math.max(...b.rows.map((r) => r.length));
      body.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE },
        rows: b.rows.map((r, ri) => new TableRow({ tableHeader: ri === 0, children: Array.from({ length: cols }, (_, ci) => new TableCell({
          shading: ri === 0 ? { type: ShadingType.CLEAR, fill: NAVY, color: "auto" } : ri % 2 === 0 ? { type: ShadingType.CLEAR, fill: PAPER, color: "auto" } : undefined,
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
          children: [new Paragraph({ children: runs(r[ci] ?? "", ri === 0 ? { color: "FFFFFF", bold: true, size: 19 } : { size: 19 }) })],
        })) })) }));
      body.push(new Paragraph({ spacing: { after: 120 }, children: [] }));
    }
  }
  const doc = new Document({
    creator: "Juris Avukatlık Ortaklığı · VIBE Management", title, description: meta.kaynak ?? "Vibe Management çıktısı",
    numbering: { config: [
      { reference: "madde", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 240 } } } }] },
      { reference: "sira", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 300 } } } }] },
    ] },
    sections: [{
      properties: { page: { margin: { top: 1300, bottom: 1100, left: 1200, right: 1200 } } },
      headers: { default: new Header({ children: [new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 6 } }, children: [
        new TextRun({ text: "JURİS", font: F_HEAD, size: 30, bold: true, color: RED }),
        new TextRun({ text: "   AVUKATLIK ORTAKLIĞI", font: F_BODY, size: 16, color: NAVY, bold: true }),
        new TextRun({ text: "  ·  Şirketler Hukuku ve Kurumsal Yönetim", font: F_BODY, size: 16, color: INK2 }),
      ] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
        new TextRun({ text: `${title}  ·  Gizli – yalnız muhatabına  ·  Sayfa `, font: F_BODY, size: 15, color: INK2 }),
        new TextRun({ children: [PageNumber.CURRENT], font: F_BODY, size: 15, color: INK2 }), new TextRun({ text: " / ", font: F_BODY, size: 15, color: INK2 }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: F_BODY, size: 15, color: INK2 }),
      ] })] }) },
      children: body,
    }],
  });
  return Packer.toBuffer(doc);
}

/** "1.234.567,89 ₺" / "%45" / "$10.000" → sayı (yoksa metin) */
export function cellValue(s: string): string | number {
  const t = plain(s).trim(); const pct = /^%\s?-?[\d.,]+$|^-?[\d.,]+\s?%$/.test(t);
  const n = t.replace(/[%₺$€\s]|TL|USD|EUR/gi, "");
  if (!/^-?[\d.,]+$/.test(n) || !/\d/.test(n)) return t;
  const norm = /,\d{1,2}$/.test(n) || (n.includes(".") && n.includes(",")) ? n.replace(/\./g, "").replace(",", ".") : /^\d{1,3}(\.\d{3})+$/.test(n) ? n.replace(/\./g, "") : n.replace(",", ".");
  const v = Number(norm); if (!isFinite(v)) return t;
  return pct ? v / 100 : v;
}

export async function toXlsx(title: string, md: string, meta: ExportMeta = {}): Promise<Buffer> {
  const blocks = parseMd(md); const wb = new ExcelJS.Workbook(); wb.creator = "Juris · VIBE Management"; wb.title = title;
  const head = (ws: ExcelJS.Worksheet, sub: string) => {
    ws.mergeCells("A1:F1"); ws.getCell("A1").value = "JURİS · Avukatlık Ortaklığı — Şirketler Hukuku ve Kurumsal Yönetim";
    ws.getCell("A1").font = { name: F_BODY, bold: true, color: { argb: "FF" + RED }, size: 10 };
    ws.mergeCells("A2:F2"); ws.getCell("A2").value = title; ws.getCell("A2").font = { name: F_HEAD, size: 16, color: { argb: "FF" + NAVY } };
    ws.mergeCells("A3:F3"); ws.getCell("A3").value = [sub, meta.kapsam, meta.tarih ?? new Date().toLocaleDateString("tr-TR"), meta.hazirlayan].filter(Boolean).join("  ·  ");
    ws.getCell("A3").font = { name: F_BODY, size: 9, color: { argb: "FF" + INK2 } };
    ws.getRow(3).border = { bottom: { style: "medium", color: { argb: "FF" + RED } } };
  };
  // Özet: tablo dışındaki metin
  const ozet = wb.addWorksheet("Özet", { views: [{ showGridLines: false }] }); head(ozet, "Özet"); ozet.getColumn(1).width = 110; let r = 5;
  const tables: string[][][] = [];
  for (const b of blocks) {
    if (b.t === "table") { tables.push(b.rows); ozet.getCell(r, 1).value = `→ Tablo ${tables.length} ayrı sayfada`; ozet.getCell(r, 1).font = { name: F_BODY, italic: true, color: { argb: "FF" + INK2 } }; r++; continue; }
    if (b.t === "hr") { r++; continue; }
    const lines = "items" in b ? b.items.map((x, i) => (b.t === "ul" ? "•  " : `${i + 1}.  `) + plain(x)) : [plain(b.text)];
    for (const l of lines) {
      const c = ozet.getCell(r, 1); c.value = l; c.alignment = { wrapText: true, vertical: "top" };
      c.font = b.t === "h" ? { name: b.level <= 2 ? F_HEAD : F_BODY, size: b.level <= 1 ? 14 : 12, bold: b.level >= 3, color: { argb: "FF" + (b.level >= 3 ? RED : NAVY) } } : { name: F_BODY, size: 10 };
      r++;
    }
    if (b.t === "h") continue; r++;
  }
  tables.forEach((rows, ti) => {
    const ws = wb.addWorksheet(`Tablo ${ti + 1}`, { views: [{ state: "frozen", ySplit: 5 }] }); head(ws, `Tablo ${ti + 1}`);
    const cols = Math.max(...rows.map((x) => x.length));
    rows.forEach((row, ri) => {
      const xr = ws.getRow(5 + ri);
      for (let ci = 0; ci < cols; ci++) {
        const c = xr.getCell(ci + 1); const raw = row[ci] ?? "";
        c.value = ri === 0 ? plain(raw) : cellValue(raw);
        if (ri > 0 && typeof c.value === "number" && /%/.test(raw)) c.numFmt = "0.0%";
        else if (ri > 0 && typeof c.value === "number") c.numFmt = "#,##0.##";
        c.font = ri === 0 ? { name: F_BODY, bold: true, color: { argb: "FFFFFFFF" }, size: 10 } : { name: F_BODY, size: 10 };
        if (ri === 0) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + NAVY } };
        else if (ri % 2 === 0) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + PAPER } };
        c.border = { bottom: { style: "thin", color: { argb: "FFD1D5DB" } } }; c.alignment = { wrapText: true, vertical: "top" };
      }
    });
    for (let ci = 0; ci < cols; ci++) ws.getColumn(ci + 1).width = Math.min(60, Math.max(10, ...rows.map((x) => plain(x[ci] ?? "").length + 2)));
    ws.autoFilter = { from: { row: 5, column: 1 }, to: { row: 5, column: cols } };
  });
  return Buffer.from(await wb.xlsx.writeBuffer());
}

const Body = z.object({
  format: z.enum(["docx", "xlsx"]), title: z.string().trim().min(1).max(160), md: z.string().max(600_000),
  meta: z.object({ kapsam: z.string().max(120).optional(), tarih: z.string().max(40).optional(), hazirlayan: z.string().max(120).optional(), kaynak: z.string().max(200).optional() }).optional(),
});
const fileName = (t: string, ext: string) => (t.replace(/[^\p{L}\p{N}\s\-_.]/gu, "").replace(/\s+/g, "-").slice(0, 80) || "juris-cikti") + "." + ext;

export function registerExport(app: FastifyInstance) {
  app.post("/api/export", async (req, reply) => {
    const b = Body.parse(req.body);
    const buf = b.format === "docx" ? await toDocx(b.title, b.md, b.meta) : await toXlsx(b.title, b.md, b.meta);
    const type = b.format === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const name = fileName(b.title, b.format);
    return reply.header("content-type", type).header("content-disposition", `attachment; filename="${encodeURIComponent(name).replace(/%20/g, "-")}"; filename*=UTF-8''${encodeURIComponent(name)}`).send(buf);
  });
}
