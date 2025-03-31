import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { ConstraintsDatabaseError } from '../exceptions/DatabaseError';
import { UserCompactIn, UserCompleteOut, UserLogin } from '../types/UserTypes';
import AuthService from '../services/AuthService';
import { UserValidationError } from '../exceptions/ValidationError';
import express from 'express';
import { CookieNames } from '../types/Enums';
import { UserNotFound } from '../exceptions/NotFoundError';

@Route('/auth')
@Tags('Auth')
export class AuthController extends Controller {
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<UserValidationError>(422, '4225 UserValidationError')
  @SuccessResponse(201, 'User signed up successfully.')
  @Post('/res-signup')
  public async restaurantOwnerSignup(
    @Body() body: UserCompactIn
  ): Promise<UserCompleteOut> {
    return AuthService.signup(body);
  }

  @Response<UserNotFound>(404, '4045 UserNotFound')
  @SuccessResponse(200, 'User signed in successfully.')
  @Post('/res-signin')
  public async restaurantOwnerSignin(
    @Body() body: UserLogin,
    @Request() req: express.Request
  ): Promise<boolean> {
    const token = await AuthService.signin(body);

    this.setHeader(
      'Set-Cookie',
      `${CookieNames.AccessToken}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${2 * 24 * 3600}`
    );

    req.session.accessToken = token;

    return true;
  }
}
