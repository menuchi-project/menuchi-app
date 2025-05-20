import { describe, expect, test } from "vitest";
import { CategoryNameController } from "../../src/controllers/CategoryNameController";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { BacklogController } from "../../src/controllers/BacklogController";
import { returnCategoryName, returnCylinder, returnItem, returnMenu, returnRestaurant } from "../factories";
import { MenuController } from "../../src/controllers/MenuController";
import { CylinderValidationError } from "../../src/exceptions/ValidationError";
import { Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { MenuNotFound } from "../../src/exceptions/NotFoundError";

const categoryNameController = new CategoryNameController();
const restaurantController = new RestaurantController();
const backlogController = new BacklogController();
const menuController = new MenuController();
const categoryNameObject = returnCategoryName();
const restaurantObject = returnRestaurant();
const itemObject = returnItem();
const menuObject = returnMenu();
const cylinderObject = returnCylinder();

describe('GET /menus/backlog/{backlogId}', () => {
  test('should retrieved backlog successfully.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { categoryId } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const backlog = await menuController.getBacklog(backlogId!);

    expect(backlog.id).toBe(backlogId);
    expect(backlog.categories?.[0]?.id).toBe(categoryId);
    expect(backlog.categories?.[0]?.items?.[0]).toMatchObject(itemObject);
  });

  test('should retrieved backlog with categories contain the search query param successfully.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { categoryId } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const backlog = await menuController.getBacklog(backlogId!, 'test');

    expect(backlog.id).toBe(backlogId);
    expect(backlog.categories?.[0]?.id).toBe(categoryId);
    expect(backlog.categories?.[0]?.categoryName).toContain('test');
    expect(backlog.categories?.[0]?.items?.[0]).toMatchObject(itemObject);

    // No category containing 'random' was found.
    const backlog2 = await menuController.getBacklog(backlogId!, 'random');
    expect(backlog2.categories?.length).toBe(0);
  });
});

describe('POST /menus', () => {
  test('should create menu successfully.', async () => {
    const branchId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.id!;
    const promise = menuController.createMenu({ ...menuObject, branchId });

    await expect(promise).resolves.toMatchObject({ ...menuObject, branchId });
  });
});

describe('POST /menus/{menuId}/cylinders', () => {
  test('should create cylinder successfully.', async () => {
    const branchId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.id!;
    const { id: menuId } = await menuController.createMenu({ ...menuObject, branchId });
    const promise = menuController.createCylinder(menuId, cylinderObject);

    await expect(promise).resolves.toMatchObject(cylinderObject);
  });

  test('should rejects create cylinder with CylinderValidationError.', async () => {
    const branchId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.id!;
    const { id: menuId } = await menuController.createMenu({ ...menuObject, branchId });
    const promise = menuController.createCylinder(menuId, {}); // or with just false values.

    await expect(promise).rejects.toThrowError(CylinderValidationError);
  });

  test('should rejects create cylinder with constraint error.', async () => {
    const branchId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.id!;
    const { id: menuId } = await menuController.createMenu({ ...menuObject, branchId });
    await menuController.createCylinder(menuId, cylinderObject);
    const promise = menuController.createCylinder(menuId, cylinderObject);

    await expect(promise).rejects.toThrowError(Prisma.PrismaClientKnownRequestError);
  });

  test('should rejects create cylinder with MenuNotFound error.', async () => {
    const branchId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.id!;
    await menuController.createMenu({ ...menuObject, branchId });
    const promise = menuController.createCylinder(randomUUID(), cylinderObject);

    await expect(promise).rejects.toThrowError(MenuNotFound);
  });
});