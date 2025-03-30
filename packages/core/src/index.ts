export { default as marked } from "./core/marked";
export { default as markdown2AST } from "./core/parse-ast";
export { default as renderMarkdown } from "./core/parse-html";

// 显式导出类型
export type {
  MarkdownOptions,
  MarkdownResult,
  RootNode,
  HeadingNode,
  ParagraphNode,
  ListItemNode,
  CodeBlockNode,
  BlockquoteNode,
  EmphasisNode,
  StrongNode,
  UnorderedListNode,
  OrderedListNode,
  InlineNode,
  LinkNode,
  // 其他所有需要导出的类型
} from "./types";