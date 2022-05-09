import * as THREE from "three";

import { GLTFModelId, TextureId } from "../assets-config";
import {
  cameraDistances,
  unitControllerConfig,
} from "../unit-controller-config";
import { collectiblesData, initCollectible } from "../collectibles";

import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { UnitId } from "../unit-config";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { getFBXModel } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { getTPSWorldConfig } from "@newkrok/three-tps/src/js/newkrok/three-tps/tps-world.js";
import gsap from "gsap";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree/octree-module.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { projectilesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/projectiles/projectiles-module.js";
import { staticParams } from "../static";
import { toolConfig } from "../tool-config";
import { tpsMovementModule } from "@newkrok/three-tps/src/js/newkrok/three-tps/unit/modules/tps-movements/tps-movements.js";
import { unitControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/unit/modules/unit-controller/unit-controller-module.js";

const ArenaWorldConfig = patchObject(getTPSWorldConfig(), {
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
    const d = 50;
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
  modules: [octreeModule, projectilesModule, collectiblesModule],
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
    ...Array.from({ length: 4 }).map((_, index) => ({
      id: "player-" + index,
      unitId: UnitId.MALE_CHARACTER,
    })),
  ],
  staticModels: [
    {
      id: "level-1-graphic",
      modelId: GLTFModelId.LEVEL_1_GRAPHIC,
    },
    {
      id: "level-1-collision",
      modelId: GLTFModelId.LEVEL_1_COLLISION,
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

    const collision = getStaticModel("level-1-collision").scene;
    collision.visible = false;
    getModule(WorldModuleId.OCTREE).worldOctree.fromGraphNode(collision);

    const graphic = getStaticModel("level-1-graphic").scene;

    const playerData = Array.from({ length: 4 }).reduce(
      (prev, _, index) => ({
        ...prev,
        [`p${index}`]: {
          unitId: `player-${index}`,
          color: index < 2 ? 0xff0000 : 0x0000ff,
        },
      }),
      {}
    );

    const applySkin = (model, color) => {
      model.traverse((child) => {
        if (child.isMesh && child.visible && child.material) {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(color);
        }
      });
    };

    const createTools = () =>
      toolConfig.map((tool) => {
        const object = getFBXModel(tool.model.fbx.id);
        object.rotation.set(Math.PI / 2, Math.PI, Math.PI);
        object.position.copy(tool.model.position);

        return { ...tool, object };
      });

    const initPlayer = (player, target) => {
      target.visible = false;
      const unit = getUnit(player.unitId);
      if (target.name === "p0") {
        unit.addModules([
          {
            ...unitControllerModule,
            config: unitControllerConfig,
          },
          tpsMovementModule,
        ]);
        tpsCamera.setTarget(unit.model);
        tpsCamera.setPositionOffset(new THREE.Vector3(0, 1.6, 0));
        tpsCamera.updateRotation({ x: target.rotation.z });
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
        // TODO: Temporary animation, preparation for the character selection
        /*onUnitAction({
          action: UnitAction.Interaction,
          callback: () => {
            if (!unit.userData.showVictoryAnimation) {
              unit.userData.showVictoryAnimation = true;
              setTimeout(
                () => (unit.userData.showVictoryAnimation = false),
                1000
              );
            }
          },
        });*/
      }
      applySkin(unit.model, player.color);
      unit.registerTools(createTools());
      unit.teleportTo(target.position);
      unit.setRotation(target.rotation.z);
    };

    graphic.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) child.material.map.anisotropy = 4;
        const player = playerData[child.name];
        if (player) initPlayer(player, child);
        else {
          const collectible = collectiblesData[child.name];
          if (collectible) initCollectible(collectible, child);
        }
      }
    });
  },
});

export default ArenaWorldConfig;
