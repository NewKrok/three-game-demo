import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POINT: "POINT",
  CUBE_WORLD: "CUBE_WORLD",
  AURYN_SKY_BLUE: "AURYN_SKY_BLUE",
  AURYN_SKY_RED: "AURYN_SKY_RED",
  CTF_TANK_BASE_COLOR_R: "CTF_TANK_BASE_COLOR_R",
  CTF_TANK_BASE_COLOR_G: "CTF_TANK_BASE_COLOR_G",
  CTF_TANK_BASE_COLOR_B: "CTF_TANK_BASE_COLOR_B",
  CTF_TANK_BASE_COLOR_Y: "CTF_TANK_BASE_COLOR_Y",
  POWERUP_PALETTE: "POWERUP_PALETTE",
};

export const FBXModelId = {};

export const GLTFModelId = {
  WORLD: "WORLD",
  BRICK_BLACK: "BRICK_BLACK",
  BRICK_BROWN: "BRICK_BROWN",
  BLOCK_GROUND: "BLOCK_GROUND",
  CTF_TANK: "CTF_TANK",
  MISSILE: "MISSILE",
  ITEM_DAMAGE: "ITEM_DAMAGE",
  ITEM_HEALTH: "ITEM_HEALTH",
  ITEM_MULTIATTACK: "ITEM_MULTIATTACK",
  ITEM_SPEED: "ITEM_SPEED",
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
      id: TextureId.CUBE_WORLD,
      url: "./assets/textures/cubeworld-tex.png",
    },
    {
      id: TextureId.AURYN_SKY_BLUE,
      url: "./assets/textures/auryn-sky-color-palette-blue.png",
    },
    {
      id: TextureId.AURYN_SKY_RED,
      url: "./assets/textures/auryn-sky-color-palette-red.png",
    },
    {
      id: TextureId.CTF_TANK_BASE_COLOR_R,
      url: "./assets/textures/ctf-tank-base-color-r.png",
    },
    {
      id: TextureId.CTF_TANK_BASE_COLOR_G,
      url: "./assets/textures/ctf-tank-base-color-g.png",
    },
    {
      id: TextureId.CTF_TANK_BASE_COLOR_B,
      url: "./assets/textures/ctf-tank-base-color-b.png",
    },
    {
      id: TextureId.CTF_TANK_BASE_COLOR_Y,
      url: "./assets/textures/ctf-tank-base-color-y.png",
    },
    {
      id: TextureId.POWERUP_PALETTE,
      url: "./assets/textures/powerup-palette.png",
    },
  ],
  fbxModels: [],
  gltfModels: [
    {
      id: GLTFModelId.WORLD,
      url: "./assets/models/world/tank-battle-level.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.BLUE_TEXTURE,
        },
      },
    },
    {
      id: GLTFModelId.BRICK_BLACK,
      url: "./assets/models/obstacles/brick-black-1.glb",
    },
    {
      id: GLTFModelId.BRICK_BROWN,
      url: "./assets/models/obstacles/brick-brown-1.glb",
    },
    {
      id: GLTFModelId.BLOCK_GROUND,
      url: "./assets/models/world/block-ground.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.AURYN_SKY_BLUE,
        },
      },
    },
    {
      id: GLTFModelId.CTF_TANK,
      url: "./assets/models/vehicles/ctf-tank.glb",
    },
    {
      id: GLTFModelId.MISSILE,
      url: "./assets/models/projectiles/missile.glb",
    },
    {
      id: GLTFModelId.ITEM_DAMAGE,
      url: "./assets/models/collectibles/damage.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.POWERUP_PALETTE,
        },
      },
    },
    {
      id: GLTFModelId.ITEM_HEALTH,
      url: "./assets/models/collectibles/health.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.POWERUP_PALETTE,
        },
      },
    },
    {
      id: GLTFModelId.ITEM_MULTIATTACK,
      url: "./assets/models/collectibles/multiattack.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.POWERUP_PALETTE,
        },
      },
    },
    {
      id: GLTFModelId.ITEM_SPEED,
      url: "./assets/models/collectibles/speed.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.POWERUP_PALETTE,
        },
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
