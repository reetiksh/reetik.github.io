document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. UTILITIES ---
    const updateHUD = (progress) => {
        // Update Status Text based on progress
        const statusEl = document.getElementById('status-text');
        if (progress < 0.1) statusEl.innerText = "STANDBY";
        else if (progress < 0.4) statusEl.innerText = "SEPARATION SEQUENCE";
        else if (progress < 0.6) statusEl.innerText = "ANALYSIS MODE";
        else if (progress < 0.9) statusEl.innerText = "REASSEMBLY";
        else statusEl.innerText = "COMPLETE";

        // Update random coordinates for "Tech" feel
        document.getElementById('val-x').innerText = Math.floor(Math.random() * 99);
        document.getElementById('val-y').innerText = Math.floor(Math.random() * 99);
        
        // Progress Bar
        document.getElementById('progress-fill').style.width = `${progress * 100}%`;
    };

    // --- 2. ANIMATION TIMELINE ---
    // We use a linear easing for direct 1:1 scroll control
    const tl = anime.timeline({
        autoplay: false,
        easing: 'linear'
    });

    tl
    // === PHASE 1: INITIALIZATION ===
    .add({
        targets: '.intro-overlay',
        opacity: 0,
        scale: 0.8,
        duration: 500
    })
    .add({
        targets: '#guide-line',
        opacity: [0, 0.5],
        duration: 500
    })

    // === PHASE 2: DISASSEMBLY (Explosion) ===
    // 1. Detach Lens from Body
    .add({
        targets: '#grp-lens',
        translateX: 200, // Move lens right
        duration: 2000
    })
    .add({
        targets: '#grp-body',
        translateX: -100, // Body recoils left
        duration: 2000
    }, '-=2000')
    .add({
        targets: '#grp-mount',
        translateX: 50, // Mount ring floats in between
        opacity: 0.8,
        duration: 2000
    }, '-=2000')

    // 2. Explode Lens Internals
    .add({
        targets: '#lens-front',
        translateX: 250, // Front element flies far right
        duration: 2000
    }, 'explode')
    .add({
        targets: '#lens-mid',
        translateX: 150,
        duration: 2000
    }, 'explode')
    .add({
        targets: '#lens-aperture',
        translateX: 50,
        rotate: 180, // Rotate aperture ring
        duration: 2000
    }, 'explode')
    .add({
        targets: '#lens-rear',
        translateX: -20,
        duration: 2000
    }, 'explode')

    // 3. Eject Sensor from Body
    .add({
        targets: '#part-sensor',
        translateX: 120, // Move sensor out of body
        translateY: -50, // Lift it up slightly
        scale: 1.5,      // Magnify it
        duration: 2000
    }, 'explode')

    // === PHASE 3: INSPECTION (Hover State) ===
    // Open Aperture Blades
    .add({
        targets: '#blades path',
        opacity: 0.8,
        translateX: (el, i) => Math.cos(i * 60 * Math.PI / 180) * 10,
        translateY: (el, i) => Math.sin(i * 60 * Math.PI / 180) * 10,
        duration: 1000
    })
    // Show Info Panels
    .add({
        targets: '.tech-panel',
        opacity: 1,
        translateX: 0, // Slide in
        duration: 1000
    })

    // === PHASE 4: PAUSE (Hold state for user to read) ===
    .add({
        targets: '.perspective-grid',
        opacity: 0.8, // Brighten background
        duration: 2000 // Dummy duration to act as a pause
    })

    // === PHASE 5: REASSEMBLY (Reverse) ===
    // Hide panels
    .add({
        targets: '.tech-panel',
        opacity: 0,
        translateX: 50,
        duration: 500
    })
    // Retract Sensor
    .add({
        targets: '#part-sensor',
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 1500
    }, 'reassemble')
    // Collapse Lens Elements
    .add({
        targets: ['#lens-front', '#lens-mid', '#lens-aperture', '#lens-rear'],
        translateX: 0,
        rotate: 0,
        duration: 1500,
        easing: 'easeInOutQuad'
    }, 'reassemble')
    // Close Aperture
    .add({
        targets: '#blades path',
        translateX: 0,
        translateY: 0,
        duration: 1000
    }, '-=1500')
    // Connect Body & Lens
    .add({
        targets: ['#grp-lens', '#grp-body', '#grp-mount'],
        translateX: 0,
        duration: 2000,
        easing: 'easeInOutSine'
    });

    // --- 3. SCROLL LOGIC ---
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Clamp 0-1
        const safePercent = Math.min(Math.max(scrollPercent, 0), 1);

        // Seek Animation
        tl.seek(tl.duration * safePercent);

        // Update HUD
        updateHUD(safePercent);

        // Parallax Background Effect
        const grid = document.querySelector('.perspective-grid');
        grid.style.transform = `rotateX(60deg) scale(2) translateY(${scrollTop * 0.5}px)`;
    });

});