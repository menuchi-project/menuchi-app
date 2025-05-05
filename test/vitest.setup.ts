import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';
import prisma from '../src/db/prisma';
import RedisClient from '../src/config/RedisClient';
import { execSync } from 'child_process';

execSync('npm run db-push');

afterEach(async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.userProfile.deleteMany(),
    prisma.role.deleteMany(),
    prisma.categoryName.deleteMany(),
    prisma.restaurant.deleteMany(),
    prisma.branch.deleteMany(),
    prisma.backlog.deleteMany()
  ]);

  await RedisClient.flushAll();
});

beforeAll(async () => {
  vi.mock('../src/config/TransformersRedisClient.ts', () => {
    return {
      default: {
        connect: vi.fn(),
        on: vi.fn(),
        once: vi.fn(),
        xAdd: vi.fn(),
      }
    };
  });

  await prisma.$connect();
});

afterAll(async () => {
  vi.resetAllMocks();
  await prisma.$disconnect();
});