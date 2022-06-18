import * as THREE from "three";

import {
  TPSPlayerActionId,
  tpsUnitControllerConfig,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/tps-player-controller-boilerplates.js";
import { ToolId, toolConfig } from "./tool-config";

import { AbilityId } from "../ability-config";
import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { Mouse } from "@newkrok/three-game/src/js/newkrok/three-game/control/mouse-manager.js";
import { PlayerActionId } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";
import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

const CustomPlayerActionId = {
  DASH: "DASH",
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
};

let crosshair = null;
const getCrosshair = () => {
  if (!crosshair) crosshair = document.querySelector(".crosshair");
  return crosshair;
};

const deactivateTool = (unit) => {
  const selectedTool = unit.getSelectedTool();
  if (selectedTool) {
    const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
    abilitiesModule.deactivate(selectedTool.ability);
  }
};

let selectedCameraDistance = 0;
export const cameraDistances = [3, 4, 15, 2];

let selectedToolId = null;
const chooseTool = (unit, id) => {
  deactivateTool(unit);
  unit.chooseTool(id);
  let leftHandOffset = new THREE.Vector3();
  switch (id) {
    case ToolId.WATER_GUN_01:
      leftHandOffset.set(15, 28, 0);
      break;
    case ToolId.WATER_GUN_02:
      leftHandOffset.set(15, 40, 0);
      break;
    case ToolId.WATER_PISTOL_01:
      leftHandOffset.set(0, 0, 0);
      break;
    default:
      break;
  }
  unit.getModule(UnitModuleId.AIMING).setLeftHandOffset(leftHandOffset);
};

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
      actionId: PlayerActionId.TOOL_ACTION,
      listenForDeactivation: true,
      mouse: [Mouse.LEFT_BUTTON],
      gamepadButtons: [ButtonKey.RightTrigger],
    },
    {
      actionId: PlayerActionId.CHOOSE_NEXT_TOOL,
      mouse: [Mouse.SCROLL_UP],
      gamepadButtons: [ButtonKey.Up],
    },
    {
      actionId: PlayerActionId.CHOOSE_PREV_TOOL,
      mouse: [Mouse.SCROLL_DOWN],
      gamepadButtons: [ButtonKey.Down],
    },
    ...Array.from({ length: 4 }).map((_, index) => ({
      actionId: PlayerActionId[`CHOOSE_TOOL_${index + 1}`],
      keys: [Key[index + 1]],
    })),
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
        getCrosshair().style.visibility = target.userData.useAim
          ? "visible"
          : "hidden";
        if (!target.userData.useAim && world.userData.tpsCamera) {
          world.userData.tpsCamera.setMaxDistance(
            world.userData.maxCameraDistance || cameraDistances[0]
          );
          deactivateTool(target);
        }
      },
    },
    {
      actionId: PlayerActionId.TOOL_ACTION,
      callback: ({ target, value }) => {
        if (target.userData.useAim) {
          const selectedTool = target.getSelectedTool();
          if (!selectedTool) return;
          const abilitiesModule = target.getModule(UnitModuleId.ABILITIES);
          if (value === 1) abilitiesModule.activate(selectedTool.ability);
          else abilitiesModule.deactivate(selectedTool.ability);
        }
      },
    },
    {
      actionId: PlayerActionId.CHOOSE_NEXT_TOOL,
      callback: ({ target }) => {
        selectedToolId++;
        if (selectedToolId > toolConfig.length) selectedToolId = 0;
        chooseTool(target, toolConfig[selectedToolId]?.id);
      },
    },
    {
      actionId: PlayerActionId.CHOOSE_PREV_TOOL,
      callback: ({ target }) => {
        selectedToolId--;
        if (selectedToolId < -1) selectedToolId = toolConfig.length - 1;
        chooseTool(target, toolConfig[selectedToolId]?.id);
      },
    },
    ...Array.from({ length: 4 }).map((_, index) => ({
      actionId: PlayerActionId[`CHOOSE_TOOL_${index + 1}`],
      callback: ({ target }) => {
        if (selectedToolId === index - 1) {
          selectedToolId = null;
          chooseTool(target, selectedToolId);
        } else {
          selectedToolId = index - 1;
          chooseTool(target, toolConfig[selectedToolId]?.id);
        }
      },
    })),
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
