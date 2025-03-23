import { CompleteOut } from "./BaseTypes";
import { DefaultString } from "./TypeAliases";

export interface CategoryNameCompactIn {
  name: DefaultString | null;
}

export interface CategoryNameCompleteOut extends CategoryNameCompactIn, CompleteOut {
  // categories
}