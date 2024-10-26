import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { Terrain } from "./terrain";

const scene = new THREE.Scene();
const gui = new GUI();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000,
);
camera.position.set(0, 20, 100);
camera.position.set(10, 2, 10);

const stats = new Stats();
document.body.appendChild(stats.dom);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set(1, 2, 3);
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

const terrain = new Terrain(10, 10);
scene.add(terrain);

function animate() {
  stats.update();
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const terrainFolder = gui.addFolder("Terrain");
terrainFolder.add(terrain, "height", 1, 20, 1).name("Terrain Height");
terrainFolder.add(terrain, "width", 1, 20, 0.01).name("Terrain Widht");
terrainFolder.addColor(terrain.terrain.material, "color").name("Color");
terrainFolder.onChange(() => {
  terrain.CreateTerrain();
});
