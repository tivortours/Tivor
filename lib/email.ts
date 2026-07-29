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

function clientLayout(firstName: string) {
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
      <p style="margin:0 0 24px;color:#3d3d3d;font-size:16px;line-height:1.7;font-family:sans-serif;">
        We've received your message. A member of the TIVOR team will be in touch shortly to begin crafting your journey.
      </p>
      <p style="margin:0 0 24px;color:#3d3d3d;font-size:16px;line-height:1.7;font-family:sans-serif;">
        In the meantime, we invite you to discover our destinations and journeys at
        <a href="https://tivortours.com" style="color:#714128;text-decoration:none;">tivortours.com</a>.
      </p>
      <p style="margin:0;color:#3d3d3d;font-size:16px;line-height:1.7;font-family:sans-serif;">
        For destination ideas and travel inspiration, subscribe to the
        <a href="https://tivortours.com/#newsletter" style="color:#714128;text-decoration:none;white-space:nowrap;">TIVOR&nbsp;newsletter</a>.
      </p>
    </div>
    <div style="background:#f7f4f1;padding:22px 32px;">
      <p style="margin:0 0 8px;color:#151515;font-size:14px;font-family:sans-serif;">
        Warm regards,<br><span style="font-weight:600;">The TIVOR Team</span>
      </p>
      <p style="margin:0;color:#3d3d3d;font-size:13px;line-height:1.4;font-family:sans-serif;">
        <a href="mailto:hello@tivortours.com" style="color:#3d3d3d;text-decoration:none;">hello@tivortours.com</a><br>
        <a href="tel:+971504506643" style="color:#3d3d3d;text-decoration:none;">+971 50 450 6643</a><br>
        <a href="https://tivortours.com" style="color:#3d3d3d;text-decoration:none;">tivortours.com</a>
      </p>
    </div>
  </div>
</body></html>`;
}

// ── Admin email builders ──────────────────────────────────────────────────────

// Resend rejects any subject containing a raw newline (header-injection
// protection) — values from CMS content (e.g. a journey title) or pasted
// text can carry an embedded "\n", which would otherwise hard-fail the
// send outright rather than just looking odd.
function sanitizeSubject(s: string) {
  return s.replace(/[\r\n]+/g, " ").trim();
}

function contactAdminEmail(f: Record<string, string>) {
  return {
    subject: sanitizeSubject(`New Contact Us — ${f.firstName} ${f.lastName}`),
    html: adminLayout("New Contact Us Submission", [
      row("Source",  f.source),
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
    subject: sanitizeSubject(`New Journey Plan — ${f.firstName} ${f.lastName}`),
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
    subject: sanitizeSubject(`New Newsletter Signup — ${f.email}`),
    html: adminLayout("New Newsletter Signup", [
      row("Email", f.email),
    ].join("")),
  };
}

function enquiryAdminEmail(f: Record<string, string>) {
  return {
    subject: sanitizeSubject(`New Package Enquiry — ${f.journeyTitle}`),
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

function clientAckEmail(firstName: string) {
  return {
    subject: "Thank You for Contacting TIVOR",
    html: clientLayout(firstName),
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

  const clientContent = clientAckEmail(fields.firstName);

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
