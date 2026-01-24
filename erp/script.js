document.addEventListener('DOMContentLoaded', () => {

    // 1. Remove Loader
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
        
        // Start Hero Animations after loader clears
        initHero();
    }, 1500);

    // 2. Hero Text Animation (Anime.js)
    function initHero() {
        // Wrap text in spans
        var textWrapper = document.querySelector('.ml12');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: false})
        .add({
            targets: '.ml12 .letter',
            translateY: [100,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 + 30 * i
        })
        .add({
            targets: '.hero-desc, .cta-group',
            opacity: [0,1],
            translateY: [20,0],
            duration: 1000,
            easing: "easeOutExpo"
        }, '-=1000');
    }

    // 3. Scroll Listener for Architecture Workflow
    const steps = document.querySelectorAll('.step');
    const svgPacket = document.getElementById('data-packet');
    const caption = document.getElementById('diagram-caption');
    const nodeClient = document.getElementById('node-client');
    const nodeServer = document.getElementById('node-server');
    const nodeDb = document.getElementById('node-db');

    let currentStepIndex = -1;

    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Trigger when element is in middle of screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIdx = parseInt(entry.target.getAttribute('data-step'));
                
                // Active Class for Text
                steps.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                // Trigger Animation Only if changing steps
                if (stepIdx !== currentStepIndex) {
                    animateDiagram(stepIdx);
                    currentStepIndex = stepIdx;
                }
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
function animateDiagram(step) {
        // Stop any running animations on the packet
        anime.remove('#data-packet');
        anime.remove('#data-packet circle');
        
        const packet = document.querySelector('#data-packet');
        const caption = document.getElementById('diagram-caption');

        if (step === 1) {
            // STEP 1: CLIENT (Laptop)
            caption.innerText = "Step 1: Frontend (React/Thymeleaf) Input";
            caption.style.color = "#ffffff";
            
            // 1. Reset Packet Position to Client (approx x=150, y=190 inside the Client Group space)
            anime.set(packet, { translateX: 150, translateY: 190, opacity: 0 });

            // 2. Fade in and Pulse
            anime({
                targets: packet,
                opacity: [0, 1],
                scale: [0, 1.2],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });

            // 3. Animate Laptop Screen (Code lines blink)
            anime({
                targets: '#node-client rect[fill="#fff"]',
                opacity: [0.2, 0.8],
                delay: anime.stagger(100),
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutQuad'
            });
        } 
        else if (step === 2) {
            // STEP 2: MOVE TO SERVER
            caption.innerText = "Step 2: Spring Boot Processing";
            caption.style.color = "#6c63ff";

            // Stop Laptop Animation
            anime.remove('#node-client rect[fill="#fff"]');

            // 1. Move Packet from Client (150) to Server (400)
            anime({
                targets: packet,
                translateX: 400, // Middle of Server
                translateY: 200, // Align vertically
                opacity: 1,
                easing: 'easeInOutQuad',
                duration: 1000
            });

            // 2. Server Lights Blink rapidly
            anime({
                targets: '#node-server circle',
                fill: ['#2a2a40', '#00e676', '#ff4757'],
                duration: 500,
                loop: true,
                direction: 'alternate',
                delay: anime.stagger(100),
                easing: 'steps(2)' // Makes it look digital/robotic
            });
        } 
        else if (step === 3) {
            // STEP 3: MOVE TO DATABASE
            caption.innerText = "Step 3: MySQL Persistence";
            caption.style.color = "#ff4757";

            // Stop Server Animation
            anime.remove('#node-server circle');
            // Reset Server lights
            anime.set('#node-server circle', { fill: '#00e676' });

            // 1. Move Packet from Server (400) to DB (650)
            anime({
                targets: packet,
                translateX: 650,
                translateY: 200,
                easing: 'easeInOutQuad',
                duration: 1000
            });

            // 2. Stack expansion effect (Breathing DB)
            anime({
                targets: '#node-db path, #node-db ellipse',
                strokeWidth: [2, 4],
                stroke: '#00e676', // Turn green on success
                duration: 600,
                direction: 'alternate',
                loop: 3,
                easing: 'easeInOutSine'
            });
        }
    }
});