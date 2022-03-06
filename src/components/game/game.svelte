<script>
  import { initThreeTPSDemo } from "../../js/three-tps-demo";

  window.onload = () => initThreeTPSDemo("#three-tps-demo");
</script>

<div class="wrapper">
  <div id="three-tps-demo">
    <img src="assets/images/crosshair.png" class="crosshair" />
  </div>
</div>

<style lang="scss">
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
      width: 35px;
      height: auto;
      object-fit: contain;
    }
  }
</style>
