import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { sendLeadEmails } from "../../../lib/email";
import { leadRequestSchema } from "../../../lib/validation";
import { appendLead } from "../../../lib/microsoftExcel";

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

    // Send emails after the response is sent, but keep this serverless
    // invocation alive until they finish — a plain unawaited call here let
    // Vercel freeze the instance mid-flight, silently dropping whichever of
    // the two parallel admin/client sends hadn't completed yet (the client
    // send starts microseconds after the admin one, so it lost that race
    // more often — that's why acknowledgments were failing intermittently).
    after(() =>
      sendLeadEmails(type, fields).catch((err) =>
        console.error("Email send error:", err)
      )
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("leads API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
