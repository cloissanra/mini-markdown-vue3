import { createApp } from "vue";
import App from "./App.vue";
import { MarkdownPlugin } from "@mini-markdown/ui";
import "./style.css";

const app = createApp(App);

// 注册Markdown组件
app.use(MarkdownPlugin);

app.mount("#app");
