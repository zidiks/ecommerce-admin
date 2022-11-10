import { ProductTypePropertyType } from "../enums/product-property.enum";

export interface ProductTypeModel {
  id: string;
  name: string;
  properties: ProductTypePropertyModel[];
}

export interface ProductTypePropertyModel {
  id: string;
  showCard: boolean;
  showFilter: boolean;
  name: string;
  type: ProductTypePropertyType;
  options?: ProductTypePropertyOptionModel[];
}

export interface ProductPropertyValueModel {
  id: string;
  name: string;
  type: ProductTypePropertyType;
  InternalValue?: string | number | boolean;
  ExternalValue?: ProductTypePropertyOptionModel[];
}

export interface ProductTypePropertyOptionModel {
  id: string;
  label?: string;
  value: string | number;
}


