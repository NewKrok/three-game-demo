import { AudioId, assetsConfig } from "./assets-config";

import TPSWorldConfig from "./tps-world-config";
import { createTPSWorld } from "@newkrok/three-tps/src/js/newkrok/three-tps/tps-world.js";
import { effectsConfig } from "./effects-config";
import { getTexture } from "@newkrok/three-utils/src/js/newkrok/three-utils/assets/assets.js";
import { setUnitControllerTarget } from "@newkrok/three-tps/src/js/newkrok/three-tps/control/unit-controller.js";
import { unitConfig } from "./unit-config";
import { updateParticleSystems } from "@newkrok/three-particles/src/js/effects/three-particles";

export const initThreeTPSDemo = (targetQuery) => {
  const target = document.querySelector(targetQuery);
  const crosshair = target.querySelector(".crosshair");

  createTPSWorld({
    target,
    assetsConfig,
    unitConfig,
    worldConfig: TPSWorldConfig,
  })
    .then((world) => {
      const { getUnit, onUpdate } = world;
      crosshair.style.visibility = "hidden";
      document.onclick = () => {
        document.onclick = null;
        playAudio({
          audioId: AudioId.GAME_BACKGROUND,
          cacheId: AudioId.GAME_BACKGROUND,
        });
      };

      const playerUnit = getUnit(({ id }) => id === "player-0");
      setUnitControllerTarget({
        target: playerUnit,
        world,
      });

      Object.keys(effectsConfig).forEach((key) => {
        effectsConfig[key].map = getTexture(effectsConfig[key].map);
      });

      onUpdate((cycleData) => {
        updateParticleSystems(cycleData);
        crosshair.style.visibility = playerUnit.userData.useAim
          ? "visible"
          : "hidden";
      });
    })
    .catch((e) => console.log(`Ops! ${e}`));
};
