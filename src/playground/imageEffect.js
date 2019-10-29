import * as THREE from 'three';
import TweenMax from 'gsap';
import { Scene } from './libs/scene';
var glsl = require("glslify");

import vertexShader from './imageEffect.vert';
import fragmentShader from './imageEffect.frag';

export default class imageEffect extends Scene {

    constructor(el) {
        super(el);

        this.$image = document.querySelector(".tile img");
        console.log(this.$image);
        this.loader = new THREE.TextureLoader();

        this.image = this.loader.load(this.$image.src);
        this.hover = this.loader.load(
            this.$image.dataset.hover
        );

        this.$image.style.opacity = 0;
        console.log(this.image);
        console.log(this.hover)
        this.sizes = new THREE.Vector2(0, 0);
        this.offset = new THREE.Vector2(0, 0);

        this.getSizes();




        this.mouse = new THREE.Vector2(0, 0);
        window.addEventListener("mousemove", ev => {
            this.onMouseMove(ev);
        });


        this.createMesh();
        this.updateShader();
    }

    updateShader(){
        // console.log(this.uniforms);
        requestAnimationFrame(this.updateShader.bind(this));
        if(this.uniforms) this.uniforms.u_time.value += 0.01;
    }

    getSizes() {
        const {
            width,
            height,
            top,
            left
        } = this.$image.getBoundingClientRect();

        this.sizes.set(width, height);
        this.offset.set(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
        );
    }
    createMesh() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
  

        this.uniforms = {
          u_image: { type: "t", value: this.image },
          u_imagehover: { type: "t", value: this.hover },
          u_mouse: { value: this.mouse },
          u_time: { value: 0 },
          u_res: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
          }
        };

        // console.log(new THREE.Vector2(window.innerWidth, window.innerHeight));

        this.material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          defines: {
            PR: window.devicePixelRatio.toFixed(1)
          }
        });
        

        // this.material = new THREE.MeshBasicMaterial({
        //     map: this.image
        // });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(this.offset.x, this.offset.y, 0);
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

        this.scene.add(this.mesh);
    }
    onMouseMove(event) {
    
        TweenMax.to(this.mouse, 0.1, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1,
        })

        // TweenMax.to(this.mesh.rotation, 0.5, {
        //     x: -this.mouse.y * 0.3,
        //     y: this.mouse.x * (Math.PI / 6)
        // })
    }
}



