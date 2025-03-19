import { MarkedOptions } from "marked";

export interface MarkdownOptions {
  /**
   * 是否启用语法高亮
   */
  highlight?: boolean;

  /**
   * 是否启用自动滚动
   */
  autoScroll?: boolean;

  /**
   * 自定义渲染器
   */
  renderer?: Record<string, (text: string) => string>;
}

export interface MyMarkedOptions extends MarkedOptions {
  highlight?: (code: string, lang: string) => string;
}

export interface MarkdownResult {
  /**
   * 渲染后的HTML
   */
  html: string;

  /**
   * 原始Markdown文本
   */
  text: string;
}
