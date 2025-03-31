import { PrismaClient } from '@prisma/client';
import { Int, UUID } from '../types/TypeAliases';
import { UpdateCategoryIn } from '../types/CategoryTypes';

class CategoryNService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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

export default new CategoryNService();
