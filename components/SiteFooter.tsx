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

export function SiteFooter() {
  return (
    <footer className="w-full">

      {/* Newsletter */}
      <div className="relative overflow-hidden">
        <img src={ASSETS.newsletterBg} alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none" />
        <div className="absolute inset-0 bg-[#20282d]/30" />
        <div className={`${shell} relative py-16 lg:py-[60px]`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[520px] space-y-5 text-white">
              <p
                className="max-w-[313px] text-[34px] leading-tight sm:text-[36px]"
                style={{ fontFamily: "var(--font-primary)" }}
              >
                Subscribe For Insider Travel Access
              </p>
              <p className="text-base opacity-90" style={{ fontFamily: "var(--font-secondary)" }}>
                Subscribe to our newsletter and receive expert travel inspiration, insider tips.
              </p>
            </div>
            <div className="flex w-full max-w-[430px] flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-[45px] flex-1 rounded-[2px] bg-[#f1f1f1] px-5 text-sm text-[#899195] outline-none sm:rounded-r-none"
                style={{ fontFamily: "var(--font-secondary)" }}
              />
              <button
                className="h-[45px] rounded-[2px] bg-[#344149] px-6 text-base text-white sm:rounded-l-none sm:text-[18px]"
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
        <div className={`${shell} flex flex-col gap-10 py-12 sm:py-[60px]`}>

          {/* Top bar */}
          <div className="flex flex-col gap-6 border-b border-[#576168] pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-[37px] w-[48px] shrink-0">
                <img src={ASSETS.footerIcon} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="h-[25px] w-[165px] shrink-0">
                <img src={ASSETS.logoDark} alt="TIVOR" className="h-full w-full object-contain" />
              </div>
            </div>
            <button
              className="h-[45px] w-fit rounded-[2px] bg-white px-6 text-base text-[#151515] sm:text-[18px]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Plan Your Journey
            </button>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-6">
            {footerColumns.map((col) => (
              <div key={col.head} className="flex flex-col gap-3">
                <span
                  className="text-base font-semibold text-[#899195]"
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
          <div className="flex flex-col gap-6 border-t border-[#576168] pt-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-1">
              <img src={ASSETS.copyright} alt="©" className="h-5 w-5 object-contain" />
              <span className="text-sm text-[#899195]" style={{ fontFamily: "var(--font-secondary)" }}>
                2026
              </span>
              <span className="text-sm text-white" style={{ fontFamily: "var(--font-secondary)" }}>
                {" "}TIVOR . All Rights Reserved
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 lg:gap-8">
              <span
                className="text-base font-semibold text-[#899195]"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                Follow Us On
              </span>
              <div className="flex items-center gap-8">
                <a href="#" aria-label="Instagram">
                  <img src={ASSETS.instagram} alt="Instagram" className="h-6 w-6 object-contain" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <img src={ASSETS.linkedin} alt="LinkedIn" className="h-9 w-9 object-contain" />
                </a>
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
