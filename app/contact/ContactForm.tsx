"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { contactFormSchema, type ContactFormShape } from "../../lib/validation";
import { DIAL_COUNTRIES, COUNTRY_NAMES } from "../../lib/countries";
import { CountrySelect } from "../../components/CountrySelect";
import { PhoneCountrySelect } from "../../components/PhoneCountrySelect";

type FieldErrors = Partial<Record<keyof ContactFormShape, string>>;

const COUNTRIES = [...COUNTRY_NAMES, "Other"];

// ── Primitives ────────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
      {children}
    </p>
  );
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <p
      className="text-[12px] text-red-500"
      style={{ fontFamily: "var(--font-secondary)", visibility: msg ? "visible" : "hidden" }}
    >
      {msg || "placeholder"}
    </p>
  );
}

function TextInput({ placeholder, value, onChange, type = "text", hasError }: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string; hasError?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`form-input ring-1 ${hasError ? "ring-red-400" : "ring-transparent"}`}
      style={{ fontFamily: "var(--font-secondary)" }}
    />
  );
}

function PhoneInput({ countryCode, phone, onCountryChange, onPhoneChange, hasError }: {
  countryCode: string; phone: string; onCountryChange: (v: string) => void; onPhoneChange: (v: string) => void; hasError?: boolean;
}) {
  return (
    <div className={`form-phone-wrap ring-1 ${hasError ? "ring-red-400" : "ring-transparent"}`}>
      <PhoneCountrySelect value={countryCode} onChange={onCountryChange} />
      <div className="my-3.5 w-px bg-brown-300" />
      <input
        type="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder="Enter your contact number"
        className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-dark-500 placeholder-[#999] outline-none"
        style={{ fontFamily: "var(--font-secondary)" }}
      />
    </div>
  );
}

function Textarea({ value, onChange, placeholder, maxLength = 1000, hasError }: {
  value: string; onChange: (v: string) => void; placeholder: string; maxLength?: number; hasError?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        className={`form-textarea ring-1 ${hasError ? "ring-red-400" : "ring-transparent"}`}
        style={{ fontFamily: "var(--font-secondary)" }}
      />
      <p className="self-end text-[12px] text-[#999]" style={{ fontFamily: "var(--font-secondary)" }}>
        {value.length}/{maxLength}
      </p>
    </div>
  );
}

// ── Success view ──────────────────────────────────────────────────────────────

function SuccessView() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-6 rounded-xs bg-white p-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-beige-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 14L11 20L23 8" stroke="#714128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-[28px] leading-tight text-dark-500" style={{ fontFamily: "var(--font-primary)" }}>
        Message Sent
      </h2>
      <p className="max-w-110 text-[16px] leading-relaxed text-dark-400" style={{ fontFamily: "var(--font-secondary)" }}>
        Thank you for reaching out. Our team will be in touch with you shortly to begin crafting your journey.
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactForm({ contactImage }: { contactImage: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [tried, setTried] = useState(false);

  function validate(): FieldErrors {
    const result = contactFormSchema.safeParse({ firstName, lastName, email, phoneCountry: countryCode, phone, country, city, message });
    if (result.success) return {};
    const e: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      if (!e[key]) e[key] = issue.message;
    }
    return e;
  }

  // Re-validate live after first submit attempt so errors clear as the user fixes them.
  useEffect(() => {
    if (tried) setErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, countryCode, phone, country, city, message, tried]);

  async function handleSubmit() {
    setTried(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    const dialCode = DIAL_COUNTRIES.find((c) => c.code === countryCode)?.dial ?? "";
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          firstName, lastName, email,
          phone: `${dialCode} ${phone}`.trim(),
          country, city, message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <SuccessView />;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xs xl:grid-cols-2">

      {/* ── Left: Form ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-7 bg-white p-6 sm:p-8 xl:p-10">

        {/* Row 1: First Name + Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="First Name*">
            <TextInput placeholder="Enter your first name" value={firstName} onChange={(v) => setFirstName(v.replace(/[0-9]/g, ""))} hasError={!!errors.firstName} />
            <FieldError msg={errors.firstName} />
          </Field>
          <Field label="Last Name*">
            <TextInput placeholder="Enter your last name" value={lastName} onChange={(v) => setLastName(v.replace(/[0-9]/g, ""))} hasError={!!errors.lastName} />
            <FieldError msg={errors.lastName} />
          </Field>
        </div>

        {/* Row 2: Email + Contact Number */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Email*">
            <TextInput placeholder="Enter your email address" value={email} onChange={setEmail} type="email" hasError={!!errors.email} />
            <FieldError msg={errors.email} />
          </Field>
          <Field label="Contact Number*">
            <PhoneInput
              countryCode={countryCode}
              phone={phone}
              onCountryChange={setCountryCode}
              onPhoneChange={setPhone}
              hasError={!!errors.phone}
            />
            <FieldError msg={errors.phone} />
          </Field>
        </div>

        {/* Row 3: Country + City */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Country of Residence*">
            <CountrySelect
              value={country}
              onChange={setCountry}
              placeholder="Select country"
              options={COUNTRIES}
              hasError={!!errors.country}
            />
            <FieldError msg={errors.country} />
          </Field>
          <Field label="City">
            <TextInput placeholder="Enter your city" value={city} onChange={setCity} />
          </Field>
        </div>

        {/* Row 4: Message */}
        <Field label="Tell us about your journey*">
          <Textarea
            value={message}
            onChange={setMessage}
            placeholder="Share your travel plans, preferred dates, travel companions, and any
                         experiences you'd love to include. Our Travel Designers will create a bespoke
                         journey, curated around you."
            hasError={!!errors.message}
          />
          <FieldError msg={errors.message} />
        </Field>

        {/* Divider + Submit */}
        <div className="h-px w-full bg-[#ddd0c5]" />
        <FieldError msg={submitError} />
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`h-11.25 w-fit rounded-xs px-8 text-[18px] text-white transition-opacity ${submitting ? "cursor-not-allowed bg-dark-500/40" : "cursor-pointer bg-dark-500"
            }`}
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          {submitting ? "Submitting…" : "Submit Enquiry"}
        </button>
      </div>

      {/* ── Right: Image ──────────────────────────────────────────────────── */}
      <div className="relative min-h-75">
        <Image
          src={contactImage}
          alt="Begin your journey with Tivor"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
