import { Prisma, PrismaClient } from '@prisma/client';
import { UUID } from '../types/TypeAliases';
import MenuchiError from '../exceptions/MenuchiError';

class CategoryNService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async reorderCategoriesInBacklog(categoriesId: UUID[]) {
    // await this.isValidCategoriesId(backlogId, categoriesId);
    return this.prisma.$executeRaw`
      UPDATE "categories"
      SET "position_in_backlog" = CASE "id"
        ${Prisma.join(categoriesId.map((categoryId, index) => Prisma.sql`WHEN ${categoryId}::uuid THEN ${index + 1}`), ' ')}
      ELSE "position_in_backlog"
      END
      WHERE "id" IN (${Prisma.join(categoriesId.map(id => Prisma.sql`${id}::uuid`))})
    `;
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

  private async isValidCategoriesId(backlogId: UUID, categoriesId: UUID[]): Promise<void | never> {
    const categories = await this.prisma.category.findMany({
      where: {
        deletedAt: null,
        backlogId
      }
    });

    const isValidQuery = (categories.length === categoriesId.length) &&
            categories.every(category => categoriesId.some(categoryId => categoryId === category.id ));
    if (!isValidQuery) throw new MenuchiError('All category IDs must be in the request.', 400);
  }
}

export default new CategoryNService();
