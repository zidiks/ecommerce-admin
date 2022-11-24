export interface AddCategoryDto {
  name: string;
  handle: string;
  description?: string;
  media: string[];
  children?: string[];
  productTypeId?: string;
}

export interface UpdateCategoryDto extends AddCategoryDto { }
