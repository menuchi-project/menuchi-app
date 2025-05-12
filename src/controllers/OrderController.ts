import { Post, Route, Security, SuccessResponse, Tags, Response, Body, Request, Path, Get, Patch } from "tsoa";
import BaseController from "./BaseController";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";
import { OrderStatus, PermissionScope, RolesEnum } from "../types/Enums";
import express from 'express';
import OrderService from "../services/OrderService";
import { CreateOrderCompactIn, OrderCompleteOut } from "../types/OrderTypes";
import { UUID } from "../types/TypeAliases";

@Route()
@Tags('Order')
export class OrderController extends BaseController {
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(201, 'Order created successfully.')
  @Security('', [RolesEnum.RestaurantCustomer, RolesEnum.RestaurantOwner])
  @Post('/menus/{menuId}/orders')
  async createOrder(
    @Path() menuId: UUID,
    @Body() body: CreateOrderCompactIn,
    @Request() req?: express.Request
  ): Promise<OrderCompleteOut> {
    const order = await OrderService.createOrder(req?.session.user?.id!,menuId, body);
    req!.session.user!.recentlyOrderIds?.push(order.id);
    return order;
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(200, 'All the menu orders retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/menus/{menuId}/orders')
  async getOrders(@Path() menuId: UUID, @Request() req?: express.Request): Promise<OrderCompleteOut[]> {
    this.checkPermission(req?.session.user, PermissionScope.Menu, menuId);
    return OrderService.getOrders(menuId);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(200, 'All the branch orders retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/branches/{branchId}/orders')
  async getAllOrders(@Path() branchId: UUID, @Request() req?: express.Request): Promise<OrderCompleteOut[]> {
    this.checkPermission(req?.session.user, PermissionScope.Branch, branchId);
    return OrderService.getAllOrders(branchId);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(200, 'All the menu orders retrieved successfully.')
  @Security('', [RolesEnum.RestaurantCustomer])
  @Get('/customer/orders')
  async getRecentlyOrders(@Request() req?: express.Request): Promise<OrderCompleteOut[]> {
    return OrderService.getRecentlyOrders(req!.session.user!.recentlyOrderIds!);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(200, 'All the menu orders retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Patch('/menus/{menuId}/orders/{orderId}')
  async updateOrderStatus(
    @Path() menuId: UUID,
    @Path() orderId: UUID,
    @Body() body: { status: OrderStatus },
    @Request() req?: express.Request
  ): Promise<null> {
    this.checkPermission(req?.session.user, PermissionScope.Menu, menuId);
    await OrderService.updateOrderStatus(orderId, body.status);
    return null;
  }
}