import { PrismaClient } from '@prisma/client';
import { DeleteItemOut, ItemCompactIn, ItemCompleteOut, ItemListCompleteOut } from '../types/ItemTypes';
import { UUID } from '../types/TypeAliases';
import { BacklogNotFound } from '../exceptions/NotFoundError';
import { BacklogCompleteOut } from '../types/RestaurantTypes';

class BacklogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createItem(
    backlogId: UUID,
    {
      categoryNameId,
      name,
      ingredients,
      price,
      picUrl,
      positionInItemsList,
      positionInCategory,
    }: ItemCompactIn
  ): Promise<ItemCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const category = await tx.category
        .upsert({
          where: {
            backlogId_categoryNameId: {
              backlogId: backlogId,
              categoryNameId: categoryNameId,
            },
          },
          update: {},
          create: {
            backlogId: backlogId,
            categoryNameId: categoryNameId,
          },
          include: {
            categoryName: true,
          },
        })
        .catch((error: Error) => {
          if (
            error.message.includes(
              'Foreign key constraint violated: `categories_branch_id_fkey (index)`'
            )
          )
            throw new BacklogNotFound();
          throw error;
        });
        
      const item = (await tx.item.create({
        data: {
          categoryId: category.id,
          name,
          ingredients,
          price,
          picUrl,
          positionInItemsList,
          positionInCategory,
        },
      })) as ItemCompleteOut;

      item.categoryName = category.categoryName;

      return item;
    });
  }

  async getBacklog(backlogId: UUID): Promise<BacklogCompleteOut | never> {
    return this.prisma.backlog.findUniqueOrThrow({
      where: {
        id: backlogId,
      },
      include: {
        categories: {
          include: {
            categoryName: true,
            items: true,
          },
        },
      },
    }).catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new BacklogNotFound();
      throw error;
    });
  }

  async getItems(backlogId: UUID): Promise<ItemListCompleteOut[]> {
    return this.prisma.item.findMany({
      where: {
        category: {
          backlog: {
            id: backlogId
          },
        }
      },
      include: {
        category: {
          include: {
            categoryName: true
          }
        }
      }
    });
  }

  async deleteItems(itemsId: UUID[]): Promise<DeleteItemOut> {
    return this.prisma.item.deleteMany({
      where: {
        id: {
          in: itemsId
        }
      }
    });
  }
}

export default new BacklogService();
