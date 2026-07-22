import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, shell } from "./site-data";
import { MobileMenu } from "../components/MobileMenu";
import { NewsletterForm } from "../components/NewsletterForm";

export function Label({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-center border px-2 py-1 ${light ? "border-[#b5bfab] text-[#b5bfab]" : "border-grey-400 text-grey-400"
        }`}
    >
      <span className="text-[10px] " style={{ fontFamily: "var(--font-secondary)" }}>
        {text}
      </span>
    </div>
  );
}

export function Diamond() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-px w-10 bg-[#cfbcad] sm:w-[50px]" />
      <div className="flex items-center gap-[3px]">
        {[4, 8, 4].map((size, index) => (
          <div key={index} className="rotate-45 bg-[#cfbcad]" style={{ width: size, height: size }} />
        ))}
      </div>
      <div className="h-px w-10 bg-[#cfbcad] sm:w-[50px]" />
    </div>
  );
}

export function LinkBtn({
  label,
  href = "#",
  light = false,
}: {
  label: string;
  href?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex w-fit items-center border-b pb-1 text-[12px] sm:text-lg ${light ? "border-white text-white" : "border-[#714128] text-[#714128]"
        }`}
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      {label}
    </Link>
  );
}

export function SectionHeading({
  label,
  title,
  light = false,
  centered = false,
}: {
  label: string;
  title: React.ReactNode;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
      <Label text={label} light={light} />
      <h2
        className={`max-w-[32rem] text-[24px] leading-[1.05] sm:text-[32px] lg:text-[52px] ${light ? "text-white" : "text-[#151515]"
          }`}
        style={{ fontFamily: "var(--font-primary)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export async function SiteHeader({
  light = false,
  active,
  overlay = true,
}: {
  light?: boolean;
  active?: string;
  overlay?: boolean;
}) {
  const settings = await getSiteSettings();
  const linkColor = light ? "text-white" : "text-[#151515]";
  const buttonBorder = light ? "border-white text-white" : "border-[#151515] text-[#151515]";
  const buttonSolid = light ? "bg-white text-[#151515]" : "bg-[#151515] text-white";
  const activeBorder = light ? "border-b-[0.5px] border-white" : "border-b-[0.5px] border-[#151515]";
  const outlineAction =
    settings.headerActions.find((action) => action.variant === "outline") || settings.headerActions[0];
  const solidAction =
    settings.headerActions.find((action) => action.variant === "solid") || settings.headerActions[1] || outlineAction;

  const logoSrc = light ? settings.logos.light : settings.logos.onLight;

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-20" : "relative w-full"}>
      <div className={`${shell} py-5 sm:py-8 xl:py-[50px]`}>

        {/* Mobile: logo + hamburger */}
        <div className="flex items-center justify-between xl:hidden">
          <Link href="/" className="relative block h-[23px] w-[90px] lg:w-[152px] shrink-0">
            <Image src={logoSrc} alt="TIVOR" fill className="object-contain" />
          </Link>
          <MobileMenu
            navItems={settings.navItems}
            outlineAction={{ label: outlineAction?.label || "Plan Your Journey", href: outlineAction?.href || "#" }}
            solidAction={{ label: solidAction?.label || "Contact Us", href: solidAction?.href || "#" }}
            active={active}
            logoSrc={logoSrc}
            light={light}
          />
        </div>

        {/* Desktop: logo + nav + CTAs */}
        <div className="hidden xl:flex xl:items-center xl:justify-between">
          <Link href="/" className="relative block h-[23px] w-[152px] shrink-0">
            <Image src={logoSrc} alt="TIVOR" fill className="object-contain" />
          </Link>

          <nav className="flex items-center gap-x-6">
            {settings.navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`flex h-[45px] items-center text-lg ${linkColor} ${label === active ? activeBorder : ""}`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={outlineAction?.href || "#"}
              className={`flex h-[45px] items-center rounded-[2px] border px-6 text-lg ${buttonBorder}`}
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {outlineAction?.label || "Plan Your Journey"}
            </Link>
            <Link
              href={solidAction?.href || "#"}
              className={`flex h-[45px] items-center rounded-[2px] px-6 text-lg ${buttonSolid}`}
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {solidAction?.label || "Contact Us"}
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p === "instagram") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
  if (p === "facebook") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (p === "linkedin") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
  return <img src="" alt={platform} width={24} height={24} />;
}

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="w-full">
      <div className="relative overflow-hidden">

        <Image src={settings.newsletter.backgroundImage} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[#20282d]/30" />
        <div className={`${shell} relative py-16 lg:py-[100px]`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:px-16 xl:px-20">
            <div className="max-w-[520px] space-y-5 text-white">
              <p
                className="max-w-full text-[28px] leading-tight sm:text-[32px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
               Join the TIVOR Journal
              
              </p>
              <h4 className="text-base opacity-90" style={{ fontFamily: "var(--font-secondary)" }}>
                {settings.newsletter.body}
              </h4>
            </div>

            <NewsletterForm
              placeholder={settings.newsletter.inputPlaceholder}
              buttonLabel={settings.newsletter.buttonLabel}
            />
          </div>
        </div>

      </div>

      <div className="bg-[#20282d]">
        <div className={`${shell} flex flex-col gap-10 py-12 sm:py-[60px]`}>
          {/* Logo + CTA */}
          <div className="flex flex-col items-center gap-6 border-b-0 lg:border-b lg:border-grey-400 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-[44px] w-[48px] shrink-0">
                <Image src={settings.logos.footerIcon} alt="" fill className="object-contain" />
              </div>
              <Link href="/" className="relative block h-[22px] w-[165px] shrink-0">
                <Image src={'/tivor.svg'} alt="TIVOR" fill className="object-contain" />
              </Link>
            </div>

            <Link
              href={settings.footer.ctaHref}
              className="flex h-11.25 w-fit px-2 items-center justify-center rounded-xs bg-white text-base text-dark-500 lg:w-fit lg:px-6 lg:text-lg"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {settings.footer.ctaLabel}
            </Link>
          </div>

          {/* Link columns — accordion on mobile, grid on desktop */}
          <div className="flex flex-col divide-y divide-grey-400 lg:hidden">
            {settings.footer.columns.map((column) => (
              <details key={column.head} className="group">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  <span className="text-[14px] font-semibold text-grey-300">{column.head}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-grey-300 transition-transform duration-200 group-open:rotate-180">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="flex flex-col gap-3 pb-4">
                  {column.links.map((link) =>
                    link.href === "#" ? (
                      <span
                        key={link.label}
                        className="whitespace-pre-line text-[14px] leading-relaxed text-white cursor-default"
                        style={{ fontFamily: "var(--font-secondary)" }}
                      >
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="whitespace-pre-line text-[14px] leading-relaxed text-white"
                        style={{ fontFamily: "var(--font-secondary)" }}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="hidden lg:grid lg:gap-8 xl:grid-cols-6">
            {settings.footer.columns.map((column) => (
              <div key={column.head} className="flex flex-col gap-3">
                <span
                  className="text-base font-semibold text-grey-300"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {column.head}
                </span>
                {column.links.map((link) =>
                  link.href === "#" ? (
                    <span
                      key={link.label}
                      className="w-fit whitespace-pre-line text-white cursor-default lg:text-base xl:text-[18px]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="w-fit whitespace-pre-line text-white lg:text-base xl:text-[18px]"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center gap-4  border-t-0 lg:border-t lg:border-grey-400 pt-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Copyright — left on desktop */}
            <span className="text-[12px] text-white lg:order-1 lg:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
              {settings.footer.copyrightText}
            </span>

            {/* Social — center on desktop */}
            <div className="flex items-center gap-5 lg:order-2 lg:gap-8">
              <span className="text-[13px] font-semibold text-grey-300 lg:text-base" style={{ fontFamily: "var(--font-secondary)" }}>
                {settings.footer.followLabel}
              </span>
              <div className="flex items-center gap-6">
                {settings.footer.socialLinks.map((social) => (
                  <Link key={social.platform} href={social.href} aria-label={social.platform} className="text-white transition-colors hover:text-grey-300">
                    <SocialIcon platform={social.platform} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Designed & Developed — right on desktop */}
            <p className="text-[12px] lg:order-3 lg:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
              <span className="text-grey-300">Designed &amp; Developed By</span>
              <span className="text-white"> mits</span>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
