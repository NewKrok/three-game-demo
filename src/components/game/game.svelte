<script>
  import { get } from "svelte/store";
  import ToolSelector from "./tool-selector/tool-selector.svelte";
  import AbilityList from "./ability-list/ability-list.svelte";
  import Pause from "./pause/pause.svelte";
  import LevelPreloader from "../demo-preloader/demo-preloader.svelte";
  import { initThreeTPSDemo } from "../../js/three-tps-demo";
  import { onMount } from "svelte";
  import { selectedDemo } from "../../store/app";
  import CollectedCoins from "./collected-coins/collected-coins.svelte";

  let loaded = false;
  const { hasTools, hasCoinInfo, worldConfig } = get(selectedDemo) || {};

  window.tpsDemo.on.init(() => {
    setTimeout(() => {
      loaded = true;
    }, 1000);
  });

  onMount(() => {
    initThreeTPSDemo("#three-tps-demo", worldConfig);
  });
</script>

{#if !loaded}
  <LevelPreloader />
{/if}
<div class="wrapper">
  <div id="three-tps-demo">
    <img alt="crosshair" src="assets/images/crosshair.png" class="crosshair" />
    <div class="topContainer">
      {#if hasTools}
        <ToolSelector />
      {/if}
      {#if hasCoinInfo}
        <CollectedCoins />
      {/if}
    </div>
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

    .topContainer {
      position: fixed;
      left: 1em;
      top: 1em;
      display: flex;
      gap: 0.5em;
    }

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
