<script>
  import { demoData } from "./demo-config.svelte";
  import Demo from "./demo.svelte";

  const version = PACKAGE_VERSION;
</script>

<div class="wrapper">
  <div class="frame">
    THREE Game Demo Projects
    <div>version: {version}</div>
  </div>
  <div class="content">
    {#each demoData as demo (demo.name)}
      <Demo config={demo} />
    {/each}
  </div>
  <div class="frame" />
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    min-height: 100%;
    background: #222;
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    .frame {
      background: #000;
      height: 7em;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 3em;
    }
  }
</style>
