import supertest from 'supertest';
import createServer from '../src/server';

export const request = supertest(createServer()); // send requests without cookie
export const agent = supertest.agent(createServer()); // send requests with cookie