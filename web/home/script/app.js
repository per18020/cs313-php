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
        this.mobile = isMobile();

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0x111d5e, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.composer = new EffectComposer(this.renderer);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        document.getElementById("threejs").appendChild(this.renderer.domElement);

        this.resize();

        this.setUpControls();
        this.loadSprites();
        this.defineMaterials();
        this.defineGeometries();
        this.buildMeshes();
        this.buildScene();
        this.compose();
        this.animate();
    }

    setUpControls() {
        this.controls = new OrbitControls(this.camera, document.getElementById("active-area"));
        this.controls.maxDistance = 10000;
        this.controls.minDistance = 15;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -0.7;
        this.controls.enablePan = false;
        this.controls.enabled = !this.mobile;
    }

    toggleControls() {
        if (!this.mobile) return;
        this.controls.enabled = !this.controls.enabled;
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

        for (let i = 0; i < this.starGeometry.vertices.length; i++) {
            this.starGeometry.vertices[i].x += Math.sin((this.counter + i) / 10000) / 30000;
            this.starGeometry.vertices[i].y += 400 * Math.cos((this.counter + i) / 10000) / 30000;
            this.starGeometry.vertices[i].z += 400 * Math.sin((this.counter + i) / 10000) / 30000;
        }
        this.starGeometry.verticesNeedUpdate = true;

        this.controls.update();


        this.composer.render();

        requestAnimationFrame(() => {
            this.animate()
        });
    }
}


// from http://detectmobilebrowsers.com/
function isMobile() {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

export default App;