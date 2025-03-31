import { ErrorDetail } from '../types/ErrorTypes';
import MenuchiError from './MenuchiError';

export class ValidationError extends MenuchiError {
  constructor(
    message: string = 'Validation failed',
    status: number = 422,
    code: number = 4220,
    details?: ErrorDetail[]
  ) {
    super(message, status, code, details);
  }
}

export class RestaurantValidationError extends ValidationError {
  constructor(details?: ErrorDetail[]) {
    super('Restaurant validation failed', 422, 4221, details);
  }
}

export class CategoryNameValidationError extends ValidationError {
  constructor(details?: ErrorDetail[]) {
    super('Category Name validation failed', 422, 4222, details);
  }
}

export class ItemValidationError extends ValidationError {
  constructor(details?: ErrorDetail[]) {
    super('Item validation failed', 422, 4223, details);
  }
}

export class S3ValidationError extends ValidationError {
  constructor(details?: ErrorDetail[]) {
    super('S3 validation failed', 422, 4224, details);
  }
}

export class UserValidationError extends ValidationError {
  constructor(details?: ErrorDetail[]) {
    super('User validation failed', 422, 4225, details);
  }
}