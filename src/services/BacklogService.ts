import { PrismaClient } from '@prisma/client';
import {
  UpdateItemIn,
  ItemCompactIn,
  ItemCompleteOut,
} from '../types/ItemTypes';
import { UUID } from '../types/TypeAliases';
import {
  BacklogNotFound,
  CategoryNameNotFound,
} from '../exceptions/NotFoundError';
import { BacklogCompleteOut } from '../types/RestaurantTypes';
import S3Service from './S3Service';
import { UpdateCategoryIn } from '../types/CategoryTypes';

class BacklogService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createItem(
    backlogId: UUID,
    { categoryNameId, name, ingredients, price, picKey }: ItemCompactIn
  ): Promise<ItemCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const maxCategoryPosition = await tx.category.aggregate({
        _max: {
          positionInBacklog: true,
        },
        where: {
          backlogId,
        },
      });

      const positionInBacklog =
        (maxCategoryPosition._max.positionInBacklog ?? 0) + 1;

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
            positionInBacklog,
          },
          include: {
            categoryName: true,
          },
        })
        .catch((error: Error) => {
          if (error.message.includes('categories_backlog_id_fkey (index)'))
            throw new BacklogNotFound();
          if (
            error.message.includes('categories_category_name_id_fkey (index)')
          )
            throw new CategoryNameNotFound();
          throw error;
        });

      const maxItemPositions = await tx.item.aggregate({
        _max: {
          positionInItemsList: true,
          positionInCategory: true,
        },
        where: {
          categoryId: category.id,
        },
      });

      const positionInItemsList =
        (maxItemPositions._max.positionInItemsList ?? 0) + 1;
      const positionInCategory =
        (maxItemPositions._max.positionInCategory ?? 0) + 1;

      const item = await tx.item.create({
        data: {
          categoryId: category.id,
          name,
          ingredients,
          price,
          picKey,
          positionInItemsList,
          positionInCategory,
        },
      });

      return {
        ...item,
        categoryName: category.categoryName?.name,
      };
    });
  }

  async getBacklog(backlogId: UUID): Promise<BacklogCompleteOut | never> {
    const backlog = await this.prisma.backlog
      .findUniqueOrThrow({
        where: {
          id: backlogId,
        },
        include: {
          categories: {
            where: {
              deletedAt: null,
            },
            include: {
              categoryName: true,
              items: {
                where: {
                  deletedAt: null,
                },
                orderBy: {
                  positionInCategory: 'asc',
                },
              },
            },
            omit: {
              categoryNameId: true,
            },
          },
        },
      })
      .catch((error: Error) => {
        if (error.message.includes('not found')) throw new BacklogNotFound();
        throw error;
      });

    return {
      ...backlog,
      categories: await Promise.all(
        backlog.categories.map(async (category) => ({
          ...category,
          categoryName: category.categoryName?.name ?? null,
          items: await Promise.all(
            category.items.map(async (item) => ({
              ...item,
              categoryName: category.categoryName?.name ?? null,
              picUrl: await S3Service.generateGetPresignedUrl(item.picKey),
              picKey: undefined,
            }))
          ),
        }))
      ),
    };
  }

  async getItems(backlogId: UUID): Promise<ItemCompleteOut[]> {
    const items = await this.prisma.item.findMany({
      where: {
        deletedAt: null,
        category: {
          deletedAt: null,
          backlog: {
            id: backlogId,
          },
        },
      },
      include: {
        category: {
          include: {
            categoryName: true,
          },
        },
      },
      orderBy: {
        positionInItemsList: 'asc',
      },
    });

    return await Promise.all(
      items.map(async (item) => ({
        ...item,
        categoryName: item.category?.categoryName?.name,
        category: undefined,
        picUrl: await S3Service.generateGetPresignedUrl(item.picKey),
        picKey: undefined,
      }))
    );
  }

  async updateItem(itemId: UUID, itemDTO: UpdateItemIn) {
    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: itemDTO,
    });
  }

  async deleteItems(itemsId: UUID[]) {
    return this.prisma.item.updateMany({
      where: {
        id: {
          in: itemsId,
        },
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateCategory(categoryId: UUID, { positionInBacklog }: UpdateCategoryIn) {
    return this.prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        positionInBacklog
      }
    });
  }

  async deleteCategory(categoryId: UUID) {
    return this.prisma.$transaction(async (tx) => {
      await tx.category.update({
        where: {
          id: categoryId
        },
        data: {
          deletedAt: new Date()
        }
      });

      await tx.item.updateMany({
        where: {
          categoryId
        },
        data: {
          deletedAt: new Date()
        }
      });
    });
  }
}

export default new BacklogService();