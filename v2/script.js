document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Logic (SPA Feel) ---
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page-section');

    function navigateTo(targetId) {
        // Update Buttons
        navBtns.forEach(btn => {
            if(btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Sections (Fade effect handled by CSS)
        sections.forEach(sec => {
            if(sec.id === targetId) {
                sec.classList.add('active');
                // Trigger Anime.js for content entry
                animateSectionEntry(sec);
            } else {
                sec.classList.remove('active');
            }
        });
        
        // Scroll to top
        document.querySelector('.content-area').scrollTop = 0;
    }

    // Click Event Listeners
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            navigateTo(target);
        });
    });

    // Make global for onclick in HTML
    window.navigateTo = navigateTo;

    // --- 2. Anime.js Section Animations ---
    function animateSectionEntry(section) {
        // Reset opacity for child elements to animate them in
        const elements = section.querySelectorAll('h1, h2, h3, p, .stat-card, .scheme-card, .skill-item');
        
        anime({
            targets: elements,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(50),
            duration: 800,
            easing: 'easeOutQuad'
        });
    }

    // Initial Animation for Home
    animateSectionEntry(document.getElementById('home'));


    // --- 3. Tech Background Particle System ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.color = '#64ffda';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(this.x > canvas.width) this.x = 0;
            if(this.x < 0) this.x = canvas.width;
            if(this.y > canvas.height) this.y = 0;
            if(this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.4;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for(let i=0; i<60; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if(dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${1 - dist/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

});