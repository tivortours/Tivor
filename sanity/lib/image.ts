import imageUrlBuilder from "@sanity/image-url";

import { client } from "./client";

const builder = imageUrlBuilder(client);

// Optional custom subdomain (e.g. images.tivortours.com) that Cloudflare
// proxies in front of cdn.sanity.io with its own cache rules, so repeat
// image requests are served from Cloudflare's edge instead of billing
// against Sanity's own CDN bandwidth. Unset in dev/until DNS is live, in
// which case URLs point straight at cdn.sanity.io as before.
const imageCdnHost = process.env.NEXT_PUBLIC_SANITY_IMAGE_CDN_HOST?.trim();

export function toImageCdnUrl(url: string) {
  return imageCdnHost ? url.replace("cdn.sanity.io", imageCdnHost) : url;
}

type SanityImageLike = {
  asset?: unknown;
} | null;

export function urlForImage(source: SanityImageLike) {
  return source ? builder.image(source).auto("format") : null;
}
