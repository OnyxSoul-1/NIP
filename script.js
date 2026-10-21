// List your files here. Make sure they are in the same folder.
const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
// UPDATED TO .PNG
const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png', 'image9.png'];
const audios = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3'];

const bgVideo = document.getElementById('bg-video');
const bgImage = document.getElementById('bg-image');
const bgAudio = document.getElementById('bg-audio');
const prompt = document.getElementById('audio-prompt');

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function loadRandomBackground() {
    const useVideo = Math.random() > 0.5;

    if (useVideo) {
        bgImage.style.display = 'none';
        bgVideo.style.display = 'block';
        bgVideo.src = getRandom(videos);
        bgVideo.play().catch(e => console.log("Video autoplay blocked:", e));
    } else {
        bgVideo.pause();
        bgVideo.style.display = 'none';
        bgImage.style.display = 'block';
        bgImage.src = getRandom(images);
    }
}

function loadRandomAudio() {
    bgAudio.src = getRandom(audios);
    if (prompt.style.display === 'none') {
        bgAudio.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Initial Load
loadRandomBackground();
loadRandomAudio();

// Handle Audio Autoplay Policy
document.body.addEventListener('click', () => {
    bgAudio.play().then(() => {
        prompt.style.display = 'none'; 
    }).catch(e => console.log("Audio play failed:", e));
}, { once: true });

// Change background and music every 15 seconds
setInterval(() => {
    loadRandomBackground();
    loadRandomAudio();
}, 15000); 


// --- INTERACTIVE GRASS CODE ---
const canvas = document.getElementById('grass-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let grassBlades = [];
let mouse = { x: -1000, y: -1000 };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrass();
}

class GrassBlade {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = Math.random() * 80 + 40; 
        this.width = Math.random() * 2 + 1;
        this.color = `rgba(${Math.random() * 30 + 20}, ${Math.random() * 80 + 80}, ${Math.random() * 30 + 20}, ${Math.random() * 0.5 + 0.5})`;
        this.angle = 0;
        this.targetAngle = 0;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const tipX = Math.sin(this.angle) * this.height;
        const tipY = -Math.cos(this.angle) * this.height;
        ctx.quadraticCurveTo(tipX / 2, tipY / 2, tipX, tipY);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const mouseAngle = Math.atan2(dy, dx);
            this.targetAngle = (mouseAngle - Math.PI/2) * force; 
        } else {
            this.targetAngle = 0;
        }
        this.angle += (this.targetAngle - this.angle) * 0.1;
        
        if (this.targetAngle === 0) {
            this.angle += Math.sin(Date.now() * 0.002 + this.x) * 0.005;
        }
    }
}

function initGrass() {
    grassBlades = [];
    const amount = Math.floor(width / 8); 
    for (let i = 0; i < amount; i++) {
        const x = Math.random() * width;
        const y = height - Math.random() * 20; 
        grassBlades.push(new GrassBlade(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    grassBlades.forEach(blade => {
        blade.update();
        blade.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
});

resize();
animate();