import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

export const createQuestion = async (req, res) => {
  const { title, quizId, correctAnswer } = req.body;

  if (!title || !quizId || !correctAnswer) {
    console.log("please provide all question value");
    throw new BadRequestError("please provide all question value");
  }
  //get quiz data to check if the logged user is the owner
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    console.log("Quiz does not exist");
    throw new NotFoundError("Quiz does not exist");
  }
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });

  // I am going to add a question
  // so I will increase the number of them
  const numberOfQuestions = quiz.numberOfQuestions + 1;
  await Quiz.findOneAndUpdate({ _id: quizId }, { numberOfQuestions });

  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json(question);
};
// update one question
export const updateQuestion = async (req, res) => {
  const { id: questionId } = req.params;
  const { title, quizId, correctAnswer } = req.body;

  if (title=="" || quizId=="" || !correctAnswer=="") {
    console.log("please provide all question value");
    throw new BadRequestError("please provide all question value");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    console.log("Quiz does not exist");
    throw new NotFoundError("Quiz does not exist");
  }
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });
  const updateQuestion = await Question.findOneAndUpdate(
    { _id: questionId },
    req.body,
    {
      new: true, // retrun the new updated quiz not the old one
      runValidators: true // if prop is not here path the check
    }
  );
  res.status(StatusCodes.OK).json({ updateQuestion });
};

//delete on question
export const deleteQuestion = async (req, res) => {
  const { id: questionId } = req.params;

  // get question to delete document
  const question = await Question.findOne({ _id: questionId });
  if (!question) {
    console.log("question does not exist");
    throw new NotFoundError("question does not exist");
  }
  const quiz = await Quiz.findOne({ _id: question.quizId });
  if (!quiz) {
    console.log("Quiz does not exist");
    throw new NotFoundError("Quiz does not exist");
  }
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });

  // I am going to remove a question
  // so I will decrease the number of them
  const numberOfQuestions = quiz.numberOfQuestions - 1;
  await Quiz.findOneAndUpdate({ _id: question.quizId }, { numberOfQuestions });
  await question.remove();

  res.json({
    msg: "Success! delete question ",
    id: questionId,
    title: question.title
  });
};

// get quiz questions
export const getQuizQuestions = async (req, res) => {
  const { id: quizId } = req.params;
  if (!quizId) {
    console.log("Quiz Id does not exist");
    throw new BadRequestError("Quiz Id does not exist");
  }
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    console.log("Quiz Id does not exist");
    throw new NotFoundError("Quiz does not exist");
  }
  let result = await Question.find({ quizId: quizId });
  res.status(StatusCodes.OK).send({ quiz, questions: result });
};
