import { GLTFModelId } from "./assets-config";
import { ObjectUtils } from "@newkrok/three-utils";
import { basicNapeCar } from "@newkrok/three-game/src/js/newkrok/three-game/boilerplates/nape-car-boilerplates.js";
import { tricks } from "../../store/app";

export const carConfig = ObjectUtils.deepMerge(basicNapeCar, {
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
