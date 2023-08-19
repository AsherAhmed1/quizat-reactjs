import express from "express";
import AuthenticateUser from "../middleware/auth.js";
import {
  createQuiz,
  getQuiz,
  getAllQuizzes,
  deleteQuiz,
  updateQuiz,
  getStats
} from "../controller/quizController.js";

const router = express.Router();

router
  .route("/")
  .post(AuthenticateUser, createQuiz)
  .get(AuthenticateUser, getAllQuizzes);
 
// get /quizzes/stats must be before get quizzes/:id
router.route("/stats").get(AuthenticateUser, getStats);


router
  .route("/:id")
  .get(AuthenticateUser,   getQuiz) 
  .patch(AuthenticateUser, updateQuiz)
  .delete(AuthenticateUser, deleteQuiz);
/* router.delete("/:id", AuthenticateUser, deleteQuiz); */

export default router;
