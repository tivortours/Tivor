import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: {
    dataset: dataset || "production",
    projectId: projectId || "placeholder",
  },
});
