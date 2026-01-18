import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
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
  questions: [
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      options: [
        {
          option: {
            type: String,
            required: true,
            trim: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
      answer: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  fillInTheBlanks: [
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const Assessment = mongoose.model("Assessment", assessmentSchema);
export default Assessment;
