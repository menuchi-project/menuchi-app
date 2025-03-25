import { CompleteOut } from "./BaseTypes";
import { String, Int, UUID } from "./TypeAliases";

export interface ItemCompactIn {
  backlogId: UUID;
  categoryNameId: UUID;
  name: String;
  ingredients?: String | null;
  price?: number | null;
  picUrl?: String | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}

export interface ItemCompleteOut extends CompleteOut {
  categoryName?: String | null;
  categoryId?: UUID | null;
  subCategoryId?: UUID | null;
  name?: String | null;
  ingredients?: String | null;
  price?: number | null;
  picUrl?: String | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}