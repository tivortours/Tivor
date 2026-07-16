import { getDestinations, shell } from "../site-data";
import { SiteHeader, SiteFooter } from "../site-ui";
import PlanForm from "./PlanForm";

export const metadata = {
  title: "Plan Your Journey | Tivor",
  description:
    "Share your dreams and travel preferences. Our journey designers will craft a bespoke experience tailored just for you.",
};

export default async function PlanPage() {
  const destinations = await getDestinations();
  const destinationNames = destinations.map((d) => d.name);

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-[#f2ebe2]">

      {/* Header */}
      <div className="bg-[#f2ebe2]">
        <SiteHeader active="" overlay={false} />
      </div>

      {/* Hero */}
      <section className="bg-[#f2ebe2] pt-[60px]">
        <div className={`${shell} flex flex-col items-center gap-6 text-center`}>
          <h1
            className="max-w-[766px] text-[26px] leading-tight text-[#151515] sm:text-[32px] xl:text-[48px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            Let's Start Planning Your Journey
          </h1>
          <p
            className="max-w-[700px] text-[16px] leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Share your travel preferences, and we'll transform them into a thoughtfully
            curated journey. From the first idea to the final detail, we craft journeys that
            feel personal and truly unforgettable.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="bg-[#f2ebe2] py-[60px] xl:py-[80px]">
        <div className={shell}>
          <PlanForm destinations={destinationNames} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
