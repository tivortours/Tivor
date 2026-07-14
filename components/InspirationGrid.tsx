"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Inspiration } from "../app/site-data";

function ArticleCard({ art }: { art: Inspiration }) {
  return (
    <Link href={`/inspiration/${art.slug}`} className="flex flex-col rounded-[2px] bg-[#f7f4f1] overflow-hidden group">
      <div className="relative aspect-[488/300] lg:aspect-[488/394] w-full overflow-hidden">
        <Image
          src={art.img}
          alt={art.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col justify-between gap-5 p-8 xl:p-10" style={{ minHeight: 220 }}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-[14px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
            <span>{art.date}</span>
            <span>|</span>
            <span>{art.destination}</span>
          </div>
          <h3
            className="text-[22px] font-medium leading-snug text-[#151515] xl:text-[24px]"
            style={{ fontFamily: "var(--font-primary)" }}
          >
            {art.title}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Image src={art.avatar} alt={art.author} width={60} height={60} className="shrink-0 rounded-full object-cover" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-medium text-[#151515] xl:text-[16px]" style={{ fontFamily: "var(--font-secondary)" }}>
              {art.author}
            </span>
            <span className="text-[12px] text-[#3d3d3d]" style={{ fontFamily: "var(--font-secondary)" }}>
              {art.role}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

type Props = {
  articles: Inspiration[];
  seeMoreLabel: string;
};

export function InspirationGrid({ articles, seeMoreLabel }: Props) {
  // "See more" state lives in the URL, not local state — so the browser
  // back/forward button (e.g. after opening an article's detail page)
  // restores exactly where the user left off, instead of resetting.
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showAll = searchParams.get("view") === "all";
  const visible = showAll ? articles : articles.slice(0, 6);

  function showMore() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "all");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((art) => <ArticleCard key={art.slug} art={art} />)}
      </div>
      {articles.length > 6 && !showAll && (
        <div className="flex justify-center pt-6">
          <button
            onClick={showMore}
            className="cursor-pointer h-[45px] rounded-[2px] bg-[#151515] px-6 text-[14px] lg:text-[18px] text-white"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            {seeMoreLabel}
          </button>
        </div>
      )}
    </div>
  );
}
