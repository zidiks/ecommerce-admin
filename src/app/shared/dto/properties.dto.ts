import { ProductTypePropertyType } from "../enums/product-property.enum";

export interface AddPropertyDto {
  showCard: boolean;
  showFilter: boolean;
  name: string;
  units?: string;
  description?: string;
  type: ProductTypePropertyType;
  options?: (string | number)[];
}

export interface UpdatePropertyDto extends AddPropertyDto { }
