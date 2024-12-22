import { extractCodeFromFilePath } from "@/utils/code";
import CodePreview from "./code-preview";
import CodeRenderer from "./code-renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ComponentInstallProps {
  filePath: string;
  cliCommand: string;
}

export function ComponentInstall({
  filePath,
  cliCommand,
}: ComponentInstallProps) {
  const fileContent = extractCodeFromFilePath(filePath);

  return (
    <Tabs defaultValue="cli" className="relative mr-auto w-full">
      <TabsList className="">
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>
      </TabsList>
      <TabsContent
        value="cli"
        className="border border-border/10 bg-background"
      >
        <CodePreview code={cliCommand}>
          <CodeRenderer code={cliCommand} lang="bash" />
        </CodePreview>
      </TabsContent>
      <TabsContent value="manual" className="border border-border/10">
        <CodePreview code={fileContent}>
          <CodeRenderer code={fileContent} lang="tsx" />
        </CodePreview>
      </TabsContent>
    </Tabs>
  );
}
