import { CompleteOut } from './BaseTypes';
import { ItemCompleteOut } from './ItemTypes';
import { Boolean, DefaultString, Int, UUID } from './TypeAliases';

export interface CreateMenuCompactIn extends MenuCompactIn {
  branchId: UUID;
}

export interface MenuCompactIn {
  name?: DefaultString | null;
  favicon?: DefaultString | null;
  isPublished?: Boolean | null;
}

export interface CreateMenuCompleteOut extends CompleteOut {
  branchId: UUID | null;
  name: DefaultString | null;
  favicon: DefaultString | null;
  isPublished: Boolean | null;
  restaurantId?: DefaultString | null;
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

export interface CreateCylinderCompleteOut extends CompleteOut, CylinderCompactIn {}

export interface MenuCategoryCompactIn {
  categoryId: UUID;
  cylinderId: UUID;
  items: UUID[];
}

export interface CreateMenuCategoryCompleteOut extends CompleteOut {
  categoryId: UUID | null;
  cylinderId: UUID | null;
  positionInMenu: Int | null;
}

interface CylinderCompleteOut extends CreateCylinderCompleteOut {
  menuCategories: MenuCategoryCompleteOut[] | null;
}

interface MenuCategoryCompleteOut extends CreateMenuCategoryCompleteOut {
  items: ItemCompleteOut[] | null;
}

export interface MenuCompleteOut extends CreateMenuCompleteOut {
  cylinders: CylinderCompleteOut[] | null;
}