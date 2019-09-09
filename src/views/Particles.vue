<template>
  <div class="about">
    <h1>This is an particle page</h1>

    <div ref="particleScene"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

export default {
  data(){
    return {
      renderer : new THREE.WebGLRenderer({ antialias: true }),
      scene : new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
      light: new THREE.DirectionalLight(0xffffff, 1),
      controls: null,

    }
  },
  mounted(){
    this.createScene();
  },
  methods: {
    createScene(){
      // Setup camera;
      this.camera.position.z = 4;

      const axes = new THREE.AxisHelper(20);
      this.scene.add(axes);
      // Setup lights
      this.light.position.x = 4;
      this.light.position.y = 4;
      this.light.position.z = 4;
      this.scene.add(this.light);


      // Setup renderer
      this.renderer.setClearColor("#000000");
      // Configure renderer size
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.$refs.particleScene.appendChild(this.renderer.domElement);

      this.addTools();

      console.log('[VUE] Created scene');

      // Add objects
      // this.addBGPlane();
      this.addParticleObject();
      // this.addBox();


      // Render scene
      // console.log(this.scene);
      this.render();
      
      
    },

    render(){
      // Render Loop
      requestAnimationFrame(this.render);
      // Update controls
      this.controls.update();
      // Render the scene
      this.renderer.render(this.scene, this.camera);
    },
    
    addTools(){
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },

    addBGPlane(){
      // ADD BG plane
      let planeGeometry = new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 1);
      let planeMaterial = new THREE.MeshPhongMaterial({ color: "#5f5e5e" });


      let plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.z = -3;
      plane.receiveShadow = true;
      this.scene.add(plane);
      console.log('[THREE] Added BG plane');
    },

    addBox(){
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      const cube = new THREE.Mesh( geometry, material );
      cube.name = 'Box';
      this.scene.add( cube );
      console.log('[THREE] Added Cube');
    },

    // END OF BASE
  }
}
</script>


