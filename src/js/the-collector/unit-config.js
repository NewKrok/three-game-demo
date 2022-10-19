import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  HumanoidUnitAnimationId,
  humanoidUnit,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/humanoid-unit-boilerplates.js";

import { ObjectUtils } from "@newkrok/three-utils";
import { abilitiesModule } from "@newkrok/three-game/src/js/newkrok/three-game/unit/modules/abilities/abilities-module.js";
import { abilityConfig } from "../ability-config.js";
import { aimingModule } from "@newkrok/three-game/src/js/newkrok/three-game/unit/modules/aiming/aiming-module.js";

export const CustomUnitAnimationId = {
  CHARACTERS_VICTORY: "CHARACTERS_VICTORY",
  CHARACTERS_DASH: "CHARACTERS_DASH",
};

export const UnitId = {
  MALE_CHARACTER: "MALE_CHARACTER",
  FEMALE_CHARACTER: "FEMALE_CHARACTER",
};

const animations = {
  [HumanoidUnitAnimationId.IDLE]: FBXSkeletonAnimation.CHARACTERS_IDLE,
  [HumanoidUnitAnimationId.WALK]: FBXSkeletonAnimation.CHARACTERS_WALK,
  [HumanoidUnitAnimationId.WALK_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_WALK_BACKWARDS,
  [HumanoidUnitAnimationId.RUN]: FBXSkeletonAnimation.CHARACTERS_RUN,
  [HumanoidUnitAnimationId.RUN_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RUN_BACKWARDS,
  [HumanoidUnitAnimationId.JUMP_LOOP]:
    FBXSkeletonAnimation.CHARACTERS_JUMP_LOOP,
  [HumanoidUnitAnimationId.WALK_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_LEFT,
  [HumanoidUnitAnimationId.WALK_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_RIGHT,
  [HumanoidUnitAnimationId.RUN_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_LEFT,
  [HumanoidUnitAnimationId.RUN_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_RIGHT,

  [CustomUnitAnimationId.CHARACTERS_VICTORY]:
    FBXSkeletonAnimation.CHARACTERS_VICTORY,
  [CustomUnitAnimationId.CHARACTERS_DASH]: FBXSkeletonAnimation.CHARACTERS_DASH,
};

const customUnit = ObjectUtils.deepMerge(humanoidUnit, {
  modules: [aimingModule, { ...abilitiesModule, config: abilityConfig }],
  model: {
    fbx: {
      id: FBXModelId.CHARACTERS,
    },
    scale: new THREE.Vector3(0.0095, 0.0095, 0.0095),
    debug: {
      showSockets: false,
    },
  },
  animationConfig: {
    rules: [
      {
        condition: ({ userData }) => userData?.showVictoryAnimation,
        animation: CustomUnitAnimationId.CHARACTERS_VICTORY,
        transitionTime: 0.2,
        loop: false,
      },
      {
        condition: ({ userData }) => userData?.isDashInProgress,
        animation: CustomUnitAnimationId.CHARACTERS_DASH,
        transitionTime: 0.2,
        loop: false,
      },
      ...humanoidUnit.animationConfig.rules,
    ],
  },
  animations,
  speed: 25,
  speedModifier: (unit) =>
    (unit.onGround ? unit.config.speed : 8) * (unit.userData.useSprint ? 2 : 1),
});

export const unitConfig = {
  [UnitId.MALE_CHARACTER]: ObjectUtils.patchObject(customUnit, {
    name: "male-character",
    model: {
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Female")) {
          child.visible = false;
        }
      },
    },
  }),
  [UnitId.FEMALE_CHARACTER]: ObjectUtils.patchObject(customUnit, {
    name: "female-character",
    model: {
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Male")) {
          child.visible = false;
        }
      },
    },
  }),
};
