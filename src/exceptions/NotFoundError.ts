import { ErrorDetail } from '../types/ErrorTypes';
import MenuchiError from './MenuchiError';

export class NotFoundError extends MenuchiError {
  constructor(
    message: string = 'Not found error',
    status: number = 404,
    code?: number,
    details?: ErrorDetail[]
  ) {
    super(message, status, code, details);
  }
}

export class BacklogNotFound extends NotFoundError {
  constructor() {
    super('Backlog with the given id not found', 404, 4044);
  }
}

export class CategoryNameNotFound extends NotFoundError {
  constructor() {
    super('Category Name with the given id not found', 404, 4042);
  }
}

export class RestaurantNotFound extends NotFoundError {
  constructor() {
    super('Restaurant with the given id not found', 404, 4041);
  }
}

export class MenuNotFound extends NotFoundError {
  constructor() {
    super('Menu with the given id not found', 404, 4045);
  }
}

export class CylinderNotFound extends NotFoundError {
  constructor() {
    super('Cylinder with the given id not found', 404, 4046);
  }
}

export class CategoryNotFound extends NotFoundError {
  constructor() {
    super('Category with the given id not found', 404, 4048);
  }
}