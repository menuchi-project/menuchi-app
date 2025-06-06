import { describe, expect, test } from "vitest";
import { returnBranch, returnRestaurant } from "../factories";
import { RestaurantController } from "../../src/controllers/RestaurantController";
import { BranchController } from "../../src/controllers/BranchController";
import { RestaurantNotFound } from "../../src/exceptions/NotFoundError";
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";

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

  test('should rejects create branch with constraint error.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
    await branchController.createBranch({ restaurantId, ...branchObject });
    const promise = branchController.createBranch({ restaurantId, ...branchObject });

    await expect(promise).rejects.toThrowError(Prisma.PrismaClientKnownRequestError);
  });
});

// TODO: test GET /branches/{branchId}/by-slug/{slug}

describe('PATCH /branches', () => {
  test('should updates branch successfully.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
    const { id: branchId } = await branchController.createBranch({ restaurantId, ...branchObject });
    const newBranch = {
      name: 'New Branch',
      displayName: 'new-name',
      status: 'new-status',
      showRating: true,
      instagram: 'new-id',
      telegram:'new-id',
      twitter:'new-id',
      youtube:'new-id',
      eitaa:'new-id'
    };
    await branchController.updateBranch(branchId, newBranch);
    const promise = branchController.getBranch(branchId);

    await expect(promise).resolves.toMatchObject(newBranch);
  });

    test('should rejects updates branch with constraint error.', async () => {
    const { id: restaurantId } = await restaurantController.createRestaurant(restaurantObject);
    await branchController.createBranch({ restaurantId, ...branchObject });
    const newBranch = {
      name: 'New Branch',
      displayName: 'new-name',
      status: 'new-status',
      showRating: true,
      instagram: 'new-id',
      telegram:'new-id',
      twitter:'new-id',
      youtube:'new-id',
      eitaa:'new-id'
    };
    const { id: branchId } = await branchController.createBranch({ restaurantId, ...newBranch });
    const promise = branchController.updateBranch(branchId, { displayName: branchObject.displayName });

    await expect(promise).rejects.toThrowError(Prisma.PrismaClientKnownRequestError);
  });
});