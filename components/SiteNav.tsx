const LOGO_LIGHT = "https://www.figma.com/api/mcp/asset/c1542984-59fb-4b7d-9958-030e9dbee24f";

const NAV_ITEMS = ["Destinations", "Journeys", "Inspiration", "About"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

const shell = "mx-auto w-full max-w-[1520px] px-5 sm:px-8 lg:px-12 xl:px-[130px]";

export function SiteNav({ active }: { active?: NavItem }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10">
      <div className={`${shell} flex flex-col gap-6 py-6 sm:py-8 xl:py-[50px]`}>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <a href="/" className="h-[23px] w-[152px] shrink-0">
            <img src={LOGO_LIGHT} alt="TIVOR" className="h-full w-full object-contain" />
          </a>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 xl:justify-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`flex h-[45px] items-center text-[18px] text-white ${
                  item === active ? "border-b-[0.5px] border-white" : ""
                }`}
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <a
              href="#"
              className="flex h-[45px] items-center rounded-[2px] border border-white px-5 text-base text-white sm:px-6 sm:text-[18px]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Plan Your Journey
            </a>
            <a
              href="#"
              className="flex h-[45px] items-center rounded-[2px] bg-white px-5 text-base text-[#151515] sm:px-6 sm:text-[18px]"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
