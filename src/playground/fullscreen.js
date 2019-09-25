import * as THREE from 'three';
import {TweenMax} from 'gsap';

export default class FullscreenEffect {
    constructor(container, items){
        this.container = container;
        this.items = items;
        this.camera = null;
        this.scene = null;
        this.renderer = null;

        this.uniforms = {
            uProgress: new THREE.Uniform(0),
            uMeshScale: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uMeshPosition: new THREE.Uniform(new THREE.Vector2(0, 0)),
            uViewSize: new THREE.Uniform(new THREE.Vector2(1, 1)),
            uColor: new THREE.Uniform(new THREE.Vector3(20, 20, 20)),
            uTexture: new THREE.Uniform(new THREE.Vector2(1, 1)),
        };
        this.isAnimating = false;
        this.state = "grid";

        this.init();
        
    }
    init(){
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.camera.position.z = 50;
        this.camera.lookAt = this.scene.position;

        const viewSize = this.getViewSize();
        this.uniforms.uViewSize.value.x = viewSize.width;
        this.uniforms.uViewSize.value.y = viewSize.height;

        const segments = 128;
        var geometry = new THREE.PlaneBufferGeometry(1, 1, segments, segments);
        // We'll be using the shader material later on ;)
        var material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            // side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.addEventListeners();
        
    }

    render() {
        console.log('render!');
        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners(){
        for (let i = 0; i < this.items.length; i++) {
            const element = this.items[i];
            element.addEventListener("mousedown", ev => this.clickOnImage(ev, i));
        }
    }

    async clickOnImage(ev, itemIndex){
        this.itemIndex = itemIndex;
        // console.log(this.uniforms.uTexture)
        this.uniforms.uTexture.type = 't';
        this.uniforms.uTexture.value = await this.loadTexture(this.items[itemIndex].querySelector('img').getAttribute('data-large'));

        // console.log(ev);
        this.updateMesh(ev)
        
        this.toggleFullscreen(true);
    }

    loadTexture(src){
        const loader = new THREE.TextureLoader();

        return new Promise((resolve,reject) => {
            loader.load(src, (tex) => {
                resolve(tex);
            }, null, (e) => reject(e));
        })
        
    }

    updateMesh(){
        if (this.itemIndex === -1) return;

        const item = this.items[this.itemIndex];
        const rect = item.getBoundingClientRect();
        const viewSize = this.getViewSize();

        // 1. Transform pixel units to camera's view units
        const widthViewUnit = (rect.width * viewSize.width) / window.innerWidth;
        const heightViewUnit = (rect.height * viewSize.height) / window.innerHeight;
        let xViewUnit = (rect.left * viewSize.width) / window.innerWidth;
        let yViewUnit = (rect.top * viewSize.height) / window.innerHeight;

        // 2. Make units relative to center instead of the top left.
        xViewUnit = xViewUnit - viewSize.width / 2;
        yViewUnit = yViewUnit - viewSize.height / 2;

        // 3. Make the origin of the plane's position to be the center instead of top Left.
        let x = xViewUnit + widthViewUnit / 2;
        let y = -yViewUnit - heightViewUnit / 2;

        // 4. Scale and position mesh
        const mesh = this.mesh;
        // Since the geometry's size is 1. The scale is equivalent to the size.
        mesh.scale.x = widthViewUnit;
        mesh.scale.y = heightViewUnit;
        mesh.position.x = x;
        mesh.position.y = y;

        this.uniforms.uMeshPosition.value.x = x / widthViewUnit;
        this.uniforms.uMeshPosition.value.y = y / heightViewUnit;
        this.uniforms.uMeshScale.value.x = widthViewUnit;
        this.uniforms.uMeshScale.value.y = heightViewUnit;

        const styles = window.getComputedStyle(item);
        let color = styles.getPropertyValue("background-color");
        color = color.substring(color.indexOf("(") + 1, color.indexOf(")"));

        const rgbColors = color.split(",", 3).map(c => parseInt(c));
        this.uniforms.uColor.value.x = rgbColors[0];
        this.uniforms.uColor.value.y = rgbColors[1];
        this.uniforms.uColor.value.z = rgbColors[2];
    }
    

    toggleFullscreen(fullscreen) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.container.style.zIndex = "2";

        // if(!fullscreen)
        this.render();
        this.tween = TweenMax.to(
            this.uniforms.uProgress, 2,
            {
                value: fullscreen ? 1 : 0,
                onUpdate: this.render.bind(this),
                onComplete: () => {
                    this.isAnimating = false;
 
                }
            }
        );
    }

    toggleOff(){
        this.toggleFullscreen(false);
    }

    getViewSize() {
        const fovInRadians = (this.camera.fov * Math.PI) / 180;
        const height = Math.abs(
            this.camera.position.z * Math.tan(fovInRadians / 2) * 2
        );

        return { width: height * this.camera.aspect, height };
    }
}




const vertexShader = `
    varying vec2 vUv;
	uniform float uProgress;
	uniform vec2 uMeshScale;
	uniform vec2 uMeshPosition;
	uniform vec2 uViewSize;

	void main(){
        vUv = uv;
	    vec3 pos = position.xyz;
        
        // Activation for left-to-right
		float activation = uv.y;
		
		float latestStart = 0.5;
		float startAt = activation * latestStart;
		float vertexProgress = smoothstep(startAt,1.,uProgress);

		// Scale to page view size/page size
	    vec2 scaleToViewSize = uViewSize / uMeshScale - 1.;
        vec2 scale = vec2(
          1. + scaleToViewSize * vertexProgress
        );
        pos.xy *= scale;
        
        // Move towards center 
        pos.y += -uMeshPosition.y * vertexProgress;
        pos.x += -uMeshPosition.x * vertexProgress;
        
         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
	}
`;
const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
	void main(){
         gl_FragColor = texture2D(uTexture, vUv);;
	}
`;