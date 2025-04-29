import { afterAll, beforeAll, vi } from 'vitest';
import prisma from '../src/db/prisma';
import { execSync } from 'child_process';

beforeAll(async () => {
  execSync('npx prisma db push --schema=test/db/schema.test.prisma');
  await prisma.$connect();
});

afterAll(async () => {
  vi.resetAllMocks();

  await prisma.$transaction([
    prisma.user.deleteMany(),
  ]);

  await prisma.$disconnect();
  execSync('npx prisma db push --schema=src/db/schema.prisma');
});