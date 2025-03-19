import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ValidateError) {
    res.status(error.status).json({
      success: false,
      fields: error.fields
    });
  }

  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      fields: {
        message: "Internal Server Error"
      },
    });
  }

  next();
}