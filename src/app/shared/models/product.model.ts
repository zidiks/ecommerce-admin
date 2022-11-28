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
  productProps: ProductPropertyValueModel[];
}

export interface ProductPropertyValueModel {
  productTypePropertyId: string;
  value: string | string[] | number | boolean;
}

export interface GetProductsOptions {
  search?: string;
  page?: number;
  sort?: string;
  limit?: number;
  asc?: boolean;
}

export interface ProductPrevModel {
  id: string;
  name: string;
  media: string[];
  price: number;
  brand: BrandModel;
  description?: string;
}
