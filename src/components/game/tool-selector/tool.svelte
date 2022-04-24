<script>
  import Box from "../../../ui/box.svelte";

  export let name;
  export let img;
  export let key;
</script>

<div class="tool">
  <Box>
    <img alt={name} src={img} />
    <div class="key">{key}</div>
  </Box>
</div>

<style lang="scss">
  .tool {
    img {
      object-fit: contain;
      height: 3em;
    }

    .key {
      position: absolute;
      right: 0.55em;
      bottom: 0.25em;
      font-size: 1.25em;
    }
  }
</style>
