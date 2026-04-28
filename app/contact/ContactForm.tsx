"use client";

import { useState } from "react";
import Image from "next/image";

const DIAL_COUNTRIES = [
  { code: "AE", flag: "🇦🇪", dial: "+971", name: "UAE" },
  { code: "US", flag: "🇺🇸", dial: "+1",   name: "United States" },
  { code: "GB", flag: "🇬🇧", dial: "+44",  name: "United Kingdom" },
  { code: "AU", flag: "🇦🇺", dial: "+61",  name: "Australia" },
  { code: "IN", flag: "🇮🇳", dial: "+91",  name: "India" },
  { code: "DE", flag: "🇩🇪", dial: "+49",  name: "Germany" },
  { code: "FR", flag: "🇫🇷", dial: "+33",  name: "France" },
  { code: "IT", flag: "🇮🇹", dial: "+39",  name: "Italy" },
  { code: "SI", flag: "🇸🇮", dial: "+386", name: "Slovenia" },
  { code: "IS", flag: "🇮🇸", dial: "+354", name: "Iceland" },
  { code: "NO", flag: "🇳🇴", dial: "+47",  name: "Norway" },
  { code: "CA", flag: "🇨🇦", dial: "+1",   name: "Canada" },
  { code: "SG", flag: "🇸🇬", dial: "+65",  name: "Singapore" },
  { code: "ZA", flag: "🇿🇦", dial: "+27",  name: "South Africa" },
];

const COUNTRIES = [
  "Australia","Austria","Belgium","Canada","Croatia","Czech Republic",
  "Denmark","Finland","France","Germany","Greece","Iceland","India",
  "Ireland","Italy","Japan","Luxembourg","Netherlands","New Zealand",
  "Norway","Poland","Portugal","Singapore","Slovenia","South Africa",
  "Spain","Sweden","Switzerland","United Arab Emirates","United Kingdom",
  "United States","Other",
];

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

function TextInput({ placeholder, value, onChange, type = "text" }: {
  placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="form-input"
      style={{ fontFamily: "var(--font-secondary)" }}
    />
  );
}

function SelectInput({ value, onChange, placeholder, options }: {
  value: string; onChange: (v: string) => void; placeholder: string; options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
        style={{ fontFamily: "var(--font-secondary)", color: value ? "#151515" : "#999" }}
      >
        <option value="" disabled style={{ color: "#999" }}>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} style={{ color: "#151515" }}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path d="M1 1L6 6L11 1" stroke="#555" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function PhoneInput({ countryCode, phone, onCountryChange, onPhoneChange }: {
  countryCode: string; phone: string; onCountryChange: (v: string) => void; onPhoneChange: (v: string) => void;
}) {
  const country = DIAL_COUNTRIES.find((c) => c.code === countryCode) ?? DIAL_COUNTRIES[0];
  return (
    <div className="form-phone-wrap">
      <div className="relative flex shrink-0 items-center px-3">
        <select
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Country code"
        >
          {DIAL_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.dial})</option>
          ))}
        </select>
        <span className="mr-1 text-xl leading-none" aria-hidden>{country.flag}</span>
        <svg className="mr-1.5 shrink-0" width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1L4.5 5L8 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span className="text-[13px] font-medium text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
          {country.dial}
        </span>
      </div>
      <div className="my-3.5 w-px bg-brown-300" />
      <input
        type="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Enter your contact number"
        className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-dark-500 placeholder-[#999] outline-none"
        style={{ fontFamily: "var(--font-secondary)" }}
      />
    </div>
  );
}

function Textarea({ value, onChange, placeholder, maxLength = 1000 }: {
  value: string; onChange: (v: string) => void; placeholder: string; maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={placeholder}
        className="form-textarea"
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
          <path d="M5 14L11 20L23 8" stroke="#714128" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [countryCode, setCountryCode] = useState("AE");
  const [phone, setPhone]         = useState("");
  const [country, setCountry]     = useState("");
  const [city, setCity]           = useState("");
  const [message, setMessage]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = !!(firstName && lastName && email && phone && country && message);

  function handleSubmit() {
    if (!valid) return;
    setSubmitted(true);
    const dialCode = DIAL_COUNTRIES.find((c) => c.code === countryCode)?.dial ?? "";
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact",
        firstName, lastName, email,
        phone: `${dialCode} ${phone}`.trim(),
        country, city, message,
      }),
    });
  }

  if (submitted) return <SuccessView />;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-xs xl:grid-cols-2">

      {/* ── Left: Form ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-7 bg-white p-6 sm:p-8 xl:p-10">

        {/* Row 1: First Name + Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="First Name*">
            <TextInput placeholder="Enter your first name" value={firstName} onChange={setFirstName} />
          </Field>
          <Field label="Last Name*">
            <TextInput placeholder="Enter your last name" value={lastName} onChange={setLastName} />
          </Field>
        </div>

        {/* Row 2: Email + Contact Number */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Email*">
            <TextInput placeholder="Enter your email address" value={email} onChange={setEmail} type="email" />
          </Field>
          <Field label="Contact Number*">
            <PhoneInput
              countryCode={countryCode}
              phone={phone}
              onCountryChange={setCountryCode}
              onPhoneChange={setPhone}
            />
          </Field>
        </div>

        {/* Row 3: Country + City */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Country of Residence*">
            <SelectInput
              value={country}
              onChange={setCountry}
              placeholder="Select country"
              options={COUNTRIES}
            />
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
            placeholder="Share your ideas and initial plans"
          />
        </Field>

        {/* Divider + Submit */}
        <div className="h-px w-full bg-[#ddd0c5]" />
        <button
          onClick={handleSubmit}
          disabled={!valid}
          className={`h-11.25 w-fit rounded-xs px-8 text-[18px] text-white transition-opacity ${
            valid ? "bg-dark-500" : "cursor-not-allowed bg-dark-500/40"
          }`}
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Submit Enquiry
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
