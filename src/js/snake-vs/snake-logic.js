import * as THREE from "three";

import { EffectId, effectsConfig } from "../effects-config";
import { FBXModelId, GLTFModelId, TextureId } from "./assets-config.js";
import {
  getFBXModel,
  getGLTFModel,
  getTexture,
} from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";

import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
import { leaderBoard } from "../../store/app";
import { staticParams } from "../static";

export const Direction = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
};

export const DirectionVector = {
  LEFT: new THREE.Vector3(-1, 0, 0),
  RIGHT: new THREE.Vector3(1, 0, 0),
  UP: new THREE.Vector3(0, 0, -1),
  DOWN: new THREE.Vector3(0, 0, 1),
};

const DirectionMap = {
  [Direction.LEFT]: DirectionVector.LEFT,
  [Direction.RIGHT]: DirectionVector.RIGHT,
  [Direction.UP]: DirectionVector.UP,
  [Direction.DOWN]: DirectionVector.DOWN,
};

const DirectionOpposites = {
  [Direction.LEFT]: DirectionVector.RIGHT,
  [Direction.RIGHT]: DirectionVector.LEFT,
  [Direction.UP]: DirectionVector.DOWN,
  [Direction.DOWN]: DirectionVector.UP,
};

const snakeType = {
  BLUE: "BLUE",
  GREEN: "GREEN",
};

const snakeModels = {
  [snakeType.GREEN]: {
    head: FBXModelId.GREEN_SNAKE_HEAD,
    body: FBXModelId.GREEN_SNAKE_BODY,
    tail: FBXModelId.GREEN_SNAKE_TAIL,
  },
  [snakeType.BLUE]: {
    head: FBXModelId.BLUE_RACER_HEAD,
    body: FBXModelId.BLUE_RACER_BODY,
    tail: FBXModelId.BLUE_RACER_TAIL,
  },
};

const worldSize = new THREE.Vector3(80, 0, 52);
const movementHelper = new THREE.Vector3();

const snakeConfigs = [
  {
    name: "You",
    parts: Array.from({ length: 4 }).map(
      (_, index) => new THREE.Vector3(5 - index, 0, worldSize.z / 2)
    ),
    direction: DirectionVector.RIGHT,
    type: Math.random() > 0.5 ? snakeType.GREEN : snakeType.BLUE,
    hasAi: false,
  },
  {
    name: "Comp-1",
    parts: Array.from({ length: 4 }).map(
      (_, index) =>
        new THREE.Vector3(worldSize.x - 5 + index, 0, worldSize.z / 2)
    ),
    direction: DirectionVector.LEFT,
    type: Math.random() > 0.5 ? snakeType.GREEN : snakeType.BLUE,
    hasAi: true,
  },
  {
    name: "Comp-2",
    parts: Array.from({ length: 4 }).map(
      (_, index) => new THREE.Vector3(worldSize.x / 2, 0, 5 - index)
    ),
    direction: DirectionVector.UP,
    type: Math.random() > 0.5 ? snakeType.GREEN : snakeType.BLUE,
    hasAi: true,
  },
  {
    name: "Comp-3",
    parts: Array.from({ length: 4 }).map(
      (_, index) =>
        new THREE.Vector3(worldSize.x / 2, 0, worldSize.z - 5 + index)
    ),
    direction: DirectionVector.DOWN,
    type: Math.random() > 0.5 ? snakeType.GREEN : snakeType.BLUE,
    hasAi: true,
  },
];

let localLeaderBoard = snakeConfigs.map(({ name }, index) => ({
  name,
  value: 0,
  isActive: true,
  selected: index === 0,
}));
leaderBoard.set(localLeaderBoard);

export const createSnakeLogic = ({ scene, thirdPersonCamera }) => {
  const snakeScale = 0.012;
  let player;
  let snakes = [];
  let items = [];
  let obstacles = [];
  let gameSpeed = 300;
  let lastMovement = 0;
  let isGameOver = false;

  const geometry = new THREE.PlaneGeometry(worldSize.x, worldSize.z);
  const material = new THREE.MeshPhongMaterial({
    map: getTexture(TextureId.GREEN_GROUND),
  });
  material.map.repeat.set(worldSize.x / 5, worldSize.z / 5);
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.position.x = worldSize.x / 2 - 0.6;
  plane.position.z = worldSize.z / 2 - 0.5;
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const dustEffect = createParticleSystem(
    effectsConfig[EffectId.DUST],
    staticParams.cycleData.now
  ).instance;
  dustEffect.position.x = worldSize.x / 2 - 0.6;
  dustEffect.position.z = worldSize.z / 2 - 0.5;
  scene.add(dustEffect);

  const createSnakeBody = (modelId) => {
    const body = getFBXModel(modelId);
    body.scale.set(snakeScale, snakeScale, snakeScale);
    body.castShadow = true;

    return body;
  };

  const createSnake = (scene, { parts, type, hasAi, direction, name }) => {
    let meshes = [];

    const head = getFBXModel(snakeModels[type].head);
    head.scale.set(snakeScale, snakeScale, snakeScale);
    head.castShadow = true;

    const tail = getFBXModel(snakeModels[type].tail);
    tail.scale.set(snakeScale, snakeScale, snakeScale);
    tail.castShadow = true;

    parts.forEach((part, index) => {
      const mesh =
        index === 0
          ? head
          : index === parts.length - 1
          ? tail
          : createSnakeBody(snakeModels[type].body);
      mesh.position.copy(part);
      meshes.push(mesh);
      scene.add(mesh);
    });

    const positions = meshes.map((mesh) => mesh.position.clone());

    const grow = () => {
      const mesh = createSnakeBody(snakeModels[type].body);
      mesh.position.copy(meshes[meshes.length - 1].position);
      mesh.visible = false;
      scene.add(mesh);

      meshes.pop();
      meshes.push(mesh);
      meshes.push(tail);

      positions.push(new THREE.Vector3());
    };

    return {
      name,
      meshes,
      positions,
      nextDirection: direction,
      direction,
      grow,
      hasAi,
    };
  };

  snakeConfigs.forEach((config) => {
    const snake = createSnake(scene, config);
    snakes.push(snake);
  });

  const isBlockerPoint = (point) => {
    if (
      point.x < 1 ||
      point.x > worldSize.x - 2 ||
      point.z < 1 ||
      point.z > worldSize.z - 2
    ) {
      return true;
    }

    const hasCollision =
      snakes.some((snake) =>
        snake.positions.some(
          (position) =>
            point !== position &&
            Math.abs(position.x - point.x) < 0.4 &&
            Math.abs(position.z - point.z) < 0.4
        )
      ) ||
      obstacles.some(
        ({ position }) =>
          point !== position &&
          Math.abs(position.x - point.x) < 0.4 &&
          Math.abs(position.z - point.z) < 0.4
      );

    return hasCollision;
  };

  const runSnakeAi = (snake) => {
    const headPosition = snake.positions[0];

    let closestDistance = items[0].position.distanceTo(headPosition);
    const closestItem = items.reduce((prev, current) => {
      const distance = current.position.distanceTo(headPosition);
      if (distance < closestDistance) {
        closestDistance = distance;
        return current;
      }
      return prev;
    }, items[0]);

    const leftBlock = headPosition.clone().add(DirectionVector.LEFT);
    const rightBlock = headPosition.clone().add(DirectionVector.RIGHT);
    const upBlock = headPosition.clone().add(DirectionVector.UP);
    const downBlock = headPosition.clone().add(DirectionVector.DOWN);

    if (closestItem) {
      if (
        headPosition.x < closestItem.position.x &&
        !isBlockerPoint(rightBlock)
      ) {
        snake.nextDirection = DirectionVector.RIGHT;
      } else if (
        headPosition.x > closestItem.position.x &&
        !isBlockerPoint(leftBlock)
      ) {
        snake.nextDirection = DirectionVector.LEFT;
      } else if (
        headPosition.z > closestItem.position.z &&
        !isBlockerPoint(upBlock)
      ) {
        snake.nextDirection = DirectionVector.UP;
      } else if (
        headPosition.z < closestItem.position.z &&
        !isBlockerPoint(downBlock)
      ) {
        snake.nextDirection = DirectionVector.DOWN;
      } else if (!isBlockerPoint(rightBlock)) {
        snake.nextDirection = DirectionVector.RIGHT;
      } else if (!isBlockerPoint(leftBlock)) {
        snake.nextDirection = DirectionVector.LEFT;
      } else if (!isBlockerPoint(upBlock)) {
        snake.nextDirection = DirectionVector.UP;
      } else if (!isBlockerPoint(downBlock)) {
        snake.nextDirection = DirectionVector.DOWN;
      }
    }
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

  const obstacleTypes = [
    GLTFModelId.TREE_1X1,
    GLTFModelId.GROUND_1X1,
    GLTFModelId.BUSH_1X1,
  ];
  for (let x = 0; x < worldSize.x; x++) {
    const type = Math.floor(Math.random() * obstacleTypes.length);
    const obstacle = getGLTFModel(obstacleTypes[type]).scene.clone();
    obstacle.castShadow = true;

    obstacle.position.copy(getRandomAvailablePoint());
    scene.add(obstacle);
    obstacles.push(obstacle);
  }

  for (let x = 0; x < worldSize.x; x++) {
    for (let z = 0; z < worldSize.z; z++) {
      if (x !== 0 && z !== 0 && x !== worldSize.x - 1 && z !== worldSize.z - 1)
        continue;

      const obstacle = getGLTFModel(GLTFModelId.GROUND_1X1).scene.clone();
      obstacle.castShadow = true;

      obstacle.position.set(x, 0, z);
      scene.add(obstacle);
      obstacles.push(obstacle);
    }
  }

  const itemTypes = [
    GLTFModelId.APPLE,
    GLTFModelId.ORANGE,
    GLTFModelId.PEAR,
    GLTFModelId.FROG,
  ];
  items = Array.from({ length: 20 }, () => {
    const type = Math.floor(Math.random() * itemTypes.length);
    const item = getGLTFModel(itemTypes[type]).scene.clone();
    item.castShadow = true;

    item.position.copy(getRandomAvailablePoint());
    scene.add(item);

    const collectibleCircleEffect = createParticleSystem(
      effectsConfig[EffectId.COLLECTIBLE_CIRCLE],
      staticParams.cycleData.now
    ).instance;
    collectibleCircleEffect.position.y = 0.05;
    item.add(collectibleCircleEffect);

    return item;
  });

  const moveTo = (mesh, direction, duration) => {
    gsap.to(mesh.position, {
      x: mesh.position.x + direction.x,
      y: mesh.position.y + direction.y,
      z: mesh.position.z + direction.z,
      duration,
      ease: "linear",
    });

    let expectedRotation = Math.atan2(direction.x, direction.z);
    if (Math.abs(expectedRotation - mesh.rotation.y) > 0.1) {
      if (mesh.rotation.y > 0 && expectedRotation < 0) {
        mesh.rotation.y -= Math.PI * 2;
      } else if (mesh.rotation.y < 0 && expectedRotation > 0) {
        mesh.rotation.y += Math.PI * 2;
      }
      gsap.killTweensOf(mesh.rotation);
      gsap.to(mesh.rotation, {
        y: expectedRotation,
        duration,
        ease: "linear",
      });
    }
  };

  const preRotateTo = (mesh, direction, duration) => {
    let expectedRotation = Math.atan2(direction.x, direction.z);
    if (Math.abs(expectedRotation - mesh.rotation.y) > 0.1) {
      if (mesh.rotation.y > 0 && expectedRotation < 0) {
        mesh.rotation.y -= Math.PI * 2;
      } else if (mesh.rotation.y < 0 && expectedRotation > 0) {
        mesh.rotation.y += Math.PI * 2;
      }
      gsap.to(mesh.rotation, {
        y: expectedRotation,
        duration: duration / 2,
        ease: "linear",
      });
    }
  };

  const update = ({ now }) => {
    if (isGameOver) return;
    if (lastMovement === 0) lastMovement = now;

    if (now - lastMovement >= gameSpeed) {
      const deads = [];
      const stepDuration = gameSpeed / 1000;

      lastMovement += now - lastMovement;

      snakes.forEach((snake) => {
        if (isBlockerPoint(snake.positions[0])) {
          deads.push(snake);
          localLeaderBoard = localLeaderBoard.map((entry) =>
            entry.name === snake.name ? { ...entry, isActive: false } : entry
          );
          leaderBoard.set(localLeaderBoard);
        }
      });

      snakes = snakes.filter((snake) => !deads.includes(snake));
      deads.forEach((snake) =>
        snake.meshes.forEach((mesh, index) => {
          gsap.delayedCall(index * 0.1, () => {
            const snakeExplosionEffect = createParticleSystem(
              effectsConfig[EffectId.SNAKE_EXPLOSION],
              staticParams.cycleData.now
            );
            snakeExplosionEffect.instance.position.copy(mesh.position);
            snakeExplosionEffect.instance.position.y = 1;
            scene.add(snakeExplosionEffect.instance);
            gsap.delayedCall(3, snakeExplosionEffect.dispose);
            scene.remove(mesh);
          });
        })
      );
      if (
        snakes.length > 0 &&
        deads.length > 0 &&
        deads.some(({ meshes }) => meshes[0] === thirdPersonCamera.getTarget())
      ) {
        thirdPersonCamera.setTarget(null);
        gsap.delayedCall(player.positions.length * 0.1 + 1, () =>
          thirdPersonCamera.setTarget(snakes[0].meshes[0])
        );
      }
      if (snakes.length < 2) {
        isGameOver = true;
      }

      snakes.forEach((snake) => {
        if (snake.hasAi) runSnakeAi(snake);
        const { meshes, nextDirection } = snake;
        for (let i = meshes.length - 1; i > 0; i--) {
          snake.positions[i].copy(meshes[i - 1].position);
          snake.positions[i].round();
          movementHelper.copy(meshes[i - 1].position).sub(meshes[i].position);
          moveTo(meshes[i], movementHelper, stepDuration);
          if (i > 1) {
            movementHelper.copy(meshes[i - 2].position).sub(meshes[i].position);
            preRotateTo(meshes[i], movementHelper, stepDuration);
          }
          if (
            i > 1 &&
            !meshes[i].position.equals(meshes[meshes.length - 1].position)
          ) {
            meshes[i].visible = true;
          }
        }

        snake.direction = nextDirection;
        moveTo(meshes[0], nextDirection, stepDuration);
        snake.positions[0].add(nextDirection);
        snake.positions[0].round();

        const headPosition = snake.positions[0];
        items.forEach((item) => {
          if (item.position.distanceTo(headPosition) < 0.4) {
            const collectibleCollectEffect = createParticleSystem(
              effectsConfig[EffectId.COLLECTIBLE_COLLECT],
              staticParams.cycleData.now
            );
            collectibleCollectEffect.instance.position.copy(item.position);
            collectibleCollectEffect.instance.position.y = 1;
            scene.add(collectibleCollectEffect.instance);
            gsap.delayedCall(3, collectibleCollectEffect.dispose);

            item.position.copy(getRandomAvailablePoint());
            snake.grow();
            gameSpeed = Math.max(120, gameSpeed - 2);

            localLeaderBoard = localLeaderBoard.map((entry) =>
              entry.name === snake.name
                ? { ...entry, value: entry.value + 1 }
                : entry
            );
            leaderBoard.set(localLeaderBoard);
          }
        });
      });
    }
  };

  const setDirection = (direction) => {
    if (DirectionOpposites[direction] !== player.direction)
      player.nextDirection = DirectionMap[direction];
  };

  player = snakes[0];
  thirdPersonCamera.setTarget(player.meshes[0]);

  return {
    update,
    player,
    setDirection,
  };
};
