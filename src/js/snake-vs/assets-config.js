import * as THREE from "three";

export const TextureId = {
  SKYBOX_1: "SKYBOX_1",
  SKYBOX_2: "SKYBOX_2",
  SKYBOX_3: "SKYBOX_3",
  SKYBOX_4: "SKYBOX_4",
  SKYBOX_5: "SKYBOX_5",
  SKYBOX_6: "SKYBOX_6",
  POINT: "POINT",
  GREEN_SNAKE: "GREEN_SNAKE",
  BLUE_RACER: "BLUE_RACER",
  GREEN_GROUND: "GREEN_GROUND",
  FOREST_OBSTACLES: "FOREST_OBSTACLES",
  APPLE: "APPLE",
  ORANGE: "ORANGE",
  PEAR: "PEAR",
  FROG_GREEN: "FROG_GREEN",
};

export const FBXModelId = {
  GREEN_SNAKE_HEAD: "GREEN_SNAKE_HEAD",
  GREEN_SNAKE_BODY: "GREEN_SNAKE_BODY",
  GREEN_SNAKE_TAIL: "GREEN_SNAKE_TAIL",
  BLUE_RACER_HEAD: "BLUE_RACER_HEAD",
  BLUE_RACER_BODY: "BLUE_RACER_BODY",
  BLUE_RACER_TAIL: "BLUE_RACER_TAIL",
};

export const GLTFModelId = {
  APPLE: "APPLE",
  ORANGE: "ORANGE",
  PEAR: "PEAR",
  FROG: "FROG_GREEN",
  TREE_1X1: "TREE_1X1",
  GROUND_1X1: "GROUND_1X1",
  BUSH_1X1: "BUSH_1X1",
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
      id: TextureId.GREEN_SNAKE,
      url: "./assets/textures/green-snake.webp",
    },
    {
      id: TextureId.BLUE_RACER,
      url: "./assets/textures/blue-racer.webp",
    },
    {
      id: TextureId.GREEN_GROUND,
      url: "./assets/textures/green-ground.png",
    },
    {
      id: TextureId.FOREST_OBSTACLES,
      url: "./assets/textures/forest-obstacles.webp",
    },
    {
      id: TextureId.APPLE,
      url: "./assets/textures/apple.webp",
    },
    {
      id: TextureId.ORANGE,
      url: "./assets/textures/orange.webp",
    },
    {
      id: TextureId.PEAR,
      url: "./assets/textures/pear.webp",
    },
    {
      id: TextureId.FROG_GREEN,
      url: "./assets/textures/frog-green.webp",
    },
  ],
  fbxModels: [
    {
      id: FBXModelId.GREEN_SNAKE_HEAD,
      url: "./assets/models/snakes/green/green-snake-head.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.GREEN_SNAKE,
        },
      },
    },
    {
      id: FBXModelId.GREEN_SNAKE_BODY,
      url: "./assets/models/snakes/green/green-snake-body.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.GREEN_SNAKE,
        },
      },
    },
    {
      id: FBXModelId.GREEN_SNAKE_TAIL,
      url: "./assets/models/snakes/green/green-snake-tail.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.GREEN_SNAKE,
        },
      },
    },
    {
      id: FBXModelId.BLUE_RACER_HEAD,
      url: "./assets/models/snakes/blue/blue-racer-head.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.BLUE_RACER,
        },
      },
    },
    {
      id: FBXModelId.BLUE_RACER_BODY,
      url: "./assets/models/snakes/blue/blue-racer-body.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.BLUE_RACER,
        },
      },
    },
    {
      id: FBXModelId.BLUE_RACER_TAIL,
      url: "./assets/models/snakes/blue/blue-racer-tail.fbx",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.BLUE_RACER,
        },
      },
    },
  ],
  gltfModels: [
    {
      id: GLTFModelId.APPLE,
      url: "./assets/models/collectibles/apple.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.APPLE,
        },
      },
    },
    {
      id: GLTFModelId.ORANGE,
      url: "./assets/models/collectibles/orange.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.ORANGE,
        },
      },
    },
    {
      id: GLTFModelId.PEAR,
      url: "./assets/models/collectibles/pear.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.PEAR,
        },
      },
    },
    {
      id: GLTFModelId.FROG,
      url: "./assets/models/collectibles/frog.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.FROG_GREEN,
        },
      },
    },
    {
      id: GLTFModelId.TREE_1X1,
      url: "./assets/models/obstacles/tree-1x1.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.FOREST_OBSTACLES,
        },
      },
    },
    {
      id: GLTFModelId.GROUND_1X1,
      url: "./assets/models/obstacles/ground-1x1.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.FOREST_OBSTACLES,
        },
      },
    },
    {
      id: GLTFModelId.BUSH_1X1,
      url: "./assets/models/obstacles/bush-1x1.glb",
      material: {
        materialType: THREE.MeshPhongMaterial,
        texture: {
          id: TextureId.FOREST_OBSTACLES,
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
