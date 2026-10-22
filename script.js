// List your files here. Make sure they are in the same folder.
const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4', 'video6.mp4'];
const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png', 'image11.png', 'image12.png', 'image13.png', 'image14.png', 'image15.png'];
const audios = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3', 'audio5.mp3', 'audio6.mp3'];

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
        bgVideo.loop = true; 
        bgVideo.play().catch(e => console.log("Video autoplay blocked:", e));
    } else {
        bgVideo.pause();
        bgVideo.style.display = 'none';
        bgImage.style.display = 'block';
        bgImage.src = getRandom(images);
    }
}

function playNextAudio() {
    bgAudio.src = getRandom(audios);
    bgAudio.play().catch(e => console.log("Audio play failed:", e));
}

loadRandomBackground();
bgAudio.addEventListener('ended', playNextAudio);

document.body.addEventListener('click', () => {
    if (!bgAudio.src) {
        playNextAudio();
    } else {
        bgAudio.play().catch(e => console.log("Audio play failed:", e));
    }
    prompt.style.display = 'none'; 
}, { once: true });


// --- INTERACTIVE GRASS & FIREFLIES CODE ---
const canvas = document.getElementById('grass-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let grassBlades = [];
let fireflies = []; // NEW: Array for fireflies
let mouse = { x: -1000, y: -1000 };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrass();
    initFireflies(); // NEW
}

// --- GRASS ---
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
        grassBlades.push(new GrassBlade(Math.random() * width, height - Math.random() * 20));
    }
}

// --- FIREFLIES (NEW) ---
class Firefly {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random slow speeds
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random();
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseDir = 1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Warm glowing color (yellowish-green)
        ctx.fillStyle = `rgba(200, 255, 150, ${this.opacity})`;
        // Add a nice glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(200, 255, 150, ${this.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
    }

    update() {
        // Move slowly
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Pulse the opacity in and out
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 1) { this.opacity = 1; this.pulseDir = -1; }
        if (this.opacity < 0) { this.opacity = 0; this.pulseDir = 1; }

        // Run away slightly if mouse gets too close
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
            this.x -= dx * 0.02;
            this.y -= dy * 0.02;
        }
    }
}

function initFireflies() {
    fireflies = [];
    const amount = 40; // Number of fireflies on screen
    for (let i = 0; i < amount; i++) {
        fireflies.push(new Firefly());
    }
}

// --- ANIMATION LOOP ---
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw Fireflies first (behind the grass)
    fireflies.forEach(fly => {
        fly.update();
        fly.draw();
    });

    // Draw Grass
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
