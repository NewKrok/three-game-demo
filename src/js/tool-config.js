import * as THREE from "three";

import { EffectId, effectsConfig } from "./effects-config.js";
import {
  createParticleSystem,
  destroyParticleSystem,
} from "@newkrok/three-particles/src/js/effects/three-particles";

import { FBXModelId } from "./assets-config.js";
import { MODULE_ID } from "@newkrok/three-game/src/js/newkrok/three-game/modules/modules.js";
import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { deepMerge } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

const defaultConfig = {
  socketId: ModelSocketId.RIGHT_HAND,
  model: {
    rotation: new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI),
    position: new THREE.Vector3(3, 13, 0),
  },
  on: {
    activate: ({ world, position, direction }) => {
      world.getModule(MODULE_ID.PROJECTILES).shoot({
        startPosition: position,
        direction,
        scene: world.scene,
        config: {
          speed: 0.5,
          lifeTime: 5000,
          on: {
            shoot: ({ mesh }) => {
              const bulletEffect = createParticleSystem(
                effectsConfig[EffectId.BULLET]
              );
              bulletEffect.name = "bulletEffect";
              mesh.add(bulletEffect);
            },
            destroy: ({ mesh }) => {
              setTimeout(
                () =>
                  destroyParticleSystem(
                    mesh.children.find((child) => child.name === "bulletEffect")
                  ),
                100
              );
            },
            collision: ({ position }) => {
              const collisionEffect = createParticleSystem(
                effectsConfig[EffectId.BULLET_EXPLOSION]
              );
              collisionEffect.position.copy(position);
              world.scene.add(collisionEffect);
              setTimeout(() => destroyParticleSystem(collisionEffect), 1500);
            },
          },
        },
      });

      const creationEffect = createParticleSystem(
        effectsConfig[EffectId.SHOOTING]
      );
      creationEffect.position.copy(position);
      var rotationMatrix = new THREE.Matrix4().lookAt(
        direction,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 1, 0)
      );
      creationEffect.frustumCulled = false;
      creationEffect.quaternion.setFromRotationMatrix(rotationMatrix);
      world.scene.add(creationEffect);
      setTimeout(() => destroyParticleSystem(creationEffect), 1000);
    },
  },
};

export const ToolId = {
  WATER_PISTOL_01: "WATER_PISTOL_01",
  WATER_GUN_01: "WATER_GUN_01",
  WATER_GUN_02: "WATER_GUN_02",
};

export const toolConfig = [
  deepMerge(defaultConfig, {
    id: ToolId.WATER_PISTOL_01,
    model: {
      fbx: {
        id: FBXModelId.WATER_PISTOL_01,
      },
    },
  }),
  deepMerge(defaultConfig, {
    id: ToolId.WATER_GUN_01,
    model: {
      fbx: {
        id: FBXModelId.WATER_GUN_01,
      },
    },
  }),
  deepMerge(defaultConfig, {
    id: ToolId.WATER_GUN_02,
    model: {
      fbx: {
        id: FBXModelId.WATER_GUN_02,
      },
    },
  }),
];
