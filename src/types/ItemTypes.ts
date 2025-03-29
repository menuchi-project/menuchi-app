import { CompleteOut } from "./BaseTypes";
import { DefaultString, Int, LongString, UUID } from "./TypeAliases";

export interface ItemCompactIn {
  categoryNameId: UUID;
  name: DefaultString;
  ingredients?: LongString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
}

export interface ItemCompleteOut extends CompleteOut {
  categoryId?: UUID | null;
  categoryName?: DefaultString | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: LongString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}

export interface UpdateItemIn {
  categoryId?: UUID | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: LongString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}