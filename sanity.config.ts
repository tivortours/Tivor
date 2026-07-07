import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import { dataset, projectId, studioBasePath } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: studioBasePath,
  dataset: dataset || "production",
  name: "default",
  plugins: [
    structureTool({
      // Swap the auto-generated "Journey" list for a drag-and-drop orderable
      // one; every other document type keeps its default list item/position.
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items(
            S.documentTypeListItems().map((item) =>
              item.getId() === "journey"
                ? orderableDocumentListDeskItem({ type: "journey", title: "Journey", S, context })
                : item
            )
          ),
    }),
  ],
  projectId: projectId || "placeholder",
  schema: {
    types: schemaTypes,
  },
  title: "Tivor Studio",
});
