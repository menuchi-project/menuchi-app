import { CompleteOut } from "./BaseTypes";
import { Boolean, DefaultString, UUID } from "./TypeAliases";

export interface MenuCompleteOut extends CompleteOut {
  branchId: UUID | null;
  name: DefaultString | null;
  favicon: DefaultString | null;
  isPublished: Boolean | null;
}

export interface MenuCompactIn {
  name?: DefaultString | null;
  favicon?: DefaultString | null;
  isPublished?: Boolean | null;
}