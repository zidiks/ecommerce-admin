export interface CategoryModel {
  id: string;
  name: string;
  handle: string;
  description?: string;
  media: string[];
  children?: CategoryModel[];
  productTypeId?: string;
  parent?: CategoryParentModel;
}

export interface CategoryParentModel {
  id: string;
  name: string;
  handle: string;
  description?: string;
}

export interface CategoryBaseModel {
  name: string;
  handle: string;
  description?: string;
  media: string[];
  productTypeId?: string;
}
