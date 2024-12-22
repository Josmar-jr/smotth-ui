import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { Children, useMemo } from "react";
import { Index } from "../../__registry__";
import { ComponentPreview } from "./component-preview";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  hasReTrigger?: boolean;
  classNameComponentContainer?: string;
}

export function ComponentCodePreview({
  name,
  children,
  hasReTrigger = false,
  classNameComponentContainer,
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
    <div className="not-prose relative z-0 flex items-center justify-between pb-4">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList className="">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
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
