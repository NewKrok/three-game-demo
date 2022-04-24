<script>
  import { abilityConfig, AbilityId } from "../../../js/ability-config";

  import Ability from "./ability.svelte";

  const neededProps = ["cooldownTime"];
  const abilities = [
    {
      ...Object.entries(abilityConfig[AbilityId.DASH]).reduce(
        (prev, [key, value]) => ({
          ...prev,
          ...(neededProps.includes(key) ? { [key]: value } : {}),
        }),
        {}
      ),
      id: AbilityId.DASH,
      name: "Dash",
      img: "./assets/images/abilities/dash.png",
      key: "Q",
    },
  ];
</script>

<div class="list">
  {#each abilities as ability (ability.name)}
    <Ability {...ability} />
  {/each}
</div>

<style lang="scss">
  .list {
    position: fixed;
    left: 1em;
    bottom: 1em;
    display: flex;
    gap: 0.5em;
  }
</style>
