import { StatusCodes } from "http-status-codes";
import CustomApiError from "./CustomApi.js";

export class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}
