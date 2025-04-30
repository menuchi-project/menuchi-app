import { afterAll, beforeAll, vi } from 'vitest';
import prisma from '../src/db/prisma';
import { execSync } from 'child_process';
import { loginAgent } from './requestAgents';
import RedisClient from '../src/config/RedisClient';

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

beforeAll(async () => {
  execSync('npx prisma db push --schema=test/db/schema.test.prisma');
  await prisma.$connect();

  await loginAgent();
});

afterAll(async () => {
  vi.resetAllMocks();

  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.categoryName.deleteMany(),
  ]);

  await prisma.$disconnect();
  execSync('npx prisma db push --schema=src/db/schema.prisma');

  RedisClient.flushAll();
});