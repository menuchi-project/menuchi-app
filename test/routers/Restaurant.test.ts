import { describe, expect, test } from "vitest";
import { returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";

const restaurantObject = returnRestaurant();
const controller = new RestaurantController();

describe('POST /restaurants', () => {
  test('should create restaurant with a default branch and backlog successfully.', async () => {
    const promise = controller.createRestaurant(restaurantObject);
    await expect(promise).resolves.toMatchObject(restaurantObject);
  });

  test('should return the restaurant with the given id.', async () => {
    const { id: restaurantId } = await controller.createRestaurant(restaurantObject);
    const promise = controller.getRestaurant(restaurantId);

    await expect(promise).resolves.toMatchObject(restaurantObject);
  });
});

describe('PATCH /restaurants/{restaurantId}', () => {
  test('should update restaurant successfully.', async () => {
    const promise = controller.createRestaurant(restaurantObject);
    await expect(promise).resolves.toMatchObject(restaurantObject);
  });

  test('should return the restaurant with the given id.', async () => {
    const { id: restaurantId } = await controller.createRestaurant(restaurantObject);
    const newRestaurant = {
      name: 'New Restaurant',
      displayName: 'new-restaurant',
      slang: 'new-slang',
      instagram: 'new-id',
      telegram:'new-id',
      twitter:'new-id',
      youtube:'new-id',
      eitaa:'new-id'
    };
    await controller.updateRestaurant(restaurantId, newRestaurant);
    const promise = controller.getRestaurant(restaurantId);

    await expect(promise).resolves.toMatchObject(newRestaurant);
  });
});
