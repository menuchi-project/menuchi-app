import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import ItemService from "../services/ItemService";

@Route('/items')
@Tags('Item')
export class ItemController extends Controller {
  @SuccessResponse(201, 'Item and its category created successfully.')
  @Post()
  public async createItem(@Body() body: ItemCompactIn): Promise<ItemCompleteOut> {
    return ItemService.createItem(body);
  }
}