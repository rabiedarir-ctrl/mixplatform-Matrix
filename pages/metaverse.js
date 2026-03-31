// pages/metaverse.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/metaverse.css";
document.head.appendChild(link);

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

// The class
<div class="metaverse-container">
  <div class="metaverse-space">
    <div class="metaverse-card">
      <img src="avatar.png" alt="Avatar">
      <h3>Avatar Name</h3>
      <p>Description</p>
    </div>
  </div>
</div>

// دالة تحميل المتافيرس
export function loadMetaverse(app) {

  // إنشاء الحاوية
  const container = document.createElement("div");
  container.id = "metaverse-container";
  container.style.width = "100%";
  container.style.height = "100vh";
  container.style.margin = "0";
  container.style.overflow = "hidden";

  app.innerHTML = "";
  app.appendChild(container);

  // إنشاء المشهد
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // الكاميرا
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  // الريندر
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // إضاءة
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);

  // عنصر ثلاثي (مكعب)
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0x00ffcc
  });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // أرضية
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -2;
  scene.add(plane);

  // التحكم بالحركة
  const keys = {};

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  function moveCamera() {
    if (keys["w"]) camera.position.z -= 0.1;
    if (keys["s"]) camera.position.z += 0.1;
    if (keys["a"]) camera.position.x -= 0.1;
    if (keys["d"]) camera.position.x += 0.1;
  }

  // الأنيميشن
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    moveCamera();

    renderer.render(scene, camera);
  }

  animate();

  // دعم تغيير حجم الشاشة
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
