export interface ProductModel {
  id: string;
  name: string;
  media: string[];
  price: number;
  brand: Brand;
  description: string;
  categoriesIds: string[];
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
  brand: Brand;
  description?: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  origin: string;
}
