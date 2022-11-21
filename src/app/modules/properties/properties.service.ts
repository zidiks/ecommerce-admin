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
      name: 'Охлаждение ',
      description: 'Графический ускоритель видеокарты требует охлаждения. В некоторых маломощных моделях достаточно пассивного охлаждения, что позволяет сделать компьютер намного более тихим. В подавляющем большинстве видеокарт используется активное воздушное охлаждение, и лишь в самых мощных и дорогих — жидкостное.',
      type: ProductTypePropertyType.StringSelect,
      options: [
        'воздушное  ',
        'жидкостное',
      ],
    },
    {
      id: '1223fde7-7798-49cc-8ecc-3933f2842716',
      showCard: true,
      showFilter: true,
      name: 'Видеопамять',
      description: 'Видеопамять (локальная память) видеокарты играет роль буфера, в котором хранятся необходимые для построения трехмерной сцены данные: текстуры (наибольший объём), координаты вершин многоугольников, данные для шейдеров и т.д. Чем более совершенная графика в игре, тем больше памяти требуется отводить для хранения текстур в высоком качестве.',
      type: ProductTypePropertyType.NumberInput,
    },
    {
      id: '06c0f0da-2039-46d9-834e-81229d0f16b8',
      showCard: true,
      showFilter: true,
      name: 'Дата выхода на рынок',
      type: ProductTypePropertyType.NumberSelect,
      description: '',
      options: [
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
      ]
    },
    {
      id: '1b0df5c7-1b90-4f3b-8b03-74efb137edec',
      showCard: false,
      showFilter: true,
      name: 'Функциональные особенности',
      description: 'NVIDIA Deep Learning Super Sampling (сглаживание с алгоритмами глубокого обучения, DLSS) — это технология рендеринга на базе искусственного интеллекта, которая улучшает производительность и качество графики благодаря использованию специализированных тензорных ядер в видеокартах GeForce RTX. DLSS повышает частоту кадров и одновременно улучшает качество картинки в играх, используя глубокую нейросеть.',
      type: ProductTypePropertyType.StringMultiSelect,
      options: [
        'поддержка DLSS',
        'поддержка FSR',
      ],
    },
    {
      id: '5adf782f-cca2-40cb-bfbd-e897ced33135',
      showCard: false,
      showFilter: true,
      name: 'DisplayPort',
      description: 'DisplayPort — новый стандарт интерфейса для цифровых дисплеев с поддержкой защиты видеоконтента HDCP и вдвое большей, чем у Dual-Link DVI, пропускной способностью. По сравнению с HDMI он поддерживает большее разрешение и имеет хороший потенциал для развития. Со временем DisplayPort должен полностью вытеснить как DVI, так и HDMI.',
      type: ProductTypePropertyType.CheckBox,
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
