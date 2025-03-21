import { Completable } from "./BaseTypes";
import { URL, UUID } from "./TypeAliases";

export interface RestaurantCompactIn {
  /**
   * @minLength 2
   * @maxLength 50
   */
  name: string;
  /**
   * @minLength 2
   * @maxLength 50
   * @pattern ^[a-zA-Z0-9]*$
   */
  slang?: string | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  instagram?: string | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  telegram?: string | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  twitter?: string | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  youtube?: string | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  eitaa?: string | null;
  avatarUrl?: URL | null;
  coverUrl?: URL | null;
  logoUrl?: URL | null;
}

export interface RestaurantCompleteOut extends Completable {
  branch?: BranchCompleteOut | null;
}

export interface BranchCompleteOut extends Completable {
  restaurantId: UUID | null;
  iOpen?: boolean | null;
  /**
   * @minLength 2
   * @maxLength 50
   */
  status?: string | null;
  /**
   * @minimum 0
   * @maximum 5
   */
  rating?: number | null;
  showRating?: boolean | null;
  /**
   * @minLength 5
   * @maxLength 50
   */
  instagram?: string | null;
  /**
   * @minLength 5
   * @maxLength 50
   */
  telegram?: string | null;
  /**
   * @minLength 5
   * @maxLength 50
   */
  twitter?: string | null;
  /**
   * @minLength 5
   * @maxLength 50
   */
  youtube?: string | null;
  /**
   * @minLength 5
   * @maxLength 50
   */
  eitaa?: string | null;
  backlog: BacklogCompleteOut | null;
}

export interface BacklogCompleteOut extends Completable {
  branchId: UUID | null;
}