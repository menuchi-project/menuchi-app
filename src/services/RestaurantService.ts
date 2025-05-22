import { PrismaClient } from '@prisma/client';
import prismaClient from '../db/prisma';
import {
  RestaurantCompactIn,
  RestaurantCompleteOut,
} from '../types/RestaurantTypes';
import { UUID } from '../types/TypeAliases';
import { RestaurantNotFound } from '../exceptions/NotFoundError';
import S3Service from './S3Service';

class RestaurantService {
  constructor(private prisma: PrismaClient = prismaClient) {}

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
            address: true,
            openingTimes: true
          },
        },
      },
    });
  }

  async getRestaurant(restaurantId: UUID): Promise<RestaurantCompleteOut> {
    const { avatarKey, coverKey, logoKey, ...restaurant } = await this.prisma.restaurant
      .findUniqueOrThrow({
        where: {
          id: restaurantId,
        },
        include: {
          branches: {
            include: {
              backlog: true,
              address: true,
              openingTimes: true
            },
          },
        },
      })
      .catch((error: Error) => {
        if (error.message.includes('not found')) throw new RestaurantNotFound();
        throw error;
      });

    return {
      ...restaurant,
      avatarUrl: await S3Service.generateGetPresignedUrl(avatarKey),
      coverUrl: await S3Service.generateGetPresignedUrl(coverKey),
      logoUrl: await S3Service.generateGetPresignedUrl(logoKey)
    };
  }
}

export default new RestaurantService();
