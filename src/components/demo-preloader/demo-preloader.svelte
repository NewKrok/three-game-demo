<script>
  import { get } from "svelte/store";
  import { selectedDemo } from "../../store/app";

  const { name, description, preview } = get(selectedDemo);
</script>

<div class="preloader">
  <div class="container">
    <div class="preview" style={`background-image: url(${preview});`}>
      <div class="blur" />
      <img src={preview} alt="" />
    </div>
    <div class="preloaderLine">
      <div class="preloaderProgress" />
    </div>
    <div class="info">
      <h2 class="mdc-typography--headline6" style="margin: 0;">
        {name}
      </h2>
      <div class="mdc-typography--body2">
        {description}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .preloader {
    z-index: 100;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #000;
    top: 0;
    left: 0;
    opacity: 1;

    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: relative;

      .preview {
        line-height: 0;
        flex: 1;
        display: flex;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
        justify-content: center;
        align-items: center;

        .blur {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          backdrop-filter: blur(50px);
        }

        img {
          width: 1280px;
          max-width: 100%;
          height: fit-content;
          object-fit: contain;
          position: relative;
          box-shadow: 2px 2px 50px #000;
          border-radius: 1em;
        }
      }

      .preloaderLine {
        width: 100%;
        height: 0.5em;
        background: #333;
        overflow: hidden;
      }

      .preloaderProgress {
        width: var(--preloader-progress-ratio);
        height: 100%;
        background-image: linear-gradient(
          to right,
          #ff512f,
          #fd6626,
          #f9781e,
          #f58919,
          #f09819
        );
        transition: width 0.2s;
      }

      .info {
        width: 100%;
        height: 14em;
        background: #111;
        color: #fff;
        padding: 0 3em;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>
