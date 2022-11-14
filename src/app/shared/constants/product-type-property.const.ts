import { ProductTypePropertyType } from "../enums/product-property.enum";
import { ProductTypePropertyDataModel } from "../models/product-type-property-data.model";

export const productsTypesPropertiesData: Record<string, ProductTypePropertyDataModel> = {
  [ProductTypePropertyType.StringMultiSelect]: {
    name: 'Множественный строковый выбор',
    color: '02',
    description: 'Можно задать для продукта несколько строковых значений из заранее созданного списка',
  },
  [ProductTypePropertyType.StringSelect]: {
    name: 'Строковый выбор',
    color: '04',
    description: 'Можно задать для продукта одно строковое значение из заранее созданного списка',
  },
  [ProductTypePropertyType.StringInput]: {
    name: 'Произвольная строка',
    color: '06',
    description: 'Можно задать для продукта произвольное строковое значение',
  },
  [ProductTypePropertyType.NumberInput]: {
    name: 'Произвольное число',
    color: '08',
    description: 'Можно задать для продукта произвольное числовое значение',
  },
  [ProductTypePropertyType.NumberSelect]: {
    name: 'Числовой выбор',
    color: '10',
    description: 'Можно задать для продукта одно числовое значение из заранее созданного списка',
  },
  [ProductTypePropertyType.CheckBox]: {
    name: 'Флаг',
    color: '18',
    description: 'Можно задать для продукта одно логическое значение (верно/неверно)',
  },
  [ProductTypePropertyType.Color]: {
    name: 'Цвет',
    color: '16',
    description: 'Можно задать для продукта цвет с помощью специального диалогового окна',
  },
}
