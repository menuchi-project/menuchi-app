import { Get, Request, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import BaseController from "./BaseController";
import { RolesEnum } from "../types/Enums";
import express from 'express';
import { UserSession } from "../types/AuthTypes";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";

@Route('/users')
@Tags('User')
export class UserController extends BaseController {
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(200, 'Authorized user profile retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/profile')
  public async getProfile(@Request() req: express.Request): Promise<UserSession | undefined> {
    return req.session.user;
  }
}