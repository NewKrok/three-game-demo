import * as THREE from "three";

import { GLTFModelId, TextureId } from "./assets-config";

import { CharacterId } from "./unit-config";
import { MODULE_ID } from "@newkrok/three-game/src/js/newkrok/three-game/modules/modules.js";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import { getTexture } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/octree/octree.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

const TPSWorldConfig = patchObject(getDefaultWorldConfig(), {
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  fog: new THREE.Fog(0x88ccee, 0, 100),
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 15, 25);
    directionalLight.castShadow = true;
    const d = 50;
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
    ...Array.from({ length: 4 }).map((_, index) => ({
      id: "player-" + index,
      characterId: CharacterId.MALE_CHARACTER,
    })),
  ],
  staticModels: [
    {
      id: "level-1-graphic",
      modelId: GLTFModelId.LEVEL_1_GRAPHIC,
    },
    {
      id: "level-1-collision",
      modelId: GLTFModelId.LEVEL_1_COLLISION,
    },
  ],
  onLoaded: ({ getModule, getStaticModel, getCharacter, camera }) => {
    const collision = getStaticModel("level-1-collision").scene;
    collision.visible = false;
    getModule(MODULE_ID.OCTREE).worldOctree.fromGraphNode(collision);

    const graphic = getStaticModel("level-1-graphic").scene;

    const playerData = Array.from({ length: 4 }).reduce(
      (prev, _, index) => ({
        ...prev,
        [`p${index}`]: {
          unitId: `player-${index}`,
          skin:
            index < 2
              ? TextureId.POLYGON_STARTER_BROWN
              : TextureId.POLYGON_STARTER_BLUE,
        },
      }),
      {}
    );

    const applySkin = (model, skin) => {
      model.traverse((child) => {
        if (child.isMesh && child.visible && child.material) {
          child.material = child.material.clone();
          child.material.map = getTexture(skin);
        }
      });
    };

    const initPlayer = (player, target) => {
      const unit = getCharacter(({ id }) => id === player.unitId);
      if (target.name === "p0") {
        camera.setTarget(unit.model);
        camera.updateRotation({ x: target.rotation.z });
      }
      applySkin(unit.model, player.skin);
      unit.teleportTo(target.position);
      unit.setRotation(target.rotation.z);
    };

    graphic.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) child.material.map.anisotropy = 4;
        const player = playerData[child.name];
        if (player) {
          initPlayer(player, child);
          child.visible = false;
        }
      }
    });
  },
});

export default TPSWorldConfig;
