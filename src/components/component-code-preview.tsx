import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { Children, useMemo } from "react";
import { Index } from "../../__registry__";
import { ComponentPreview } from "./component-preview";
import { cn } from "@/utils/cn";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
  preview?: boolean;
}

export function ComponentCodePreview({
  name,
  children,
  hasReTrigger = false,
  classNameComponentContainer,
  preview = false,
  className,
  ...props
}: ComponentPreviewProps) {
  const Codes = Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = useMemo(() => {
    const Component = Index["default"][name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);

      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div
      className={cn(
        "not-prose relative z-0 flex items-center justify-between pb-4",
        className
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        )}
        <TabsContent
          value="preview"
          className="border border-border/10 bg-background"
        >
          <ComponentPreview
            component={Preview}
            hasReTrigger={hasReTrigger}
            className={classNameComponentContainer}
          />
        </TabsContent>
        <TabsContent value="code">{Code}</TabsContent>
      </Tabs>
    </div>
  );
}
