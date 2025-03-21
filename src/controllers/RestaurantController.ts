import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import RestaurantService from "../services/RestaurantService";
import { RestaurantCompactIn, RestaurantCompleteOut } from "../types/RestaurantTypes";
import { RestaurantValidationError } from "../exceptions/ValidationError";

@Route('/restaurants')
@Tags('Restaurant')
export class RestaurantController extends Controller {
  @Response<RestaurantValidationError>(422, '4221 RestaurantValidationError')
  @SuccessResponse(201, 'Restaurant, a branch and its backlog created successfully.')
  @Post()
  public async createRestaurant(@Body() body: RestaurantCompactIn): Promise<RestaurantCompleteOut> {
    return RestaurantService.createRestaurant(body);
  }
}