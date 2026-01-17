class ARChemistryLab {
    constructor() {
        this.beakers = [];
        this.placedBeakers = 0;
        this.isMixing = false;
        this.reticle = null;
        this.heldBeaker = null;
        this.heldBeakerData = null;
        this.lastClickTime = 0;
        this.setupDebugLogger();
        this.init();
    }

    setupDebugLogger() {
        const overlay = document.getElementById('debug-overlay');
        const originalLog = console.log;
        const logs = [];

        console.log = (...args) => {
            originalLog.apply(console, args);
            const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
            logs.push(msg);
            if (logs.length > 5) logs.shift();
            if (overlay) overlay.textContent = logs.join('\n');
        };

        console.log("AR Lab Ready");
    }

    init() {
        document.querySelector('a-scene').addEventListener('loaded', () => {
            this.reticle = document.querySelector('#reticle');
            this.createBeakerModels();
            this.setupEventListeners();
            this.setupWebXR();
            this.startReticleLoop();
        });
    }

    createBeakerModels() {
        const chemicals = [
            { id: 'A', name: 'HCl', color: '#ff6b6b', label: 'Acid' },
            { id: 'B', name: 'NaOH', color: '#4d96ff', label: 'Base' }
        ];

        this.beakers = chemicals.map(chem => ({
            ...chem,
            element: null,
            position: null,
            isPlaced: false
        }));
    }

    setupWebXR() {
        const scene = document.querySelector('a-scene');

        if (!navigator.xr) {
            alert("WebXR not supported. Try Chrome on Android.");
            return;
        }

        scene.addEventListener('enter-vr', () => {
            if (scene.is('ar-mode')) {
                document.getElementById('loading').style.display = 'none';
                this.showInstruction("Find a flat surface, then tap to place beakers");
                if (this.reticle) this.reticle.setAttribute('visible', true);
                const plane = document.querySelector('#ar-plane');
                if (plane) plane.setAttribute('visible', true);
                console.log("Entered AR Mode");
            }
        });

        scene.addEventListener('exit-vr', () => {
            console.log("Exiting AR Mode");
            document.getElementById('loading').style.display = 'flex';
            if (this.reticle) this.reticle.setAttribute('visible', false);
            const plane = document.querySelector('#ar-plane');
            if (plane) plane.setAttribute('visible', false);
        });

        document.getElementById('start-ar').addEventListener('click', () => {
            scene.enterAR();
        });
    }

    setupEventListeners() {
        const scene = document.querySelector('a-scene');

        // Tap to place or pick/drop beakers
        scene.addEventListener('click', (e) => {
            if (!scene.is('ar-mode')) return;

            // Debounce
            const now = Date.now();
            if (now - this.lastClickTime < 300) return;
            this.lastClickTime = now;

            const intersection = e.detail.intersection;

            // 1. If holding a beaker, drop it
            if (this.heldBeaker) {
                console.log("Released " + this.heldBeakerData.id);
                this.heldBeaker.removeAttribute('animation');
                this.heldBeaker.setAttribute('scale', '1 1 1');
                this.heldBeaker = null;
                this.heldBeakerData = null;
                return;
            }

            // 2. Check if picking up
            const beakerEl = e.target.closest('.beaker') ||
                (intersection && intersection.object.el.closest('.beaker'));

            if (beakerEl && !this.isMixing) {
                const beakerId = beakerEl.getAttribute('id').replace('beaker-', '');
                const beakerData = this.beakers.find(b => b.id === beakerId);

                if (beakerData) {
                    console.log("Held " + beakerId);
                    this.heldBeaker = beakerEl;
                    this.heldBeakerData = beakerData;
                    this.heldBeaker.setAttribute('animation', {
                        property: 'scale',
                        to: '1.2 1.2 1.2',
                        dir: 'alternate',
                        dur: 500,
                        loop: true
                    });
                }
                return;
            }

            // 3. Otherwise, place a new beaker
            if (this.placedBeakers < 2 && this.reticle && this.reticle.getAttribute('visible')) {
                const position = this.reticle.getAttribute('position');
                console.log("Placing beaker at " + position.x.toFixed(2));
                this.placeBeaker(position);
            }
        });
    }

    placeBeaker(position) {
        if (this.placedBeakers >= 2) return;

        const beakerData = this.beakers[this.placedBeakers];
        const scene = document.querySelector('#ar-content');

        // Create beaker entity
        const beaker = document.createElement('a-entity');
        beaker.setAttribute('id', `beaker-${beakerData.id}`);
        beaker.setAttribute('position', position);

        // 3D Model with larger invisible hit-box
        beaker.innerHTML = `
            <!-- Invisible Hit-box -->
            <a-cylinder class="hit-box" radius="0.25" height="0.4" 
                       position="0 0.1 0" material="opacity: 0; transparent: true; visible: false" 
                       data-raycastable>
            </a-cylinder>
            
            <!-- The 3D Beaker Model (Glass) -->
            <a-gltf-model src="#beaker-model" scale="25 25 25" data-raycastable></a-gltf-model>
            
            <!-- Solid Liquid Component -->
            <a-cylinder class="beaker-liquid" radius="0.05" height="0.15" 
                       position="0 0.07 0" color="${beakerData.color}" opacity="0.9" data-raycastable>
            </a-cylinder>
            
            <a-text class="beaker-label" value="${beakerData.name}\n${beakerData.label}"
                   position="0 0.4 0" align="center" color="white" width="3" data-raycastable>
            </a-text>
        `;

        scene.appendChild(beaker);

        beakerData.element = beaker;
        beakerData.position = position;
        beakerData.isPlaced = true;
        this.placedBeakers++;

        if (this.placedBeakers === 2) {
            this.showInstruction("Beakers placed. Ready for next step.");
        }
    }

    checkForMixing(beakerA, beakerDataA) {
        if (this.isMixing) return;

        const posA = beakerA.getAttribute('position');

        this.beakers.forEach(beakerB => {
            if (!beakerB.isPlaced || beakerB.id === beakerDataA.id) return;

            const posB = beakerB.element.getAttribute('position');
            const distance = Math.sqrt(
                Math.pow(posA.x - posB.x, 2) +
                Math.pow(posA.z - posB.z, 2)
            );

            // If beakers are close enough
            if (distance < 0.25) {
                this.mixChemicals(beakerDataA, beakerB);
            }
        });
    }

    mixChemicals(beakerDataA, beakerDataB) {
        this.isMixing = true;

        const pourer = beakerDataA.element;
        const target = beakerDataB.element;

        const posA = pourer.getAttribute('position');
        const posB = target.getAttribute('position');

        const dx = posB.x - posA.x;
        const dz = posB.z - posA.z;

        // Reset held state
        if (this.heldBeaker) {
            this.heldBeaker.removeAttribute('animation');
            this.heldBeaker.setAttribute('scale', '1 1 1');
            this.heldBeaker = null;
            this.heldBeakerData = null;
        }

        console.log("Starting animation sequence...");

        const angleRad = Math.atan2(dx, dz);

        // Stage 1: Move Up
        pourer.setAttribute('animation__up', {
            property: 'position',
            to: `${posA.x} ${posA.y + 0.3} ${posA.z}`,
            dur: 800,
            easing: 'easeOutQuad'
        });

        // Stage 2: Tilt towards target
        setTimeout(() => {
            const tiltAngle = 55;
            const tiltAroundX = Math.cos(angleRad) * tiltAngle;
            const tiltAroundZ = -Math.sin(angleRad) * tiltAngle;

            pourer.setAttribute('animation__tilt', {
                property: 'rotation',
                to: `${tiltAroundX} 0 ${tiltAroundZ}`,
                dur: 1000,
                easing: 'easeInQuad'
            });

            pourer.setAttribute('animation__closer', {
                property: 'position',
                to: `${posA.x + dx * 0.4} ${posA.y + 0.3} ${posA.z + dz * 0.4}`,
                dur: 1000,
                easing: 'easeInQuad'
            });
        }, 800);

        const reaction = ReactionEngine.getReaction(beakerDataA.name, beakerDataB.name);
        this.showReactionEffect(pourer, target, reaction);
        this.showReactionPanel(reaction);
    }

    showReactionPanel(reaction) {
        if (!reaction) return;
        const panel = document.querySelector('#reaction-panel');
        const text = document.querySelector('#reaction-text');

        text.setAttribute('value',
            `${reaction.name}\n\n${reaction.description}\n\nProducts: ${reaction.products}`
        );
        panel.setAttribute('visible', 'true');

        setTimeout(() => {
            panel.setAttribute('visible', 'false');
        }, 5000);
    }

    showReactionEffect(beakerElA, beakerElB, reaction) {
        if (!reaction) return;
        const posA = beakerElA.getAttribute('position');
        const posB = beakerElB.getAttribute('position');
        const centerPos = {
            x: (posA.x + posB.x) / 2,
            y: (posA.y + posB.y) / 2 + 0.2,
            z: (posA.z + posB.z) / 2
        };

        const effect = document.createElement('a-entity');
        effect.setAttribute('position', centerPos);

        if (reaction.effect === 'confetti') {
            const colors = ['#f1c40f', '#e67e22', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71'];
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('a-plane');
                particle.setAttribute('width', '0.02');
                particle.setAttribute('height', '0.04');
                particle.setAttribute('color', colors[Math.floor(Math.random() * colors.length)]);
                particle.setAttribute('material', 'side: double');

                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI / 2;
                const r = 0.5 + Math.random() * 0.5;
                const vx = r * Math.sin(phi) * Math.cos(theta);
                const vy = r * Math.cos(phi);
                const vz = r * Math.sin(phi) * Math.sin(theta);

                particle.setAttribute('animation__pos', {
                    property: 'position',
                    from: '0 0 0',
                    to: `${vx} ${vy} ${vz}`,
                    dur: 1000 + Math.random() * 1000,
                    easing: 'easeOutQuad'
                });

                effect.appendChild(particle);
            }
        }

        document.querySelector('#ar-content').appendChild(effect);
        setTimeout(() => {
            if (effect.parentNode) effect.parentNode.removeChild(effect);
        }, 3000);
    }

    startReticleLoop() {
        const scene = document.querySelector('a-scene');
        const update = () => {
            if (scene.is('ar-mode') && this.reticle) {
                const cursor = document.querySelector('a-cursor');
                if (cursor && cursor.components.raycaster) {
                    const intersections = cursor.components.raycaster.intersections;
                    const planeHit = intersections.find(i => i.object.el.id === 'ar-plane');

                    if (planeHit) {
                        this.reticle.setAttribute('position', planeHit.point);
                        this.reticle.setAttribute('visible', true);

                        // If holding a beaker, move it to reticle position
                        if (this.heldBeaker && !this.isMixing) {
                            this.heldBeaker.setAttribute('position', planeHit.point);
                            this.checkForMixing(this.heldBeaker, this.heldBeakerData);
                        }
                    } else if (!this.heldBeaker) {
                        // Position reticle in front...
                    }
                }
            }
            requestAnimationFrame(update);
        };
        update();
    }

    showInstruction(text) {
        const instruction = document.querySelector('#instruction');
        if (instruction) instruction.setAttribute('value', text);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ARChemistryLab();
});