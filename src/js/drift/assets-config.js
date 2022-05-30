import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  SMOKE: "SMOKE",
  ARCADE_CAR_YELLOW: "ARCADE_CAR_YELLOW",
  ARCADE_CAR_RED: "ARCADE_CAR_RED",
  ARCADE_CAR_LIGHT_BLUE: "ARCADE_CAR_LIGHT_BLUE",
  ARCADE_CAR_BLUE: "ARCADE_CAR_BLUE",
  ARCADE_CAR_GRAY: "ARCADE_CAR_GRAY",
};

export const FBXModelId = {
  ARCADE_CAR: "ARCADE_CAR",
};

export const GLTFModelId = {
  LEVEL_GRAPHIC: "LEVEL_GRAPHIC",
  LEVEL_COLLISION: "LEVEL_COLLISION",
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
      id: TextureId.SMOKE,
      url: "./assets/textures/effects/smoke.webp",
    },
    {
      id: TextureId.ARCADE_CAR_YELLOW,
      url: "./assets/textures/arcade-racing-car-tex-yellow.png",
    },
    {
      id: TextureId.ARCADE_CAR_RED,
      url: "./assets/textures/arcade-racing-car-tex-red.png",
    },
    {
      id: TextureId.ARCADE_CAR_LIGHT_BLUE,
      url: "./assets/textures/arcade-racing-car-tex-light-blue.png",
    },
    {
      id: TextureId.ARCADE_CAR_BLUE,
      url: "./assets/textures/arcade-racing-car-tex-blue.png",
    },
    {
      id: TextureId.ARCADE_CAR_GRAY,
      url: "./assets/textures/arcade-racing-car-tex-gray.png",
    },
  ],
  fbxModels: [
    {
      id: FBXModelId.ARCADE_CAR,
      url: "./assets/models/vehicles/arcade-racing-car.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.ARCADE_CAR_YELLOW,
        },
      },
    },
  ],
  fbxSkeletonAnimations: [],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL_GRAPHIC,
      url: "./assets/models/world/drift-graphic.glb",
    },
    {
      id: GLTFModelId.LEVEL_COLLISION,
      url: "./assets/models/world/drift-collision.glb",
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
