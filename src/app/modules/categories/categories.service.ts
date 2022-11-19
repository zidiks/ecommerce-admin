import { Injectable } from '@angular/core';
import { CategoryModel } from "../../shared/models/category.model";
import { delay, Observable, of, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
    private fakeCategories: CategoryModel[] = [
    {
      id: '3a436051-771f-4014-99ee-19e20e661a69',
      name: 'Парфюм',
      handle: 'perfume',
      media: [],
      children: [
        {
          id: 'a7fa0271-1c4e-4238-8f11-7f2a3a50acff',
          name: 'Для кого',
          handle: 'perfume/for_whom',
          media: [],
          children: [
            {
              id: '6d2bac92-17d1-43d9-83bb-2168519a772b',
              name: 'Для мужчин',
              handle: 'perfume/for_whom/man',
              media: [],
              productTypeId: '17da2181-98ce-456b-bb8e-f4be15be1863',
            },
            {
              id: '9dd4678d-92f8-4823-9016-2e66ed25e9c1',
              name: 'Для женщин',
              handle: 'perfume/for_whom/woman',
              media: [],
            },
            {
              id: '5d9abdca-a783-47cf-b00e-590420669175',
              name: 'Унисекс',
              handle: 'perfume/for_whom/unisex',
              media: [],
              productTypeId: '17da2181-98ce-456b-bb8e-f4be15be1863',
            }
          ],
        }
      ],
    },
    {
      id: '77d13a08-917f-4e6d-882d-c132c4fc6520',
      name: 'Видеокарты',
      handle: 'gpu',
      media: [],
      productTypeId: 'd74a7db7-941f-4121-83f9-2db86710c523',
    }
  ];

  constructor() { }

  public getCategories(): Observable<CategoryModel[] | null> {
    return of(this.fakeCategories).pipe(delay(1000), take(1));
  }

  public getCategoryById(id: string): Observable<CategoryModel | null> {
    const data = this.fakeCategories.find((item: CategoryModel) => item.id === id) || null;
    return of(data).pipe(delay(1000), take(1));
  }
}
