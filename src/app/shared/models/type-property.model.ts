import { ProductTypePropertyType } from "../enums/product-property.enum";

export interface ProductTypeModel {
  id: string;
  name: string;
  description?: string;
  properties: ProductTypePropertyModel[];
}

export interface ProductTypeBaseModel {
  id: string;
  name: string;
  properties: string[];
}

export interface ProductTypePrevModel {
  id: string;
  name: string;
  description?: string;
  propertiesLength: number;
}

export interface ProductTypePropertyModel {
  id: string;
  showCard: boolean;
  showFilter: boolean;
  name: string;
  description?: string;
  type: ProductTypePropertyType;
  options?: (string | number)[];
}

export interface ProductPropertyValueModel {
  id: string;
  name: string;
  type: ProductTypePropertyType;
  value?: string | number | boolean;
}


