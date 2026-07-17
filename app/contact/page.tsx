import { getSiteSettings, shell } from "../site-data";
import { SiteHeader, SiteFooter } from "../site-ui";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Tivor",
  description:
    "Get in touch with our journey designers. Share your travel dreams and we'll craft a bespoke experience tailored just for you.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

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
            Let&apos;s Begin Your Journey Together
          </h1>
          <p
            className="max-w-[918px] text-[16px] leading-relaxed text-[#3d3d3d]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Every extraordinary journey begins with a simple conversation. Whether
            you are seeking inspiration, refining an idea, or ready to create your next
            bespoke escape, our Travel Designers are here to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Form + Image card */}
      <section className="bg-[#f2ebe2] py-[60px] xl:py-[80px]">
        <div className={shell}>
          <ContactForm contactImage={settings.contactImage} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
