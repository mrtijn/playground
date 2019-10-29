<template>
  <div class="about-page">
    <h1>Image effect</h1>
    <div class="tiles">
      <div class="tile">
        <figure>
          <img src="test.jpg" data-hover="motor.jpg" alt="">
        </figure>
      </div>
    </div>
    <canvas id="scene" ref="scene"></canvas>
   
  </div>
</template>
<style lang="scss">
  .about-page {
    ul {
        display: grid;
        width: 100vw;
        height: 100vh;
        max-width: 400px;
        max-height: 400px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-column-gap: 25px;
        grid-row-gap: 25px;
    }

    .tiles {
      img{
        width: 603px;
        height: 400px;
      }
    }
    #scene {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      z-index: 9;
    }

  }

</style>

<script>
import imageFx from '../playground/imageEffect';
export default {
  mounted(){
    const el = this.$refs.scene;
    new imageFx(
      el
    );
  }
}
</script>


