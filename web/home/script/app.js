import * as THREE from '../../lib/threejs/build/three.module.js';
import { OrbitControls } from '../../lib/threejs/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from '../../lib/threejs/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../lib/threejs/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../lib/threejs/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from '../../lib/threejs/examples/jsm/postprocessing/ShaderPass.js';
import { VignetteShader } from '../../lib/threejs/examples/jsm/shaders/VignetteShader.js';

class App {
    constructor() {
        this.counter = 0;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x111d5e, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.composer = new EffectComposer(this.renderer);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.controls = new OrbitControls(this.camera, document.getElementById("active-area"));
        this.controls.maxDistance = 10000;
        this.controls.minDistance = 15;
        this.controls.enablePan = false;

        document.getElementById("threejs").appendChild(this.renderer.domElement);

        this.resize();

        this.loadSprites();
        this.defineMaterials();
        this.defineGeometries();
        this.buildMeshes();
        this.buildScene();
        this.compose();
        this.animate();
    }

    loadSprites() {
        this.whiteCircleSprite = new THREE.TextureLoader().load('/home/assets/white-circle.png');
    }

    defineMaterials() {
        this.sunMaterial = new THREE.MeshPhongMaterial({
            color: 0xffbd69,
            emissive: 0xF66120,
            specular: 0xFFED22,
            shininess: 10,
            flatShading: true,
            transparent: 1,
            opacity: 1
        });

        this.planetOneMaterial = new THREE.MeshPhongMaterial({
            color: 0x18b6de,
            emissive: 0x1b677a,
            specular: 0xFFED22,
            flatShading: true,
            transparent: 1,
            opacity: 1
        });

        this.planetTwoMaterial = new THREE.MeshPhongMaterial({
            color: 0xfe346e,
            emissive: 0xfe346e,
            specular: 0xFFED22,
            flatShading: true,
            transparent: 1,
            opacity: 1
        });

        this.planetThreeMaterial = new THREE.MeshPhongMaterial({
            color: 0xb21f66,
            emissive: 0xb21f66,
            specular: 0xFFED22,
            flatShading: true,
            transparent: 1,
            opacity: 1
        });

        this.starMaterial = new THREE.PointsMaterial({
            size: 1.5,
            opacity: 1,
            transparent: true,
            map: this.whiteCircleSprite
        });
    }

    defineGeometries() {
        this.starGeometry = new THREE.SphereGeometry();
        this.sunGeometry = new THREE.DodecahedronBufferGeometry(1, 1, 1);
        this.sunGeometry.scale(5, 5, 5);
        this.planetOneGeometry = new THREE.DodecahedronBufferGeometry(1, 1, 1);
        this.planetOneGeometry.scale(1.7, 1.7, 1.7);
        this.planetTwoGeometry = new THREE.DodecahedronBufferGeometry(1, 1, 1);
        this.planetTwoGeometry.scale(3.3, 3.3, 3.3);
        this.planetThreeGeometry = new THREE.DodecahedronBufferGeometry(1, 1, 1);
        this.planetThreeGeometry.scale(1, 1, 1);
    }

    buildMeshes() {
        this.sunMeshOne = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.sunMeshTwo = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.sunMeshThree = new THREE.Mesh(this.sunGeometry, this.sunMaterial);
        this.planetOneMesh = new THREE.Mesh(this.planetOneGeometry, this.planetOneMaterial);
        this.planetTwoMesh = new THREE.Mesh(this.planetTwoGeometry, this.planetTwoMaterial);
        this.planetThreeMesh = new THREE.Mesh(this.planetThreeGeometry, this.planetThreeMaterial);

        this.starGeometry.vertices = [];
        for (let i = 0; i < 10000; i++) {

            let star = new THREE.Vector3();
            star.x = THREE.Math.randFloatSpread(2000);
            star.y = THREE.Math.randFloatSpread(2000);
            star.z = THREE.Math.randFloatSpread(2000);

            this.starGeometry.vertices.push(star);
        }

        this.stars = new THREE.Points(this.starGeometry, this.starMaterial);
    }

    buildScene() {
        this.scene.fog = new THREE.Fog(0x23272a, 0.5, 1700);

        this.scene.add(this.stars);

        this.scene.add(this.sunMeshOne);
        this.scene.add(this.sunMeshTwo);
        this.scene.add(this.sunMeshThree);

        this.planetOnePivot = new THREE.Object3D();
        this.planetTwoPivot = new THREE.Object3D();
        this.planetThreePivot = new THREE.Object3D();
        this.sunMeshOne.add(this.planetOnePivot);
        this.sunMeshOne.add(this.planetTwoPivot);
        this.sunMeshOne.add(this.planetThreePivot);

        var topLight = new THREE.DirectionalLight(0x4f4f4f);
        topLight.position.set(4, 4, 4);
        this.scene.add(topLight);

        var bottomLight = new THREE.DirectionalLight(0x4f4f4f);
        bottomLight.position.set(-4, -4, -4);
        this.scene.add(bottomLight);

        this.camera.position.z = 120;

        this.scene.add(this.planetOneMesh);
        this.planetOneMesh.position.x = 12;
        this.planetOnePivot.add(this.planetOneMesh);

        this.scene.add(this.planetTwoMesh);
        this.planetTwoMesh.position.y = 16;
        this.planetTwoPivot.add(this.planetTwoMesh); 

        this.scene.add(this.planetThreeMesh);
        this.planetThreeMesh.position.z = 23;
        this.planetThreePivot.add(this.planetThreeMesh); 
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    compose() {
        let bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
        bloomPass.threshold = 0.5;
        bloomPass.strength = 1;
        bloomPass.radius = 0;
        bloomPass.exposure = 1;

        let renderPass = new RenderPass(this.scene, this.camera);

        let vignettePass = new ShaderPass(VignetteShader);

        this.composer.addPass(renderPass);
        this.composer.addPass(bloomPass);
        this.composer.addPass(vignettePass);
    }

    animate() {
        this.counter++;

        this.sunMeshTwo.rotation.z -= 0.005;
        this.sunMeshTwo.rotation.y -= 0.005;
        this.sunMeshThree.rotation.z += 0.0016;

        this.planetOnePivot.rotation.y += 0.01;
        this.planetOnePivot.rotation.x += 0.005;

        this.planetTwoPivot.rotation.x += 0.01;
        this.planetTwoPivot.rotation.y += 0.005;
        this.planetTwoMesh.rotation.z += 0.01;

        this.planetThreePivot.rotation.y += 0.02;
        this.planetThreePivot.rotation.x += 0.01;
        this.planetThreePivot.rotation.z += 0.02;
        this.planetThreeMesh.rotation.y += 0.01;

        for (let i = 0; i < this.starGeometry.vertices.length; i++)
        {
            this.starGeometry.vertices[i].x += Math.sin((this.counter + i) / 10000) / 30000; 
            this.starGeometry.vertices[i].y += 400 * Math.cos((this.counter + i) / 10000) / 30000;
            this.starGeometry.vertices[i].z += 400 * Math.sin((this.counter + i) / 10000) / 30000;
        }
        this.starGeometry.verticesNeedUpdate = true;

        this.composer.render();

        requestAnimationFrame(() => {
            this.animate()
        });
    }
}

export default App;