"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

// ── Form data types ───────────────────────────────────────────────────────────
type Step1 = {
  firstName: string; lastName: string; email: string;
  countryCode: string; phone: string; message: string;
};
type Step2 = {
  travelDate: string; countryCity: string;
  adults: string; children: string;
};

const EMPTY1: Step1 = { firstName: "", lastName: "", email: "", countryCode: "AE", phone: "", message: "" };
const EMPTY2: Step2 = { travelDate: "", countryCity: "", adults: "", children: "" };

// ── Shared primitives ─────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
      {children}
    </p>
  );
}

function TextInput({
  placeholder, value, onChange, type = "text",
}: { placeholder: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-[56px] w-full rounded-[2px] bg-[#f1f1f1] px-5 text-[14px] text-[#151515] placeholder-[#999] outline-none focus:ring-1 focus:ring-[#cfbcad] sm:h-[64px]"
      style={{ fontFamily: "var(--font-secondary)" }}
    />
  );
}

function Textarea({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={5}
      className="w-full resize-none rounded-[2px] bg-[#f1f1f1] px-5 py-4 text-[14px] text-[#151515] placeholder-[#999] outline-none focus:ring-1 focus:ring-[#cfbcad]"
      style={{ fontFamily: "var(--font-secondary)", minHeight: 140 }}
    />
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function PhoneInput({
  countryCode, phone, onCountryChange, onPhoneChange,
}: { countryCode: string; phone: string; onCountryChange: (v: string) => void; onPhoneChange: (v: string) => void }) {
  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];
  return (
    <div className="flex h-[56px] w-full overflow-hidden rounded-[2px] bg-[#f1f1f1] focus-within:ring-1 focus-within:ring-[#cfbcad] sm:h-[64px]">
      {/* Country picker */}
      <div className="relative flex shrink-0 items-center px-3 sm:px-4">
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
        <span className="mr-1 text-xl leading-none" aria-hidden>{country.flag}</span>
        <svg className="mr-2 shrink-0" width="9" height="6" viewBox="0 0 9 6" fill="none">
          <path d="M1 1L4.5 5L8 1" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span className="text-[13px] font-medium text-[#151515]" style={{ fontFamily: "var(--font-secondary)" }}>
          {country.dial}
        </span>
      </div>
      {/* Divider */}
      <div className="my-4 w-px bg-[#cfbcad]" />
      {/* Number */}
      <input
        type="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Enter your contact number"
        className="min-w-0 flex-1 bg-transparent px-4 text-[14px] text-[#151515] placeholder-[#999] outline-none"
        style={{ fontFamily: "var(--font-secondary)" }}
      />
    </div>
  );
}

function SelectInput({
  value, onChange, placeholder, options,
}: { value: string; onChange: (v: string) => void; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[56px] w-full appearance-none rounded-[2px] bg-[#f1f1f1] px-5 text-[14px] outline-none focus:ring-1 focus:ring-[#cfbcad] sm:h-[64px]"
        style={{ fontFamily: "var(--font-secondary)", color: value ? "#151515" : "#999" }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} style={{ color: "#151515" }}>{o}</option>)}
      </select>
      <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path d="M1 1L6 6L11 1" stroke="#555" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────
function Step1Form({ data, onChange, onNext }: {
  data: Step1; onChange: (d: Partial<Step1>) => void; onNext: () => void;
}) {
  const valid = data.firstName && data.lastName && data.email && data.phone && data.message;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name*">
          <TextInput placeholder="Enter your first name" value={data.firstName} onChange={(v) => onChange({ firstName: v })} />
        </Field>
        <Field label="Last Name*">
          <TextInput placeholder="Enter your last name" value={data.lastName} onChange={(v) => onChange({ lastName: v })} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email*">
          <TextInput placeholder="Enter your email address" value={data.email} onChange={(v) => onChange({ email: v })} type="email" />
        </Field>
        <Field label="Contact Number*">
          <PhoneInput countryCode={data.countryCode} phone={data.phone}
            onCountryChange={(v) => onChange({ countryCode: v })} onPhoneChange={(v) => onChange({ phone: v })} />
        </Field>
      </div>
      <Field label="Tell us about your journey*">
        <Textarea placeholder="Share your ideas and initial plans" value={data.message} onChange={(v) => onChange({ message: v })} />
      </Field>
      <div className="h-px bg-[#ddd0c5]" />
      <button
        onClick={() => valid && onNext()}
        className={`h-[45px] w-fit rounded-[2px] px-8 text-[17px] text-white transition-opacity ${valid ? "bg-[#151515]" : "bg-[#151515]/40 cursor-not-allowed"}`}
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
  const valid = data.travelDate && data.countryCity && data.adults;
  return (
    <div className="flex flex-col gap-7">
      {/* 3-column row */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
        <Field label="Approx. Date of Traveling*">
          <TextInput
            placeholder="Enter approx. date/month"
            value={data.travelDate}
            onChange={(v) => onChange({ travelDate: v })}
          />
        </Field>
        <Field label="Your Country and City*">
          <TextInput
            placeholder="Enter your country and city"
            value={data.countryCity}
            onChange={(v) => onChange({ countryCity: v })}
          />
        </Field>
        <Field label="Guest Details*">
          <div className="flex gap-2">
            <SelectInput
              value={data.adults}
              onChange={(v) => onChange({ adults: v })}
              placeholder="Adults"
              options={["1","2","3","4","5","6","7","8+"]}
            />
            <SelectInput
              value={data.children}
              onChange={(v) => onChange({ children: v })}
              placeholder="Childrens"
              options={["0","1","2","3","4","5+"]}
            />
          </div>
        </Field>
      </div>

      <div className="h-px bg-[#ddd0c5]" />

      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="h-[45px] rounded-[2px] border border-[#151515] px-6 text-[18px] text-[#151515] hover:bg-[#f1f1f1]"
          style={{ fontFamily: "var(--font-secondary)" }}
        >
          Go Back
        </button>
        <button
          onClick={() => { if (valid) onSubmit(); }}
          className={`h-[45px] rounded-[2px] px-6 text-[18px] text-white transition-opacity ${valid ? "bg-[#151515]" : "bg-[#151515]/40 cursor-not-allowed"}`}
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
    <div className="flex flex-col items-center gap-8 py-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5e6c51]">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M6 14L11.5 19.5L22 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-[28px] leading-tight text-[#151515]" style={{ fontFamily: "var(--font-primary)" }}>
          Enquiry Sent Successfully
        </h3>
        <p className="max-w-[420px] text-[15px] leading-relaxed text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
          Thank you for reaching out. One of our journey designers will be in touch within 24 hours.
        </p>
      </div>
      <button
        onClick={onClose}
        className="h-[45px] rounded-[2px] bg-[#151515] px-8 text-[17px] text-white"
        style={{ fontFamily: "var(--font-secondary)" }}
      >
        Close
      </button>
    </div>
  );
}

// ── Modal (handles its own animation) ────────────────────────────────────────
function Modal({ journeyTitle, onClose }: { journeyTitle: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [step1, setStep1] = useState<Step1>(EMPTY1);
  const [step2, setStep2] = useState<Step2>(EMPTY2);
  const [exiting, setExiting] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Trigger enter animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Close on Escape
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

  function goStep(next: 1 | 2 | "done") {
    setStep(next);
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  const stepLabel = step === 1 ? "1 / 2" : step === 2 ? "2 / 2" : null;

  return (
    /* Full-screen overlay */
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ transition: "opacity 280ms ease", opacity: visible ? 1 : 0 }}
    >
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* Centering wrapper — allows scrolling on small screens */}
      <div className="relative flex min-h-full items-end justify-center sm:items-center sm:p-6">
        {/* Panel */}
        <div
          className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[4px] border border-[#ddd0c5] bg-[#f7f4f1] sm:max-h-[88dvh] sm:max-w-[1020px] sm:rounded-[2px]"
          style={{
            transition: "transform 280ms cubic-bezier(0.4,0,0.2,1)",
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* ── Fixed header ─────────────────────────────────────────────── */}
          <div className="shrink-0 px-6 pt-7 sm:px-14 sm:pt-12">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <h2
                className="text-[22px] leading-snug text-[#151515] sm:text-[30px] xl:text-[36px]"
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
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14M4 4L14 14" stroke="#151515" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mt-5 h-px w-full bg-[#ddd0c5]" />

            {/* Step indicator */}
            {stepLabel && (
              <div className="mt-3 flex items-center gap-3">
                <p className="text-[13px] text-[#777]" style={{ fontFamily: "var(--font-secondary)" }}>
                  Step {stepLabel}
                </p>
                <div className="flex h-1 flex-1 overflow-hidden rounded-full bg-[#ddd0c5]">
                  <div
                    className="h-full rounded-full bg-[#151515] transition-all duration-500"
                    style={{ width: step === 1 ? "50%" : step === 2 ? "100%" : "100%" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Scrollable body ───────────────────────────────────────────── */}
          <div
            ref={bodyRef}
            className="overflow-y-auto overscroll-contain px-6 py-6 sm:px-14 sm:py-8"
            style={{ scrollbarWidth: "none" }}
          >
            {/* White form card */}
            <div className="rounded-[2px] bg-white p-5 sm:p-8">
              {step === 1 && (
                <Step1Form
                  data={step1}
                  onChange={(d) => setStep1((p) => ({ ...p, ...d }))}
                  onNext={() => goStep(2)}
                />
              )}
              {step === 2 && (
                <Step2Form
                  data={step2}
                  onChange={(d) => setStep2((p) => ({ ...p, ...d }))}
                  onBack={() => goStep(1)}
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
                    goStep("done");
                  }}
                />
              )}
              {step === "done" && <SuccessView onClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
    </div>
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
