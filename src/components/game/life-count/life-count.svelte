<script>
  import { lifeCount } from "../../../store/app";

  import Box from "../../../ui/box.svelte";

  let lifeCountValue;
  lifeCount.subscribe((value) => {
    lifeCountValue = value;
  });
</script>

<Box>
  <div class="wrapper">
    <img alt="life" src="./assets/images/life.webp" />
    <div class="info">
      {lifeCountValue}
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
