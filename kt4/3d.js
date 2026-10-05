const link = 'https://raw.githubusercontent.com/Bertuiqq/frontend/main/kt4/';

const modelUrls = [
    link + 'models/ring.glb',
    link + 'models/earrings.glb',
    link + 'models/pendant.glb',
    link + 'models/bracelet.glb',
    link + 'models/gift-box.glb'
];

const names = ['Кольцо Лёд', 'Серьги Капля', 'Подвеска Луна', 'Браслет Цепь', 'Подарочная коробка'];
const prices = [3200, 2700, 2900, 3500, 300];

const textureUrls = [
    link + 'textures/gold.png',
    link + 'textures/silver.png',
    link + 'textures/rose.png'
];

const box = document.querySelector('.scene-box');
const height = 500;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3eee8);

const camera = new THREE.PerspectiveCamera(75, box.offsetWidth / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(box.offsetWidth, height);
box.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.z = 5;

const loader = new THREE.GLTFLoader();
const textureLoader = new THREE.TextureLoader();

let models = [];
let currentModel;

modelUrls.forEach(function (url, index) {
    loader.load(
        url,
        function (gltf) {
            models[index] = gltf.scene;
            if (index == 0) {
                currentModel = gltf.scene;
                scene.add(currentModel);
            }
            console.log('Модель загружена!');
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% загружено');
        },
        function (error) {
            console.error('Ошибка загрузки модели:', error);
        }
    );
});

const modelName = document.querySelector('.model-name');
const modelPrice = document.querySelector('.model-price');
const modelButtons = document.querySelectorAll('.model-btn');

modelButtons.forEach(function (button, index) {
    button.addEventListener('click', () => {
        scene.remove(currentModel);
        currentModel = models[index];
        scene.add(currentModel);
        modelName.textContent = names[index];
        modelPrice.textContent = prices[index] + ' руб.';
    });
});

const textureButtons = document.querySelectorAll('.texture-btn');

textureButtons.forEach(function (button, index) {
    button.addEventListener('click', () => {
        textureLoader.load(textureUrls[index], function (texture) {
            const material = new THREE.MeshStandardMaterial({
                map: texture
            });

            currentModel.traverse((child) => {
                if (child.isMesh) {
                    child.material = material;
                }
            });
        });
    });
});

const bgButtons = document.querySelectorAll('.bg-btn');
const colors = [0xf3eee8, 0x1e1e1e];

bgButtons.forEach(function (button, index) {
    button.addEventListener('click', () => {
        scene.background = new THREE.Color(colors[index]);
    });
});

let rotate = true;
const rotateButton = document.querySelector('.rotate-btn');

rotateButton.addEventListener('click', () => {
    if (rotate == true) {
        rotate = false;
        rotateButton.textContent = 'Включить вращение';
    } else {
        rotate = true;
        rotateButton.textContent = 'Остановить вращение';
    }
});

let cart = [];
const counter = document.querySelector('.counter');

document.querySelector('.buy-btn').addEventListener('click', () => {
    cart.push(modelName.textContent);
    counter.textContent = cart.length;
    console.log(cart);
});

function animate() {
    requestAnimationFrame(animate);

    if (rotate == true && currentModel) {
        currentModel.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = box.offsetWidth / height;
    camera.updateProjectionMatrix();
    renderer.setSize(box.offsetWidth, height);
});
