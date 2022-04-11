<script>
  export let percentage = 0;
  export let transitionTime = 0;
</script>

<div class="wrapper">
  <svg
    viewBox="0 0 64 64"
    id="svg"
    width="100%"
    height="100%"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      id="bar"
      r="25%"
      cx="50%"
      cy="50%"
      style={`stroke-dasharray: ${percentage} 100; transition-duration: ${
        transitionTime || 200
      }ms`}
    />
  </svg>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    border-radius: 50%;
    background: #000000bb;
    border: 2px solid #ffffffbb;

    #svg circle {
      stroke-dasharray: 0 100;
      transition: stroke-dasharray 200ms linear;
      stroke: #ffffffbb;
      fill: none;
      stroke-width: 50%;
    }
  }
</style>
