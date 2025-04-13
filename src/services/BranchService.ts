import { PrismaClient } from '@prisma/client';
import { UUID } from '../types/TypeAliases';
import { MenuCompleteOut } from '../types/MenuTypes';

class BranchService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createMenu(branchId: UUID): Promise<MenuCompleteOut> {
    return this.prisma.menu.create({
      data: {
        branchId
      }
    });
  }
}

export default new BranchService();