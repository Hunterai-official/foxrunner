import * as THREE from 'https://cdn.skypack.dev/three';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { initUI } from './ui.js';

let scene, camera, renderer;

function initScene() {
  // Сцена
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

  // Рендерер
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

  // Загрузка 3D-лиса (временно)
  const loader = new GLTFLoader();
  loader.load(
    'https://models.readyplayer.me/64ee073cd4e457dcabddb8c3.glb',
    (gltf) => {
      const fox = gltf.scene;
      fox.scale.set(2, 2, 2);
      fox.position.set(0, 0, 0);
      scene.add(fox);
    },
    undefined,
    (error) => {
      console.error('Ошибка загрузки модели:', error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  camera.position.z -= 0.1;
  camera.lookAt(camera.position.x, 0, camera.position.z - 5);
  renderer.render(scene, camera);
}

// Запуск после загрузки UI
window.addEventListener('load', () => {
  initUI(() => {
    initScene();
    animate();
  });
});
