import { describe, it, expect } from "vitest";
import { marked, extractToc } from "../index";
import markdown2AST from "../core/parse-ast";
import * as fs from "fs";
import * as path from "path";

// read test.md file
const testMarkdownPath = path.resolve(__dirname, "./test.md");
const testMarkdown = fs.readFileSync(testMarkdownPath, "utf-8");

let ast = markdown2AST(testMarkdown);
console.log(JSON.stringify(ast, null, 2));
fs.writeFileSync(path.resolve(__dirname, "./test.json"), JSON.stringify(ast, null, 2));

/**
 * Test markdown to HTML
 */
describe("Core Package", () => {
  // it("should render markdown to HTML", () => {
  //   const markdown = "# Hello World";
  //   const result = marked(markdown);
  //   expect(result.html).toContain("<h1>Hello World</h1>");
  // });

  /**
   * Test extractToc function
   */
  it("should extract table of contents from markdown", () => {
    const toc = extractToc(testMarkdown);
    console.log(toc);
    expect(toc).toEqual([
      { level: 1, text: "Markdown 示例文档", id: "title-1" },
      { level: 2, text: "标题示例", id: "subtitle-1" },
      { level: 3, text: "三级标题", id: "heading-3-1" },
      { level: 4, text: "四级标题", id: "heading-4-1" },
      { level: 5, text: "五级标题", id: "heading-5-1" },
      { level: 6, text: "六级标题", id: "heading-6-1" },
      { level: 2, text: "文本格式", id: "subtitle-2" },
      { level: 2, text: "引用", id: "subtitle-3" },
      { level: 2, text: "分隔线", id: "subtitle-4" },
      { level: 2, text: "链接", id: "subtitle-5" },
      { level: 2, text: "列表", id: "subtitle-6" },
      { level: 3, text: "无序列表", id: "heading-3-2" },
      { level: 3, text: "有序列表", id: "heading-3-3" },
      { level: 2, text: "代码", id: "subtitle-7" },
      { level: 2, text: "段落", id: "subtitle-8" },
    ]);
  });
});
