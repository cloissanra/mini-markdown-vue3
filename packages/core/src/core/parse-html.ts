import { RootNode } from "@/types";
import { MarkdownOptions, MarkdownResult } from "@/types/render";

/**
 * 默认Markdown选项
 */
const defaultOptions: MarkdownOptions = {
  highlight: true,
  autoScroll: true,
};


/**
 * 将AST树渲染为HTML
 */
export default function renderMarkdown(rootNode: RootNode, options: MarkdownOptions = {}): string {
  let html = '';

  return html;
}