constructor() {
    this.beakers = [];
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
    console.log("AR Lab Initializing");
}
}

document.addEventListener('DOMContentLoaded', () => {
    new ARChemistryLab();
});