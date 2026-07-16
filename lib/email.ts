import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM     = process.env.EMAIL_FROM   || "Tivor <onboarding@resend.dev>";
const ADMIN_TO = process.env.ADMIN_EMAIL  || "travel@tivor.ae";

// ── HTML helpers ──────────────────────────────────────────────────────────────

function esc(s: string = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 16px;font-weight:600;color:#555;white-space:nowrap;
                 vertical-align:top;font-family:sans-serif;font-size:14px;width:180px;">
        ${label}
      </td>
      <td style="padding:10px 16px;color:#151515;font-family:sans-serif;font-size:14px;
                 line-height:1.5;">
        ${esc(value)}
      </td>
    </tr>`;
}

function adminLayout(title: string, rows: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2ebe2;">
  <div style="max-width:620px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;">
    <div style="background:#151515;padding:22px 32px;">
      <span style="color:#fff;font-size:20px;font-weight:700;font-family:sans-serif;">TIVOR</span>
    </div>
    <div style="padding:32px;">
      <h2 style="margin:0 0 24px;color:#151515;font-size:18px;font-family:sans-serif;">${title}</h2>
      <table style="width:100%;border-collapse:collapse;background:#f7f4f1;border-radius:4px;">
        ${rows}
      </table>
    </div>
    <div style="background:#f7f4f1;padding:14px 32px;text-align:center;">
      <p style="margin:0;color:#999;font-size:12px;font-family:sans-serif;">Tivor · Dubai, UAE</p>
    </div>
  </div>
</body></html>`;
}

function clientLayout(firstName: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f2ebe2;">
  <div style="max-width:620px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;">
    <div style="background:#151515;padding:22px 32px;">
      <span style="color:#fff;font-size:20px;font-weight:700;font-family:sans-serif;">TIVOR</span>
    </div>
    <div style="padding:40px 32px;">
      <h2 style="margin:0 0 16px;color:#151515;font-size:22px;font-family:sans-serif;">
        Thank you, ${esc(firstName)}.
      </h2>
      <p style="margin:0 0 28px;color:#3d3d3d;font-size:16px;line-height:1.7;font-family:sans-serif;">
        ${body}
      </p>
      <p style="margin:0;color:#3d3d3d;font-size:16px;line-height:1.7;font-family:sans-serif;">
        In the meantime, feel free to explore our destinations and journeys at
        <a href="https://tivor.ae" style="color:#714128;text-decoration:none;">tivor.ae</a>.
      </p>
    </div>
    <div style="background:#f7f4f1;padding:22px 32px;">
      <p style="margin:0 0 4px;color:#151515;font-size:14px;font-weight:600;font-family:sans-serif;">
        The Tivor Team
      </p>
      <p style="margin:0;color:#3d3d3d;font-size:13px;font-family:sans-serif;">
        travel@tivor.ae &nbsp;·&nbsp; +971 4 555 7842
      </p>
    </div>
  </div>
</body></html>`;
}

// ── Admin email builders ──────────────────────────────────────────────────────

function contactAdminEmail(f: Record<string, string>) {
  return {
    subject: `New Contact Us — ${f.firstName} ${f.lastName}`,
    html: adminLayout("New Contact Us Submission", [
      row("Name",    `${f.firstName} ${f.lastName}`),
      row("Email",   f.email),
      row("Phone",   f.phone),
      row("Country", f.country),
      row("City",    f.city),
      row("Message", f.message),
    ].join("")),
  };
}

function planAdminEmail(f: Record<string, string>) {
  return {
    subject: `New Journey Plan — ${f.firstName} ${f.lastName}`,
    html: adminLayout("New Plan Your Journey Submission", [
      row("Name",               `${f.firstName} ${f.lastName}`),
      row("Email",              f.email),
      row("Phone",              f.phone),
      row("Country",            f.countryResidence),
      row("City",               f.city),
      row("Destination",        f.destination),
      row("Travel Days",        f.travelDays),
      row("Adults",             f.adults),
      row("Children",           f.children),
      row("Travel Date",        f.travelDate),
      row("Budget",             f.budget),
      row("Travel Styles",      f.travelStyles),
      row("Accommodation",      f.accommodation),
      row("Message",            f.message),
    ].join("")),
  };
}

function newsletterAdminEmail(f: Record<string, string>) {
  return {
    subject: `New Newsletter Signup — ${f.email}`,
    html: adminLayout("New Newsletter Signup", [
      row("Email", f.email),
    ].join("")),
  };
}

function enquiryAdminEmail(f: Record<string, string>) {
  return {
    subject: `New Package Enquiry — ${f.journeyTitle}`,
    html: adminLayout("New Package Enquiry", [
      row("Journey",        f.journeyTitle),
      row("Name",           `${f.firstName} ${f.lastName}`),
      row("Email",          f.email),
      row("Phone",          f.phone),
      row("Travel Date",    f.travelDate),
      row("Country",        f.country),
      row("Adults",         f.adults),
      row("Children",       f.children),
      row("Message",        f.message),
    ].join("")),
  };
}

// ── Client acknowledgment builders ────────────────────────────────────────────

const ACK_BODY: Record<string, string> = {
  contact:
    "We've received your message and our team will be in touch with you shortly to begin crafting your journey.",
  plan:
    "We've received your journey plan request. One of our journey designers will review your preferences and be in touch within 24 hours.",
  enquiry:
    "We've received your package enquiry. One of our journey designers will review it and be in touch within 24 hours.",
};

function clientAckEmail(firstName: string, type: string) {
  return {
    subject: "We've received your enquiry — Tivor",
    html: clientLayout(firstName, ACK_BODY[type] ?? ACK_BODY.contact),
  };
}

// ── Public send function ──────────────────────────────────────────────────────

export async function sendLeadEmails(
  type: string,
  fields: Record<string, string>,
) {
  // Newsletter signups have no name to personalize a client acknowledgment,
  // so only notify the admin.
  if (type === "newsletter") {
    const { subject, html } = newsletterAdminEmail(fields);
    try {
      await resend.emails.send({ from: FROM, to: [ADMIN_TO], subject, html });
    } catch (err) {
      console.error("Newsletter admin email failed:", err);
    }
    return;
  }

  const adminContent =
    type === "plan"    ? planAdminEmail(fields)
    : type === "enquiry" ? enquiryAdminEmail(fields)
    : contactAdminEmail(fields);

  const clientContent = clientAckEmail(fields.firstName, type);

  // Send independently so one failure never blocks the other
  const results = await Promise.allSettled([
    resend.emails.send({
      from:    FROM,
      to:      [ADMIN_TO],
      subject: adminContent.subject,
      html:    adminContent.html,
    }),
    resend.emails.send({
      from:    FROM,
      to:      [fields.email],
      subject: clientContent.subject,
      html:    clientContent.html,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`Email ${i === 0 ? "admin" : "client"} failed:`, r.reason);
    }
  });
}
