import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "leads.xlsx");
const PASSWORD = process.env.LEADS_ADMIN_PASSWORD ?? "";

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");

  if (!pw || pw !== PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!fs.existsSync(FILE)) {
    return NextResponse.json({ error: "No leads file yet" }, { status: 404 });
  }

  const buffer = fs.readFileSync(FILE);
  const filename = `tivor-leads-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
