import { CompleteOut } from "./BaseTypes";
import { DefaultString } from "./TypeAliases";

export interface CategoryNameCompactIn {
  name: DefaultString;
}

export interface CategoryNameCompleteOut extends CompleteOut {
  name: DefaultString | null;
  // categories
}