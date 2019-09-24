<template>
  <div class="about-page">
 <input type="range" min="1" max="100" value="0"  id="range">
    <div class="about">
      <h1>This is an particle page</h1>
    </div>
    <ul ref="images">
      <li>
        <!-- <img src="https://picsum.photos/500/500" alt=""> -->
      </li>
      <li>
        <!-- <img src="https://picsum.photos/500/500" alt=""> -->
      </li>
      <li>
        <!-- <img src="https://picsum.photos/500/500" alt=""> -->
      </li>
        <li>
        <!-- <img src="https://picsum.photos/500/500" alt=""> -->
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
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import fullScreenEffect from '@/playground/fullscreen';
import TweenMax from 'gsap';
export default {
  data(){
    return {
      config : {
        scene: {
          height: window.outerHeight,
          width: window.outerWidth
        },
        camera: {
          fov : 45,
          aspect : 2, // the canvas default
          near : 0.1, 
          far : 2000,
        }
      },
      renderer : new THREE.WebGLRenderer({ antialias: true, alpha: true }),
      scene : new THREE.Scene(),
      light: new THREE.DirectionalLight(0xffffff, 0.5),
      controls: null,
      raycaster : new THREE.Raycaster(),
      mouse : new THREE.BoxGeometry()

    }
  },
  mounted(){
    // this.createScene();
      const items = this.$refs.images.children;
      new fullScreenEffect(
          document.getElementById("scene"),
          items
      );
      // effect.init();

  },
  methods: {
    createScene(){
      // Setup camera;
      this.camera = new THREE.PerspectiveCamera(this.config.camera.fov, this.config.camera.aspect, this.config.camera.near, this.config.camera.far);
      this.camera.position.z = 20;
      this.camera.position.y = 0;
      this.camera.position.x = 0;

      this.cameraPole = new THREE.Object3D();
      this.scene.add(this.cameraPole);
      this.cameraPole.add(this.camera);


      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      this.camera.add(light);


      // Setup renderer
      // this.renderer.setClearColor("#000000");
      // Configure renderer size
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.$refs.particleScene.appendChild(this.renderer.domElement);

      this.addTools();
      // this.addObjectCallback();

      console.log('[VUE] Created scene');

      // Add objects
      const items = this.$refs.images.children;
      console.log(items);

    
      // Render scene
      this.render();
      
      
    },
    
    addObjectCallback(){
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      window.addEventListener('click', onDocumentMouseDown, false);
      let self = this;
      function onDocumentMouseDown( event ) {

          event.preventDefault();

          mouse.x = ( event.clientX / self.renderer.domElement.clientWidth ) * 2 - 1;
          mouse.y = - ( event.clientY / self.renderer.domElement.clientHeight ) * 2 + 1;

          raycaster.setFromCamera( mouse, self.camera );

          var intersects = raycaster.intersectObjects( self.scene.children ); 
          // console.log(intersects);
          if ( intersects.length > 0 ) {
              if(intersects[0].object.callback) {
                intersects[0].object.callback(intersects[0].object);
              }
              
          }

      }
    },


    render(){
      // Render Loop
      requestAnimationFrame(this.render);


      // Render the scene
      this.renderer.render(this.scene, this.camera);
    },
    
    addTools(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      const axes = new THREE.AxesHelper();
      this.scene.add(axes);

    },
  }
}
</script>


