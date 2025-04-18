import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import { validationErrorCleaner } from '../utils/utils';
import {
  CategoryNameValidationError,
  CylinderValidationError,
  ItemValidationError,
  MenuCategoryValidationError,
  MenuValidationError,
  RestaurantValidationError,
  S3ValidationError,
  UserValidationError,
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
import { NotFoundError } from '../exceptions/NotFoundError';
import { ForbiddenError, InvalidTokenError, UnauthorizedError } from '../exceptions/AuthError';
import { JsonWebTokenError } from 'jsonwebtoken';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

export function errorPreprocessor(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof MenuchiError) {
    throw error;
  }

  if (error instanceof PrismaClientInitializationError) {
    throw new MenuchiError('Can\'t reach database server.', 500);
  }

  if (error instanceof JsonWebTokenError) {
    throw new InvalidTokenError();
  }

  if (error instanceof ValidateError) {
    const path = req.path;
    const details = validationErrorCleaner(error);

    if (path.includes('/items')) {
      throw new ItemValidationError(details);
    }

    if (path.includes('/menus')) {
      throw new MenuValidationError(details);
    }

    if (path.includes('/cylinders')) {
      throw new CylinderValidationError(details);
    }

    if (path.includes('/menu-categories')) {
      throw new MenuCategoryValidationError();
    }

    if (path.includes('/s3')) {
      throw new S3ValidationError(details);
    }

    if (path.includes('/auth')) {
      throw new UserValidationError(details);
    }

    switch (path) {
      case '/restaurants':
        throw new RestaurantValidationError(details);
        break;
      case '/category-names':
        throw new CategoryNameValidationError(details);
        break;
      default:
        throw new ValidationError(...[,,,], details);
    }
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const field = `Fields [${
      error.meta?.target ?? error.meta?.field_name
    }] at ${error.meta?.modelName} model`;
    const lines = error.message.split('\n');
    const message = lines[lines.length - 1];

    const detail: ErrorDetail[] = [{ field, message }];
    throw new ConstraintsDatabaseError(detail);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    throw new ValidationDatabaseError(error.message);
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
    message: `Route ${req.path} not found.`,
  });
}
