import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  breadcrumbs = [
    {
      caption: `Главная`,
    },
    {
      caption: `Заказы`,
      routerLink: `/orders`,
    },
  ];
}
