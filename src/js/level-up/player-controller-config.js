import * as THREE from "three";

import { ButtonKey } from "@newkrok/three-game/src/js/newkrok/three-game/control/gamepad.js";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { Mouse } from "@newkrok/three-game/src/js/newkrok/three-game/control/mouse-manager.js";
import { staticParams } from "../static.js";
import { unitControllerConfig } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";

const CustomPlayerActionId = {
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
  SET_TARGET: "SET_TARGET",
  COMMAND: "COMMAND",
  MINIMAP_COMMAND: "MINIMAP_COMMAND",
};

const commandRaycaster = new THREE.Raycaster();

let selectedCameraDistance = 0;
let documentMousePosition = { x: 0, y: 0 };
let minimapMousePosition = { x: 0, y: 0 };

export const cameraDistances = [
  {
    maxCameraDistance: 10,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 9 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 20,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 9 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 40,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 7 },
    positionOffset: { x: 0, y: 0, z: 0 },
    useTargetRotation: false,
  },
  {
    maxCameraDistance: 7,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 3 },
    positionOffset: { x: 0, y: 1, z: 0 },
    useTargetRotation: true,
  },
  {
    maxCameraDistance: 5,
    rotation: { x: -Math.PI, y: Math.PI - Math.PI / 3 },
    positionOffset: { x: 0, y: 0, z: 0 },
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
    if (cameraDistances[selectedCameraDistance].targetQuaternionOffset)
      world.userData.tpsCamera.setTargetQuaternionOffset(
        cameraDistances[selectedCameraDistance].targetQuaternionOffset
      );
  }
};

let minimap;
let canvas;
let isMinimapTarget = false;
let isGameTarget = false;
export const playerControllerConfig = {
  actionConfig: [
    ...unitControllerConfig.actionConfig,
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      gamepadButtons: [ButtonKey.ActionTop],
      keys: [Key.C],
    },
    {
      actionId: CustomPlayerActionId.SET_TARGET,
      customTrigger: (trigger) => {
        document.addEventListener("mousemove", (event) => {
          if (!minimap) minimap = document.querySelector("#minimap");
          if (!canvas)
            canvas = document
              .querySelector("#three-tps-demo")
              .querySelector("canvas");
          isMinimapTarget = event.target === minimap;
          isGameTarget = event.target === canvas;
          if (isMinimapTarget) {
            trigger({ x: event.offsetX, y: event.offsetY });
          } else trigger({ x: event.clientX, y: event.clientY });
        });
      },
    },
    {
      actionId: CustomPlayerActionId.COMMAND,
      mouse: [Mouse.LEFT_BUTTON],
    },
    {
      actionId: CustomPlayerActionId.MINIMAP_COMMAND,
      mouse: [Mouse.LEFT_BUTTON],
    },
  ],

  handlers: [
    ...unitControllerConfig.handlers,
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
      actionId: CustomPlayerActionId.SET_TARGET,
      callback: ({ value: { x, y } }) => {
        if (isMinimapTarget) {
          minimapMousePosition.x = x;
          minimapMousePosition.y = y;
        } else {
          documentMousePosition.x = (x / window.innerWidth) * 2 - 1;
          documentMousePosition.y = -(y / window.innerHeight) * 2 + 1;
        }
      },
    },
    {
      actionId: CustomPlayerActionId.COMMAND,
      callback: ({ world }) => {
        if (
          staticParams.playersUnit &&
          !isMinimapTarget &&
          world.userData.tpsCamera &&
          isGameTarget
        ) {
          commandRaycaster.setFromCamera(
            documentMousePosition,
            world.userData.tpsCamera.instance
          );
          const intersects = commandRaycaster.intersectObject(
            world.userData.heightmap,
            false
          );
          if (intersects.length) {
            world.userData.moveTo(
              staticParams.playersUnit,
              intersects[0].point
            );
          }
        }
      },
    },
    {
      actionId: CustomPlayerActionId.MINIMAP_COMMAND,
      callback: ({ world }) => {
        if (staticParams.playersUnit && isMinimapTarget) {
          world.userData.moveTo(
            staticParams.playersUnit,
            new THREE.Vector3(
              Math.floor(minimapMousePosition.x),
              0,
              Math.floor(minimapMousePosition.y)
            )
          );
        }
      },
    },
  ],
};
