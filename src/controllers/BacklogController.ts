import { Body, Controller, Get, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";
import { BacklogCompleteOut } from "../types/RestaurantTypes";
import { ItemValidationError } from "../exceptions/ValidationError";
import { BacklogNotFound } from "../exceptions/NotFoundError";

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
}