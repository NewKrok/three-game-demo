<script>
  import { leaderBoard } from "./../../../store/app.js";

  import Box from "../../../ui/box.svelte";

  let leaderBoardValue;

  leaderBoard.subscribe((value) => {
    leaderBoardValue = value.sort((a, b) => b.value - a.value);
  });
</script>

<div class="wrapper">
  <Box>
    <div class="content">
      {#each leaderBoardValue as { name, value, selected, isActive }, index}
        <div
          class={`entry ${!isActive && "deactivated"} ${
            selected && "selected"
          }`}
        >
          <div class="label">{index + 1}. {name}</div>
          <div class="entryContent">
            {value}
          </div>
        </div>
      {/each}
    </div>
  </Box>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    right: 1em;
    top: 1em;

    > :global(div:nth-child(2n)) {
      margin-top: 1em;
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 15em;

      .entry {
        color: #ffffff;
        width: 100%;
        display: flex;
        padding: 1em;
        border-radius: 0.5em;
        justify-content: space-between;

        &:nth-child(2n + 1) {
          background: #ffffff22;
        }

        .label {
          font-size: 1em;
          margin-right: 1em;
        }

        .entryContent {
        }
      }

      .selected {
        color: #00ff00;
      }

      .deactivated {
        opacity: 0.5;
      }
    }
  }
</style>
