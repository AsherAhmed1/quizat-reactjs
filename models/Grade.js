import mongoose from "mongoose";

const GradeSchema = mongoose.Schema({
  quizId: { required: true, type: mongoose.Types.ObjectId, ref: "quiz" },
  // in next versions
  //userId: { required:true , type: mongoose.Types.ObjectId, ref: "user" },
  userEmail: { type: String, required: [true, "Email is required"] },
  userName: String,
  grade: { required: true, type: String },
  message: String
});

export default mongoose.model("grade", GradeSchema);
