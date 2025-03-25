import { Body, Controller, Path, Post, Route, SuccessResponse, Tags } from "tsoa";
import { ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";

@Route('/backlog')
@Tags('Backlog')
export class BacklogController extends Controller {
  @SuccessResponse(201, 'Item created successfully.')
  @Post('/{backlogId}/items')
  public async createItem(@Path() backlogId: UUID, @Body() body: ItemCompactIn): Promise<ItemCompleteOut> {
    return BacklogService.createItem(backlogId, body);
  }
}