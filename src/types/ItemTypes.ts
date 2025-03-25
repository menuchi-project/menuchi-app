import { CompleteOut } from "./BaseTypes";
import { DefaultString, Int, UUID } from "./TypeAliases";

export interface ItemCompactIn {
  categoryNameId: UUID;
  name: DefaultString;
  ingredients?: DefaultString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}

export interface ItemCompleteOut extends CompleteOut {
  categoryName?: DefaultString | null;
  categoryId?: UUID | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: DefaultString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}