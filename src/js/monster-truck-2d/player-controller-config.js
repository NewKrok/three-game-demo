import {
  PlayerActionId,
  unitControllerConfig,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";

import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";

const CustomPlayerActionId = {
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
};

let selectedCameraDistance = 0;

export const cameraDistances = [
  {
    maxCameraDistance: 25,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 3 },
    positionOffset: { x: 0, y: 0, z: 0 },
  },
  {
    maxCameraDistance: 45,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 4 },
    positionOffset: { x: 0, y: 0, z: 0 },
  },
  {
    maxCameraDistance: 15,
    rotation: { x: Math.PI + Math.PI / 4, y: Math.PI - Math.PI / 3 },
    positionOffset: { x: 0, y: 0, z: 0 },
  },
];

export const updateCamera = (world) => {
  if (world.userData.tpsCamera) {
    world.userData.tpsCamera.setUseTargetRotation(
      cameraDistances[selectedCameraDistance].useTargetRotation
    );
    world.userData.tpsCamera.setMaxDistance(
      cameraDistances[selectedCameraDistance].maxCameraDistance
    );
    world.userData.tpsCamera.setRotation(
      cameraDistances[selectedCameraDistance].rotation
    );
    world.userData.tpsCamera.setPositionOffset(
      cameraDistances[selectedCameraDistance].positionOffset
    );
  }
};

export const playerControllerConfig = {
  actionConfig: [
    ...unitControllerConfig.actionConfig,
    {
      actionId: PlayerActionId.FORWARD,
      listenForDeactivation: true,
      keys: [Key.W, Key.ARROW_UP],
      gamepadButtons: [ButtonKey.Up],
      axis: ButtonKey.LeftAxisY,
      axisValidator: (v) => v < -0.1,
      axisValueModifier: (v) => v * -1,
    },
    {
      actionId: PlayerActionId.BACKWARD,
      listenForDeactivation: true,
      keys: [Key.S, Key.ARROW_DOWN],
      gamepadButtons: [ButtonKey.Down],
      axis: ButtonKey.LeftAxisY,
      axisValidator: (v) => v > 0.1,
    },
    {
      actionId: PlayerActionId.LEFT,
      listenForDeactivation: true,
      keys: [Key.A, Key.ARROW_LEFT],
      gamepadButtons: [ButtonKey.Left],
      axis: ButtonKey.LeftAxisX,
      axisValidator: (v) => v < -0.1,
      axisValueModifier: (v) => v * -1,
    },
    {
      actionId: PlayerActionId.RIGHT,
      listenForDeactivation: true,
      keys: [Key.D, Key.ARROW_RIGHT],
      gamepadButtons: [ButtonKey.Right],
      axis: ButtonKey.LeftAxisX,
      axisValidator: (v) => v > 0.1,
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      keys: [Key.C],
    },
  ],

  handlers: [
    ...unitControllerConfig.handlers,
    {
      actionId: PlayerActionId.FORWARD,
      callback: ({ value, target }) => {
        target.control.accelerate(value);
      },
    },
    {
      actionId: PlayerActionId.BACKWARD,
      callback: ({ value, target }) => {
        target.control.reverse(value);
      },
    },
    {
      actionId: PlayerActionId.LEFT,
      callback: ({ value, target }) => {
        target.control.leanBack(value);
      },
    },
    {
      actionId: PlayerActionId.RIGHT,
      callback: ({ value, target }) => {
        target.control.leanForward(value);
      },
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      callback: ({ world }) => {
        selectedCameraDistance++;
        if (selectedCameraDistance === cameraDistances.length)
          selectedCameraDistance = 0;
        updateCamera(world);
      },
    },
  ],
};
