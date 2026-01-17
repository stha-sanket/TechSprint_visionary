class ARChemistryLab {
    constructor() {
        this.beakers = [];
        this.placedBeakers = 0;
        this.isMixing = false;
        this.reticle = null;
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