<script>
  import Dialog, { Title, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { Icon } from "@smui/icon-button";

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
    window.tpsDemo.game.world.renderer.domElement.requestPointerLock();
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
    <Button on:click={close}>
      <Icon class="material-icons">play_circle_outline</Icon>
      <Label>Resume</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
</style>
