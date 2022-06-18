import * as THREE from "three";

import {
  TPSPlayerActionId,
  tpsUnitControllerConfig,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/tps-player-controller-boilerplates.js";

import { AbilityId } from "../ability-config";
import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { PlayerActionId } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";
import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

const CustomPlayerActionId = {
  DASH: "DASH",
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
};

let selectedCameraDistance = 0;
export const cameraDistances = [3, 4, 2];

export const playerControllerConfig = {
  actionConfig: [
    ...tpsUnitControllerConfig.actionConfig,
    {
      actionId: PlayerActionId.SPRINT,
      listenForDeactivation: true,
      keys: [Key.SHIFT],
      gamepadButtons: [ButtonKey.LeftAxisButton],
    },
    {
      actionId: CustomPlayerActionId.DASH,
      keys: [Key.Q],
      gamepadButtons: [ButtonKey.ActionRight],
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      keys: [Key.C],
    },
  ],

  handlers: [
    ...tpsUnitControllerConfig.handlers,
    {
      actionId: PlayerActionId.SPRINT,
      callback: ({ target, value }) => {
        target.userData.useSprint = value;
      },
    },
    {
      actionId: CustomPlayerActionId.DASH,
      callback: ({ target, value }) => {
        const abilitiesModule = target.getModule(UnitModuleId.ABILITIES);
        if (value === 1) abilitiesModule.activate(AbilityId.DASH);
      },
    },
    {
      actionId: TPSPlayerActionId.AIM,
      callback: ({ target, world }) => {
        if (!target.userData.useAim && world.userData.tpsCamera) {
          world.userData.tpsCamera.setMaxDistance(
            world.userData.maxCameraDistance || cameraDistances[0]
          );
        }
      },
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      callback: ({ world, target }) => {
        selectedCameraDistance++;
        if (selectedCameraDistance === cameraDistances.length)
          selectedCameraDistance = 0;
        world.userData.maxCameraDistance =
          cameraDistances[selectedCameraDistance];
        if (!target.userData.useAim && world.userData.tpsCamera)
          world.userData.tpsCamera.setMaxDistance(
            world.userData.maxCameraDistance
          );
      },
    },
  ],
};
