import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { sendLeadEmails } from "../../../lib/email";

const FILE = path.join(process.cwd(), "data", "leads.xlsx");

// ── Sheet definitions ─────────────────────────────────────────────────────────

const SHEETS = {
  contact: {
    name: "Contact Us",
    columns: [
      { header: "Submitted At",         key: "submittedAt",      width: 22 },
      { header: "First Name",           key: "firstName",        width: 16 },
      { header: "Last Name",            key: "lastName",         width: 16 },
      { header: "Email",                key: "email",            width: 28 },
      { header: "Phone",                key: "phone",            width: 18 },
      { header: "Country",              key: "country",          width: 22 },
      { header: "City",                 key: "city",             width: 16 },
      { header: "Message",              key: "message",          width: 60 },
    ],
  },
  plan: {
    name: "Plan Your Journey",
    columns: [
      { header: "Submitted At",         key: "submittedAt",      width: 22 },
      { header: "First Name",           key: "firstName",        width: 16 },
      { header: "Last Name",            key: "lastName",         width: 16 },
      { header: "Email",                key: "email",            width: 28 },
      { header: "Phone",                key: "phone",            width: 18 },
      { header: "Country of Residence", key: "countryResidence", width: 24 },
      { header: "City",                 key: "city",             width: 16 },
      { header: "Destination",          key: "destination",      width: 20 },
      { header: "Travel Days",          key: "travelDays",       width: 14 },
      { header: "Adults",               key: "adults",           width: 10 },
      { header: "Children",             key: "children",         width: 10 },
      { header: "Travel Date",          key: "travelDate",       width: 18 },
      { header: "Budget",               key: "budget",           width: 20 },
      { header: "Travel Styles",        key: "travelStyles",     width: 30 },
      { header: "Accommodation",        key: "accommodation",    width: 30 },
      { header: "Message",              key: "message",          width: 60 },
    ],
  },
  enquiry: {
    name: "Package Enquiry",
    columns: [
      { header: "Submitted At",         key: "submittedAt",      width: 22 },
      { header: "Journey",              key: "journeyTitle",     width: 30 },
      { header: "First Name",           key: "firstName",        width: 16 },
      { header: "Last Name",            key: "lastName",         width: 16 },
      { header: "Email",                key: "email",            width: 28 },
      { header: "Phone",                key: "phone",            width: 18 },
      { header: "Travel Date",          key: "travelDate",       width: 18 },
      { header: "Country & City",       key: "countryCity",      width: 24 },
      { header: "Adults",               key: "adults",           width: 10 },
      { header: "Children",             key: "children",         width: 10 },
      { header: "Message",              key: "message",          width: 60 },
    ],
  },
} as const;

type SheetKey = keyof typeof SHEETS;

// ── Helpers ───────────────────────────────────────────────────────────────────

function styleHeader(ws: ExcelJS.Worksheet) {
  const row = ws.getRow(1);
  row.font = { bold: true };
  row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD4C5B2" } };
  row.commit();
}

async function getWorkbook(): Promise<ExcelJS.Workbook> {
  const wb = new ExcelJS.Workbook();
  try {
    await wb.xlsx.readFile(FILE);
  } catch {
    // First ever submission — create all sheets upfront
    for (const key of Object.keys(SHEETS) as SheetKey[]) {
      const ws = wb.addWorksheet(SHEETS[key].name);
      ws.columns = SHEETS[key].columns.map((c) => ({ ...c }));
      styleHeader(ws);
    }
  }
  return wb;
}

function getOrCreateSheet(wb: ExcelJS.Workbook, key: SheetKey): ExcelJS.Worksheet {
  const def = SHEETS[key];
  let ws = wb.getWorksheet(def.name);
  if (!ws) {
    ws = wb.addWorksheet(def.name);
    ws.columns = def.columns.map((c) => ({ ...c }));
    styleHeader(ws);
  } else {
    // Re-apply key mappings — they are not persisted in the .xlsx file format
    def.columns.forEach((col, i) => {
      ws!.getColumn(i + 1).key = col.key;
    });
  }
  return ws;
}

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...fields } = body as { type: SheetKey; [k: string]: string };

    if (!SHEETS[type]) {
      return NextResponse.json({ error: "Unknown lead type" }, { status: 400 });
    }

    const wb = await getWorkbook();
    const ws = getOrCreateSheet(wb, type);

    ws.addRow({
      submittedAt: new Date().toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      }),
      ...fields,
    });

    await wb.xlsx.writeFile(FILE);

    // Send emails non-blocking — lead is already saved even if email fails
    sendLeadEmails(type, fields).catch((err) =>
      console.error("Email send error:", err)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("leads API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
