import { Injectable } from '@angular/core';
import { ProductTypePropertyType } from "../../shared/enums/product-property.enum";
import { delay, Observable, of, take } from "rxjs";
import { ProductTypeModel } from "../../shared/models/product-property.model";

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
    }
  ];

  constructor() { }

  public getTypes(): Observable<ProductTypeModel[]> {
    return of(this.fakeTypes).pipe(delay(1000), take(1));
  }

  public getTypeById(id: string): Observable<ProductTypeModel | undefined> {
    const data = this.fakeTypes.find((item: ProductTypeModel) => item.id === id);
    return of(data).pipe(delay(1000), take(1));
  }
}
