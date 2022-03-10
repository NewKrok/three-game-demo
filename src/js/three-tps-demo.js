import { AudioId, assetsConfig } from "./assets-config";

import TPSWorldConfig from "./tps-world-config";
import { characterConfig } from "./unit-config";
import { createTPSWorld } from "@newkrok/three-tps/src/js/newkrok/three-tps/tps-world.js";
import { effectsConfig } from "./effects-config";
import { getTexture } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { setUnitControllerTarget } from "@newkrok/three-tps/src/js/newkrok/three-tps/control/unit-controller.js";
import { updateParticleSystems } from "@newkrok/three-particles/src/js/effects/three-particles";

export const initThreeTPSDemo = (targetQuery) => {
  const target = document.querySelector(targetQuery);
  const crosshair = target.querySelector(".crosshair");

  createTPSWorld({
    target,
    assetsConfig,
    characterConfig,
    worldConfig: TPSWorldConfig,
  })
    .then((world) => {
      const { getCharacter, onUpdate, scene } = world;
      crosshair.style.visibility = "hidden";
      document.onclick = () => {
        document.onclick = null;
        playAudio({
          audioId: AudioId.GAME_BACKGROUND,
          cacheId: AudioId.GAME_BACKGROUND,
        });
      };

      const playerCharacter = getCharacter(({ id }) => id === "player-0");
      setUnitControllerTarget({
        target: playerCharacter,
        world,
      });

      Object.keys(effectsConfig).forEach((key) => {
        effectsConfig[key].map = getTexture(effectsConfig[key].map);
      });

      onUpdate((cycleData) => {
        updateParticleSystems(cycleData);
        crosshair.style.visibility = playerCharacter.useAim
          ? "visible"
          : "hidden";
      });
    })
    .catch((e) => console.log(`Ops! ${e}`));
};
