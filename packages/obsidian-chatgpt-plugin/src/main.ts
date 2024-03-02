import {
  App,
  // MarkdownView,
  Modal,
  // Notice,
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

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingTab(this.app, this));

    this.addCommand({
      id: "summary",
      name: "Summary Current Note",
      async editorCallback(editor, _view) {
        editor.replaceSelection("> ");
        const chunks = chat(editor.getValue());
        for await (const content of chunks) {
          editor.replaceSelection(String(content));
        }
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
    });
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
    if (this.content) return;

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
