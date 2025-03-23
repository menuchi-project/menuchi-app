import { PrismaClient } from '@prisma/client';
import { CategoryNameCompactIn, CategoryNameCompleteOut } from '../types/CategoryTypes';

class CategoryNameService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCategoryName(categoryNameDTO: CategoryNameCompactIn): Promise<CategoryNameCompleteOut | never> {
    return this.prisma.categoryName.create({
      data: categoryNameDTO
    });
  }

  async getAllCategoryNames(): Promise<CategoryNameCompleteOut[] | never> {
    return this.prisma.categoryName.findMany();
  }
}

export default new CategoryNameService();
