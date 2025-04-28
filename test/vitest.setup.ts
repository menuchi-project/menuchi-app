import { afterAll, beforeAll, vi } from 'vitest';
import { NextFunction, Request, Response } from 'express';

vi.mock('express-session', () => {
  return {
    default: () => (req: Request, res: Response, next: NextFunction) => {
      next();
    },
  };
});

vi.mock('connect-redis', () => {
  return {

    RedisStore: vi.fn(() => {
      return class {
        constructor() {}
      }
    })
  };
});

vi.mock('redis', () => {
  return {
    createClient: vi.fn(() => ({
      connect: vi.fn(),
      on: vi.fn(),
      once: vi.fn(),
      get: vi.fn(),
      set: vi.fn(),
      del: vi.fn(),
    })),
  };
});

vi.mock('../libs/prisma.ts');

afterAll(() => {
  vi.resetAllMocks();
});