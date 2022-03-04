import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  ModelSocketId,
  UnitAnimationId,
} from "./three-game/unit/unit-enums.js";

import { basicCharacter } from "./three-game/boilerplates/unit-boilerplates.js";
import { patchObject } from "./three-utils/object-utils.js";

export const CharacterId = {
  SOLIDER: "SOLIDER",
  FEMALE: "FEMALE",
};

export const characterConfig = {
  [CharacterId.SOLIDER]: patchObject(basicCharacter, {
    name: "Solider",
    fbxModelId: FBXModelId.SOLIDER,
    scale: new THREE.Vector3(0.00655, 0.00655, 0.00655),
    sockets: [
      {
        socketId: ModelSocketId.PROJECTILE_START,
        position: new THREE.Vector3(42, 0.8, 5.5),
      },
    ],
    animations: {
      [UnitAnimationId.IDLE]: FBXSkeletonAnimation.IDLE,
      [UnitAnimationId.AIMING_IDLE]: FBXSkeletonAnimation.RIFLE_AIMING_IDLE,
      [UnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.JUMP_LOOP,
      [UnitAnimationId.WALK]: FBXSkeletonAnimation.RIFLE_WALK,
      [UnitAnimationId.RUN]: FBXSkeletonAnimation.RIFLE_RUN,
      [UnitAnimationId.AIMING_WALK]: FBXSkeletonAnimation.RIFLE_AIMING_WALK,
      [UnitAnimationId.AIMING_RUN]: FBXSkeletonAnimation.RIFLE_AIMING_RUN,
      [UnitAnimationId.WALK_BACKWARDS]:
        FBXSkeletonAnimation.RIFLE_WALK_BACKWARD,
      [UnitAnimationId.STRAFE_RIGHT]: FBXSkeletonAnimation.STRAFE_RIGHT,
      [UnitAnimationId.STRAFE_LEFT]: FBXSkeletonAnimation.STRAFE_LEFT,
    },
  }),
  [CharacterId.FEMALE]: patchObject(basicCharacter, {
    name: "Female",
    fbxModelId: FBXModelId.FEMALE,
    scale: new THREE.Vector3(0.014, 0.014, 0.014),
    height: 1.66,
    animations: {
      [UnitAnimationId.IDLE]: FBXSkeletonAnimation.FEMALE_IDLE,
      [UnitAnimationId.AIMING_IDLE]: FBXSkeletonAnimation.RIFLE_AIMING_IDLE,
      [UnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.FEMALE_JUMP_LOOP,
      [UnitAnimationId.WALK]: FBXSkeletonAnimation.FEMALE_WALK,
      [UnitAnimationId.RUN]: FBXSkeletonAnimation.FEMALE_RUN,
      [UnitAnimationId.AIMING_WALK]: FBXSkeletonAnimation.FEMALE_RUN,
      [UnitAnimationId.AIMING_RUN]: FBXSkeletonAnimation.FEMALE_RUN,
      [UnitAnimationId.WALK_BACKWARDS]:
        FBXSkeletonAnimation.RIFLE_WALK_BACKWARD,
      [UnitAnimationId.STRAFE_RIGHT]: FBXSkeletonAnimation.STRAFE_RIGHT,
      [UnitAnimationId.STRAFE_LEFT]: FBXSkeletonAnimation.STRAFE_LEFT,
    },
  }),
};
