import { Body, Delete, Get, Patch, Path, Post, Query, Response, Route, SuccessResponse, Tags } from "tsoa";
import { DefaultString, UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { CylinderCompactIn, CylinderCompleteOut, MenuCategoryCompactIn, MenuCategoryCompleteOut, MenuCompactIn, MenuCompleteOut } from "../types/MenuTypes";
import { CylinderValidationError, MenuCategoryValidationError, MenuValidationError } from "../exceptions/ValidationError";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";
import MenuchiError from "../exceptions/MenuchiError";
import { BranchNotFound, CategoryNotFound, CylinderNotFound, MenuNotFound } from "../exceptions/NotFoundError";
import { BacklogCompleteOut } from "../types/RestaurantTypes";

@Route('/branches')
@Tags('Branch')
export class BranchController {
  @Response<BranchNotFound>(404, '4049 BranchNotFound')
  @SuccessResponse(200, 'Backlog is retrieved successfully.')
  @Get('/{branchId}/backlog')
  public async geBacklog(@Path() branchId: UUID, @Query() search?: DefaultString): Promise<BacklogCompleteOut> {
    return BranchService.getBacklog(branchId, search);
  }

  @SuccessResponse(201, 'Menu created successfully.')
  @Post('/{branchId}/menus')
  async createMenu(@Path() branchId: UUID): Promise<MenuCompleteOut> {
    return BranchService.createMenu(branchId);
  }

  @Response<MenuNotFound>(404, '4045 MenuNotFound')
  @Response<MenuValidationError>(422, '4225 MenuValidationError')
  @SuccessResponse(204, 'Menu updated successfully.')
  @Patch('/{branchId}/menus/{menuId}')
  async updateMenu(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: MenuCompactIn
  ): Promise<null> {
    await BranchService.updateMenu(menuId, body);
    return null;
  }

  @Response<CylinderNotFound>(404, '4046 CylinderNotFound')
  @Response<CategoryNotFound>(404, '4048 CategoryNotFound')
  @Response<MenuNotFound>(404, '4045 MenuNotFound')
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<CylinderValidationError>(422, '4226 CylinderValidationError')
  @SuccessResponse(201, 'Cylinder created successfully.')
  @Post('/{branchId}/menus/{menuId}/cylinders')
  async createCylinder(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: CylinderCompactIn
  ): Promise<CylinderCompleteOut> {
    const isValid = Object.values(body).some(value => value);
    if (!isValid) throw new CylinderValidationError();

    return BranchService.createCylinder(menuId, body);
  }

  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<MenuCategoryValidationError>(422, '4227 MenuCategoryValidationError')
  @SuccessResponse(201, 'Menu Category created successfully.')
  @Post('/{branchId}/menus/{menuId}/categories')
  async createMenuCategory(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: MenuCategoryCompactIn
  ): Promise<MenuCategoryCompleteOut> {
    if (body.items.length < 1) throw new MenuCategoryValidationError();

    return BranchService.createMenuCategory(menuId, body);
  }

  @Response<MenuchiError>(400, 'All menu item IDs must be in the request.')
  @SuccessResponse(204, 'Menu item orders in the list updated successfully.')
  @Patch('/{branchId}/menus/{menuId}/categories')
  async reorderMenuItems(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: UUID[]
  ): Promise<number> {
    return BranchService.reorderMenuItems(menuId, body);
  }

  @SuccessResponse(204, 'Menu Categories deleted successfully.')
  @Delete('/{branchId}/menus/{menuId}/categories') 
  async deleteMenuCategory(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: UUID[]
  ): Promise<null> {
    await BranchService.deleteMenuCategory(menuId, body);
    return null;
  }

  @Response<MenuchiError>(400, 'All menu category IDs must be in the request.')
  @SuccessResponse(204, 'Menu category orders in the list updated successfully.')
  @Patch('/{branchId}/menus/{menuId}/items')
  async reorderMenuCategories(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: UUID[]
  ): Promise<number> {
    return BranchService.reorderMenuCategories(menuId, body);
  }

  @SuccessResponse(204, 'Menu Item hide/unhide successfully.')
  @Patch('/{branchId}/menus/{menuId}/items/{menuItemId}/hide/{isHide}')
  async hideMenuItem(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Path() menuItemId: UUID,
    @Path() isHide: boolean
  ): Promise<null> {
    await BranchService.hideMenuItem(menuId, menuItemId, !isHide);
    return null;
  }

  @SuccessResponse(204, 'Menu Items deleted successfully.')
  @Delete('/{branchId}/menus/{menuId}/items') 
  async deleteMenuItem(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: UUID[]
  ): Promise<null> {
    await BranchService.deleteMenuItems(menuId, body);
    return null;
  }
}