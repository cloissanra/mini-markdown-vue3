import { describe, it, expect } from "vitest";
import { marked } from "../index";
import markdown2AST from "../core/parse-ast";
import renderMarkdown from "../core/parse-html";
import * as fs from "fs";
import * as path from "path";
import getHtmlTemplate from "./template";

// 读取md文件内容
const testMarkdownPath = path.resolve(__dirname, "./test.md");
const testMarkdown = fs.readFileSync(testMarkdownPath, "utf-8");
// 将读取的内容转换为AST
let ast = markdown2AST(testMarkdown);
const testAstPath = path.resolve(__dirname, "test.json");
fs.writeFileSync(testAstPath, JSON.stringify(ast, null, 2), "utf-8");
// 生成HTML并保存到test.html
const { html, toc } = renderMarkdown(ast);
fs.writeFileSync(path.resolve(__dirname, "./test.html"), getHtmlTemplate(html));

/**
 * 测试marked函数
 * 1. 测试markdown2AST函数是否能正确解析Markdown文本为AST树
 * 2. 测试renderMarkdown函数是否能正确将AST树渲染为HTML
 * 3. 测试marked函数是否能正确将Markdown文本渲染为HTML
 */
describe("Core Package", () => {
  it("should render markdown to HTML", () => {
    const markdown = "# Hello World";
    const result = marked(markdown).html;
    expect(result).toContain('<h1 id="heading-1-0">Hello World</h1>');
  });

  /**
   * 测试提取目录 extractToc
   */
  it("should extract table of contents from markdown", () => {
    console.log(toc);
    expect(toc).toEqual([
      { id: 'heading-1-0', level: 1, text: 'Markdown 示例文档' },
      { id: 'heading-2-1', level: 2, text: '标题示例' },
      { id: 'heading-1-2', level: 1, text: '一级标题' },
      { id: 'heading-2-3', level: 2, text: '二级标题' },
      { id: 'heading-3-4', level: 3, text: '三级标题' },
      { id: 'heading-4-5', level: 4, text: '四级标题' },
      { id: 'heading-5-6', level: 5, text: '五级标题' },
      { id: 'heading-6-7', level: 6, text: '六级标题' },
      { id: 'heading-2-8', level: 2, text: '文本格式' },
      { id: 'heading-2-9', level: 2, text: '引用' },
      { id: 'heading-2-10', level: 2, text: '分隔线' },
      { id: 'heading-2-11', level: 2, text: '链接' },
      { id: 'heading-2-12', level: 2, text: '列表' },
      { id: 'heading-3-13', level: 3, text: '无序列表' },
      { id: 'heading-3-14', level: 3, text: '有序列表' },
      { id: 'heading-2-15', level: 2, text: '代码' },
      { id: 'heading-2-16', level: 2, text: '段落' }
    ]);
  });
});
