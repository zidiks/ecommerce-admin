import { Injectable } from '@angular/core';
import { delay, Observable, of, take } from "rxjs";
import { BrandModel } from "../../shared/models/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private fakeBrands: BrandModel[] = [
    {
      id: '570962d9-5545-4837-9864-3221dd6b9b47',
      name: 'Asus',
      origin: 'Тайвань',
      description: 'Расположенная на Тайване транснациональная компания, специализирующаяся на компьютерной электронике (как комплектующие, так и готовые продукты).'
    },
    {
      id: '1f7e60aa-4796-4bd9-a58f-081f7a7f2e20',
      name: 'Xiaomi',
      origin: 'Китай',
      description: 'Китайская корпорация, основанная Лэй Цзюнем в 2010 году. В 2021 году стала лидером по объёму производства смартфонов. Также производит бытовую технику, планшеты, смарт-часы, ПО, электросамокаты, электровелосипеды и многое другое.'
    }
  ];

  constructor() { }

  public getBrands(): Observable<BrandModel[] | null> {
    return of(this.fakeBrands).pipe(delay(1000), take(1));
  }

  public getBrandById(id: string): Observable<BrandModel | null> {
    const data = this.fakeBrands.find((item: BrandModel) => item.id === id) || null;
    return of(data).pipe(delay(1000), take(1));
  }
}
