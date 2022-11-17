import { Injectable } from '@angular/core';
import { ProductTypePropertyModel } from "../../shared/models/type-property.model";
import { ProductTypePropertyType } from "../../shared/enums/product-property.enum";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  public fakeProperties: ProductTypePropertyModel[] = [
    {
      id: 'd97da77c-29af-44a0-ab3a-9611faf91635',
      showCard: false,
      showFilter: true,
      name: 'Тип',
      description: 'Тип парфюмерного продукта',
      type: ProductTypePropertyType.StringSelect,
      options: [
        'Дезодорант',
        'Духи',
      ],
    },
    {
      id: '9ea66bad-9f65-4ae0-ac16-2fc89e143379',
      showCard: true,
      showFilter: true,
      name: 'Цвет',
      description: 'Цвет продукта',
      type: ProductTypePropertyType.Color,
    }
  ];

  constructor() { }

  public getProperties(): Observable<ProductTypePropertyModel[]> {
    return of(this.fakeProperties).pipe(delay(1000));
  }

  public getPropertiesByIds(ids: string[]): ProductTypePropertyModel[] {
    return ids.map((id: string) => this.fakeProperties
      .find((item: ProductTypePropertyModel) => item.id === id))
      .filter((item: ProductTypePropertyModel | undefined) => !!item) as ProductTypePropertyModel[];
  }

  public getPropertyById(id: string): Observable<ProductTypePropertyModel | undefined> {
    const data = this.fakeProperties.find((item: ProductTypePropertyModel) => item.id === id);
    return of(data).pipe(delay(1000));
  }
}
