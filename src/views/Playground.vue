<template>
  <div class="about-page">
    <div class="about">
      <h1>This is an particle page</h1>
    </div>
    <ul ref="images">
      <li>
        <img src="https://picsum.photos/id/10/500/500" data-large="https://picsum.photos/id/10/1920/1080" alt="">
      </li>
      <li>
        <img src="https://picsum.photos/id/11/500/500" data-large="https://picsum.photos/id/11/1920/1080" alt="">
      </li>
      <li>
        <img src="https://picsum.photos/id/12/500/500" data-large="https://picsum.photos/id/12/1920/1080" alt="">
      </li>
        <li>
        <img src="https://picsum.photos/id/13/500/500" data-large="https://picsum.photos/id/13/1920/1080" alt="">
      </li>
    </ul>
    <div id="scene" ref="particleScene"></div>
   
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
    #scene {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    #range {
      position: relative;
      z-index: 99;
    }

    ul {
      li {
        display: inline-block;
        img {
          max-width: 300px;
        }
        &:nth-child(1) {
          background-color: coral;
        }
        &:nth-child(2) {
          background-color: lightblue;
        }
        &:nth-child(3) {
          background-color: lightgreen;
        }
        &:nth-child(4) {
          background-color: lightpink;
        }
      }
    }
  }

</style>

<script>
import fullScreenEffect from '@/playground/fullscreen';
export default {
  mounted(){
      const items = this.$refs.images.children;
      new fullScreenEffect(
          document.getElementById("scene"),
          items
      );
  }
}
</script>


