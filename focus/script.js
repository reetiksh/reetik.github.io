document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.querySelector('.lens-container');
    const numberOfRings = 60; // How dense the lens is
    
    // 1. GENERATE THE LENS RINGS
    // We create divs programmatically to ensure perfect geometry
    for (let i = 0; i < numberOfRings; i++) {
        const ring = document.createElement('div');
        ring.classList.add('lens-ring');
        container.appendChild(ring);
    }

    const rings = document.querySelectorAll('.lens-ring');

    // 2. SET INITIAL SIZES
    // This makes the rings concentric (fitting inside each other)
    rings.forEach((ring, i) => {
        // Calculate size: largest ring = screen width/height
        const size = (i + 1) * 35; // 35px gap between rings
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
    });

    // 3. THE MAIN "BREATHING LENS" ANIMATION
    // This replicates the Anime.js homepage style stagger
    
    let animation = anime.timeline({
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });

    animation
    .add({
        targets: '.lens-ring',
        // Scale from 0 (center) to 1 (full size)
        scale: [0, 1],
        
        // Rotate slightly to give the "Aperture" mechanical feel
        rotate: {
            value: [180, 0],
            duration: 2000,
            easing: 'easeInOutQuad'
        },
        
        // The opacity ripple
        opacity: {
            value: [0, 0.5, 0.2],
            duration: 2000,
            easing: 'linear'
        },

        // Border width change (thin to thick to thin)
        borderWidth: {
            value: ['1px', '4px', '1px'],
            duration: 2000
        },

        // THE MAGIC SAUCE: Staggering
        // This creates the wave delay between each ring
        delay: anime.stagger(100, {grid: [1, numberOfRings], from: 'center'}),
        
        duration: 2000,
        endDelay: 500
    });

    // 4. TEXT REVEAL ANIMATION (Runs once)
    anime.timeline()
    .add({
        targets: '.title',
        opacity: [0, 1],
        scale: [0.8, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        duration: 1500,
        delay: 1000, // Wait for lens to start
        easing: 'easeOutExpo'
    })
    .add({
        targets: '.subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad'
    }, '-=1000')
    .add({
        targets: '.btn',
        opacity: [0, 1],
        duration: 800,
        easing: 'linear'
    }, '-=800');

    // 5. INTERACTIVE MOUSE EFFECT
    // Distort the lens slightly based on mouse position
    container.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        anime({
            targets: '.lens-container',
            translateX: mouseX * 50, // Move 50px max
            translateY: mouseY * 50,
            rotateX: mouseY * 10,
            rotateY: mouseX * 10,
            duration: 1000,
            easing: 'easeOutQuad'
        });
    });

});