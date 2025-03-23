import { PrismaClient } from '@prisma/client';
import { RestaurantCompactIn, RestaurantCompleteOut } from '../types/RestaurantTypes';

class RestaurantService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  createRestaurant(restaurantDTO: RestaurantCompactIn): Promise<RestaurantCompleteOut> {
    return this.prisma.restaurant.create({
      data: {
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
          include :{
            backlog: true
          }
        }
      }
    });
  }
}

export default new RestaurantService();
