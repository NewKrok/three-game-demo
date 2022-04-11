import * as THREE from "three";

import { ToolId, toolConfig } from "./tool-config";

import { AbilityId } from "./ability-config";
import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard.js";
import { Mouse } from "@newkrok/three-game/src/js/newkrok/three-game/control/mouse.js";
import { UnitActionId } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/unit-controller-boilerplates.js";
import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { tpsUnitControllerConfig } from "@newkrok/three-tps/src/js/newkrok/three-tps/boilerplates/tps-unit-controller-boilerplates.js";

let crosshair = null;
const getCrosshair = () => {
  if (!crosshair) crosshair = document.querySelector(".crosshair");
  return crosshair;
};

let selectedToolId = null;
const chooseTool = (unit, id) => {
  const selectedTool = unit.getSelectedTool();
  if (selectedTool) {
    const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
    abilitiesModule.deactivate(selectedTool.ability);
  }
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
      actionId: UnitActionId.DASH,
      keys: [Key.Q],
      gamepadButtons: [ButtonKey.ActionRight],
    },
    {
      actionId: UnitActionId.TOOL_ACTION,
      listenForDeactivation: true,
      mouse: [Mouse.LEFT_BUTTON],
      gamepadButtons: [ButtonKey.RightTrigger],
    },
    {
      actionId: UnitActionId.CHOOSE_NEXT_TOOL,
      mouse: [Mouse.SCROLL_UP],
      gamepadButtons: [ButtonKey.Up],
    },
    {
      actionId: UnitActionId.CHOOSE_PREV_TOOL,
      mouse: [Mouse.SCROLL_DOWN],
      gamepadButtons: [ButtonKey.Down],
    },
    ...Array.from({ length: 4 }).map((_, index) => ({
      actionId: UnitActionId[`CHOOSE_TOOL_${index + 1}`],
      keys: [Key[index + 1]],
    })),
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
      actionId: UnitActionId.DASH,
      callback: ({ unit, value }) => {
        const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
        if (value === 1) abilitiesModule.activate(AbilityId.DASH);
      },
    },
    {
      actionId: UnitActionId.AIM,
      callback: ({ unit, world }) => {
        getCrosshair().style.visibility = unit.userData.useAim
          ? "visible"
          : "hidden";
      },
    },
    {
      actionId: UnitActionId.TOOL_ACTION,
      callback: ({ unit, value }) => {
        if (unit.userData.useAim) {
          const selectedTool = unit.getSelectedTool();
          if (!selectedTool) return;
          const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
          if (value === 1) abilitiesModule.activate(selectedTool.ability);
          else abilitiesModule.deactivate(selectedTool.ability);
        }
      },
    },
    {
      actionId: UnitActionId.CHOOSE_NEXT_TOOL,
      callback: ({ unit }) => {
        selectedToolId++;
        if (selectedToolId > toolConfig.length) selectedToolId = 0;
        chooseTool(unit, toolConfig[selectedToolId]?.id);
      },
    },
    {
      actionId: UnitActionId.CHOOSE_PREV_TOOL,
      callback: ({ unit }) => {
        selectedToolId--;
        if (selectedToolId < -1) selectedToolId = toolConfig.length - 1;
        chooseTool(unit, toolConfig[selectedToolId]?.id);
      },
    },
    ...Array.from({ length: 4 }).map((_, index) => ({
      actionId: UnitActionId[`CHOOSE_TOOL_${index + 1}`],
      callback: ({ unit }) => {
        selectedToolId = index - 1;
        chooseTool(unit, toolConfig[selectedToolId]?.id);
      },
    })),
  ],
};
