const ASSETS = {
  newsletterBg: "https://www.figma.com/api/mcp/asset/2ece4d93-8477-46be-9f94-72c9b63e37a9",
  footerIcon:   "https://www.figma.com/api/mcp/asset/1713c2b7-db76-45dc-bf44-cac9ee81b759",
  logoDark:     "https://www.figma.com/api/mcp/asset/c12ea2a7-7f80-4925-a1f6-f774d96dc9e3",
  copyright:    "https://www.figma.com/api/mcp/asset/0bf10d4a-71e4-4510-8a1d-3c9de3c0ca8a",
  instagram:    "https://www.figma.com/api/mcp/asset/d266e143-1bda-4b6f-8755-72f510c5ff15",
  linkedin:     "https://www.figma.com/api/mcp/asset/5ad8eac6-88fd-4113-9977-860fec3084b2",
};

const footerColumns = [
  { head: "Quick Access", links: ["Destinations", "Journeys", "Experiences", "Inspiration", "About", "Career"] },
  { head: "Information", links: ["FAQs", "Privacy Policy", "Terms and Conditions", "Refund Policy"] },
  { head: "Resources", links: ["Blogs", "News", "Events"] },
  { head: "Top Destinations", links: ["Slovenia", "Iceland", "Norway"] },
  { head: "Contact Us", links: ["+971 4 555 7842", "travel@tivor.ae", "WhatsApp"] },
  { head: "Reach Us", links: ["Office 1204,\nAl Saqr Business Tower\nSheikh Zayed Road\nDubai, UAE"] },
];

const shell = "mx-auto w-full max-w-[1520px] px-5 sm:px-8 lg:px-12 xl:px-[130px]";

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform duration-200 group-open:rotate-180">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="w-full">

      {/* Newsletter */}
      <div className="relative overflow-hidden">
        <img src={ASSETS.newsletterBg} alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-[#20282d]/30" />
        <div className={`${shell} relative py-16 lg:py-15`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[520px] space-y-5 text-white">
              <p
                className="max-w-[313px] text-[28px] leading-tight sm:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Subscribe For Insider Travel Access
              </p>
              <p className="text-[13px] lg:text-base opacity-90" style={{ fontFamily: "var(--font-secondary)" }}>
                Subscribe to our newsletter and receive expert travel inspiration, insider tips.
              </p>
            </div>
            <div className="flex w-full max-w-[430px] flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-[45px] flex-1 rounded-xs bg-[#f1f1f1] px-5 text-sm text-grey-300 outline-none sm:rounded-r-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
              <button
                className="h-[45px] rounded-xs bg-grey-500 px-6 text-base text-white sm:rounded-l-none sm:text-[18px]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dark footer */}
      <div className="bg-[#20282d]">
        <div className={`${shell} flex flex-col gap-8 py-10 lg:gap-10 lg:py-15`}>

          {/* Top bar: logo + CTA */}
          <div className="flex flex-col gap-6 border-b border-grey-400 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[37px] w-[48px] shrink-0">
                <img src={ASSETS.footerIcon} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="h-[25px] w-[165px] shrink-0">
                <img src={ASSETS.logoDark} alt="TIVOR" className="h-full w-full object-contain" />
              </div>
            </div>
            <button
              className="h-[45px] w-full rounded-xs bg-white text-base text-dark-500 lg:w-fit lg:px-6 lg:text-[18px]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Plan Your Journey
            </button>
          </div>

          {/* Link columns — accordion on mobile, grid on desktop */}
          <div className="flex flex-col divide-y divide-grey-400 lg:hidden">
            {footerColumns.map((col) => (
              <details key={col.head} className="group">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  <span className="text-[14px] font-semibold text-grey-300">{col.head}</span>
                  <ChevronDown />
                </summary>
                <div className="flex flex-col gap-3 pb-4">
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[14px] leading-relaxed whitespace-pre-line text-white"
                      style={{ fontFamily: "var(--font-secondary)" }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <div className="hidden lg:grid lg:gap-8 xl:grid-cols-6">
            {footerColumns.map((col) => (
              <div key={col.head} className="flex flex-col gap-3">
                <span
                  className="text-base font-semibold text-grey-300"
                  style={{ fontFamily: "var(--font-secondary)" }}
                >
                  {col.head}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-base leading-relaxed whitespace-pre-line text-white sm:text-[18px]"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-5 border-t border-grey-400 pt-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Social — mobile: single row */}
            <div className="flex items-center gap-5 lg:order-2">
              <span
                className="text-[13px] font-semibold text-grey-300 lg:text-base"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Follow Us On
              </span>
              <div className="flex items-center gap-6">
                <a href="#" aria-label="Instagram" className="text-white hover:text-grey-300 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-white hover:text-grey-300 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2 lg:order-1">
              <div className="flex items-center gap-1">
                <img src={ASSETS.copyright} alt="©" className="h-5 w-5 object-contain" />
                <span className="text-[12px] text-grey-300 lg:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
                  2026
                </span>
                <span className="text-[12px] text-white lg:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
                  {" "}TIVOR . All Rights Reserved
                </span>
              </div>
              <p className="text-[12px] lg:text-sm" style={{ fontFamily: "var(--font-secondary)" }}>
                <span className="text-grey-300">Designed &amp; Developed By</span>
                <span className="text-white"> mits</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
