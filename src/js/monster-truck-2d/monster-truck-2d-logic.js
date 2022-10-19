import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";
import { collectiblesData, initCollectible } from "./collectibles";

import { AssetsUtils } from "@newkrok/three-utils/assets";
import { GLTFModelId } from "./assets-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { availableCollectableCount } from "../../store/app";
import { carConfig } from "./car-config.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import { staticParams } from "../static";

export const createMonsterTruck2DLogic = ({
  scene,
  thirdPersonCamera,
  napeModule,
  napeCar,
}) => {
  const car = napeCar.createCar({
    position: new THREE.Vector3(0, -100, 0),
    config: carConfig,
  });

  [
    car.body.model,
    car.wheels.frontA.model,
    car.wheels.frontB.model,
    car.wheels.rearA.model,
    car.wheels.rearB.model,
  ].forEach((model) => {
    model.traverse((child) => {
      if (child.isMesh) child.material.map.flipY = false;
    });
  });

  [
    car.wheels.frontA,
    car.wheels.frontB,
    car.wheels.rearA,
    car.wheels.rearB,
  ].forEach((wheel) => {
    wheel.effect = createParticleSystem(effectsConfig[EffectId.WHEEL_SMOKE]);
    wheel.model.add(wheel.effect.instance);
  });

  staticParams.world.getModule(WorldModuleId.COLLECTIBLES).addCollector(car);

  const coins = AssetsUtils.getGLTFModel(GLTFModelId.COINS).scene;
  scene.add(coins);
  coins.traverse((child) => {
    if (child.isMesh) {
      availableCollectableCount.update((prev) => prev + 1);
      initCollectible(collectiblesData["collectible"], child);
    }
  });

  const level = AssetsUtils.getGLTFModel(GLTFModelId.LEVEL).scene;
  scene.add(level);
  napeModule.createStaticBodiesFromModel({ model: level });

  const light = scene.children[1];
  light.target = car.body.model;

  const update = () => {
    light.position.x = car.body.model.position.x + 20;
    light.position.y = car.body.model.position.y + 20;

    if (car.wheels.frontA.onAir) {
      car.wheels.frontA.effect.pauseEmitter();
      car.wheels.frontB.effect.pauseEmitter();
    } else {
      car.wheels.frontA.effect.resumeEmitter();
      car.wheels.frontB.effect.resumeEmitter();
    }
    if (car.wheels.rearA.onAir) {
      car.wheels.rearA.effect.pauseEmitter();
      car.wheels.rearB.effect.pauseEmitter();
    } else {
      car.wheels.rearA.effect.resumeEmitter();
      car.wheels.rearB.effect.resumeEmitter();
    }
  };

  thirdPersonCamera.setTarget(car.body.model);

  const accelerate = (v) => {
    car.isAccelerating = v;
  };

  const reverse = (v) => {
    car.isReversing = v;
  };

  const leanBack = (v) => {
    car.isLeaningBack = v;
  };

  const leanForward = (v) => {
    car.isLeaningForward = v;
  };

  const dispose = () => {
    car.wheels.frontA.effect.dispose();
    car.wheels.frontB.effect.dispose();
    car.wheels.rearA.effect.dispose();
    car.wheels.rearB.effect.dispose();
    napeCar.dispose();
    napeModule.dispose();
  };

  return {
    update,
    dispose,
    control: {
      accelerate,
      reverse,
      leanBack,
      leanForward,
    },
  };
};
