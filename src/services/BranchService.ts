import { PrismaClient } from '@prisma/client';
import { UUID } from '../types/TypeAliases';
import { CylinderCompactIn, CylinderCompleteOut, MenuCompactIn, MenuCompleteOut } from '../types/MenuTypes';

class BranchService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createMenu(branchId: UUID): Promise<MenuCompleteOut | never> {
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

  async addCylinder(menuId: UUID, cylinderDTO: CylinderCompactIn): Promise<CylinderCompleteOut | never> {
    return this.prisma.cylinder.create({
      data: {
        menuId,
        ...cylinderDTO
      }
    });
  }
}

export default new BranchService();