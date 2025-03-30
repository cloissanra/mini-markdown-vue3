<template>
  <div class="markdown-preview-container">
    <div class="markdown-preview" ref="previewRef">
      <div class="markdown-preview__content" v-html="html"></div>
    </div>
    <MarkdownToc :toc="toc" :activeId="activeId" class="markdown-toc" v-if="showToc && toc.length > 0" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import MarkdownToc from './MarkdownToc.vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { marked } from '@mini-markdown/core';

const props = defineProps<{
  content: string;
  autoScroll?: boolean;
  showToc?: boolean;
}>();

const emit = defineEmits<{
  (e: "scroll", position: { scrollTop: number; scrollHeight: number; clientHeight: number }): void;
}>();

const previewRef = ref<HTMLDivElement | null>(null);
const html = ref('');
const toc = ref([]);
const activeId = ref<string>();

// html滚动时高亮对应的标题
const findCurrentLinkId = () => {
  let minDistance = Infinity;
  let currentId = null;

  const container = previewRef.value;
  if (!container) return;
  const containerRect = container.getBoundingClientRect();
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  for (const heading of headings) {
    const headingRect = heading.getBoundingClientRect();
    const distance = headingRect.top - containerRect.top;

    // 我们寻找距离顶部最近但不为负的标题（即已经在视图内的标题）
    // 如果标题在视图上方（距离为负），我们选择最接近的一个
    if ((distance >= 0 && distance < minDistance) ||
      (distance < 0 && Math.abs(distance) < Math.abs(minDistance) && minDistance < 0)) {
      minDistance = distance;
      currentId = heading.id;
    } else if (distance < 0 && minDistance > 0) {
      // 如果当前标题在视图上方，而之前找到的在视图下方，优先选择上方的
      minDistance = distance;
      currentId = heading.id;
    }
  }
  activeId.value = currentId;
}

onMounted(() => {
  if (previewRef.value) {
    previewRef.value.addEventListener('scroll', findCurrentLinkId);
    findCurrentLinkId();
  }
})



// 监听内容变化
watch(
  () => props.content,
  (newVal) => {
    if (!newVal) return;
    const res = marked(props.content, {
      highlight: true
    });
    html.value = res.html;
    toc.value = res.toc;
    nextTick(() => {
      // 应用语法高亮
      if (previewRef.value) {
        const codeBlocks = previewRef.value.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    });
  },
  {
    immediate: true
  }
)
// 监听滚动事件
watch(
  () => previewRef.value,
  (newValue) => {
    if (newValue) {
      newValue.addEventListener("scroll", handleScroll);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.markdown-preview-container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: #ffffff;
  overflow: hidden;
}

.markdown-preview {
  flex: 3;
  height: 100%;
  overflow-y: auto;
}

.markdown-toc {
  flex: 1;
  max-width: 250px;
  height: 100%;
  padding: 1rem;
  overflow-y: auto;
}

.markdown-preview__content {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif;
  line-height: 1.6;
  color: #334155;
}

.markdown-preview__content :deep(h2) {
  font-size: 1.5em;
  padding-bottom: 0.3em;
}

.markdown-preview__content :deep(h3) {
  font-size: 1.25em;
}

.markdown-preview__content :deep(h4) {
  font-size: 1em;
}

.markdown-preview__content :deep(p) {
  margin-top: 0;
  margin-bottom: 1em;
}

.markdown-preview__content :deep(a) {
  color: #3b82f6;
  text-decoration: none;
}

.markdown-preview__content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-preview__content :deep(code) {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: #f1f5f9;
  border-radius: 3px;
}

.markdown-preview__content :deep(pre) {
  margin-top: 0;
  margin-bottom: 1em;
  padding: 1em;
  overflow: auto;
  background-color: #f1f5f9;
  border-radius: 0.375rem;
}

.markdown-preview__content :deep(pre code) {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
  font-size: 0.875rem;
}

.markdown-preview__content :deep(blockquote) {
  margin: 0 0 1em;
  padding: 0 1em;
  color: #64748b;
  border-left: 0.25em solid #e2e8f0;
}

.markdown-preview__content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
}

.markdown-preview__content :deep(table th),
.markdown-preview__content :deep(table td) {
  padding: 0.5em 1em;
  border: 1px solid #e2e8f0;
}

.markdown-preview__content :deep(table th) {
  background-color: #f8fafc;
  font-weight: 600;
}

.markdown-preview__content :deep(ul),
.markdown-preview__content :deep(ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 1em;
}

.markdown-preview__content :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>
