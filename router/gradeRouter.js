import express from "express";
//import AuthenticateUser from "../middleware/auth.js";
import { createGrade, getGradesBy } from "../controller/gradeController.js";
import AuthenticateUser from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .post(createGrade)
  .get(AuthenticateUser, getGradesBy);

export default router;
