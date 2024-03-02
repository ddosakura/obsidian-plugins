import { MarkdownRenderChild } from "obsidian";
import type { SvelteComponent } from "svelte";

function toMarkdownRenderChildClass<T extends new (...args: any) => any>(t: T) {
  return class extends MarkdownRenderChild {
    declare component: T & SvelteComponent;

    constructor(
      public options: ConstructorParameters<T>[0],
    ) {
      super(options.target);
    }

    onload() {
      this.component = new t(this.options);
    }

    onunload() {
      this.component.$destroy();
    }
  };
}

export function toMarkdownRenderChild<T extends new (...args: any) => any>(
  t: T,
  options: ConstructorParameters<T>[0],
) {
  return new (toMarkdownRenderChildClass(t))(options);
}
