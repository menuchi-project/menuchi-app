import { CompleteOut } from "./BaseTypes";
import { Boolean, String, Slug, URL, UUID } from "./TypeAliases";

export interface RestaurantCompactIn {
  name: String;
  displayName: Slug;
  /**
   * @pattern ^[a-zA-Z0-9]*$
   */
  slang?: String | null;
  instagram?: String | null;
  telegram?: String | null;
  twitter?: String | null;
  youtube?: String | null;
  eitaa?: String | null;
  avatarUrl?: URL | null;
  coverUrl?: URL | null;
  logoUrl?: URL | null;
}

export interface RestaurantCompleteOut extends CompleteOut {
  name: String | null;
  displayName: Slug | null;
  /**
   * @pattern ^[a-zA-Z0-9]*$
   */
  slang?: String | null;
  instagram?: String | null;
  telegram?: String | null;
  twitter?: String | null;
  youtube?: String | null;
  eitaa?: String | null;
  avatarUrl?: URL | null;
  coverUrl?: URL | null;
  logoUrl?: URL | null;
  branch?: BranchCompleteOut | null;
}

export interface BranchCompleteOut extends CompleteOut {
  restaurantId: UUID | null;
  name?: String | null;
  displayName?: Slug | null;
  iOpen?: Boolean | null;
  status?: String | null;
  /**
   * @isNumber should be a number
   * @minimum 0
   * @maximum 5
   */
  rating?: number | null;
  showRating?: Boolean | null;
  instagram?: String | null;
  telegram?: String | null;
  twitter?: String | null;
  youtube?: String | null;
  eitaa?: String | null;
  backlog: BacklogCompleteOut | null;
}

export interface BacklogCompleteOut extends CompleteOut {
  branchId: UUID | null;
}