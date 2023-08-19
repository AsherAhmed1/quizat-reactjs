import JWT from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const Auth = async (req, res, next) => {
  const authToken = req.headers.authorization;
  console.log(req.headers);

  if (!authToken || !authToken.startsWith("Bearer")) {
    console.log("no header");
    throw new UnAuthenticatedError("Auth: Invalid Authentication");
  }
  //get token  "Bearer 123" => ["Bearer" , "123"] => "123"
  const token = authToken.split(" ")[1];
  // try if somthing is wrong or token expired
  try {
    // {id:userId ...otherTokenData}
    const tokenPayload = JWT.verify(token, process.env.JWT_SECRET);
    console.log(tokenPayload);

    // hook user usefull data to req
    req.user = { id: tokenPayload.id, token };

    next();
  } catch (error) {
    throw new UnAuthenticatedError(" Invalid Authentication");
  }
};

export default Auth;
