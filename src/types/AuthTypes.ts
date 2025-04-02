import { RolesEnum } from './Enums';
import { IranPhoneNumber, UUID } from './TypeAliases';

export interface UserLogin {
  phoneNumber: IranPhoneNumber;
  password: string;
}

export interface UserSession {
  accessToken: string;
  user: {
    id: UUID;
    restaurants: {
      id: UUID;
      branches: {
        id: UUID;
        backlogId?: UUID
      }[];
    }[];
  };
}

export interface JWTPayload {
  userId: UUID;
  roles: RolesEnum[];
}
