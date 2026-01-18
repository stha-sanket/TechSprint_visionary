import mongoose, { model } from "mongoose";

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: Object,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ["Chemistry", "Biology"],
  },
  topic: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const chemistryTopics = [
          "Organic Chemistry",
          "Inorganic Chemistry",
          "Physical Chemistry",
        ];
        const biologyTopics = ["Anatomy", "Cells", "Genetics"];

        if (this.subject === "Chemistry") {
          return chemistryTopics.includes(v);
        } else if (this.subject === "Biology") {
          return biologyTopics.includes(v);
        }
        return false;
      },
      message: (props) =>
        `${props.value} is not a valid topic for the selected subject!`,
    },
  },
  threeDModels: [
    {
      type: String,
      required: true,
    },
  ],
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
