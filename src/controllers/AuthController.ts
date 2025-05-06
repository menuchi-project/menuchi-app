import {
  Body,
  Post,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { ConstraintsDatabaseError } from '../exceptions/DatabaseError';
import { UserCompactIn, UserCompleteOut } from '../types/UserTypes';
import { UserLogin } from "../types/AuthTypes";
import AuthService from '../services/AuthService';
import { UserValidationError } from '../exceptions/ValidationError';
import express from 'express';
import { CookieNames } from '../types/Enums';
import BaseController from "./BaseController";
import { InvalidCredentialsError } from '../exceptions/AuthError';

@Route('/auth')
@Tags('Auth')
export class AuthController extends BaseController {
  /**
   * Registers a new restaurant owner.
   */
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError')
  @Response<UserValidationError>(422, '4225 UserValidationError')
  @SuccessResponse(201, 'User signed up successfully.')
  @Post('/res-signup')
  public async restaurantOwnerSignup(@Body() body: UserCompactIn): Promise<UserCompleteOut> {
    return AuthService.signup(body);
  }

  /**
   * Authenticates a restaurant owner.
   */
  @Response<InvalidCredentialsError>(401, 'InvalidCredentialsError')
  @SuccessResponse(200, 'User signed in successfully.')
  @Post('/res-signin')
  public async restaurantOwnerSignin(
    @Body() body: UserLogin,
    @Request() req: express.Request
  ): Promise<boolean> {
    if (req.session.user) return true;

    const { accessToken, user } = await AuthService.signin(body);

    this.setHeader(
      'Set-Cookie',
      `${CookieNames.AccessToken}=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${2 * 24 * 3600}`
    );

    req.session.accessToken = accessToken;
    req.session.user = user;
    req.session.lastAccessed = new Date();

    return true;
  }

  /**
   * Logs out the current user.
   */
  @SuccessResponse(200, 'User authenticated successfully')
  @Post('/check-otp')
  public async checkOtp(
    @Body() { email, code } : CheckOtpIn,
    @Request() req: express.Request
  ): Promise<boolean> {
    const otpService = ${process.env.INTERNAL_OTP_URL}${process.env.INTERNAL_OTP_ENDPOINT}/${email};
    const { code: otpCode } = await (await fetch(otpService)).json();
 
    if (code === otpCode) {
      const payload = {
        userId: email,
        roles: [RolesEnum.RestaurantCustomer]
      };
      const accessToken = AuthService.generateAuthToken(payload);
 
      this.setHeader(
        'Set-Cookie',
        ${CookieNames.AccessToken}=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${2 * 24 * 3600}
      );
 
      req.session.accessToken = accessToken;
      req.session.user = { id: email };
      req.session.lastAccessed = new Date();
    } else throw new InvalidCredentialsError();
 
    return true;
  } 
 
  @SuccessResponse(200, 'Otp code sent successfully.')
  @Post('/send-otp')
  public async sendOtp(@Body() { email } : SendOtpIn): Promise<boolean> {
    const streamName = process.env.OTP_STREAM!;
    await OtpRedisClient.xAdd(streamName, '*',  { email });
    return true;
  }
 
  @SuccessResponse(200, 'User logged out successfully.')
  @Post('/logout')
  public async logout(@Request() req: express.Request): Promise<boolean> {
    req.session.destroy(() => {});
    req.res?.clearCookie(CookieNames.AccessToken);
    req.res?.clearCookie(CookieNames.SessionId);
    return true;
  }
}