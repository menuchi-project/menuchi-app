import { ErrorDetail } from '../types/ErrorTypes';
import MenuchiError from './MenuchiError';

export class ValidationError extends MenuchiError {
  constructor(
    message: string,
    status: number,
    code: number,
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
