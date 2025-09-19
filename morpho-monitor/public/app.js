const socket = io();

// Telemetry updates
socket.on("telemetry", (data) => {
  document.getElementById("battery").innerText = data.battery;
  document.getElementById("altitude").innerText = data.altitude;
  document.getElementById("speed").innerText = data.speed;
  document.getElementById("temperature").innerText = data.temperature;
  document.getElementById("mode").innerText = data.mode;
  document.getElementById("lat").innerText = data.latitude;
  document.getElementById("lon").innerText = data.longitude;
  document.getElementById("heading").innerText = data.heading;
});

// THREE.js scene
const canvas = document.getElementById("three-canvas");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f7fa);

const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(3, 3, 5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7).normalize();
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040, 2));

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load drone model
const loader = new THREE.GLTFLoader();
loader.load("clay.glb", (gltf) => {
  const drone = gltf.scene;
  drone.scale.set(1.5, 1.5, 1.5);
  scene.add(drone);
}, undefined, (error) => {
  console.error("Error loading model:", error);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
