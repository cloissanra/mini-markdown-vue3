<template>
  <div class="markdown-preview" ref="previewRef">
    <div class="markdown-preview__content" v-html="renderedHtml"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { renderMarkdown } from "@mini-markdown/core";
import "highlight.js/styles/github.css";

const props = defineProps<{
  markdown: string;
  autoScroll?: boolean;
}>();

const emit = defineEmits<{
  (e: "scroll", position: { scrollTop: number; scrollHeight: number; clientHeight: number }): void;
}>();

const previewRef = ref<HTMLDivElement | null>(null);

// 渲染Markdown为HTML
const renderedHtml = computed(() => {
  const result = renderMarkdown(props.markdown, {
    highlight: true,
  });
  return result.html;
});

// 监听滚动事件
const handleScroll = () => {
  if (!previewRef.value || !props.autoScroll) return;

  const { scrollTop, scrollHeight, clientHeight } = previewRef.value;
  emit("scroll", { scrollTop, scrollHeight, clientHeight });
};

// 设置预览的滚动位置
const setScrollPosition = (position: number) => {
  if (previewRef.value) {
    previewRef.value.scrollTop = position;
  }
};

// 计算滚动比例
const calculateScrollRatio = (editorScroll: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}) => {
  if (!previewRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = editorScroll;
  const editorScrollRatio = scrollTop / (scrollHeight - clientHeight);

  const previewScrollHeight = previewRef.value.scrollHeight;
  const previewClientHeight = previewRef.value.clientHeight;

  const previewScrollTop = editorScrollRatio * (previewScrollHeight - previewClientHeight);
  setScrollPosition(previewScrollTop);
};

// 监听滚动事件
watch(
  () => previewRef.value,
  (newValue) => {
    if (newValue) {
      newValue.addEventListener("scroll", handleScroll);
    }
  },
  { immediate: true },
);

// 暴露方法给父组件
defineExpose({
  setScrollPosition,
  calculateScrollRatio,
});
</script>

<style scoped>
.markdown-preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: #ffffff;
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

.markdown-preview__content :deep(h1),
.markdown-preview__content :deep(h2),
.markdown-preview__content :deep(h3),
.markdown-preview__content :deep(h4),
.markdown-preview__content :deep(h5),
.markdown-preview__content :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-preview__content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.3em;
}

.markdown-preview__content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #e2e8f0;
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
