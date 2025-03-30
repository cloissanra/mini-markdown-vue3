<template>
  <div class="markdown-toc">
    <h3 class="markdown-toc__title">目录</h3>
    <ul class="markdown-toc__list">
      <li v-for="(item, index) in props.toc" :key="item.id" :id="`toc_item_${item.id}`" class="markdown-toc__item"
        :class="`markdown-toc__item--level-${item.level}`">
        <span class="markdown-toc__link" @click="$emit('click-heading', item.id)">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
  toc: Array<{
    level: number;
    text: string;
    id: string;
    activeId: string;
  }>,
  activeId: string,
}>();

watch(
  () => props.activeId,
  newId => {
    if (!newId) return;
    document.querySelectorAll('.markdown-toc__item').forEach(link => {
      link.classList.remove('active');
    })
    document.querySelector(`#toc_item_${newId}`)?.classList.add('active');
  },
  {
    immediate: true
  }
)

defineEmits<{
  (e: 'click-heading', id: string): void
}>();
</script>

<style scoped>
.markdown-toc {
  user-select: none;
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
  padding: 2px 8px;
  margin: 0;
  border-left: 2px solid rgb(213, 213, 213);
  height: fit-content;
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
  color: #7d7d7d;
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
}

.markdown-toc__link:hover {
  text-decoration: underline;
}

.active {
  color: #989898 !important;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
