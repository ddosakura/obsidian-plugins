export interface ObsidianChatGPTPluginSettings {
  OPENAI_API_KEY: string;
  OPENAI_API_BASE: string;

  LANGCHAIN_TRACING_V2: boolean;
  LANGCHAIN_API_KEY: string;
  LANGCHAIN_PROJECT: string;
  LANGCHAIN_ENDPOINT: string;
}

export const DEFAULT_SETTINGS: ObsidianChatGPTPluginSettings = {
  OPENAI_API_KEY: "",
  OPENAI_API_BASE: "https://api.openai.com/v1",

  LANGCHAIN_TRACING_V2: false,
  LANGCHAIN_API_KEY: "",
  LANGCHAIN_PROJECT: "default",
  LANGCHAIN_ENDPOINT: "https://api.smith.langchain.com",
};
