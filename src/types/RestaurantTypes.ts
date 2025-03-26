import { CompleteOut } from "./BaseTypes";
import { CategoryCompleteOut } from "./CategoryTypes";
import { Boolean, DefaultString, Slug, URL, UUID } from "./TypeAliases";

export interface RestaurantCompactIn {
  name: DefaultString;
  displayName: Slug;
  /**
   * @pattern ^[a-zA-Z0-9]*$
   */
  slang?: DefaultString | null;
  instagram?: DefaultString | null;
  telegram?: DefaultString | null;
  twitter?: DefaultString | null;
  youtube?: DefaultString | null;
  eitaa?: DefaultString | null;
  avatarUrl?: URL | null;
  coverUrl?: URL | null;
  logoUrl?: URL | null;
}

export interface RestaurantCompleteOut extends CompleteOut {
  name: DefaultString | null;
  displayName: Slug | null;
  /**
   * @pattern ^[a-zA-Z0-9]*$
   */
  slang?: DefaultString | null;
  instagram?: DefaultString | null;
  telegram?: DefaultString | null;
  twitter?: DefaultString | null;
  youtube?: DefaultString | null;
  eitaa?: DefaultString | null;
  avatarUrl?: URL | null;
  coverUrl?: URL | null;
  logoUrl?: URL | null;
  branch?: BranchCompleteOut | null;
}

export interface BranchCompleteOut extends CompleteOut {
  restaurantId: UUID | null;
  name?: DefaultString | null;
  displayName?: Slug | null;
  iOpen?: Boolean | null;
  status?: DefaultString | null;
  /**
   * @isNumber should be a number
   * @minimum 0
   * @maximum 5
   */
  rating?: number | null;
  showRating?: Boolean | null;
  instagram?: DefaultString | null;
  telegram?: DefaultString | null;
  twitter?: DefaultString | null;
  youtube?: DefaultString | null;
  eitaa?: DefaultString | null;
  backlog: BacklogCompleteOut | null;
}

export interface BacklogCompleteOut extends CompleteOut {
  branchId: UUID | null;
  categories?: CategoryCompleteOut[] | null;
}