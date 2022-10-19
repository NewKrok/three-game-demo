import { EffectId, effectsConfig } from "../effects-config";

import { GLTFModelId } from "./assets-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectedCollectableCount } from "../../store/app";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
import { staticParams } from "../static";

const collisionAlgorithm = ({ collector, collectible }) =>
  collectible.model.position.distanceTo(collector.mesh.position) < 0.6;

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
  speed: {
    type: 0,
    reactivationTime: 20,
    initialActivationDelay: 0,
    interactionRadius: 0.5,
    isUserInteractionNeeded: false,
    collisionAlgorithm,
    model: {
      gltf: {
        id: GLTFModelId.ITEM_SPEED,
      },
    },
    on: {
      activate: ({ model }) => {
        model.position.copy(staticParams.getRandomAvailablePoint());
        createCollectionEffect(model);
      },
      collect: ({ collectible: { model }, collector }) => {
        collector.activateDoubleSpeed();
        createCollectionEffect(model);
      },
    },
  },
  damage: {
    type: 1,
    reactivationTime: 60,
    initialActivationDelay: 0,
    interactionRadius: 0.5,
    isUserInteractionNeeded: false,
    collisionAlgorithm,
    model: {
      gltf: {
        id: GLTFModelId.ITEM_DAMAGE,
      },
    },
    on: {
      activate: ({ model }) => {
        model.position.copy(staticParams.getRandomAvailablePoint());
        createCollectionEffect(model);
      },
      collect: ({ collectible: { model }, collector }) => {
        collector.activateDoubleDamage();
        createCollectionEffect(model);
      },
    },
  },
  health: {
    type: 2,
    reactivationTime: 30,
    initialActivationDelay: 0,
    interactionRadius: 0.5,
    isUserInteractionNeeded: false,
    collisionAlgorithm,
    model: {
      gltf: {
        id: GLTFModelId.ITEM_HEALTH,
      },
    },
    on: {
      activate: ({ model }) => {
        model.position.copy(staticParams.getRandomAvailablePoint());
        createCollectionEffect(model);
      },
      collect: ({ collectible: { model }, collector }) => {
        collector.heal();
        createCollectionEffect(model);
      },
    },
  },
  multiattack: {
    type: 3,
    reactivationTime: 120,
    initialActivationDelay: 0,
    interactionRadius: 0.5,
    isUserInteractionNeeded: false,
    collisionAlgorithm,
    model: {
      gltf: {
        id: GLTFModelId.ITEM_MULTIATTACK,
      },
    },
    on: {
      activate: ({ model }) => {
        model.position.copy(staticParams.getRandomAvailablePoint());
        createCollectionEffect(model);
      },
      collect: ({ collectible: { model }, collector }) => {
        collector.activateMultiattack();
        createCollectionEffect(model);
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

  gsap.to(model.position, {
    startAt: {
      y: 0.3,
    },
    y: 0.5,
    yoyo: true,
    duration: 0.5,
    repeat: -1,
  });
};
