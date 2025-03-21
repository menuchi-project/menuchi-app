import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import { validationErrorCleaner } from '../utils/utils';
import {
  RestaurantValidationError,
  ValidationError,
} from '../exceptions/ValidationError';
import MenuchiError from '../exceptions/MenuchiError';

export function errorPreprocessor(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ValidateError) {
    const path = req.path;
    console.log(path);
    const details = validationErrorCleaner(error);

    switch (path) {
      case '/restaurants':
        throw new RestaurantValidationError(details);
        break;
      default:
        throw new ValidationError('Validation failed', 422, 4220);
    }
  }

  throw new MenuchiError(error.message, 500);
}

export function errorHandler(
  error: MenuchiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(error.status).json({
    code: error.code,
    message: error.message,
    details: error.details,
  });
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(404).json({
    success: false,
    message: `Route ${req.route} not found.`,
  });
}
