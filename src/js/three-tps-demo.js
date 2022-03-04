import { AudioId, assetsConfig } from "./assets-config";

import TPSWorldConfig from "./tps-world-config";
import { characterConfig } from "./unit-config";
import { createTPSWorld } from "./three-tps/tps-world";
import { effectsConfig } from "./effects-config";
import { getTexture } from "./three-utils/assets/assets";
import { playAudio } from "./three-utils/audio/audio";
import { setUnitControllerTarget } from "./three-tps/control/unit-controller";
import { updateParticleSystems } from "@newkrok/three-particles/src/js/effects/three-particles";

export const init = (targetQuery) => {
  const target = document.querySelector(targetQuery);
  const crosshair = target.querySelector(".crosshair");

  createTPSWorld({
    target,
    assetsConfig,
    characterConfig,
    worldConfig: TPSWorldConfig,
  })
    .then((world) => {
      const { camera, getCharacter, onUpdate } = world;
      crosshair.style.visibility = "hidden";
      document.onclick = () => {
        document.onclick = null;
        playAudio({
          audioId: AudioId.GAME_BACKGROUND,
          cacheId: AudioId.GAME_BACKGROUND,
        });
      };

      const playerCharacter = getCharacter(
        ({ id }) => id === "player-character"
      );
      camera.setTarget(playerCharacter.model);
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

init("#three-tps-demo");
