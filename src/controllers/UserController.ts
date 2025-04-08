import { Get, Request, Route, Security, Tags } from "tsoa";
import BaseController from "./BaseController";
import { RolesEnum } from "../types/Enums";
import express from 'express';

@Route('/users')
@Tags('User')
export class UserController extends BaseController {
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/profile')
  public async getProfile(@Request() req: express.Request) {
    return req.session.user;
  }
}