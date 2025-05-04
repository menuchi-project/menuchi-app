import { describe, expect, test } from "vitest";
import { returnCategoryName } from "../factories";
import { CategoryNameController } from '../../src/controllers/CategoryNameController';
import { Prisma } from "@prisma/client";

const categoryNameObject = returnCategoryName();
const controller = new CategoryNameController();

describe('POST /category-names', async () =>{
  test('should create category name successfully with 201 status code.', async () => {
    const res = await controller.createCategoryName(categoryNameObject);
    expect(res.name).toMatch(categoryNameObject.name);
  });

  test('should reject create category name with constraint error and 409 status code.', async () => {
    await controller.createCategoryName(categoryNameObject);
    const promise = controller.createCategoryName(categoryNameObject);
    expect(promise).rejects.toThrowError(Prisma.PrismaClientKnownRequestError);
  });
});

describe('GET /category-names', () => {
  test('should retrieved all category names successfully with 200 status code.', async () => {
    await controller.createCategoryName(categoryNameObject);
    const promise = controller.getAllCategoryNames();
    expect(promise).resolves.toMatchObject([categoryNameObject]);
  });
});