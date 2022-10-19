<script>
  import Box from "../../../ui/box.svelte";

  export let imgUrl;
  export let count;
</script>

<Box>
  <div class="wrapper">
    <img alt="tank" src={imgUrl} />
    <div class="info">
      {count}
    </div>
  </div>
</Box>

<style lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    gap: 1em;

    img {
      object-fit: contain;
      height: 3em;
    }

    .info {
      font-size: 1.5em;
      color: #ffffff;
    }
  }
</style>
