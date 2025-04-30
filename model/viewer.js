
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));

// Load GLTF
const loader = new GLTFLoader();
let model;

loader.load('models/model.glb', gltf => {
  model = gltf.scene;
  scene.add(model);

  // Auto-generate toggle buttons
  model.traverse(child => {
    if (child.isMesh) {
      const btn = document.createElement('button');
      btn.textContent = child.name;
      btn.onclick = () => child.visible = !child.visible;
      document.getElementById('controls').appendChild(btn);
    }
  });
}, undefined, err => console.error(err));

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
