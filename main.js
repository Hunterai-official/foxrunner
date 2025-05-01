import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/js/loaders/GLTFLoader.js';
import { initUI } from './ui.js';

let scene, camera, renderer;

function initScene() {
  scene = new THREE.Scene();

  // Камера
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 0, 0);

  // Рендер
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Свет
  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  // Плоскость (земля)
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x00aa55 })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  // Загрузка 3D-лиса
  const loader = new GLTFLoader();
  loader.load(
    'https://models.readyplayer.me/46e0e73c4e407e473cbd8d8c3b8c3d8b3.glb',
    (gltf) => {
      const fox = gltf.scene;
      fox.scale.set(2, 2, 2);
      fox.position.set(0, 0, 0);
      scene.add(fox);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  camera.position.z -= 0.1;
  camera.lookAt(camera.position.x, 0, camera.position.z - 5);
  renderer.render(scene, camera);
}

function startGame() {
  initScene();
  animate();
}

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const startBtn = document.getElementById('startBtn');

  if (startBtn) {
    startBtn.style.display = 'block';
    startBtn.addEventListener('click', () => {
      loader.style.transition = 'opacity 0.5s ease-out';
      loader.style.opacity = 0;
      setTimeout(() => {
        loader.style.display = 'none';
        startGame();
      }, 500);
    });
  }
});
