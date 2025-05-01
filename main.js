import * as THREE from 'https://cdn.skypack.dev/three';

// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Рендер
const renderer = new THREE.WebGLRenderer({ antialias: true });
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

// Анимация
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Скрыть загрузку после полной инициализации
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
});
