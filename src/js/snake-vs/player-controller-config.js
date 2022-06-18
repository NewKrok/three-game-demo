import { Direction, DirectionVector } from "./snake-logic";
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
    maxCameraDistance: 15,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 16 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 25,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 8 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 5,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 3 },
    positionOffset: { x: 0, y: 3, z: 0 },
    useTargetRotation: true,
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
      listenForDeactivation: false,
      keys: [Key.W, Key.ARROW_UP],
      gamepadButtons: [ButtonKey.Up],
      axis: ButtonKey.LeftAxisY,
      axisValidator: (v) => v < -0.1,
      axisValueModifier: (v) => v * -1,
    },
    {
      actionId: PlayerActionId.BACKWARD,
      listenForDeactivation: false,
      keys: [Key.S, Key.ARROW_DOWN],
      gamepadButtons: [ButtonKey.Down],
      axis: ButtonKey.LeftAxisY,
      axisValidator: (v) => v > 0.1,
    },
    {
      actionId: PlayerActionId.LEFT,
      listenForDeactivation: false,
      keys: [Key.A, Key.ARROW_LEFT],
      gamepadButtons: [ButtonKey.Left],
      axis: ButtonKey.LeftAxisX,
      axisValidator: (v) => v < -0.1,
      axisValueModifier: (v) => v * -1,
    },
    {
      actionId: PlayerActionId.RIGHT,
      listenForDeactivation: false,
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
      callback: ({ world, target }) => {
        if (
          !world.userData.tpsCamera ||
          !world.userData.tpsCamera.getUseTargetRotation()
        )
          target.setDirection(Direction.UP);
      },
    },
    {
      actionId: PlayerActionId.BACKWARD,
      callback: ({ world, target }) => {
        if (
          !world.userData.tpsCamera ||
          !world.userData.tpsCamera.getUseTargetRotation()
        )
          target.setDirection(Direction.DOWN);
      },
    },
    {
      actionId: PlayerActionId.LEFT,
      callback: ({ world, target }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.direction;
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.LEFT
              : direction === DirectionVector.DOWN
              ? Direction.RIGHT
              : direction === DirectionVector.LEFT
              ? Direction.DOWN
              : Direction.UP
          );
        } else target.setDirection(Direction.LEFT);
      },
    },
    {
      actionId: PlayerActionId.RIGHT,
      callback: ({ world, target }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.direction;
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.RIGHT
              : direction === DirectionVector.DOWN
              ? Direction.LEFT
              : direction === DirectionVector.LEFT
              ? Direction.UP
              : Direction.DOWN
          );
        } else target.setDirection(Direction.RIGHT);
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
