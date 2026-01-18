import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganicReaction.css";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import type { RootState } from "../../../../../redux/store";
import { fetchChaptersBySubjectAndId } from "../../../../../redux/slices/chapterSlice";
import { useParams } from "react-router-dom";

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "a-scene": any;
        "a-assets": any;
        "a-asset-item": any;
        "a-entity": any;
        "a-camera": any;
        "a-cursor": any;
        "a-ring": any;
        "a-text": any;
        "a-plane": any;
        "a-cylinder": any;
        "a-gltf-model": any;
      }
    }
  }
}

const LAB_CONFIG = {
  reticle: {
    radiusInner: 0.2,
    radiusOuter: 0.25,
    color: "#3498db",
  },
  beaker: {
    scale: { x: 0.5, y: 0.5, z: 0.5 },
    hitBoxRadius: 0.5,
    hitBoxHeight: 0.1,
    label: {
      y: -0.2,
      z: 0.4,
      width: 2.5,
      scale: "1.5 1.5 1.5",
      color: "#ffffff",
      backgroundColor: "#222",
      backgroundOpacity: 0.7,
      displayDuration: 4000,
    },
  },
  interaction: {
    mixingDistance: 0.5,
    pourDisplacement: 0.6,
    liftHeight: 0.3,
    tiltAngle: 45,
    moveDuration: 1000,
    liftDuration: 400,
    tiltDuration: 1000,
    reactionDelay: 4000,
  },
};

const InorganicReaction: React.FC = () => {
  const sceneRef = useRef<any>(null);
  const reticleRef = useRef<any>(null);
  const [isARMode, setIsARMode] = useState(false);
  const placedBeakersRef = useRef(0);
  const isMixingRef = useRef(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isReactionComplete, setIsReactionComplete] = useState(false);
  const navigate = useNavigate();

  const { chapterId } = useParams<{ chapterId: string }>();

  const dispatch = useAppDispatch();

  const { chapter, loading } = useAppSelector(
    (state: RootState) => state.chapter,
  );

  useEffect(() => {
    if (chapterId) {
      dispatch(
        fetchChaptersBySubjectAndId({ subject: "Chemistry", id: chapterId }),
      );
    }
  }, [dispatch, chapterId]);

  const currentChapter = chapter[0];

  const REACTIONS = useMemo(() => {
    if (!currentChapter) return [];
    return [
      {
        reactants: currentChapter.description.reactants,
        name: currentChapter.description.name,
        products: currentChapter.description.products,
        description: currentChapter.description.description,
        effect: currentChapter.description.effect,
        color: currentChapter.description.color,
        productModelId: "#product-model",
      },
    ];
  }, [currentChapter]);

  const reactionsRef = useRef<any[]>([]);
  useEffect(() => {
    reactionsRef.current = REACTIONS;
    console.log("Updated reactionsRef:", reactionsRef.current);
  }, [REACTIONS]);

  const beakersRef = useRef<any[]>([]);

  useEffect(() => {
    if (currentChapter) {
      beakersRef.current = [
        {
          id: "A",
          name: currentChapter.description.reactants[0],
          color: "#ff6b6b",
          label: "Reactant 1",
          isPlaced: false,
          element: null,
          modelId: "#reactant1-model",
        },
        {
          id: "B",
          name: currentChapter.description.reactants[1],
          color: "#4d96ff",
          label: "Reactant 2",
          isPlaced: false,
          element: null,
          modelId: "#reactant2-model",
        },
      ];
    }
  }, [currentChapter]);

  const heldBeakerRef = useRef<any>(null);
  const heldBeakerDataRef = useRef<any>(null);
  const lastClickTimeRef = useRef(0);

  const showInstruction = (text: string) => {
    const instruction = document.querySelector("#instruction");
    if (instruction) instruction.setAttribute("value", text);
  };

  const placeBeaker = (position: any) => {
    if (placedBeakersRef.current >= 2) return;

    const beakerData = beakersRef.current[placedBeakersRef.current];
    const arContent = document.querySelector("#ar-content");
    if (!arContent) return;

    const beaker = document.createElement("a-entity");
    beaker.setAttribute("id", `beaker-${beakerData.id}`);
    beaker.setAttribute("class", "beaker");
    beaker.setAttribute("position", position);

    const modelId = beakerData.modelId;
    const config = LAB_CONFIG.beaker;

    beaker.innerHTML = `
      <a-cylinder class="hit-box" radius="${config.hitBoxRadius}" height="${config.hitBoxHeight}" 
                 position="0 ${config.hitBoxHeight / 2} 0" material="opacity: 0; transparent: true; visible: false">
      </a-cylinder>
      <a-gltf-model src="${modelId}" scale="${config.scale.x} ${config.scale.y} ${config.scale.z}"></a-gltf-model>
      <a-text class="beaker-label"
             value="${beakerData.name}\\n${beakerData.label}"
             position="0 ${config.label.y} ${config.label.z}" 
             align="center" 
             color="${config.label.color}" 
             width="${config.label.width}"
             scale="${config.label.scale}"
             font="mozillavr"
             wrap-count="15"
             background="color: ${config.label.backgroundColor}; opacity: ${config.label.backgroundOpacity}"
             padding="0.05">
      </a-text>
    `;

    setTimeout(() => {
      const label = beaker.querySelector(".beaker-label");
      if (label) label.setAttribute("visible", "false");
    }, config.label.displayDuration);

    arContent.appendChild(beaker);
    beakerData.element = beaker;
    beakerData.isPlaced = true;

    const newCount = placedBeakersRef.current + 1;
    placedBeakersRef.current = newCount;

    if (newCount === 2) {
      showInstruction("Beakers placed. Bring them close to mix.");
    } else {
      showInstruction("Place the second beaker");
    }

    console.log(`Placed ${beakerData.name}`);
  };

  const showReactionPanel = (reaction: any) => {
    const panel = document.querySelector("#reaction-panel") as any;
    const text = document.querySelector("#reaction-text") as any;
    if (!panel || !text) return;

    text.setAttribute(
      "value",
      `${reaction.name}\\n\\n${reaction.description}\\n\\nProducts: ${reaction.products}`,
    );
    panel.setAttribute("visible", "true");

    setTimeout(() => {
      panel.setAttribute("visible", "false");
    }, 5000);
  };

  const showReactionEffect = (posA: any, posB: any, reaction: any) => {
    const arContent = document.querySelector("#ar-content");
    if (!arContent) return;

    const centerPos = {
      x: (posA.x + posB.x) / 2,
      y: (posA.y + posB.y) / 2 + 0.2,
      z: (posA.z + posB.z) / 2,
    };

    const effect = document.createElement("a-entity");
    (effect as any).setAttribute("position", centerPos);

    if (reaction.effect === "confetti") {
      const colors = [
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#9b59b6",
        "#3498db",
        "#2ecc71",
      ];
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("a-plane");
        particle.setAttribute("width", "0.02");
        particle.setAttribute("height", "0.04");
        particle.setAttribute(
          "color",
          colors[Math.floor(Math.random() * colors.length)],
        );
        particle.setAttribute("material", "side: double");

        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() * Math.PI) / 2;
        const r = 0.5 + Math.random() * 0.5;
        const vx = r * Math.sin(phi) * Math.cos(theta);
        const vy = r * Math.cos(phi);
        const vz = r * Math.sin(phi) * Math.sin(theta);

        (particle as any).setAttribute("animation__pos", {
          property: "position",
          from: "0 0 0",
          to: `${vx} ${vy} ${vz}`,
          dur: 1000 + Math.random() * 1000,
          easing: "easeOutQuad",
        });
        effect.appendChild(particle);
      }
    }

    arContent.appendChild(effect);
    setTimeout(() => {
      if (effect.parentNode) effect.parentNode.removeChild(effect);
    }, 3000);
  };

  const createProductBeaker = (position: any, reaction: any) => {
    console.log(
      "Creating product beaker at:",
      position,
      "with reaction:",
      reaction,
    );
    const arContent = document.querySelector("#ar-content");
    if (!arContent) {
      console.error("AR content container not found!");
      return;
    }

    const product = document.createElement("a-entity");
    product.setAttribute("class", "beaker product");
    // Ensure position is a string for A-Frame
    const posStr = `${position.x} ${position.y} ${position.z}`;
    product.setAttribute("position", posStr);
    product.setAttribute("id", "product-beaker");

    const config = LAB_CONFIG.beaker;
    const modelId = reaction?.productModelId || "#product-model";
    const productName = reaction?.products || "Unknown Product";

    console.log("Using modelId:", modelId, "for product:", productName);

    product.innerHTML = `
      <a-gltf-model src="${modelId}" scale="${config.scale.x} ${config.scale.y} ${config.scale.z}"></a-gltf-model>
      <a-text class="beaker-label"
             value="Product:\\n${productName}" 
             position="0 ${config.label.y} ${config.label.z}" 
             align="center" 
             color="${config.label.color}" 
             width="${config.label.width}"
             scale="${config.label.scale}"
             font="mozillavr"
             wrap-count="20"
             background="color: ${config.label.backgroundColor}; opacity: ${config.label.backgroundOpacity}"
             padding="0.05">
      </a-text>
      <a-text value="(Tap to Reset)" position="0 -0.1 0" align="center" color="#aaa" width="0.8"></a-text>
    `;

    arContent.appendChild(product);
    product.addEventListener("click", () => window.location.reload());
    console.log("Product beaker added to scene.");
  };

  const mixChemicals = (pourerData: any, targetData: any) => {
    if (isMixingRef.current) return;
    isMixingRef.current = true;

    const pourer = pourerData.element;
    const target = targetData.element;

    const pP = pourer.getAttribute("position");
    const pT = target.getAttribute("position");
    const posPourer = { x: pP.x, y: pP.y, z: pP.z };
    const posTarget = { x: pT.x, y: pT.y, z: pT.z };

    const dx = posTarget.x - posPourer.x;
    const dz = posTarget.z - posPourer.z;

    if (heldBeakerRef.current) {
      heldBeakerRef.current.removeAttribute("animation");
      heldBeakerRef.current.setAttribute("scale", "1 1 1");
      heldBeakerRef.current = null;
      heldBeakerDataRef.current = null;
    }

    console.log(`Mixing: ${pourerData.name} + ${targetData.name}`);

    const dist = Math.sqrt(dx * dx + dz * dz) || 0.001;
    const ux = dx / dist;
    const uz = dz / dist;

    const config = LAB_CONFIG.interaction;
    const targetPosX = posTarget.x - ux * config.pourDisplacement;
    const targetPosZ = posTarget.z - uz * config.pourDisplacement;

    pourer.setAttribute("animation__move", {
      property: "position",
      to: `${targetPosX} ${posTarget.y} ${targetPosZ}`,
      dur: config.moveDuration,
      easing: "easeInOutQuad",
    });

    setTimeout(() => {
      pourer.setAttribute("animation__up", {
        property: "position",
        to: `${targetPosX} ${posTarget.y + config.liftHeight} ${targetPosZ}`,
        dur: config.liftDuration,
        easing: "easeOutQuad",
      });
    }, config.moveDuration);

    const angleRad = Math.atan2(dx, dz);
    setTimeout(() => {
      const tiltAroundX = Math.cos(angleRad) * config.tiltAngle;
      const tiltAroundZ = -Math.sin(angleRad) * config.tiltAngle;

      pourer.setAttribute("animation__tilt", {
        property: "rotation",
        to: `${tiltAroundX} 0 ${tiltAroundZ}`,
        dur: config.tiltDuration,
        easing: "easeInQuad",
      });
    }, config.moveDuration + config.liftDuration);

    const reaction = reactionsRef.current.find(
      (r) =>
        r.reactants.some(
          (name: string) =>
            name.toLowerCase() === pourerData.name.toLowerCase(),
        ) &&
        r.reactants.some(
          (name: string) =>
            name.toLowerCase() === targetData.name.toLowerCase(),
        ),
    );

    console.log("Found reaction from ref:", reaction);

    if (reaction) {
      showReactionEffect(posPourer, posTarget, reaction);
      showReactionPanel(reaction);
    }

    const productPos = {
      x: (posPourer.x + posTarget.x) / 2,
      y: posTarget.y,
      z: (posPourer.z + posTarget.z) / 2,
    };

    setTimeout(() => {
      if (pourer && pourer.parentNode) pourer.parentNode.removeChild(pourer);
      if (target && target.parentNode) target.parentNode.removeChild(target);

      pourerData.isPlaced = false;
      targetData.isPlaced = false;

      createProductBeaker(productPos, reaction);
      isMixingRef.current = false;
      setIsReactionComplete(true);
    }, config.reactionDelay);
  };

  const checkForMixing = (movingBeakerData: any) => {
    if (isMixingRef.current || !movingBeakerData.isPlaced) return;

    beakersRef.current.forEach((otherBeakerData) => {
      if (movingBeakerData === otherBeakerData || !otherBeakerData.isPlaced)
        return;

      const posA = movingBeakerData.element.getAttribute("position");
      const posB = otherBeakerData.element.getAttribute("position");
      const distance = Math.sqrt(
        Math.pow(posA.x - posB.x, 2) + Math.pow(posA.z - posB.z, 2),
      );

      if (distance < LAB_CONFIG.interaction.mixingDistance) {
        mixChemicals(movingBeakerData, otherBeakerData);
      }
    });
  };

  const startAR = () => {
    const scene = sceneRef.current;
    if (scene) scene.enterAR();
  };

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleLoaded = () => {
      console.log("AR Scene Loaded");
    };

    const handleSceneClick = (e: any) => {
      if (!scene.is("ar-mode")) return;

      const now = Date.now();
      if (now - lastClickTimeRef.current < 300) return;
      lastClickTimeRef.current = now;

      const intersection = e.detail.intersection;

      if (heldBeakerRef.current) {
        console.log("Released " + heldBeakerDataRef.current.id);
        heldBeakerRef.current.removeAttribute("animation");
        heldBeakerRef.current.setAttribute("scale", "1 1 1");
        heldBeakerRef.current = null;
        heldBeakerDataRef.current = null;
        return;
      }

      const beakerEl =
        e.target.closest(".beaker") ||
        (intersection && intersection.object.el.closest(".beaker"));

      if (beakerEl && !isMixingRef.current) {
        const beakerId = beakerEl.getAttribute("id").replace("beaker-", "");
        const beakerData = beakersRef.current.find((b) => b.id === beakerId);

        if (beakerData) {
          console.log("Held " + beakerId);
          heldBeakerRef.current = beakerEl;
          heldBeakerDataRef.current = beakerData;
          heldBeakerRef.current.setAttribute("animation", {
            property: "scale",
            to: "1.2 1.2 1.2",
            dir: "alternate",
            dur: 500,
            loop: true,
          });
        }
        return;
      }

      if (
        placedBeakersRef.current < 2 &&
        reticleRef.current &&
        reticleRef.current.getAttribute("visible")
      ) {
        const position = reticleRef.current.getAttribute("position");
        placeBeaker(position);
      }
    };

    const handleEnterAR = () => {
      setIsARMode(true);
      console.log("Entered AR Mode");
      showInstruction("Find a flat surface, then tap to place beakers");
      const plane = document.querySelector("#ar-plane");
      if (plane) plane.setAttribute("visible", "true");
      if (reticleRef.current)
        reticleRef.current.setAttribute("visible", "true");
    };

    const handleExitAR = () => {
      setIsARMode(false);
      console.log("Exited AR Mode");
      const plane = document.querySelector("#ar-plane");
      if (plane) plane.setAttribute("visible", "false");
      if (reticleRef.current)
        reticleRef.current.setAttribute("visible", "false");
    };

    scene.addEventListener("loaded", handleLoaded);
    scene.addEventListener("click", handleSceneClick);
    scene.addEventListener("enter-vr", handleEnterAR);
    scene.addEventListener("exit-vr", handleExitAR);

    let animationFrameId: number;
    const update = () => {
      if (scene.is("ar-mode") && reticleRef.current) {
        const cursor = document.querySelector("a-cursor") as any;
        if (cursor && cursor.components.raycaster) {
          const intersections = cursor.components.raycaster.intersections;
          const planeHit = intersections.find(
            (i: any) => i.object.el.id === "ar-plane",
          );

          if (planeHit) {
            reticleRef.current.setAttribute("position", planeHit.point);
            reticleRef.current.setAttribute("visible", "true");

            if (heldBeakerRef.current && heldBeakerDataRef.current) {
              heldBeakerRef.current.setAttribute("position", planeHit.point);
              checkForMixing(heldBeakerDataRef.current);
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(update);
    };
    update();

    return () => {
      scene.removeEventListener("loaded", handleLoaded);
      scene.removeEventListener("click", handleSceneClick);
      scene.removeEventListener("enter-vr", handleEnterAR);
      scene.removeEventListener("exit-vr", handleExitAR);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="organic-reaction-container">
      <div id="ar-ui-container">
        <div id="ar-controls" style={{ display: isARMode ? "flex" : "none" }}>
          <button
            id="restart-lab"
            className="ar-btn"
            title="Restart Lab"
            onClick={() => window.location.reload()}
          >
            <svg
              className="icon-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
            <span className="text">Restart</span>
          </button>
          {isReactionComplete && (
            <button
              id="go-to-assessment"
              className="ar-btn assessment-btn"
              onClick={() => navigate("/dashboard/chemistry/assessment")}
            >
              <svg
                className="icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
              <span className="text">I Got It!</span>
            </button>
          )}
        </div>
      </div>

      {showTutorial && (
        <div id="tutorial-overlay">
          <div className="tutorial-content">
            <div className="tutorial-header">
              <h3>🔬 Lab Tutorial</h3>
              <button
                className="close-tutorial"
                onClick={() => setShowTutorial(false)}
              >
                ×
              </button>
            </div>
            <div className="tutorial-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-text">
                  Tap "Start AR" and find a flat surface.
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-text">
                  Tap the blue reticle to place beakers.
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-text">
                  Tap a beaker to pick it up, tap again to drop.
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-text">
                  Bring beakers close to trigger the reaction!
                </div>
              </div>
            </div>
            <button
              className="got-it-btn"
              onClick={() => setShowTutorial(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {!isARMode && (
        <div id="loading">
          <h2>🔬 AR Chemistry Lab</h2>
          {loading ? (
            <p>Loading lab data...</p>
          ) : currentChapter ? (
            <>
              <p>{currentChapter.name}</p>
              <button id="start-ar" onClick={startAR}>
                Start AR Experience
              </button>
            </>
          ) : (
            <p>Error loading chapter data.</p>
          )}
        </div>
      )}

      <a-scene
        ref={sceneRef}
        xr-mode-ui="enabled: false"
        webxr="optionalFeatures: dom-overlay; overlayElement: #ar-ui-container"
        gltf-model="dracoDecoderPath: https://www.gstatic.com/draco/versioned/decoders/1.5.6/;"
      >
        {/* GLB Model declarations */}
        <a-assets>
          {currentChapter && (
            <>
              <a-asset-item
                id="reactant1-model"
                src={currentChapter.threeDModels[0]}
              ></a-asset-item>
              <a-asset-item
                id="reactant2-model"
                src={currentChapter.threeDModels[1]}
              ></a-asset-item>
              <a-asset-item
                id="product-model"
                src={currentChapter.threeDModels[2]}
              ></a-asset-item>
            </>
          )}
        </a-assets>

        <a-entity id="rig" position="0 1.6 0">
          <a-camera id="camera" user-height="0" wasd-controls="enabled: false">
            <a-cursor
              fuse="false"
              raycaster="objects: .hit-box, #ar-plane; far: 20"
              visible="false"
            ></a-cursor>
          </a-camera>
        </a-entity>

        <a-entity id="ar-content"></a-entity>
        <a-entity
          id="ar-plane"
          className="ar-plane"
          data-raycastable
          geometry="primitive: plane; width: 50; height: 50"
          rotation="-90 0 0"
          position="0 0 0"
          material="opacity: 0.01; color: #444; transparent: true; visible: false"
        ></a-entity>

        <a-ring
          ref={reticleRef}
          id="reticle"
          radius-inner="0.2"
          radius-outer="0.25"
          rotation="-90 0 0"
          color="#3498db"
          visible="false"
          animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; dur: 1000; loop: true"
        ></a-ring>

        <a-entity id="ui" position="0 0 -2">
          <a-text
            id="instruction"
            value="Tap to place beakers"
            position="0 1.5 0"
            color="white"
            align="center"
          ></a-text>
          <a-plane
            id="reaction-panel"
            color="#222"
            opacity="0.9"
            position="0 -0.5 0"
            width="1.5"
            height="0.8"
            visible="false"
          >
            <a-text
              id="reaction-text"
              color="white"
              align="center"
              width="1.4"
            ></a-text>
          </a-plane>
        </a-entity>

        <a-entity light="type: ambient; intensity: 0.8"></a-entity>
        <a-entity
          light="type: directional; intensity: 0.6"
          position="1 2 1"
        ></a-entity>
      </a-scene>
    </div>
  );
};

export default InorganicReaction;
