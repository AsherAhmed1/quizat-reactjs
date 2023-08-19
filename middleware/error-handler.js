import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message);
  const defualtError = {
    statusCode: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later"
  };
  if (err.name === "ValidationError") {
    defualtError.statusCode = StatusCodes.BAD_REQUEST;
    defualtError.msg = Object.values(err.errors) //{errors:[]}
      .map(item => item.message) // map big array to small one
      .join(" , "); //join array to string
  }
  if (err.code === 11000) {
    defualtError.statusCode = StatusCodes.BAD_REQUEST;
    defualtError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  //res.status(defualtError.statusCode).send({ msg: err });
  res.status(defualtError.statusCode).send({ msg: defualtError.msg });
};

export default errorHandlerMiddleware;
