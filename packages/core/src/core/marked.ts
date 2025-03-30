import { MarkdownOptions, MarkdownResult } from "@/types";
import markdown2AST from "./parse-ast";
import renderMarkdown from "./parse-html";

// 默认配置
const defaultOptions: MarkdownOptions = {
  highlight: true,
};

export default function marked(text: string, options?: Partial<MarkdownOptions>): MarkdownResult {
  // 合并用户选项与默认选项
  const mergedOptions = { ...defaultOptions, ...options };

  // 解析为AST
  const ast = markdown2AST(text);

  // 渲染为HTML，传入选项
  const { html, toc } = renderMarkdown(ast, mergedOptions);

  return {
    html,
    text,
    toc
  };
}
