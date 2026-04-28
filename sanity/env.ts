function optionalValue(value: string | undefined) {
  return value?.trim() || "";
}

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-01";
export const dataset = optionalValue(process.env.NEXT_PUBLIC_SANITY_DATASET);
export const projectId = optionalValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const studioBasePath = "/studio";

export const isSanityConfigured = Boolean(projectId && dataset);
