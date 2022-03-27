import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  UnitAnimationId,
  basicUnit,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/unit-boilerplates.js";
import {
  deepMerge,
  patchObject,
} from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

import { aimingModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/unit/aiming/aiming-module.js";

export const CustomUnitAnimationId = {
  CHARACTERS_VICTORY: "CHARACTERS_VICTORY",
};

export const UnitId = {
  MALE_CHARACTER: "MALE_CHARACTER",
  FEMALE_CHARACTER: "FEMALE_CHARACTER",
};

const animations = {
  [UnitAnimationId.IDLE]: FBXSkeletonAnimation.CHARACTERS_IDLE,
  [UnitAnimationId.WALK]: FBXSkeletonAnimation.CHARACTERS_WALK,
  [UnitAnimationId.WALK_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_WALK_BACKWARDS,
  [UnitAnimationId.RUN]: FBXSkeletonAnimation.CHARACTERS_RUN,
  [UnitAnimationId.RUN_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RUN_BACKWARDS,
  [UnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.CHARACTERS_JUMP_LOOP,
  [UnitAnimationId.WALK_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_LEFT,
  [UnitAnimationId.WALK_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_WALK_STRAFE_RIGHT,
  [UnitAnimationId.RUN_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_LEFT,
  [UnitAnimationId.RUN_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_RUN_STRAFE_RIGHT,

  [UnitAnimationId.RIFLE_IDLE]: FBXSkeletonAnimation.CHARACTERS_RIFLE_IDLE,
  [UnitAnimationId.RIFLE_WALK]: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK,
  [UnitAnimationId.RIFLE_WALK_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK_BACKWARDS,
  [UnitAnimationId.RIFLE_RUN]: FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN,
  [UnitAnimationId.RIFLE_RUN_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN_BACKWARDS,
  [UnitAnimationId.RIFLE_JUMP_LOOP]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_JUMP_LOOP,
  [UnitAnimationId.RIFLE_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_LEFT,
  [UnitAnimationId.RIFLE_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_RIGHT,

  [UnitAnimationId.PISTOL_IDLE]: FBXSkeletonAnimation.CHARACTERS_PISTOL_IDLE,
  [UnitAnimationId.PISTOL_WALK]: FBXSkeletonAnimation.CHARACTERS_PISTOL_WALK,
  [UnitAnimationId.PISTOL_WALK_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_PISTOL_WALK_BACKWARDS,
  [UnitAnimationId.PISTOL_RUN]: FBXSkeletonAnimation.CHARACTERS_PISTOL_RUN,
  [UnitAnimationId.PISTOL_RUN_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_PISTOL_RUN_BACKWARDS,
  /* [UnitAnimationId.PISTOL_JUMP_LOOP]:
    FBXSkeletonAnimation.CHARACTERS_PISTOL_JUMP_LOOP, */
  [UnitAnimationId.PISTOL_STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_PISTOL_STRAFE_LEFT,
  [UnitAnimationId.PISTOL_STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_PISTOL_STRAFE_RIGHT,

  [CustomUnitAnimationId.CHARACTERS_VICTORY]:
    FBXSkeletonAnimation.CHARACTERS_VICTORY,
};

const customUnit = deepMerge(basicUnit, {
  modules: [aimingModule],
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
      ...basicUnit.animationConfig.rules,
    ],
  },
  animations,
});

export const unitConfig = {
  [UnitId.MALE_CHARACTER]: patchObject(customUnit, {
    name: "male-character",
    model: {
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Female")) {
          child.visible = false;
        }
      },
    },
  }),
  [UnitId.FEMALE_CHARACTER]: patchObject(customUnit, {
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
