import * as THREE from "three";

import { AbilityId, abilityConfig } from "./ability-config";
import { EffectId, effectsConfig } from "../effects-config";
import { GLTFModelId, TextureId } from "./assets-config.js";
import {
  UnitModuleId,
  WorldModuleId,
} from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { collectiblesData, initCollectible } from "./collectibles.js";
import {
  lifeCount,
  remainingOpponentUnitCount,
  remainingPlayerUnitCount,
} from "../../store/app.js";

import { AssetsUtils } from "@newkrok/three-utils/assets";
import { Player } from "@newkrok/three-game/src/js/newkrok/three-game/players/players-enums.js";
import { abilitiesModule } from "@newkrok/three-game/src/js/newkrok/three-game/world/modules/units/unit/modules/abilities/abilities-module.js";
import { createModuleHandler } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-handler.js";
import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
import { staticParams } from "../static.js";

export const Direction = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
};

export const DirectionVector = {
  [Direction.LEFT]: new THREE.Vector3(-1, 0, 0),
  [Direction.RIGHT]: new THREE.Vector3(1, 0, 0),
  [Direction.UP]: new THREE.Vector3(0, 0, -1),
  [Direction.DOWN]: new THREE.Vector3(0, 0, 1),
};

const DirectionMap = {
  [Direction.LEFT]: DirectionVector.LEFT,
  [Direction.RIGHT]: DirectionVector.RIGHT,
  [Direction.UP]: DirectionVector.UP,
  [Direction.DOWN]: DirectionVector.DOWN,
};

const Axis = {
  X: "X",
  Y: "Y",
  Z: "Z",
};

const AxisVector = {
  [Axis.X]: new THREE.Vector3(1, 0, 0),
  [Axis.Y]: new THREE.Vector3(0, 1, 0),
  [Axis.Z]: new THREE.Vector3(0, 0, 1),
};

const worldSize = new THREE.Vector3();

export const createTankBattleLogic = ({ world, scene, thirdPersonCamera }) => {
  let player;
  let tanks = [];
  let items = [];
  let obstacles = [];

  const map = [
    [0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 2, 1, 0, 1, 1, 2, 1, 1, 0, 1, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 2, 0, 2, 0, 0, 0, 5, 0, 5, 0, 0, 0, 2, 0, 2, 2, 1],
    [0, 0, 1, 1, 2, 0, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1, 1, 0, 0],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2],
    [0, 1, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [2, 2, 0, 1, 1, 5, 0, 1, 1, 1, 1, 1, 0, 5, 1, 1, 0, 2, 2],
    [1, 0, 0, 0, 2, 1, 2, 2, 0, 1, 0, 2, 2, 1, 2, 0, 0, 0, 1],
    [1, 1, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 1, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 1, 2, 2, 0],
    [0, 1, 5, 1, 0, 1, 0, 0, 1, 2, 1, 0, 0, 1, 0, 1, 5, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 2, 2],
    [0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0, 1, 5, 1, 0, 0, 0, 1, 5, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 2, 0, 2, 0, 1, 0, 2, 1, 2, 0, 1, 0, 2, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 2, 0, 5, 0, 2, 0, 0, 0, 0, 0, 2, 0],
    [2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2],
    [0, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0],
    [2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 2, 1, 0, 2, 1, 0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1],
    [0, 5, 2, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 1, 0, 0, 2, 5, 0],
    [0, 2, 0, 0, 1, 4, 0, 1, 0, 1, 0, 1, 0, 4, 1, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 2, 1, 2, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 2, 1, 2, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 1, 2, 2, 2, 2, 2, 1, 0, 2, 0, 2, 0, 2],
    [0, 1, 0, 0, 1, 0, 0, 0, 4, 2, 4, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1],
  ];
  worldSize.set(map[0].length, 0, map.length);

  const damageObstacle = (obstacle, { abilities }) => {
    obstacle.life -= abilities.doubleDamage ? 2 : 1;
    obstacle.life = Math.max(obstacle.life, 0);

    if (obstacle.life === 0) {
      obstacles = obstacles.filter((item) => item !== obstacle);

      obstacle.models.forEach((model) => {
        gsap.to(model.position, {
          y: -1,
          duration: 0.7,
          delay: Math.random() * 0.3,
          ease: "back.in(1.7)",
        });
      });

      if (obstacle.damageEffect) obstacle.damageEffect.dispose();

      const smokeEffect = createParticleSystem(
        effectsConfig[EffectId.EXPLOSION_SMOKE]
      );
      scene.add(smokeEffect.instance);
      smokeEffect.instance.position.set(
        obstacle.position.x,
        0.2,
        obstacle.position.z
      );
      const fireEffect = createParticleSystem(
        effectsConfig[EffectId.EXPLOSION_FIRE],
        world.cycleData.now
      );
      fireEffect.instance.position.copy(smokeEffect.instance.position);
      world.scene.add(fireEffect.instance);

      gsap.delayedCall(3, () => {
        smokeEffect.dispose();
        fireEffect.dispose();
        obstacle.models.forEach((model) => model.removeFromParent());
      });
    } else {
      obstacle.models.forEach((model) => {
        model.rotateOnAxis(AxisVector.X, Math.random() * 0.2 - 0.1);
        model.rotateOnAxis(AxisVector.Y, Math.random() * 0.2 - 0.1);
        model.rotateOnAxis(AxisVector.Z, Math.random() * 0.2 - 0.1);
      });

      if (!obstacle.damageEffect && obstacle.life < obstacle.maxLife / 2) {
        obstacle.damageEffect = createParticleSystem(
          effectsConfig[EffectId.SMOKE]
        );
        scene.add(obstacle.damageEffect.instance);
        obstacle.damageEffect.instance.position.set(
          obstacle.position.x,
          0.2,
          obstacle.position.z
        );
      }
    }
  };

  const damageTank = (tank, { abilities }) => {
    tank.life.current -= abilities.doubleDamage ? 2 : 1;
    tank.life.current = Math.max(tank.life.current, 0);
    if (tank === player) lifeCount.set(tank.life.current);

    if (tank.life.current === 0) {
      if (tank === player) {
        Object.values(Direction).forEach((direction) => {
          player.control[direction] = false;
        });
      }
      if (tank.owner === Player.PLAYER_1)
        remainingPlayerUnitCount.update((prev) => prev - 1);
      else remainingOpponentUnitCount.update((prev) => prev - 1);

      const module = tank.moduleHandler.getModule(UnitModuleId.ABILITIES);
      module.deactivate(AbilityId.SHOOT);

      tanks = tanks.filter((item) => item !== tank);
      if (tank === player && tanks.length)
        thirdPersonCamera.setTarget(tanks[0].mesh);

      gsap.killTweensOf(tank.mesh.position);
      gsap.to(tank.mesh.position, {
        y: -1,
        duration: 0.7,
        delay: Math.random() * 0.3,
        ease: "back.in(1.7)",
      });

      const smokeEffect = createParticleSystem(
        effectsConfig[EffectId.EXPLOSION_SMOKE]
      );
      scene.add(smokeEffect.instance);
      smokeEffect.instance.position.set(
        tank.mesh.position.x,
        0.2,
        tank.mesh.position.z
      );
      const fireEffect = createParticleSystem(
        effectsConfig[EffectId.EXPLOSION_FIRE],
        world.cycleData.now
      );
      fireEffect.instance.position.copy(smokeEffect.instance.position);
      world.scene.add(fireEffect.instance);

      gsap.delayedCall(3, () => {
        smokeEffect.dispose();
        fireEffect.dispose();
        tank.dispose();
      });
    } else if (!tank.effects.damage && tank.life.current < tank.life.max / 2) {
      tank.effects.damage = createParticleSystem(
        effectsConfig[EffectId.INTENSE_SMOKE]
      );
      tank.effects.damage.instance.rotation.x = Math.PI / 2;
      tank.effects.damage.instance.position.y = 0.5;
      tank.mesh.add(tank.effects.damage.instance);
    } else if (tank.effects.damage && tank.life.current < tank.life.max / 2)
      tank.effects.damage.resumeEmitter();
  };

  const { addCollisionDetector } = world.getModule(WorldModuleId.PROJECTILES);
  addCollisionDetector(({ collider, userData }) => {
    const x = Math.round(collider.center.x);
    const z = Math.round(collider.center.z);

    if (x < -1 || x > map[0].length || z < -1 || z > map.length) return true;

    const position = new THREE.Vector3(x, 0, z);

    const collidingObstacle = obstacles.find(
      ({ position }) => position.x === x && position.z === z
    );
    if (collidingObstacle) {
      damageObstacle(collidingObstacle, userData.caster);
      return true;
    }

    const collidingTank = tanks.find(
      (tank) =>
        userData.caster.owner !== tank.owner &&
        tank.mesh.position.clone().round().distanceTo(position) < 0.5
    );
    if (collidingTank) {
      damageTank(collidingTank, userData.caster);
      return true;
    }
  });

  const tankMaterialMap = {
    0: TextureId.CTF_TANK_BASE_COLOR_R,
    1: TextureId.CTF_TANK_BASE_COLOR_G,
    2: TextureId.CTF_TANK_BASE_COLOR_B,
    3: TextureId.CTF_TANK_BASE_COLOR_Y,
  };

  const playerColors = [
    tankMaterialMap[0],
    tankMaterialMap[2],
    tankMaterialMap[3],
  ];
  let playerColor = 0;

  const createTank = ({ startPosition, type, hasAi, name, owner }) => {
    const wrapper = new THREE.Object3D();
    const tankModel = AssetsUtils.getGLTFModel(
      GLTFModelId.CTF_TANK
    ).scene.clone();

    const effects = {
      damage: null,
      wheel: [],
    };
    const wheels = [];
    const shadow = { wheels: [] };
    let body, turret, barrel;

    const bulletSocket = new THREE.Object3D();
    tankModel.add(bulletSocket);
    bulletSocket.rotation.x = Math.PI;
    bulletSocket.position.set(0, 0.65, -0.6);

    tankModel.traverse((child) => {
      if (child.isMesh) {
        if (!child.name.includes("_1")) {
          const material = new THREE.MeshPhongMaterial({
            map: AssetsUtils.getTexture(
              owner === Player.PLAYER_2
                ? tankMaterialMap[type]
                : playerColors[playerColor]
            ),
          });
          child.material = material;
          child.material.map.flipY = false;
          if (
            ["Mesh003", "Mesh004", "Mesh005", "Mesh006"].includes(child.name)
          ) {
            wheels.push(child);
          }
          if (child.name.includes("Mesh002")) turret = child;
          else if (child.name.includes("Mesh001")) barrel = child;
          else if (child.name.includes("Mesh") && !body) body = child;
        } else {
          if (child.name.includes("Mesh002")) shadow.turret = child;
          else if (child.name.includes("Mesh001")) shadow.barrel = child;
          else if (child.name.includes("Mesh") && !shadow.body)
            shadow.body = child;
          if (
            ["Mesh003_1", "Mesh004_1", "Mesh005_1", "Mesh006_1"].includes(
              child.name
            )
          ) {
            shadow.wheels.push(child);
          }
        }
      }
    });

    [
      { x: -0.3, z: -0.3 },
      { x: -0.3, z: 0.3 },
      { x: 0.3, z: -0.3 },
      { x: 0.3, z: 0.3 },
    ].forEach((offset) => {
      const wheelEffect = createParticleSystem(
        effectsConfig[EffectId.WHEEL_SMOKE_SMALL]
      );
      tankModel.add(wheelEffect.instance);
      wheelEffect.instance.position.set(offset.x, 0.2, offset.z);
      effects.wheel.push(wheelEffect);
    });

    wrapper.position.copy(startPosition);
    wrapper.add(tankModel);
    scene.add(wrapper);

    /**
     * It's needed since getWorldPosition gives back sometimes a wrong value right after the init.
     * https://discourse.threejs.org/t/trouble-getting-world-position-of-object/7540?u=sciecode
     */
    wrapper.updateMatrixWorld(true);

    const modules = [{ ...abilitiesModule, config: abilityConfig }];
    const moduleHandler = createModuleHandler(modules);

    const life = {
      current: 3,
      max: 3,
    };
    const heal = () => {
      life.current = Math.min(life.current + 1, life.max);
      if (owner === Player.PLAYER_1 && !hasAi) lifeCount.set(life.current);
      if (tank.effects.damage && life.current >= life.max / 2)
        tank.effects.damage.pauseEmitter();
    };

    const abilities = {
      multiattack: false,
      doubleDamage: false,
      doubleSpeed: false,
    };
    let multiattackDelay;
    const activateMultiattack = () => {
      abilities.multiattack = true;
      if (multiattackDelay) multiattackDelay.kill();
      multiattackDelay = gsap.delayedCall(
        15,
        () => (abilities.multiattack = false)
      );
    };
    let doubleDamageDelay;
    const activateDoubleDamage = () => {
      abilities.doubleDamage = true;
      if (doubleDamageDelay) doubleDamageDelay.kill();
      doubleDamageDelay = gsap.delayedCall(
        10,
        () => (abilities.doubleDamage = false)
      );
    };
    let doubleSpeedDelay;
    const activateDoubleSpeed = () => {
      abilities.doubleSpeed = true;
      if (doubleSpeedDelay) doubleSpeedDelay.kill();
      doubleSpeedDelay = gsap.delayedCall(
        5,
        () => (abilities.doubleSpeed = false)
      );
    };

    const changeColor = () => {
      playerColor++;
      if (playerColor === playerColors.length) playerColor = 0;
      tankModel.traverse((child) => {
        if (child.isMesh) {
          if (!child.name.includes("_1")) {
            child.material.map = AssetsUtils.getTexture(
              playerColors[playerColor]
            );
            child.material.map.flipY = false;
          }
        }
      });
    };

    const onUpdate = (cycleData) => {
      moduleHandler.update(cycleData);
    };

    const dispose = () => {
      tankModel.removeFromParent();
      moduleHandler.dispose();

      tank.effects.damage?.dispose();
      tank.effects.wheel.forEach((effect) => effect.dispose());
    };

    const tank = {
      modules,
      moduleHandler,
      mesh: wrapper,
      wheels,
      body,
      bulletSocket,
      bulletMaterialId: tankMaterialMap[type],
      turret,
      barrel,
      shadow,
      effects,
      abilities,
      name,
      control: {
        [Direction.UP]: 0,
        [Direction.DOWN]: 0,
        [Direction.LEFT]: 0,
        [Direction.RIGHT]: 0,
      },
      direction: null,
      lastDirection: null,
      rotation: 0,
      hasAi,
      speed: 0.6,
      rotationSpeed: 0.5,
      lastAction: null,
      owner,
      life,
      heal,
      activateMultiattack,
      activateDoubleDamage,
      activateDoubleSpeed,
      changeColor,
      onUpdate,
      dispose,
    };
    tanks.push(tank);

    moduleHandler.init({ world, unit: tank });

    if (hasAi) {
      const abilityModule = moduleHandler.getModule(UnitModuleId.ABILITIES);
      abilityModule.activate(AbilityId.AI_SHOOT);
    }

    return tank;
  };

  const blockModelMap = {
    1: GLTFModelId.BRICK_BROWN,
    2: GLTFModelId.BRICK_BLACK,
  };

  const blockMaterial = new THREE.MeshPhongMaterial({
    map: AssetsUtils.getTexture(TextureId.CUBE_WORLD),
  });

  map.forEach((row, z) =>
    row.forEach((type, x) => {
      const ground = AssetsUtils.getGLTFModel(
        GLTFModelId.BLOCK_GROUND
      ).scene.clone();
      ground.position.set(x, 0, z);
      scene.add(ground);

      if (type) {
        if (type > 2) {
          const tank = createTank({
            name: type === 3 ? "Player" : "Comp",
            startPosition: new THREE.Vector3(x, 0, z),
            direction: null,
            type: type > 4 ? 1 : 0,
            owner: type > 4 ? Player.PLAYER_2 : Player.PLAYER_1,
            hasAi: type > 3,
          });
          staticParams.world
            .getModule(WorldModuleId.COLLECTIBLES)
            .addCollector(tank);
          if (type > 4) remainingOpponentUnitCount.update((prev) => prev + 1);
          else remainingPlayerUnitCount.update((prev) => prev + 1);
          if (type === 3) player = tank;
        } else {
          const models = [];
          const positionOffsets = [
            { x: -0.25, y: 0, z: -0.25 },
            { x: 0.25, y: 0, z: -0.25 },
            { x: 0.25, y: 0, z: 0.25 },
            { x: -0.25, y: 0, z: 0.25 },
            { x: -0.25, y: -0.25, z: -0.25 },
            { x: 0.25, y: -0.25, z: -0.25 },
            { x: 0.25, y: -0.25, z: 0.25 },
            { x: -0.25, y: -0.25, z: 0.25 },
          ];
          for (let i = 0; i < 8; i++) {
            const blockModel = AssetsUtils.getGLTFModel(
              blockModelMap[type]
            ).scene.clone();
            blockModel.traverse((child) => {
              child.material = blockMaterial;
            });
            blockModel.position.set(
              x + positionOffsets[i].x,
              0.55 + positionOffsets[i].y,
              z + positionOffsets[i].z
            );
            blockModel.scale.set(0.5, 0.5, 0.5);
            blockModel.rotation.set(
              (Math.floor(Math.random() * 4) * Math.PI) / 2,
              (Math.floor(Math.random() * 4) * Math.PI) / 2,
              (Math.floor(Math.random() * 4) * Math.PI) / 2
            );
            models.push(blockModel);
            scene.add(blockModel);
          }
          const life = type === 1 ? 5 : 20;
          obstacles.push({
            models,
            position: { x, z },
            type: type,
            life,
            maxLife: life,
          });
        }
      }
    })
  );

  lifeCount.set(player.life.max);

  const isBlockerPoint = (point) => {
    if (
      point.x < 0 ||
      point.x > worldSize.x - 1 ||
      point.z < 0 ||
      point.z > worldSize.z - 1
    ) {
      return true;
    }

    const hasCollision =
      tanks.some(
        ({ mesh: { position } }) =>
          point !== position &&
          Math.abs(position.x - point.x) < 1 &&
          Math.abs(position.z - point.z) < 1
      ) ||
      obstacles.some(
        ({ position }) =>
          point !== position &&
          Math.abs(position.x - point.x) < 0.4 &&
          Math.abs(position.z - point.z) < 0.4
      );

    return hasCollision;
  };

  const positionHelper = new THREE.Vector3();
  const createRandomPoint = () => {
    positionHelper.x = Math.floor(Math.random() * worldSize.x);
    positionHelper.z = Math.floor(Math.random() * worldSize.z);

    return positionHelper;
  };

  const getRandomAvailablePoint = () => {
    let maxCount = 100;
    while (isBlockerPoint(positionHelper) || maxCount-- > 0) {
      createRandomPoint();
    }
    return positionHelper;
  };
  staticParams.getRandomAvailablePoint = getRandomAvailablePoint;

  const itemConfigs = {
    speed: 10,
    damage: 8,
    health: 8,
    multiattack: 4,
  };
  Object.entries(itemConfigs).forEach(([key, value]) => {
    for (let i = 0; i < value; i++) {
      const container = new THREE.Object3D();
      container.position.copy(getRandomAvailablePoint());
      container.position.y = 0.2;
      scene.add(container);
      items.push(container);
      initCollectible(collectiblesData[key], container);
    }
  });

  const directionArr = Object.keys(Direction).map((key) => key);

  const calculateDirectionVector = (control) => {
    const selectedDirection = directionArr.find(
      (direction) => control[direction]
    );
    return DirectionMap[selectedDirection];
  };

  const clearControl = (control) =>
    directionArr.forEach((direction) => (control[direction] = false));

  const runTankAi = (tank) => {
    const lastDirection = tank.direction;
    const position = tank.mesh.position;

    if (
      !lastDirection ||
      isBlockerPoint(position.clone().add(lastDirection)) ||
      Math.random() > 0.8
    ) {
      clearControl(tank.control);

      const calculatedDirection = directionArr
        .reduce((prev, direction) => {
          const calculatedPosition = position
            .clone()
            .add(DirectionVector[direction]);
          if (!isBlockerPoint(calculatedPosition)) prev.push(direction);

          return prev;
        }, [])
        .sort(() => Math.random() - 0.5)?.[0];

      tank.control[calculatedDirection] = true;
    }
  };

  const rotateTo = (tank) => {
    const { mesh, rotation, rotationSpeed, wheels } = tank;

    if (rotation - mesh.rotation.y > Math.PI) mesh.rotation.y += Math.PI * 2;
    else if (mesh.rotation.y - rotation > Math.PI)
      mesh.rotation.y -= Math.PI * 2;
    const calculatedRotationSpeed =
      Math.abs((rotation - mesh.rotation.y) / Math.PI) *
      (tank.abilities.doubleSpeed ? rotationSpeed / 2 : rotationSpeed);

    gsap.killTweensOf(mesh.rotation);
    gsap.to(mesh.rotation, {
      y: rotation,
      duration: calculatedRotationSpeed,
      ease: "linear",
      onComplete: () => {
        tank.isMovementInProgress = false;
        tank.isRotating = false;
        tank.lastAction = "rotating";
      },
      onUpdate: () => {
        wheels.forEach((wheel) => {
          wheel.rotateOnAxis(AxisVector[Axis.X], calculatedRotationSpeed / 10);
        });
      },
    });
  };

  const moveTo = (tank) => {
    const { mesh, direction, speed, wheels, body, turret, shadow } = tank;
    gsap.to(mesh.position, {
      x: mesh.position.x + direction.x,
      y: mesh.position.y + direction.y,
      z: mesh.position.z + direction.z,
      duration: tank.abilities.doubleSpeed ? speed / 2 : speed,
      ease: "linear",
      onComplete: () => {
        tank.isMovementInProgress = false;
        tank.isMoving = false;
        tank.lastAction = "moving";
      },
      onUpdate: () => {
        wheels.forEach((wheel) => {
          wheel.rotateOnAxis(AxisVector[Axis.X], Math.PI / 30);
        });
        shadow.wheels.forEach((wheel) => {
          wheel.rotateOnAxis(AxisVector[Axis.X], Math.PI / 30);
        });
      },
    });
    if (tank.lastAction !== "moving" && !gsap.getTweensOf(body.rotation).length)
      gsap.to(body.rotation, {
        x: -Math.PI / 20,
        yoyo: true,
        repeat: 1,
        duration: 0.2,
        onUpdate: () =>
          (shadow.turret.rotation.x =
            shadow.body.rotation.x =
            turret.rotation.x =
              body.rotation.x),
      });
  };

  const update = (cycleData) => {
    tanks.forEach((tank) => {
      if (tank.isMovementInProgress) return;
      if (tank.hasAi) runTankAi(tank);

      tank.onUpdate(cycleData);
      const { mesh, control } = tank;
      tank.direction = calculateDirectionVector(control);
      if (tank.direction) {
        tank.lastDirection = tank.direction;
        tank.isMovementInProgress = true;
        tank.rotation =
          Math.atan2(tank.direction.x, tank.direction.z) + Math.PI;
        if (Math.abs(tank.rotation - mesh.rotation.y) > 0.1) {
          rotateTo(tank);
          tank.isRotating = true;
        } else if (
          !isBlockerPoint(tank.mesh.position.clone().add(tank.direction))
        ) {
          moveTo(tank);
          tank.isMoving = true;
        } else {
          tank.isMovementInProgress = false;
          tank.lastAction = null;
        }
      }

      const module = tank.moduleHandler.getModule(UnitModuleId.ABILITIES);
      if (tank.isRotating) module.disableAbility(AbilityId.SHOOT);
      else module.enableAbility(AbilityId.SHOOT);
    });
  };

  thirdPersonCamera.setTarget(player.mesh);
  thirdPersonCamera.jumpToTarget(player.mesh);

  const resetDirections = () => {
    if (player.life.current <= 0) return;
    clearControl(player.control);
  };

  const setDirection = (direction, value) => {
    if (player.life.current <= 0) return;
    player.control[direction] = value;
  };

  const shoot = (value) => {
    if (player.life.current <= 0) return;
    const module = player.moduleHandler.getModule(UnitModuleId.ABILITIES);
    if (value === 0) module.deactivate(AbilityId.SHOOT);
    else module.activate(AbilityId.SHOOT);
  };

  return {
    update,
    resetDirections,
    setDirection,
    shoot,
    player,
    changeColor: player.changeColor,
  };
};
