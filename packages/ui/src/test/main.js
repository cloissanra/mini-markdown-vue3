import { createApp } from 'vue'
import { MarkdownPlugin } from '../index'
import TestApp from './test.vue'

const app = createApp(TestApp)

app.use(MarkdownPlugin)
app.mount('#app')