<script>
  import { staticParams } from "./../../../js/static.js";
  import { checkpointEntries, lapsCount } from "./../../../store/app.js";

  import Box from "../../../ui/box.svelte";
  import {
    formatTime,
    TimePattern,
  } from "@newkrok/three-utils/src/js/newkrok/three-utils/time-utils.js";
  import { onMount } from "svelte";

  let checkpointEntriesValue, lapsCountValue;
  let totalTime = 0;
  let lastTotalTime = 0;
  let totalTimeDiff = 0;
  let bestTime =
    JSON.parse(localStorage.getItem("three-tps-drift"))?.bestTime || 0;
  let now = 0;

  checkpointEntries.subscribe((value) => {
    checkpointEntriesValue = value;
    if (checkpointEntriesValue.length > 0) {
      checkpointEntriesValue = checkpointEntriesValue
        .slice(1)
        .concat(checkpointEntriesValue[0]);
    }
  });

  lapsCount.subscribe((value) => {
    lapsCountValue = value;
    totalTime = checkpointEntriesValue.reduce(
      (prev, current) => (prev += current.currentTime),
      0
    );
    if (lastTotalTime !== 0) totalTimeDiff = totalTime - lastTotalTime;
    lastTotalTime = totalTime;
    if ((totalTime > 0 && totalTime < bestTime) || bestTime === 0) {
      bestTime = totalTime;
      localStorage.setItem("three-tps-drift", JSON.stringify({ bestTime }));
    }
  });

  onMount(() => {
    const interval = setInterval(() => {
      if (!staticParams.cycleData.isPaused) now = new Date();
    }, 30);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div class="wrapper">
  <Box>
    <div class="content">
      {#each checkpointEntriesValue as { currentTime, lastTime, startTime }, index}
        <div class="entry">
          <div class="label">Checkpoint {index + 1}</div>
          <div class="entryContent">
            <div class="currentTime">
              {formatTime(
                startTime
                  ? now - startTime - staticParams.cycleData.totalPauseTime
                  : currentTime,
                TimePattern.MM_SS_MS
              )}
            </div>
            {#if startTime && currentTime}
              <div class="lastTime">
                {formatTime(currentTime, TimePattern.MM_SS_MS)}
              </div>
            {:else if lastTime}
              <div
                class={`lastTime ${
                  currentTime > lastTime ? "positiveTime" : "negativeTime"
                }`}
              >
                {currentTime > lastTime ? "+" : "-"}{formatTime(
                  Math.abs(lastTime - currentTime),
                  TimePattern.MM_SS_MS
                )}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </Box>
  <Box>
    <div class="content">
      <div class="entry">
        <div class="label">TOTAL TIME</div>
        <div class="entryContent">
          <div class="currentTime">
            {formatTime(totalTime, TimePattern.MM_SS_MS)}
          </div>
          {#if lapsCountValue > 0 && totalTimeDiff !== 0}
            <div
              class={`lastTime ${
                totalTimeDiff > 0 ? "positiveTime" : "negativeTime"
              }`}
            >
              {totalTimeDiff > 0 ? "+" : "-"}{formatTime(
                Math.abs(totalTimeDiff),
                TimePattern.MM_SS_MS
              )}
            </div>
          {/if}
        </div>
      </div>
      <div class="entry">
        <div class="label">BEST TIME</div>
        <div class="entryContent">
          <div class="currentTime">
            {formatTime(bestTime, TimePattern.MM_SS_MS)}
          </div>
        </div>
      </div>
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
      width: 20em;

      .entry {
        color: #ffffff;
        width: 100%;
        display: flex;
        padding: 1em;
        border-radius: 0.5em;

        &:nth-child(2n + 1) {
          background: #ffffff22;
        }

        .label {
          font-size: 1em;
          margin-right: 1em;
        }

        .entryContent {
          display: flex;
          flex-direction: column;
          align-items: end;
          flex: 1;

          .currentTime {
            font-size: 1.5em;
          }

          .lastTime {
            font-size: 1em;
          }

          .positiveTime {
            color: #ed5d5d;
          }

          .negativeTime {
            color: #00ff00;
          }
        }
      }

      .active {
        border: 1px solid #ffffff55;
      }
    }
  }
</style>
