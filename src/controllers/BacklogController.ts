import { Body, Controller, Delete, Get, Patch, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { UpdateItemIn, ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";
import { BacklogCompleteOut } from "../types/RestaurantTypes";
import { ItemValidationError } from "../exceptions/ValidationError";
import { BacklogNotFound, CategoryNameNotFound } from "../exceptions/NotFoundError";

@Route('/backlog')
@Tags('Backlog')
export class BacklogController extends Controller {
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
  @Patch('/items/{itemId}')
  public async updateItem(@Path() itemId: UUID, @Body() body: UpdateItemIn): Promise<null> {
    await BacklogService.updateItem(itemId, body);
    return null
  }

  @SuccessResponse(204, 'Items deleted successfully.  It doesn\'t retrieve anything.')
  @Delete('/items')
  public async deleteItems(@Body() body: UUID[]): Promise<null> {
    await BacklogService.deleteItems(body);
    return null;
  }
}