import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";
import { PaymentService } from "./payment.service";
import { PaymentMethodResponseDto } from "../../../shared/dto/payment-method.dto";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public paymentData: ApiDataModel<PaymentMethodResponseDto[]>
  public apiLoadingState = ApiLoadingState;

  public breadcrumbs = [
    {
      caption: `Главная`,
      routerLink: `/`,
    },
    {
      caption: `Настройки`,
      routerLink: `/settings`,
    },
    {
      caption: `Методы оплаты`,
      routerLink: `/settings/payment`,
    },
  ];

  constructor(
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.paymentData = undefined;
    this.paymentService.getPaymentMethods().subscribe(res => this.paymentData = res);
  }

}
