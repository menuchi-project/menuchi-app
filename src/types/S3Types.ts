import { ImageFilename, UUID } from "./TypeAliases";

export interface GetPicUrlIn {
  restaurantId: UUID;
  branchId: UUID;
  fileName: ImageFilename;
}