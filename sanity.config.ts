import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId, studioBasePath } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: studioBasePath,
  dataset: dataset || "production",
  name: "default",
  plugins: [structureTool()],
  projectId: projectId || "placeholder",
  schema: {
    types: schemaTypes,
  },
  title: "Tivor Studio",
});
