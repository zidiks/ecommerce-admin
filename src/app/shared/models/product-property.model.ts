import { ProductTypePropertyType } from "../enums/product-property.enum";

export interface ProductPropertyValue {
  id: string;
  name: string;
  type: ProductTypePropertyType;
  InternalValue?: string | number | boolean;
  ExternalValue?: ProductTypePropertyOption[] //@OneToMany;
}

export interface ProductTypePropertyOption {
  id: string;
  label?: string;
  value: string | number;
}


