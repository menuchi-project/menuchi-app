import { PrismaClient } from '@prisma/client';
import { UUID } from '../types/TypeAliases';
import { CylinderCompactIn, CylinderCompleteOut, MenuCategoryCompactIn, MenuCategoryCompleteOut, MenuCompactIn, MenuCompleteOut, UpdateMenuCategoryIn } from '../types/MenuTypes';

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

  async createCylinder(menuId: UUID, cylinderDTO: CylinderCompactIn): Promise<CylinderCompleteOut | never> {
    return this.prisma.cylinder.create({
      data: {
        menuId,
        ...cylinderDTO
      }
    });
  }

  async createMenuCategory(
    menuId: UUID,
    {
      categoryId,
      cylinderId,
      items 
    }: MenuCategoryCompactIn
  ): Promise<MenuCategoryCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const maxPositionInMenu = await tx.menuCategory.aggregate({
        _max: {
          positionInMenu: true
        },
        where: {
          cylinder: {
            menuId
          }
        }
      });

      const positionInMenu = (maxPositionInMenu._max.positionInMenu ?? 0) + 1;

      return tx.menuCategory.create({
        data: {
          categoryId, cylinderId, positionInMenu,
          items: {
            connect: items.map(itemId => ({ id: itemId }))
          }
        }
      });
    });
  }

  async updateMenuCategory(menuCategoryId: UUID, menuCategoryDTO: UpdateMenuCategoryIn) {
    return this.prisma.menuCategory.update({
      where: {
        id: menuCategoryId
      },
      data: menuCategoryDTO
    });
  }

  async deleteMenuCategory(menuCategoriesId: UUID[]) {
    return this.prisma.menuCategory.deleteMany({
      where: {
        id: {
          in: menuCategoriesId
        }
      }
    });
  }
}

export default new BranchService();