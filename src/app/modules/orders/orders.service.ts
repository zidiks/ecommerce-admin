import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpService } from "../../shared/services/http.service";
import { OrderResponseDto, UpdateOrderRequestDto } from "../../shared/dto/order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpService,
  ) { }

  public getOrders(): Observable<OrderResponseDto[] | null> {
    return this.http.get<OrderResponseDto[]>('store/orders');
  }

  public updateOrder(id: string, payload: UpdateOrderRequestDto): Observable<OrderResponseDto | null> {
    return this.http.put<OrderResponseDto, UpdateOrderRequestDto>('store/order', id, payload);
  }

  public getOrderById(id: string): Observable<OrderResponseDto | null> {
    return this.http.get<OrderResponseDto>(`store/order/${id}`).pipe(
      map((order: OrderResponseDto) => {
        order.historyList = order.historyList.sort((a, b) => a.time - b.time);
        return order;
      })
    );
  }
}
