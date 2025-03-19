<template>
  <div class="markdown-toc">
    <h3 class="markdown-toc__title">目录</h3>
    <ul class="markdown-toc__list">
      <li
        v-for="(item, index) in toc"
        :key="index"
        class="markdown-toc__item"
        :class="`markdown-toc__item--level-${item.level}`"
      >
        <a :href="`#${item.id}`" class="markdown-toc__link">{{ item.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { extractToc } from "@mini-markdown/core";

const props = defineProps<{
  markdown: string;
}>();

// 提取目录
const toc = computed(() => {
  return extractToc(props.markdown);
});
</script>

<style scoped>
.markdown-toc {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: #f8fafc;
  margin-bottom: 1rem;
}

.markdown-toc__title {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
}

.markdown-toc__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.markdown-toc__item {
  margin-bottom: 0.25rem;
}

.markdown-toc__item--level-1 {
  margin-left: 0;
}

.markdown-toc__item--level-2 {
  margin-left: 1rem;
}

.markdown-toc__item--level-3 {
  margin-left: 2rem;
}

.markdown-toc__item--level-4 {
  margin-left: 3rem;
}

.markdown-toc__item--level-5 {
  margin-left: 4rem;
}

.markdown-toc__item--level-6 {
  margin-left: 5rem;
}

.markdown-toc__link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
}

.markdown-toc__link:hover {
  text-decoration: underline;
}
</style>
