import { Post, Route, Security, SuccessResponse, Tags, Response, Body, Request } from "tsoa";
import BaseController from "./BaseController";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";
import { RolesEnum } from "../types/Enums";
import express from 'express';
import OrderService from "../services/OrderService";
import { OrderItemCompactIn } from "../types/OrderTypes";

@Route('/orders')
@Tags('Order')
export class OrderController extends BaseController {
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(201, 'Order created successfully.')
  @Security('', [RolesEnum.RestaurantCustomer, RolesEnum.RestaurantOwner])
  @Post()
  async createOrder(@Body() body: OrderItemCompactIn[], @Request() req?: express.Request) {
    const order = await OrderService.createOrder(req?.session.user?.id!, body);
    req!.session.user!.recentlyOrderIds?.push(order.id);
    return order;
  }
}