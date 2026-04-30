import Image from "next/image";
import Link from "next/link";
import { getSiteSettings, shell } from "./site-data";
import { MobileMenu } from "../components/MobileMenu";

export function Label({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center justify-center border px-2 py-1 ${
        light ? "border-[#b5bfab] text-[#b5bfab]" : "border-[#576168] text-[#576168]"
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
      className={`inline-flex w-fit items-center border-b pb-1 text-base sm:text-lg ${
        light ? "border-white text-white" : "border-[#714128] text-[#714128]"
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
        className={`max-w-[32rem] text-[38px] leading-[1.05] sm:text-[44px] lg:text-[52px] ${
          light ? "text-white" : "text-[#151515]"
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
          <Link href="/" className="relative block h-[23px] w-[152px] shrink-0">
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
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
  if (p === "facebook") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (p === "linkedin") return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/>
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
        <div className={`${shell} relative py-16 lg:py-[60px]`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[520px] space-y-5 text-white">
              <p
                className="max-w-[313px] text-[34px] leading-tight sm:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {settings.newsletter.title}
              </p>
              <p className="text-base opacity-90" style={{ fontFamily: "var(--font-secondary)" }}>
                {settings.newsletter.body}
              </p>
            </div>

            <div className="flex w-full max-w-[430px] flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                placeholder={settings.newsletter.inputPlaceholder}
                className="h-[45px] flex-1 rounded-[2px] bg-[#f1f1f1] px-5 text-sm text-[#899195] outline-none sm:rounded-r-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
              <button
                className="h-[45px] rounded-[2px] bg-[#344149] px-6 text-base text-white sm:rounded-l-none sm:text-lg"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {settings.newsletter.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#20282d]">
        <div className={`${shell} flex flex-col gap-10 py-12 sm:py-[60px]`}>
          <div className="flex flex-col gap-6 border-b border-[#576168] pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-[37px] w-[48px] shrink-0">
                <Image src={settings.logos.footerIcon} alt="" fill className="object-contain" />
              </div>
              <Link href="/" className="relative block h-[25px] w-[165px] shrink-0">
                <Image src={settings.logos.dark} alt="TIVOR" fill className="object-contain" />
              </Link>
            </div>

            <Link
              href={settings.footer.ctaHref}
              className="h-[45px] w-fit rounded-[2px] bg-white px-6 py-[10px] text-base text-[#151515] sm:text-lg"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              {settings.footer.ctaLabel}
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-6">
            {settings.footer.columns.map((column) => (
              <div key={column.head} className="flex flex-col gap-3">
                <span
                  className="text-base font-semibold text-[#899195]"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {column.head}
                </span>
                {column.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="whitespace-pre-line text-base leading-relaxed text-white sm:text-[18px]"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-t border-[#576168] pt-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-1">
              {/* <Image src={settings.logos.copyright} alt="©" width={20} height={20} className="object-contain" />
              <span className="text-sm text-[#899195]" style={{ fontFamily: "var(--font-secondary)" }}>
                {settings.footer.year}
              </span> */}
              <span className="text-sm text-white" style={{ fontFamily: "var(--font-secondary)" }}>
                {" "}
                {settings.footer.copyrightText}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 lg:gap-8">
              <span
                className="text-base font-semibold text-[#899195]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {settings.footer.followLabel}
              </span>
              <div className="flex items-center gap-2">
                {settings.footer.socialLinks.map((social) => (
                  <Link key={social.platform} href={social.href} aria-label={social.platform} className="text-white transition-colors hover:text-[#899195]">
                    <SocialIcon platform={social.platform} />
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
              <span className="text-[#899195]">Designed &amp; Developed By</span>
              <span className="text-white"> mits</span>
            </p>
          </div>
        </div>
      </div>  
    </footer>
  );
}
