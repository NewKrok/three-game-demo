// import { AudioId } from "./arena/assets-config";

//import Stats from "three/examples/jsm/libs/stats.module.js";

import { AssetsUtils } from "@newkrok/three-utils/assets";
import { createWorld } from "@newkrok/three-game/src/js/newkrok/three-game/world.js";
import { effectsConfig } from "./effects-config";
import { staticParams } from "./static";
import { updateParticleSystems } from "@newkrok/three-particles/src/js/effects/three-particles";

window.tpsDemo = {
  on: {},
  game: {
    world: {},
    ability: {},
  },
};

// TODO: make it switchable
//const stats = Stats();
//document.body.appendChild(stats.dom);

const initCallbacks = [];
window.tpsDemo.on.init = (callback) => initCallbacks.push(callback);

export const initThreeTPSDemo = (targetQuery, worldConfig) => {
  const target = document.querySelector(targetQuery);
  const crosshair = target.querySelector(".crosshair");
  crosshair.style.visibility = "hidden";

  createWorld({
    target,
    worldConfig,
  })
    .then((world) => {
      /* document.onclick = () => {
        document.onclick = null;
        playAudio({
          audioId: AudioId.GAME_BACKGROUND,
          cacheId: AudioId.GAME_BACKGROUND,
        });
      }; */

      Object.keys(effectsConfig).forEach((key) => {
        effectsConfig[key].map = AssetsUtils.getTexture(effectsConfig[key].map);
      });

      window.tpsDemo.game.world = world;
      initCallbacks.forEach((callback) => callback());

      if (staticParams.isPointerLockNeeded) {
        target.onclick = () => {
          target.requestPointerLock();
          target.onclick = null;
        };
      }

      world.on.update((cycleData) => {
        if (!cycleData.isPaused) updateParticleSystems(cycleData);
        staticParams.cycleData = { ...cycleData };

        //stats.update();
      });
    })
    .catch((e) => console.log(`Ops! ${e.stack}`));
};
