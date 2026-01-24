document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SET UP THE APERTURE BLADES
    // We rotate each blade around the center to form the hexagon iris shape
    const blades = document.querySelectorAll('.blade');
    blades.forEach((blade, i) => {
        // Distribute blades in a circle (6 blades = 60 degrees apart)
        anime.set(blade, {
            rotate: i * 60,
            transformOrigin: '0 0' // Pivot from center
        });
    });

    // 2. MAIN TIMELINE ANIMATION
    const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 2000
    });

    // Step A: Draw the outer rings (Stroke Animation)
    tl.add({
        targets: '.ring-outer',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2500,
        easing: 'easeInOutSine'
    })
    .add({
        targets: '.ring-mid',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2000,
        easing: 'easeInOutSine'
    }, '-=2000') // Overlap
    
    // Step B: "Open" the Aperture (Rotate blades outward)
    .add({
        targets: '.blade',
        translateY: [0, -60], // Move blades outward to open hole
        translateX: [0, 20],
        rotate: (el, i) => i * 60 + 20, // Add slight rotation for realism
        opacity: [0, 1],
        duration: 1500,
        delay: anime.stagger(100)
    }, '-=1500')

    // Step C: Lens Glare (Flash)
    .add({
        targets: '.lens-glare',
        opacity: [0, 0.4, 0],
        scale: [0.5, 1.2],
        duration: 800,
        easing: 'easeOutQuad'
    }, '-=800')

    // Step D: Reveal Text
    .add({
        targets: 'h1',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad'
    }, '-=500')
    .add({
        targets: '.subtitle, .scroll-indicator',
        opacity: [0, 1],
        duration: 1000
    }, '-=800');

    // 3. INTERACTIVE HOVER EFFECT ON LENS
    const wrapper = document.querySelector('.animation-wrapper');
    
    wrapper.addEventListener('mouseenter', () => {
        // Close the aperture slightly on hover (Focus effect)
        anime({
            targets: '.blade',
            translateY: -30, // Move back in
            duration: 500,
            easing: 'easeOutQuad'
        });
        anime({
            targets: '.ring-outer',
            rotate: 180,
            duration: 1000,
            easing: 'easeOutQuad'
        });
    });

    wrapper.addEventListener('mouseleave', () => {
        // Open back up
        anime({
            targets: '.blade',
            translateY: -60,
            duration: 500,
            easing: 'easeOutQuad'
        });
    });
});