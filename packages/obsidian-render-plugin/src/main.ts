import { Notice, Plugin } from "obsidian";
// import { batchInvoke } from "@antfu/utils";

import ImageView from "./components/ImageView.svelte";

export default class ObsidianPlugin extends Plugin {
  // umounts: Array<() => void> = [];

  async onload() {
    this.registerMarkdownPostProcessor((el, _ctx) => {
      const startTime = performance.now();

      // batchInvoke(this.umounts);
      // this.umounts = [];

      const images = el
        .findAll("img") as HTMLImageElement[];
      if (!images.length) return;

      for (let image of images) {
        const { src, alt } = image;
        const mount = (target: HTMLElement) => {
          const component = new ImageView({
            target,
            props: {
              src,
              alt,
              width: image.getAttr("width"),
              height: image.getAttr("height"),
            },
          });
          // this.umounts.push(() => component.$destroy());
          return target;
        };
        const parent = image.parentElement;
        if (parent?.childElementCount === 1) {
          image.remove();
          mount(parent);
        } else {
          image.replaceWith(mount(image.createDiv()));
        }
      }

      const d = performance.now() - startTime;
      new Notice(`[Render] ${images.length} images take ${d}ms`);
    });
  }

  onunload() {
  }
}

/*
this.registerMarkdownPostProcessor((el, _ctx) => {
  const links = el
    .findAll("a[class=external-link]") as HTMLLinkElement[];
  for (let link of links) {
    console.log("links", link.href);
  }
});
*/
