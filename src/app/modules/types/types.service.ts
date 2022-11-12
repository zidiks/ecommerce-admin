import { Injectable } from '@angular/core';
import { ProductTypePropertyType } from "../../shared/enums/product-property.enum";
import { delay, Observable, of, take } from "rxjs";
import { ProductTypeModel, ProductTypePrevModel } from "../../shared/models/product-property.model";

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  public fakeTypes: ProductTypeModel[] = [
    {
      id: '17da2181-98ce-456b-bb8e-f4be15be1863',
      name: 'Парфюм',
      properties: [
        {
          id: 'd97da77c-29af-44a0-ab3a-9611faf91635',
          showCard: true,
          showFilter: true,
          name: 'Тип',
          type: ProductTypePropertyType.StringSelect,
          options: [
            {
              id: '6afd89d8-d8bb-41be-87d1-6d22a26b1d99',
              label: 'Дезодорант',
              value: 'deodorant',
            },
            {
              id: '69185e69-b943-46d8-b15c-04a6546a27d7',
              label: 'Духи',
              value: 'perfume',
            }
          ],
        }
      ]
    },
    {
      id: '6c2bdf75-274e-4337-a766-cc746910eb25',
      name: 'Подарочный набор',
      properties: [
        {
          id: '6c368659-bc37-4b81-8aa0-8e377a57d268',
          showCard: true,
          showFilter: true,
          name: 'Тип',
          type: ProductTypePropertyType.StringSelect,
          options: [
            {
              id: '6afd89d8-d8bb-41be-87d1-6d22a26b1d99',
              label: 'Дезодорант',
              value: 'deodorant',
            },
            {
              id: '69185e69-b943-46d8-b15c-04a6546a27d7',
              label: 'Духи',
              value: 'perfume',
            }
          ],
        },
        {
          id: '6c9cc2bb-d29f-4d0d-8283-15a505ad87a3',
          showCard: true,
          showFilter: true,
          name: 'Сегмент',
          type: ProductTypePropertyType.StringSelect,
          options: [
            {
              id: '6afd89d8-d8bb-41be-87d1-6d22a26b1d99',
              label: 'Дезодорант',
              value: 'deodorant',
            },
            {
              id: '69185e69-b943-46d8-b15c-04a6546a27d7',
              label: 'Духи',
              value: 'perfume',
            }
          ],
        }
      ]
    }
  ];

  constructor() { }

  public getTypes(): Observable<ProductTypePrevModel[]> {
    return of(this.fakeTypes.map((type: ProductTypeModel) => ({ id: type.id, name: type.name, propertiesLength: type.properties.length } as ProductTypePrevModel))).pipe(delay(1000), take(1));
  }

  public getTypeById(id: string): Observable<ProductTypeModel | undefined> {
    const data = this.fakeTypes.find((item: ProductTypeModel) => item.id === id);
    return of(data).pipe(delay(1000), take(1));
  }
}
