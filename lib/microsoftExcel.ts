// Lead storage via Microsoft Graph, writing to an Excel workbook stored in a
// SharePoint document library — replaces the previous Google Sheets backend.
// Uses app-only (client-credentials) auth: no user sign-in involved, just a
// tenant-wide app registration with Graph API permissions.
//
// Each lead type gets its own worksheet + Table, created on first use with a
// header row — mirrors the old Google Sheets ensureTab() bootstrap. The only
// manual setup left is creating the (empty) workbook file itself; Graph can't
// create the .xlsx file from nothing, but everything inside it is automatic.

const TABLES = {
  contact: {
    name: "ContactUs",
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
    name: "PlanYourJourney",
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
    name: "PackageEnquiry",
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

export type TableKey = keyof typeof TABLES;

// ── Auth (client-credentials, token cached per warm server instance) ────────

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing MS_TENANT_ID, MS_CLIENT_ID, or MS_CLIENT_SECRET env vars");
  }

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
    }),
  });

  if (!res.ok) {
    throw new Error(`Microsoft token request failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

function getFileRef() {
  const siteId = process.env.MS_SITE_ID;
  const itemId = process.env.MS_DRIVE_ITEM_ID;
  if (!siteId || !itemId) {
    throw new Error("Missing MS_SITE_ID or MS_DRIVE_ITEM_ID env vars");
  }
  return { siteId, itemId };
}

function workbookBase(siteId: string, itemId: string) {
  return `https://graph.microsoft.com/v1.0/sites/${siteId}/drive/items/${itemId}/workbook`;
}

async function graphFetch(url: string, token: string, init?: RequestInit) {
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

// A1-style column letter for a 1-based column count — only ever needs to
// cover up to 16 columns here, so plain A-Z is enough (no AA/AB overflow).
function columnLetter(count: number) {
  return String.fromCharCode("A".charCodeAt(0) + count - 1);
}

// ── Worksheet/Table bootstrap (cached per warm server instance) ─────────────

const knownTables = new Set<string>();

async function ensureTable(siteId: string, itemId: string, token: string, key: TableKey) {
  const def = TABLES[key];
  if (knownTables.has(def.name)) return;

  const base = workbookBase(siteId, itemId);

  const existing = await graphFetch(`${base}/tables('${def.name}')`, token);
  if (existing.ok) {
    knownTables.add(def.name);
    return;
  }

  const wsCheck = await graphFetch(`${base}/worksheets('${def.name}')`, token);
  if (!wsCheck.ok) {
    const createWs = await graphFetch(`${base}/worksheets/add`, token, {
      method: "POST",
      body: JSON.stringify({ name: def.name }),
    });
    if (!createWs.ok) {
      throw new Error(`Failed to create worksheet ${def.name}: ${createWs.status} ${await createWs.text()}`);
    }
  }

  const headerRange = `A1:${columnLetter(def.columns.length)}1`;
  const writeHeaders = await graphFetch(
    `${base}/worksheets('${def.name}')/range(address='${headerRange}')`,
    token,
    { method: "PATCH", body: JSON.stringify({ values: [def.columns.map((c) => c.header)] }) }
  );
  if (!writeHeaders.ok) {
    throw new Error(`Failed to write headers for ${def.name}: ${writeHeaders.status} ${await writeHeaders.text()}`);
  }

  const createTable = await graphFetch(`${base}/worksheets('${def.name}')/tables/add`, token, {
    method: "POST",
    body: JSON.stringify({ address: `${def.name}!${headerRange}`, hasHeaders: true }),
  });
  if (!createTable.ok) {
    throw new Error(`Failed to create table for ${def.name}: ${createTable.status} ${await createTable.text()}`);
  }
  const table = (await createTable.json()) as { name: string };

  if (table.name !== def.name) {
    const rename = await graphFetch(`${base}/tables('${table.name}')`, token, {
      method: "PATCH",
      body: JSON.stringify({ name: def.name }),
    });
    if (!rename.ok) {
      throw new Error(`Failed to rename table ${table.name} to ${def.name}: ${rename.status} ${await rename.text()}`);
    }
  }

  knownTables.add(def.name);
}

// ── Public API (same shape as the old lib/googleSheets.ts) ──────────────────

export async function appendLead(type: TableKey, fields: Record<string, string>) {
  const def = TABLES[type];
  const token = await getAccessToken();
  const { siteId, itemId } = getFileRef();

  await ensureTable(siteId, itemId, token, type);

  const submittedAt = new Date().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  const row = def.columns.map((c) => (c.key === "submittedAt" ? submittedAt : fields[c.key] ?? ""));

  const res = await graphFetch(
    `${workbookBase(siteId, itemId)}/tables('${def.name}')/rows/add`,
    token,
    {
      method: "POST",
      // RAW values, not formulas — user-submitted text (a phone number
      // starting with "+", or a message starting with "=") must never be
      // interpreted as an Excel formula; the Graph rows/add API always
      // writes literal values, so no separate "RAW" flag is needed here.
      body: JSON.stringify({ values: [row] }),
    }
  );

  if (!res.ok) {
    throw new Error(`Microsoft Graph rows/add failed: ${res.status} ${await res.text()}`);
  }
}

export function getSheetUrl(): string {
  const url = process.env.MS_EXCEL_WEB_URL;
  if (!url) throw new Error("Missing MS_EXCEL_WEB_URL env var");
  return url;
}
