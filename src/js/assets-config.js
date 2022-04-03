import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  SMOKE: "SMOKE",
  POINT: "POINT",
  POLYGON_STARTER: "POLYGON_STARTER",
};

export const FBXModelId = {
  CHARACTERS: "CHARACTERS",
  WATER_GUN_01: "WATER_GUN_01",
  WATER_GUN_02: "WATER_GUN_02",
  WATER_PISTOL_01: "WATER_PISTOL_01",
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

  CHARACTERS_RIFLE_IDLE: "CHARACTERS_RIFLE_IDLE",
  CHARACTERS_RIFLE_WALK: "CHARACTERS_RIFLE_WALK",
  CHARACTERS_RIFLE_WALK_BACKWARDS: "CHARACTERS_RIFLE_WALK_BACKWARDS",
  CHARACTERS_RIFLE_RUN: "CHARACTERS_RIFLE_RUN",
  CHARACTERS_RIFLE_RUN_BACKWARDS: "CHARACTERS_RIFLE_RUN_BACKWARDS",
  CHARACTERS_RIFLE_JUMP_LOOP: "CHARACTERS_RIFLE_JUMP_LOOP",
  CHARACTERS_RIFLE_STRAFE_LEFT: "CHARACTERS_RIFLE_STRAFE_LEFT",
  CHARACTERS_RIFLE_STRAFE_RIGHT: "CHARACTERS_RIFLE_STRAFE_RIGHT",

  CHARACTERS_PISTOL_IDLE: "CHARACTERS_PISTOL_IDLE",
  CHARACTERS_PISTOL_WALK: "CHARACTERS_PISTOL_WALK",
  CHARACTERS_PISTOL_WALK_BACKWARDS: "CHARACTERS_PISTOL_WALK_BACKWARDS",
  CHARACTERS_PISTOL_RUN: "CHARACTERS_PISTOL_RUN",
  CHARACTERS_PISTOL_RUN_BACKWARDS: "CHARACTERS_PISTOL_RUN_BACKWARDS",
  //CHARACTERS_PISTOL_JUMP_LOOP: "CHARACTERS_PISTOL_JUMP_LOOP",
  CHARACTERS_PISTOL_STRAFE_LEFT: "CHARACTERS_PISTOL_STRAFE_LEFT",
  CHARACTERS_PISTOL_STRAFE_RIGHT: "CHARACTERS_PISTOL_STRAFE_RIGHT",

  CHARACTERS_VICTORY: "CHARACTERS_VICTORY",
  CHARACTERS_DASH: "CHARACTERS_DASH",
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
      id: TextureId.SMOKE,
      url: "./assets/textures/effects/smoke.webp",
    },
    {
      id: TextureId.POINT,
      url: "./assets/textures/effects/point.webp",
    },
    {
      id: TextureId.POLYGON_STARTER,
      url: "./assets/textures/polygon-starter-texture-01.webp",
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
    {
      id: FBXModelId.WATER_GUN_01,
      url: "./assets/models/weapons/sm-wep-water-gun-01.fbx",
      material: {
        texture: {
          id: TextureId.POLYGON_STARTER,
        },
      },
    },
    {
      id: FBXModelId.WATER_GUN_02,
      url: "./assets/models/weapons/sm-wep-water-gun-02.fbx",
      material: {
        texture: {
          id: TextureId.POLYGON_STARTER,
        },
      },
    },
    {
      id: FBXModelId.WATER_PISTOL_01,
      url: "./assets/models/weapons/sm-wep-water-pistol-01.fbx",
      material: {
        texture: {
          id: TextureId.POLYGON_STARTER,
        },
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
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_IDLE,
      url: "./assets/models/characters/animations/rifle-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK,
      url: "./assets/models/characters/animations/rifle-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK_BACKWARDS,
      url: "./assets/models/characters/animations/rifle-walk-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN,
      url: "./assets/models/characters/animations/rifle-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN_BACKWARDS,
      url: "./assets/models/characters/animations/rifle-run-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_JUMP_LOOP,
      url: "./assets/models/characters/animations/rifle-jump-loop.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_LEFT,
      url: "./assets/models/characters/animations/rifle-strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_RIGHT,
      url: "./assets/models/characters/animations/rifle-strafe-right.fbx",
    },

    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_IDLE,
      url: "./assets/models/characters/animations/pistol-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_WALK,
      url: "./assets/models/characters/animations/pistol-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_WALK_BACKWARDS,
      url: "./assets/models/characters/animations/pistol-walk-backwards.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_RUN,
      url: "./assets/models/characters/animations/pistol-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_RUN_BACKWARDS,
      url: "./assets/models/characters/animations/pistol-run-backwards.fbx",
    },
    /* {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_JUMP_LOOP,
      url: "./assets/models/characters/animations/pistol-jump-loop.fbx",
    }, */
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_STRAFE_LEFT,
      url: "./assets/models/characters/animations/pistol-strafe-left.fbx",
    },
    {
      id: FBXSkeletonAnimation.CHARACTERS_PISTOL_STRAFE_RIGHT,
      url: "./assets/models/characters/animations/pistol-strafe-right.fbx",
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
