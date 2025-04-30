import * as THREE from './js/three.module.js';
import { GLTFLoader } from './js/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './js/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

const loader = new GLTFLoader();
let model;

loader.load('model.glb', (gltf) => {
  model = gltf.scene;
  scene.add(model);
}, undefined, (error) => {
  console.error('An error happened while loading the model:', error);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  if (model) {
    const intersects = raycaster.intersectObjects(model.children, true);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      obj.visible = !obj.visible;
    }
  }
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
