import { Injectable } from '@angular/core';
import { ProductModel } from "../../shared/models/product.model";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public fakeProducts: ProductModel[] = [
    {
      id: 'ff27bf4c-09ee-40ad-9a6d-bf997c1a5aea',
      name: 'Видеокарта ASUS TUF Gaming GeForce RTX 3080 Ti OC Edition 12GB GDDR6X',
      media: [
        'https://content2.onliner.by/catalog/device/main/326b60046da9ccc7af88ab178aa7f165.jpeg',
        'https://content2.onliner.by/catalog/device/main/db8195d33fce3d3ee48afe255e288eab.jpeg',
      ],
      price: 4696.36,
      brand: {
        id: '1',
        name: 'NVIDIA',
        description: 'Американская технологическая компания, разработчик графических процессоров и систем на чипе.',
        origin: 'США',
      },
      description: 'NVIDIA GeForce RTX 3080 Ti 12 ГБ GDDR6X LHR, базовая частота 1370 МГц, макс. частота 1785 МГц, 10240sp, 80 RT-ядер, частота памяти 19000 МГц, 384 бит, доп. питание: 8+8 pin, 2.7 слота, HDMI, DisplayPort, трассировка лучей',
      categoryId: '77d13a08-917f-4e6d-882d-c132c4fc6520',
      productTypeId: 'd74a7db7-941f-4121-83f9-2db86710c523',
      productProps: [

      ],
    }
  ];

  constructor() { }

  public getProducts(): Observable<ProductModel[]> {
    return of(this.fakeProducts).pipe(delay(1000));
  }

  public getProductById(id: string): Observable<ProductModel | null> {
    const data = this.fakeProducts.find((item: ProductModel) => item.id === id);
    return of(data || null).pipe(delay(1000));
  }
}
