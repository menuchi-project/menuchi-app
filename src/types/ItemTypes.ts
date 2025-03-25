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

export interface ItemCompactOut extends CompleteOut {
  categoryId?: UUID | null;
  subCategoryId?: UUID | null;
  name?: DefaultString | null;
  ingredients?: DefaultString | null;
  price?: number | null;
  picUrl?: DefaultString | null;
  positionInItemsList?: Int | null;
  positionInCategory?: Int | null;
}

export interface ItemCompleteOut extends ItemCompactOut {
  categoryName?: CategoryNameCompleteOut | null;
}

export interface ItemListCompleteOut extends ItemCompactOut {
  category: CategoryCompleteOut | null;
}