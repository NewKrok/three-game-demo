import { GLTFModelId } from "./assets-config.js";

const positionModifier = (position) => {
  position.x = Math.floor(position.x);
  position.y = Math.floor(position.y);
};

export const foliageConfig = {
  [GLTFModelId.TREE_001]: {
    count: 1000,
    sample: {
      rotation: { x: Math.PI / 2 },
    },
    samplerCondition: ({ z }) => z > 9,
    positionModifier,
    randomize: {
      rotation: {
        minZ: -Math.PI,
        maxZ: Math.PI,
      },
      size: {
        min: 1,
        max: 1.6,
      },
    },
    obstacleMap: [
      [0, -1],
      [0, 0],
      [1, -1],
      [1, 0],
    ],
  },
  [GLTFModelId.ROCK_020]: {
    count: 1000,
    sample: {
      rotation: { x: Math.PI / 2 },
    },
    samplerCondition: ({ z }) => z > 7.5,
    positionModifier,
    randomize: {
      rotation: {
        minZ: -Math.PI,
        maxZ: Math.PI,
      },
      size: {
        min: 0.8,
        max: 1.7,
      },
    },
    obstacleMap: [
      [0, -1],
      [0, 0],
      [1, -1],
      [1, 0],
    ],
  },
  [GLTFModelId.DETAILS_012]: {
    count: 5000,
    sample: {
      rotation: { x: Math.PI / 2 },
    },
    samplerCondition: ({ z }) => z > 8.9 && z < 35,
    positionModifier,
    randomize: {
      rotation: {
        minZ: -Math.PI,
        maxZ: Math.PI,
      },
      size: {
        min: 0.9,
        max: 1.4,
      },
    },
    obstacleMap: [],
  },
};
