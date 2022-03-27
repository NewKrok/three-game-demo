import * as THREE from "three";

import { GLTFModelId, TextureId } from "./assets-config";
import { ToolId, toolConfig } from "./tool-config";
import {
  UnitAction,
  onUnitAction,
} from "@newkrok/three-tps/src/js/newkrok/three-tps/control/unit-action-manager.js";
import {
  UnitModuleId,
  WorldModuleId,
} from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { UnitId } from "./unit-config";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import { getFBXModel } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/world/octree/octree-module.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { projectilesModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/world/projectiles/projectiles-module.js";

const TPSWorldConfig = patchObject(getDefaultWorldConfig(), {
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
  modules: [octreeModule, projectilesModule],
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
      unitId: UnitId.FEMALE_CHARACTER,
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
  onLoaded: ({ getModule, getStaticModel, getUnit, tpsCamera }) => {
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

    let selectedToolId = null;
    const createTools = () =>
      toolConfig.map((tool) => {
        const object = getFBXModel(tool.model.fbx.id);
        object.rotation.set(Math.PI / 2, Math.PI, Math.PI);
        object.position.copy(tool.model.position);

        return { ...tool, object };
      });

    const chooseTool = (unit, id) => {
      unit.chooseTool(id);
      let leftHandOffset = new THREE.Vector3();
      switch (id) {
        case ToolId.WATER_GUN_01:
          leftHandOffset.set(15, 28, 0);
          break;
        case ToolId.WATER_GUN_02:
          leftHandOffset.set(15, 40, 0);
          break;
        case ToolId.WATER_PISTOL_01:
          leftHandOffset.set(0, 0, 0);
          break;
        default:
          break;
      }
      unit.getModule(UnitModuleId.AIMING).setLeftHandOffset(leftHandOffset);
    };

    const initPlayer = (player, target) => {
      const unit = getUnit(({ id }) => id === player.unitId);
      if (target.name === "p0") {
        tpsCamera.setTarget(unit.model);
        tpsCamera.updateRotation({ x: target.rotation.z });
        for (let i = 1; i < 5; i++) {
          onUnitAction({
            action: UnitAction[`CHOOSE_TOOL_${i}`],
            callback: () => {
              selectedToolId = i - 2;
              chooseTool(unit, toolConfig[selectedToolId]?.id);
            },
          });
        }
        const projectileStartSocket = new THREE.Object3D();
        // projectileStartSocket.add(new THREE.AxesHelper(20000));
        projectileStartSocket.position.y = 55;
        projectileStartSocket.position.x = 3;
        projectileStartSocket.position.z = -8;
        unit.registerObjectIntoSocket({
          id: "projectileStart",
          object: projectileStartSocket,
          socketId: ModelSocketId.RIGHT_HAND,
        });
        projectileStartSocket.visible = true;
        onUnitAction({
          action: UnitAction.CHOOSE_NEXT_TOOL,
          callback: () => {
            selectedToolId++;
            if (selectedToolId > toolConfig.length) selectedToolId = 0;
            chooseTool(unit, toolConfig[selectedToolId]?.id);
          },
        });
        onUnitAction({
          action: UnitAction.CHOOSE_PREV_TOOL,
          callback: () => {
            selectedToolId--;
            if (selectedToolId < -1) selectedToolId = toolConfig.length - 1;
            chooseTool(unit, toolConfig[selectedToolId]?.id);
          },
        });
        // TODO: Temporary animation, preparation for the character selection
        onUnitAction({
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
        });
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
        if (player) {
          initPlayer(player, child);
          child.visible = false;
        }
      }
    });
  },
});

export default TPSWorldConfig;
