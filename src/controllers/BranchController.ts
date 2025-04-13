import { Body, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { MenuCompactIn, MenuCompleteOut } from "../types/MenuTypes";
import { MenuValidationError } from "../exceptions/ValidationError";

@Route('/branches')
@Tags('Branch')
export class BranchController {
  @SuccessResponse(201, 'Menu created successfully.')
  @Post('/{branchId}/menus')
  async createMenu(@Path() branchId: UUID): Promise<MenuCompleteOut> {
    return BranchService.createMenu(branchId);
  }

  @Response<MenuValidationError>(422, '4225 MenuValidationError')
  @SuccessResponse(200, 'Menu created successfully.')
  @Patch('/{branchId}/menus/{menuId}')
  async updateMenu(
    @Path() branchId: UUID,
    @Path() menuId: UUID,
    @Body() body: MenuCompactIn): Promise<null> {
    await BranchService.updateMenu(menuId, body);
    return null;
  }
}