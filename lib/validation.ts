import { z } from "zod";
import { isSupportedCountry, isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

// ── Field-level primitives ───────────────────────────────────────────────────
// Shared between client forms (field-by-field UX validation) and API routes
// (authoritative server-side validation) so the rules never drift apart.

export const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required`);

export const emailField = z
  .string()
  .trim()
  .min(1, "Email address is required")
  .email("Please enter a valid email address");

const optionalText = z.string().trim().optional().default("");

// Validates a raw local phone number (as typed, no dial code prefix) against the
// numbering plan of the selected country — e.g. rejects a UK-length number
// entered under a UAE country selector. Used by client forms, which hold the
// phone number and its country selector as separate fields.
function checkPhoneForCountry(
  ctx: z.RefinementCtx,
  phone: string,
  countryIso: string,
  path: (string | number)[]
) {
  const trimmed = phone.trim();
  if (!trimmed) {
    ctx.addIssue({ code: "custom", path, message: "Phone number is required" });
    return;
  }
  if (!isSupportedCountry(countryIso) || !isValidPhoneNumber(trimmed, countryIso as CountryCode)) {
    ctx.addIssue({
      code: "custom",
      path,
      message: "Please enter a valid phone number for the selected country",
    });
  }
}

// Validates an already-combined international phone string (e.g. "+971 501234567").
// Used server-side, where the client has already merged dial code + number —
// libphonenumber-js infers the country from the leading "+".
export const internationalPhoneField = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => isValidPhoneNumber(v), "Please enter a valid phone number");

// ── Contact Us form ───────────────────────────────────────────────────────────

const contactFormFields = z.object({
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phoneCountry: z.string(),
  phone: z.string(),
  country: requiredText("Country of residence"),
  city: optionalText,
  message: requiredText("Message"),
});

export const contactFormSchema = contactFormFields.superRefine((data, ctx) =>
  checkPhoneForCountry(ctx, data.phone, data.phoneCountry, ["phone"])
);

export type ContactFormShape = typeof contactFormFields.shape;

// ── Plan Your Journey form ────────────────────────────────────────────────────

const planFormFields = z.object({
  destination: requiredText("Destination"),
  travelDays: optionalText,
  adults: requiredText("Number of adults"),
  children: optionalText,
  travelDate: optionalText,
  budget: optionalText,
  travelStyles: z.array(z.string()).optional().default([]),
  accommodation: z.array(z.string()).optional().default([]),
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phoneCountry: z.string(),
  phone: z.string(),
  countryResidence: optionalText,
  city: optionalText,
  message: requiredText("Message"),
});

export const planFormSchema = planFormFields.superRefine((data, ctx) =>
  checkPhoneForCountry(ctx, data.phone, data.phoneCountry, ["phone"])
);

export type PlanFormShape = typeof planFormFields.shape;

// ── Package Enquiry modal (2-step) ────────────────────────────────────────────

const bookingStep1Fields = z.object({
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phoneCountry: z.string(),
  phone: z.string(),
  message: requiredText("Message"),
});

export const bookingStep1Schema = bookingStep1Fields.superRefine((data, ctx) =>
  checkPhoneForCountry(ctx, data.phone, data.phoneCountry, ["phone"])
);

export type BookingStep1Shape = typeof bookingStep1Fields.shape;

export const bookingStep2Schema = z.object({
  travelDate: requiredText("Travel date"),
  countryCity: requiredText("Country and city"),
  adults: requiredText("Number of adults"),
  children: optionalText,
});

export type BookingStep2Values = z.infer<typeof bookingStep2Schema>;

// ── Newsletter signup ─────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: emailField,
});

// ── /api/leads request body ───────────────────────────────────────────────────
// The client combines dial code + phone into one string before posting, and
// joins checkbox arrays into comma-separated strings — the API schema mirrors
// that shape rather than the raw client form shape.

export const contactLeadSchema = z.object({
  type: z.literal("contact"),
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phone: internationalPhoneField,
  country: requiredText("Country of residence"),
  city: optionalText,
  message: requiredText("Message"),
});

export const planLeadSchema = z.object({
  type: z.literal("plan"),
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phone: internationalPhoneField,
  countryResidence: optionalText,
  city: optionalText,
  destination: requiredText("Destination"),
  travelDays: optionalText,
  adults: requiredText("Number of adults"),
  children: optionalText,
  travelDate: optionalText,
  budget: optionalText,
  travelStyles: optionalText,
  accommodation: optionalText,
  message: requiredText("Message"),
});

export const enquiryLeadSchema = z.object({
  type: z.literal("enquiry"),
  journeyTitle: requiredText("Journey title"),
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phone: internationalPhoneField,
  travelDate: requiredText("Travel date"),
  countryCity: requiredText("Country and city"),
  adults: requiredText("Number of adults"),
  children: optionalText,
  message: requiredText("Message"),
});

export const newsletterLeadSchema = z.object({
  type: z.literal("newsletter"),
  email: emailField,
});

export const leadRequestSchema = z.discriminatedUnion("type", [
  contactLeadSchema,
  planLeadSchema,
  enquiryLeadSchema,
  newsletterLeadSchema,
]);

export type LeadRequest = z.infer<typeof leadRequestSchema>;
