import * as THREE from "three";

import { FBXModelId, GLTFModelId, TextureId } from "./assets-config";
import {
  UnitAction,
  onUnitAction,
} from "@newkrok/three-tps/src/js/newkrok/three-tps/control/unit-action-manager.js";

import { CharacterId } from "./unit-config";
import { MODULE_ID } from "@newkrok/three-game/src/js/newkrok/three-game/modules/modules.js";
import { ModelSocketId } from "@newkrok/three-game/src/js/newkrok/three-game/unit/unit-enums.js";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import { getFBXModel } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/octree/octree.js";
import { patchObject } from "@newkrok/three-utils/src/js/newkrok/three-utils/object-utils.js";
import { projectilesModule } from "@newkrok/three-game/src/js/newkrok/three-game/modules/projectiles/projectiles.js";

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
  characters: [
    ...Array.from({ length: 4 }).map((_, index) => ({
      id: "player-" + index,
      characterId: CharacterId.MALE_CHARACTER,
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
  onLoaded: ({ getModule, getStaticModel, getCharacter, camera }) => {
    const collision = getStaticModel("level-1-collision").scene;
    collision.visible = false;
    getModule(MODULE_ID.OCTREE).worldOctree.fromGraphNode(collision);

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
    const availableTools = [
      FBXModelId.WATER_PISTOL_01,
      FBXModelId.WATER_GUN_01,
      FBXModelId.WATER_GUN_02,
    ];
    const createTools = () =>
      availableTools.map((id) => {
        const model = getFBXModel(id);
        model.rotation.set(-Math.PI * 1.4, Math.PI, Math.PI);
        model.position.x = 3;
        model.position.y = 13;
        model.position.z = 0;

        return { id, model, socketId: ModelSocketId.RIGHT_HAND };
      });

    const initPlayer = (player, target) => {
      const unit = getCharacter(({ id }) => id === player.unitId);
      if (target.name === "p0") {
        camera.setTarget(unit.model);
        camera.updateRotation({ x: target.rotation.z });
        for (let i = 1; i < 5; i++) {
          onUnitAction({
            action: UnitAction[`CHOOSE_TOOL_${i}`],
            callback: () => {
              selectedToolId = i - 2;
              unit.chooseTool(availableTools[selectedToolId]);
            },
          });
        }
        const projectileStartSocket = unit.getSocket(
          ModelSocketId.PROJECTILE_START
        );
        projectileStartSocket.position.y += 28;
        projectileStartSocket.position.x += 5;
        onUnitAction({
          action: UnitAction.CHOOSE_NEXT_TOOL,
          callback: () => {
            selectedToolId++;
            if (selectedToolId > availableTools.length) selectedToolId = 0;
            unit.chooseTool(availableTools[selectedToolId]);
          },
        });
        onUnitAction({
          action: UnitAction.CHOOSE_PREV_TOOL,
          callback: () => {
            selectedToolId--;
            if (selectedToolId < -1) selectedToolId = availableTools.length - 1;
            unit.chooseTool(availableTools[selectedToolId]);
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
