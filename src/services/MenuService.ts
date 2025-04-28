import { Prisma, PrismaClient } from '@prisma/client';
import prismaClient from '../../libs/prisma';
import { UUID } from '../types/TypeAliases';
import { CylinderCompactIn, CreateCylinderCompleteOut, MenuCategoryCompactIn, CreateMenuCategoryCompleteOut, MenuCompactIn, CreateMenuCompleteOut, MenuCompleteOut, CreateMenuCompactIn } from '../types/MenuTypes';
import MenuchiError from '../exceptions/MenuchiError';
import { BranchNotFound, CategoryNotFound, CylinderNotFound, MenuNotFound } from '../exceptions/NotFoundError';
import S3Service from './S3Service';
import { BacklogCompleteOut } from '../types/RestaurantTypes';

class MenuService {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async createMenu(body: CreateMenuCompactIn): Promise<CreateMenuCompleteOut | never> {
    const newMenu = await this.prisma.menu.create({
      data: body,
      include: {
        branch: true
      }
    }).catch((error: Error) => {
      if (error.message.includes('menus_branch_id_fkey (index)'))
        throw new BranchNotFound();
      throw error;
    });

    const restaurantId = newMenu.branch?.restaurantId;
    newMenu.branch = null;

    return {
      ...newMenu,
      restaurantId: restaurantId
    };
  }

  async updateMenu(menuId: UUID, menuDTO: MenuCompactIn) {
    return this.prisma.menu.update({
      where: {
        id: menuId
      },
      data: menuDTO
    })
    .catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new MenuNotFound();
      throw error;
    });
  }

  async createCylinder(menuId: UUID, cylinderDTO: CylinderCompactIn): Promise<CreateCylinderCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const maxPositionInMenu = await tx.cylinder.aggregate({
        _max: {
          positionInMenu: true
        },
        where: {
          menuId
        }
      }).catch((error: Error) => {
        if (error.message.includes('cylinders_menu_id_fkey (index)'))
          throw new MenuNotFound();
        throw error;
      });

      const positionInMenu = (maxPositionInMenu._max.positionInMenu ?? 0) + 1;

      return tx.cylinder.create({
        data: {
          menuId,
          ...cylinderDTO,
          positionInMenu
        }
      }).catch((error: Error) => {
        if (error.message.includes('cylinders_menu_id_fkey (index)'))
          throw new MenuNotFound();
        throw error;
      });
    });
  }

  async reorderCylinders(menuId: UUID, cylindersId: UUID[]) {
    await this.isValidCylindersId(menuId, cylindersId);
    return this.prisma.$executeRaw`
      UPDATE "cylinders"
      SET "position_in_menu" = CASE "id"
        ${Prisma.join(cylindersId.map((cylinderId, index) => Prisma.sql`WHEN ${cylinderId}::uuid THEN ${index + 1}`), ' ')}
      ELSE "position_in_menu"
      END
      WHERE "id" IN (${Prisma.join(cylindersId.map(id => Prisma.sql`${id}::uuid`))})
    `;
  }

  async createMenuCategory(
    menuId: UUID,
    {
      categoryId,
      cylinderId,
      items 
    }: MenuCategoryCompactIn
  ): Promise<CreateMenuCategoryCompleteOut | never> {
    return this.prisma.$transaction(async (tx) => {
      const maxPositionInCylinder = await tx.menuCategory.aggregate({
        _max: {
          positionInCylinder: true
        },
        where: {
          cylinder: {
            menuId
          }
        }
      }).catch((error: Error) => {
        if (error.message.includes('cylinders_menu_id_fkey (index)'))
          throw new MenuNotFound();
        throw error;
      });

      const positionInCylinder = (maxPositionInCylinder._max.positionInCylinder ?? 0) + 1;

      await tx.category.findUniqueOrThrow({
        where: {
          id: categoryId,
          backlog: {
            branch: {
              menus: {
                some: {
                  id: menuId
                }
              }
            }
          }
        }
      }).catch((error: Error) => {
          if (error.message.includes('not found'))
            throw new CategoryNotFound();
          throw error;
      });

      const newMenuCategory = await tx.menuCategory.create({
        data: {
          categoryId, cylinderId, positionInCylinder,
          items: {
            connect: items.map(itemId => ({ id: itemId }))
          }
        }
      }).catch((error: Error) => {
        if (error.message.includes('menu_categories_menu_id_fkey (index)'))
          throw new MenuNotFound();
        if (error.message.includes('menu_categories_cylinder_id_fkey (index)'))
          throw new CylinderNotFound();
        if (error.message.includes('menu_categories_category_id_fkey'))
          throw new CategoryNotFound();
        throw error;
      });

      await tx.$executeRaw`
        UPDATE "items"
        SET "position_in_menu_categories" = CASE "id"
          ${Prisma.join(items.map((itemId, index) => Prisma.sql`WHEN ${itemId}::uuid THEN ${index + 1}`), ' ')}
        ELSE "position_in_menu_categories"
        END
        WHERE "id" IN (${Prisma.join(items.map(id => Prisma.sql`${id}::uuid`))})
      `;

      return newMenuCategory;
    });
  }

  async reorderMenuCategories(menuId: UUID, menuCategoriesId: UUID[]) {
    await this.isValidMenuCategoriesId(menuId, menuCategoriesId);
    return this.prisma.$executeRaw`
      UPDATE "menu_categories"
      SET "position_in_cylinder" = CASE "id"
        ${Prisma.join(menuCategoriesId.map((menuCategory, index) => Prisma.sql`WHEN ${menuCategory}::uuid THEN ${index + 1}`), ' ')}
      ELSE "position_in_cylinder"
      END
      WHERE "id" IN (${Prisma.join(menuCategoriesId.map(id => Prisma.sql`${id}::uuid`))})
    `;
  }

  async deleteMenuCategory(menuId: UUID, menuCategoriesId: UUID[]) {
    return this.prisma.$transaction(async (tx) => {
      await tx.menuCategory.deleteMany({
        where: {
          id: {
            in: menuCategoriesId
          },
          cylinder: {
            menuId
          }
        }
      });

      await tx.item.updateMany({
        where: {
          menuCategoryId: {
            in: menuCategoriesId
          },
          menuCategory: {
            cylinder: {
              menuId
            }
          }
        },
        data: {
          positionInMenuCategory: null,
          isActive: true
        }
      });
    });
  }

  async reorderMenuItems(menuId: UUID, menuItemsId: UUID[]) {
    await this.isValidMenuItemsId(menuId, menuItemsId);
    return this.prisma.$executeRaw`
      UPDATE "items"
      SET "position_in_menu_categories" = CASE "id"
        ${Prisma.join(menuItemsId.map((menuItem, index) => Prisma.sql`WHEN ${menuItem}::uuid THEN ${index + 1}`), ' ')}
      ELSE "position_in_menu_categories"
      END
      WHERE "id" IN (${Prisma.join(menuItemsId.map(id => Prisma.sql`${id}::uuid`))})
    `;
  }

  async deleteMenuItems(menuId: UUID, menuItemsId: UUID[]) {
    return this.prisma.item.updateMany({
      where: {
        id: {
          in: menuItemsId
        },
        menuCategory: {
          cylinder: {
            menuId
          }
        }
      },
      data: {
        menuCategoryId: null,
        positionInMenuCategory: null,
        isActive: true
      }
    });
  }

  async hideMenuItem(menuId: UUID, menuItemId: UUID, isActive: boolean) {
    return this.prisma.item.update({
      where: {
        id: menuItemId,
        menuCategory: {
          cylinder: {
            menuId
          }
        }
      },
      data: {
        isActive
      }
    });
  }

  private async isValidMenuItemsId(menuId: UUID, itemsId: UUID[]): Promise<void | never> {
      const items = await this.prisma.item.findMany({
        where: {
          deletedAt: null,
          menuCategory: {
            cylinder: {
              menuId
            }
          }
        },
        select: {
          id: true
        }
      });
      
      const isValidQuery = (items.length === itemsId.length) &&
              items.every(item => itemsId.some(itemId => itemId === item.id ));
      if (!isValidQuery) throw new MenuchiError('All menu items IDs must be in the request.', 400);
  }

  private async isValidMenuCategoriesId(menuId: UUID, menuCategoriesId: UUID[]): Promise<void | never> {
    const menuCategories = await this.prisma.menuCategory.findMany({
      where: {
        cylinder: {
          menuId
        }
      },
      select: {
        id: true
      }
    });
    
    const isValidQuery = (menuCategories.length === menuCategoriesId.length) &&
            menuCategories.every(menuCategory => menuCategoriesId.some(menuCategoryId => menuCategoryId === menuCategory.id ));
    if (!isValidQuery) throw new MenuchiError('All menu category IDs must be in the request.', 400);
  }

  private async isValidCylindersId(menuId: UUID, cylindersId: UUID[]): Promise<void | never> {
    const cylinders = await this.prisma.cylinder.findMany({
      where: {
        menuId
      },
      select: {
        id: true
      }
    });
    
    const isValidQuery = (cylinders.length === cylindersId.length) &&
            cylinders.every(cylinder => cylindersId.some(cylinderId => cylinderId === cylinder.id ));
    if (!isValidQuery) throw new MenuchiError('All cylinder IDs must be in the request.', 400);
  }

  async getBacklog(backlogId: UUID, search = ''): Promise<BacklogCompleteOut | never> {
      const backlog = await this.prisma.backlog
        .findUniqueOrThrow({
          where: {
            id: backlogId,
          },
          include: {
            categories: {
              where: {
                deletedAt: null,
                categoryName: {
                  name: {
                    contains: search,
                    mode: 'insensitive'
                  }
                }
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
          if (error.message.includes('not found'))
            throw new BranchNotFound();
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

  async getMenu(menuId: UUID): Promise<MenuCompleteOut | never> {
    const menu = await this.prisma.menu.findUniqueOrThrow({
      where: {
        id: menuId
      },
      include: {
        cylinders: {
          include: {
            menuCategories: {
              include: {
                category: {
                  select: {
                    categoryName: true
                  }
                },
                items: true
              }
            }
          }
        }
      }
    })
    .catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new MenuNotFound();
      throw error;
    });

    return {
      ...menu,
      cylinders: await Promise.all(menu.cylinders.map(async (cylinder) => ({
        ...cylinder,
        days: [
          cylinder.sat,
          cylinder.sun,
          cylinder.mon,
          cylinder.tue,
          cylinder.wed,
          cylinder.thu,
          cylinder.fri
        ],
        sat: undefined,
        sun: undefined,
        mon: undefined,
        tue: undefined,
        wed: undefined,
        thu: undefined,
        fri: undefined,
        menuCategories: await Promise.all(cylinder.menuCategories.map(async (menuCategory) => ({
          ...menuCategory,
          categoryName: menuCategory.category?.categoryName?.name ?? null,
          category: undefined,
          items: await Promise.all(
            menuCategory.items.map(async (item) => ({
              ...item,
              picUrl: await S3Service.generateGetPresignedUrl(item.picKey),
              picKey: undefined,
            }))
          ),
        })))
      })))
    };
  }
}

export default new MenuService();