<template>
  <div class="container">
    <div class="markdown-editor">
      <h1>Markdown Editor</h1>
      <MarkdownEditor v-model="markdownContent" />
    </div>

    <div class="markdown-preview">
      <h1>Markdown Preview</h1>
      <MarkdownPreview :content="markdownContent" :showToc="showToc" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'

const markdownContent = ref<string>(`# Markdown 示例文档

这是一个包含各种 Markdown 语法的示例文档。

## 标题示例

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 文本格式

这是普通文本。

**这是加粗文本**

_这是斜体文本_

**_这是加粗斜体_**

~~这是删除线文本~~

<u>这是下划线文本</u>

## 引用

> 这是一个引用
>
> 引用可以有多行

## 分隔线

---

## 链接

[这是一个链接](https://github.com)
[带标题的链接](https://github.com "GitHub")

## 列表

### 无序列表

- 项目1
- 项目2
- 项目3

### 有序列表

1. 第一项
2. 第二项
3. 第三项

## 代码

\`This is inline code.\`

\`\`\`javascript
// 这是代码块
function hello() {
    console.log("Hello, World!");
    console.log("Hello, World2!");
  }
  \`\`\`

## 段落

这是第一段文字。
这行与上面的行在同一段落中。

这是一个新段落，它与上面的段落有空行分隔。
`)
const showToc = ref<boolean>(true)

</script>
<style scoped>
.body {
  padding: 0 20px;
}

.container {
  width: 80%;
  margin: 0 auto;
  height: 800px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  gap: 80px;
}

.markdown-editor,
.markdown-preview {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }
}

h1 {
  margin-top: 20px 0;
  font-size: 24px;
  color: #333;
}

h2 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #444;
}
</style>