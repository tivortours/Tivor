import { google, sheets_v4 } from "googleapis";

// ── Sheet (tab) definitions ──────────────────────────────────────────────────
// Mirrors the columns previously written to data/leads.xlsx — one tab per
// lead type, created on first use with a header row.

const SHEETS = {
  contact: {
    name: "Contact Us",
    columns: [
      { header: "Submitted At", key: "submittedAt" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Country", key: "country" },
      { header: "City", key: "city" },
      { header: "Message", key: "message" },
    ],
  },
  plan: {
    name: "Plan Your Journey",
    columns: [
      { header: "Submitted At", key: "submittedAt" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Country of Residence", key: "countryResidence" },
      { header: "City", key: "city" },
      { header: "Destination", key: "destination" },
      { header: "Travel Days", key: "travelDays" },
      { header: "Adults", key: "adults" },
      { header: "Children", key: "children" },
      { header: "Travel Date", key: "travelDate" },
      { header: "Budget", key: "budget" },
      { header: "Travel Styles", key: "travelStyles" },
      { header: "Accommodation", key: "accommodation" },
      { header: "Message", key: "message" },
    ],
  },
  enquiry: {
    name: "Package Enquiry",
    columns: [
      { header: "Submitted At", key: "submittedAt" },
      { header: "Journey", key: "journeyTitle" },
      { header: "First Name", key: "firstName" },
      { header: "Last Name", key: "lastName" },
      { header: "Email", key: "email" },
      { header: "Phone", key: "phone" },
      { header: "Travel Date", key: "travelDate" },
      { header: "Country", key: "country" },
      { header: "Adults", key: "adults" },
      { header: "Children", key: "children" },
      { header: "Message", key: "message" },
    ],
  },
  newsletter: {
    name: "Newsletter",
    columns: [
      { header: "Submitted At", key: "submittedAt" },
      { header: "Email", key: "email" },
    ],
  },
} as const;

export type SheetKey = keyof typeof SHEETS;

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// ── Auth ──────────────────────────────────────────────────────────────────────

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars"
    );
  }

  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

function getSheetsClient(): sheets_v4.Sheets {
  return google.sheets({ version: "v4", auth: getAuth() });
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("Missing GOOGLE_SHEET_ID env var");
  return id;
}

// ── Tab creation (cached per warm server instance) ───────────────────────────

const knownTabs = new Set<string>();

async function ensureTab(sheets: sheets_v4.Sheets, spreadsheetId: string, key: SheetKey) {
  const def = SHEETS[key];
  if (knownTabs.has(def.name)) return;

  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  const titles = (meta.data.sheets ?? []).map((s) => s.properties?.title);

  if (!titles.includes(def.name)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: def.name } } }] },
    });
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${def.name}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [def.columns.map((c) => c.header)] },
    });
  }

  knownTabs.add(def.name);
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function appendLead(type: SheetKey, fields: Record<string, string>) {
  const spreadsheetId = getSpreadsheetId();
  const sheets = getSheetsClient();
  await ensureTab(sheets, spreadsheetId, type);

  const def = SHEETS[type];
  const submittedAt = new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  const row = def.columns.map((c) =>
    c.key === "submittedAt" ? submittedAt : fields[c.key] ?? ""
  );

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${def.name}!A:A`,
    // RAW, not USER_ENTERED — user-submitted text (phone numbers with a
    // leading "+", or a message starting with "=") must never be parsed as a
    // formula or auto-formatted; store exactly what was submitted.
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}

export function getSheetUrl(): string {
  return `https://docs.google.com/spreadsheets/d/${getSpreadsheetId()}/edit`;
}
