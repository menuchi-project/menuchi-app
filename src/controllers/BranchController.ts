import { Body, Get, Path, Post, Response, Route, Security, SuccessResponse, Tags, Request, Patch } from "tsoa";
import express from "express";
import BaseController from "./BaseController";
import { ForbiddenError, UnauthorizedError } from "../exceptions/AuthError";
import { PermissionScope, RolesEnum, SessionUpdateScope } from "../types/Enums";
import { UUID } from "../types/TypeAliases";
import BranchService from "../services/BranchService";
import { AddressCompactIn, AddressCompleteOut, BranchCompactOut, BranchCompleteOut, CreateBranchCompactIn, OpeningTimesCompactIn, OpeningTimesCompleteOut, UpdateBranchCompactIn } from "../types/RestaurantTypes";
import { BranchNotFound, RestaurantNotFound } from "../exceptions/NotFoundError";
import { AddressValidationError, BranchValidationError, OpeningTimesValidationError } from "../exceptions/ValidationError";
import { BranchUpdateSession } from "../types/AuthTypes";
import { ConstraintsDatabaseError } from "../exceptions/DatabaseError";

@Route('/branches')
@Tags('Branch')
export class BranchController extends BaseController {
  /**
   * Create a new branch.
   */
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<RestaurantNotFound>(404, '4041 RestaurantNotFound')
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError -> A branch with the provided displayName already exists.')
  @Response<BranchValidationError>(422, '4229 BranchValidationError')
  @SuccessResponse(201, 'Branch created successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Post()
  async createBranch(
    @Body() body: CreateBranchCompactIn,
    @Request() req?: express.Request
  ): Promise<BranchCompactOut> {
    this.checkPermission(req?.session.user, PermissionScope.Restaurant, body.restaurantId);
    const branch = await BranchService.createBranch(body);

    const updateSession = {
      userSession: req?.session.user,
      restaurantId: branch.restaurantId,
      branch: {
        id: branch.id,
        backlogId: branch.backlog?.id
      }
    } as BranchUpdateSession;
    this.updateSession(SessionUpdateScope.Branch, updateSession);
    
    return branch;
  }

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

  /**
   * Updates a branch.
   */
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<ConstraintsDatabaseError>(409, 'ConstraintsDatabaseError -> A branch with the provided displayName already exists.')
  @Response<BranchValidationError>(422, '4229 BranchValidationError')
  @SuccessResponse(204, 'Branch updated successfully. It doesn\'t retrieve anything.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Patch('/{branchId}')
  async updateBranch(
    @Path() branchId: UUID,
    @Body() body: UpdateBranchCompactIn,
    @Request() req?: express.Request
  ): Promise<null> {
    this.checkPermission(req?.session.user, PermissionScope.Branch, branchId);
    await BranchService.updateBranch(branchId, body);
    return null;
  }
  
  /**
   * Add an address for a branch. Overwrite if it called twice.
   */
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<BranchNotFound>(404, '4049 BranchNotFound')
  @Response<AddressValidationError>(422, '42210 AddressValidationError')
  @SuccessResponse(201, 'Address created successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Post('/{branchId}/address')
  async createOrUpdateAddress(
    @Path() branchId: UUID,
    @Body() body: AddressCompactIn,
    @Request() req?: express.Request
  ): Promise<AddressCompleteOut> {
    this.checkPermission(req?.session.user, PermissionScope.Branch, branchId);
    return BranchService.createOrUpdateAddress(branchId, body);
  }

  /**
   * Add an opening times for a branch. Overwrite if it called twice.
   */
  @Response<ForbiddenError>(403, 'Access Denied. You are not authorized to perform this action.')
  @Response<UnauthorizedError>(401, 'Unauthorized user.')
  @Response<BranchNotFound>(404, '4049 BranchNotFound')
  @Response<OpeningTimesValidationError>(422, '42211 OpeningTimesValidationError')
  @SuccessResponse(201, 'Opening times created successfully.')
  @Security('', [RolesEnum.RestaurantOwner])
  @Post('/{branchId}/opening-times')
  async createOrUpdateOpeningTimes(
    @Path() branchId: UUID,
    @Body() body: OpeningTimesCompactIn,
    @Request() req?: express.Request
  ): Promise<OpeningTimesCompleteOut> {
    this.checkPermission(req?.session.user, PermissionScope.Branch, branchId);
    return BranchService.createOrUpdateOpeningTimes(branchId, body);
  }
}