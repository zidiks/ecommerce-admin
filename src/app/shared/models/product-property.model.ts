import { ProductTypePropertyType } from "../enums/product-property.enum";

export interface ProductType {
  id: string;
  name: string;
  properties: ProductTypeProperty[];
}

export interface ProductTypeProperty {
  id: string;
  showCard: boolean;
  showFilter: boolean;
  name: string;
  type: ProductTypePropertyType;
  options?: ProductTypePropertyOption[];
}

export interface ProductPropertyValue {
  id: string;
  name: string;
  type: ProductTypePropertyType;
  InternalValue?: string | number | boolean;
  ExternalValue?: ProductTypePropertyOption[];
}

export interface ProductTypePropertyOption {
  id: string;
  label?: string;
  value: string | number;
}


