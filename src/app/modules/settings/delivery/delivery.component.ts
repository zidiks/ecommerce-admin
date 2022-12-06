import { Component, OnInit } from '@angular/core';
import { ApiDataModel } from "../../../shared/models/api-data.model";
import { DeliveryService } from "./delivery.service";
import { DeliveryMethodResponseDTO } from "../../../shared/dto/delivery-method.dto";
import { ApiLoadingState } from "../../../shared/enums/api-loading-state.enum";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public deliveryData: ApiDataModel<DeliveryMethodResponseDTO[]>
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
      caption: `Методы доставки`,
      routerLink: `/settings/delivery`,
    },
  ];

  constructor(
    private deliveryService: DeliveryService,
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.deliveryData = undefined;
    this.deliveryService.getDeliveryMethods().subscribe(res => this.deliveryData = res);
  }

}
