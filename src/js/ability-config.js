import * as THREE from "three";

import { EffectId, effectsConfig } from "./effects-config";

import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";

export const AbilityId = {
  PISTOL_SHOOT: "PISTOL_SHOOT",
  RIFLE_SHOOT: "RIFLE_SHOOT",
  HEAVY_SHOOT: "HEAVY_SHOOT",
  DASH: "DASH",
};

const shoot = ({ miss, count }, { world, caster }) => {
  const selectedTool = caster.getSelectedTool();
  const position = caster
    .getRegisteredObject("projectileStart")
    .object.getWorldPosition(new THREE.Vector3());
  for (let i = 0; i < count; i++) {
    const direction = selectedTool.object.getWorldDirection(
      new THREE.Vector3()
    );
    direction.add(
      new THREE.Vector3(
        Math.random() * (miss * 2) - miss,
        Math.random() * (miss * 2) - miss,
        Math.random() * (miss * 2) - miss
      )
    );
    selectedTool?.on?.activate({ world, position, direction });
  }
};

export const abilityConfig = {
  [AbilityId.PISTOL_SHOOT]: {
    isReactivationNeeded: true,
    castingTime: 0,
    cooldownTime: 500,
    on: {
      cast: (props) => shoot({ miss: 0.01, count: 1 }, props),
    },
  },
  [AbilityId.RIFLE_SHOOT]: {
    isReactivationNeeded: false,
    castingTime: 0,
    cooldownTime: 200,
    on: {
      cast: (props) => shoot({ miss: 0.04, count: 1 }, props),
    },
  },
  [AbilityId.HEAVY_SHOOT]: {
    isReactivationNeeded: false,
    castingTime: 500,
    cooldownTime: 1000,
    on: {
      cast: (props) => shoot({ miss: 0.02, count: 4 }, props),
    },
  },
  [AbilityId.DASH]: {
    isReactivationNeeded: true,
    castingTime: 0,
    cooldownTime: 2000,
    on: {
      cast: ({ world, caster }) => {
        window.tpsDemo.game.ability[AbilityId.DASH]();
        const dashSpeed = caster.getModule(UnitModuleId.OCTREE_BEHAVIOR)
          .properties.onGround
          ? 45
          : 20;
        const direction = new THREE.Vector3();
        caster.model.getWorldDirection(direction);
        caster
          .getModule(UnitModuleId.OCTREE_BEHAVIOR)
          .properties.capsule.velocity.copy(
            direction.multiply(new THREE.Vector3(dashSpeed, 0, dashSpeed))
          );
        caster.userData.isDashInProgress = true;
        setTimeout(() => (caster.userData.isDashInProgress = false), 400);

        const dashEffect = createParticleSystem(
          effectsConfig[EffectId.DASH],
          world.cycleData.now
        );
        const scaleConversion = 1 / caster.model.scale.x;
        dashEffect.instance.scale.set(
          scaleConversion,
          scaleConversion,
          scaleConversion
        );
        dashEffect.instance.position.y *= scaleConversion;
        caster.model.add(dashEffect.instance);
        setTimeout(dashEffect.dispose, 1000);
      },
    },
  },
};
