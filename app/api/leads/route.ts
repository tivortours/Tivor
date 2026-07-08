import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmails } from "../../../lib/email";
import { leadRequestSchema } from "../../../lib/validation";
import { appendLead } from "../../../lib/googleSheets";

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", fieldErrors: z.flattenError(parsed.error).fieldErrors },
        { status: 400 }
      );
    }

    const { type, ...fields } = parsed.data;

    await appendLead(type, fields);

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
