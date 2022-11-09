import { ProductType } from "./product-property.model";

export interface CategoryModel {
  id: string;
  name: string;
  handle: string;
  description?: string;
  media: string[];
  children?: CategoryModel[];
  productType?: ProductType;
}
