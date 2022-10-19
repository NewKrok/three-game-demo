<script context="module">
  import TankBattleWorldConfig from "./../../js/tank-battle/tank-battle-world-config.js";
  import ArenaWorldConfig from "../../js/arena/arena-world-config";
  import CarSpeedDisplay from "../game/car-speed-display/car-speed-display.svelte";
  import ToolSelector from "../game/tool-selector/tool-selector.svelte";
  import CollectedCoins from "../game/collected-coins/collected-coins.svelte";
  import CheckpointTimes from "../game/checkpoint-times/checkpoint-times.svelte";
  import DriftWorldConfig from "../../js/drift/drift-world-config";
  import SnakeVSWorldConfig from "../../js/snake-vs/snake-vs-world-config";
  import MonsterTruck2DWorldConfig from "../../js/monster-truck-2d/monster-truck-2d-world-config";
  import TheCollectorWorldConfig from "../../js/the-collector/the-collector-world-config";
  import AbilityList from "../game/ability-list/ability-list.svelte";
  import GameClock from "../game/game-clock/game-clock.svelte";
  import Leaderboard from "../game/leaderboard/leaderboard.svelte";
  import Tricks from "../game/tricks/tricks.svelte";
  import LifeCount from "../game/life-count/life-count.svelte";
  import PlayerTankCounter from "../game/tank-counter/player-tank-counter.svelte";
  import OpponentTankCounter from "../game/tank-counter/opponent-tank-counter.svelte";

  // TODO: Add separated control info
  export const demoData = [
    {
      name: "Arena",
      description:
        "This is a simple shooter demo where 2 teams are trying to beat each others.",
      preview: "./assets/demo-previews/arena.webp",
      worldConfig: ArenaWorldConfig,
      isPointerLockNeeded: true,
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
      isPointerLockNeeded: true,
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
      isPointerLockNeeded: false,
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
      isPointerLockNeeded: false,
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
    {
      name: "Monster Truck 2D",
      description:
        "A 2D physics based car game. It's using the Nape physics, compiled from Haxe to Javascript.",
      preview: "./assets/demo-previews/monster-truck-2d.webp",
      worldConfig: MonsterTruck2DWorldConfig,
      isPointerLockNeeded: false,
      components: [GameClock, CollectedCoins, Tricks],
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
    {
      name: "Tank Battle",
      description:
        "A demo game inspired by the classic Battle City. Red vs Green! It presents how can you add your custom collision detection for the projectiles module.",
      preview: "./assets/demo-previews/tank-battle.webp",
      worldConfig: TankBattleWorldConfig,
      isPointerLockNeeded: false,
      components: [
        GameClock,
        LifeCount,
        PlayerTankCounter,
        OpponentTankCounter,
      ],
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
          name: "Shooting",
        },
        {
          keys: ["c"],
          name: "Change Camera",
        },
        {
          keys: ["v"],
          name: "Change Tank Color",
        },
      ],
    },
  ];
</script>
