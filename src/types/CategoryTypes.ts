import { CompleteOut } from "./BaseTypes";
import { DefaultString, Int, UUID } from "./TypeAliases";
import { ItemCompleteOut } from "./ItemTypes";

export interface CategoryNameCompactIn {
  name: DefaultString;
}

export interface CategoryNameCompleteOut extends CompleteOut {
  name: DefaultString | null;
}

export interface CategoryCompleteOut extends CompleteOut {
  backlogId: UUID | null;
  categoryName?: DefaultString | null;
  positionInBacklog?: Int | null;
  items?: ItemCompleteOut[] | null;
}