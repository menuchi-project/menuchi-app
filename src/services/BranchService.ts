import { PrismaClient } from '@prisma/client';
import { UUID } from '../types/TypeAliases';
import { MenuCompactIn, MenuCompleteOut } from '../types/MenuTypes';

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

  async updateMenu(menuId: UUID, menuDTO: MenuCompactIn) {
    return this.prisma.menu.update({
      where: {
        id: menuId
      },
      data: menuDTO
    });
  }
}

export default new BranchService();