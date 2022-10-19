import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";

import { AssetsUtils } from "@newkrok/three-utils/assets";
import { GLTFModelId } from "./assets-config";
import { Vector3Utils } from "@newkrok/three-utils";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { createParticleSystem } from "@newkrok/three-particles";
import gsap from "gsap";

export const AbilityId = {
  SHOOT: "SHOOT",
  AI_SHOOT: "AI_SHOOT",
};

const positionHelper = new THREE.Vector3();
const absDirectionHelper = new THREE.Vector3();

const shootAction = ({ world, caster }) => {
  const position = caster.bulletSocket.getWorldPosition(positionHelper);
  const direction = caster.bulletSocket.getWorldDirection(new THREE.Vector3());
  absDirectionHelper.copy(direction);
  const absDirection = Vector3Utils.absVector3(absDirectionHelper);
  direction.x =
    absDirection.y > absDirection.x
      ? 0
      : absDirection.z > absDirection.x
      ? 0
      : direction.x;
  direction.y =
    absDirection.x > absDirection.y
      ? 0
      : absDirection.z > absDirection.y
      ? 0
      : direction.y;
  direction.z =
    absDirection.x > absDirection.z
      ? 0
      : absDirection.y > absDirection.z
      ? 0
      : direction.z;

  const model = AssetsUtils.getGLTFModel(GLTFModelId.MISSILE).scene.clone();
  model.traverse((child) => {
    if (child.isMesh) {
      if (!child.name.includes("_1")) {
        const material = new THREE.MeshPhongMaterial({
          map: AssetsUtils.getTexture(caster.bulletMaterialId),
        });
        child.material = material;
        child.material.map.flipY = false;
      }
    }
  });
  model.rotation.copy(caster.mesh.rotation);
  world.scene.add(model);

  world.getModule(WorldModuleId.PROJECTILES).shoot({
    startPosition: position,
    direction,
    mesh: model,
    userData: {
      caster,
    },
    config: {
      speed: 5,
      lifeTime: 10000,
      on: {
        shoot: () => {
          const bulletEffect = createParticleSystem(
            effectsConfig[EffectId.SHOOTING_2],
            world.cycleData.now
          );
          bulletEffect.instance.name = "bulletEffect";
          bulletEffect.instance.position.copy(position);
          bulletEffect.instance.rotation.copy(caster.mesh.rotation);
          bulletEffect.instance.rotation.y += Math.PI;
          world.scene.add(bulletEffect.instance);

          gsap.delayedCall(1, bulletEffect.dispose);

          if (!gsap.getTweensOf(caster.body.rotation).length) {
            gsap.to(caster.body.rotation, {
              x: -Math.PI / 20,
              yoyo: true,
              repeat: 1,
              duration: 0.2,
              onUpdate: () =>
                (caster.shadow.turret.rotation.x =
                  caster.shadow.body.rotation.x =
                  caster.turret.rotation.x =
                    caster.body.rotation.x),
            });
            gsap.to(caster.barrel.position, {
              z: -0.3,
              yoyo: true,
              repeat: 1,
              duration: 0.2,
              onUpdate: () =>
                (caster.shadow.barrel.position.z = caster.barrel.position.z),
            });
          }
        },
        destroy: () => {},
        collision: ({ position }) => {
          const smokeEffect = createParticleSystem(
            effectsConfig[EffectId.EXPLOSION_SMOKE],
            world.cycleData.now
          );
          smokeEffect.instance.position.copy(position);
          world.scene.add(smokeEffect.instance);

          const fireEffect = createParticleSystem(
            effectsConfig[EffectId.EXPLOSION_FIRE],
            world.cycleData.now
          );
          fireEffect.instance.position.copy(position);
          world.scene.add(fireEffect.instance);

          gsap.delayedCall(3, () => {
            smokeEffect.dispose();
            fireEffect.dispose();
          });
        },
      },
    },
  });
};

const shoot = (props) => {
  shootAction(props);
  if (props.caster.abilities.multiattack)
    gsap.delayedCall(0.2, shootAction, [props]);
};

export const abilityConfig = {
  [AbilityId.SHOOT]: {
    isReactivationNeeded: false,
    castingTime: 0,
    cooldownTime: 1000,
    on: {
      cast: shoot,
    },
  },
  [AbilityId.AI_SHOOT]: {
    isReactivationNeeded: false,
    castingTime: 0,
    cooldownTime: 1500,
    on: {
      cast: shoot,
    },
  },
};
