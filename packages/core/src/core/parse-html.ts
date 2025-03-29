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
import { MarkdownOptions } from "@/types/render";

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
export default function renderMarkdown(rootNode: RootNode, options: MarkdownOptions = defaultOptions): string {
  let html = '';

  // 遍历根节点的子节点
  for (const node of rootNode.children) {
    html += renderNode(node, options);
  }

  return html;
}

/**
 * 渲染单个节点
 */
function renderNode(node: any, options: MarkdownOptions): string {
  switch (node.type) {
    case 'heading':
      return renderHeading(node);
    case 'paragraph':
      return renderParagraph(node);
    case 'thematicBreak':
      return renderThematicBreakNode();
    case 'blockquote':
      return renderBlockquote(node, options);
    case 'codeBlock':
      return renderCodeBlock(node, options);
    case 'unorderedList':
      return renderUnorderedList(node, options);
    case 'orderedList':
      return renderOrderedList(node, options);
    default:
      return '';
  }
}

/**
 * 渲染标题
 */
function renderHeading(node: HeadingNode): string {
  const level = node.depth;
  const content = renderInlineContent(node.children);
  return `<h${level}>${content}</h${level}>\n`;
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
  return `<hr>`;
}

/**
 * 渲染引用块
 */
function renderBlockquote(node: BlockquoteNode, options: MarkdownOptions): string {
  let content = '';
  for (const child of node.children) {
    content += renderNode(child, options);
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
function renderUnorderedList(node: UnorderedListNode, options: MarkdownOptions): string {
  let items = '';
  for (const item of node.items) {
    items += renderListItem(item, options);
  }
  return `<ul>${items}</ul>\n`;
}

/**
 * 渲染有序列表
 */
function renderOrderedList(node: OrderedListNode, options: MarkdownOptions): string {
  let items = '';
  for (const item of node.items) {
    items += renderListItem(item, options);
  }
  return `<ol>${items}</ol>\n`;
}

/**
 * 渲染列表项
 */
function renderListItem(node: ListItemNode, _options: MarkdownOptions): string {
  let content = '';
  if (node.children) {
    content = renderInlineContent(node.children);
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
      return `<code class="inline-code">${node.value}</code>`;
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