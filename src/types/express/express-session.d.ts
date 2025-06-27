import 'express-session';
import { RolesEnum } from '../Enums';
import { UUID } from '../TypeAliases';
import { ExpressSession } from '../AuthTypes';

declare module 'express-session' {
  interface SessionData extends ExpressSession {
    lastAccessed: Date;
  }
}
