import { CompleteOut } from './BaseTypes';
import { CategoryCompleteOut } from './CategoryTypes';
import { MenuCompactOut, MenuCompleteOut } from './MenuTypes';
import { Boolean, DefaultString, LongString, Slug, TimePeriod, URL, UUID } from './TypeAliases';

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
  avatarKey?: LongString | null;
  coverKey?: LongString | null;
  logoKey?: LongString | null;
}

export interface RestaurantCompleteOut extends CompleteOut {
  name: DefaultString | null;
  displayName: Slug| null;
  branches?: BranchCompleteOut[] | null;
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

export interface UpdateRestaurantCompactIn {
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
  avatarKey?: LongString | null;
  coverKey?: LongString | null;
  logoKey?: LongString | null;
}

export interface CreateBranchCompleteOut extends BranchCompactOut {
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
  backlog: BacklogCompactOut | null;
}

export interface BranchCompactOut extends CompleteOut {
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
}

export interface BranchCompleteOut extends BranchCompactOut {
  backlog: BacklogCompactOut | null;
  address: AddressCompleteOut | null;
  openingTimes: OpeningTimesCompleteOut | null;
}

export interface BranchBySlugCompleteOut extends BranchCompleteOut {
  menus: MenuCompactOut[] | null;
}

export interface CreateBranchCompactIn {
  restaurantId: UUID;
  name?: DefaultString | null;
  displayName: Slug;
  showRating?: Boolean | null;
  instagram?: DefaultString | null;
  telegram?: DefaultString | null;
  twitter?: DefaultString | null;
  youtube?: DefaultString | null;
  eitaa?: DefaultString | null;
}

export interface UpdateBranchCompactIn {
  name?: DefaultString | null;
  displayName?: Slug | null;
  iOpen?: Boolean | null;
  status?: DefaultString | null;
  showRating?: Boolean | null;
  instagram?: DefaultString | null;
  telegram?: DefaultString | null;
  twitter?: DefaultString | null;
  youtube?: DefaultString | null;
  eitaa?: DefaultString | null;
}

export interface BacklogCompactOut extends CompleteOut {
  branchId: UUID | null;
}

export interface BacklogCompleteOut extends CompleteOut {
  branchId: UUID | null;
  categories?: CategoryCompleteOut[] | null;
}

export interface AddressCompactIn {
  country?: DefaultString;
  region: DefaultString;
  city: DefaultString;
  area?: DefaultString;
  street: DefaultString;
  description?: DefaultString;
}

export interface AddressCompleteOut extends CompleteOut {
  country?: DefaultString | null;
  region: DefaultString | null;
  city: DefaultString | null;
  area?: DefaultString | null;
  street: DefaultString | null;
  description?: DefaultString | null;
}

export interface OpeningTimesCompactIn {
  sat?: TimePeriod | null;
  sun?: TimePeriod | null;
  mon?: TimePeriod | null;
  tue?: TimePeriod | null;
  wed?: TimePeriod | null;
  thu?: TimePeriod | null;
  fri?: TimePeriod | null;
}

export interface OpeningTimesCompleteOut extends OpeningTimesCompactIn, CompleteOut {}