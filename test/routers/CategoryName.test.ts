import { agent } from '../requestAgents';
import { describe, expect, test } from "vitest";
import { returnCategoryName } from "../factories";

const categoryNameObject = returnCategoryName();

describe('POST /category-names', async () =>{
  test('should create category name successfully with 201 status code.', async () => {
    const res = await agent
      .post('/category-names')
      .send(categoryNameObject);

    expect(res.status).toBe(201);
    expect(res.body.name).toMatch(categoryNameObject.name);
  });

  test('should reject create category name with constraint error and 409 status code.', async () => {
    const res = await agent
      .post('/category-names')
      .send(categoryNameObject);

    expect(res.status).toBe(409);
    expect(res.body.message).toMatch('Constraint failed');
  });
});

describe('GET /category-names', () => {
  test('should retrieved all category names successfully with 200 status code.', async () => {
    const res = await agent
      .get('/category-names');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject([categoryNameObject]);
  });
});