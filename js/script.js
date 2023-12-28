
import * as THREE from 'three';
import { gsap } from "gsap";

const canvas = document.querySelector("#world");
const title = document.querySelector(".content__title");
const subtitle = document.querySelector(".content__subtitle");

const cursor = { x: 0, y: 0 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight);
camera.position.z = 3;
scene.add(camera);

const textureLoader = new THREE.TextureLoader(); 
const matcapTexture = textureLoader.load("https://bruno-simon.com/prismic/matcaps/3.png");

const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, transparent: true, opacity: 0 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

window.addEventListener('mousemove', (_e) => {
  cursor.x = _e.clientX / window.innerWidth - 0.5;
  cursor.y = _e.clientY / window.innerHeight - 0.5;
});

const tl = gsap.timeline({ paused: true, delay: 0.8, easing: "Back.out(2)" });

tl.from(title, {opacity: 0, y: 20})
  .from(subtitle, {opacity: 0, y: 20}, "-=.3")
  .to(material, { opacity: 1 }, "-=.2");

const animate = function () {
  window.requestAnimationFrame(animate);

  mesh.rotation.x += 0.01; 
  mesh.rotation.y += 0.01;

  const cameraX = cursor.x -1;
  const cameraY = - cursor.y;

  camera.position.x += (cameraX - camera.position.x) / 10;
  camera.position.y += (cameraY - camera.position.y) / 10;

  renderer.render( scene, camera );
};
animate();
tl.play();
