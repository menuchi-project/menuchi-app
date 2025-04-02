import 'express-session';
import { RolesEnum } from '../Enums';
import { UUID } from '../TypeAliases';
import { UserSession } from '../AuthTypes';

declare module 'express-session' {
  interface SessionData extends UserSession {
    lastAccessed: Date;
  }
}
