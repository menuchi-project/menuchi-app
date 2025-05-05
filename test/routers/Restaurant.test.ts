import { describe, expect, test } from "vitest";
import { returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";

const restaurantObject = returnRestaurant();
const controller = new RestaurantController();

describe('POST /restaurants', () => {
  test('should create restaurant with a default branch and backlog successfully.', async () => {
    const promise = controller.createRestaurant(restaurantObject);
    expect(promise).resolves.toMatchObject(restaurantObject);
  });

  test('should return the restaurant with the given id.', async () => {
    const { id } = await controller.createRestaurant(restaurantObject);
    const promise = controller.getRestaurant(id);
    expect(promise).resolves.toMatchObject(restaurantObject);
  });
});
