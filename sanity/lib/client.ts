import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioBasePath } from "../env";

const fallbackDataset = dataset || "production";
const fallbackProjectId = projectId || "placeholder";

export const client = createClient({
  apiVersion,
  dataset: fallbackDataset,
  projectId: fallbackProjectId,
  useCdn: true,
  stega: {
    studioUrl: studioBasePath,
  },
});

export const readClient = client.withConfig({ useCdn: false });
