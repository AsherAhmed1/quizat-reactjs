import express from "express";
const app = express();

//https://www.npmjs.com/package/express-async-errors
import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./DB/connect.js";
//middleware
import AuthenticateUser from "./middleware/auth.js";
//import routes
import authRouter from "./router/authRouter.js";
import quizRouter from "./router/quizRouter.js";
import questionRouter from "./router/questionRouter.js";
import gradeRouter from "./router/gradeRouter.js";
import { publicRouter } from "./router/questionRouter.js";

//middleware
import RouteNotFoundMiddleware from "./middleware/route-not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  //not arrow function
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello from server" });
});

// set routes middleware
app.use("/api/questions", publicRouter);
app.use("/api/auth", authRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/questions", questionRouter);
app.use("/api/grades", gradeRouter);
// if no route matches
app.use(RouteNotFoundMiddleware);
// if route matches but there is ERROR
app.use(errorHandlerMiddleware);

// try to connect to database and run server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL_PREV);
    app.listen(port, () => {
      console.log("server up and running " + port);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
