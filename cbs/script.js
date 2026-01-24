document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. IDLE ANIMATIONS ---
    // Hovering core
    anime({
        targets: '#core-citadel',
        translateY: [400, 390],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // --- 2. SCROLL OBSERVER ---
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                steps.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                const stepIdx = parseInt(entry.target.getAttribute('data-step'));
                if (stepIdx !== currentStep) {
                    animateFlow(stepIdx);
                    currentStep = stepIdx;
                }
            }
        });
    }, { threshold: 0.5 });

    steps.forEach(step => observer.observe(step));

    // --- 3. LOGIC ANIMATION CONTROLLER ---
    function animateFlow(step) {
        
        // Reset Logic: Stop all particles
        anime.remove('#particle-red, #particle-blue, #particle-green');
        document.getElementById('particle-red').style.opacity = 0;
        document.getElementById('particle-blue').style.opacity = 0;
        document.getElementById('particle-green').style.opacity = 0;

        if (step === 1) {
            // STEP 1: SECURITY (Red)
            // Reveal Security Node
            anime({ targets: '#sat-auth', opacity: 1, translateY: [20, 0], duration: 800 });
            // Draw Line
            anime({ targets: '#line-auth', strokeDashoffset: [anime.setDashoffset, 0], opacity: 1, duration: 1000, easing: 'easeInOutSine' });
            
            // Particle: Auth -> Core (Red Block)
            anime({
                targets: '#particle-red',
                opacity: 1,
                cx: [200, 480], // Stop just before core
                cy: [200, 380],
                duration: 1500,
                loop: true,
                easing: 'easeOutExpo'
            });
        }

        else if (step === 2) {
            // STEP 2: CHANNELS (Blue)
            // Reveal Channels Node
            anime({ targets: '#sat-channels', opacity: 1, translateY: [20, 0], duration: 800 });
            // Draw Line
            anime({ targets: '#line-channels', strokeDashoffset: [anime.setDashoffset, 0], opacity: 1, duration: 1000, easing: 'easeInOutSine' });

            // Particle: Channels -> Core
            anime({
                targets: '#particle-blue',
                opacity: 1,
                cx: [800, 520],
                cy: [200, 380],
                duration: 1200,
                loop: true,
                easing: 'easeOutExpo'
            });
        }

        else if (step === 3) {
            // STEP 3: PROCESSING (Core Pulse)
            // Flash the server stack
            anime({
                targets: '#core-citadel path',
                stroke: ['#00d2ff', '#fff', '#00d2ff'],
                duration: 200,
                loop: 5,
                easing: 'linear'
            });
            // Expand core slightly
            anime({
                targets: '#core-citadel',
                scale: [1, 1.1, 1],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        }

        else if (step === 4) {
            // STEP 4: DATABASE (Green)
            // Reveal DB
            anime({ targets: '#sat-db', opacity: 1, scale: [0, 1], duration: 800 });
            // Draw Line Down
            anime({ targets: '#line-db', strokeDashoffset: [anime.setDashoffset, 0], opacity: 1, duration: 1000 });

            // Particle: Core -> DB
            anime({
                targets: '#particle-green',
                opacity: 1,
                cx: [500, 500],
                cy: [400, 650],
                duration: 1000,
                loop: true,
                easing: 'easeOutBounce'
            });
        }

        else if (step === 5) {
            // STEP 5: ANALYTICS (Purple)
            // Reveal Analytics
            anime({ targets: '#sat-analytics', opacity: 1, scale: [0, 1], duration: 800 });
            // Draw Line Up
            anime({ targets: '#line-analytics', strokeDashoffset: [anime.setDashoffset, 0], opacity: 1, duration: 1000 });

            // Particle: Core -> Analytics (Upwards)
            anime({
                targets: '#particle-blue', // Re-use blue particle
                opacity: 1,
                fill: '#e056fd',
                cx: [500, 500],
                cy: [400, 100],
                duration: 1500,
                loop: true,
                easing: 'easeOutExpo'
            });
        }
    }
});