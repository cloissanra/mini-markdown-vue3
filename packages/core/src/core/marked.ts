import { MarkdownResult } from "@/types";
import markdown2AST from "./parse-ast";
import renderMarkdown from "./parse-html";

export default function marked(text: string): MarkdownResult {
  const html = renderMarkdown(markdown2AST(text));
  return {
    html,
    text,
  };
}
