import { CompleteOut } from "./BaseTypes";
import { CategoryCompleteOut, CategoryNameCompleteOut } from "./CategoryTypes";
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
  categoryId?: UUID | null;
  categoryName?: DefaultString | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: DefaultString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}

export interface UpdateItemIn {
  categoryId?: UUID | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: DefaultString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}