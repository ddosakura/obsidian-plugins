import { type App, PluginSettingTab, Setting } from "obsidian";
import type ObsidianChatGPTPlugin from "./main";

export default class SettingTab extends PluginSettingTab {
  plugin: ObsidianChatGPTPlugin;

  constructor(app: App, plugin: ObsidianChatGPTPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    new Setting(containerEl)
      .setName("OPENAI_API_KEY")
      .setDesc("e.g. sk-")
      .addText((text) =>
        text
          .setPlaceholder("OPENAI_API_KEY")
          .setValue(this.plugin.settings.OPENAI_API_KEY)
          .onChange(async (value) => {
            this.plugin.settings.OPENAI_API_KEY = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("OPENAI_API_BASE")
      .setDesc("e.g. https://api.openai.com/v1")
      .addText((text) =>
        text
          .setPlaceholder("OPENAI_API_BASE")
          .setValue(this.plugin.settings.OPENAI_API_BASE)
          .onChange(async (value) => {
            this.plugin.settings.OPENAI_API_BASE = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("LANGCHAIN_TRACING_V2")
      .setDesc("e.g. https://api.openai.com/v1")
      .addToggle((text) =>
        text
          .setTooltip("LANGCHAIN_TRACING_V2")
          .setValue(this.plugin.settings.LANGCHAIN_TRACING_V2)
          .onChange(async (value) => {
            this.plugin.settings.LANGCHAIN_TRACING_V2 = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("LANGCHAIN_API_KEY")
      .setDesc("e.g. ls__")
      .addText((text) =>
        text
          .setPlaceholder("LANGCHAIN_API_KEY")
          .setValue(this.plugin.settings.LANGCHAIN_API_KEY)
          .onChange(async (value) => {
            this.plugin.settings.LANGCHAIN_API_KEY = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("LANGCHAIN_PROJECT")
      .setDesc("e.g. default")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.LANGCHAIN_PROJECT)
          .onChange(async (value) => {
            this.plugin.settings.LANGCHAIN_PROJECT = value;
            await this.plugin.saveSettings();
          })
      );
    new Setting(containerEl)
      .setName("LANGCHAIN_ENDPOINT")
      .setDesc("e.g. https://api.smith.langchain.com")
      .addText((text) =>
        text.setPlaceholder("LANGCHAIN_ENDPOINT")
          .setValue(this.plugin.settings.LANGCHAIN_ENDPOINT)
          .onChange(async (value) => {
            this.plugin.settings.LANGCHAIN_ENDPOINT = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
