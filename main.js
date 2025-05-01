import * as THREE from 'https://cdn.skypack.dev/three';
import { initUI } from './ui.js';

// Инициализация сцены и камеры
let scene, camera, renderer;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x00aa55 })
  );
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);
}

// Анимация камеры
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
      loader.style.display = 'none'; // Убираем экран загрузки
      startGame(); // Запуск игры
    });
  }
});
