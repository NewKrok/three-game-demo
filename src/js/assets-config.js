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
  CONCRETE: "CONCRETE",
  MUD: "MUD",
  SMOKE: "SMOKE",
  POINT: "POINT",
  FIRE: "FIRE",
  GROUND_DEBRIS: "GROUND_DEBRIS",
  POLYGON_STARTER: "POLYGON_STARTER",
  CLOTH_1: "CLOTH_1",
  CLOTH_3: "CLOTH_3",
  WOOD_1: "WOOD_1",
  WOOD_3: "WOOD_3",
  FLOOR: "FLOOR",
  FEMALE_BODY: "FEMALE_BODY",
  FEMALE_HAIR: "FEMALE_HAIR",
  FEMALE_CLOTH: "FEMALE_CLOTH",
};

export const FBXModelId = {
  SOLIDER: "SOLIDER",
  FEMALE: "FEMALE",
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
  FEMALE_IDLE: "FEMALE_IDLE",
  FEMALE_WALK: "FEMALE_WALK",
  FEMALE_RUN: "FEMALE_RUN",
  FEMALE_JUMP_LOOP: "FEMALE_JUMP_LOOP",
};

export const GLTFModelId = {
  LEVEL_1: "LEVEL_1",
  HOME: "HOME",
  TEST: "TEST",
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
      id: TextureId.FEMALE_BODY,
      url: "./assets/characters/female/girl-texture-01.png",
    },
    {
      id: TextureId.FEMALE_HAIR,
      url: "./assets/characters/female/hair1.png",
    },
    {
      id: TextureId.FEMALE_CLOTH,
      url: "./assets/characters/female/clothing-set-04-tex.png",
    },
    {
      id: TextureId.WEAPON,
      url: "./assets/characters/solider/weapon.webp",
    },
    {
      id: TextureId.CONCRETE,
      url: "./assets/textures/coarse-concrete-albedo.png",
    },
    {
      id: TextureId.MUD,
      url: "./assets/textures/clump-mud-albedo.png",
    },
    {
      id: TextureId.SMOKE,
      url: "./assets/textures/smoke-thin.png",
    },
    {
      id: TextureId.POINT,
      url: "./assets/textures/point.webp",
    },
    {
      id: TextureId.FIRE,
      url: "./assets/textures/fire_a.png",
    },
    {
      id: TextureId.GROUND_DEBRIS,
      url: "./assets/textures/cfx4-t-ground-debris-ab.png",
    },
    {
      id: TextureId.POLYGON_STARTER,
      url: "./assets/textures/polygon-starter-texture-01.png",
    },
    {
      id: TextureId.CLOTH_1,
      url: "./assets/textures/cloth_1.jpg",
    },
    {
      id: TextureId.CLOTH_3,
      url: "./assets/textures/cloth_3.jpg",
    },
    {
      id: TextureId.WOOD_1,
      url: "./assets/textures/wood_1.jpg",
    },
    {
      id: TextureId.WOOD_3,
      url: "./assets/textures/wood_3.jpg",
    },
    {
      id: TextureId.FLOOR,
      url: "./assets/textures/floor.jpg",
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
    {
      id: FBXModelId.FEMALE,
      url: "./assets/characters/female/female.fbx",
      materialType: THREE.MeshLambertMaterial,
      texture: [
        {
          id: TextureId.FEMALE_CLOTH,
        },
        {
          id: TextureId.FEMALE_CLOTH,
        },
        {
          id: TextureId.FEMALE_CLOTH,
        },
        {
          id: TextureId.FEMALE_BODY,
        },
        {
          id: TextureId.FEMALE_BODY,
        },
        {
          id: TextureId.FEMALE_BODY,
        },
        {
          id: TextureId.FEMALE_HAIR,
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
    {
      id: FBXSkeletonAnimation.FEMALE_IDLE,
      url: "./assets/characters/female/idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.FEMALE_WALK,
      url: "./assets/characters/female/walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.FEMALE_RUN,
      url: "./assets/characters/female/run.fbx",
    },
    {
      id: FBXSkeletonAnimation.FEMALE_JUMP_LOOP,
      url: "./assets/characters/female/jump-loop.fbx",
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.LEVEL_1,
      url: "./assets/models/level-1.glb",
      materialType: THREE.MeshLambertMaterial,
      texture: {
        id: (child) =>
          child.name.includes("Crate") || child.name.includes("Smoke")
            ? TextureId.POLYGON_STARTER
            : child.name.includes("Ground")
            ? TextureId.MUD
            : TextureId.CONCRETE,
        repeat: (child) =>
          child.name.includes("Crate") || child.name.includes("Smoke")
            ? { x: 1, y: 1 }
            : child.name.includes("Ground")
            ? { x: 8, y: 8 }
            : { x: 2, y: 2 },
      },
    },
    {
      id: GLTFModelId.HOME,
      url: "./assets/models/home.glb",
      materialType: THREE.MeshLambertMaterial,
      texture: {
        id: (child) => {
          if (child.name.includes("wood-3")) return TextureId.WOOD_3;
          else if (child.name.includes("wood-1")) return TextureId.WOOD_1;
          else if (child.name.includes("cloth-1")) return TextureId.CLOTH_1;
          else if (child.name.includes("cloth-3")) return TextureId.CLOTH_3;
          else if (child.name.includes("floor")) return TextureId.FLOOR;
          else return TextureId.CONCRETE;

          /* 
            ? TextureId.CLOTH_3
            : ["base", "bed"].includes(child.name)
            ? TextureId.WOOD_3
            : child.name.includes("Crate") || child.name.includes("Smoke")
            ? TextureId.POLYGON_STARTER
            : child.name.includes("Ground")
            ? TextureId.MUD
            : TextureId.CONCRETE;
          console.log(child.name, texture);
          return texture; */
        },
        repeat: (child) => {
          if (child.name.includes("wood")) return { x: 1, y: 1 };
          else if (child.name.includes("cloth-1")) return { x: 10, y: 10 };
          else if (child.name.includes("cloth-3")) return { x: 1, y: 1 };
          else if (child.name.includes("floor")) return { x: 20, y: 20 };
          else return { x: 5, y: 5 };
        },
        /* child.name.includes("bed")
            ? { x: 1, y: 1 }
            : child.name.includes("Crate") || child.name.includes("Smoke")
            ? { x: 1, y: 1 }
            : child.name.includes("Ground")
            ? { x: 8, y: 8 }
            : { x: 5, y: 5 }, */
      },
    },
    {
      id: GLTFModelId.TEST,
      url: "./assets/models/collision-world.glb",
    },
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
