import {
  App,
  type Command,
  // MarkdownView,
  Modal,
  Notice,
  Plugin,
} from "obsidian";

import {
  DEFAULT_SETTINGS,
  type ObsidianChatGPTPluginSettings,
} from "./settings";
import SettingTab from "./SettingTab";
import { chat, updateLLM } from "./llm";
import store from "./store";
import Component from "./Component.svelte";

export default class ObsidianChatGPTPlugin extends Plugin {
  declare settings: ObsidianChatGPTPluginSettings;
  declare statusBarItemEl: HTMLElement;

  onload() {
    this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));
    this.addCommand(summaryCommand);

    const { vault } = this.app;
    this.addCommand({
      id: "test",
      name: "test",
      async callback() {
        // vault.getFiles().forEach((file) => {
        //   console.log("file", file.path);
        // });
        const file = vault.getFileByPath("FakeListLLM.loom");
        if (!file) return;
        console.log(await vault.read(file));
      },
    });
  }

  onExternalSettingsChange() {
    this.loadSettings();
  }

  onunload() {
  }

  updateStatus() {
    updateLLM(this.settings);
    this.statusBarItemEl.setText(this.settings.OPENAI_API_KEY ? "on" : "off");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.statusBarItemEl = this.addStatusBarItem();
    this.updateStatus();
  }

  async saveSettings() {
    this.updateStatus();
    await this.saveData(this.settings);
  }
}

const summaryCommand = {
  id: "summary",
  name: "Summary Current Note",
  async editorCallback(editor, _view) {
    const chunks = chat([
      ["system", "用一两百字总结下文"],
      ["human", editor.getValue()],
    ]);
    editor.replaceSelection("> ");
    let summary = "";
    for await (const chunk of chunks) {
      const content = String(chunk);
      summary += content;
      editor.replaceSelection(content);
    }
    new Notice(`[AI] 生成完成 ${summary.length}`);
  },
  /*
  checkCallback: (checking) => {
    const markdownView = this.app.workspace.getActiveViewOfType(
      MarkdownView,
    );
    if (markdownView) {
      if (!checking) {
        new ChatModal(this.app, this, markdownView.contentEl.textContent)
          .open();
      }
      return true;
    }
  },
  */
};

class ChatModal extends Modal {
  declare component: Component;

  constructor(
    app: App,
    public plugin: ObsidianChatGPTPlugin,
    public content: string | null,
  ) {
    super(app);
  }

  onOpen() {
    if (!this.content) return;

    store.plugin.set(this.plugin);
    this.component = new Component({
      target: this.contentEl,
      props: {
        content: this.content,
      },
    });
  }

  onClose() {
    this.component.$destroy();
  }
}
