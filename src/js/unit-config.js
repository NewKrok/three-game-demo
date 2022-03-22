import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  UnitAnimationId,
  basicCharacter,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/unit-boilerplates.js";
import {
  deepMerge,
  patchObject,
} from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

export const CustomUnitAnimationId = {
  CHARACTERS_VICTORY: "CHARACTERS_VICTORY",
};

export const CharacterId = {
  MALE_CHARACTER: "MALE_CHARACTER",
  FEMALE_CHARACTER: "FEMALE_CHARACTER",
};

const animations = {
  [UnitAnimationId.IDLE]: FBXSkeletonAnimation.CHARACTERS_IDLE,
  [UnitAnimationId.AIMING_IDLE]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_AIMING_IDLE,
  [UnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.CHARACTERS_JUMP_LOOP,
  [UnitAnimationId.RIFLE_JUMP_LOOP]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_JUMP_LOOP,
  [UnitAnimationId.WALK]: FBXSkeletonAnimation.CHARACTERS_WALK,
  [UnitAnimationId.RUN]: FBXSkeletonAnimation.CHARACTERS_RUN,
  [UnitAnimationId.AIMING_WALK]: FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK,
  [UnitAnimationId.AIMING_RUN]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_AIMING_RUN,
  [UnitAnimationId.WALK_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_WALK_BACKWARDS,
  [UnitAnimationId.RUN_BACKWARDS]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_RUN_BACKWARDS,
  [UnitAnimationId.STRAFE_RIGHT]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_LEFT,
  [UnitAnimationId.STRAFE_LEFT]:
    FBXSkeletonAnimation.CHARACTERS_RIFLE_STRAFE_RIGHT,
  [CustomUnitAnimationId.CHARACTERS_VICTORY]:
    FBXSkeletonAnimation.CHARACTERS_VICTORY,
};

const customCharacter = deepMerge(basicCharacter, {
  model: {
    fbx: {
      id: FBXModelId.CHARACTERS,
    },
    scale: new THREE.Vector3(0.0095, 0.0095, 0.0095),
    debug: {
      showSockets: false,
    },
  },
  animationConfig: [
    {
      condition: ({ userData }) => userData?.showVictoryAnimation,
      animation: CustomUnitAnimationId.CHARACTERS_VICTORY,
      transitionTime: 0.2,
      loop: false,
    },
    ...basicCharacter.animationConfig,
  ],
  animations,
});

export const characterConfig = {
  [CharacterId.MALE_CHARACTER]: patchObject(customCharacter, {
    name: "male-character",
    model: {
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Female")) {
          child.visible = false;
        }
      },
    },
  }),
  [CharacterId.FEMALE_CHARACTER]: patchObject(customCharacter, {
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
