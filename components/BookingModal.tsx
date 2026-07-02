"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "./Portal";

// ── Country list ──────────────────────────────────────────────────────────────
const COUNTRIES = [
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
];

// ── Validators ────────────────────────────────────────────────────────────────
function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length >= 5;
}

// ── Form data types ───────────────────────────────────────────────────────────
type Step1 = {
  firstName: string; lastName: string; email: string;
  countryCode: string; phone: string; message: string;
};
type Step2 = {
  travelDate: string; countryCity: string;
  adults: string; children: string;
};

type Errors1 = Partial<Record<keyof Omit<Step1, "countryCode">, string>>;
type Errors2 = Partial<Record<keyof Omit<Step2, "children">, string>>;

const EMPTY1: Step1 = { firstName: "", lastName: "", email: "", countryCode: "AE", phone: "", message: "" };
const EMPTY2: Step2 = { travelDate: "", countryCity: "", adults: "", children: "" };

// ── Shared primitives ─────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
      {children}
    </p>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-[12px] text-red-500" style={{ fontFamily: "var(--font-secondary)" }}>
      {msg}
    </p>
  );
}

function TextInput({
  placeholder, value, onChange, type = "text", hasError,
}: { placeholder: string; value: string; onChange: (v: string) => void; type?: string; hasError?: boolean }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-10 w-full rounded-xs bg-[#f1f1f1] px-4 text-base text-dark-500 placeholder-[#999] outline-none ring-1 ${hasError ? "ring-red-400" : "ring-transparent focus:ring-brown-300"}`}
      style={{ fontFamily: "var(--font-secondary)", fontSize: 16 }}
    />
  );
}

function Textarea({ placeholder, value, onChange, hasError }: { placeholder: string; value: string; onChange: (v: string) => void; hasError?: boolean }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className={`w-full resize-none rounded-xs bg-[#f1f1f1] px-4 py-3 text-dark-500 placeholder-[#999] outline-none ring-1 ${hasError ? "ring-red-400" : "ring-transparent focus:ring-brown-300"}`}
      style={{ fontFamily: "var(--font-secondary)", minHeight: 80, fontSize: 16 }}
    />
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function PhoneInput({
  countryCode, phone, onCountryChange, onPhoneChange, hasError,
}: { countryCode: string; phone: string; onCountryChange: (v: string) => void; onPhoneChange: (v: string) => void; hasError?: boolean }) {
  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];
  return (
    <div className={`flex h-10 w-full overflow-hidden rounded-xs bg-[#f1f1f1] ring-1 ${hasError ? "ring-red-400" : "ring-transparent focus-within:ring-brown-300"}`}>
      <div className="relative flex shrink-0 items-center px-3">
        <select
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="Country code"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.dial})</option>
          ))}
        </select>
        <span className="mr-1 text-base leading-none" aria-hidden>{country.flag}</span>
        <svg className="mr-1.5 shrink-0" width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1L4.5 5L8 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span className="text-[13px] font-medium text-dark-500" style={{ fontFamily: "var(--font-secondary)" }}>
          {country.dial}
        </span>
      </div>
      <div className="my-3 w-px bg-[#cfbcad]" />
      <input
        type="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Enter your contact number"
        className="min-w-0 flex-1 bg-transparent px-3 text-dark-500 placeholder-[#999] outline-none"
        style={{ fontFamily: "var(--font-secondary)", fontSize: 16 }}
      />
    </div>
  );
}

function SelectInput({
  value, onChange, placeholder, options, hasError,
}: { value: string; onChange: (v: string) => void; placeholder: string; options: string[]; hasError?: boolean }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-10 w-full appearance-none rounded-xs bg-[#f1f1f1] px-4 outline-none ring-1 ${hasError ? "ring-red-400" : "ring-transparent focus:ring-brown-300"}`}
        style={{ fontFamily: "var(--font-secondary)", fontSize: 16, color: value ? "#151515" : "#999" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} style={{ color: "#151515" }}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path d="M1 1L6 6L11 1" stroke="#555" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────
function Step1Form({ data, onChange, onNext }: {
  data: Step1; onChange: (d: Partial<Step1>) => void; onNext: () => void;
}) {
  const [errors, setErrors] = useState<Errors1>({});
  const [tried, setTried] = useState(false);

  function validate(d: Step1): Errors1 {
    const e: Errors1 = {};
    if (!d.firstName.trim())  e.firstName = "First name is required";
    if (!d.lastName.trim())   e.lastName  = "Last name is required";
    if (!d.email.trim())      e.email     = "Email address is required";
    else if (!isValidEmail(d.email)) e.email = "Please enter a valid email address";
    if (!d.phone.trim())      e.phone     = "Phone number is required";
    else if (!isValidPhone(d.phone)) e.phone = "Please enter a valid phone number";
    if (!d.message.trim())    e.message   = "Please tell us about your journey";
    return e;
  }

  // Re-validate live after first attempt so errors clear as user corrects them.
  useEffect(() => {
    if (tried) setErrors(validate(data));
  }, [data, tried]);

  function handleNext() {
    setTried(true);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First Name*">
          <TextInput placeholder="Enter your first name" value={data.firstName} onChange={(v) => onChange({ firstName: v })} hasError={!!errors.firstName} />
          <FieldError msg={errors.firstName} />
        </Field>
        <Field label="Last Name*">
          <TextInput placeholder="Enter your last name" value={data.lastName} onChange={(v) => onChange({ lastName: v })} hasError={!!errors.lastName} />
          <FieldError msg={errors.lastName} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Email*">
          <TextInput placeholder="Enter your email address" value={data.email} onChange={(v) => onChange({ email: v })} type="email" hasError={!!errors.email} />
          <FieldError msg={errors.email} />
        </Field>
        <Field label="Contact Number*">
          <PhoneInput countryCode={data.countryCode} phone={data.phone}
            onCountryChange={(v) => onChange({ countryCode: v })} onPhoneChange={(v) => onChange({ phone: v })} hasError={!!errors.phone} />
          <FieldError msg={errors.phone} />
        </Field>
      </div>
      <Field label="Tell us about your journey*">
        <Textarea placeholder="Share your ideas and initial plans" value={data.message} onChange={(v) => onChange({ message: v })} hasError={!!errors.message} />
        <FieldError msg={errors.message} />
      </Field>
      <div className="h-px bg-[#ddd0c5]" />
      <button
        onClick={handleNext}
        className="h-10 w-fit rounded-xs bg-dark-500 px-8 text-[15px] text-white transition-opacity hover:opacity-80"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        Next
      </button>
    </div>
  );
}

function Step2Form({ data, onChange, onBack, onSubmit }: {
  data: Step2; onChange: (d: Partial<Step2>) => void; onBack: () => void; onSubmit: () => void;
}) {
  const [errors, setErrors] = useState<Errors2>({});
  const [tried, setTried] = useState(false);

  function validate(d: Step2): Errors2 {
    const e: Errors2 = {};
    if (!d.travelDate.trim())  e.travelDate  = "Please enter an approximate travel date";
    if (!d.countryCity.trim()) e.countryCity = "Please enter your country and city";
    if (!d.adults)             e.adults      = "Please select the number of adults";
    return e;
  }

  useEffect(() => {
    if (tried) setErrors(validate(data));
  }, [data, tried]);

  function handleSubmit() {
    setTried(true);
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length === 0) onSubmit();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Field label="Approx. Date of Traveling*">
          <TextInput
            placeholder="Enter approx. date/month"
            value={data.travelDate}
            onChange={(v) => onChange({ travelDate: v })}
            hasError={!!errors.travelDate}
          />
          <FieldError msg={errors.travelDate} />
        </Field>
        <Field label="Your Country and City*">
          <TextInput
            placeholder="Enter your country and city"
            value={data.countryCity}
            onChange={(v) => onChange({ countryCity: v })}
            hasError={!!errors.countryCity}
          />
          <FieldError msg={errors.countryCity} />
        </Field>
        <Field label="Guest Details*">
          <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-1">
              <SelectInput
                value={data.adults}
                onChange={(v) => onChange({ adults: v })}
                placeholder="Adults"
                options={["1","2","3","4","5","6","7","8+"]}
                hasError={!!errors.adults}
              />
            </div>
            <div className="flex-1">
              <SelectInput
                value={data.children}
                onChange={(v) => onChange({ children: v })}
                placeholder="Children"
                options={["0","1","2","3","4","5+"]}
              />
            </div>
          </div>
          <FieldError msg={errors.adults} />
        </Field>
      </div>

      <div className="h-px bg-[#ddd0c5]" />

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-10 rounded-xs border border-dark-500 px-5 text-[15px] text-dark-500 hover:bg-[#f1f1f1]"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className="h-10 rounded-xs bg-dark-500 px-5 text-[15px] text-white transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Submit Enquiry
        </button>
      </div>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5e6c51]">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path d="M6 14L11.5 19.5L22 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[24px] leading-tight text-dark-500" style={{ fontFamily: "var(--font-primary)" }}>
          Enquiry Sent Successfully
        </h3>
        <p className="max-w-[420px] text-[14px] leading-relaxed text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
          Thank you for reaching out. One of our journey designers will be in touch within 24 hours.
        </p>
      </div>
      <button
        onClick={onClose}
        className="h-10 rounded-xs bg-dark-500 px-8 text-[15px] text-white"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        Close
      </button>
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ journeyTitle, onClose }: { journeyTitle: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [step1, setStep1] = useState<Step1>(EMPTY1);
  const [step2, setStep2] = useState<Step2>(EMPTY2);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function handleClose() {
    if (exiting) return;
    setExiting(true);
    setVisible(false);
    setTimeout(onClose, 280);
  }

  const stepLabel = step === 1 ? "1 / 2" : step === 2 ? "2 / 2" : null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ transition: "opacity 280ms ease", opacity: visible ? 1 : 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

        {/* Panel */}
        <div
          className="modal-panel relative w-full max-w-[1020px] overflow-hidden rounded-[4px] border border-[#ddd0c5] bg-[#f7f4f1]"
          style={{
            transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 sm:px-10 sm:pt-7">
            <div className="flex items-start justify-between gap-4">
              <h2
                className="text-[18px] leading-snug text-dark-500 sm:text-[24px] xl:text-[30px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Send Your Enquiry for<br />
                <span className="font-medium">{journeyTitle}</span>
              </h2>
              <button
                onClick={handleClose}
                className="mt-1 shrink-0 rounded-full p-1.5 transition-colors hover:bg-[#ddd0c5]"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4L14 14" stroke="#151515" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="mt-4 h-px w-full bg-[#ddd0c5]" />

            {stepLabel && (
              <div className="mt-2.5 flex items-center gap-3">
                <p className="text-[12px] text-[#777]" style={{ fontFamily: "var(--font-secondary)" }}>
                  Step {stepLabel}
                </p>
                <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-[#ddd0c5]">
                  <div
                    className="h-full rounded-full bg-dark-500 transition-all duration-500"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-5 pb-5 pt-4 sm:px-10 sm:pb-7 sm:pt-5">
            <div className="rounded-xs bg-white p-4 sm:p-6">
              {step === 1 && (
                <Step1Form
                  data={step1}
                  onChange={(d) => setStep1((p) => ({ ...p, ...d }))}
                  onNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <Step2Form
                  data={step2}
                  onChange={(d) => setStep2((p) => ({ ...p, ...d }))}
                  onBack={() => setStep(1)}
                  onSubmit={() => {
                    const dialCode = COUNTRIES.find((c) => c.code === step1.countryCode)?.dial ?? "";
                    fetch("/api/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        type: "enquiry",
                        journeyTitle,
                        firstName: step1.firstName,
                        lastName: step1.lastName,
                        email: step1.email,
                        phone: `${dialCode} ${step1.phone}`.trim(),
                        message: step1.message,
                        travelDate: step2.travelDate,
                        countryCity: step2.countryCity,
                        adults: step2.adults,
                        children: step2.children,
                      }),
                    });
                    setStep("done");
                  }}
                />
              )}
              {step === "done" && <SuccessView onClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────
export function EnquireButton({
  journeyTitle,
  label = "Enquire Now",
  className,
  style,
}: {
  journeyTitle: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button className={className} style={style} onClick={() => setOpen(true)}>
        {label}
      </button>
      {open && <Modal journeyTitle={journeyTitle} onClose={close} />}
    </>
  );
}
