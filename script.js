// script.js

// Array of images URLs (for example purposes, you should replace these with actual image URLs)
const images = [
    'https://via.placeholder.com/100?text=1',
    'https://via.placeholder.com/100?text=2',
    'https://via.placeholder.com/100?text=3',
    'https://via.placeholder.com/100?text=4',
    'https://via.placeholder.com/100?text=5'
];

const imageContainer = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
let selectedImages = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadImages() {
    // Select a random image to repeat
    const repeatedIndex = Math.floor(Math.random() * images.length);
    const repeatedImage = images[repeatedIndex];
    const imagesToRender = [...images, repeatedImage];

    // Shuffle images
    const shuffledImages = shuffleArray(imagesToRender);

    // Render images
    imageContainer.innerHTML = '';
    shuffledImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = `img${repeatedIndex + 1}`;
        img.addEventListener('click', onImageClick);
        imageContainer.appendChild(img);
    });
}

function onImageClick(event) {
    if (selectedImages.length < 2) {
        const img = event.target;
        if (!selectedImages.includes(img)) {
            selectedImages.push(img);
            img.style.border = '2px solid blue';
        }

        if (selectedImages.length === 1) {
            resetButton.style.display = 'block';
        }

        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
        }
    }
}

function reset() {
    selectedImages.forEach(img => img.style.border = 'none');
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.innerHTML = '';
    loadImages();
}

function verify() {
    const [img1, img2] = selectedImages;
    if (img1.className === img2.className) {
        para.innerHTML = 'You are a human. Congratulations!';
    } else {
        para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none';
}

resetButton.addEventListener('click', reset);
verifyButton.addEventListener('click', verify);

// Initial load
loadImages();
