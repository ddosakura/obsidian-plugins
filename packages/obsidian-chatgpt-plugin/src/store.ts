import { writable } from "svelte/store";
import type ObsidianChatGPTPlugin from "./main";

const plugin = writable<ObsidianChatGPTPlugin>();
export default { plugin };
