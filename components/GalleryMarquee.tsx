import Image from "next/image";

// Continuous horizontal scroll of gallery photos. The track is duplicated
// once so translateX(-50%) loops seamlessly regardless of image count or
// viewport width — pure CSS animation (see .animate-gallery-marquee in
// globals.css), no JS needed.
export function GalleryMarquee({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  const track = [...images, ...images];
  const duration = Math.max(images.length * 5, 20);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="animate-gallery-marquee flex w-max gap-4 sm:gap-6"
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] h-56 flex-none overflow-hidden rounded-xs sm:h-72 lg:h-88"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
