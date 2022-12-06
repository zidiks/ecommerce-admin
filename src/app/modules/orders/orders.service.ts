import { Injectable } from '@angular/core';
import { OrderModel } from "../../shared/models/order.model";
import { map, Observable } from "rxjs";
import { HttpService } from "../../shared/services/http.service";
import { UpdateOrderDto } from "../../shared/dto/order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpService,
  ) { }

  public getOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>('store/orders');
  }

  public updateOrder(id: string, payload: OrderModel): Observable<UpdateOrderDto | null> {
    return this.http.put<OrderModel, OrderModel>('store/product', id, payload);
  }

  public getOrderById(id: string): Observable<OrderModel | null> {
    return this.http.get<OrderModel>(`store/order/${id}`).pipe(
      map((order: OrderModel) => {
        order.historyList = order.historyList.sort((a, b) => a.time - b.time);
        return order;
      })
    );
  }
}
