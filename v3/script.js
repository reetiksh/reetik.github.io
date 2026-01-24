document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INTRO ANIMATION SEQUENCE ---
    var tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });

    tl
    .add({
        targets: '.hud-nav',
        translateY: [-100, 0],
        opacity: [0, 1]
    })
    .add({
        targets: '.hero-name',
        translateX: [-100, 0],
        opacity: [0, 1],
        skewX: [-20, -5]
    }, '-=500')
    .add({
        targets: '.bar-fill',
        width: '100%',
        duration: 1500,
        easing: 'easeInOutQuad'
    })
    .add({
        targets: '.floating-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
    }, '-=1000');

    // --- 2. FLOATING BACKGROUND OBJECTS ---
    const shapeContainer = document.getElementById('floating-shapes');
    const colors = ['#ff2a6d', '#05d9e8', '#f9c80e'];

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Random Properties
        const size = Math.random() * 50 + 10;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random Shapes (Circle vs Square vs Triangle)
        const type = Math.random();
        if(type > 0.6) shape.style.borderRadius = '50%';
        else if (type > 0.3) shape.style.transform = 'rotate(45deg)';
        
        shapeContainer.appendChild(shape);

        // Animate Floating
        anime({
            targets: shape,
            translateY: function() { return anime.random(-200, 200); },
            translateX: function() { return anime.random(-200, 200); },
            rotate: function() { return anime.random(0, 360); },
            duration: function() { return anime.random(3000, 8000); },
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true
        });
    }

    // --- 3. SCROLL OBSERVER FOR "FLYING IN" SECTIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine what kind of element it is to animate
                if (entry.target.classList.contains('mission-entry')) {
                    anime({
                        targets: entry.target,
                        translateX: [-100, 0],
                        opacity: [0, 1],
                        easing: 'spring(1, 80, 10, 0)'
                    });
                } 
                else if (entry.target.classList.contains('card')) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(100),
                        easing: 'easeOutQuad'
                    });
                }
                else if (entry.target.classList.contains('timeline-item')) {
                     // Check left or right
                     let xStart = entry.target.classList.contains('left') ? -50 : 50;
                     anime({
                        targets: entry.target,
                        translateX: [xStart, 0],
                        opacity: [0, 1],
                        easing: 'easeOutCubic'
                     });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.mission-entry, .card, .timeline-item').forEach(el => {
        el.style.opacity = 0; // Hide initially
        observer.observe(el);
    });

    // --- 4. HOVER EFFECTS (Particles on Hover) ---
    // Simple hover shake effect is handled in CSS, 
    // but we can add data-glitch effects here if needed in v2.
});