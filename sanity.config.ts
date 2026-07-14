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
      // Swap the auto-generated "Journey"/"Inspiration Article" lists for
      // drag-and-drop orderable ones; every other document type keeps its
      // default list item/position.
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items(
            S.documentTypeListItems().map((item) => {
              const id = item.getId();
              if (id === "journey") {
                return orderableDocumentListDeskItem({ type: "journey", title: "Journey", S, context });
              }
              if (id === "inspirationArticle") {
                return orderableDocumentListDeskItem({
                  type: "inspirationArticle",
                  title: "Inspiration Article",
                  S,
                  context,
                });
              }
              return item;
            })
          ),
    }),
  ],
  projectId: projectId || "placeholder",
  schema: {
    types: schemaTypes,
  },
  title: "Tivor Studio",
});
