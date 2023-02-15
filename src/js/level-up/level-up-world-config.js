import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";
import { GLTFModelId, TextureId, assetsConfig } from "./assets-config";
import { UnitId, unitConfig } from "./unit-config.js";
import {
  UnitModuleId,
  WorldModuleId,
} from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectiblesData, initCollectible } from "./collectibles.js";
import {
  getGLTFModel,
  getTexture,
} from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import {
  playerControllerConfig,
  updateCamera,
} from "./player-controller-config";

import { CallLimits } from "@newkrok/three-utils/src/js/newkrok/three-utils/callback-utils.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { ObjectUtils } from "@newkrok/three-utils";
import { Player } from "@newkrok/three-game/src/js/newkrok/three-game/players/players-enums.js";
import TerrainFragmentShader from "./terrain-fragment-shader.glsl.js";
import TerrainVertexShader from "./terrain-vertex-shader.glsl.js";
import { astarModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/astar/astar-module.js";
import { availableCollectableCount } from "../../store/app.js";
import { collectiblesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/collectibles/collectibles-module.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import { distanceKeeperModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/distance-keeper/distance-keeper-module.js";
import { foliageConfig } from "./foliage-config.js";
import { foliageModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/foliage/foliage-module.js";
import { getDefaultWorldConfig } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import gsap from "gsap";
import { heightmapModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/heightmap/heightmap-module.js";
import { octreeModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/octree/octree-module.js";
import { playerControllerModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/player-controller/player-controller-module.js";
import { projectilesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/projectiles/projectiles-module.js";
import { staticParams } from "../static";
import { thirdPersonCameraModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/third-person-camera/third-person-camera-module.js";
import { unitsModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/units/units-module.js";
import { waterModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/water/water-module.js";

const applyStyles = (target, styles) => {
  Object.keys(styles).forEach((key) => (target.style[key] = styles[key]));
};

let minimapContainer;
const createMapMarker = (color, isHighlighted) => {
  const marker = document.createElement("div");
  applyStyles(marker, {
    width: "6px",
    height: "6px",
    background: color,
    borderRadius: "50%",
    position: "absolute",
    pointerEvents: "none",
    zIndex: "1",
    ...(isHighlighted
      ? {
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0px 0px 2px #ffffff)",
          padding: "6px",
        }
      : {}),
  });
  minimapContainer.appendChild(marker);
  return marker;
};

let directionalLight;
const LevelUpWorldConfig = ObjectUtils.patchObject(getDefaultWorldConfig(), {
  assetsConfig: assetsConfig,
  renderer: {
    pixelRatio: window.devicePixelRatio > 1.4 ? 1.4 : 1,
    toneMapping: THREE.NoToneMapping,
    shadowMap: {
      enabled: true,
      type: THREE.PCFSoftShadowMap,
    },
  },
  fog: new THREE.FogExp2(0x88ccee, 0.02),
  entities: () => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.castShadow = true;
    const d = 35;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.radius = 0.1;
    directionalLight.shadow.bias = -0.0000006;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;

    return [hemiLight, directionalLight];
  },
  modules: [
    collectiblesModule,
    heightmapModule,
    foliageModule,
    waterModule,
    astarModule,
    ObjectUtils.patchObject(distanceKeeperModule, {
      ...distanceKeeperModule,
      config: { callLimit: CallLimits.NO_LIMIT },
    }),
    ObjectUtils.patchObject(unitsModule, {
      ...unitsModule,
      config: { callLimit: CallLimits.NO_LIMIT },
    }),
    octreeModule,
    {
      ...projectilesModule,
      config: { callLimit: CallLimits.CALL_45_PER_SECONDS },
    },
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
          targetRotation: 2,
        },
      },
    }),
  ],
  skybox: {
    size: 512,
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

    let enemies = [];
    let allies = [];

    minimapContainer = document.createElement("div");
    minimapContainer.id = "minimapContainer";
    document.body.appendChild(minimapContainer);
    const playerMarker = createMapMarker("#ffff00", true);
    minimapContainer.appendChild(playerMarker);
    const enemyMarkers = [];
    const alliesMarkers = [];
    applyStyles(minimapContainer, {
      width: "256px",
      height: "256px",
      background: "#016831",
      position: "absolute",
      left: "0.5em",
      bottom: "0.5em",
      border: "1px solid #000",
      overflow: "hidden",
    });
    const minimap = document.createElement("canvas");
    minimap.id = "minimap";
    applyStyles(minimap, {
      width: "256px",
      height: "256px",
      cursor: "pointer",
    });
    // to avoid a stretching
    minimap.width = 256;
    minimap.height = 256;
    const minimapContext = minimap.getContext("2d");
    minimapContainer.appendChild(minimap);

    setTimeout(() => {
      // To help to understand the terrain blending
      const panel = new GUI({
        width: 310,
        title: "Terrain Editor",
      });
      const folder = panel.addFolder("Entries");
      folder.close();

      const distanceKeeperModule = getModule(WorldModuleId.DISTANCE_KEEPER);
      const thirdPersonCamera = getModule(WorldModuleId.THIRD_PERSON_CAMERA);
      world.setCamera(thirdPersonCamera.instance);
      world.userData.tpsCamera = thirdPersonCamera;

      getModule(WorldModuleId.PLAYER_CONTROLLER).setTarget({});

      const obstacles = [];

      const heightmapConfig = {
        width: 256,
        depth: 256,
        resolution: { width: 64, depth: 64 },
        elevationRatio: 0.35,
      };
      const _heightmapModule = getModule(WorldModuleId.HEIGHTMAP);
      _heightmapModule.createFromNoise(heightmapConfig);

      const heightMapCanvas = _heightmapModule.getImage();
      heightMapCanvas.style =
        "position: absolute; left: 0; top: 0; mix-blend-mode: hard-light; width: 256px; height: 256px; pointer-events: none; opacity: 0.8;";
      document.querySelector("#minimapContainer").appendChild(heightMapCanvas);

      const heightMapCanvasClone = document.createElement("canvas");
      heightMapCanvasClone.width = heightMapCanvas.width;
      heightMapCanvasClone.height = heightMapCanvas.height;
      const heightMapContext = heightMapCanvasClone.getContext("2d");
      heightMapContext.drawImage(heightMapCanvas, 0, 0);

      minimapContext.fillStyle = "#9999FF";
      for (let x = 0; x < heightmapConfig.width; x++) {
        for (let z = 0; z < heightmapConfig.depth; z++) {
          const y = _heightmapModule.getHeightFromPosition({ x, z, y: 0 });
          if (y < 7.5) {
            minimapContext.fillRect(x, z, 1, 1);
            obstacles.push([x, z]);
          }
        }
      }

      const terrainUniforms = THREE.UniformsUtils.merge([
        THREE.UniformsLib.lights,
        THREE.UniformsLib.fog,
        {
          bumpTexture: {
            type: "t",
            value: new THREE.CanvasTexture(heightMapCanvasClone),
          },
          steps: {
            type: "f",
            value: [
              0, 0.095, 0.069, 0.112, 64, 0.044, 0.12, 0.086, 0.129, 64, 0.09,
              0.129, 0.172, 0.249, 64, 0.086, 0.411, 0.342, 0.411, 64, 0.377,
              0.385, 0.496, 1, 64,
            ],
          },
          textures: {
            type: "t",
            value: [
              getTexture(TextureId.TERRAIN_0),
              getTexture(TextureId.TERRAIN_1),
              getTexture(TextureId.TERRAIN_2),
              getTexture(TextureId.TERRAIN_3),
              getTexture(TextureId.TERRAIN_4),
            ],
          },
        },
      ]);
      panel
        .add({ save: () => console.log(terrainUniforms.steps.value) }, "save")
        .name("Save");
      terrainUniforms.steps.value.forEach((_, index) => {
        folder
          .add(
            terrainUniforms.steps.value,
            index,
            0,
            (index + 1) % 5 ? 1 : 100,
            (index + 1) % 5 ? 0.001 : 1
          )
          .name(`#${index}`)
          .listen();
      });

      var terrainMaterial = new THREE.ShaderMaterial({
        uniforms: terrainUniforms,
        vertexShader: TerrainVertexShader,
        fragmentShader: TerrainFragmentShader,
        fog: true,
        lights: true,
      });

      const heightmap = new THREE.Mesh(
        _heightmapModule.getGeometry().toNonIndexed(),
        terrainMaterial
      );
      world.userData.heightmap = heightmap;
      heightmap.receiveShadow = true;
      scene.add(heightmap);
      heightmap.position.x = heightmapConfig.width / 2;
      heightmap.position.z = heightmapConfig.depth / 2;
      heightmap.rotation.x = -Math.PI / 2;

      const _foliageModule = getModule(WorldModuleId.FOLIAGE);
      [
        GLTFModelId.ROCK_020,
        GLTFModelId.TREE_001,
        GLTFModelId.DETAILS_012,
      ].forEach((modelId) => {
        const sample = getGLTFModel(modelId).scene.clone();
        const foliage = _foliageModule.createFoliage(
          ObjectUtils.deepMerge(foliageConfig[modelId], {
            sampler: heightmap,
            sample: {
              object: sample.children[0],
            },
            on: {
              create: ({ position }) => {
                if (modelId !== GLTFModelId.DETAILS_012) {
                  distanceKeeperModule.addObject({
                    object: new THREE.Vector3(
                      Math.round(position.x + heightmapConfig.width / 2),
                      position.z,
                      Math.round(
                        heightmapConfig.depth -
                          (position.y + heightmapConfig.depth / 2)
                      )
                    ),
                    radius: 1,
                    type: Player.PLAYER_1,
                    pushPermissions: [Player.PLAYER_1],
                    isStatic: true,
                  });
                }
                foliageConfig[modelId].obstacleMap.forEach(
                  ([xOffset, zOffset]) => {
                    const normalizedPosition = [
                      Math.round(position.x + heightmapConfig.width / 2) +
                        xOffset,
                      Math.round(
                        heightmapConfig.depth -
                          (position.y + heightmapConfig.depth / 2) +
                          zOffset
                      ),
                    ];
                    if (
                      normalizedPosition[0] >= 0 &&
                      normalizedPosition[1] >= 0 &&
                      normalizedPosition[0] < heightmapConfig.width &&
                      normalizedPosition[1] < heightmapConfig.depth
                    ) {
                      obstacles.push([
                        normalizedPosition[0],
                        normalizedPosition[1],
                      ]);
                    }
                    heightMapContext.fillStyle =
                      modelId === GLTFModelId.ROCK_020 ? "#DDDDDD" : "#333333";
                    heightMapContext.fillRect(
                      normalizedPosition[0] * 0.25 - 0.125,
                      normalizedPosition[1] * 0.25 - 0.125,
                      0.25,
                      0.25
                    );
                  }
                );
              },
            },
          })
        );
        heightmap.add(foliage);
      });

      // Update the terrain texture with details
      terrainUniforms.bumpTexture.value = new THREE.CanvasTexture(
        heightMapCanvasClone
      );

      const waterGeometry = new THREE.PlaneGeometry(
        heightmapConfig.width,
        heightmapConfig.depth,
        64,
        64
      );
      const waterTexture = getTexture(TextureId.WATER);
      waterTexture.repeat.set(
        heightmapConfig.width / 8,
        heightmapConfig.depth / 8
      );
      const noiseTexture = getTexture(TextureId.NOISE);

      const _waterModule = getModule(WorldModuleId.WATER);
      const water = _waterModule.createWater({
        texture: waterTexture,
        geometry: waterGeometry,
        noise: noiseTexture,
      });
      water.rotation.x = -Math.PI / 2;
      water.position.x = heightmapConfig.width / 2;
      water.position.y = 8;
      water.position.z = heightmapConfig.depth / 2;
      scene.add(water);

      const astar = getModule(WorldModuleId.ASTAR);
      astar
        .createMap({
          row: heightmapConfig.depth,
          col: heightmapConfig.width,
          obstacles,
        })
        .then((result) => {
          const astarMap = result;
          const moveTo = (unit, point, onComplete = null) => {
            const convertedUnitPosition = unit.container.position
              .clone()
              .round();
            convertedUnitPosition.x = Math.min(
              Math.max(convertedUnitPosition.x, 1),
              heightmapConfig.width - 1
            );
            convertedUnitPosition.z = Math.min(
              Math.max(convertedUnitPosition.z, 1),
              heightmapConfig.depth - 1
            );

            const convertedTargetPosition = point.clone().round();
            convertedTargetPosition.x = Math.min(
              Math.max(convertedTargetPosition.x, 1),
              heightmapConfig.width - 1
            );
            convertedTargetPosition.z = Math.min(
              Math.max(convertedTargetPosition.z, 1),
              heightmapConfig.depth - 1
            );

            const action2DModule = unit.getModule(UnitModuleId.ACTION_2D);

            if (
              astarMap.map.grid.grid[convertedUnitPosition.z][
                convertedUnitPosition.x
              ].value === 1
            )
              convertedUnitPosition.copy(
                action2DModule.properties.lastVisitedPosition.clone().round()
              );

            if (
              astarMap.map.grid.grid[convertedTargetPosition.z][
                convertedTargetPosition.x
              ].value === 1 ||
              !astarMap.hasIslandMatch(
                [convertedUnitPosition.x, convertedUnitPosition.z],
                [convertedTargetPosition.x, convertedTargetPosition.z]
              )
            ) {
              const nextPoint = new THREE.Vector3(
                convertedTargetPosition.x +
                  (convertedUnitPosition.x > convertedTargetPosition.x
                    ? 1
                    : convertedUnitPosition.x === convertedTargetPosition.x
                    ? 0
                    : -1),
                convertedTargetPosition.y,
                convertedTargetPosition.z +
                  (convertedUnitPosition.z > convertedTargetPosition.z
                    ? 1
                    : convertedUnitPosition.z === convertedTargetPosition.z
                    ? 0
                    : -1)
              );
              moveTo(unit, nextPoint, onComplete);
              onComplete?.();
              return;
            }
            const path = astarMap.search(
              [convertedUnitPosition.x, convertedUnitPosition.z],
              [convertedTargetPosition.x, convertedTargetPosition.z]
            );

            if (!path || path.length < 2) {
              onComplete?.();
              return;
            }

            path[path.length - 1] = [
              convertedTargetPosition.x,
              convertedTargetPosition.z,
            ];

            action2DModule.moveTo(path);
            if (onComplete) action2DModule.on.moveEnd(onComplete);
          };
          world.userData.moveTo = moveTo;

          const getRandomWalkablePosition = () => {
            const position = new THREE.Vector3();
            do {
              position.x = Math.floor(
                Math.random() * (heightmapConfig.width - 2) + 1
              );
              position.z = Math.floor(
                Math.random() * (heightmapConfig.depth - 2) + 1
              );
            } while (
              astarMap.map.grid.grid[position.z][position.x].value === 1
            );

            return position;
          };

          const getRandomNearlyWalkablePosition = (center, radius) => {
            const position = new THREE.Vector3();
            let maxCount = 10;
            do {
              position.x = Math.min(
                Math.max(
                  Math.floor(center.x + Math.random() * radius * 2 - radius),
                  1
                ),
                heightmapConfig.width - 2
              );
              position.z = Math.min(
                Math.max(
                  Math.floor(center.z + Math.random() * radius * 2 - radius),
                  1
                ),
                heightmapConfig.depth - 2
              );
            } while (
              maxCount-- > 0 &&
              astarMap.map.grid.grid[position.z][position.x].value === 1
            );

            return position;
          };

          const runAi = (unit) => {
            // TODO: Currently it eats memory, let's investigate it
            /* gsap.delayedCall(Math.random() * 60, () => {
              moveTo(
                unit,
                getRandomNearlyWalkablePosition(unit.container.position, 12),
                () => runAi(unit)
              );
            }); */
          };

          const _unitsModule = getModule(WorldModuleId.UNITS);
          [
            { config: unitConfig[UnitId.WOLFRIDER], count: 20 },
            { config: unitConfig[UnitId.UNDEAD], count: 20 },
          ].forEach(({ config, count }) => {
            for (let i = 0; i < count; i++) {
              const unit = _unitsModule.createUnit({
                config,
                position: getRandomWalkablePosition(),
              });
              const walkEffect = createParticleSystem(
                effectsConfig[EffectId.RUNNING]
              );
              unit.container.add(walkEffect.instance);

              _heightmapModule.addObject(unit.container);
              enemyMarkers.push(createMapMarker("#ff0000"));
              enemies.push(unit);

              distanceKeeperModule.addObject({
                object: unit.container,
                radius: 0.5,
                type: Player.PLAYER_2,
                pushPermissions: [Player.PLAYER_2],
              });
              runAi(unit);
            }
          });

          let selectedUnit;
          for (let i = 0; i < 20; i++) {
            const unit = _unitsModule.createUnit({
              config: unitConfig[UnitId.KNIGHT],
              position: getRandomWalkablePosition(),
            });
            const walkEffect = createParticleSystem(
              effectsConfig[EffectId.RUNNING]
            );
            unit.container.add(walkEffect.instance);

            if (staticParams.playersUnit) {
              alliesMarkers.push(createMapMarker("#ffff00"));
              allies.push(unit);
            } else staticParams.playersUnit = selectedUnit = unit;

            distanceKeeperModule.addObject({
              object: unit.container,
              radius: 0.5,
              type: Player.PLAYER_1,
              pushPermissions: [Player.PLAYER_1],
            });
            _heightmapModule.addObject(unit.container);
          }

          directionalLight.target = selectedUnit.container;
          thirdPersonCamera.setTarget(selectedUnit.container);
          thirdPersonCamera.jumpToTarget(selectedUnit.container);
          world
            .getModule(WorldModuleId.COLLECTIBLES)
            .addCollector(selectedUnit);

          for (let i = 0; i < 20; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 8, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.copy(getRandomWalkablePosition());
            sphere.position.y =
              _heightmapModule.getHeightFromPosition(sphere.position.clone()) +
              1;
            const marker = createMapMarker("#0000ff");
            applyStyles(marker, {
              left: `${sphere.position.x}px`,
              top: `${sphere.position.z}px`,
            });
            scene.add(sphere);
            initCollectible({ ...collectiblesData.coin, on: {} }, sphere, () =>
              minimapContainer.removeChild(marker)
            );
            availableCollectableCount.update((prev) => prev + 1);
          }

          updateCamera(world);

          on.update(() => {
            if (selectedUnit) {
              applyStyles(playerMarker, {
                left: `${selectedUnit.container.position.x}px`,
                top: `${selectedUnit.container.position.z}px`,
              });
              directionalLight.position.set(
                selectedUnit.container.position.x + 10,
                selectedUnit.container.position.y + 20,
                selectedUnit.container.position.z
              );
            }
            enemies.forEach((enemy, index) => {
              applyStyles(enemyMarkers[index], {
                left: `${enemy.container.position.x}px`,
                top: `${enemy.container.position.z}px`,
              });
            });
            allies.forEach((ally, index) => {
              applyStyles(alliesMarkers[index], {
                left: `${ally.container.position.x}px`,
                top: `${ally.container.position.z}px`,
              });
            });
          });
        });
    });
  },
});

export default LevelUpWorldConfig;
