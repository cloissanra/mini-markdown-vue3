// ast-types.ts

// 基础节点类型
export interface Node {
  type: string;
}

// 文本节点
export interface TextNode extends Node {
  type: "text";
  value: string;
}

// 1-6 级标题
export interface HeadingNode extends Node {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}


// 下划线
export interface UnderlineNode extends Node {
  type: "underline";
  children: InlineNode[];
}


// 引用
export interface BlockquoteNode extends Node {
  type: "blockquote";
  children: BlockNode[];
}

// 分割线
export interface ThematicBreakNode extends Node {
  type: "thematicBreak";
}

// 链接
export interface LinkNode extends Node {
  type: "link";
  url: string;
  title?: string;
  children: InlineNode[];
}

// 删除线
export interface DeleteNode extends Node {
  type: "delete";
  children: InlineNode[];
}

// 下划线（HTML 标签）
export interface UnderlineNode extends Node {
  type: "underline";
  children: InlineNode[];
}

// 强调 (单个 * 或 _)
export interface EmphasisNode extends Node {
  type: "emphasis";
  children: InlineNode[];
}

// 加强强调 (双 * 或 _)
export interface StrongNode extends Node {
  type: "strong";
  children: InlineNode[];
}

// 无序列表
export interface UnorderedListNode extends Node {
  type: "unorderedList";
  items: ListItemNode[];
}

// 有序列表
export interface OrderedListNode extends Node {
  type: "orderedList";
  items: ListItemNode[];
}

// 列表项
export interface ListItemNode extends Node {
  type: "listItem";
  children: InlineNode[];
}

// 内联代码
export interface InlineCodeNode extends Node {
  type: "inlineCode";
  value: string;
}

// 代码块
export interface CodeBlockNode extends Node {
  type: "codeBlock";
  language?: string;
  value: string;
}

// 段落
export interface ParagraphNode extends Node {
  type: "paragraph";
  children: InlineNode[];
}

// 行内节点（可以嵌套在段落、标题等中）
export type InlineNode =
  | TextNode
  | DeleteNode
  | UnderlineNode
  | LinkNode
  | EmphasisNode
  | StrongNode
  | InlineCodeNode;

// 块级节点（段落、标题、列表等）
export type BlockNode =
  | ParagraphNode
  | HeadingNode
  | BlockquoteNode
  | UnorderedListNode
  | OrderedListNode
  | CodeBlockNode
  | ThematicBreakNode;

// 根节点
export interface RootNode extends Node {
  type: "root";
  children: BlockNode[];
}
