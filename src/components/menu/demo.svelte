<script>
  import Card, { PrimaryAction, Media, Content } from "@smui/card";
  import { AppState } from "../../enums/app-state";
  import { appState, selectedDemo } from "../../store/app";
  import { Icon } from "@smui/icon-button";
  import Key from "../../ui/key.svelte";

  export let config;
  const { name, description, controls, preview } = config;

  const onClick = () => {
    selectedDemo.set(config);
    appState.set(AppState.GAME);
  };
</script>

<div class="wrapper">
  <Card>
    <PrimaryAction on:click={onClick}>
      <div style="padding: 1rem;">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
          {name}
        </h2>
      </div>
      <Media
        class="card-media-16x9"
        aspectRatio="16x9"
        style={`background-image: url(${preview})`}
      />
      <Content class="mdc-typography--body2">
        {description}
      </Content>
      <div class="controlInfo">
        {#each controls as control (control.name)}
          <div class="row">
            {#each control.keys as key (key)}
              <Key>
                {#if key.includes("keyboard_")}
                  <Icon class="material-icons">{key}</Icon>
                {:else}
                  {key}
                {/if}
              </Key>
            {/each}
            <div>{control.name}</div>
          </div>
        {/each}
      </div>
    </PrimaryAction>
  </Card>
</div>

<style lang="scss">
  .wrapper {
    margin: 1em;
    width: 22em;

    .controlInfo {
      padding: 1em;
      background: #ddd;
      color: #666;
      font-size: 0.9em;

      .row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        :global(> div) {
          margin: 0.1em;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0.5;
          }
        }
      }
    }
  }

  :global(.wrapper .controlInfo .row .material-icons) {
    font-size: 19px;
  }
</style>
