import { ImageFilename, LongString, URL, UUID } from "./TypeAliases";

export interface GetItemPicUrlIn {
  restaurantId: UUID;
  branchId: UUID;
  fileName: ImageFilename;
}

export interface GetItemPicUrlOut {
  itemPicUrl: URL;
  itemPicKey: LongString;
}