<script lang="ts">
  export let src: string;
  export let alt: string;
  export let width: string | null;
  export let height: string | null;
</script>

<div class="image-view">
  <img {...{ width, height }} {src} {alt} />
  <span>{alt}</span>
</div>

<style>
  .image-view {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
