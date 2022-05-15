import { EffectId, effectsConfig } from "../effects-config";
import {
  createParticleSystem,
  destroyParticleSystem,
} from "@newkrok/three-particles/src/js/effects/three-particles";

import { TPSUnitModuleId } from "@newkrok/three-tps/src/js/newkrok/three-tps/modules/tps-module-enums.js";
import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { staticParams } from "../static";

const portalTargets = {
  "portal-01": "spawn-02",
  "portal-02": "spawn-03",
  "portal-03": "spawn-01",
};

let lastSpawnPoint = "spawn-01";
const spawns = {};
const portals = {};

const clearVelocity = (unit) => {
  unit.velocity.set(0, 0, 0);
};

export const initRegion = (area) => {
  area.visible = false;
  const module = staticParams.world.getModule(WorldModuleId.REGION);
  const { name: id } = area;

  if (id.includes("spawn")) {
    spawns[id] = area;
  } else {
    const region = module.createRegion({ id: id, area });
    if (id.includes("bottom")) {
      region.on.enter(staticParams.playersUnit.box, () => {
        staticParams.playersUnit.teleportTo(spawns[lastSpawnPoint].position);
        staticParams.playersUnit.setRotation(
          Math.PI - spawns[lastSpawnPoint].rotation.y
        );
        clearVelocity(staticParams.playersUnit);
        staticParams.world.tpsCamera.setRotation({
          x: Math.PI - spawns[lastSpawnPoint].rotation.y,
          y: 2,
        });

        const spawn = spawns[lastSpawnPoint];
        const finishEffect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_ACTIVATE]
        );
        finishEffect.position.copy(spawn.position);
        finishEffect.position.y -= 0.2;
        staticParams.world.scene.add(finishEffect);

        setTimeout(() => {
          destroyParticleSystem(finishEffect);
        }, 2000);
      });
    } else if (id.includes("portal")) {
      portals[id] = area;
      // TODO: Can I remove the timeout?
      setTimeout(() => {
        const effect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_POINT]
        );
        effect.position.copy(area.position);
        effect.position.y -= 0.2;
        staticParams.world.scene.add(effect);
      }, 1000);

      region.on.enter(staticParams.playersUnit.box, () => {
        const tpsMovementModule = staticParams.playersUnit.getModule(
          TPSUnitModuleId.TPS_MOVEMENT
        );
        tpsMovementModule.pause();
        clearVelocity(staticParams.playersUnit);
        staticParams.isControlDisabled = true;

        const portal = portals[id];
        staticParams.playersUnit.teleportTo(portal.position);

        const effect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_ACTIVATE]
        );
        effect.position.copy(portal.position);
        effect.position.y -= 0.2;
        staticParams.world.scene.add(effect);

        setTimeout(() => {
          staticParams.playersUnit.model.visible = false;
        }, 1000);

        setTimeout(() => {
          destroyParticleSystem(effect);
          const target = portalTargets[id];
          lastSpawnPoint = target;
          const spawn = spawns[target];
          staticParams.playersUnit.model.visible = true;
          staticParams.playersUnit.teleportTo(spawn.position);
          staticParams.playersUnit.setRotation(Math.PI - spawn.rotation.y);
          staticParams.world.tpsCamera.setRotation({
            x: Math.PI - spawn.rotation.y,
            y: 2,
          });
          tpsMovementModule.resume();

          const finishEffect = createParticleSystem(
            effectsConfig[EffectId.TELEPORT_ACTIVATE]
          );
          finishEffect.position.copy(spawn.position);
          finishEffect.position.y -= 0.2;
          staticParams.world.scene.add(finishEffect);

          setTimeout(() => {
            destroyParticleSystem(finishEffect);
          }, 2000);
        }, 2000);
      });
    }
  }
};
