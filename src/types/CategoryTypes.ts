import { CompleteOut } from "./BaseTypes";
import { String } from "./TypeAliases";

export interface CategoryNameCompactIn {
  name: String;
}

export interface CategoryNameCompleteOut extends CompleteOut {
  name: String | null;
  // categories
}