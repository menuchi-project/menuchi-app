import { describe, expect, test } from "vitest";
import { CategoryNameController } from "../../src/controllers/CategoryNameController";
import { BacklogController } from "../../src/controllers/BacklogController";
import { returnCategoryName, returnItem, returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { randomUUID } from "crypto";
import { BacklogNotFound, CategoryNameNotFound } from "../../src/exceptions/NotFoundError";
import MenuchiError from "../../src/exceptions/MenuchiError";

const categoryNameController = new CategoryNameController();
const restaurantController = new RestaurantController();
const backlogController = new BacklogController();
const categoryNameObject = returnCategoryName();
const restaurantObject = returnRestaurant();
const itemObject = returnItem();

describe('POST /backlog/{backlogId}/items', () => {
  test('should create item successfully.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const promise = backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });

    expect(promise).resolves.toMatchObject(itemObject);
  });

  test('should assign items to the same categoryId with the same \'category name\'. and auto-set their positionInCategory and positionInItemsList in ascending order.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const item = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const secondItem = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });

    expect(secondItem.categoryId).toBe(item.categoryId);
    expect(secondItem.positionInCategory! - item.positionInCategory!).toBe(1);
    expect(secondItem.positionInItemsList! - item.positionInItemsList!).toBe(1);
  });

  test('should rejects create item with BacklogNotFound.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const promise = backlogController.createItem(randomUUID(), { categoryNameId, ...itemObject });

    expect(promise).rejects.toThrowError(BacklogNotFound);
  });

  test('should rejects create item with CategoryNameNotFound.', async () => {
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const promise = backlogController.createItem(backlogId!, { categoryNameId: randomUUID(), ...itemObject });

    expect(promise).rejects.toThrowError(CategoryNameNotFound);
  });
});

describe('GET /backlog/{backlogId}', () => {
  test('should retrieved backlog successfully.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const backlog = await backlogController.getBacklog(backlogId!);

    expect(backlog.id).toBe(backlogId);
    expect(backlog.categories?.[0]?.items?.[0]).toMatchObject(itemObject);
  });

  test('should rejects with BacklogNotFound.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.getBacklog(randomUUID());

    expect(promise).rejects.toThrowError(BacklogNotFound);
  });
});

describe('GET /backlog/{backlogId}/items', () => {
  test('should retrieved items list successfully.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.getItems(backlogId!);

    expect(promise).resolves.toMatchObject([itemObject]);
  });

  test('should resolves with am empty array.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.getItems(randomUUID());

    expect(promise).resolves.toMatchObject([]);
  });
});

describe('PATCH /backlog/{backlogId}/reorder-items/in-category', () => {
  test('should update items order in category successfully and return number of updated items.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { id: itemId1 } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const { id: itemId2 } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const { id: itemId3 } =  await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.reorderItemsInCategory(backlogId!, [itemId3, itemId2, itemId1]);

    expect(promise).resolves.toBe(3);
  });

  test('should reject update items order in category with MenuchiError.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { id: itemId } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.reorderItemsInCategory(backlogId!, [randomUUID(), itemId]);

    expect(promise).rejects.toThrowError(MenuchiError);
  });
});

describe('PATCH /backlog/{backlogId}/reorder-items/in-list', () => {
  test('should update items order in list successfully and return number of updated items.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { id: itemId1 } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const { id: itemId2 } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const { id: itemId3 } =  await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.reorderItemsInList(backlogId!, [itemId3, itemId2, itemId1]);

    expect(promise).resolves.toBe(3);
  });

  test('should reject update items order in list with MenuchiError.', async () => {
    const { id: categoryNameId } = await categoryNameController.createCategoryName(categoryNameObject);
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { id: itemId } = await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    await backlogController.createItem(backlogId!, { categoryNameId, ...itemObject });
    const promise = backlogController.reorderItemsInList(backlogId!, [randomUUID(), itemId]);

    expect(promise).rejects.toThrowError(MenuchiError);
  });
});

describe('PATCH /backlog/{backlogId}/reorder-categories', () => {
  test('should update categories order in backlog successfully and return number of updated categories.', async () => {
    const { id: categoryNameId1 } = await categoryNameController.createCategoryName(categoryNameObject);
    const { id: categoryNameId2 } = await categoryNameController.createCategoryName(returnCategoryName());
    const { id: categoryNameId3 } = await categoryNameController.createCategoryName(returnCategoryName());
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { categoryId: categoryId1 } = await backlogController.createItem(backlogId!, { categoryNameId: categoryNameId1, ...itemObject });
    const { categoryId: categoryId2 } = await backlogController.createItem(backlogId!, { categoryNameId: categoryNameId2, ...itemObject });
    const { categoryId: categoryId3 } = await backlogController.createItem(backlogId!, { categoryNameId: categoryNameId3, ...itemObject });
    const promise = backlogController.reorderCategoriesInBacklog(backlogId!, [categoryId3!, categoryId2!, categoryId1!]);

    expect(promise).resolves.toBe(3);
  });

  test('should reject update categories order in backlog with MenuchiError.', async () => {
    const { id: categoryNameId1 } = await categoryNameController.createCategoryName(categoryNameObject);
    const { id: categoryNameId2 } = await categoryNameController.createCategoryName(returnCategoryName());
    const backlogId = (await restaurantController.createRestaurant(restaurantObject))?.branches?.[0]?.backlog?.id;
    const { categoryId } = await backlogController.createItem(backlogId!, { categoryNameId: categoryNameId1, ...itemObject });
    await backlogController.createItem(backlogId!, { categoryNameId: categoryNameId2, ...itemObject });
    const promise = backlogController.reorderCategoriesInBacklog(backlogId!, [randomUUID(), categoryId!]);

    expect(promise).rejects.toThrowError(MenuchiError);
  });
});