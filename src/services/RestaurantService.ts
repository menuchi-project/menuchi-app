import { PrismaClient } from '@prisma/client';
import {
  RestaurantCompactIn,
  RestaurantCompleteOut,
} from '../types/RestaurantTypes';
import { UUID } from '../types/TypeAliases';
import { RestaurantNotFound } from '../exceptions/NotFoundError';

class RestaurantService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

 async createRestaurant(
    restaurantDTO: RestaurantCompactIn,
    managerId?: UUID
  ): Promise<RestaurantCompleteOut | never> {
    return this.prisma.restaurant.create({
      data: {
        managerId,
        ...restaurantDTO,
        branches: {
          create: {
            backlog: {
              create: {},
            },
          },
        },
      },
      include: {
        branches: {
          include: {
            backlog: true,
          },
        },
      },
    });
  }

  async getRestaurant(restaurantId: UUID): Promise<RestaurantCompleteOut> {
    return this.prisma.restaurant
      .findUniqueOrThrow({
        where: {
          id: restaurantId,
        },
        include: {
          branches: {
            include: {
              backlog: true,
            },
          },
        },
      })
      .catch((error: Error) => {
        if (error.message.includes('not found')) throw new RestaurantNotFound();
        throw error;
      });
  }
}

export default new RestaurantService();
