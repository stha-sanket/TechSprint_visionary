const DISTANCE_THRESHOLD = 0.4;
let reacted = false;
let particleSystem = null;

function distance(a, b) {
  const p1 = a.object3D.position;
  const p2 = b.object3D.position;
  return p1.distanceTo(p2);
}

// Reaction checker component
AFRAME.registerComponent("reaction-checker", {
  tick() {
    if (reacted) return;

    const acid = document.querySelector("#acid");
    const alcohol = document.querySelector("#alcohol");

    if (!acid || !alcohol) return;

    const dist = distance(acid, alcohol);

    // Visual feedback when molecules are close
    if (dist < DISTANCE_THRESHOLD * 1.5 && dist >= DISTANCE_THRESHOLD) {
      // You could add glow effect here
    }

    if (dist < DISTANCE_THRESHOLD) {
      reacted = true;
      console.log('Reaction triggered! Distance:', dist);
      runReaction(acid, alcohol);
    }
  }
});

// Create particle effect for reaction
function createParticles(position) {
  const scene = document.querySelector("a-scene");
  
  // Create sparkle effect with more vibrant colors
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("a-sphere");
    particle.setAttribute("radius", "0.03");
    
    // Alternate between gold, orange, and bright yellow
    const colors = ["#FFD700", "#FF8C00", "#FFF700", "#FF6B35"];
    particle.setAttribute("color", colors[i % colors.length]);
    particle.setAttribute("position", `${position.x} ${position.y} ${position.z}`);
    
    // Random velocity
    const vx = (Math.random() - 0.5) * 0.4;
    const vy = Math.random() * 0.4;
    const vz = (Math.random() - 0.5) * 0.4;
    
    particle.setAttribute("animation", {
      property: "position",
      to: `${position.x + vx} ${position.y + vy} ${position.z + vz}`,
      dur: 1200,
      easing: "easeOutQuad"
    });
    
    particle.setAttribute("animation__fade", {
      property: "opacity",
      from: 1,
      to: 0,
      dur: 1200,
      easing: "easeOutQuad"
    });
    
    scene.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 1300);
  }
}

function runReaction(acid, alcohol) {
  console.log('Running esterification reaction...');
  
  // Get mid-point for reaction center
  const midPoint = new THREE.Vector3();
  midPoint.addVectors(acid.object3D.position, alcohol.object3D.position);
  midPoint.multiplyScalar(0.5);

  // Create particles at reaction point
  createParticles(midPoint);

  // Hide reactants with fade out
  acid.setAttribute("animation", {
    property: "scale",
    to: "0 0 0",
    dur: 500,
    easing: "easeInQuad"
  });
  
  alcohol.setAttribute("animation", {
    property: "scale",
    to: "0 0 0",
    dur: 500,
    easing: "easeInQuad"
  });

  setTimeout(() => {
    acid.setAttribute("visible", false);
    alcohol.setAttribute("visible", false);
  }, 500);

  const scene = document.querySelector("a-scene");

  // Reaction Arrow - BOLD and COLORFUL
  setTimeout(() => {
    const arrow = document.createElement("a-text");
    arrow.setAttribute("value", "⚡ ESTERIFICATION REACTION ⚡");
    arrow.setAttribute("position", `${midPoint.x} ${midPoint.y + 0.8} ${midPoint.z}`);
    arrow.setAttribute("align", "center");
    arrow.setAttribute("width", "4");
    arrow.setAttribute("color", "#E74C3C"); // Bright red
    arrow.setAttribute("font", "roboto");
    arrow.setAttribute("shader", "msdf");
    arrow.setAttribute("animation", {
      property: "scale",
      from: "0 0 0",
      to: "1.2 1.2 1.2", // Larger scale
      dur: 500,
      easing: "easeOutElastic"
    });
    arrow.setAttribute("animation__pulse", {
      property: "scale",
      from: "1.2 1.2 1.2",
      to: "1.3 1.3 1.3",
      dur: 1000,
      dir: "alternate",
      loop: true,
      easing: "easeInOutSine"
    });
    scene.appendChild(arrow);
  }, 600);

  // Ester Product - INCREASED DISTANCE
  setTimeout(() => {
    const ester = document.createElement("a-entity");
    ester.setAttribute("id", "ester-product");
    ester.setAttribute("gltf-model", "/static/models/ester.glb");
    ester.setAttribute("scale", "0.015 0.015 0.015");
    ester.setAttribute("position", `${midPoint.x - 0.6} ${midPoint.y} ${midPoint.z}`); // Increased from -0.35 to -0.6
    ester.setAttribute("rotation", "0 0 0");
    scene.appendChild(ester);
    
    console.log('✅ Ester model loaded at:', midPoint.x - 0.6, midPoint.y, midPoint.z);
    console.log('Ester element:', ester);

    const esterLabel = document.createElement("a-text");
    esterLabel.setAttribute("value", "ESTER\n(R–COO–R')");
    esterLabel.setAttribute("position", `${midPoint.x - 0.6} ${midPoint.y + 0.4} ${midPoint.z}`); // Raised higher
    esterLabel.setAttribute("align", "center");
    esterLabel.setAttribute("color", "#00FF88"); // Bright green
    esterLabel.setAttribute("width", "2.5");
    esterLabel.setAttribute("font", "roboto");
    esterLabel.setAttribute("shader", "msdf");
    esterLabel.setAttribute("side", "double");
    esterLabel.setAttribute("animation", {
      property: "scale",
      from: "0 0 0",
      to: "0.6 0.6 0.6", // Larger bold text
      dur: 600,
      easing: "easeOutBack"
    });
    scene.appendChild(esterLabel);
    
    // Add glowing background for ester label
    const esterBg = document.createElement("a-plane");
    esterBg.setAttribute("position", `${midPoint.x - 0.6} ${midPoint.y + 0.4} ${midPoint.z - 0.01}`);
    esterBg.setAttribute("width", "0.8");
    esterBg.setAttribute("height", "0.4");
    esterBg.setAttribute("color", "#27AE60");
    esterBg.setAttribute("opacity", "0.3");
    esterBg.setAttribute("side", "double");
    scene.appendChild(esterBg);
    
    console.log('✅ Ester label created');
  }, 800);

  // Water Product - INCREASED DISTANCE
  setTimeout(() => {    
    const water = document.createElement("a-entity");
    water.setAttribute("id", "water-product");
    water.setAttribute("gltf-model", "/static/models/h2o_molecule.glb");
    water.setAttribute("scale", "0.7 0.7 0.7");
    water.setAttribute("position", `${midPoint.x + 1.6} ${midPoint.y} ${midPoint.z}`); // Increased from +0.35 to +0.6
    water.setAttribute("rotation", "0 0 0");
    scene.appendChild(water);
    
    console.log('✅ H2O model loaded at:', midPoint.x + 0.6, midPoint.y, midPoint.z);
    console.log('Water element:', water);

    const waterLabel = document.createElement("a-text");
    waterLabel.setAttribute("value", "WATER\n(H₂O)");
    waterLabel.setAttribute("position", `${midPoint.x + 0.6} ${midPoint.y + 0.4} ${midPoint.z}`); // Raised higher
    waterLabel.setAttribute("align", "center");
    waterLabel.setAttribute("color", "#00BFFF"); // Bright blue
    waterLabel.setAttribute("width", "2.5");
    waterLabel.setAttribute("font", "roboto");
    waterLabel.setAttribute("shader", "msdf");
    waterLabel.setAttribute("side", "double");
    waterLabel.setAttribute("animation", {
      property: "scale",
      from: "0 0 0",
      to: "0.6 0.6 0.6", // Larger bold text
      dur: 600,
      easing: "easeOutBack"
    });
    scene.appendChild(waterLabel);
    
    // Add glowing background for water label
    const waterBg = document.createElement("a-plane");
    waterBg.setAttribute("position", `${midPoint.x + 0.6} ${midPoint.y + 0.4} ${midPoint.z - 0.01}`);
    waterBg.setAttribute("width", "0.8");
    waterBg.setAttribute("height", "0.4");
    waterBg.setAttribute("color", "#3498DB");
    waterBg.setAttribute("opacity", "0.3");
    waterBg.setAttribute("side", "double");
    scene.appendChild(waterBg);
    
    console.log('✅ Water label created');
  }, 1000);

  // Success message - BOLD and ANIMATED
  setTimeout(() => {
    const success = document.createElement("a-text");
    success.setAttribute("value", "✓ REACTION COMPLETE!");
    success.setAttribute("position", `${midPoint.x} ${midPoint.y + 1.1} ${midPoint.z}`);
    success.setAttribute("align", "center");
    success.setAttribute("color", "#FFD700"); // Gold color
    success.setAttribute("width", "3");
    success.setAttribute("font", "roboto");
    success.setAttribute("shader", "msdf");
    success.setAttribute("side", "double");
    success.setAttribute("animation", {
      property: "scale",
      from: "0 0 0",
      to: "0.7 0.7 0.7", // Larger
      dur: 500,
      easing: "easeOutBack"
    });
    success.setAttribute("animation__glow", {
      property: "color",
      from: "#FFD700",
      to: "#FFA500",
      dur: 800,
      dir: "alternate",
      loop: true,
      easing: "easeInOutSine"
    });
    scene.appendChild(success);
    
    console.log('Reaction complete!');
  }, 1200);
}

// Attach reaction checker to scene
document.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector("a-scene");
  if (scene) {
    scene.setAttribute("reaction-checker", "");
    console.log('Reaction checker attached to scene');
  }
});

console.log('Reactions system initialized');
console.log('Distance threshold:', DISTANCE_THRESHOLD);