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
      effect: "heartbeat",
      color: "#ff0000",
      productModelId: "",
    },
    chapterNumber: 1,
    subject: "Biology",
    topic: "Human Anatomy",
    threeDModels: [heartModel],
  },
  "human-anatomy": {
    _id: "human-anatomy",
    name: "Human Anatomy",
    description: {
      reactants: [],
      name: "Human Anatomy",
      products: "",
      description:
        "Human anatomy is the study of the structure of the human body. It includes the study of cells, tissues, organs, and organ systems.",
      effect: "none",
      color: "#00ff00",
      productModelId: "",
    },
    chapterNumber: 2,
    subject: "Biology",
    topic: "Human Anatomy",
    threeDModels: [anatomyModel],
  },
};
