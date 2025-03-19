import { App } from "vue";
import MarkdownEditor from "./components/MarkdownEditor.vue";
import MarkdownPreview from "./components/MarkdownPreview.vue";
import MarkdownToc from "./components/MarkdownToc.vue";

export default {
  install(app: App) {
    app.component("MarkdownEditor", MarkdownEditor);
    app.component("MarkdownPreview", MarkdownPreview);
    app.component("MarkdownToc", MarkdownToc);
  },
};
