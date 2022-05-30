import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { TextureId } from "./assets-config";
import { carControllerConfig } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";
import { getTexture } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";

const TPSDemoPlayerActionId = {
  CHANGE_CAMERA_DISTANCE: "CHANGE_CAMERA_DISTANCE",
  CHANGE_CAR_COLOR: "CHANGE_CAR_COLOR",
};

let selectedCameraDistance = 0;
export const cameraDistances = [6, 10, 4];
let selectedCarTexture = 0;
export const carTextures = [
  TextureId.ARCADE_CAR_YELLOW,
  TextureId.ARCADE_CAR_RED,
  TextureId.ARCADE_CAR_LIGHT_BLUE,
  TextureId.ARCADE_CAR_BLUE,
  TextureId.ARCADE_CAR_GRAY,
];

export const playerControllerConfig = {
  actionConfig: [
    ...carControllerConfig.actionConfig,
    {
      actionId: TPSDemoPlayerActionId.CHANGE_CAMERA_DISTANCE,
      keys: [Key.C],
    },
    {
      actionId: TPSDemoPlayerActionId.CHANGE_CAR_COLOR,
      keys: [Key.V],
    },
  ],

  handlers: [
    ...carControllerConfig.handlers,
    {
      actionId: TPSDemoPlayerActionId.CHANGE_CAMERA_DISTANCE,
      callback: ({ world }) => {
        selectedCameraDistance++;
        if (selectedCameraDistance === cameraDistances.length)
          selectedCameraDistance = 0;
        world.userData.maxCameraDistance =
          cameraDistances[selectedCameraDistance];
        world.tpsCamera.setMaxDistance(world.userData.maxCameraDistance);
      },
    },
    {
      actionId: TPSDemoPlayerActionId.CHANGE_CAR_COLOR,
      callback: ({ target }) => {
        selectedCarTexture++;
        if (selectedCarTexture === carTextures.length) selectedCarTexture = 0;
        target.model.children[0].material.map = getTexture(
          carTextures[selectedCarTexture]
        );
      },
    },
  ],
};
