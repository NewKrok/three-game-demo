import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POINT: "POINT",
  TERRAIN_0: "TERRAIN_0",
  TERRAIN_1: "TERRAIN_1",
  TERRAIN_2: "TERRAIN_2",
  TERRAIN_3: "TERRAIN_3",
  TERRAIN_4: "TERRAIN_4",
  WATER: "WATER",
  NOISE: "NOISE",
  TOON_RTS_KNIGHT: "TOON_RTS_KNIGHT",
  TOON_RTS_WOLFRIDER_ORC: "TOON_RTS_WOLFRIDER_ORC",
  TOON_RTS_WOLFRIDER_WOLF: "TOON_RTS_WOLFRIDER_WOLF",
  TOON_RTS_UNDEAD: "TOON_RTS_UNDEAD",
  LPN_TREES_ALBEDO: "LPN_TREES_ALBEDO",
  LPN_ROCKS_ALBEDO: "LPN_ROCKS_ALBEDO",
  LPN_DETAILS_ALBEDO: "LPN_DETAILS_ALBEDO",
};

export const FBXModelId = {
  KNIGHT: "KNIGHT",
  WOLFRIDER: "WOLFRIDER",
  UNDEAD: "UNDEAD",
};

export const FBXSkeletonAnimation = {
  KNIGHT_RUN: "KNIGHT_RUN",
  KNIGHT_IDLE: "KNIGHT_IDLE",
  KNIGHT_ATTACK: "KNIGHT_ATTACK",
  WOLFRIDER_RUN: "WOLFRIDER_RUN",
  WOLFRIDER_IDLE: "WOLFRIDER_IDLE",
  WOLFRIDER_ATTACK: "WOLFRIDER_ATTACK",
  UNDEAD_RUN: "UNDEAD_RUN",
  UNDEAD_IDLE: "UNDEAD_IDLE",
  UNDEAD_ATTACK: "UNDEAD_ATTACK",
};

export const GLTFModelId = {
  COIN: "COIN",
  TREE_001: "THREE_001",
  ROCK_020: "ROCK_020",
  DETAILS_012: "DETAILS_012",
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
      id: TextureId.TERRAIN_4,
      url: "./assets/textures/rock-volcanic-a-basecolor.webp",
    },
    {
      id: TextureId.TERRAIN_3,
      url: "./assets/textures/grass-flower-tint-01-base-basecolor.webp",
    },
    {
      id: TextureId.TERRAIN_2,
      url: "./assets/textures/dirt-path-basecolor.webp",
    },
    {
      id: TextureId.TERRAIN_1,
      url: "./assets/textures/sand-beach-base-basecolor.webp",
    },
    {
      id: TextureId.TERRAIN_0,
      url: "./assets/textures/sand-underwater-base-basecolor.webp",
    },
    {
      id: TextureId.WATER,
      url: "./assets/textures/vol-36-5-base-color.webp",
    },
    {
      id: TextureId.NOISE,
      url: "./assets/textures/noise-1.webp",
    },
    {
      id: TextureId.TOON_RTS_KNIGHT,
      url: "./assets/textures/toon-rts-knight.png",
    },
    {
      id: TextureId.TOON_RTS_WOLFRIDER_ORC,
      url: "./assets/textures/toon-rts-wolfrider-orc.png",
    },
    {
      id: TextureId.TOON_RTS_WOLFRIDER_WOLF,
      url: "./assets/textures/toon-rts-wolfrider-wolf.png",
    },
    {
      id: TextureId.TOON_RTS_UNDEAD,
      url: "./assets/textures/toon-rts-undead.png",
    },
    {
      id: TextureId.LPN_TREES_ALBEDO,
      url: "./assets/textures/lpn-trees-albedo-transparency.webp",
    },
    {
      id: TextureId.LPN_ROCKS_ALBEDO,
      url: "./assets/textures/lpn-rocks-albedo-transparency.webp",
    },
    {
      id: TextureId.LPN_DETAILS_ALBEDO,
      url: "./assets/textures/lpn-details-albedo-transparency.webp",
    },
  ],
  fbxModels: [
    {
      id: FBXModelId.KNIGHT,
      url: "./assets/models/characters/toon-rts/knight/toon-rts-knight.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.TOON_RTS_KNIGHT,
        },
      },
    },
    {
      id: FBXModelId.WOLFRIDER,
      url: "./assets/models/characters/toon-rts/wolfrider/toon-rts-wolfrider.fbx",
      material: [
        {
          materialType: THREE.MeshPhongMaterial,
          texture: { id: TextureId.TOON_RTS_WOLFRIDER_WOLF, flipY: false },
        },
        {
          materialType: THREE.MeshPhongMaterial,
          texture: {
            id: TextureId.TOON_RTS_WOLFRIDER_ORC,
            flipY: false,
          },
        },
      ],
    },
    {
      id: FBXModelId.UNDEAD,
      url: "./assets/models/characters/toon-rts/undead/ud-demo-character.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: { id: TextureId.TOON_RTS_UNDEAD, flipY: false },
      },
    },
  ],
  fbxSkeletonAnimations: [
    {
      id: FBXSkeletonAnimation.KNIGHT_ATTACK,
      url: "./assets/models/characters/toon-rts/knight/wk-heavy-infantry-08-attack-b.fbx",
    },
    {
      id: FBXSkeletonAnimation.KNIGHT_RUN,
      url: "./assets/models/characters/toon-rts/knight/wk-heavy-infantry-04-charge.fbx",
    },
    {
      id: FBXSkeletonAnimation.KNIGHT_IDLE,
      url: "./assets/models/characters/toon-rts/knight/wk-heavy-infantry-05-combat-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.WOLFRIDER_ATTACK,
      url: "./assets/models/characters/toon-rts/wolfrider/orc-wolfrider-08-attack-b.fbx",
    },
    {
      id: FBXSkeletonAnimation.WOLFRIDER_RUN,
      url: "./assets/models/characters/toon-rts/wolfrider/orc-wolfrider-03-run.fbx",
    },
    {
      id: FBXSkeletonAnimation.WOLFRIDER_IDLE,
      url: "./assets/models/characters/toon-rts/wolfrider/orc-wolfrider-05-combat-idle.fbx",
    },
    {
      id: FBXSkeletonAnimation.UNDEAD_ATTACK,
      url: "./assets/models/characters/toon-rts/undead/ud-infantry-07-attack-a.fbx",
    },
    {
      id: FBXSkeletonAnimation.UNDEAD_RUN,
      url: "./assets/models/characters/toon-rts/undead/ud-infantry-06-combat-walk.fbx",
    },
    {
      id: FBXSkeletonAnimation.UNDEAD_IDLE,
      url: "./assets/models/characters/toon-rts/undead/ud-infantry-05-combat-idle.fbx",
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.COIN,
      url: "./assets/models/collectibles/sm-polygon-prototype-icon-coin-01.glb",
      material: {
        color: 0x0000ff,
      },
    },
    {
      id: GLTFModelId.TREE_001,
      url: "./assets/models/obstacles/low-poly-style-nature-tree-001.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.LPN_TREES_ALBEDO,
          flipY: false,
        },
      },
    },
    {
      id: GLTFModelId.ROCK_020,
      url: "./assets/models/obstacles/low-poly-style-nature-rock-020.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.LPN_ROCKS_ALBEDO,
          flipY: false,
        },
      },
    },
    {
      id: GLTFModelId.DETAILS_012,
      url: "./assets/models/details/low-poly-style-nature-details-012.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.LPN_DETAILS_ALBEDO,
          flipY: false,
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
