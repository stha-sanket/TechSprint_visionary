import heartModel from "../../../assets/models/Beating heart.glb";
import anatomyModel from "../../../assets/models/humananatomy.glb";

export const MOCK_BIOLOGY_CHAPTERS = {
  "human-heart": {
    _id: "human-heart",
    name: "Human Heart",
    description: {
      reactants: [],
      name: "Human Heart",
      products: "",
      description:
        "The human heart is a muscular organ that pumps blood through the blood vessels of the circulatory system. The pumped blood carries oxygen and nutrients to the body, while carrying metabolic waste such as carbon dioxide to the lungs.",
      fullContent: [
        {
          title: "1. Right Atrium",
          content:
            "Receives deoxygenated blood from the body through the superior and inferior vena cava and pumps it into the right ventricle.",
        },
        {
          title: "2. Right Ventricle",
          content:
            "Pumps deoxygenated blood to the lungs through the pulmonary artery for oxygenation.",
        },
        {
          title: "3. Left Atrium",
          content:
            "Receives oxygenated blood from the lungs through the pulmonary veins and pumps it into the left ventricle.",
        },
        {
          title: "4. Left Ventricle",
          content:
            "The strongest chamber, it pumps oxygen-rich blood to the rest of the body through the aorta.",
        },
        {
          title: "5. Heart Valves",
          content:
            "Includes the tricuspid, pulmonary, mitral, and aortic valves, which ensure blood flows in only one direction.",
        },
      ],
      assessment: [
        {
          question:
            "Which chamber of the heart pumps oxygenated blood to the rest of the body?",
          options: [
            "Right Atrium",
            "Right Ventricle",
            "Left Atrium",
            "Left Ventricle",
          ],
          answer: "Left Ventricle",
        },
        {
          question: "What is the primary function of heart valves?",
          options: [
            "To pump blood",
            "To oxygenate blood",
            "To prevent backflow of blood",
            "To filter waste",
          ],
          answer: "To prevent backflow of blood",
        },
        {
          question: "The pulmonary artery carries blood to the:",
          options: ["Brain", "Lungs", "Liver", "Kidneys"],
          answer: "Lungs",
        },
      ],
      effect: "heartbeat",
      color: "#ff0000",
      productModelId: "",
    },
    chapterNumber: 1,
    subject: "Biology",
    topic: "Human Anatomy",
    threeDModels: [heartModel],
    scale: "1 1 1",
  },
  "human-anatomy": {
    _id: "human-anatomy",
    name: "Human Anatomy",
    description: {
      reactants: [],
      name: "Human Anatomy",
      products: "",
      description:
        "Human anatomy is the study of the structure of the human body. It helps us understand what body parts we have, where they are located, and how they work together to keep the body healthy.",
      fullContent: [
        {
          title: "1. Deltoid Muscle",
          content:
            "The deltoid is a muscle of the shoulder. It helps us raise, lower, and rotate the arm. It also gives a rounded shape to the shoulder.",
        },
        {
          title: "2. Sternocleidomastoid Muscle",
          content:
            "This is a muscle of the neck. It helps us turn the head left and right and bend the head forward.",
        },
        {
          title: "3. Pectoralis Major",
          content:
            "The pectoralis major is a big muscle of the chest. It helps in moving the arms forward, inward, and upward.",
        },
        {
          title: "4. External Oblique Muscle",
          content:
            "This muscle is present on the side of the abdomen. It helps us twist the body and bend the body sideways.",
        },
        {
          title: "5. Serratus Anterior",
          content:
            "This muscle is found on the side of the ribs. It helps in moving the shoulder blade and lifting the arm.",
        },
        {
          title: "6. Sartorius Muscle",
          content:
            "The sartorius is a long muscle of the thigh. It helps in bending the knee and moving the leg.",
        },
        {
          title: "7. Tibialis Anterior",
          content:
            "This muscle is located in the front of the lower leg. It helps in lifting the foot while walking or running.",
        },
      ],
      assessment: [
        {
          question: "Which muscle helps in lifting and rotating the arm?",
          options: [
            "Sartorius",
            "Tibialis anterior",
            "Deltoid",
            "Serratus anterior",
          ],
          answer: "Deltoid",
        },
        {
          question: "Which system of the body is responsible for movement?",
          options: [
            "Nervous system",
            "Digestive system",
            "Circulatory system",
            "Muscular system",
          ],
          answer: "Muscular system",
        },
        {
          question: "The sternocleidomastoid muscle helps in:",
          options: [
            "Bending the knee",
            "Lifting the foot",
            "Turning and bending the head",
            "Moving the shoulder blade",
          ],
          answer: "Turning and bending the head",
        },
      ],
      effect: "none",
      color: "#00ff00",
      productModelId: "",
    },
    chapterNumber: 2,
    subject: "Biology",
    topic: "Human Anatomy",
    threeDModels: [anatomyModel],
    scale: "80 80 80",
  },
};
