import type {
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
} from "@/types/index";

/**
 * 将Markdown文本解析为AST树
 */
export default function markdown2AST(text: string): RootNode {
  // 创建根节点
  const rootNode: RootNode = {
    type: "root",
    children: [],
  };

  // 按行分割Markdown文本
  const lines = text.split("\n");

  // 遍历每一行
  let i = 0;
  while (i < lines.length) {
    // 去掉行两边的空格
    const line = lines[i].trim();

    // -------------------------  解析heading -------------------------
    if (line.startsWith("#")) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const depth = match[1].length;
        const content = match[2].trim();
        const headingNode: HeadingNode = {
          type: "heading",
          depth: depth as 1 | 2 | 3 | 4 | 5 | 6,
          children: [{ type: "text", value: content }],
        };
        rootNode.children.push(headingNode);
      }
      i++;
      continue;
    }

    // -------------------------  解析代码块 -------------------------
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      let code = "";
      // 从下一行开始读取代码
      let j = i + 1;

      while (j < lines.length && !lines[j].trim().startsWith("```")) {
        code += lines[j] + "\n";
        j++;
      }

      const codeBlockNode: CodeBlockNode = {
        type: "codeBlock",
        language: language,
        value: code.trim(),
      };

      rootNode.children.push(codeBlockNode);
      i = j + 1; // 跳过结束的 ```
      continue;
    }

    // 解析分隔线
    if (line === '---') {
      rootNode.children.push({
        type: "thematicBreak",
      });
      i++;
    }

    // 解析引用块
    if (line.startsWith(">")) {
      let quote = "";
      let j = i;

      // 处理引用块，包括嵌套引用
      const quoteLines = [];
      while (j < lines.length && lines[j].trim().startsWith(">")) {
        quoteLines.push(lines[j]);
        j++;
      }

      // 处理引用内容
      if (quoteLines.length > 0) {
        // 移除每行开头的引用符号，但保留嵌套层级
        const processedQuoteText = quoteLines.map((line) => line.replace(/^>/, "")).join("\n");

        // 递归解析引用内容
        const nestedAst = markdown2AST(processedQuoteText);

        // 创建引用节点，并使用解析后的内容
        const blockquoteNode: BlockquoteNode = {
          type: "blockquote",
          children: nestedAst.children,
        };

        rootNode.children.push(blockquoteNode);
        i = j;
        continue;
      }

      const blockquoteNode: BlockquoteNode = {
        type: "blockquote",
        children: [
          {
            type: "paragraph",
            children: [{ type: "text", value: quote.trim() }],
          },
        ],
      };

      rootNode.children.push(blockquoteNode);
      i = j;
      continue;
    }

    // 解析无序列表
    if (line.match(/^[-*+]\s/)) {
      const listItems: ListItemNode[] = [];
      let j = i;

      while (j < lines.length && lines[j].trim().match(/^[-*+]\s/)) {
        const content = lines[j].replace(/^[-*+]\s/, "").trim();
        listItems.push({
          type: "listItem",
          children: parseInline(content),
        });
        j++;
      }

      const unorderedListNode: UnorderedListNode = {
        type: "unorderedList",
        items: listItems,
      };

      rootNode.children.push(unorderedListNode);
      i = j;
      continue;
    }

    // 解析有序列表
    if (line.match(/^\d+\.\s/)) {
      const listItems: ListItemNode[] = [];
      let j = i;

      while (j < lines.length && lines[j].trim().match(/^\d+\.\s/)) {
        const content = lines[j].replace(/^\d+\.\s/, "").trim();
        listItems.push({
          type: "listItem",
          children: parseInline(content),
        });
        j++;
      }

      const listNode: OrderedListNode = {
        type: "orderedList",
        items: listItems,
      };

      rootNode.children.push(listNode);
      i = j;
      continue;
    }

    // 解析段落
    if (line.length > 0) {
      let paragraph = "";
      let j = i;

      while (
        j < lines.length &&
        lines[j].trim().length > 0 &&
        !lines[j].trim().startsWith("#") &&
        !lines[j].trim().startsWith("```") &&
        !lines[j].trim().startsWith(">") &&
        !lines[j].trim().match(/^[-*+]\s/) &&
        !lines[j].trim().match(/^\d+\.\s/)
      ) {
        // 保留原始的换行符
        if (j > i) {
          paragraph += '\n';
        }
        paragraph += lines[j];
        j++;
      }

      // 解析段落内的内联元素（粗体、斜体、链接、图片）
      const paragraphText = parseInline(paragraph.trim());

      const paragraphNode: ParagraphNode = {
        type: "paragraph",
        children: paragraphText,
      };

      rootNode.children.push(paragraphNode);
      i = j;
      continue;
    }

    // 跳过空行
    i++;
  }

  return rootNode;
}

/**
 * 解析内联元素，如粗体、斜体、链接和图片
 */
function parseInline(text: string): InlineNode[] {
  const result: InlineNode[] = [];

  let currentText = "";
  let i = 0;

  while (i < text.length) {
    // 检查链接 [text](url "title")
    if (text[i] === '[') {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const linkTextEnd = text.indexOf(']', i);
      if (linkTextEnd !== -1 && text[linkTextEnd + 1] === '(') {
        const linkTextStart = i + 1;
        const linkText = text.substring(linkTextStart, linkTextEnd);

        const urlStart = linkTextEnd + 2;
        let urlEnd = text.indexOf(')', urlStart);

        if (urlEnd !== -1) {
          let url = '';
          let title = '';

          // 检查是否有标题
          const urlContent = text.substring(urlStart, urlEnd);
          const titleMatch = urlContent.match(/^([^\s"]+)(?:\s+"([^"]+)")?$/);

          if (titleMatch) {
            url = titleMatch[1];
            title = titleMatch[2] || '';

            const linkNode: LinkNode = {
              type: "link",
              url: url,
              title: title,
              children: parseInline(linkText),
            };

            result.push(linkNode);
            i = urlEnd + 1;
            continue;
          }
        }
      }
    }

    // 检查删除线 ~~text~~
    if (text.substring(i, i + 2) === "~~") {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const startPos = i + 2;
      const endPos = text.indexOf("~~", startPos);

      if (endPos !== -1) {
        // 提取删除线内容并递归解析
        const content = text.substring(startPos, endPos);
        result.push({
          type: "delete",
          children: parseInline(content),
        });

        i = endPos + 2;
        continue;
      }
    }

    // 检查下划线 <u>text</u>
    if (text.substring(i, i + 3) === "<u>") {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const startPos = i + 3;
      const endPos = text.indexOf("</u>", startPos);

      if (endPos !== -1) {
        // 提取下划线内容并递归解析
        const content = text.substring(startPos, endPos);
        result.push({
          type: "underline",
          children: parseInline(content),
        });

        i = endPos + 4; // 4 是 </u> 的长度
        continue;
      }
    }

    // 检查斜体 *text* 或 _text_
    if (
      (text[i] === "*" || text[i] === "_") &&
      text[i + 1] !== "*" &&
      text[i + 1] !== "_" &&
      text[i - 1] !== "*" &&
      text[i - 1] !== "_"
    ) {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const marker = text[i];
      const startPos = i + 1;
      let j = startPos;

      // 查找斜体结束位置
      while (j < text.length) {
        if (text[j] === marker && text[j - 1] !== "\\" && text[j + 1] !== marker) {
          // 提取斜体内容并递归解析
          const content = text.substring(startPos, j);
          const emphasisNode: EmphasisNode = {
            type: "emphasis",
            children: parseInline(content),
          };
          result.push(emphasisNode);

          i = j + 1;
          break;
        }
        j++;
      }

      if (j < text.length) continue;
    }

    // 检查粗体 **text** 或 __text__
    if (text.substring(i, i + 2) === "**" || text.substring(i, i + 2) === "__") {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const marker = text.substring(i, i + 2);
      const startPos = i + 2;
      const endPos = text.indexOf(marker, startPos);

      if (endPos !== -1) {
        // 提取粗体内容并递归解析
        const content = text.substring(startPos, endPos);
        const strongNode: StrongNode = {
          type: "strong",
          children: parseInline(content),
        };
        result.push(strongNode);

        i = endPos + 2;
        continue;
      }
    }

    // 检查内联代码
    if (text[i] === '`') {
      if (currentText) {
        result.push({ type: "text", value: currentText });
        currentText = "";
      }

      const startPos = i + 1;
      const endPos = text.indexOf("`", startPos);

      if (endPos !== -1) {
        // 提取代码内容并递归解析
        const content = text.substring(startPos, endPos);
        result.push({
          type: "inlineCode",
          value: content,
        });

        i = endPos + 1;
        continue;
      }
    }

    // 处理普通文本
    currentText += text[i];
    i++;
  }

  // 添加剩余的文本
  if (currentText) {
    result.push({ type: "text", value: currentText });
  }

  return result;
}
