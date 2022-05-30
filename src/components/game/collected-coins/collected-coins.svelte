<script>
  import {
    availableCollectableCount,
    collectedCollectableCount,
  } from "../../../store/app";

  import Box from "../../../ui/box.svelte";

  let collectedCollectableCountValue;
  let availableCollectableCountValue;

  collectedCollectableCount.subscribe((value) => {
    collectedCollectableCountValue = value;
  });
  availableCollectableCount.subscribe((value) => {
    availableCollectableCountValue = value;
  });
</script>

<Box>
  <div class="wrapper">
    <img alt="coin" src="./assets/images/coin.webp" />
    <div class="info">
      {collectedCollectableCountValue} / {availableCollectableCountValue}
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
