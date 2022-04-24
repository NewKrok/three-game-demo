<script>
  import Box from "../../../ui/box.svelte";
  import CircleProgress from "../../../ui/circle-progress.svelte";

  export let id;
  export let name;
  export let cooldownTime;
  export let img;
  export let key;

  let calculatedCooldownTime = 0;
  let percentage = 0;
  let timeout = null;

  window.tpsDemo.game.ability[id] = () => {
    if (timeout) clearTimeout(timeout);
    calculatedCooldownTime = 1;
    percentage = 0;
    setTimeout(() => {
      percentage = 100;
      calculatedCooldownTime = cooldownTime;
    }, 10);
    timeout = setTimeout(() => {
      calculatedCooldownTime = 0;
    }, cooldownTime);
  };
</script>

<div class="tool">
  <Box>
    <img alt={name} src={img} />
    <div class="key">{key}</div>
    {#if calculatedCooldownTime}
      <CircleProgress {percentage} transitionTime={calculatedCooldownTime} />
    {/if}
  </Box>
</div>

<style lang="scss">
  .tool {
    img {
      display: block;
      width: 3em;
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
