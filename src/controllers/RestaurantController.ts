import { Body, Controller, Get, Path, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import RestaurantService from "../services/RestaurantService";
import { RestaurantCompactIn, RestaurantCompleteOut } from "../types/RestaurantTypes";
import { RestaurantValidationError } from "../exceptions/ValidationError";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";
import { UUID } from "../types/TypeAliases";
import { RestaurantNotFound } from "../exceptions/NotFoundError";

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

  @Response<RestaurantNotFound>(404, '4041 RestaurantNotFound')
  @SuccessResponse(200, 'Restaurant is retrieved successfully.')
  @Get('/{restaurantId}')
  public async getRestaurant(@Path() restaurantId: UUID): Promise<RestaurantCompleteOut> {
    return RestaurantService.getRestaurant(restaurantId);
  }
}