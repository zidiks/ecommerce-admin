import { ProductTypePropertyType } from "../enums/product-property.enum";
import { ProductTypePropertyDataModel } from "../models/product-type-property-data.model";

export const productsTypesPropertiesData: Record<ProductTypePropertyType, ProductTypePropertyDataModel> = {
  [ProductTypePropertyType.StringMultiSelect]: {
    name: 'Множественный строковый выбор',
    description: 'Можно задать для продукта несколько строковых значений из заранее созданного списка',
  },
  [ProductTypePropertyType.StringSelect]: {
    name: 'Строковый выбор',
    description: 'Можно задать для продукта одно строковое значение из заранее созданного списка',
  },
  [ProductTypePropertyType.StringInput]: {
    name: 'Произвольная строка',
    description: 'Можно задать для продукта произвольное строковое значение',
  },
  [ProductTypePropertyType.NumberInput]: {
    name: 'Произвольное число',
    description: 'Можно задать для продукта произвольное числовое значение',
  },
  [ProductTypePropertyType.NumberSelect]: {
    name: 'Числовой выбор',
    description: 'Можно задать для продукта одно числовое значение из заранее созданного списка',
  },
  [ProductTypePropertyType.CheckBox]: {
    name: 'Флаг',
    description: 'Можно задать для продукта одно логическое значение (верно/неверно)',
  },
  [ProductTypePropertyType.Color]: {
    name: 'Цвет',
    description: 'Можно задать для продукта цвет с помощью специального диалогового окна',
  },
}
