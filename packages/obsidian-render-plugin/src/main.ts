import { type MarkdownPostProcessorContext, Notice, Plugin } from "obsidian";

import ImageView from "./components/ImageView.svelte";
import { toMarkdownRenderChild } from "./utils";

export default class ObsidianPlugin extends Plugin {
  onload() {
    this.registerMarkdownPostProcessor(imageProcessor);
  }

  onunload() {
  }
}

function imageProcessor(
  el: HTMLElement,
  ctx: MarkdownPostProcessorContext,
) {
  const startTime = performance.now();

  const images = el
    .findAll("img") as HTMLImageElement[];
  if (!images.length) return;

  for (let image of images) {
    const { src, alt } = image;
    const mount = (target: HTMLElement) => {
      ctx.addChild(toMarkdownRenderChild(ImageView, {
        target,
        props: {
          src,
          alt,
          width: image.getAttr("width"),
          height: image.getAttr("height"),
        },
      }));
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
