import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import { validationErrorCleaner } from '../utils/utils';
import {
  RestaurantValidationError,
  ValidationError,
} from '../exceptions/ValidationError';
import MenuchiError from '../exceptions/MenuchiError';
import {
  ConstraintsDatabaseError,
  DatabaseError,
  ValidationDatabaseError,
} from '../exceptions/DatabaseError';
import { ErrorDetail } from '../types/ErrorTypes';
import { Prisma } from '@prisma/client';

export function errorPreprocessor(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ValidateError) {
    const path = req.path;
    const details = validationErrorCleaner(error);

    switch (path) {
      case '/restaurants':
        throw new RestaurantValidationError(details);
        break;
      default:
        throw new ValidationError();
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const field = `Fields [${error.meta?.target}] at ${error.meta?.modelName} model`;
    const lines = error.message.split('\n');
    const message = lines[lines.length - 1];

    const detail: ErrorDetail[] = [{ field, message }];
    throw new ConstraintsDatabaseError(detail);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationDatabaseError(error.message);
  }

  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    Prisma.PrismaClientUnknownRequestError ||
    Prisma.PrismaClientRustPanicError
  ) {
    throw new DatabaseError();
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
