<script>
  import { remainingOpponentUnitCount } from "../../../store/app";
  import TankCounter from "./tank-counter.svelte";

  let remainingOpponentUnitCountValue;
  remainingOpponentUnitCount.subscribe((value) => {
    remainingOpponentUnitCountValue = value;
  });
</script>

<TankCounter
  imgUrl="./assets/images/tank-green.webp"
  count={remainingOpponentUnitCountValue}
/>
