import { describe, expect, test } from "vitest";
import { returnBranch, returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { BranchController } from "../../src/controllers/BranchController";
import { RestaurantNotFound } from "../../src/exceptions/NotFoundError";
import { randomUUID } from "crypto";

const restaurantObject = returnRestaurant();
const branchObject = returnBranch();
const restaurantController = new RestaurantController();
const branchController = new BranchController();

describe('POST /branches', () => {
  test('should create branch successfully.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
    const promise = branchController.createBranch({ restaurantId, ...branchObject });

    await expect(promise).resolves.toMatchObject({ restaurantId, ...branchObject });
  });

  test('should rejects create branch with RestaurantNotFound error.', async () => {
    const promise = branchController.createBranch({ restaurantId: randomUUID(), ...branchObject });

    await expect(promise).rejects.toThrowError(RestaurantNotFound);
  });
});