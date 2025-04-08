import { Body, Delete, Get, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UpdateItemIn, ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";
import { BacklogCompleteOut } from "../types/RestaurantTypes";
import { ItemValidationError } from "../exceptions/ValidationError";
import { BacklogNotFound, CategoryNameNotFound } from "../exceptions/NotFoundError";
import BaseController from "./BaseController";
import { UpdateCategoryIn } from "../types/CategoryTypes";

@Route('/backlog')
@Tags('Backlog')
export class BacklogController extends BaseController {
  @Response<CategoryNameNotFound>(404, '4042 CategoryNameNotFound')
  @Response<BacklogNotFound>(404, '4044 BacklogNotFound')
  @Response<ItemValidationError>(422, '4223 ItemValidationError')
  @SuccessResponse(201, 'Item created successfully.')
  @Post('/{backlogId}/items')
  public async createItem(@Path() backlogId: UUID, @Body() body: ItemCompactIn): Promise<ItemCompleteOut> {
    return BacklogService.createItem(backlogId, body);
  }

  @Response<BacklogNotFound>(404, '4044 BacklogNotFound')
  @SuccessResponse(200, 'Backlog is retrieved successfully.')
  @Get('/{backlogId}')
  public async geBacklog(@Path() backlogId: UUID): Promise<BacklogCompleteOut> {
    return BacklogService.getBacklog(backlogId);
  }

  @Response(200, 'BacklogNotFound without raise any error.')
  @SuccessResponse(200, 'All backlog items retrieved successfully.')
  @Get('/{backlogId}/items')
  public async getItems(@Path() backlogId: UUID): Promise<ItemCompleteOut[]> {
    return BacklogService.getItems(backlogId);
  }

  @Response<ItemValidationError>(422, '4223 ItemValidationError')
  @SuccessResponse(204, 'Item updated successfully. It doesn\'t retrieve anything.')
  @Patch('/{backlogId}/items/{itemId}')
  public async updateItem(@Path() backlogId: UUID, @Path() itemId: UUID, @Body() body: UpdateItemIn): Promise<null> {
    await BacklogService.updateItem(itemId, body);
    return null
  }

  @SuccessResponse(204, 'Items deleted successfully.  It doesn\'t retrieve anything.')
  @Delete('/{backlogId}/items')
  public async deleteItems(@Path() backlogId: UUID, @Body() body: UUID[]): Promise<null> {
    await BacklogService.deleteItems(body);
    return null;
  }

  @SuccessResponse(204, 'Category updated successfully. It doesn\'t retrieve anything.')
  @Patch('/{backlogId}/categories/{categoryId}')
  public async updateCategory(@Path() backlogId: UUID, @Path() categoryId: UUID, @Body() body: UpdateCategoryIn): Promise<null> {
    await BacklogService.updateCategory(categoryId, body);
    return null;
  }

  @SuccessResponse(204, 'Category and its items deleted successfully.  It doesn\'t retrieve anything.')
  @Delete('/{backlogId}/categories/{categoryId}')
  public async deleteCategory(@Path() backlogId: UUID, @Path() categoryId: UUID): Promise<null> {
    await BacklogService.deleteCategory(categoryId);
    return null;
  }
}