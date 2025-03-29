import { Body, Controller, Delete, Patch, Path, Route, SuccessResponse, Tags } from "tsoa";
import { UUID } from "../types/TypeAliases";
import { UpdateCategoryIn } from "../types/CategoryTypes";
import CategoryService from "../services/CategoryService";

@Route('/categories')
@Tags('Category')
export class CategoryController extends Controller {
  @SuccessResponse(204, 'Category updated successfully. It doesn\'t retrieve anything.')
  @Patch('/{categoryId}')
  public async updateItem(@Path() categoryId: UUID, @Body() body: UpdateCategoryIn): Promise<null> {
    await CategoryService.updateCategory(categoryId, body);
    return null
  }

  @SuccessResponse(204, 'Category and its items deleted successfully.  It doesn\'t retrieve anything.')
  @Delete('/{categoryId}')
  public async deleteItems(@Path() categoryId: UUID): Promise<null> {
    await CategoryService.deleteCategory(categoryId);
    return null;
  }
}