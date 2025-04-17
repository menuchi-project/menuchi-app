import { Body, Controller, Delete, Patch, Path, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UUID } from "../types/TypeAliases";
import CategoryService from "../services/CategoryService";
import MenuchiError from "../exceptions/MenuchiError";

@Route('/categories')
@Tags('Category')
export class CategoryController extends Controller {
  @Response<MenuchiError>(400, 'All category IDs must be in the request.')
  @SuccessResponse(204, 'Category orders in the backlog updated successfully.')
  @Patch('/reorder-categories')
  public async reorderItemsInList(@Body() body: UUID[]): Promise<number> {
    return CategoryService.reorderCategoriesInBacklog(body);
  }

  @SuccessResponse(204, 'Category and its items deleted successfully.  It doesn\'t retrieve anything.')
  @Delete('/{categoryId}')
  public async deleteItems(@Path() categoryId: UUID): Promise<null> {
    await CategoryService.deleteCategory(categoryId);
    return null;
  }
}