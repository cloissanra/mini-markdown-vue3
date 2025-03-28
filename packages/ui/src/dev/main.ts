import { createApp, ref } from 'vue'
import { MarkdownEditor, MarkdownPreview, MarkdownToc, MarkdownPlugin } from '../index'
import '../components/MarkdownEditor.vue'
import '../components/MarkdownPreview.vue'
import '../components/MarkdownToc.vue'

const app = createApp({
    setup() {
        const markdownContent = ref(`# 欢迎使用Markdown编辑器

## 功能特点
- 实时预览
- 目录导航
- 语法高亮

### 示例代码
\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## 使用方法
1. 在编辑器中输入Markdown文本
2. 实时查看预览效果
3. 使用右侧目录快速导航

> 这是一个引用示例
`)

        const editorContent = ref('# 编辑器测试\n\n这是一个单独的编辑器测试。')
        const previewContent = ref('# 预览测试\n\n这是一个单独的预览测试。')
        const tocContent = ref(`# 目录测试
## 第一章
### 1.1 节
### 1.2 节
## 第二章
### 2.1 节
`)

        return {
            markdownContent,
            editorContent,
            previewContent,
            tocContent
        }
    }
})

app.use(MarkdownPlugin)
app.mount('#app') 