import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderStatus } from "../../../shared/models/order.model";
import { TuiStatus } from "@taiga-ui/kit";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public orders: OrderModel[] = [
    {
      id: '0',
      startDate: 3242443242,
      customer: {
        id: '0',
        name: `Alex Inkin`,
      },
      total: 320,
      status: OrderStatus.Delivery,
    },
    {
      id: '1',
      startDate: 3242443242,
      customer: {
        id: '0',
        name: `Alex Inkin`,
      },
      total: 100,
      status: OrderStatus.Paid,
    },
  ];

  public statusData: Record<OrderStatus, { color: TuiStatus, label: string }> = {
    [OrderStatus.Pending]: {
      color: 'neutral',
      label: 'Ожидание',
    },
    [OrderStatus.Delivery]: {
      color: 'warning',
      label: 'Доставка',
    },
    [OrderStatus.Paid]: {
      color: 'success',
      label: 'Оплачено',
    },
    [OrderStatus.Draft]: {
      color: 'error',
      label: 'Возврат'
    }
  }

  readonly columns = Object.keys(this.orders[0]);

  constructor() { }

  ngOnInit(): void {
  }

}
