import * as THREE from "three";

import { FBXModelId, FBXSkeletonAnimation } from "./assets-config.js";
import {
  HumanoidUnitAnimationId,
  rtsUnit,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/humanoid-unit-boilerplates.js";

import { ObjectUtils } from "@newkrok/three-utils";

export const CustomUnitAnimationId = {};

export const UnitId = {
  KNIGHT: "KNIGHT",
  WOLFRIDER: "WOLFRIDER",
  UNDEAD: "UNDEAD",
};

const customUnit = ObjectUtils.deepMerge(rtsUnit, {
  animationConfig: {
    rules: [...rtsUnit.animationConfig.rules],
  },
});

export const unitConfig = {
  [UnitId.KNIGHT]: {
    ...ObjectUtils.deepMerge(customUnit, {
      name: "knight",
      model: {
        fbx: {
          id: FBXModelId.KNIGHT,
        },
        scale: new THREE.Vector3(0.008, 0.008, 0.008),
      },
      animations: {
        [HumanoidUnitAnimationId.IDLE]: FBXSkeletonAnimation.KNIGHT_IDLE,
        [HumanoidUnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.KNIGHT_ATTACK,
        [HumanoidUnitAnimationId.WALK]: FBXSkeletonAnimation.KNIGHT_RUN,
      },
      speed: 0.035,
      rotationSpeed: 0.1,
    }),
  },
  [UnitId.WOLFRIDER]: {
    ...ObjectUtils.deepMerge(customUnit, {
      name: "wolfrider",
      model: {
        fbx: {
          id: FBXModelId.WOLFRIDER,
        },
        scale: new THREE.Vector3(0.025, 0.025, 0.025),
      },
      animations: {
        [HumanoidUnitAnimationId.IDLE]: FBXSkeletonAnimation.WOLFRIDER_IDLE,
        [HumanoidUnitAnimationId.JUMP_LOOP]:
          FBXSkeletonAnimation.WOLFRIDER_ATTACK,
        [HumanoidUnitAnimationId.WALK]: FBXSkeletonAnimation.WOLFRIDER_RUN,
      },
      speed: 0.055,
      rotationSpeed: 0.08,
    }),
  },
  [UnitId.UNDEAD]: {
    ...ObjectUtils.deepMerge(customUnit, {
      name: "undead",
      model: {
        fbx: {
          id: FBXModelId.UNDEAD,
        },
        scale: new THREE.Vector3(0.019, 0.019, 0.019),
      },
      animations: {
        [HumanoidUnitAnimationId.IDLE]: FBXSkeletonAnimation.UNDEAD_IDLE,
        [HumanoidUnitAnimationId.JUMP_LOOP]: FBXSkeletonAnimation.UNDEAD_ATTACK,
        [HumanoidUnitAnimationId.WALK]: FBXSkeletonAnimation.UNDEAD_RUN,
      },
      speed: 0.025,
      rotationSpeed: 0.05,
    }),
  },
};
