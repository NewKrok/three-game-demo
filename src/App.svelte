<script>
  import { appState } from "./store/app.js";
  import { AppState } from "./enums/app-state.js";
  import Game from "./components/game/game.svelte";
  import Menu from "./components/menu/menu.svelte";

  const StateMap = {
    [AppState.MENU]: Menu,
    [AppState.GAME]: Game,
  };

  let appStateValue;
  appState.subscribe((value) => (appStateValue = value));

  $: StateComponent = StateMap[appStateValue];
</script>

<svelte:component this={StateComponent} />
