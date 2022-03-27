import { UnitAction } from "@newkrok/three-tps/src/js/newkrok/three-tps/control/unit-action-manager.js";

export const AbilityId = {
  PISTOL_SHOOT: "PISTOL_SHOOT",
  RIFLE_SHOOT: "RIFLE_SHOOT",
  HEAVY_SHOOT: "HEAVY_SHOOT",
};

export const AbilityActivationType = {
  ONCE: "ONCE",
  REPEAT: "REPEAT",
  CHARGE_ONCE: "CHARGE_ONCE",
};

export const abilityConfig = {
  [AbilityId.PISTOL_SHOOT]: {
    type: AbilityActivationType.ONCE,
    on: UnitAction.Attack,
    cooldownTime: 500,
  },
  [AbilityId.RIFLE_SHOOT]: {
    type: AbilityActivationType.REPEAT,
    on: UnitAction.Attack,
    cooldownTime: 200,
  },
  [AbilityId.HEAVY_SHOOT]: {
    type: AbilityActivationType.CHARGE_ONCE,
    on: UnitAction.Attack,
    cooldownTime: 1000,
  },
};
