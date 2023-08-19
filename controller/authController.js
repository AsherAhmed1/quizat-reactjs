import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });

  if (!name || !email || !password) {
    throw new BadRequestError("ME: please provide all values");
  }
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    console.log(userAlreadyExist);

    throw new BadRequestError("ME: Email already in use");
  }
  const newUser = await User.create({ name, email, password });

  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).send({
    user: newUser,
    token
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    //with async use next(error) to push error to error Middleware
    // but I have imported  "express-async-errors" in server.js

    throw new BadRequestError("Please provide Email and password");
  }
  const lowerCaseEmail = email.toLocaleLowerCase();
  console.log(email, password, lowerCaseEmail);

  const user = await User.findOne({ email: lowerCaseEmail });
  console.log(user);

  if (!user) {
    throw new UnAuthenticatedError("invalid email or password");
  }
  console.log("test pass");

  const isPasswordCorrect = await user.comparePassword(password);
  console.log(" pass", isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Password : invalid email or password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).send({ user, token });
};

export const updateUser = async (req, res) => {
  const { name, email, lastName, location ,password} = req.body;

  const user = await User.findOne({ _id: req.user.id });
  user.name = name? name:user.name;
  user.email = email? email:user.email;
  user.password = password? password:user.password;
  user.lastName = lastName? lastName:user.lastName;
  user.location = location? location:user.location;
  await user.save();
  res.send({ user, token: req.user.token, location });
};
