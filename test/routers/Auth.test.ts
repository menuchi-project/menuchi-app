import { describe } from 'node:test';
import createServer from '../../src/server';
import { expect, test } from 'vitest';
import supertest from 'supertest';
import { returnUser } from '../factories';

const request = supertest(createServer());

describe('POST /auth/res-signup', () => {
  test('should signup a new user successfully with 201 status code.', async () => {
    const userObject = returnUser();
    const res = await request
      .post('/auth/res-signup')
      .send(userObject);
    console.log(res.body);
    
    expect(res.status).toBe(201);
    expect(res.body.phoneNumber).toMatch(userObject.phoneNumber);
    expect(res.body.password).toBe(undefined);
    expect(res.body.email).toMatch(userObject.email);
    expect(res.body.username).toMatch(userObject.username);
  });

  test('should reject signup with constraint error and 409 status code.', async () => {
    const userObject = returnUser();

    const res = await request
      .post('/auth/res-signup')
      .send(userObject);
  
    expect(res.status).toBe(409);
  });
});