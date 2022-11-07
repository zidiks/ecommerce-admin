import { Injectable } from '@angular/core';
import { OrderModel, OrderStatus } from "../../shared/models/order.model";
import { delay, Observable, of, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public fakeData: OrderModel[] = [
    {
      id: '433232342',
      startDate: 	1665064737,
      customer: {
        id: '0',
        name: `Владимир Миронов`,
      },
      total: 320.30,
      status: OrderStatus.Delivery,
    },
    {
      id: '234262433',
      startDate: 1664054737,
      customer: {
        id: '0',
        name: `Гапеев Юрий`,
      },
      total: 1100.20,
      status: OrderStatus.Paid,
    },
  ];

  constructor() { }

  public getOrders(): Observable<OrderModel[]> {
    return of(this.fakeData).pipe(delay(1000), take(1));
  }

  public getOrderById(id: string): Observable<OrderModel | undefined> {
    return of(this.fakeData.find((item: OrderModel) => item.id === id)).pipe(delay(1000), take(1));
  }
}
