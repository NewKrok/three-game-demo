import { AbilityId } from "./ability-config";
import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard.js";
import { Mouse } from "@newkrok/three-game/src/js/newkrok/three-game/control/mouse.js";
import { UnitModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

const UnitActionId = {
  JUMP: "JUMP",
  DASH: "DASH",
  AIM: "AIM",
  TOOL_ACTION: "TOOL_ACTION",
};

export const unitControllerConfig = {
  actionConfig: [
    {
      actionId: UnitActionId.JUMP,
      keys: [Key.Space],
      gamepadButtons: [ButtonKey.ActionBottom],
    },
    {
      actionId: UnitActionId.DASH,
      keys: [Key.Q],
      gamepadButtons: [ButtonKey.ActionRight],
    },
    {
      actionId: UnitActionId.AIM,
      mouse: [Mouse.RIGHT_BUTTON],
      gamepadButtons: [ButtonKey.LeftTrigger],
    },
    {
      actionId: UnitActionId.TOOL_ACTION,
      listenForDeactivation: true,
      mouse: [Mouse.LEFT_BUTTON],
      gamepadButtons: [ButtonKey.RightTrigger],
    },
  ],
  handlers: [
    {
      actionId: UnitActionId.JUMP,
      callback: ({ unit }) => {
        if (unit.onGround) unit.jump();
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
        unit.userData.useAim = !unit.userData.useAim;
        if (unit.userData.useAim) world.tpsCamera.useAimZoom();
        else {
          world.tpsCamera.disableAimZoom();
          unit.useAim = false;
        }
      },
    },
    {
      actionId: UnitActionId.TOOL_ACTION,
      callback: ({ unit, value }) => {
        const selectedTool = unit.getSelectedTool();
        if (!selectedTool) return;
        const abilitiesModule = unit.getModule(UnitModuleId.ABILITIES);
        if (value === 1) abilitiesModule.activate(selectedTool.ability);
        else abilitiesModule.deactivate(selectedTool.ability);
      },
    },
  ],
};
