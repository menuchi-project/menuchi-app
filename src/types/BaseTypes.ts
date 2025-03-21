import { UUID } from "./TypeAliases";

export interface Completable {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}