<script>
  import Tool from "./tool.svelte";

  const tools = [
    { name: "Hand", img: "./assets/images/tools/hand.png", key: "1" },
    {
      name: "Water Pistol",
      img: "./assets/images/tools/water-pistol.png",
      key: "2",
    },
    {
      name: "Water Gun",
      img: "./assets/images/tools/water-gun.png",
      key: "3",
    },
    {
      name: "Water Laser",
      img: "./assets/images/tools/water-laser.png",
      key: "4",
    },
  ];
</script>

<div class="list">
  {#each tools as tool (tool.name)}
    <Tool {...tool} />
  {/each}
</div>

<style lang="scss">
  .list {
    position: fixed;
    left: 1em;
    top: 1em;
    display: flex;
    gap: 0.5em;
  }
</style>
