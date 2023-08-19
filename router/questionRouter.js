import express from "express";
import AuthenticateUser from "../middleware/auth.js";
import {
  createQuestion,
  getQuizQuestions,
  deleteQuestion,
  updateQuestion
} from "../controller/questionController.js";

const router = express.Router();
const publicRouter = express.Router();

router.route("/").post(AuthenticateUser, createQuestion);
router
  .route("/:id")
  .delete(AuthenticateUser, deleteQuestion)
  .patch(AuthenticateUser, updateQuestion);

// it is public because students are not signed up users
//
publicRouter.route("/:id").get(getQuizQuestions);

export default router;
export { publicRouter };
