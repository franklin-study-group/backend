import { Response } from "express"
import { AuthenticationRespose } from "./types"

export const sendAuthError = (
  res: Response,
  error: AuthenticationRespose["error"]
) =>
  res.status(404).send({
    successful: false,
    error
  } as AuthenticationRespose)
