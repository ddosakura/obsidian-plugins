<script lang="ts">
  import type ObsidianChatGPTPlugin from "./main";
  import store from "./store";

  let plugin: ObsidianChatGPTPlugin;
  store.plugin.subscribe((p) => (plugin = p));

  export let content: string;
</script>

<div class="foo">
  <span>X {content}!</span>
</div>

<style>
  .foo {
    color: red;
  }
</style>
