import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import MarkdownEditor from './MarkdownEditor.vue';

describe('MarkdownEditor Component', () => {
  it('renders MarkdownEditor component', () => {
    const { getByPlaceholderText } = render(MarkdownEditor);
    // 检查组件是否正确渲染
    expect(getByPlaceholderText('Type your markdown here...')).toBeInTheDocument();
  });

  it('updates value on input', async () => {
    const { getByPlaceholderText } = render(MarkdownEditor);
    const input = getByPlaceholderText('Type your markdown here...');
    
    // 模拟用户输入
    await fireEvent.update(input, '# Hello World');
    // 检查输入框的值是否更新
    expect((input as HTMLTextAreaElement).value).toBe('# Hello World');
  });

  it('emits input event with correct value', async () => {
    const { getByPlaceholderText, emitted } = render(MarkdownEditor);
    const input = getByPlaceholderText('Type your markdown here...');
    
    // 模拟用户输入
    await fireEvent.update(input, '# Markdown Test');
    // 检查是否正确触发了 input 事件
    expect(emitted().input[0]).toEqual(['# Markdown Test']);
  });
});