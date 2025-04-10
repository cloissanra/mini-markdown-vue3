import {
  RootNode,
  HeadingNode,
  ParagraphNode,
  BlockquoteNode,
  CodeBlockNode,
  UnorderedListNode,
  OrderedListNode,
  ListItemNode,
  InlineNode
} from "@/types/index";
import { MarkdownOptions, TocItem } from "@/types/render";

/**
 * 默认Markdown选项
 */
const defaultOptions: MarkdownOptions = {
  highlight: true,
};

/**
 * 将AST树渲染为HTML，返回html和toc
 */
export default function renderMarkdown(
  rootNode: RootNode,
  options: MarkdownOptions = defaultOptions
): { html: string; toc: TocItem[] } {
  let html = '';
  const toc: TocItem[] = [];

  // 遍历根节点的子节点
  for (const node of rootNode.children) {
    html += renderNode(node, options, toc);
  }

  return { html, toc };
}

/**
 * 渲染单个节点
 */
function renderNode(node: any, options: MarkdownOptions, toc: TocItem[]): string {
  switch (node.type) {
    case 'heading':
      return renderHeading(node, toc);
    case 'paragraph':
      return renderParagraph(node);
    case 'thematicBreak':
      return renderThematicBreakNode();
    case 'blockquote':
      return renderBlockquote(node, options, toc);
    case 'codeBlock':
      return renderCodeBlock(node, options);
    case 'unorderedList':
      return renderUnorderedList(node, options, toc);
    case 'orderedList':
      return renderOrderedList(node, options, toc);
    default:
      return '';
  }
}

/**
 * 渲染标题
 */
function renderHeading(node: HeadingNode, toc: TocItem[]): string {
  const level = node.depth;
  const content = renderInlineContent(node.children);

  // 提取标题文本用于生成ID和TOC
  const headingText = node.children.map(child => {
    if (child.type === 'text') return child.value;
    return '';
  }).join('').trim();

  // 生成唯一ID，使用标题级别和TOC数组长度
  const headingId = `heading-${level}-${toc.length}`;

  // 将标题信息添加到TOC数组
  toc.push({
    id: headingId,
    level,
    text: headingText
  });

  return `<h${level} id="${headingId}">${content}</h${level}>\n`;
}

/**
 * 渲染段落
 */
function renderParagraph(node: ParagraphNode): string {
  const content = renderInlineContent(node.children);
  return `<p>${content}</p>\n`;
}

/** 
 * 渲染分割线
 */
function renderThematicBreakNode(): string {
  return `<hr>\n`;
}

/**
 * 渲染引用块
 */
function renderBlockquote(node: BlockquoteNode, options: MarkdownOptions, toc: TocItem[]): string {
  let content = '';
  for (const child of node.children) {
    content += renderNode(child, options, toc);
  }
  return `<blockquote>${content}</blockquote>\n`;
}

/**
 * 渲染代码块
 */
function renderCodeBlock(node: CodeBlockNode, options: MarkdownOptions): string {
  const language = node.language || '';
  const value = escapeHtml(node.value);

  if (options.highlight && language) {
    return `<pre><code class="language-${language}">${value}</code></pre>\n`;
  } else {
    return `<pre><code>${value}</code></pre>\n`;
  }
}

/**
 * 渲染无序列表
 */
function renderUnorderedList(node: UnorderedListNode, options: MarkdownOptions, toc: TocItem[]): string {
  let items = '';
  for (const item of node.items) {
    items += renderListItem(item, options, toc);
  }
  return `<ul>${items}</ul>\n`;
}

/**
 * 渲染有序列表
 */
function renderOrderedList(node: OrderedListNode, options: MarkdownOptions, toc: TocItem[]): string {
  let items = '';
  for (const item of node.items) {
    items += renderListItem(item, options, toc);
  }
  return `<ol>${items}</ol>\n`;
}

/**
 * 渲染列表项
 */
function renderListItem(node: ListItemNode, options: MarkdownOptions, toc: TocItem[]): string {
  let content = '';
  if (node.children) {
    for (const child of node.children) {
      content += renderInlineNode(child);
    }
  }
  return `<li>${content}</li>`;
}

/**
 * 渲染内联内容
 */
function renderInlineContent(nodes: InlineNode[]): string {
  let content = '';
  for (const node of nodes) {
    content += renderInlineNode(node);
  }
  return content;
}

/**
 * 渲染内联节点
 */
function renderInlineNode(node: InlineNode): string {
  switch (node.type) {
    case 'text':
      return escapeHtml(node.value).replace(/\n/g, '<br>');
    case 'strong':
      return `<strong>${renderInlineContent(node.children)}</strong>`;
    case 'emphasis':
      return `<em>${renderInlineContent(node.children)}</em>`;
    case 'delete':
      return `<del>${renderInlineContent(node.children)}</del>`;
    case 'underline':
      return `<u>${renderInlineContent(node.children)}</u>`;
    case 'inlineCode':
      return `<code class="inline-code">${escapeHtml(node.value)}</code>`;
    case 'link':
      const title = node.title ? ` title="${escapeHtml(node.title)}"` : '';
      return `<a href="${escapeHtml(node.url)}"${title}>${renderInlineContent(node.children)}</a>`;
    default:
      return escapeHtml((node as { value: string }).value || '');
  }
}

/**
 * HTML转义
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}