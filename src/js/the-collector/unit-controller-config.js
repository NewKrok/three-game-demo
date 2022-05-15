import * as THREE from "three";

import {
  TPSUnitActionId,
  tpsUnitControllerConfig,
} from "@newkrok/three-tps/src/js/newkrok/three-tps/boilerplates/tps-unit-controller-boilerplates.js";

import { AbilityId } from "../ability-config";
import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { UnitActionId } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/unit-controller-boilerplates.js";
import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

const TPSDemoUnitActionId = {
  DASH: "DASH",
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
};

let selectedCameraDistance = 0;
export const cameraDistances = [3, 4, 2];

export const unitControllerConfig = {
  actionConfig: [
    ...tpsUnitControllerConfig.actionConfig,
    {
      actionId: UnitActionId.SPRINT,
      listenForDeactivation: true,
      keys: [Key.SHIFT],
      gamepadButtons: [ButtonKey.LeftAxisButton],
    },
    {
      actionId: TPSDemoUnitActionId.DASH,
      keys: [Key.Q],
      gamepadButtons: [ButtonKey.ActionRight],
    },
    {
      actionId: TPSDemoUnitActionId.CHANGE_CAMERA_DISTANCE,
      keys: [Key.C],
    },
  ],

  handlers: [
    ...tpsUnitControllerConfig.handlers,
    {
      actionId: UnitActionId.SPRINT,
      callback: ({ unit, value }) => {
        unit.userData.useSprint = value;
      },
    },
    {
      actionId: TPSDemoUnitActionId.DASH,
      callback: ({ unit, value }) => {
        const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
        if (value === 1) abilitiesModule.activate(AbilityId.DASH);
      },
    },
    {
      actionId: TPSUnitActionId.AIM,
      callback: ({ unit, world }) => {
        if (!unit.userData.useAim) {
          world.tpsCamera.setMaxDistance(
            world.userData.maxCameraDistance || cameraDistances[0]
          );
        }
      },
    },
    {
      actionId: TPSDemoUnitActionId.CHANGE_CAMERA_DISTANCE,
      callback: ({ world, unit }) => {
        selectedCameraDistance++;
        if (selectedCameraDistance === cameraDistances.length)
          selectedCameraDistance = 0;
        world.userData.maxCameraDistance =
          cameraDistances[selectedCameraDistance];
        if (unit.userData.useAim) {
          world.tpsCamera.setMaxDistance(0);
          world.tpsCamera.setPositionOffset(new THREE.Vector3(3, 0, 0));
        } else {
          world.tpsCamera.setMaxDistance(world.userData.maxCameraDistance);
        }
      },
    },
  ],
};
