import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Clipboard } from '@angular/cdk/clipboard';
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { OrderModel } from "../../../shared/models/order.model";
import { OrdersService } from "../orders.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public breadcrumbs;
  public orderId;
  public orderData: OrderModel | null = null;
  constructor(
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private orderService: OrdersService,
  ) {
    this.orderId = this.route.snapshot.params['id'];
    this.breadcrumbs = [
      {
        caption: `Главная`,
        routerLink: `/`,
      },
      {
        caption: `Заказы`,
        routerLink: `/orders`,
      },
      {
        caption: `Детали`,
        routerLink: `/orders/details/${this.orderId}`,
      },
    ];
  }

  public copyToClipboard(textToCopy: string) {
    this.clipboard.copy(textToCopy);
    this.alertService.open('ID заказа скопирован', {label: `Копирование `, status: TuiNotification.Success, autoClose: 7000}).subscribe();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.orderData = null;
    this.orderService.getOrderById(this.orderId).subscribe((res: OrderModel | undefined) => {
      this.orderData = res || null;
    });
  }

}
