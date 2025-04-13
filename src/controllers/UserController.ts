import { Get, Request, Route, Security, Tags } from "tsoa";
import BaseController from "./BaseController";
import { RolesEnum } from "../types/Enums";
import express from 'express';
import { UserSession } from "../types/AuthTypes";

@Route('/users')
@Tags('User')
export class UserController extends BaseController {
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/profile')
  public async getProfile(@Request() req: express.Request): Promise<UserSession | undefined> {
    return req.session.user;
  }
}