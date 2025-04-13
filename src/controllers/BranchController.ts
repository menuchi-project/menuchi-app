import { Body, Patch, Path, Post, Res, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { CylinderCompactIn, CylinderCompleteOut, MenuCategoryCompactIn, MenuCategoryCompleteOut, MenuCompactIn, MenuCompleteOut } from "../types/MenuTypes";
import { CylinderValidationError, MenuCategoryValidationError, MenuValidationError } from "../exceptions/ValidationError";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";

@Route('/branches')
@Tags('Branch')
export class BranchController {
  @SuccessResponse(201, 'Menu created successfully.')
  @Post('/{branchId}/menus')
  async createMenu(@Path() branchId: UUID): Promise<MenuCompleteOut> {
    return BranchService.createMenu(branchId);
  }

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
  @Post('/{branchId}/menus/{menuId}/menu-categories')
  async createMenuCategory(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: MenuCategoryCompactIn
  ): Promise<MenuCategoryCompleteOut> {
    if (body.items.length < 1) throw new MenuCategoryValidationError();

    return BranchService.createMenuCategory(menuId, body);
  }
}