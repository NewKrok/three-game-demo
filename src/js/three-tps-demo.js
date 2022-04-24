import { AudioId, assetsConfig } from "./assets-config";

import TPSWorldConfig from "./tps-world-config";
import { createTPSWorld } from "@newkrok/three-tps/src/js/newkrok/three-tps/tps-world.js";
import { effectsConfig } from "./effects-config";
import { getTexture } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { unitConfig } from "./unit-config";
import { updateParticleSystems } from "@newkrok/three-particles/src/js/effects/three-particles";

window.tpsDemo = {
  on: {},
  game: { world: {}, ability: {} },
};

const initCallbacks = [];
window.tpsDemo.on.init = (callback) => initCallbacks.push(callback);

export const initThreeTPSDemo = (targetQuery) => {
  const target = document.querySelector(targetQuery);
  const crosshair = target.querySelector(".crosshair");
  crosshair.style.visibility = "hidden";

  createTPSWorld({
    target,
    assetsConfig,
    unitConfig,
    worldConfig: TPSWorldConfig,
  })
    .then((world) => {
      const { onUpdate } = world;

      document.onclick = () => {
        document.onclick = null;
        playAudio({
          audioId: AudioId.GAME_BACKGROUND,
          cacheId: AudioId.GAME_BACKGROUND,
        });
      };

      Object.keys(effectsConfig).forEach((key) => {
        effectsConfig[key].map = getTexture(effectsConfig[key].map);
      });

      window.tpsDemo.game.world = world;
      initCallbacks.forEach((callback) => callback());
      target.onclick = () => {
        target.requestPointerLock();
        target.onclick = null;
      };
      /* 
      const secondaryCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      world.scene.add(secondaryCamera);
      secondaryCamera.position.x = 0;
      secondaryCamera.position.y = 0;
      secondaryCamera.lookAt(new THREE.Vector3(15, 0, 15));

      const tertiaryCamera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      world.scene.add(tertiaryCamera);
      tertiaryCamera.position.x = 0;
      tertiaryCamera.position.y = 0;
      tertiaryCamera.lookAt(new THREE.Vector3(15, 0, 15));

      const player = world.getUnit("player-0").model; */

      onUpdate((cycleData) => {
        updateParticleSystems(cycleData);
        /*secondaryCamera.position.x = player.position.x;
        secondaryCamera.position.y = player.position.y + 10;
        secondaryCamera.position.z = player.position.z;
        secondaryCamera.lookAt(player.position);

        tertiaryCamera.position.x = player.position.x;
        tertiaryCamera.position.y = player.position.y + 1;
        tertiaryCamera.position.z = player.position.z + 10;
        tertiaryCamera.lookAt(player.position);

         world.renderer.setViewport(
          50,
          50,
          window.innerWidth / 3,
          window.innerHeight / 3
        );
        world.renderer.setScissor(
          50,
          50,
          window.innerWidth / 3,
          window.innerHeight / 3
        );
        world.renderer.setScissorTest(true);
        world.renderer.render(world.scene, secondaryCamera);

        world.renderer.setViewport(
          50,
          500,
          window.innerWidth / 3,
          window.innerHeight / 3
        );
        world.renderer.setScissor(
          50,
          500,
          window.innerWidth / 3,
          window.innerHeight / 3
        );
        world.renderer.setScissorTest(true);
        world.renderer.render(world.scene, tertiaryCamera);

        world.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
        world.renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
        world.renderer.setScissorTest(true); */
      });
    })
    .catch((e) => console.log(`Ops! ${e.stack}`));
};
