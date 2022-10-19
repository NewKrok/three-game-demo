<script>
  import { remainingPlayerUnitCount } from "../../../store/app";

  import TankCounter from "./tank-counter.svelte";

  let remainingPlayerUnitCountValue;
  remainingPlayerUnitCount.subscribe((value) => {
    remainingPlayerUnitCountValue = value;
  });
</script>

<TankCounter
  imgUrl="./assets/images/tank-red.webp"
  count={remainingPlayerUnitCountValue}
/>
