export interface MarkdownOptions {
  /**
   * 是否启用语法高亮
   */
  highlight?: boolean;

  /**
   * 自定义渲染器
   */
  renderer?: Record<string, (text: string) => string>;
}

/**
 * 标题项
 */
export interface TocItem {
  id: string;
  level: number;
  text: string;
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
  /**
   * 目录结构
   */
  toc?: TocItem[];
}
