import { ProductPropertyValueModel } from "./type-property.model";

export interface ProductModel {
  id: string;
  name: string;
  media: string[];
  price: number;
  brand: Brand;
  description: string;
  categoriesIds: string[];
  productTypeId: string;
  productProps: ProductPropertyValueModel[];
}

export interface ProductShortModel {
  name: string;
  media: string[];
  price: number;
  brand: Brand;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  origin: string;
}
