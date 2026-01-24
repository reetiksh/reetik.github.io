document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Experience Tabs Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.job-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // --- 2. Anime.js Animations ---

    // Fade In Navbar
    anime({
        targets: '.navbar',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        easing: 'easeOutExpo'
    });

    // Hero Text Stagger
    var timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    timeline
    .add({
        targets: '.glitch-text',
        opacity: [0, 1],
        translateX: [-50, 0],
        delay: 500
    })
    .add({
        targets: '.name-title',
        opacity: [0, 1],
        translateY: [20, 0],
    }, '-=600')
    .add({
        targets: '.hero-sub',
        opacity: [0, 1],
        translateY: [20, 0],
    }, '-=600')
    .add({
        targets: '.social-icons a',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100)
    }, '-=800')
    .add({
        targets: '.btn-primary',
        opacity: [0, 1],
        scale: [0.9, 1],
    }, '-=600');

    // --- 3. Typing Effect for Job Titles ---
    const textElement = document.getElementById('typing-text');
    const titles = ["Software Engineer", "Java Developer", "Full Stack Dev"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1500);


    // --- 4. Scroll Reveal for Sections ---
    const sections = document.querySelectorAll('.section-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [50, 0],
                    duration: 1000,
                    easing: 'easeOutCubic'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0; // Initial state
        observer.observe(section);
    });

    // --- 5. Canvas Particle Background (Tech/Cyber Effect) ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = (Math.random() * 1) - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01; // twinkle
            if (this.size <= 0.2) this.size = Math.random() * 2; // reset twinkle
        }
        draw() {
            ctx.fillStyle = '#66fcf1';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 50; i++) {
            particlesArray.push(new Particle());
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles with lines if close
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(102, 252, 241, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});