import * as THREE from "three";

import { Direction, DirectionVector } from "./tank-battle-logic";
import {
  PlayerActionId,
  unitControllerConfig,
} from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";

import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";

const CustomPlayerActionId = {
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
  CHANGE_TANK_COLOR: "CHANGE_TANK_COLOR",
  SHOOT: "SHOOT",
};

let selectedCameraDistance = 0;

export const cameraDistances = [
  {
    maxCameraDistance: 7,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 8 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 9,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 8 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 18,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 8 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 1.25,
    rotation: { x: 0, y: Math.PI - Math.PI / 3.25 },
    positionOffset: { x: 0.5, y: 0.75, z: 0 },
    useTargetRotation: true,
    targetQuaternionOffset: new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      Math.PI
    ),
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
    world.userData.tpsCamera.setTargetQuaternionOffset(
      cameraDistances[selectedCameraDistance].targetQuaternionOffset
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
      actionId: CustomPlayerActionId.SHOOT,
      listenForDeactivation: true,
      keys: [Key.SPACE],
      gamepadButtons: [ButtonKey.ActionBottom],
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      gamepadButtons: [ButtonKey.ActionTop],
      keys: [Key.C],
    },
    {
      actionId: CustomPlayerActionId.CHANGE_TANK_COLOR,
      gamepadButtons: [ButtonKey.ActionLeft],
      keys: [Key.V],
    },
  ],

  handlers: [
    ...unitControllerConfig.handlers,
    {
      actionId: PlayerActionId.FORWARD,
      callback: ({ world, target, value }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.lastDirection;
          target.resetDirections();
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.UP
              : direction === DirectionVector.DOWN
              ? Direction.DOWN
              : direction === DirectionVector.LEFT
              ? Direction.LEFT
              : Direction.RIGHT,
            value
          );
        } else target.setDirection(Direction.UP, value);
      },
    },
    {
      actionId: PlayerActionId.BACKWARD,
      callback: ({ world, target, value }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.lastDirection;
          target.resetDirections();
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.DOWN
              : direction === DirectionVector.DOWN
              ? Direction.UP
              : direction === DirectionVector.LEFT
              ? Direction.RIGHT
              : Direction.LEFT,
            value
          );
        } else target.setDirection(Direction.DOWN, value);
      },
    },
    {
      actionId: PlayerActionId.LEFT,
      callback: ({ world, target, value }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.lastDirection;
          target.resetDirections();
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.LEFT
              : direction === DirectionVector.DOWN
              ? Direction.RIGHT
              : direction === DirectionVector.LEFT
              ? Direction.DOWN
              : Direction.UP,
            value
          );
        } else target.setDirection(Direction.LEFT, value);
      },
    },
    {
      actionId: PlayerActionId.RIGHT,
      callback: ({ world, target, value }) => {
        if (!world.userData.tpsCamera) return;
        if (world.userData.tpsCamera.getUseTargetRotation()) {
          const direction = target.player.lastDirection;
          target.resetDirections();
          target.setDirection(
            direction === DirectionVector.UP
              ? Direction.RIGHT
              : direction === DirectionVector.DOWN
              ? Direction.LEFT
              : direction === DirectionVector.LEFT
              ? Direction.UP
              : Direction.DOWN,
            value
          );
        } else target.setDirection(Direction.RIGHT, value);
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
    {
      actionId: CustomPlayerActionId.CHANGE_TANK_COLOR,
      callback: ({ target }) => {
        target.changeColor();
      },
    },
    {
      actionId: CustomPlayerActionId.SHOOT,
      callback: ({ target, value }) => {
        target.shoot(value);
      },
    },
  ],
};
