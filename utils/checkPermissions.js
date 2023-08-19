import { UnAuthenticatedError } from "../errors/index.js";
import { request } from "http";

const checkPermissions = ({ requestUser, resourceUserId }) => {
  //resourceUserId.toString() =  model.createdBy.toString()
  if (requestUser.id === resourceUserId.toString()) return; // return without any Error
  throw new UnAuthenticatedError("Not authorized to access this job");
};

export default checkPermissions;
