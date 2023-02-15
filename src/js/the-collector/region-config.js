import { EffectId, effectsConfig } from "../effects-config";
import {
  UnitModuleId,
  WorldModuleId,
} from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";

import { createParticleSystem } from "@newkrok/three-particles/src/js/effects/three-particles";
import gsap from "gsap";
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
  unit.getModule(UnitModuleId.OCTREE_BEHAVIOR).clearVelocity();
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
        staticParams.playersUnit
          .getModule(UnitModuleId.OCTREE_BEHAVIOR)
          .teleportTo(spawns[lastSpawnPoint].position);
        staticParams.playersUnit.setRotation(
          Math.PI - spawns[lastSpawnPoint].rotation.y
        );
        clearVelocity(staticParams.playersUnit);
        staticParams.world.userData.tpsCamera.setRotation({
          x: Math.PI - spawns[lastSpawnPoint].rotation.y,
          y: 2,
        });

        const spawn = spawns[lastSpawnPoint];
        const finishEffect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_ACTIVATE],
          staticParams.cycleData.now
        );
        finishEffect.instance.position.copy(spawn.position);
        finishEffect.instance.position.y -= 0.2;
        staticParams.world.scene.add(finishEffect.instance);

        gsap.delayedCall(2, finishEffect.dispose);
      });
    } else if (id.includes("portal")) {
      portals[id] = area;
      // TODO: Can I remove the timeout?
      gsap.delayedCall(1, () => {
        const effect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_POINT],
          staticParams.cycleData.now
        ).instance;
        effect.position.copy(area.position);
        effect.position.y -= 0.2;
        staticParams.world.scene.add(effect);
      });

      region.on.enter(staticParams.playersUnit.box, () => {
        const tpsMovementModule = staticParams.playersUnit.getModule(
          UnitModuleId.TPS_MOVEMENT
        );
        tpsMovementModule.pause();
        clearVelocity(staticParams.playersUnit);
        staticParams.isControlDisabled = true;

        const portal = portals[id];
        staticParams.playersUnit
          .getModule(UnitModuleId.OCTREE_BEHAVIOR)
          .teleportTo(portal.position);

        const effect = createParticleSystem(
          effectsConfig[EffectId.TELEPORT_ACTIVATE],
          staticParams.cycleData.now
        );
        effect.instance.position.copy(portal.position);
        effect.instance.position.y -= 0.2;
        staticParams.world.scene.add(effect.instance);

        gsap.delayedCall(1, () => {
          staticParams.playersUnit.model.visible = false;
        });

        gsap.delayedCall(2, () => {
          effect.dispose();
          const target = portalTargets[id];
          lastSpawnPoint = target;
          const spawn = spawns[target];
          staticParams.playersUnit.model.visible = true;
          staticParams.playersUnit
            .getModule(UnitModuleId.OCTREE_BEHAVIOR)
            .teleportTo(spawn.position);
          staticParams.playersUnit.setRotation(Math.PI - spawn.rotation.y);
          staticParams.world.userData.tpsCamera.setRotation({
            x: Math.PI - spawn.rotation.y,
            y: 2,
          });
          tpsMovementModule.resume();

          const finishEffect = createParticleSystem(
            effectsConfig[EffectId.TELEPORT_ACTIVATE],
            staticParams.cycleData.now
          );
          finishEffect.instance.position.copy(spawn.position);
          finishEffect.instance.position.y -= 0.2;
          staticParams.world.scene.add(finishEffect.instance);

          gsap.delayedCall(2, finishEffect.dispose);
        });
      });
    }
  }
};
