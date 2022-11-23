import { Injectable } from '@angular/core';
import { DeliveryMethod, OrderModel } from "../../shared/models/order.model";
import { map, Observable } from "rxjs";
import { HttpService } from "../../shared/services/http.service";

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

  constructor(
    private http: HttpService,
  ) { }

  public getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>('store/orders');
  }

  public getOrderById(id: string): Observable<OrderModel | undefined> {
    return this.http.get<OrderModel>(`store/order/${id}`).pipe(
      map((order: OrderModel) => {
        order.historyList = order.historyList.sort((a, b) => a.time - b.time);
        return order;
      })
    );
  }
}
