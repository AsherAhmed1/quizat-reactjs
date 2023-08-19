import Quiz from "../models/Quiz.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError
} from "../errors/index.js";
import mongoose from "mongoose";
import checkPermissions from "../utils/checkPermissions.js";
import ShortenURL from "../utils/ShortenURL.js";

export const createQuiz = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    console.log("please provide all quiz value");
    // return new BadRequestError("please provide all quiz value");
    throw new BadRequestError("please provide all quiz value");
  }
  // req.body is ready as a quiz instance
  req.body.createdBy = req.user.id;
  const id = new mongoose.Types.ObjectId();
  const { link } = await ShortenURL(id);
  const quiz = await Quiz.create({ _id: id, shortUrl: link, ...req.body });

  res.status(StatusCodes.CREATED).json(quiz);
};

export const getAllQuizzes = async (req, res) => {
  const { search, sort, subject } = req.query;
  const queryObject = {
    createdBy: req.user.id
  };

  if (search) {
    // $regex:search find string that contain search
    //'i' for case insensitive match
    queryObject.title = { $regex: search, $options: "i" };
  }
  if (subject && subject !== "all") {
    queryObject.subject = subject;
  }

  // quizzes get a promise need await or then, catch
  let result = Quiz.find(queryObject);
  // sorting
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("title");
  }
  if (sort === "z-a") {
    result = result.sort("-title");
  }
  //req.query.pageNum is a string
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  const quizzes = await result;
  const totalQuizzes = await Quiz.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalQuizzes / limit);

  res.status(StatusCodes.OK).json({ quizzes, totalQuizzes, numOfPages });
};

export const deleteQuiz = async (req, res) => {
  const { id: quizId } = req.params;
  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) {
    throw new NotFoundError(`No quiz with id : ${quizId}`);
  }
  //check permision
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });
  await quiz.remove();

  res.json({ msg: "Success! delete quiz ", id: quizId, title: quiz.title });
};

export const updateQuiz = async (req, res) => {
  const { id: quizId } = req.params;
  const { title, description, bgUrl } = req.body;

 
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError(`No quiz wiht id : ${quizId}`);
  }

  //check permision
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });
  const updatedQuiz = await Quiz.findOneAndUpdate({ _id: quizId }, req.body, {
    new: true, // retrun the new updated quiz not the old one
    runValidators: true // if prop is not here path the check
  });
  res.status(StatusCodes.OK).json(updatedQuiz);
};

export const getQuiz = async (req, res) => {
  const { id: quizId } = req.params;


  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError(`No quiz with id : ${quizId}`);
  }

  //check permision
  checkPermissions({ requestUser: req.user, resourceUserId: quiz.createdBy });


  res.status(StatusCodes.OK).json(quiz)
};



export const getStats = async (req, res) => {
  // req.user.id is a string so mongoose.Types.ObjectId() is here
  // read aggregate docs
  let stats = await Quiz.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$subject", count: { $sum: 1 } } }
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  /* alternative code but return an array
  stats = stats.map(oneStat => {
    const { _id: title, count } = oneStat;
    return { [title]: count };
  });*/

  // what if the user is new user that has just logged
  // it will retrun {} or {english:2} that will break or frontend so ..
  const defaultStats = {
    english: stats.english || 0,
    programing: stats.programing || 0,
    math: stats.math || 0,
    marketing: stats.marketing || 0
  };

  // work on later
  let monthlyApplications = await Quiz.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, //get modern first
    { $limit: 6 }
  ]);
  monthlyApplications = monthlyApplications
    .map(monthItem => {
      const {
        _id: { year, month },
        count
      } = monthItem;
      const date = new Date(year, month, 0);
      let dateString = date.toDateString().split(" ");
      dateString = `${dateString[1]} ${dateString[3]}`;
      return { date: dateString, count };
    })
    .reverse();
  res.status(StatusCodes.OK).send({ stats: defaultStats, monthlyApplications });
};
