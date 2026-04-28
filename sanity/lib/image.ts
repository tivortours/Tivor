import imageUrlBuilder from "@sanity/image-url";

import { client } from "./client";

const builder = imageUrlBuilder(client);

type SanityImageLike = {
  asset?: unknown;
} | null;

export function urlForImage(source: SanityImageLike) {
  return source ? builder.image(source).auto("format") : null;
}
