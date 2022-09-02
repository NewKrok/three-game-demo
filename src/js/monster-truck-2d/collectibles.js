import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";
import {
  createParticleSystem,
  destroyParticleSystem,
} from "@newkrok/three-particles/src/js/effects/three-particles";

import { GLTFModelId } from "./assets-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectedCollectableCount } from "../../store/app";
import gsap from "gsap";
import { staticParams } from "../static";

const collisionAlgorithm = ({ collector, collectible }) => {
  if (
    collectible.model.position.distanceTo(
      collector.wheels.frontA.model.position
    ) < 3 ||
    collectible.model.position.distanceTo(
      collector.wheels.rearA.model.position
    ) < 3
  ) {
    return true;
  }

  return false;
};

export const collectiblesData = {
  collectible: {
    type: 0,
    reactivationTime: -1,
    initialActivationDelay: 0,
    interactionRadius: 0.5,
    isUserInteractionNeeded: false,
    collisionAlgorithm,
    model: {
      gltf: {
        id: GLTFModelId.COIN,
      },
      scale: new THREE.Vector3(0.035, 0.035, 0.035),
    },
    on: {
      collect: ({ collectible: { model } }) => {
        const effect = createParticleSystem(
          effectsConfig[EffectId.COLLECT_COIN_LARGE],
          staticParams.cycleData.now
        ).instance;
        effect.position.copy(model.position);
        staticParams.world.scene.add(effect);
        gsap.delayedCall(1, () => destroyParticleSystem(effect));
        collectedCollectableCount.update((prev) => prev + 1);
      },
    },
  },
};

export const initCollectible = (collectible, target) => {
  const module = staticParams.world.getModule(WorldModuleId.COLLECTIBLES);
  const { model } = module.addCollectible({
    ...collectible,
    collisionObject: target,
  });

  gsap.to(model.rotation, {
    y: Math.PI * 2,
    ease: "linear",
    duration: 3,
    repeat: -1,
  });
};
