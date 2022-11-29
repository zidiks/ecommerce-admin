import { ProductPropertyValueDto } from "./properties.dto";

export interface AddProductDto {
  name: string;
  media: string[];
  price: number;
  brand: string;
  description: string;
  categoryId: string;
  productTypeId: string;
  productProps: ProductPropertyValueDto[];
}

export interface UpdateProductDto extends AddProductDto { }
