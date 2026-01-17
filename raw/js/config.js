window.LAB_CONFIG = {
    // Placement Reticle Configuration
    reticle: {
        radiusInner: 0.2,
        radiusOuter: 0.25,
        color: "#3498db"
    },

    // Beaker (Acid, Base, Product) Configuration
    beaker: {
        scale: { x: 0.5, y: 0.5, z: 0.5 },
        hitBoxRadius: 0.2,
        hitBoxHeight: 0.1,
        labelY: 0.05,
        labelWidth: 1
    },

    // Interaction Logic Configuration
    interaction: {
        mixingDistance: 1 // Threshold to trigger chemical reaction
    }
};
