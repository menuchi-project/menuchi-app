import { Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { CategoryNameCompactIn, CategoryNameCompleteOut } from "../types/CategoryTypes";
import CategoryNameService from "../services/CategoryNameService";
import { CategoryNameValidationError } from "../exceptions/ValidationError";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";

@Route('/category-names')
@Tags('Category-Name')
export class CategoryNameController extends Controller {
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<CategoryNameValidationError>(422, '4222 CategoryNameValidationError')
  @SuccessResponse(201, 'Category name created successfully.')
  @Post()
  public async createCategoryName(@Body() body: CategoryNameCompactIn): Promise<CategoryNameCompleteOut> {
    return CategoryNameService.createCategoryName(body);
  }

  @SuccessResponse(200, 'All category names retrieved successfully.')
  @Get()
  public async getAllCategoryNames(): Promise<CategoryNameCompleteOut[]> {
    return CategoryNameService.getAllCategoryNames();
  }
}