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