import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { Index } from "../../__registry__";
import { UnistNode, UnistTree } from "../../types/unist";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        if (!name && !srcPath) {
          return null;
        }

        try {
          let src: string;

          if (srcPath) {
            src = srcPath as string;
          } else {
            const component = Index["default"][name];
            src = fileName
              ? component.files.find((file: string) => {
                  return (
                    file.endsWith(`${fileName}.tsx`) ||
                    file.endsWith(`${fileName}.ts`)
                  );
                }) || component.files[0]
              : component.files[0];
            console.log("src2", src);
          }

          // Read the source file.
          const filePath = path.join(process.cwd(), src);

          let source = fs.readFileSync(filePath, "utf8");
          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`@/registry/`, "@/components/");
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              attributes: [
                {
                  name: "styleName",
                  type: "mdxJsxAttribute",
                  value: "default",
                },
              ],
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_source_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (
        node.name === "ComponentCodePreview" ||
        node.name === "BlockPreview"
      ) {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const component = Index["default"][name];
          const src = component.files[0];

          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(`${filePath}`, "utf8");

          source = source.replaceAll(`@/registry/`, "@/components/");
          source = source.replaceAll("export default", "export");

          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_usage_code"`,
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}