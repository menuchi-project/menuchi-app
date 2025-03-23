import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import RestaurantService from "../services/RestaurantService";
import { RestaurantCompactIn, RestaurantCompleteOut } from "../types/RestaurantTypes";
import { RestaurantValidationError } from "../exceptions/ValidationError";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";

@Route('/restaurants')
@Tags('Restaurant')
export class RestaurantController extends Controller {
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<RestaurantValidationError>(422, '4221 RestaurantValidationError')
  @SuccessResponse(201, 'Restaurant, a branch and its backlog created successfully.')
  @Post()
  public async createRestaurant(@Body() body: RestaurantCompactIn): Promise<RestaurantCompleteOut> {
    return RestaurantService.createRestaurant(body);
  }
}