import { CompleteOut } from "./BaseTypes";
import { DefaultString, Int, UUID } from "./TypeAliases";
import { ItemCompactOut } from "./ItemTypes";

export interface CategoryNameCompactIn {
  name: DefaultString;
}

export interface CategoryNameCompleteOut extends CompleteOut {
  name: DefaultString | null;
  // categories
}

export interface CategoryCompleteOut extends CompleteOut {
  backlogId: UUID | null;
  categoryNameId: UUID | null;
  categoryName: CategoryNameCompleteOut | null;
  positionInBacklog?: Int | null;
  items?: ItemCompactOut[] | null;
}