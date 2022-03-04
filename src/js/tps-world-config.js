import * as THREE from "three";

import { GLTFModelId, TextureId } from "./assets-config";

import { CharacterId } from "./unit-config";
import { MODULE_ID } from "./three-game/modules/modules";
import { getDefaultWorldConfig } from "./three-game/world";
import { octreeModule } from "./three-game/modules/octree/octree";
import { patchObject } from "./three-utils/object-utils";

const TPSWorldConfig = patchObject(getDefaultWorldConfig(), {
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  fog: new THREE.Fog(0x88ccee, 0, 50),
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 15, 15);
    directionalLight.castShadow = true;
    const d = 35;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 1;
    directionalLight.shadow.bias = -0.00006;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;

    return [
      new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5),
      directionalLight,
    ];
  },
  modules: [octreeModule],
  skybox: {
    textures: [
      TextureId.SKYBOX_1,
      TextureId.SKYBOX_2,
      TextureId.SKYBOX_3,
      TextureId.SKYBOX_4,
      TextureId.SKYBOX_5,
      TextureId.SKYBOX_6,
    ],
  },
  characters: [
    {
      id: "player-character",
      characterId: CharacterId.SOLIDER,
      position: new THREE.Vector3(0, 2, 0),
      rotation: new THREE.Vector3(),
      /* position: ({ getStaticModel }) =>
        getStaticModel(({ id }) => id === "level")
          .model.scene.children.find(({ name }) => name.includes("spawn"))
          .position.clone(),
      rotation: ({ getStaticModel }) =>
        getStaticModel(({ id }) => id === "level")
          .model.scene.children.find(({ name }) => name.includes("spawn"))
          .rotation.clone(), */
    },
    ...Array.from({ length: 10 }).map((_, index) => ({
      id: "test " + index,
      characterId: CharacterId.SOLIDER,
      position: new THREE.Vector3(
        Math.random() * 40 - 20,
        10,
        Math.random() * 40 - 20
      ),
      rotation: new THREE.Vector3(0, Math.random() * (Math.PI * 2), 0),
    })),
  ],
  staticModels: [
    {
      id: "level",
      modelId: GLTFModelId.TEST,
      position: new THREE.Vector3(),
      rotation: new THREE.Vector3(),
    },
  ],
  onLoaded: ({ getModule, getStaticModel }) => {
    const scene = getStaticModel("level").scene;
    getModule(MODULE_ID.OCTREE).worldOctree.fromGraphNode(scene);
    scene.traverse((child) => {
      if (child.isMesh)
        if (child.material.map) child.material.map.anisotropy = 4;
    });
  },
});

export default TPSWorldConfig;
