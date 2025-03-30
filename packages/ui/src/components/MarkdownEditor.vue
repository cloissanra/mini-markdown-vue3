<template>
  <div class="markdown-editor">
    <textarea ref="editorRef" class="markdown-editor__textarea" :value="modelValue" @input="handleInput"
      @scroll="handleScroll"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
  autoScroll?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "scroll", position: { scrollTop: number; scrollHeight: number; clientHeight: number }): void;
}>();

const editorRef = ref<HTMLTextAreaElement | null>(null);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};

const handleScroll = () => {
  if (!editorRef.value || !props.autoScroll) return;

  const { scrollTop, scrollHeight, clientHeight } = editorRef.value;
  emit("scroll", { scrollTop, scrollHeight, clientHeight });
};

// 设置编辑器的滚动位置
const setScrollPosition = (position: number) => {
  if (editorRef.value) {
    editorRef.value.scrollTop = position;
  }
};

// 暴露方法给父组件
defineExpose({
  setScrollPosition,
});
</script>

<style scoped>
.markdown-editor {
  width: 100%;
  height: 100%;
  position: relative;
}

.markdown-editor__textarea {
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: none;
  outline: none;
  background-color: #f8fafc;
  color: #334155;
}

.markdown-editor__textarea:focus {
  border-color: #94a3b8;
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.5);
}
</style>
