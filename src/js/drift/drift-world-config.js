import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";
import { GLTFModelId, TextureId, assetsConfig } from "./assets-config";
import {
  cameraDistances,
  playerControllerConfig,
} from "./player-controller-config";
import { carSpeed, checkpointEntries, lapsCount } from "../../store/app";
import { disposeRegions, initRegion } from "./region-config";

import { ObjectUtils } from "@newkrok/three-utils";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { carConfig } from "./car-config.js";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import gsap from "gsap";
import { octreeCarModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree-car/octree-car-module.js";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree/octree-module.js";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { regionModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/region/region-module.js";
import { staticParams } from "../static";
import { thirdPersonCameraModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/third-person-camera/third-person-camera-module.js";
import { verletIntegrationModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/verlet-integration/verlet-integration-module.js";

const CarsWorldConfig = ObjectUtils.patchObject(getDefaultWorldConfig(), {
  assetsConfig: assetsConfig,
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  fog: new THREE.Fog(0x88ccee, 0, 300),
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(100, 40, 150);
    directionalLight.castShadow = true;
    const d = 200;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
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
    ObjectUtils.patchObject(thirdPersonCameraModule, {
      config: {
        yBoundaries: { min: 1.2, max: 2.7 },
        maxDistance: cameraDistances[0],
      },
    }),
    octreeModule,
    { ...regionModule, config: { debug: false } },
    collectiblesModule,
    verletIntegrationModule,
    ObjectUtils.patchObject(octreeCarModule, { config: { debug: false } }),
    {
      ...playerControllerModule,
      config: playerControllerConfig,
    },
  ],
  skybox: {
    size: 1000,
    textures: [
      TextureId.SKYBOX_1,
      TextureId.SKYBOX_2,
      TextureId.SKYBOX_3,
      TextureId.SKYBOX_4,
      TextureId.SKYBOX_5,
      TextureId.SKYBOX_6,
    ],
  },
  staticModels: [
    {
      id: "level-graphic",
      modelId: GLTFModelId.LEVEL_GRAPHIC,
    },
    {
      id: "level-collision",
      modelId: GLTFModelId.LEVEL_COLLISION,
    },
  ],
  onProgress: (ratio) => {
    document.documentElement.style.setProperty(
      "--preloader-progress-ratio",
      `${ratio * 100}%`
    );
  },
  onLoaded: (world) => {
    const { on, getModule, getStaticModel } = world;
    staticParams.world = world;
    on.pause(() => gsap.globalTimeline.pause());
    on.resume(() => gsap.globalTimeline.resume());

    const collision = getStaticModel("level-collision").scene;
    collision.visible = false;
    const worldOctree = getModule(WorldModuleId.OCTREE).worldOctree;
    worldOctree.fromGraphNode(collision);

    const graphic = getStaticModel("level-graphic").scene;

    const thirdPersonCamera = getModule(WorldModuleId.THIRD_PERSON_CAMERA);
    world.setCamera(thirdPersonCamera.instance);
    world.userData.tpsCamera = thirdPersonCamera;
    thirdPersonCamera.setWorldOctree(worldOctree);

    const initPlayer = (target) => {
      target.visible = false;

      const car = getModule(WorldModuleId.OCTREE_CAR).createCar({
        position: target.position.clone(),
        config: carConfig,
      });
      staticParams.playersUnit = car;

      // TODO: In this point the effects config is not ready yet. Handle it properly.
      setTimeout(() => {
        const scaleConversion = 1 / car.model.scale.x;

        const leftSmogEffect = createParticleSystem(
          effectsConfig[EffectId.CAR_SMOG]
        ).instance;
        leftSmogEffect.scale.set(
          scaleConversion,
          scaleConversion,
          scaleConversion
        );
        leftSmogEffect.rotation.y = Math.PI;
        leftSmogEffect.position.x = scaleConversion * 0.5;
        leftSmogEffect.position.y = scaleConversion * 0.3;
        leftSmogEffect.position.z = scaleConversion * -2;
        car.model.add(leftSmogEffect);

        const rightSmogEffect = createParticleSystem(
          effectsConfig[EffectId.CAR_SMOG]
        ).instance;
        rightSmogEffect.scale.set(
          scaleConversion,
          scaleConversion,
          scaleConversion
        );
        rightSmogEffect.rotation.y = Math.PI;
        rightSmogEffect.position.x = scaleConversion * -0.5;
        rightSmogEffect.position.y = scaleConversion * 0.3;
        rightSmogEffect.position.z = scaleConversion * -2;
        car.model.add(rightSmogEffect);
      });

      getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget(car);
      on.update(({ delta }) => {
        carSpeed.set(
          Math.floor((car.realSpeed * delta * ((60 * 60) / delta)) / 1000)
        );
      });
      on.dispose(() => {
        disposeRegions();
        checkpointEntries.set([]);
        carSpeed.set(0);
        lapsCount.set(0);
      });

      thirdPersonCamera.setTarget(car.model);
      thirdPersonCamera.setPositionOffset(new THREE.Vector3(0, 1.6, 0));
      thirdPersonCamera.setRotation({ x: target.rotation.y, y: 2 });
      thirdPersonCamera.setUseTargetRotation(true);
    };

    graphic.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) child.material.map.anisotropy = 4;
        if (child.name === "spawn-01") {
          initPlayer(child);
        }
        if (child.name.includes("checkpoint")) initRegion(child);
      }
    });
  },
});

export default CarsWorldConfig;
