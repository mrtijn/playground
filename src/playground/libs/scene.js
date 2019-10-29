import * as THREE from 'three';

export class Scene {
    perspective = 800
    constructor(el){
            this.container = el;
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer({
              canvas: this.container,
              alpha: true
            });
            

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(window.devicePixelRatio);

            this.setupLights();
            this.setupCamera();

            this.update();
    }
    
    setupLights(){
        const ambientlight = new THREE.AmbientLight(0xffffff, 2);
        this.scene.add(ambientlight);
    }

    setupCamera(){
        const fov =
          (180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
          Math.PI;

        this.camera = new THREE.PerspectiveCamera(
          fov,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        this.camera.position.set(0, 0, this.perspective);
    }

    update(){
        requestAnimationFrame(this.update.bind(this));

        this.renderer.render(this.scene, this.camera);
    }

}