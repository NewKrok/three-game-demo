import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POINT: "POINT",
};

export const FBXModelId = {
  CHARACTERS: "CHARACTERS",
};

export const FBXSkeletonAnimation = {
  CHARACTERS_IDLE: "CHARACTERS_IDLE",
  CHARACTERS_WALK: "CHARACTERS_WALK",
  CHARACTERS_WALK_BACKWARDS: "CHARACTERS_WALK_BACKWARDS",
  CHARACTERS_RUN: "CHARACTERS_RUN",
  CHARACTERS_RUN_BACKWARDS: "CHARACTERS_RUN_BACKWARDS",
  CHARACTERS_JUMP_LOOP: "CHARACTERS_JUMP_LOOP",
  CHARACTERS_WALK_STRAFE_LEFT: "CHARACTERS_WALK_STRAFE_LEFT",
  CHARACTERS_WALK_STRAFE_RIGHT: "CHARACTERS_WALK_STRAFE_RIGHT",
  CHARACTERS_RUN_STRAFE_LEFT: "CHARACTERS_RUN_STRAFE_LEFT",
  CHARACTERS_RUN_STRAFE_RIGHT: "CHARACTERS_RUN_STRAFE_RIGHT",

  CHARACTERS_VICTORY: "CHARACTERS_VICTORY",
  CHARACTERS_DASH: "CHARACTERS_DASH",
};

export const GLTFModelId = {
  LEVEL_GRAPHIC: "LEVEL_GRAPHIC",
  LEVEL_COLLISION: "LEVEL_COLLISION",
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
  ],
  fbxModels: [
    {
      id: FBXModelId.CHARACTERS,
      url: "./assets/models/characters/model/characters.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
      },
    },
  ],
  fbxSkeletonAnimations: [
    {
      id: FBXSkeletonAnimation.CHARACTERS_IDLE,
      url: "./assets/models/characters/animations/idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_WALK,
      url: "./assets/models/characters/animations/walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_WALK_BACKWARDS,
      url: "./assets/models/characters/animations/walk-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RUN,
      url: "./assets/models/characters/animations/run.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RUN_BACKWARDS,
      url: "./assets/models/characters/animations/run-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_JUMP_LOOP,
      url: "./assets/models/characters/animations/jump-loop.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_LEFT,
      url: "./assets/models/characters/animations/walk-strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_RIGHT,
      url: "./assets/models/characters/animations/walk-strafe-right.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_LEFT,
      url: "./assets/models/characters/animations/run-strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_RIGHT,
      url: "./assets/models/characters/animations/run-strafe-right.fbx",
    },

    {
      id: FBXSkeletonAnimation.CHARACTERS_VICTORY,
      url: "./assets/models/characters/animations/victory.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_DASH,
      url: "./assets/models/characters/animations/dash.fbx",
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL_GRAPHIC,
      url: "./assets/models/world/the-collector-graphic.glb",
    },
    {
      id: GLTFModelId.LEVEL_COLLISION,
      url: "./assets/models/world/the-collector-collision.glb",
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
