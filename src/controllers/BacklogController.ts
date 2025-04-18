import { Body, Delete, Get, Patch, Path, Post, Request, Response, Route, Security, SuccessResponse, Tags } from "tsoa";
import { UpdateItemIn, ItemCompactIn, ItemCompleteOut } from "../types/ItemTypes";
import BacklogService from "../services/BacklogService";
import { UUID } from "../types/TypeAliases";
import { BacklogCompleteOut } from "../types/RestaurantTypes";
import { ItemValidationError } from "../exceptions/ValidationError";
import { BacklogNotFound, CategoryNameNotFound } from "../exceptions/NotFoundError";
import BaseController from "./BaseController";
import express from 'express';
import { PermissionScope, RolesEnum } from "../types/Enums";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";
import MenuchiError from "../exceptions/MenuchiError";

@Route('/backlog')
@Tags('Backlog')
export class BacklogController extends BaseController {
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<CategoryNameNotFound>(404, '4042 CategoryNameNotFound')
  @Response<BacklogNotFound>(404, '4044 BacklogNotFound')
  @Response<ItemValidationError>(422, '4223 ItemValidationError')
  @SuccessResponse(201, 'Item created successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Post('/{backlogId}/items')
  public async createItem(
    @Path() backlogId: UUID,
    @Body() body: ItemCompactIn,
    @Request() req: express.Request
  ): Promise<ItemCompleteOut> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.createItem(backlogId, body);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<BacklogNotFound>(404, '4044 BacklogNotFound')
  @SuccessResponse(200, 'Backlog is retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/{backlogId}')
  public async geBacklog(@Path() backlogId: UUID, @Request() req: express.Request): Promise<BacklogCompleteOut> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.getBacklog(backlogId);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response(200, 'BacklogNotFound without raise any error.')
  @SuccessResponse(200, 'All backlog items retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/{backlogId}/items')
  public async getItems(@Path() backlogId: UUID, @Request() req: express.Request): Promise<ItemCompleteOut[]> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.getItems(backlogId);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<ItemValidationError>(422, '4223 ItemValidationError')
  @SuccessResponse(204, 'Item updated successfully. It doesn\'t retrieve anything.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Patch('/{backlogId}/items/{itemId}')
  public async updateItem(
    @Path() backlogId: UUID,
    @Path() itemId: UUID,
    @Body() body: UpdateItemIn,
    @Request() req: express.Request
  ): Promise<null> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    await BacklogService.updateItem(backlogId, itemId, body);
    return null;
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<MenuchiError>(400, 'All item IDs must be in the request.')
  @SuccessResponse(204, 'Item orders in the category updated successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Patch('/{backlogId}/reorder-items/in-category')
  public async reorderItemsInCategory(
    @Path() backlogId: UUID,
    @Body() body: UUID[],
    @Request() req: express.Request
  ): Promise<number> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.reorderItemsInCategory(backlogId, body);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<MenuchiError>(400, 'All item IDs must be in the request.')
  @SuccessResponse(204, 'Item orders in the list updated successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Patch('/{backlogId}/reorder-items/in-list')
  public async reorderItemsInList(
    @Path() backlogId: UUID,
    @Body() body: UUID[],
    @Request() req: express.Request
  ): Promise<number> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.reorderItemsInList(backlogId, body);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(204, 'Items deleted successfully. It doesn\'t retrieve anything.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Delete('/{backlogId}/items')
  public async deleteItems(
    @Path() backlogId: UUID,
    @Body() body: UUID[],
    @Request() req: express.Request
  ): Promise<null> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    await BacklogService.deleteItems(backlogId, body);
    return null;
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<MenuchiError>(400, 'All category IDs must be in the request.')
  @Security('', [RolesEnum.RestaurantOwner])
  @SuccessResponse(204, 'Category orders in the backlog updated successfully.')
  @Patch('/{backlogId}/reorder-categories')
  public async reorderCategoriesInBacklog(
    @Path() backlogId: UUID,
    @Body() body: UUID[],
    @Request() req: express.Request
  ): Promise<number> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    return BacklogService.reorderCategoriesInBacklog(backlogId, body);
  }

  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @SuccessResponse(204, 'Category and its items deleted successfully.  It doesn\'t retrieve anything.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Delete('/{backlogId}/categories/{categoryId}')
  public async deleteCategory(
    @Path() backlogId: UUID,
    @Path() categoryId: UUID,
    @Request() req: express.Request
  ): Promise<null> {
    this.checkPermission(req.session.user, PermissionScope.Backlog, backlogId);
    await BacklogService.deleteCategory(backlogId, categoryId);
    return null;
  }
}