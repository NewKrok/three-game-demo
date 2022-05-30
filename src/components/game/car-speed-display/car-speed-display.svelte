<script>
  import { carSpeed } from "./../../../store/app.js";

  import Box from "../../../ui/box.svelte";

  let carSpeedValue;

  carSpeed.subscribe((value) => {
    carSpeedValue = value;
  });
</script>

<div class="wrapper">
  <Box>
    <div class="content">
      <div class="info">
        {carSpeedValue} km/h
      </div>
    </div>
  </Box>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    left: 50%;
    bottom: 3em;
    transform: translateX(-50%);

    .content {
      display: flex;
      align-items: center;
      gap: 1em;

      .info {
        font-size: 1.5em;
        color: #ffffff;
      }
    }
  }
</style>
