import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import RestaurantService from "../services/RestaurantService";
import { RestaurantCompactIn, RestaurantCompleteOut } from "../types/RestaurantTypes";

@Route('/restaurants')
@Tags('Restaurant')
export class RestaurantController extends Controller {
  @SuccessResponse(201, 'Restaurant, a branch and its backlog created successfully.')
  @Post()
  public async createRestaurant(@Body() body: RestaurantCompactIn): Promise<RestaurantCompleteOut> {
    return RestaurantService.createRestaurant(body);
  }
}