<script>
  import { TrickType } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/nape-car/nape-car-trick-calculator.js";
  import { tricks } from "../../../store/app";

  import Box from "../../../ui/box.svelte";

  let tricksValue;

  tricks.subscribe((value) => {
    tricksValue = value;
  });
</script>

<div class="wrapper">
  {#each tricksValue as trick}
    <Box>
      <div class="info">
        {trick.type}
        {trick.isBackFlip || trick.isBackWheelie ? "BACK" : "FRONT"}
        {trick.type === TrickType.FLIP
          ? `x${trick.count}`
          : `${Math.floor(trick.duration / 100) / 10}s`}
      </div>
    </Box>
  {/each}
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    gap: 1em;
    flex-direction: column-reverse;
    align-items: start;
    position: fixed;
    left: 1em;
    top: 6em;
    height: 30%;
    overflow: hidden;
    justify-content: start;

    .info {
      font-size: 1.5em;
      color: #ffffff;
    }
  }
</style>
