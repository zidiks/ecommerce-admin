import { Component, OnInit } from '@angular/core';
import { OrderModel } from "../../../shared/models/order.model";
import { tuiTablePaginationOptionsProvider } from "@taiga-ui/addon-table";
import { OrdersService } from "../orders.service";

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
  public orders: OrderModel[] | null = null;
  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Заказы`,
      routerLink: `/orders`,
    },
  ];

  readonly columns = ['id', 'startDate', 'customer', 'total', 'status'];

  constructor(
    private ordersService: OrdersService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.orders = null;
    this.ordersService.getOrders().subscribe((res: OrderModel[]) => {
      this.orders = res;
    });
  }

}
