import { Body, Controller, Get, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { ItemCompactIn, ItemCompleteOut, ItemListCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";
import { BacklogCompleteOut } from "../types/RestaurantTypes";
import { ItemValidationError } from "../exceptions/ValidationError";
import { BacklogNotFound, NotFoundError } from "../exceptions/NotFoundError";

@Route('/backlog')
@Tags('Backlog')
export class BacklogController extends Controller {
  @Response<BacklogNotFound>(404, '4041 BacklogNotFound')
  @Response<ItemValidationError>(422, '4223 ItemValidationError')
  @SuccessResponse(201, 'Item created successfully.')
  @Post('/{backlogId}/items')
  public async createItem(@Path() backlogId: UUID, @Body() body: ItemCompactIn): Promise<ItemCompleteOut> {
    return BacklogService.createItem(backlogId, body);
  }

  @Response<BacklogNotFound>(404, '4041 BacklogNotFound')
  @SuccessResponse(200, 'Backlog is retrieved successfully')
  @Get('/{backlogId}')
  public async geBacklog(@Path() backlogId: UUID): Promise<BacklogCompleteOut> {
    return BacklogService.getBacklog(backlogId);
  }

  @Response(200, 'BacklogNotFound without raise any error.')
  @SuccessResponse(200, 'All backlog items retrieved successfully.')
  @Get('/{backlogId}/items')
  public async getItems(@Path() backlogId: UUID): Promise<ItemListCompleteOut[]> {
    return BacklogService.getItems(backlogId);
  }
}