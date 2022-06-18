<script context="module">
  import ArenaWorldConfig from "../../js/arena/arena-world-config";
  import CarSpeedDisplay from "../game/car-speed-display/car-speed-display.svelte";
  import ToolSelector from "../game/tool-selector/tool-selector.svelte";
  import CollectedCoins from "../game/collected-coins/collected-coins.svelte";
  import CheckpointTimes from "../game/checkpoint-times/checkpoint-times.svelte";
  import DriftWorldConfig from "../../js/drift/drift-world-config";
  import SnakeVSWorldConfig from "../../js/snake-vs/snake-vs-world-config";
  import TheCollectorWorldConfig from "../../js/the-collector/the-collector-world-config";
  import AbilityList from "../game/ability-list/ability-list.svelte";
  import GameClock from "../game/game-clock/game-clock.svelte";
  import Leaderboard from "../game/leaderboard/leaderboard.svelte";

  // TODO: Add separated control info
  export const demoData = [
    {
      name: "Arena",
      description:
        "This is a simple shooter demo where 2 teams are trying to beat each others.",
      preview: "./assets/demo-previews/arena.webp",
      worldConfig: ArenaWorldConfig,
      components: [ToolSelector, AbilityList],
      controls: [
        {
          keys: ["w", "a", "s", "d"],
          name: "Movements",
        },
        {
          keys: [
            "keyboard_arrow_up",
            "keyboard_arrow_left",
            "keyboard_arrow_down",
            "keyboard_arrow_right",
          ],
          name: "Movements (2)",
        },
        {
          keys: ["space"],
          name: "Jump",
        },
        {
          keys: ["Shift"],
          name: "Sprint",
        },
        {
          keys: ["q"],
          name: "Dash",
        },
        {
          keys: ["1", "2", "3", "4"],
          name: "Change Weapon",
        },
        {
          keys: ["Mouse scroll"],
          name: "Change Weapon (2)",
        },
        {
          keys: ["c"],
          name: "Change Camera",
        },
        {
          keys: ["Left Click"],
          name: "Fire",
        },
        {
          keys: ["Right Click"],
          name: "Aim",
        },
      ],
    },
    {
      name: "The Collector",
      description:
        "A game where you should collect all of the coins as fast as possible.",
      preview: "./assets/demo-previews/the-collector.webp",
      worldConfig: TheCollectorWorldConfig,
      components: [CollectedCoins, AbilityList, GameClock],
      controls: [
        {
          keys: ["w", "a", "s", "d"],
          name: "Movements",
        },
        {
          keys: [
            "keyboard_arrow_up",
            "keyboard_arrow_left",
            "keyboard_arrow_down",
            "keyboard_arrow_right",
          ],
          name: "Movements (2)",
        },
        {
          keys: ["Shift"],
          name: "Sprint",
        },
        {
          keys: ["space"],
          name: "Jump",
        },
        {
          keys: ["q"],
          name: "Dash",
        },
        {
          keys: ["c"],
          name: "Change Camera",
        },
        {
          keys: ["Right Click"],
          name: "Aim",
        },
      ],
    },
    {
      name: "Drift",
      description:
        "This is an Octree-Car demo, press the gas pedal and beat the bends.",
      preview: "./assets/demo-previews/drift.webp",
      worldConfig: DriftWorldConfig,
      components: [CarSpeedDisplay, CheckpointTimes],
      controls: [
        {
          keys: ["w", "keyboard_arrow_up"],
          name: "Throttle",
        },
        {
          keys: ["s", "keyboard_arrow_down"],
          name: "Brake",
        },
        {
          keys: ["a", "keyboard_arrow_left"],
          name: "Steer Left",
        },
        {
          keys: ["d", "keyboard_arrow_right"],
          name: "Steer Right",
        },
        {
          keys: ["c"],
          name: "Change Camera",
        },
        {
          keys: ["v"],
          name: "Change Car Color",
        },
      ],
    },
    {
      name: "Snake VS",
      description:
        "A classic game in 3D and with enemies. A simple example how can you combine your own game logic with this engine.",
      preview: "./assets/demo-previews/snake-vs.webp",
      worldConfig: SnakeVSWorldConfig,
      components: [GameClock, Leaderboard],
      controls: [
        {
          keys: ["w", "a", "s", "d"],
          name: "Movements",
        },
        {
          keys: [
            "keyboard_arrow_up",
            "keyboard_arrow_left",
            "keyboard_arrow_down",
            "keyboard_arrow_right",
          ],
          name: "Movements (2)",
        },
        {
          keys: ["c"],
          name: "Change Camera",
        },
      ],
    },
  ];
</script>
