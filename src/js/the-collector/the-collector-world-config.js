import * as THREE from "three";

import { GLTFModelId, TextureId, assetsConfig } from "./assets-config";
import { UnitId, unitConfig } from "./unit-config.js";
import {
  cameraDistances,
  playerControllerConfig,
} from "./player-controller-config";
import { collectiblesData, initCollectible } from "./collectibles";

import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { availableCollectableCount } from "../../store/app";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { getTPSWorldConfig } from "@newkrok/three-tps/src/js/newkrok/three-tps/tps-world.js";
import gsap from "gsap";
import { initRegion } from "./region-config";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree/octree-module.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { regionModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/region/region-module.js";
import { staticParams } from "../static";
import { tpsMovementModule } from "@newkrok/three-tps/src/js/newkrok/three-tps/unit/modules/tps-movements/tps-movements.js";

const TheCollectorWorldConfig = patchObject(getTPSWorldConfig(), {
  assetsConfig: assetsConfig,
  unitConfig: unitConfig,
  tpsCamera: {
    yBoundaries: { min: 1.2, max: 2.7 },
    maxDistance: cameraDistances[0],
  },
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
  },
  fog: new THREE.Fog(0x88ccee, 0, 100),
  entities: () => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 15, 25);
    directionalLight.castShadow = true;
    const d = 100;
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
    octreeModule,
    { ...regionModule, config: { debug: false } },
    collectiblesModule,
    {
      ...playerControllerModule,
      config: playerControllerConfig,
    },
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
  units: [
    ...Array.from({ length: 1 }).map((_, index) => ({
      id: `unit-0${index + 1}`,
      unitId: UnitId.MALE_CHARACTER,
    })),
  ],
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
    const { on, getModule, getStaticModel, getUnit, tpsCamera } = world;
    staticParams.world = world;
    on.pause(() => gsap.globalTimeline.pause());
    on.resume(() => gsap.globalTimeline.resume());

    const collision = getStaticModel("level-collision").scene;
    collision.visible = false;
    getModule(WorldModuleId.OCTREE).worldOctree.fromGraphNode(collision);

    const graphic = getStaticModel("level-graphic").scene;

    const playerData = {
      color: 0x00ff00,
    };

    staticParams.playersUnit = getUnit("unit-01");

    const applySkin = (model, color) => {
      model.traverse((child) => {
        if (child.isMesh && child.visible && child.material) {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(color);
        }
      });
    };

    const initPlayer = (player, target) => {
      target.visible = false;
      const unit = staticParams.playersUnit;
      getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget(unit);
      unit.addModules([tpsMovementModule]);
      tpsCamera.setTarget(unit.model);
      tpsCamera.setPositionOffset(new THREE.Vector3(0, 1.6, 0));
      tpsCamera.setRotation({ x: target.rotation.y, y: 2 });
      const projectileStartSocket = new THREE.Object3D();
      projectileStartSocket.position.y = 55;
      projectileStartSocket.position.x = 3;
      projectileStartSocket.position.z = -8;
      unit.registerObjectIntoSocket({
        id: "projectileStart",
        object: projectileStartSocket,
        socketId: ModelSocketId.RIGHT_HAND,
      });
      projectileStartSocket.visible = true;
      applySkin(unit.model, player.color);
      unit.teleportTo(target.position);
      unit.setRotation(target.rotation.y);
    };

    graphic.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) child.material.map.anisotropy = 4;
        if (child.name === "spawn-01") {
          initPlayer(playerData, child);
        }
        if (child.name.includes("collectible")) {
          availableCollectableCount.update((prev) => prev + 1);
          initCollectible(collectiblesData["collectible"], child);
        }
        if (
          [
            "portal-01",
            "portal-02",
            "portal-03",
            "spawn-01",
            "spawn-02",
            "spawn-03",
            "bottom",
          ].includes(child.name)
        )
          initRegion(child);
      }
    });
  },
});

export default TheCollectorWorldConfig;
