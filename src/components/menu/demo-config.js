import ArenaWorldConfig from "../../js/arena/arena-world-config";
import TheCollectorWorldConfig from "../../js/the-collector/the-collector-world-config";

export const demoData = [
  {
    name: "Arena",
    description:
      "This is a simple shooter demo where 2 teams are trying to beat each others.",
    preview: "./assets/demo-previews/arena.webp",
    worldConfig: ArenaWorldConfig,
    hasTools: true,
    hasCoinInfo: false,
  },
  {
    name: "The Collector",
    description:
      "A game where you should collect all of the coins as fast as possible. Don't fall down :)",
    preview: "./assets/demo-previews/the-collector.webp",
    worldConfig: TheCollectorWorldConfig,
    hasTools: false,
    hasCoinInfo: true,
  } /*
  {
    name: "Random World",
    description:
      "Explore the random generated map with a lot of instanced objects.",
    preview: "./assets/demo-previews/generated-world.webp"
  }, */,
];
