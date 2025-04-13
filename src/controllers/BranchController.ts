import { Body, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { CylinderCompactIn, CylinderCompleteOut, MenuCompactIn, MenuCompleteOut } from "../types/MenuTypes";
import { CylinderValidationError, MenuValidationError } from "../exceptions/ValidationError";

@Route('/branches')
@Tags('Branch')
export class BranchController {
  @SuccessResponse(201, 'Menu created successfully.')
  @Post('/{branchId}/menus')
  async createMenu(@Path() branchId: UUID): Promise<MenuCompleteOut> {
    return BranchService.createMenu(branchId);
  }

  @Response<MenuValidationError>(422, '4225 MenuValidationError')
  @SuccessResponse(200, 'Menu updated successfully.')
  @Patch('/{branchId}/menus/{menuId}')
  async updateMenu(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: MenuCompactIn
  ): Promise<null> {
    await BranchService.updateMenu(menuId, body);
    return null;
  }

  @Response<CylinderValidationError>(422, '4226 CylinderValidationError')
  @SuccessResponse(201, 'Cylinder created successfully.')
  @Post('/{branchId}/menus/{menuId}/cylinders')
  async addCylinder(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: CylinderCompactIn
  ): Promise<CylinderCompleteOut> {
    const isValid = Object.values(body).some(value => value);
    if (!isValid) throw new CylinderValidationError();
    return BranchService.addCylinder(menuId, body);
  }
}