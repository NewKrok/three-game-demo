import * as THREE from "three";

import { TextureId, assetsConfig } from "./assets-config";
import {
  availableCollectableCount,
  collectedCollectableCount,
  tricks,
} from "../../store/app";
import {
  playerControllerConfig,
  updateCamera,
} from "./player-controller-config";

import { CallLimits } from "@newkrok/three-utils/src/js/newkrok/three-utils/callback-utils.js";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { createMonsterTruck2DLogic } from "./monster-truck-2d-logic.js";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import gsap from "gsap";
import { napeCarModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/nape-car/nape-car-module.js";
import { napeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/nape/nape-module.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { staticParams } from "../static";
import { thirdPersonCameraModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/third-person-camera/third-person-camera-module.js";

const MonsterTruck2DWorldConfig = patchObject(getDefaultWorldConfig(), {
  assetsConfig: assetsConfig,
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 20, -10);
    directionalLight.castShadow = true;
    const d = 50;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 0.5;
    directionalLight.shadow.bias = -0.0003;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;

    return [
      new THREE.HemisphereLight(0x4488bb, 0x002244, 0.4),
      directionalLight,
    ];
  },
  modules: [
    {
      ...playerControllerModule,
      config: playerControllerConfig,
    },
    napeModule,
    napeCarModule,
    collectiblesModule,
    patchObject(thirdPersonCameraModule, {
      config: {
        callLimit: CallLimits.CALL_60_PER_SECONDS,
        yBoundaries: { min: -Math.PI * 2, max: Math.PI * 2 },
        maxDistance: 20,
        lerp: {
          position: {
            normal: 20,
          },
          targetRotation: 1,
        },
      },
    }),
  ],
  skybox: {
    size: 1500,
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
      thirdPersonCamera.instance.far = 1500;
      thirdPersonCamera.instance.updateProjectionMatrix();

      const napeModule = getModule(WorldModuleId.NAPE);
      const napeCar = getModule(WorldModuleId.NAPE_CAR);

      const gameLogic = createMonsterTruck2DLogic({
        scene,
        thirdPersonCamera,
        napeModule,
        napeCar,
      });
      getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget(gameLogic);

      updateCamera(world);

      on.update(gameLogic.update);
      on.dispose(() => {
        tricks.set([]);
        availableCollectableCount.set(0);
        collectedCollectableCount.set(0);
        gameLogic.dispose();
      });
    });
  },
});

export default MonsterTruck2DWorldConfig;
