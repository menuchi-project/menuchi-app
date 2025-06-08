import { describe, expect, test } from "vitest";
import { returnAddress, returnBranch, returnOpeningTimes, returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { BranchController } from "../../src/controllers/BranchController";
import { randomUUID } from "crypto";
import { RestaurantNotFound } from "../../src/exceptions/NotFoundError";

const restaurantObject = returnRestaurant();
const branchObject = returnBranch();
const addressObject = returnAddress();
const openingTimesObject = returnOpeningTimes();
const restaurantController = new RestaurantController();
const branchController = new BranchController();

describe('POST /restaurants', () => {
  test('should create restaurant with a default branch and backlog successfully.', async () => {
    const promise = restaurantController.createRestaurant(restaurantObject);
    await expect(promise).resolves.toMatchObject(restaurantObject);
  });

  test('should return the restaurant with the given id.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
    const promise = restaurantController.getRestaurant(restaurantId);

    await expect(promise).resolves.toMatchObject(restaurantObject);
  });
});

describe('GET /restaurants/{restaurantId}', () => {
  test('should retrieves restaurant with its complete branches successfully.', async () => {
    const restaurant = await restaurantController.createRestaurant(restaurantObject);
    const branch = await branchController.createBranch({ restaurantId: restaurant.id, ...branchObject });
    await branchController.createOrUpdateAddress(branch.id, addressObject);
    await branchController.createOrUpdateOpeningTimes(branch.id, openingTimesObject);
    const promise = restaurantController.getRestaurant(restaurant.id);
        
    await expect(promise).resolves.toMatchObject({
      ...restaurantObject,
      branches: [expect.objectContaining({
        ...branchObject,
        restaurantId: restaurant.id,
        address: expect.objectContaining(addressObject),
        openingTimes: expect.objectContaining(openingTimesObject),
      })],
    });
  });

  test('should rejects retrieves restaurant with RestaurantNotFound error.', async () => {
    const promise = restaurantController.getRestaurant(randomUUID());

    await expect(promise).rejects.toThrowError(RestaurantNotFound);
  });
});

describe('PATCH /restaurants/{restaurantId}', () => {
  test('should update restaurant successfully.', async () => {
    const promise = restaurantController.createRestaurant(restaurantObject);
    await expect(promise).resolves.toMatchObject(restaurantObject);
  });

  test('should return the restaurant with the given id.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
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
    await restaurantController.updateRestaurant(restaurantId, newRestaurant);
    const promise = restaurantController.getRestaurant(restaurantId);

    await expect(promise).resolves.toMatchObject(newRestaurant);
  });
});