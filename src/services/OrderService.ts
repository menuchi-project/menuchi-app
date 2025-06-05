import { PrismaClient } from "@prisma/client";
import prismaClient from '../db/prisma';
import { Email, UUID } from "../types/TypeAliases";
import { CreateOrderCompactIn, OrderCompleteOut } from "../types/OrderTypes";
import S3Service from "./S3Service";
import { OrderStatus } from "../types/Enums";
import { ItemNotFound } from "../exceptions/NotFoundError";

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

      if (dbItems.length < 1) throw new ItemNotFound();

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

  async getOrders(menuId: UUID, skip = 0, take = 10, isCompleted = true): Promise<OrderCompleteOut[]> {
    const statusWhereClause = isCompleted ? {} :
                  { in: [OrderStatus.Pending, OrderStatus.Preparing, OrderStatus.Ready] };
    const orders = await this.prisma.order.findMany({
      where: {
        menuId,
        status: statusWhereClause,
        deletedAt: null
      },
      include: {
        orderItems: {
          include: {
            item: true
          }
        }
      },
      skip, take
    });

    return await Promise.all(orders.map(async (order) => ({
      ...order,
      orderItems: await Promise.all(order.orderItems.map(async (orderItem) => ({
        name: orderItem.item?.name,
        pikUrl: await S3Service.generateGetPresignedUrl(orderItem.item?.picKey!) ?? null,
        ...orderItem,
        item: undefined
      }))),
      status: order.status as OrderStatus
    })));
  }

  async getAllOrders(branchId: UUID, skip = 0, take = 10, isCompleted = true): Promise<OrderCompleteOut[]> {
    const statusWhereClause = isCompleted ? {} :
                  { in: [OrderStatus.Pending, OrderStatus.Preparing, OrderStatus.Ready] };
    const orders = await this.prisma.order.findMany({
      where: {
        menu: {
          branchId,
        },
        status: statusWhereClause,
        deletedAt: null
      },
      include: {
        orderItems: {
          include: {
            item: true
          }
        }
      },
      skip, take
    });

    return await Promise.all(orders.map(async (order) => ({
      ...order,
      orderItems: await Promise.all(order.orderItems.map(async (orderItem) => ({
        name: orderItem.item?.name,
        pikUrl: await S3Service.generateGetPresignedUrl(orderItem.item?.picKey!) ?? null,
        ingredients: orderItem.item?.ingredients,
        ...orderItem,
        item: undefined
      }))),
      status: order.status as OrderStatus
    })));
  }

  async getRecentlyOrders(recentlyOrderIds: UUID[]): Promise<OrderCompleteOut[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        id: {
          in: recentlyOrderIds
        }
      },
      include: {
        orderItems: {
          include: {
            item: true
          }
        }
      }
    });

    return await Promise.all(orders.map(async (order) => ({
      ...order,
      orderItems: await Promise.all(order.orderItems.map(async (orderItem) => ({
        name: orderItem.item?.name,
        pikUrl: await S3Service.generateGetPresignedUrl(orderItem.item?.picKey!) ?? null,
        ...orderItem,
        item: undefined
      }))),
      status: order.status as OrderStatus
    })));
  }

  async updateOrderStatus(orderId: UUID, status: OrderStatus) {
    return this.prisma.$transaction(async (tx) => {
      if (status === OrderStatus.Ready) {
        const orderItems = await tx.orderItem.findMany({
          where: {
            orderId
          },
          select: {
            itemId: true,
            amount: true
          }
        });

        await Promise.all(orderItems.map(({ itemId, amount }) => {
          if (!itemId) return Promise.resolve();
          return tx.item.update({
            where: {
              id: itemId
            },
            data: {
              orderCount: {
                increment: amount ?? 1
              }
            }
          });
        }));
      }

      return tx.order.update({
        where: {
          id: orderId
        },
        data: {
          status
        }
      });
    });
  }

  async deleteOrders(menuId: UUID, ordersId: UUID[]) {
    return this.prisma.$transaction(async (tx) => {
      await tx.order.updateMany({
        where: {
          id: {
            in: ordersId
          },
          menuId,
          deletedAt: null
        },
        data: {
          deletedAt: new Date()
        }
      });

      await tx.orderItem.updateMany({
        where: {
          orderId: {
            in: ordersId
          },
          order: {
            menuId
          },
          deletedAt: null
        },
        data: {
          deletedAt: new Date()
        }
      });
    });
  }
}

export default new OrderService();