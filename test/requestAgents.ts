import supertest from 'supertest';
import createServer from '../src/server';

export const request = supertest(createServer());
export const agent = supertest.agent(createServer());

export const loginAgent = async () => {
  const userAgent = {
    phoneNumber: '09123456780',
    password: 'P@ssword1234'
  };

  await agent
        .post('/auth/res-signup')
        .send(userAgent);

  await agent
        .post('/auth/res-signin')
        .send(userAgent);
};