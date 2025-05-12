import { PrismaClient } from "@prisma/client";
import prismaClient from '../db/prisma';
import { Email, UUID } from "../types/TypeAliases";
import { CreateOrderCompactIn, OrderCompleteOut } from "../types/OrderTypes";
import S3Service from "./S3Service";
import { OrderStatus } from "../types/Enums";

class OrderService {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async createOrder(customerEmail: Email, menuId: UUID, { items }: CreateOrderCompactIn): Promise<OrderCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const dbItems = await tx.item.findMany({
        where: {
          id: {
            in: items.map(item => item.itemId)
          },
          menuCategory: {
            cylinder: {
              menuId
            }
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

      const order = await tx.order.create({
        data: {
          menuId,
          customerEmail,
          orderItems: {
            create: orderItems
          },
          totalPrice,
        },
        include: {
          orderItems: {
            include: {
              item: true
            }
          }
        }
      });

      return {
        ...order,
        orderItems: await Promise.all(order.orderItems.map(async (orderItem) => ({
          name: orderItem.item?.name,
          pikUrl: await S3Service.generateGetPresignedUrl(orderItem.item?.picKey!) ?? null,
          ...orderItem,
          item: undefined
        }))),
        status: order.status as OrderStatus
      };
    });
  }

  async getOrders(menuId: UUID): Promise<OrderCompleteOut[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        menuId
      },
      include: {
        orderItems: true
      }
    });

    return orders.map(order => ({
      ...order,
      status: order.status as OrderStatus,
    }));
  }

  async getAllOrders(branchId: UUID) {
    const orders = await this.prisma.order.findMany({
      where: {
        menu: {
          branchId
        }
      },
      include: {
        orderItems: true
      }
    });

    return orders.map(order => ({
      ...order,
      status: order.status as OrderStatus,
    }));
  }
}

export default new OrderService();