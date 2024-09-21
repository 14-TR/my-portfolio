// Three.js setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a 3D sphere
let geometry = new THREE.SphereGeometry(5, 32, 32);
let material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('path-to-globe-texture.jpg'),
    side: THREE.DoubleSide
});
let globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Photo data (your 15 images)
let photos = [
    { lat: 30, lng: -100, img: 'images/photo1.jpg' },  // Image 1 - Replace with actual path
    { lat: 50, lng: 10, img: 'images/photo2.jpg' },    // Image 2 - Replace with actual path
    { lat: 40, lng: -74, img: 'images/photo3.jpg' },   // Image 3 - Replace with actual path
    { lat: 48, lng: 2, img: 'images/photo4.jpg' },     // Image 4 - Replace with actual path
    { lat: -34, lng: 151, img: 'images/photo5.jpg' },  // Image 5 - Replace with actual path
    { lat: -22, lng: -43, img: 'images/photo6.jpg' },  // Image 6 - Replace with actual path
    { lat: 35, lng: 139, img: 'images/photo7.jpg' },   // Image 7 - Replace with actual path
    { lat: 55, lng: 37, img: 'images/photo8.jpg' },    // Image 8 - Replace with actual path
    { lat: -33, lng: -70, img: 'images/photo9.jpg' },  // Image 9 - Replace with actual path
    { lat: 28, lng: 77, img: 'images/photo10.jpg' },   // Image 10 - Replace with actual path
    { lat: 34, lng: -118, img: 'images/photo11.jpg' }, // Image 11 - Replace with actual path
    { lat: 52, lng: 13, img: 'images/photo12.jpg' },   // Image 12 - Replace with actual path
    { lat: 19, lng: -99, img: 'images/photo13.jpg' },  // Image 13 - Replace with actual path
    { lat: 37, lng: -122, img: 'images/photo14.jpg' }, // Image 14 - Replace with actual path
    { lat: 31, lng: 121, img: 'images/photo15.jpg' }   // Image 15 - Replace with actual path
];

// Function to place images on the sphere
function placePhotoOnSphere(lat, lng, imgPath) {
    let phi = (90 - lat) * (Math.PI / 180);
    let theta = (lng + 180) * (Math.PI / 180);

    let x = -((5.5) * Math.sin(phi) * Math.cos(theta)); // Radius of sphere (5.5 for slight separation)
    let y = (5.5) * Math.cos(phi);
    let z = (5.5) * Math.sin(phi) * Math.sin(theta);

    let texture = new THREE.TextureLoader().load(imgPath);
    let material = new THREE.SpriteMaterial({ map: texture });
    let sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(0.5, 0.5, 0.5); // Adjust size of photos
    scene.add(sprite);

    // Add click event to the sprite for zooming/viewing larger
    sprite.onClick = function () {
        showPhotoInViewer(imgPath);
    };
}

// Loop through photos and place each on the globe
photos.forEach(photo => {
    placePhotoOnSphere(photo.lat, photo.lng, photo.img);
});

// Function to handle photo viewing
function showPhotoInViewer(imgPath) {
    // Implement Panolens.js or your preferred image viewer here
    console.log('Show photo: ' + imgPath);
}

// Camera position
camera.position.z = 10;

// OrbitControls for user interaction
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001; // Rotate the globe slowly
    renderer.render(scene, camera);
}
animate();


