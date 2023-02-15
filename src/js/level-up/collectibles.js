import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";

import { GLTFModelId } from "./assets-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectedCollectableCount } from "../../store/app";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
import { staticParams } from "../static";

const collisionAlgorithm = ({ collector, collectible }) =>
  collectible.model.position.distanceTo(collector.container.position) < 1.25;

const createCollectionEffect = (model) => {
  const effect = createParticleSystem(
    effectsConfig[EffectId.COLLECT_COIN],
    staticParams.cycleData.now
  );
  effect.instance.position.copy(model.position);
  staticParams.world.scene.add(effect.instance);
  gsap.delayedCall(1, effect.dispose);
  collectedCollectableCount.update((prev) => prev + 1);
};

export const collectiblesData = {
  coin: {
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
      scale: new THREE.Vector3(0.01, 0.01, 0.01),
    },
    on: {},
  },
};

export const initCollectible = (collectible, target, onCollect) => {
  const module = staticParams.world.getModule(WorldModuleId.COLLECTIBLES);
  const {
    model,
    config: { on },
  } = module.addCollectible({
    ...collectible,
    collisionObject: target,
  });

  on.collect = ({ collectible: { model } }) => {
    createCollectionEffect(model);
    onCollect();
  };

  gsap.to(model.rotation, {
    startAt: {
      y: 0,
    },
    y: Math.PI * 2,
    duration: 0.6,
    repeat: -1,
    repeatDelay: 1,
  });
};
