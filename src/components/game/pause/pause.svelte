<script>
  import { appState } from "./../../../store/app.js";
  import { AppState } from "./../../../enums/app-state.js";
  import Dialog, { Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { Icon } from "@smui/icon-button";
  import { staticParams } from "../../../js/static.js";

  let open = false;

  window.tpsDemo.on.init(() => {
    window.tpsDemo.game.world.on.pause(() => {
      open = true;
      document.exitPointerLock();
    });
    window.tpsDemo.game.world.on.resume(() => {
      open = false;
    });
  });
  document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement === null) {
      window.tpsDemo.game.world.pause();
    }
  });
  const close = () => {
    window.tpsDemo.game.world.resume();
    if (staticParams.isPointerLockNeeded)
      window.tpsDemo.game.world.renderer.domElement.requestPointerLock();
  };
  const exitGame = () => {
    close();
    window.tpsDemo.game.world.dispose();
    appState.set(AppState.MENU);
  };
</script>

<Dialog
  bind:open
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">PAUSE MENU</Title>
  <Button href="https://github.com/NewKrok/three-tps-demo" target="_blank">
    <Icon class="material-icons">code</Icon>
    <Label>GitHub</Label>
  </Button>
  <Button
    href="https://www.youtube.com/channel/UC7Uc0QEWn69JCYPfjtwHT6g"
    target="_blank"
  >
    <Icon class="material-icons">movie</Icon>
    <Label>Youtube</Label>
  </Button>
  <Actions>
    <Button on:click={exitGame}>
      <Icon class="material-icons">logout</Icon>
      <Label>Exit</Label>
    </Button>
    <Button on:click={close}>
      <Icon class="material-icons">play_circle_outline</Icon>
      <Label>Resume</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
</style>
