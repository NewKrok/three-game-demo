import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POINT: "POINT",
  CAR_1: "CAR_1",
};

export const FBXModelId = {};

export const GLTFModelId = {
  LEVEL: "LEVEL",
  COINS: "COINS",
  CAR_1: "CAR_1",
  CAR_WHEEL: "CAR_WHEEL",
  COIN: "COIN",
};

export const AudioId = { GAME_BACKGROUND: "GAME_BACKGROUND" };

export const assetsConfig = {
  textures: [
    {
      id: TextureId.SKYBOX_1,
      url: "./assets/textures/skybox/left.webp",
    },
    {
      id: TextureId.SKYBOX_2,
      url: "./assets/textures/skybox/right.webp",
    },
    {
      id: TextureId.SKYBOX_3,
      url: "./assets/textures/skybox/up.webp",
    },
    {
      id: TextureId.SKYBOX_4,
      url: "./assets/textures/skybox/down.webp",
    },
    {
      id: TextureId.SKYBOX_5,
      url: "./assets/textures/skybox/front.webp",
    },
    {
      id: TextureId.SKYBOX_6,
      url: "./assets/textures/skybox/back.webp",
    },
    {
      id: TextureId.POINT,
      url: "./assets/textures/effects/point.webp",
    },
    {
      id: TextureId.CAR_1,
      url: "./assets/textures/car_03_m1.png",
    },
  ],
  fbxModels: [],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL,
      url: "./assets/models/world/monster-truck-level.glb",
    },
    {
      id: GLTFModelId.COINS,
      url: "./assets/models/world/monster-truck-coins.glb",
    },
    {
      id: GLTFModelId.CAR_1,
      url: "./assets/models/vehicles/monster-truck-car.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.CAR_1,
          flipY: false,
        },
      },
    },
    {
      id: GLTFModelId.CAR_WHEEL,
      url: "./assets/models/vehicles/monster-truck-car-wheel.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.CAR_1,
          flipY: false,
        },
      },
    },
    {
      id: GLTFModelId.COIN,
      url: "./assets/models/collectibles/sm-polygon-prototype-icon-coin-01.glb",
      material: {
        color: 0xfe1781,
      },
    },
  ],
  audio: [
    {
      id: AudioId.GAME_BACKGROUND,
      url: "./assets/audio/music/game-theme.ogg",
    },
  ],
};

export const audioConfig = {
  [AudioId.GAME_BACKGROUND]: {
    loop: true,
    isMusic: true,
    volume: 0.5,
  },
};
