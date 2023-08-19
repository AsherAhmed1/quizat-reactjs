import mongoose from "mongoose";
import Question from "./Question.js";

const QuizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      maxLength: 100
    },
    subject: {
      type: String,
      enum: ["english", "programing", "math", "marketing"],
      default: "english"
    },
    description: {
      type: String,
      maxLength: 250
    },
    bgUrl: String,
    shortUrl: String,
    numberOfQuestions: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Owner must exist"]
    }
  },
  { timestamps: true }
);
QuizSchema.pre("remove", async function(next) {
  const quiz = this;
  await Question.deleteMany({ quizId: quiz._id });
});
export default mongoose.model("quiz", QuizSchema);
