import { Client } from "langsmith";
import { LangChainTracer } from "langchain/callbacks";
import { FakeListLLM } from "langchain/llms/fake";
import { ChatOpenAI } from "@langchain/openai";

import {
  DEFAULT_SETTINGS,
  type ObsidianChatGPTPluginSettings,
} from "./settings";

const store: {
  settings: ObsidianChatGPTPluginSettings;
  tracer?: LangChainTracer;
} = {
  settings: DEFAULT_SETTINGS,
};

export function updateLLM(settings: ObsidianChatGPTPluginSettings) {
  store.settings = settings;
  store.tracer = settings.LANGCHAIN_TRACING_V2
    ? new LangChainTracer({
      projectName: settings.LANGCHAIN_PROJECT ||
        DEFAULT_SETTINGS.LANGCHAIN_PROJECT,
      client: new Client({
        apiUrl: settings.LANGCHAIN_ENDPOINT ||
          DEFAULT_SETTINGS.LANGCHAIN_ENDPOINT,
        apiKey: settings.LANGCHAIN_API_KEY ||
          DEFAULT_SETTINGS.LANGCHAIN_API_KEY,
      }),
    })
    : undefined;
}

const llm = new FakeListLLM({
  responses: [
    "Because Oct 31 equals Dec 25",
    "You 'console' them!",
  ],
  sleep: 100,
});

export async function* chat0(input: any) {
  const chat = new ChatOpenAI({
    openAIApiKey: store.settings.OPENAI_API_KEY,
    configuration: {
      baseURL: store.settings.OPENAI_API_BASE,
    },
  });

  const stream = await chat.stream(
    input,
    store.tracer ? { callbacks: [store.tracer] } : {},
  );
  for await (const chunk of stream) {
    yield chunk.content;
  }
}

export async function* chat(input: any) {
  const stream = await llm.stream(
    input,
    store.tracer ? { callbacks: [store.tracer] } : {},
  );
  for await (const chunk of stream) {
    yield chunk;
  }
}
