import { Injectable } from '@angular/core';
import { DeliveryMethod, OrderModel } from "../../shared/models/order.model";
import { delay, Observable, of, take } from "rxjs";
import { OrderHistory } from "../../shared/enums/order-history.enum";
import { StateColor } from "../../shared/enums/state-colors.enum";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public fakeDeliveryMethods: DeliveryMethod[] = [
    {
      id: '0',
      name: 'Европочта',
      description: '«Европочта» - это быстроразвивающийся  почтовый сервис, который занимается доставкой посылок по всей Беларуси!',
      media: 'url..',
    }
  ]

  public fakeData: OrderModel[] = [
    {
      id: '433232342',
      orderCode: 'KMF43C5',
      customer: {
        name: `Владимир Миронов`,
        phone: '+375333896071'
      },
      startDate: 	1665064737,
      state: {
        id: '0',
        label: 'Оплачено',
        color: StateColor.Success,
      },
      delivery: {
        deliveryMethod: this.fakeDeliveryMethods[0],
        deliveryAddress: 'г. Минск, ул. Петра Глебки, 64',
      },
      paymentMethod: {
        id: '0',
        name: 'При получении',
        description: 'Оплата при получении доставки',
        media: 'url...',
      },
      cartItems: [
        {
          product: {
            name: 'Игровой монитор Xiaomi Mi Curved Gaming Monitor 34 XMMNTWQ34 (китайская версия)',
            media: [
              'https://content2.onliner.by/catalog/device/main@2/04dc2028bcdec4ec68e7104727a6417f.jpeg',
              'https://content2.onliner.by/catalog/device/main@2/53efc4024780d11f063452ed7ab4afc8.jpeg',
            ],
            price: 1068,
            brand: {
              id: '0',
              name: 'Xiaomi',
              description: 'Guano',
              origin: 'China',
            }
          },
          count: 2,
          discount: 30,
        },
        {
          product: {
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
            }
          },
          count: 1,
          discount: 0,
        }
      ],
      subTotalPrice: 6832.36,
      totalPrice: 6191.56,
      totalDiscount: 5,
      historyList: [
        {
          type: OrderHistory.Pending,
          time: 1665035737,
        },
        {
          type: OrderHistory.Message,
          details: 'Ожидайте звонка специалиста',
          time: 1665055737,
        },
        {
          type: OrderHistory.OrderStart,
          time: 1665065737,
        },
        {
          type: OrderHistory.ShippingStart,
          details: 'Ваш track-код 43943043',
          time: 1665075737,
        },
        {
          type: OrderHistory.ShippingDone,
          time: 1665255737,
        },
        {
          type: OrderHistory.Paid,
          time: 1665265737,
        },
        {
          type: OrderHistory.OrderDone,
          time: 1665275737,
        }
      ],
    },
  ];

  constructor() { }

  public getOrders(): Observable<OrderModel[]> {
    return of(this.fakeData).pipe(delay(1000), take(1));
  }

  public getOrderById(id: string): Observable<OrderModel | undefined> {
    const data = this.fakeData.find((item: OrderModel) => item.id === id);
    if (data) {
      data.historyList = data.historyList.sort((a, b) => a.time - b.time);
    }
    return of(data).pipe(delay(1000), take(1));
  }
}
