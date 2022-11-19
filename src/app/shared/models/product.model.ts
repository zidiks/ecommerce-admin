import { BrandModel } from "./brand.model";

export interface ProductModel {
  id: string;
  name: string;
  media: string[];
  price: number;
  brand: BrandModel;
  description: string;
  categoryId: string;
  productTypeId: string;
  productProps: {
    productTypePropertyId: string;
    value: string | string[] | number | boolean;
  }[];
}

export interface ProductPrevModel {
  id: string;
  name: string;
  media: string[];
  price: number;
  brand: BrandModel;
  description?: string;
}
