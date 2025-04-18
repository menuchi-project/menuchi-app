import { RolesEnum, SessionUpdateScope } from './Enums';
import { IranPhoneNumber, UUID } from './TypeAliases';
import express from 'express';

export interface UserLogin {
  phoneNumber: IranPhoneNumber;
  password: string;
}

export interface JWTPayload {
  userId: UUID;
  roles: RolesEnum[];
}

export interface ExpressSession {
  accessToken: string;
  user: UserSession
}

export interface UserSession {
  id: UUID;
  restaurants: RestaurantSession[];
};

export interface RestaurantSession {
  id?: UUID;
  branches: BranchSession[];
}

export interface BranchSession {
  id?: UUID;
  backlogId?: UUID;
  menus?: UUID[];
}

export interface BaseUpdateSession {
  userSession: UserSession;
}

export interface RestaurantUpdateSession extends BaseUpdateSession {
  restaurantId: UUID;
  branch: BranchSession;
}

export interface MenuUpdateSession extends BaseUpdateSession {
  restaurantId: UUID;
  branchId: UUID;
  menuId: UUID;
}

export type SessionUpdate = RestaurantUpdateSession | MenuUpdateSession;