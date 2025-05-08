import { PrismaClient } from "@prisma/client";
import prismaClient from '../db/prisma';
import { Email } from "../types/TypeAliases";
import { OrderItemCompactIn } from "../types/OrderTypes";

class OrderService {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async createOrder(customerEmail: Email, items: OrderItemCompactIn[]) {
    return this.prisma.$transaction(async (tx) => {
      const dbItems = await tx.item.findMany({
        where: {
          id: {
            in: items.map(item => item.itemId)
          }
        },
        select: {
          id: true,
          price: true
        },
      });

      let totalPrice = 0;
      const orderItems = dbItems.map(item => {
        const amount = items.find(i => item.id === i.itemId)?.amount ?? 1;
        totalPrice += amount * item.price!;
        return {
          itemId: item.id,
          amount,
          price: item.price
        };
      });

      return tx.order.create({
        data: {
          customerEmail,
          orderItems: {
            create: orderItems
          },
          totalPrice,
        },
        include: {
          orderItems: true
        }
      });
    });
  }
}

export default new OrderService();