import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderStatus } from "../../../shared/models/order.model";
import { TuiStatus } from "@taiga-ui/kit";
import { tuiTablePaginationOptionsProvider } from "@taiga-ui/addon-table";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [
    tuiTablePaginationOptionsProvider({
      showPages: true,
    }),
  ],
})
export class ListComponent implements OnInit {
  public page = 0;
  public size = 10;
  public orders: OrderModel[] = [
    {
      id: '0',
      startDate: 	1665064737,
      customer: {
        id: '0',
        name: `Владимир Миронов`,
      },
      total: 320.30,
      status: OrderStatus.Delivery,
    },
    {
      id: '1',
      startDate: 1664054737,
      customer: {
        id: '0',
        name: `Гапеев Юрий`,
      },
      total: 1100.20,
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
