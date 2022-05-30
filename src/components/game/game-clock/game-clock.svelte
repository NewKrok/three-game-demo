<script>
  import { staticParams } from "./../../../js/static.js";
  import Box from "../../../ui/box.svelte";
  import {
    formatTime,
    TimePattern,
  } from "@newkrok/three-utils/src/js/newkrok/three-utils/time-utils.js";
  import { onMount } from "svelte";

  let elapsed = 0;

  onMount(() => {
    const interval = setInterval(() => {
      elapsed = staticParams.cycleData?.elapsed * 1000 || 0;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="wrapper">
  <Box>
    {formatTime(elapsed, TimePattern.MM_SS)}
  </Box>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    left: 50%;
    top: 1em;
    transform: translateX(-50%);
    font-size: 1.5em;
  }
</style>
