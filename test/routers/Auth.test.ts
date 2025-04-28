import { describe } from 'node:test';
import createServer from '../../src/server';
import { expect, test } from 'vitest';
import supertest from 'supertest';
import { createUser } from '../factories';
import prisma from '../../libs/__mocks__/prisma';

const request = supertest(createServer());

describe('POST /auth/res-signup', () => {
  test('should return the new user with 201 status code.', async () => {
  const userObject = createUser();
  prisma.user.create.mockResolvedValue(userObject);

  const res = await request
    .post('/auth/res-signup')
    .send(userObject);

  expect(res.status).toBe(201);
  expect(res.body.phoneNumber).toMatch(userObject.phoneNumber);
  expect(res.body.password).toMatch(userObject.password);
  expect(res.body.email).toMatch(userObject.email);
  });
});