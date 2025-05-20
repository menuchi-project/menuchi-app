import { describe, expect, test } from "vitest";
import { CategoryNameController } from "../../src/controllers/CategoryNameController";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { BacklogController } from "../../src/controllers/BacklogController";
import { returnCategoryName, returnItem, returnRestaurant } from "../factories";
import { MenuController } from "../../src/controllers/MenuController";

const categoryNameController = new CategoryNameController();
const restaurantController = new RestaurantController();
const backlogController = new BacklogController();
const menuController = new MenuController();
const categoryNameObject = returnCategoryName();
const restaurantObject = returnRestaurant();
const itemObject = returnItem();

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