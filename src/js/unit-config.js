import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  UnitAnimationId,
  basicCharacter,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/unit-boilerplates.js";

import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

export const CharacterId = {
  MALE_CHARACTER: "MALE_CHARACTER",
  FEMALE_CHARACTER: "FEMALE_CHARACTER",
};

const animationConfig = {
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
};

export const characterConfig = {
  [CharacterId.MALE_CHARACTER]: patchObject(basicCharacter, {
    name: "male-character",
    model: {
      fbxId: FBXModelId.CHARACTERS,
      scale: new THREE.Vector3(0.01, 0.01, 0.01),
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Female")) {
          child.visible = false;
        }
      },
    },
    animations: animationConfig,
  }),
  [CharacterId.FEMALE_CHARACTER]: patchObject(basicCharacter, {
    name: "female-character",
    model: {
      fbxId: FBXModelId.CHARACTERS,
      scale: new THREE.Vector3(0.0095, 0.0095, 0.0095),
      traverseCallback: (child) => {
        if (child.isMesh && child.name.includes("Male")) {
          child.visible = false;
        }
      },
    },
    animations: animationConfig,
  }),
};
