import * as THREE from "three";

import { GLTFModelId, TextureId, assetsConfig } from "./assets-config";
import { UnitId, unitConfig } from "./unit-config";
import {
  UnitModuleId,
  WorldModuleId,
} from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import {
  cameraDistances,
  playerControllerConfig,
} from "./player-controller-config";
import { collectiblesData, initCollectible } from "./collectibles";

import { AssetsUtils } from "@newkrok/three-utils/assets";
import { CallLimits } from "@newkrok/three-utils/src/js/newkrok/three-utils/callback-utils.js";
import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/units/unit/unit-enums.js";
import { ObjectUtils } from "@newkrok/three-utils";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import gsap from "gsap";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree/octree-module.js";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { projectilesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/projectiles/projectiles-module.js";
import { staticParams } from "../static";
import { thirdPersonCameraModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/third-person-camera/third-person-camera-module.js";
import { toolConfig } from "./tool-config";
import { tpsMovementModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/units/unit/modules/tps-movements/tps-movements.js";
import { unitsModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/units/units-module.js";

const ArenaWorldConfig = ObjectUtils.patchObject(getDefaultWorldConfig(), {
  assetsConfig: assetsConfig,
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
  modules: [
    unitsModule,
    ObjectUtils.patchObject(thirdPersonCameraModule, {
      callLimit: CallLimits.NO_LIMIT,
      config: {
        yBoundaries: { min: 1.2, max: 2.7 },
        maxDistance: cameraDistances[0],
      },
    }),
    octreeModule,
    projectilesModule,
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

    const { createUnit, getUnit } = getModule(WorldModuleId.UNITS);
    for (let i = 0; i < 4; i++) {
      createUnit({
        id: `player-${i}`,
        config: unitConfig[UnitId.MALE_CHARACTER],
      });
    }

    const collision = getStaticModel("level-collision").scene;
    collision.visible = false;
    const worldOctree = getModule(WorldModuleId.OCTREE).worldOctree;
    worldOctree.fromGraphNode(collision);

    const graphic = getStaticModel("level-graphic").scene;

    const { addCollisionDetector } = getModule(WorldModuleId.PROJECTILES);
    addCollisionDetector(({ collider }) =>
      worldOctree.sphereIntersect(collider)
    );

    const thirdPersonCamera = getModule(WorldModuleId.THIRD_PERSON_CAMERA);
    world.setCamera(thirdPersonCamera.instance);
    world.userData.tpsCamera = thirdPersonCamera;
    thirdPersonCamera.setWorldOctree(worldOctree);

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
        const object = AssetsUtils.getFBXModel(tool.model.fbx.id);
        object.rotation.set(Math.PI / 2, Math.PI, Math.PI);
        object.position.copy(tool.model.position);

        return { ...tool, object };
      });

    const initPlayer = (player, target) => {
      target.visible = false;
      const unit = getUnit(player.unitId);
      if (target.name === "p0") {
        getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget(unit);
        unit.addModules([tpsMovementModule]);

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

        thirdPersonCamera.setTarget(unit.model);
        thirdPersonCamera.setPositionOffset(new THREE.Vector3(0, 1.6, 0));
        thirdPersonCamera.setRotation({ x: target.rotation.z, y: 2 });

        world.getModule(WorldModuleId.COLLECTIBLES).addCollector(unit);
      }
      applySkin(unit.model, player.color);
      unit.registerTools(createTools());
      unit.getModule(UnitModuleId.OCTREE_BEHAVIOR).teleportTo(target.position);
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
