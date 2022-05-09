<script>
  import Card, { PrimaryAction, Media, Content } from "@smui/card";
  import { AppState } from "../../enums/app-state";
  import { appState, selectedDemo } from "../../store/app";

  export let config;
  const { name, description, preview } = config;

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
    </PrimaryAction>
  </Card>
</div>

<style lang="scss">
  .wrapper {
    margin: 1em;
    width: 22em;
  }
</style>
