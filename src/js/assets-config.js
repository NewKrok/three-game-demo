import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  SOLIDER: "SOLIDER",
  WEAPON: "WEAPON",
  POLYGON_STARTER: "POLYGON_STARTER",
};

export const FBXModelId = {
  SOLIDER: "SOLIDER",
};

export const FBXSkeletonAnimation = {
  IDLE: "IDLE",
  RIFLE_AIMING_IDLE: "RIFLE_AIMING_IDLE",
  JUMP_LOOP: "JUMP_LOOP",
  RIFLE_WALK: "RIFLE_WALK",
  RIFLE_AIMING_WALK: "RIFLE_AIMING_WALK",
  RIFLE_WALK_BACKWARD: "RIFLE_WALK_BACKWARD",
  RIFLE_RUN: "RIFLE_RUN",
  RIFLE_AIMING_RUN: "RIFLE_AIMING_RUN",
  STRAFE_LEFT: "STRAFE_LEFT",
  STRAFE_RIGHT: "STRAFE_RIGHT",
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
      url: "./assets/textures/skybox/left.png",
    },
    {
      id: TextureId.SKYBOX_2,
      url: "./assets/textures/skybox/right.png",
    },
    {
      id: TextureId.SKYBOX_3,
      url: "./assets/textures/skybox/up.png",
    },
    {
      id: TextureId.SKYBOX_4,
      url: "./assets/textures/skybox/down.png",
    },
    {
      id: TextureId.SKYBOX_5,
      url: "./assets/textures/skybox/front.png",
    },
    {
      id: TextureId.SKYBOX_6,
      url: "./assets/textures/skybox/back.png",
    },
    {
      id: TextureId.SOLIDER,
      url: "./assets/characters/solider/soldier-512.webp",
    },
    {
      id: TextureId.WEAPON,
      url: "./assets/characters/solider/weapon.webp",
    },
    {
      id: TextureId.POLYGON_STARTER,
      url: "./assets/textures/polygon-starter-texture-01.png",
    },
  ],
  fbxModels: [
    {
      id: FBXModelId.SOLIDER,
      url: "./assets/characters/solider/solider.fbx",
      materialType: THREE.MeshLambertMaterial,
      texture: [
        {
          id: TextureId.SOLIDER,
        },
        {
          id: TextureId.WEAPON,
        },
      ],
    },
  ],
  fbxSkeletonAnimations: [
    {
      id: FBXSkeletonAnimation.IDLE,
      url: "./assets/characters/solider/idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_AIMING_IDLE,
      url: "./assets/characters/solider/rifle-aiming-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.JUMP_LOOP,
      url: "./assets/characters/solider/jump-loop.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_WALK,
      url: "./assets/characters/solider/rifle-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_AIMING_WALK,
      url: "./assets/characters/solider/rifle-aiming-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_RUN,
      url: "./assets/characters/solider/rifle-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_AIMING_RUN,
      url: "./assets/characters/solider/rifle-aiming-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.RIFLE_WALK_BACKWARD,
      url: "./assets/characters/solider/rifle-walk-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.STRAFE_LEFT,
      url: "./assets/characters/solider/strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.STRAFE_RIGHT,
      url: "./assets/characters/solider/strafe-right.fbx",
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL_1_GRAPHIC,
      url: "./assets/models/level-1-graphic.glb",
    },
    {
      id: GLTFModelId.LEVEL_1_COLLISION,
      url: "./assets/models/level-1-collision.glb",
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
