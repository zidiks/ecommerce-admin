export interface CategoryModel {
  id: string;
  name: string;
  handle: string;
  description?: string;
  media: string[];
  children?: CategoryModel[];
  productTypeId?: string;
}
