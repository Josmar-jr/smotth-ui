import { createHighlighter } from "shiki/bundle/web";
import { noir } from "./custom-theme";

export const codeToHtml = async ({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) => {
  const highlighter = await createHighlighter({
    themes: [noir],
    langs: ["javascript", "tsx", "bash"],
  });

  return highlighter?.codeToHtml(code, {
    lang: lang,
    theme: "noir",
  });
};
