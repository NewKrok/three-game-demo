import * as THREE from "three";

import { FBXModelId } from "./assets-config";
import { basicCar } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/car-boilerplates.js";
import { deepMerge } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";

export const carConfig = deepMerge(basicCar, {
  body: {
    model: {
      fbx: {
        id: FBXModelId.ARCADE_CAR,
      },
      scale: new THREE.Vector3(0.0085, 0.0085, 0.0085),
    },
    offset: new THREE.Vector3(-0.05, -0.4, 0),
  },
});
