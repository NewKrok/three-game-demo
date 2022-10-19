import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";

import { GLTFModelId } from "./assets-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
import { staticParams } from "../static";

export const collectiblesData = Array.from({ length: 6 }).reduce(
  (prev, _, index) => ({
    ...prev,
    [`collectible-${index}`]: {
      type: index < 4 ? 0 : 1,
      reactivationTime: index < 4 ? 5 : 30,
      initialActivationDelay: index < 4 ? 0 : 20,
      interactionRadius: 0.5,
      isUserInteractionNeeded: false,
      model: {
        gltf: {
          id: GLTFModelId.COIN,
        },
        scale: new THREE.Vector3(0.0095, 0.0095, 0.0095),
      },
      on: {
        activate: ({ model }) => {
          const effect = createParticleSystem(
            effectsConfig[EffectId.ACTIVATE_COIN],
            staticParams.cycleData.now
          );
          effect.instance.position.copy(model.position);
          staticParams.world.scene.add(effect.instance);
          gsap.delayedCall(1, effect.dispose);
          model.scale.set(0, 0, 0);
          gsap.to(model.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
          });
        },
        collect: ({ collectible: { model } }) => {
          const effect = createParticleSystem(
            effectsConfig[EffectId.COLLECT_COIN],
            staticParams.cycleData.now
          );
          effect.instance.position.copy(model.position);
          staticParams.world.scene.add(effect.instance);
          gsap.delayedCall(1, effect.dispose);
        },
      },
    },
  }),
  {}
);

export const initCollectible = (collectible, target) => {
  const module = staticParams.world.getModule(WorldModuleId.COLLECTIBLES);
  const { model } = module.addCollectible({
    ...collectible,
    collisionObject: target,
  });

  if (collectible.type === 1) model.children[0].scale.set(0.012, 0.009, 0.012);

  gsap.to(model.rotation, {
    y: Math.PI * 2,
    ease: "linear",
    duration: 3,
    repeat: -1,
  });
};
