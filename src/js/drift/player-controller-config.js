import { AssetsUtils } from "@newkrok/three-utils/assets";
import { Key } from "@newkrok/three-game/src/js/newkrok/three-game/control/keyboard-manager.js";
import { TextureId } from "./assets-config";
import { carControllerConfig } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/player-controller-boilerplates.js";

const CustomPlayerActionId = {
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
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      keys: [Key.C],
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAR_COLOR,
      keys: [Key.V],
    },
  ],

  handlers: [
    ...carControllerConfig.handlers,
    {
      actionId: CustomPlayerActionId.CHANGE_CAMERA_DISTANCE,
      callback: ({ world }) => {
        selectedCameraDistance++;
        if (selectedCameraDistance === cameraDistances.length)
          selectedCameraDistance = 0;
        world.userData.maxCameraDistance =
          cameraDistances[selectedCameraDistance];
        if (world.userData.tpsCamera)
          world.userData.tpsCamera.setMaxDistance(
            world.userData.maxCameraDistance
          );
      },
    },
    {
      actionId: CustomPlayerActionId.CHANGE_CAR_COLOR,
      callback: ({ target }) => {
        selectedCarTexture++;
        if (selectedCarTexture === carTextures.length) selectedCarTexture = 0;
        target.model.children[0].material.map = AssetsUtils.getTexture(
          carTextures[selectedCarTexture]
        );
      },
    },
  ],
};
