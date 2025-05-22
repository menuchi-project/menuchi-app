import { Body, Get, Path, Post, Response, Route, Security, SuccessResponse, Tags, Request } from "tsoa";
import express from "express";
import BaseController from "./BaseController";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";
import { PermissionScope, RolesEnum } from "../types/Enums";
import { UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { BranchCompleteOut } from "../types/RestaurantTypes";
import { BranchNotFound } from "../exceptions/NotFoundError";

@Route('/branches')
@Tags('Branch')
export class BranchController extends BaseController {
  /**
   * Retrieves a branch by its id.
   */
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<BranchNotFound>(404, '4049 BranchNotFound')
  @SuccessResponse(201, 'Branch retrieved successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Get('/{branchId}')
  async getBranch(@Path() branchId: UUID, @Request() req?: express.Request): Promise<BranchCompleteOut> {
    this.checkPermission(req?.session.user, PermissionScope.Branch, branchId);
    return BranchService.getBranch(branchId);
  }
}