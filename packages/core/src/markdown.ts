import { marked } from "marked";
import hljs from "highlight.js";
import { MarkdownOptions, MarkdownResult, MyMarkedOptions } from "./types";

/**
 * 默认Markdown选项
 */
const defaultOptions: MarkdownOptions = {
  highlight: true,
  autoScroll: true,
};

/**
 * 配置marked渲染器
 */
function configureMarked(options: MarkdownOptions = {}): void {
  const markedOptions: MyMarkedOptions = {};

  // 配置语法高亮
  if (options.highlight) {
    markedOptions.highlight = (code: string, lang: string) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    };
  }

  // 配置自定义渲染器
  if (options.renderer) {
    const renderer = new marked.Renderer();

    Object.entries(options.renderer).forEach(([key, fn]) => {
      // @ts-expect-error - 动态设置渲染器方法
      renderer[key] = fn;
    });

    markedOptions.renderer = renderer;
  }

  marked.setOptions(markedOptions);
}

/**
 * 将Markdown文本渲染为HTML
 */
export function renderMarkdown(text: string, options: MarkdownOptions = {}): MarkdownResult {
  const mergedOptions = { ...defaultOptions, ...options };

  // 配置marked
  configureMarked(mergedOptions);

  // 渲染HTML
  const html = marked.parse(text) as string;

  return {
    html,
    text,
  };
}

/**
 * 获取Markdown文本的目录结构
 */
export function extractToc(text: string): { level: number; text: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: { level: number; text: string; id: string }[] = [];

  let match;
  while ((match = headingRegex.exec(text)) !== null) {
    const level = match[1].length;
    const headingText = match[2].trim();
    const id = headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ level, text: headingText, id });
  }

  return toc;
}
