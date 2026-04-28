"use client";

import { useState } from "react";

// ── Country dial codes ────────────────────────────────────────────────────────
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

const RESIDENCE_COUNTRIES = [
  "Australia","Austria","Belgium","Canada","Croatia","Czech Republic",
  "Denmark","Finland","France","Germany","Greece","Iceland","India",
  "Ireland","Italy","Japan","Luxembourg","Netherlands","New Zealand",
  "Norway","Poland","Portugal","Singapore","Slovenia","South Africa",
  "Spain","Sweden","Switzerland","United Arab Emirates","United Kingdom",
  "United States","Other",
];

const BUDGETS = ["Under $3,000","$3,000 – $5,000","$5,000 – $8,000","$8,000 – $12,000","$12,000 – $20,000","$20,000+","Flexible"];
const ADULTS  = ["1","2","3","4","5","6","7","8","9","10+"];
const CHILDREN = ["0","1","2","3","4","5","6+"];

const TRAVEL_STYLES = ["Adventure","Family Vacation","Romantic Escape","Wellness and Health","Cultural Immersion","Others"];
const ACCOMMODATIONS = ["Luxury Hotels","Boutique Hotels","Villas or Chalets","Glamping","Tivor Best Fit"];

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
        rows={6}
        className="form-textarea"
        style={{ fontFamily: "var(--font-secondary)" }}
      />
      <p className="self-end text-[12px] text-[#999]" style={{ fontFamily: "var(--font-secondary)" }}>
        {value.length}/{maxLength}
      </p>
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  function toggle(opt: string) {
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  }
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label key={opt} className="flex cursor-pointer items-center gap-1.5">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border transition-colors ${
                checked ? "border-dark-500 bg-dark-500" : "border-[#aaa] bg-transparent"
              }`}
              onClick={() => toggle(opt)}
            >
              {checked && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span
              className="text-[14px] text-dark-500"
              style={{ fontFamily: "var(--font-secondary)" }}
              onClick={() => toggle(opt)}
            >
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ── Section title ─────────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[18px] font-medium text-dark-500"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      {children}
    </p>
  );
}

// ── Success view ──────────────────────────────────────────────────────────────
function SuccessView() {
  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fern-600">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14L11.5 19.5L22 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        <h3
          className="text-[32px] leading-tight text-dark-500"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          Enquiry Sent Successfully
        </h3>
        <p
          className="max-w-120 text-[16px] leading-relaxed text-dark-400"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Thank you for reaching out. One of our journey designers will review your request and be in touch within 24 hours.
        </p>
      </div>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────
export default function PlanForm({ destinations }: { destinations: string[] }) {
  const [done, setDone] = useState(false);

  // Journey details
  const [destination, setDestination] = useState("");
  const [travelDays, setTravelDays] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyles, setTravelStyles] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState<string[]>([]);

  // Personal details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("AE");
  const [phone, setPhone] = useState("");
  const [countryResidence, setCountryResidence] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const valid = firstName && lastName && email && phone && message && destination && adults;

  function handleSubmit() {
    if (!valid) return;
    setDone(true);
    const dialCode = DIAL_COUNTRIES.find((c) => c.code === countryCode)?.dial ?? "";
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "plan",
        firstName, lastName, email,
        phone: `${dialCode} ${phone}`.trim(),
        countryResidence, city,
        destination, travelDays, adults, children,
        travelDate, budget,
        travelStyles: travelStyles.join(", "),
        accommodation: accommodation.join(", "),
        message,
      }),
    });
  }

  if (done) return <SuccessView />;

  return (
    <div className="w-full rounded-xs bg-white p-6 sm:p-8 xl:p-10">
      {/* Two-column grid: each column is minmax(0,1fr), divider via border */}
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-0">

        {/* ── Left: Journey Details ─────────────────────────────────────── */}
        <div className="flex flex-col gap-7 xl:border-r xl:border-[#ddd0c5] xl:pr-15">
          <SectionTitle>Journey Details</SectionTitle>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Preferred Destinations*">
              <SelectInput
                value={destination}
                onChange={setDestination}
                placeholder="Select destinations"
                options={destinations}
              />
            </Field>
            <Field label="Number of Travel Days*">
              <TextInput
                placeholder="Enter number of days"
                value={travelDays}
                onChange={setTravelDays}
                type="number"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Number of Adults*">
              <SelectInput
                value={adults}
                onChange={setAdults}
                placeholder="Pick a number"
                options={ADULTS}
              />
            </Field>
            <Field label="Number of Children">
              <SelectInput
                value={children}
                onChange={setChildren}
                placeholder="Pick a number"
                options={CHILDREN}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Date / Period of Trip">
              <TextInput
                placeholder="Enter approx. date/month"
                value={travelDate}
                onChange={setTravelDate}
              />
            </Field>
            <Field label={<>Your Budget* <span className="text-[#777]">(per person)</span></>}>
              <SelectInput
                value={budget}
                onChange={setBudget}
                placeholder="Pick a range"
                options={BUDGETS}
              />
            </Field>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Your Aspired Travel Style</Label>
            <CheckboxGroup
              options={TRAVEL_STYLES}
              selected={travelStyles}
              onChange={setTravelStyles}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Preferred Accommodation That You Would Like to Stay in?</Label>
            <CheckboxGroup
              options={ACCOMMODATIONS}
              selected={accommodation}
              onChange={setAccommodation}
            />
          </div>

          {/* Mobile-only divider — inside left column so the grid always has 2 children */}
          <div className="h-px w-full bg-[#ddd0c5] xl:hidden" />
        </div>

        {/* ── Right: Your Details ───────────────────────────────────────── */}
        <div className="flex flex-col gap-7 xl:pl-15">
          <SectionTitle>Your Details</SectionTitle>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="First Name*">
              <TextInput placeholder="Enter your first name" value={firstName} onChange={setFirstName} />
            </Field>
            <Field label="Last Name*">
              <TextInput placeholder="Enter your last name" value={lastName} onChange={setLastName} />
            </Field>
          </div>

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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Country of Residence*">
              <SelectInput
                value={countryResidence}
                onChange={setCountryResidence}
                placeholder="Select country"
                options={RESIDENCE_COUNTRIES}
              />
            </Field>
            <Field label="City">
              <TextInput placeholder="Enter your city" value={city} onChange={setCity} />
            </Field>
          </div>

          <Field label="Tell us about your journey*">
            <Textarea
              placeholder="Share your ideas and initial plans"
              value={message}
              onChange={setMessage}
            />
          </Field>
        </div>
      </div>

      {/* Divider + submit */}
      <div className="mt-8 flex flex-col gap-6">
        <div className="h-px w-full bg-[#ddd0c5]" />
        <button
          onClick={handleSubmit}
          className={`h-11.25 w-fit rounded-xs px-8 text-[18px] text-white transition-opacity ${
            valid ? "bg-dark-500" : "bg-dark-500/40 cursor-not-allowed"
          }`}
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Submit Enquiry
        </button>
      </div>
    </div>
  );
}
