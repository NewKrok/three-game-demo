<script context="module">
  import ArenaWorldConfig from "../../js/arena/arena-world-config";
  import CarSpeedDisplay from "../game/car-speed-display/car-speed-display.svelte";
  import ToolSelector from "../game/tool-selector/tool-selector.svelte";
  import CollectedCoins from "../game/collected-coins/collected-coins.svelte";
  import CheckpointTimes from "../game/checkpoint-times/checkpoint-times.svelte";
  import DriftWorldConfig from "../../js/drift/drift-world-config";
  import TheCollectorWorldConfig from "../../js/the-collector/the-collector-world-config";
  import AbilityList from "../game/ability-list/ability-list.svelte";
  import GameClock from "../game/game-clock/game-clock.svelte";

  // TODO: Add separated control info
  export const demoData = [
    {
      name: "Arena",
      description:
        "This is a simple shooter demo where 2 teams are trying to beat each others. Press 'C' for change camera.",
      preview: "./assets/demo-previews/arena.webp",
      worldConfig: ArenaWorldConfig,
      components: [ToolSelector, AbilityList],
    },
    {
      name: "The Collector",
      description:
        "A game where you should collect all of the coins as fast as possible. Don't fall down :) Press 'C' for change camera.",
      preview: "./assets/demo-previews/the-collector.webp",
      worldConfig: TheCollectorWorldConfig,
      components: [CollectedCoins, AbilityList, GameClock],
    },
    {
      name: "Drift",
      description:
        "This is an Octree-Car demo, press the gas pedal and beat the bends. Press 'C' for change camera, 'V' for change the car's color.",
      preview: "./assets/demo-previews/drift.webp",
      worldConfig: DriftWorldConfig,
      components: [CarSpeedDisplay, CheckpointTimes],
    } /*
  {
    name: "Random World",
    description:
      "Explore the random generated map with a lot of instanced objects.",
    preview: "./assets/demo-previews/generated-world.webp"
  }, */,
  ];
</script>
