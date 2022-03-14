<script>
  import Box from "../../ui/box.svelte";
  const version = PACKAGE_VERSION;
</script>

<div class="wrapper">
  <Box>
    version: {version}
  </Box>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    right: 1em;
    bottom: 1em;
  }
</style>
