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
        'd97da77c-29af-44a0-ab3a-9611faf91635',
        '1223fde7-7798-49cc-8ecc-3933f2842716',
        '06c0f0da-2039-46d9-834e-81229d0f16b8',
        '1b0df5c7-1b90-4f3b-8b03-74efb137edec',
        '5adf782f-cca2-40cb-bfbd-e897ced33135',
        '9ea66bad-9f65-4ae0-ac16-2fc89e143379',
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
