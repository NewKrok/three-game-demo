<script>
  import ToolSelector from "./tool-selector/tool-selector.svelte";
  import AbilityList from "./ability-list/ability-list.svelte";
  import Pause from "./pause/pause.svelte";
  import LevelPreloader from "../demo-preloader/demo-preloader.svelte";
  import { initThreeTPSDemo } from "../../js/three-tps-demo";
  import { onMount } from "svelte";

  let loaded = false;

  window.tpsDemo.on.init(() => {
    setTimeout(() => {
      loaded = true;
    }, 1000);
  });

  onMount(() => {
    initThreeTPSDemo("#three-tps-demo");
  });
</script>

{#if !loaded}
  <LevelPreloader />
{/if}
<div class="wrapper">
  <div id="three-tps-demo">
    <img alt="crosshair" src="assets/images/crosshair.png" class="crosshair" />
    <ToolSelector />
    <AbilityList />
    <Pause />
  </div>
</div>

<style lang="scss">
  :root {
    --preloader-progress-ratio: 0%;
  }

  .wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    background: #000;

    .crosshair {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 25px;
      height: auto;
      object-fit: contain;
    }
  }
</style>
