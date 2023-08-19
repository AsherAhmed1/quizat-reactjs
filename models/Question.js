import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  titleType: {
    type: String,
    enum: ["text", "photo", "audio", "video"],
    default: "text"
  },
  titleTypeAssetUrl: String,
  AnswerType: {
    type: String,
    enum: ["mcq", "photosMcq"],
    default: "mcq"
  },
  title: {
    type: String,
    required: [true, "Question title is required"],
    maxLength: 300
  },
  quizId: {
    type: mongoose.Types.ObjectId,
    ref: "quiz",
    required: [true, "quiz must be excist"]
  },
  wrongAnswers: [{ type: String }], //array of string
  correctAnswer: {
    type: String,
    required: [true, "Question correct answer is required"],
    maxLength: 300
  }
});

export default mongoose.model("question", QuestionSchema);
