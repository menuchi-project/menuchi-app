import { Request } from 'express';
import { CookieNames, RolesEnum } from '../types/Enums';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/AuthTypes';
import { ForbiddenError, UnauthorizedError } from '../exceptions/AuthError';

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
) {
  return new Promise((resolve, reject) => {
    const accessToken = request.cookies[CookieNames.AccessToken];

    if (!accessToken || !request.session.accessToken) {
      throw new UnauthorizedError();
    }
    
    if (accessToken === request.session.accessToken) {
      const payload = jwt.verify(accessToken, process.env.JWT_PRIVATE_KEY!) as JWTPayload;
      const hasAccess = (scopes as RolesEnum[]).some(element => payload.roles.includes(element));
      const isValidUser = request.session.user?.id === payload?.userId;
      console.log(payload, hasAccess, isValidUser);
      if (!payload || !hasAccess || !isValidUser) throw new ForbiddenError();
      
      resolve(true);
    } else throw new UnauthorizedError();
  });
}