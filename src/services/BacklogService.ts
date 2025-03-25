import { PrismaClient } from '@prisma/client';
import { ItemCompactIn, ItemCompleteOut } from '../types/ItemTypes';
import { UUID } from '../types/TypeAliases';
import { BacklogNotFound } from '../exceptions/NotFoundError';

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
      // const backlog = await tx.backlog.findUnique({
      //   where: { id: backlogId },
      // });

      // if (!backlog) {
      //   throw new BacklogNotFound();
      // }

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
          if (error.message.includes('Foreign key constraint violated: `categories_branch_id_fkey (index)`'))
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

      item.categoryName = category.categoryName?.name;

      return item;
    });
  }
}

export default new BacklogService();
