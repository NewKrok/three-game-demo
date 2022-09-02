import { GLTFModelId } from "./assets-config";
import { basicNapeCar } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/nape-car-boilerplates.js";
import { deepMerge } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { tricks } from "../../store/app";

export const carConfig = deepMerge(basicNapeCar, {
  body: {
    model: {
      gltf: {
        id: GLTFModelId.CAR_1,
      },
    },
  },
  wheels: {
    front: {
      model: {
        gltf: {
          id: GLTFModelId.CAR_WHEEL,
        },
      },
    },
    rear: {
      model: {
        gltf: {
          id: GLTFModelId.CAR_WHEEL,
        },
      },
    },
  },
  on: {
    trick: (trick) => {
      tricks.update((prev) => prev.concat([trick]));
    },
  },
});
