import { Controller } from 'tsoa';
import { UserSession } from '../types/AuthTypes';
import { UUID } from '../types/TypeAliases';
import { PermissionScope, SessionUpdateScope } from '../types/Enums';
import express from 'express';
import { ForbiddenError } from '../exceptions/AuthError';

export default class BaseController extends Controller {
  checkPermission(user?: UserSession, by?: PermissionScope, id?: UUID) {
    let isOk: boolean;

    switch (by) {
      case PermissionScope.Backlog:
        isOk = user?.restaurants.some((restaurant) =>
          restaurant.branches.some((branch) => branch.backlogId === id)
        ) ? true : false;
        break;

      case PermissionScope.Restaurant:
        isOk = user?.restaurants.some((restaurant) => restaurant.id === id) ? true : false;
        break;

      default:
        isOk = false;
    }
    
    if (!isOk) throw new ForbiddenError();
  }

  updateSession(
    req: express.Request,
    updateScope: SessionUpdateScope,
    id: UUID
  ) {
    switch (updateScope) {
      case SessionUpdateScope.Restaurant:
        req.session.user?.restaurants.push({ id, branches: [] });
        break;
    }
  }
}
