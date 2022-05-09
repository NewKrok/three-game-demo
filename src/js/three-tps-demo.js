import { AudioId, assetsConfig } from "./assets-config";

import ArenaWorldConfig from "./arena/arena-world-config";
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
    worldConfig: ArenaWorldConfig,
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

      onUpdate((cycleData) => {
        updateParticleSystems(cycleData);
      });
    })
    .catch((e) => console.log(`Ops! ${e.stack}`));
};
