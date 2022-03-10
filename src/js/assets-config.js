import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POLYGON_STARTER_BLUE: "POLYGON_STARTER_BLUE",
  POLYGON_STARTER_BROWN: "POLYGON_STARTER_BROWN",
  POLYGON_STARTER_GRAY: "POLYGON_STARTER_GRAY",
  POLYGON_STARTER_YELLOW: "POLYGON_STARTER_YELLOW",
};

export const FBXModelId = {
  CHARACTERS: "CHARACTERS",
};

export const FBXSkeletonAnimation = {
  CHARACTERS_IDLE: "CHARACTERS_IDLE",
  CHARACTERS_WALK: "CHARACTERS_WALK",
  CHARACTERS_RIFLE_WALK_BACKWARDS: "CHARACTERS_RIFLE_WALK_BACKWARDS",
  CHARACTERS_RIFLE_RUN_BACKWARDS: "CHARACTERS_RIFLE_RUN_BACKWARDS",
  CHARACTERS_RUN: "CHARACTERS_RUN",
  CHARACTERS_RIFLE_AIMING_RUN: "CHARACTERS_RIFLE_AIMING_RUN",
  CHARACTERS_JUMP_LOOP: "CHARACTERS_JUMP_LOOP",
  CHARACTERS_RIFLE_JUMP_LOOP: "CHARACTERS_RIFLE_JUMP_LOOP",
  CHARACTERS_RIFLE_AIMING_IDLE: "CHARACTERS_RIFLE_AIMING_IDLE",
  IDLE: "IDLE",
  RIFLE_AIMING_IDLE: "RIFLE_AIMING_IDLE",
  JUMP_LOOP: "JUMP_LOOP",
  CHARACTERS_RIFLE_WALK: "CHARACTERS_RIFLE_WALK",
  RIFLE_AIMING_WALK: "RIFLE_AIMING_WALK",
  RIFLE_WALK_BACKWARD: "RIFLE_WALK_BACKWARD",
  CHARACTERS_RIFLE_STRAFE_LEFT: "CHARACTERS_RIFLE_STRAFE_LEFT",
  CHARACTERS_RIFLE_STRAFE_RIGHT: "CHARACTERS_RIFLE_STRAFE_RIGHT",
};

export const GLTFModelId = {
  LEVEL_1_GRAPHIC: "LEVEL_1_GRAPHIC",
  LEVEL_1_COLLISION: "LEVEL_1_COLLISION",
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
      id: TextureId.POLYGON_STARTER_BLUE,
      url: "./assets/textures/polygon-starter-texture-01.webp",
    },
    {
      id: TextureId.POLYGON_STARTER_BROWN,
      url: "./assets/textures/polygon-starter-texture-02.webp",
    },
    {
      id: TextureId.POLYGON_STARTER_GRAY,
      url: "./assets/textures/polygon-starter-texture-03.webp",
    },
    {
      id: TextureId.POLYGON_STARTER_YELLOW,
      url: "./assets/textures/polygon-starter-texture-04.webp",
    },
  ],
  fbxModels: [
    {
      id: FBXModelId.CHARACTERS,
      url: "./assets/models/characters/model/characters.fbx",
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
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK_BACKWARDS,
      url: "./assets/models/characters/animations/rifle-walk-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN_BACKWARDS,
      url: "./assets/models/characters/animations/rifle-run-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RUN,
      url: "./assets/models/characters/animations/run.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_AIMING_RUN,
      url: "./assets/models/characters/animations/rifle-aiming-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_JUMP_LOOP,
      url: "./assets/models/characters/animations/jump-loop.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_JUMP_LOOP,
      url: "./assets/models/characters/animations/rifle-jump-loop.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_AIMING_IDLE,
      url: "./assets/models/characters/animations/rifle-aiming-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK,
      url: "./assets/models/characters/animations/rifle-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_LEFT,
      url: "./assets/models/characters/animations/rifle-strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_RIGHT,
      url: "./assets/models/characters/animations/rifle-strafe-right.fbx",
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL_1_GRAPHIC,
      url: "./assets/models/world/level-1-graphic.glb",
    },
    {
      id: GLTFModelId.LEVEL_1_COLLISION,
      url: "./assets/models/world/level-1-collision.glb",
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
