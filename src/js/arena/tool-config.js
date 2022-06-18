import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config.js";
import {
  createParticleSystem,
  destroyParticleSystem,
} from "@newkrok/three-particles/src/js/effects/three-particles";

import { AbilityId } from "../ability-config.js";
import { FBXModelId } from "./assets-config.js";
import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { ToolType } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/humanoid-unit-boilerplates.js";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { deepMerge } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import gsap from "gsap";

const defaultConfig = {
  socketId: ModelSocketId.RIGHT_HAND,
  model: {
    rotation: new THREE.Vector3(Math.PI / 2, Math.PI, Math.PI),
    position: new THREE.Vector3(3, 13, 0),
  },
  on: {
    activate: ({ world, position, direction }) => {
      world.getModule(WorldModuleId.PROJECTILES).shoot({
        startPosition: position,
        direction,
        scene: world.scene,
        config: {
          speed: 40,
          lifeTime: 5000,
          on: {
            shoot: ({ mesh }) => {
              const bulletEffect = createParticleSystem(
                effectsConfig[EffectId.BULLET],
                world.cycleData.now
              );
              bulletEffect.name = "bulletEffect";
              mesh.add(bulletEffect);
            },
            destroy: ({ mesh }) => {
              gsap.delayedCall(0.1, () =>
                destroyParticleSystem(
                  mesh.children.find((child) => child.name === "bulletEffect")
                )
              );
            },
            collision: ({ position }) => {
              const collisionEffect = createParticleSystem(
                effectsConfig[EffectId.BULLET_EXPLOSION],
                world.cycleData.now
              );
              collisionEffect.position.copy(position);
              world.scene.add(collisionEffect);
              gsap.delayedCall(1.5, () =>
                destroyParticleSystem(collisionEffect)
              );
            },
          },
        },
      });

      const creationEffect = createParticleSystem(
        effectsConfig[EffectId.SHOOTING],
        world.cycleData.now
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
      gsap.delayedCall(1, () => destroyParticleSystem(creationEffect));
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
    type: ToolType.PISTOL,
    ability: AbilityId.PISTOL_SHOOT,
    model: {
      fbx: {
        id: FBXModelId.WATER_PISTOL_01,
      },
    },
  }),
  deepMerge(defaultConfig, {
    id: ToolId.WATER_GUN_01,
    type: ToolType.RIFLE,
    ability: AbilityId.RIFLE_SHOOT,
    model: {
      fbx: {
        id: FBXModelId.WATER_GUN_01,
      },
    },
  }),
  deepMerge(defaultConfig, {
    id: ToolId.WATER_GUN_02,
    type: ToolType.RIFLE,
    ability: AbilityId.HEAVY_SHOOT,
    model: {
      fbx: {
        id: FBXModelId.WATER_GUN_02,
      },
    },
  }),
];
