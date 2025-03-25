import { PrismaClient } from '@prisma/client';
import { ItemCompactIn, ItemCompleteOut } from '../types/ItemTypes';

class ItemService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createItem({
    backlogId,
    categoryNameId,
    name,
    ingredients,
    price,
    picUrl,
    positionInItemsList,
    positionInCategory,
  }: ItemCompactIn): Promise<ItemCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const category = await tx.category.upsert({
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

      item.categoryName = category.categoryName?.name;

      return item;
    });
  }
}

export default new ItemService();
