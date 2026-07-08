import { NextRequest, NextResponse } from "next/server";
import { getSheetUrl } from "../../../../lib/googleSheets";

const PASSWORD = process.env.LEADS_ADMIN_PASSWORD ?? "";

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");

  if (!pw || pw !== PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ url: getSheetUrl() });
  } catch (err) {
    console.error("leads sheet-link error:", err);
    return NextResponse.json({ error: "Sheet not configured" }, { status: 500 });
  }
}
