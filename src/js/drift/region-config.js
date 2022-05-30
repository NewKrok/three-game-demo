import { checkpointEntries, lapsCount } from "../../store/app";

import { WorldModuleId } from "@newkrok/three-game/src/js/newkrok/three-game/modules/module-enums.js";
import { staticParams } from "../static";

let checkpoints = {};

const checkpointMap = Array.from({ length: 4 }).reduce(
  (prev, _, index) => ({
    ...prev,
    [`checkpoint-${index + 1}-enter`]: `checkpoint-${index + 1}-leave`,
    [`checkpoint-${index + 1}-leave`]: `checkpoint-${
      index === 3 ? 1 : index + 2
    }-enter`,
  }),
  {}
);

const FIRST_REGION = "checkpoint-1-enter";

let nextExpectedRegionId = FIRST_REGION;
let checkpointStartTime = 0;
let lastTotalTime = 0;
let checkpointCount = 0;

export const disposeRegions = () => {
  checkpoints = {};
  nextExpectedRegionId = FIRST_REGION;
  checkpointStartTime = 0;
  lastTotalTime = 0;
  checkpointCount = 0;
};

export const initRegion = (area) => {
  area.visible = false;
  const module = staticParams.world.getModule(WorldModuleId.REGION);
  const { name: id } = area;

  checkpoints[id] = area;

  if (id.includes("enter")) {
    const checkpointIndex = checkpointCount;
    checkpointCount++;
    checkpointEntries.update((prev) =>
      prev.concat([{ currentTime: 0, lastTime: 0 }])
    );

    const region = module.createRegion({ id: id, area });
    region.on.enter(staticParams.playersUnit.box, () => {
      if (id === nextExpectedRegionId) {
        nextExpectedRegionId = checkpointMap[id];
        const now = staticParams.cycleData.now;
        checkpointEntries.update((prev) => {
          prev[checkpointIndex] = {
            currentTime: checkpointStartTime && now - checkpointStartTime,
            lastTime: prev[checkpointIndex].currentTime,
            startTime: null,
          };
          const nextIndex =
            checkpointIndex < prev.length - 1 ? checkpointIndex + 1 : 0;
          prev[nextIndex] = {
            ...prev[nextIndex],
            startTime: now,
          };
          return prev;
        });
        lastTotalTime += now - checkpointStartTime;
        checkpointStartTime = now;

        if (id === FIRST_REGION) {
          lastTotalTime = 0;
          lapsCount.update((prev) => prev + 1);
        }
      }
    });
  } else {
    const region = module.createRegion({ id: id, area });
    region.on.enter(staticParams.playersUnit.box, () => {
      if (id === nextExpectedRegionId) {
        nextExpectedRegionId = checkpointMap[id];
      }
    });
  }
};
