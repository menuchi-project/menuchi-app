import { RolesEnum } from './Enums';
import { IranPhoneNumber, UUID } from './TypeAliases';

export interface UserLogin {
  phoneNumber: IranPhoneNumber;
  password: string;
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
  id: UUID;
  branches: BranchSession[];
}

export interface BranchSession {
  id: UUID;
  backlogId?: UUID;
}

export interface JWTPayload {
  userId: UUID;
  roles: RolesEnum[];
}
