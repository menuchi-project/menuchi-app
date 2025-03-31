import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";
import { UserCompactIn, UserCompleteOut } from "../types/UserTypes";
import AuthService from "../services/AuthService";
import { UserValidationError } from "../exceptions/ValidationError";

@Route('/auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<UserValidationError>(422, '4225 UserValidationError')
  @SuccessResponse(201, 'User signed up successfully.')
  @Post('/res-signup')
  public async restaurantOwnerSignup(@Body() body: UserCompactIn): Promise<UserCompleteOut> {
    return AuthService.signup(body);
  }
}