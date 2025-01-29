// src/utils/rehype-component.ts
import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

// __registry__/index.tsx
import * as React from "react";
var Index = {
  default: {
    spotlight: {
      name: "spotlight",
      type: "registry:example",
      registryDependencies: ["spotlight"],
      files: ["src/registry/smooth-ui/spotlight.tsx"],
      component: React.lazy(() => import("@/registry/smooth-ui/spotlight.tsx")),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-talwindcss.config": {
      name: "spotlight-talwindcss.config",
      type: "registry:config",
      registryDependencies: ["spotlight-talwindcss.config"],
      files: ["src/registry/config/spotlight-talwindcss.config.ts"],
      component: React.lazy(
        () => import("@/registry/config/spotlight-talwindcss.config.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-demo": {
      name: "spotlight",
      type: "registry:example",
      registryDependencies: ["spotlight"],
      files: ["src/registry/example/spotlight-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/example/spotlight-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-card": {
      name: "spotlight-card",
      type: "registry:example",
      registryDependencies: ["spotlight-card"],
      files: ["src/registry/smooth-ui/spotlight-card.tsx"],
      component: React.lazy(
        () => import("@/registry/smooth-ui/spotlight-card.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-card-demo": {
      name: "spotlight-card",
      type: "registry:example",
      registryDependencies: ["spotlight-card"],
      files: ["src/registry/example/spotlight-card-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/example/spotlight-card-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-custom-color": {
      name: "spotlight-custom-color",
      type: "registry:example",
      registryDependencies: ["spotlight-card"],
      files: ["src/registry/example/spotlight-custom-color.tsx"],
      component: React.lazy(
        () => import("@/registry/example/spotlight-custom-color.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-card-border": {
      name: "spotlight-card-border",
      type: "registry:example",
      registryDependencies: ["spotlight-card"],
      files: ["src/registry/example/spotlight-card-border.tsx"],
      component: React.lazy(
        () => import("@/registry/example/spotlight-card-border.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "spotlight-card-highlight": {
      name: "spotlight-card-highlight",
      type: "registry:example",
      registryDependencies: ["spotlight-card"],
      files: ["src/registry/example/spotlight-card-highlight.tsx"],
      component: React.lazy(
        () => import("@/registry/example/spotlight-card-highlight.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "card-pulse-border-talwindcss.config": {
      name: "card-pulse-border-talwindcss.config",
      type: "registry:config",
      registryDependencies: ["card-pulse-border-talwindcss.config"],
      files: ["src/registry/config/card-pulse-border-talwindcss.config.ts"],
      component: React.lazy(
        () => import("@/registry/config/card-pulse-border-talwindcss.config.ts")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "card-pulse-border": {
      name: "card-pulse-border",
      type: "registry:example",
      registryDependencies: ["card-pulse-border"],
      files: ["src/registry/smooth-ui/card-pulse-border.tsx"],
      component: React.lazy(
        () => import("@/registry/smooth-ui/card-pulse-border.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "card-pulse-border-demo": {
      name: "card-pulse-border-demo",
      type: "registry:example",
      registryDependencies: ["card-pulse-border"],
      files: ["src/registry/example/card-pulse-border-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/example/card-pulse-border-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "upgrade-to-pro-demo": {
      name: "upgrade-to-pro-demo",
      type: "registry:example",
      registryDependencies: ["upgrade-to-pro"],
      files: ["src/registry/example/upgrade-to-pro-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/example/upgrade-to-pro-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    },
    "limited-counter-demo": {
      name: "limited-counter-demo",
      type: "registry:example",
      registryDependencies: ["limited-counter"],
      files: ["src/registry/example/limited-counter-demo.tsx"],
      component: React.lazy(
        () => import("@/registry/example/limited-counter-demo.tsx")
      ),
      source: "",
      category: "undefined",
      subcategory: "undefined",
      chunks: []
    }
  }
};

// src/utils/rehype-component.ts
function rehypeComponent() {
  return async (tree) => {
    visit(tree, (node) => {
      const { value: srcPath } = getNodeAttributeByName(node, "src") || {};
      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value;
        const fileName = getNodeAttributeByName(node, "fileName")?.value;
        if (!name && !srcPath) {
          return null;
        }
        try {
          let src;
          if (srcPath) {
            src = srcPath;
          } else {
            const component = Index["default"][name];
            src = fileName ? component.files.find((file) => {
              return file.endsWith(`${fileName}.tsx`) || file.endsWith(`${fileName}.ts`);
            }) || component.files[0] : component.files[0];
            console.log("src2", src);
          }
          const filePath = path.join(process.cwd(), src);
          let source = fs.readFileSync(filePath, "utf8");
          source = source.replaceAll(`@/registry/`, "@/components/");
          source = source.replaceAll("export default", "export");
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src
              },
              attributes: [
                {
                  name: "styleName",
                  type: "mdxJsxAttribute",
                  value: "default"
                }
              ],
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"]
                  },
                  data: {
                    meta: `event="copy_source_code"`
                  },
                  children: [
                    {
                      type: "text",
                      value: source
                    }
                  ]
                })
              ]
            })
          );
        } catch (error) {
          console.error(error);
        }
      }
      if (node.name === "ComponentCodePreview" || node.name === "BlockPreview") {
        const name = getNodeAttributeByName(node, "name")?.value;
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
                __src__: src
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"]
                  },
                  data: {
                    meta: `event="copy_usage_code"`
                  },
                  children: [
                    {
                      type: "text",
                      value: source
                    }
                  ]
                })
              ]
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    });
  };
}
function getNodeAttributeByName(node, name) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

// src/utils/rehype-npm-command.ts
import { visit as visit2 } from "unist-util-visit";
function rehypeNpmCommand() {
  return (tree) => {
    visit2(tree, (node) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }
      if (node.properties?.["__rawString__"]?.startsWith("npm install")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npm install",
          "yarn add"
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npm install",
          "pnpm add"
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npm install",
          "bun add"
        );
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npx create-",
          "yarn create "
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npx create-",
          "pnpm create "
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npx",
          "bunx --bun"
        );
      }
      if (node.properties?.["__rawString__"]?.startsWith("npx") && !node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand;
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npx",
          "pnpm dlx"
        );
        node.properties["__bunCommand__"] = npmCommand.replace(
          "npx",
          "bunx --bun"
        );
      }
    });
  };
}

// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import { createHighlighter } from "shiki";
var prettyCodeOptions = {
  theme: "min-dark",
  getHighlighter: (options) => createHighlighter({
    ...options
  }),
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedChars(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className = ["word--highlighted"];
  }
};
var showcase = defineCollection({
  name: "Showcase",
  directory: "src/content/showcase",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    href: z.string(),
    affiliation: z.string(),
    featured: z.boolean().optional().default(false)
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm]
    });
    return {
      ...document,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body
      }
    };
  }
});
var pages = defineCollection({
  name: "Page",
  directory: "src/content/pages",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string()
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm]
    });
    return {
      ...document,
      slugAsParams: document._meta.path,
      body: {
        raw: document.content,
        code: body
      }
    };
  }
});
var documents = defineCollection({
  name: "Doc",
  directory: "src/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(true),
    date: z.string().optional(),
    links: z.object({
      doc: z.string().optional(),
      api: z.string().optional()
    }).optional(),
    featured: z.boolean().optional().default(false),
    component: z.boolean().optional().default(false),
    toc: z.boolean().optional().default(true),
    image: z.string().optional()
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document, {
      remarkPlugins: [codeImport, remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeComponent,
        // () => (tree) => {
        //   visit(tree, (node) => {
        //     if (node?.type === "element" && node?.tagName === "pre") {
        //       const [codeEl] = node.children;
        //       if (codeEl.tagName !== "code") {
        //         return;
        //       }
        //       if (codeEl.data?.meta) {
        //         // Extract event from meta and pass it down the tree.
        //         const regex = /event="([^"]*)"/;
        //         const match = codeEl.data?.meta.match(regex);
        //         if (match) {
        //           node.__event__ = match ? match[1] : null;
        //           codeEl.data.meta = codeEl.data.meta.replace(regex, "");
        //         }
        //       }
        //       console.log("node.__src__", node.__src__);
        //       node.__rawString__ = codeEl.children?.[0].value;
        //       node.__src__ = node.properties?.__src__;
        //       node.__style__ = node.properties?.__style__;
        //     }
        //   });
        // },
        [rehypePrettyCode, prettyCodeOptions],
        // () => (tree) => {
        //   visit(tree, (node) => {
        //     if (node?.type === "element" && node?.tagName === "figure") {
        //       if (!("data-rehype-pretty-code-figure" in node.properties)) {
        //         return;
        //       }
        //       const preElement = node.children.at(-1);
        //       if (preElement.tagName !== "pre") {
        //         return;
        //       }
        //       preElement.properties["__withMeta__"] =
        //         node.children.at(0).tagName === "div";
        //       console.log(
        //         "preElement.properties[__rawString__]",
        //         preElement.properties["__rawString__"]
        //       );
        //       preElement.properties["__rawString__"] = node.__rawString__;
        //       if (node.__src__) {
        //         preElement.properties["__src__"] = node.__src__;
        //       }
        //       if (node.__event__) {
        //         preElement.properties["__event__"] = node.__event__;
        //       }
        //       if (node.__style__) {
        //         preElement.properties["__style__"] = node.__style__;
        //       }
        //     }
        //   });
        // },
        rehypeNpmCommand,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section"
            }
          }
        ]
      ]
    });
    return {
      ...document,
      image: `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURI(document.title)}`,
      slug: `/${document._meta.path}`,
      slugAsParams: document._meta.path.split("/").slice(1).join("/"),
      body: {
        raw: document.content,
        code: body
      }
    };
  }
});
var content_collections_default = defineConfig({
  collections: [documents, pages, showcase]
});
export {
  content_collections_default as default
};
