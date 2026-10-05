const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0c2a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffa500 })
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.2, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0x0000ff })
);

cube.position.x = -4;
sphere.position.x = -1.5;
torus.position.x = 4;

scene.add(cube);
scene.add(sphere);
scene.add(torus);

camera.position.z = 7;

const loader = new THREE.GLTFLoader();
const modelUrl = 'https://raw.githubusercontent.com/Bertuiqq/frontend/main/kt3/models/rocket.glb';
let rocket;

loader.load(
    modelUrl,
    function (gltf) {
        rocket = gltf.scene;
        rocket.position.x = 1.5;
        scene.add(rocket);
        console.log('Модель загружена!');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% загружено');
    },
    function (error) {
        console.error('Ошибка загрузки модели:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.02;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    if (rocket) {
        rocket.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
