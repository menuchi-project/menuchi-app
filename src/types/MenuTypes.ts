import { CompleteOut } from './BaseTypes';
import { Boolean, DefaultString, Int, UUID } from './TypeAliases';

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

export interface CylinderCompactIn {
  sat?: Boolean | null;
  sun?: Boolean | null;
  mon?: Boolean | null;
  tue?: Boolean | null;
  wed?: Boolean | null;
  thu?: Boolean | null;
  fri?: Boolean | null;
}

export interface CylinderCompleteOut extends CylinderCompactIn, CompleteOut {}

export interface MenuCategoryCompactIn {
  categoryId: UUID;
  cylinderId: UUID;
  items: UUID[];
}

export interface MenuCategoryCompleteOut extends CompleteOut {
  categoryId: UUID | null;
  cylinderId: UUID | null;
  positionInMenu: Int | null;
}

export interface UpdateMenuCategoryIn {
  positionInMenu?: Int | null;
}

export interface UpdateMenuItemIn {
  positionInMenuCategory?: Int | null;
}