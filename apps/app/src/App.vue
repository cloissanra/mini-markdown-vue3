<template>
  <div class="container mx-auto px-4 py-8 w-full h-full">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-center">Mini Markdown 编辑器</h1>
    </header>

    <div class="flex flex-col md:flex-row gap-4">
      <!-- 侧边栏 -->
      <aside class="w-full md:w-1/4">
        <MarkdownToc :markdown="markdown" />
      </aside>

      <!-- 主内容区 -->
      <main class="w-full md:w-3/4 flex flex-col md:flex-row gap-4">
        <!-- 编辑器 -->
        <div class="w-full md:w-1/2 h-[600px]">
          <MarkdownEditor
            v-model="markdown"
            :auto-scroll="true"
            @scroll="handleEditorScroll"
            ref="editorRef"
          />
        </div>

        <!-- 预览 -->
        <div class="w-full md:w-1/2">
          <MarkdownPreview
            :markdown="markdown"
            :auto-scroll="true"
            @scroll="handlePreviewScroll"
            ref="previewRef"
            class="overflow-scroll"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MarkdownEditor, MarkdownPreview, MarkdownToc } from "@mini-markdown/ui";

// 编辑器和预览的引用
const editorRef = ref<InstanceType<typeof MarkdownEditor> | null>(null);
const previewRef = ref<InstanceType<typeof MarkdownPreview> | null>(null);

// 是否正在同步滚动
let isSyncing = false;

// 编辑器内容
const markdown = ref<string>(`# Mini Markdown 编辑器

## 简介

这是一个基于 Vue 3 和 Monorepo 架构的 Markdown 编辑器，支持实时预览和语法高亮。

## 功能特点

- **实时预览**：边写边看，所见即所得
- **语法高亮**：支持代码块语法高亮
- **目录导航**：自动生成文档目录
- **同步滚动**：编辑和预览区域同步滚动

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!');
}
\`\`\`

## 表格示例

| 名称 | 描述 |
| ---- | ---- |
| Vue 3 | 渐进式JavaScript框架 |
| Monorepo | 多包单仓库管理方式 |
| Markdown | 轻量级标记语言 |

## 列表示例

### 无序列表

- 项目1
- 项目2
- 项目3

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 引用示例

> 这是一个引用示例，可以用来突出显示重要内容。
> 
> 多行引用也是支持的。

## 图片示例

![Vue Logo](https://vuejs.org/images/logo.png)

## 结语

感谢使用 Mini Markdown 编辑器！
`);

// 处理编辑器滚动
const handleEditorScroll = (position: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}) => {
  if (isSyncing || !previewRef.value) return;

  isSyncing = true;
  previewRef.value.calculateScrollRatio(position);
  setTimeout(() => {
    isSyncing = false;
  }, 100);
};

// 处理预览滚动
const handlePreviewScroll = (position: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}) => {
  if (isSyncing || !editorRef.value || !previewRef.value) return;

  isSyncing = true;

  // 计算滚动比例
  const previewScrollRatio = position.scrollTop / (position.scrollHeight - position.clientHeight);

  // 获取编辑器元素
  const editorElement = editorRef.value.$el.querySelector("textarea");
  if (editorElement) {
    const editorScrollHeight = editorElement.scrollHeight;
    const editorClientHeight = editorElement.clientHeight;

    // 设置编辑器滚动位置
    const editorScrollTop = previewScrollRatio * (editorScrollHeight - editorClientHeight);
    editorRef.value.setScrollPosition(editorScrollTop);
  }

  setTimeout(() => {
    isSyncing = false;
  }, 100);
};
</script>
<style scoped>
/deep/ .markdown-editor__textarea {
  height: 100vh;
  width: 100%;
}
</style>
