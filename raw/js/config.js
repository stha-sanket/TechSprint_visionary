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
        hitBoxRadius: 0.5,
        hitBoxHeight: 0.1,
        label: {
            y: -0.2,            // Position below the beaker
            z: 0.4,             // Moved further ahead (Z-index)
            width: 2.5,        // Text width
            scale: "1.5 1.5 1.5", // Text size
            color: "#ffffff",
            backgroundColor: "#222",
            backgroundOpacity: 0.7,
            displayDuration: 4000 // How long to show the label (ms)
        }
    },

    // Interaction Logic Configuration
    interaction: {
        mixingDistance: 0.5, // Threshold to trigger chemical reaction
        pourDisplacement: 0.6, // Horizontal distance from target during pour
        liftHeight: 0.3, // Vertical lift before tilt
        tiltAngle: 45, // Degrees to tilt during pour
        moveDuration: 1000, // Duration of horizontal move (ms)
        liftDuration: 400, // Duration of vertical lift (ms)
        tiltDuration: 1000, // Duration of tilt (ms)
        reactionDelay: 4000 // Time before transformation into product (ms)
    }
};
