import { Controller } from 'tsoa';
import { BranchSession, UserSession } from '../types/AuthTypes';
import { UUID } from '../types/TypeAliases';
import { PermissionScope, SessionUpdateScope } from '../types/Enums';
import express from 'express';
import { ForbiddenError } from '../exceptions/AuthError';

export default class BaseController extends Controller {
  checkPermission(user?: UserSession, by?: PermissionScope, id?: UUID) {
    let isOk: boolean;

    switch (by) {
      case PermissionScope.Restaurant:
        isOk = user?.restaurants.some((restaurant) => restaurant.id === id) ? true : false;
        break;

      case PermissionScope.Branch:
        isOk = user?.restaurants.some((restaurant) =>
          restaurant.branches.some((branch) => branch.id === id)
        ) ? true : false;

      case PermissionScope.Backlog:
        isOk = user?.restaurants.some((restaurant) =>
          restaurant.branches.some((branch) => branch.backlogId === id)
        ) ? true : false;
        break;

      default:
        isOk = false;
    }
    
    if (!isOk) throw new ForbiddenError();
  }

  updateSession(
    req: express.Request,
    updateScope: SessionUpdateScope,
    restaurantId: UUID,
    branch: BranchSession
  ) {
    switch (updateScope) {
      case SessionUpdateScope.Restaurant:
        req.session.user?.restaurants.push({ id: restaurantId, branches: [branch] });
        break;
    }
  }
}
