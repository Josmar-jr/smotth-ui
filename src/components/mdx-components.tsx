import { FC, HTMLAttributes } from "react";
import { useMDXComponent } from "@content-collections/mdx/react";
import { cn } from "../utils/cn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Steps } from "@/components/ui/steps";
import { Pre } from "./ui/mdx-client";
import { ComponentCodePreview } from "./component-code-preview";
import { ComponentSource } from "./component-source";

const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export const components = {
  ComponentCodePreview,
  ComponentSource,
  pre: Pre as FC<HTMLAttributes<HTMLPreElement>>,
  p: ({ children }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="paragraph">{children}</p>
  ),
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = generateId(children?.toString() || "");
    return (
      <h1 id={id} data-heading="1" className="!text-base" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = generateId(children?.toString() || "");
    return (
      <h2
        id={id}
        data-heading="2"
        className="font-heading mt-12 scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = generateId(children?.toString() || "");
    return (
      <h3
        id={id}
        data-heading="3"
        className="font-heading scroll-m-20 mb-2 text-base font-semibold tracking-tight"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => {
    const id = generateId(children?.toString() || "");
    return (
      <h4 id={id} data-heading="4" {...props}>
        {children}
      </h4>
    );
  },
  Step: ({ className, children, ...props }: React.ComponentProps<"h3">) => (
    <h3
      id={generateId(children?.toString() || "")}
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      data-heading="3"
      {...props}
    >
      {children}
    </h3>
  ),
  Steps: ({ ...props }) => <Steps {...props} />,
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList className={cn(className)} {...props} />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger className={cn(className)} {...props} />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent className={cn(className)} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="not-prose relative w-full table-auto overflow-hidden rounded-lg text-sm border-collapse">
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
    <thead className={cn("[&_tr]:border-0", className)} {...props} />
  ),
  tbody: ({ className, ...props }: React.ComponentProps<"tbody">) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn(
        "transition-colors hover:bg-muted/50 last:border-0 border-b border-border/10 first:border-t",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "h-10 px-2 first:pl-0 text-left [&:has([role=checkbox])]:pr-0 font-semibold",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "p-2 first:pl-0 align-baseline [&:has([role=checkbox])]:pr-0 [&_div]:text-grey-300 [&_div]:mt-2",
        className
      )}
      {...props}
    />
  ),
  hr: () => <Separator />,
  CodeBlock: () => <div>oii</div>,
};

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <article className={cn("mx-auto max-w-[120ch]", className)}>
      <Component components={components} />
    </article>
  );
}
