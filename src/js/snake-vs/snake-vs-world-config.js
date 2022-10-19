import * as THREE from "three";

import { TextureId, assetsConfig } from "./assets-config";
import {
  playerControllerConfig,
  updateCamera,
} from "./player-controller-config";

import { CallLimits } from "@newkrok/three-utils/src/js/newkrok/three-utils/callback-utils.js";
import { ObjectUtils } from "@newkrok/three-utils";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { createSnakeLogic } from "./snake-logic";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import gsap from "gsap";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { staticParams } from "../static";
import { thirdPersonCameraModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/third-person-camera/third-person-camera-module.js";

const SnakeVSWorldConfig = ObjectUtils.patchObject(getDefaultWorldConfig(), {
  assetsConfig: assetsConfig,
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(90, 35, 26);
    directionalLight.castShadow = true;
    const d = 100;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 1;
    directionalLight.shadow.bias = -0.00006;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;

    return [
      new THREE.HemisphereLight(0x4488bb, 0x002244, 0.5),
      directionalLight,
    ];
  },
  modules: [
    {
      ...playerControllerModule,
      config: playerControllerConfig,
    },
    ObjectUtils.patchObject(thirdPersonCameraModule, {
      config: {
        callLimit: CallLimits.NO_LIMIT,
        yBoundaries: { min: -Math.PI * 2, max: Math.PI * 2 },
        maxDistance: 20,
        lerp: {
          position: {
            normal: 2,
          },
          targetRotation: 1,
        },
      },
    }),
  ],
  skybox: {
    textures: [
      TextureId.SKYBOX_1,
      TextureId.SKYBOX_2,
      TextureId.SKYBOX_3,
      TextureId.SKYBOX_4,
      TextureId.SKYBOX_5,
      TextureId.SKYBOX_6,
    ],
  },
  onProgress: (ratio) => {
    document.documentElement.style.setProperty(
      "--preloader-progress-ratio",
      `${ratio * 100}%`
    );
  },
  onLoaded: (world) => {
    const { on, scene, getModule } = world;
    staticParams.world = world;
    on.pause(() => gsap.globalTimeline.pause());
    on.resume(() => gsap.globalTimeline.resume());

    setTimeout(() => {
      const thirdPersonCamera = getModule(WorldModuleId.THIRD_PERSON_CAMERA);
      world.setCamera(thirdPersonCamera.instance);
      world.userData.tpsCamera = thirdPersonCamera;

      const snakeLogic = createSnakeLogic({ scene, thirdPersonCamera });
      getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget(snakeLogic);

      updateCamera(world);

      on.update(snakeLogic.update);
    });
  },
});

export default SnakeVSWorldConfig;
