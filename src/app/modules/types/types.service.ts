import { Injectable } from '@angular/core';
import { delay, Observable, of, take } from "rxjs";
import { ProductTypeBaseModel, ProductTypeModel, ProductTypePrevModel } from "../../shared/models/type-property.model";
import { PropertiesService } from "../properties/properties.service";

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  public fakeTypes: ProductTypeBaseModel[] = [
    {
      id: '17da2181-98ce-456b-bb8e-f4be15be1863',
      name: 'Парфюм',
      properties: [
        '9ea66bad-9f65-4ae0-ac16-2fc89e143379'
      ]
    },
    {
      id: '6c2bdf75-274e-4337-a766-cc746910eb25',
      name: 'Подарочный набор',
      properties: [
        '9ea66bad-9f65-4ae0-ac16-2fc89e143379',
        'd97da77c-29af-44a0-ab3a-9611faf91635',
      ]
    },
    {
      id: 'd74a7db7-941f-4121-83f9-2db86710c523',
      name: 'Видеокарта',
      properties: [
        '9ea66bad-9f65-4ae0-ac16-2fc89e143379',
        'd97da77c-29af-44a0-ab3a-9611faf91635',
        '5adf782f-cca2-40cb-bfbd-e897ced33135',
      ]
    }
  ];

  constructor(
    private propertiesService: PropertiesService,
  ) { }

  public getTypes(): Observable<ProductTypePrevModel[] | null> {
    return of(this.fakeTypes.map((type: ProductTypeBaseModel) => ({ id: type.id, name: type.name, propertiesLength: type.properties.length } as ProductTypePrevModel))).pipe(delay(1000), take(1));
  }

  public getTypeById(id: string): Observable<ProductTypeModel | undefined> {
    const data = this.fakeTypes.find((item: ProductTypeBaseModel) => item.id === id);
    if (!data) {
      return of(undefined);
    } else {
      const properties = data ? this.propertiesService.getPropertiesByIds(data.properties) : [];
      const dataWithProperties: ProductTypeModel = {
        id: data.id,
        name: data.name,
        properties,
      };
      return of(dataWithProperties).pipe(delay(1000), take(1));
    }
  }
}
