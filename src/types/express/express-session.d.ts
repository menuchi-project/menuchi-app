import 'express-session';
import { RolesEnum } from '../Enums';

declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    lastAccessed?: Date;
  }
}